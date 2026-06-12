/**
 * SQL to MongoDB Migration Script
 * 
 * This script reads SQL INSERT statements from butterfield.sql and
 * migrates the data into MongoDB collections. It handles:
 * - ci_accounts → users
 * - ci_admin → admins
 * - ci_transfer → transfers
 * - ci_transactions → transactions
 * - All ExtraModels collections
 * 
 * Usage: node utils/migrateFromSQL.js
 */

const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const User = require('../models/User');
const Admin = require('../models/Admin');
const Transfer = require('../models/Transfer');
const Transaction = require('../models/Transaction');
const TempTransfer = require('../models/TempTransfer');
const {
  CheckDeposit, SupportTicket, Notification, Setting, EmailTemplate,
  PaymentGateway, Beneficiary, Testimonial, FAQ, News, BasicContent,
  AuthAccount, AuthConfig
} = require('../models/ExtraModels');

const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/FinTech';

/**
 * Parse MySQL INSERT statement into array of row objects
 */
function parseInsertStatement(sql) {
  const rows = [];
  const tableMatch = sql.match(/INSERT INTO `?(\w+)`?\s*\(([^)]+)\)\s*VALUES\s*(.+?);/s);
  if (!tableMatch) return { table: null, rows: [] };

  const table = tableMatch[1].replace(/`/g, '');
  const columns = tableMatch[2].replace(/`/g, '').split(',').map(c => c.trim());
  const valuesBlocks = tableMatch[3];

  // Parse multiple value groups
  const valueRegex = /\(([^)]+)\)/g;
  let match;
  while ((match = valueRegex.exec(valuesBlocks)) !== null) {
    const values = parseValues(match[1]);
    if (values.length === columns.length) {
      const row = {};
      columns.forEach((col, i) => {
        row[col] = values[i];
      });
      rows.push(row);
    }
  }

  return { table, rows };
}

/**
 * Parse MySQL values string handling strings, numbers, NULL, and functions
 */
function parseValues(valuesStr) {
  const values = [];
  let current = '';
  let inString = false;
  let stringChar = '';
  let i = 0;

  while (i < valuesStr.length) {
    const ch = valuesStr[i];
    
    if (inString) {
      if (ch === stringChar && valuesStr[i + 1] === stringChar) {
        current += ch;
        i += 2;
        continue;
      }
      if (ch === stringChar) {
        values.push(current);
        current = '';
        inString = false;
        stringChar = '';
        i++;
        continue;
      }
      current += ch;
      i++;
      continue;
    }

    if (ch === "'" || ch === '"') {
      inString = true;
      stringChar = ch;
      i++;
      continue;
    }

    if (ch === ',' && !inString) {
      values.push(current.trim());
      current = '';
      i++;
      continue;
    }

    if (ch === '\\' && i + 1 < valuesStr.length) {
      current += valuesStr[i + 1];
      i += 2;
      continue;
    }

    current += ch;
    i++;
  }

  if (current.trim()) {
    values.push(current.trim());
  }

  return values.map(v => {
    if (v === 'NULL' || v === '') return null;
    if (!isNaN(v) && v !== '') return Number(v);
    return v;
  });
}

/**
 * Map MySQL ci_accounts row to MongoDB User document
 */
function mapUser(row) {
  return {
    account_id: row.account_id || String(Math.floor(1000000 + Math.random() * 9000000)),
    name: row.name || 'Unknown',
    status: row.status || 'Active',
    savings_acc: row.savings_acc || '',
    check_acc: row.check_acc || '',
    savings_balance: Number(row.savings_balance) || 0,
    check_balance: Number(row.check_balance) || 0,
    email: (row.email || 'unknown@email.com').toLowerCase(),
    currency: row.currency || '$',
    password: row.password || '$2a$10$placeholder',
    phone: row.phone || '',
    city: row.city || '',
    country: row.country || '',
    address: row.address || '',
    zip: row.zip || '',
    dob: row.dob || '',
    gender: row.gender || '',
    occupation: row.occupation || '',
    pin: row.pin || '',
    cot: row.cot || '',
    tax: row.tax || '',
    imf: row.imf || '',
    otp: null,
    image: row.image || 'user-default.png',
    creditCard: row.creditCard || '',
    expire: row.expire || '',
    ip: row.ip || '',
    lastDate: row.lastDate || '',
    lastTime: row.lastTime || '',
    lastUrl: row.lastUrl || '',
    allow_upload: Number(row.allow_upload) || 0,
    allow_codes: Number(row.allow_codes) || 0,
    allow_beneficiary: Number(row.allow_beneficiary) || 1
  };
}

/**
 * Map MySQL ci_admin row to MongoDB Admin document
 */
function mapAdmin(row) {
  return {
    admin_username: row.admin_username || 'admin',
    admin_email: (row.admin_email || 'admin@butterfieldapp.com').toLowerCase(),
    admin_password: row.admin_password || '$2a$10$placeholder',
    role: Number(row.role) || 1,
    token: row.token || null
  };
}

/**
 * Map MySQL ci_transfer row to MongoDB Transfer document
 */
function mapTransfer(row) {
  return {
    user_id: row.user_id || null,
    amount: Number(row.amount) || 0,
    bank_name: row.bank_name || '',
    bank_address: row.bank_address || '',
    sender_id: row.sender_id || '',
    sender_acc: row.sender_acc || '',
    reference: row.reference || String(Math.floor(100000 + Math.random() * 900000)),
    receiver_name: row.receiver_name || '',
    receiver_acc: row.receiver_acc || '',
    type: row.type || 'Debit',
    swift: row.swift || '',
    routing: row.routing || '',
    remarks: row.remarks || '',
    status: row.status || 'Successful',
    balance: Number(row.balance) || 0,
    month: row.month || new Date().toLocaleString('en-US', { month: 'long', year: 'numeric' })
  };
}

/**
 * Main migration function
 */
async function migrate() {
  console.log('🔌 Connecting to MongoDB...');
  await mongoose.connect(mongoURI);
  console.log('✅ Connected to MongoDB\n');

  const sqlPath = path.join(__dirname, '..', '..', 'butterfield.sql');
  
  if (!fs.existsSync(sqlPath)) {
    console.error('❌ butterfield.sql not found at:', sqlPath);
    process.exit(1);
  }

  const sql = fs.readFileSync(sqlPath, 'utf8');

  // Split by INSERT statements
  const insertRegex = /INSERT INTO[^;]+;/gi;
  const inserts = sql.match(insertRegex) || [];

  console.log(`📊 Found ${inserts.length} INSERT statements in butterfield.sql\n`);

  const stats = { users: 0, admins: 0, transfers: 0, transactions: 0, others: 0 };

  for (const insertSql of inserts) {
    const { table, rows } = parseInsertStatement(insertSql);
    
    if (!table || rows.length === 0) continue;

    console.log(`Processing ${table}: ${rows.length} rows...`);

    switch (table) {
      case 'ci_accounts':
        for (const row of rows) {
          try {
            const existing = await User.findOne({ account_id: row.account_id });
            if (!existing) {
              await User.create(mapUser(row));
              stats.users++;
            }
          } catch (e) {
            console.error(`  Error migrating user ${row.account_id}:`, e.message);
          }
        }
        break;

      case 'ci_admin':
        for (const row of rows) {
          try {
            const existing = await Admin.findOne({ admin_username: row.admin_username });
            if (!existing) {
              await Admin.create(mapAdmin(row));
              stats.admins++;
            }
          } catch (e) {
            console.error(`  Error migrating admin ${row.admin_username}:`, e.message);
          }
        }
        break;

      case 'ci_transfer':
        for (const row of rows) {
          try {
            const existing = await Transfer.findOne({ reference: row.reference });
            if (!existing) {
              await Transfer.create(mapTransfer(row));
              stats.transfers++;
            }
          } catch (e) {
            console.error(`  Error migrating transfer ${row.reference}:`, e.message);
          }
        }
        break;

      case 'ci_transactions':
      case 'transactions':
        for (const row of rows) {
          try {
            const existing = await Transaction.findOne({ reference: row.reference || row.token });
            if (!existing) {
              await Transaction.create({
                user_id: row.user_id || null,
                name: row.name || '',
                email: row.email || '',
                status: row.status || 'pending',
                coin_type: row.coin_type || '',
                coin_id: row.coin_id || '',
                transaction_type: row.transaction_type || '',
                amount: Number(row.amount) || 0,
                reference: row.reference || row.token || String(Math.random()).slice(2, 10),
                token: row.token || ''
              });
              stats.transactions++;
            }
          } catch (e) {
            console.error(`  Error migrating transaction:`, e.message);
          }
        }
        break;

      case 'ci_settings':
      case 'settings':
        for (const row of rows) {
          try {
            const existing = await Setting.findOne();
            if (!existing) {
              const settingData = {};
              Object.keys(row).forEach(key => {
                if (key !== 'id' && key !== 'created_at' && key !== 'updated_at') {
                  settingData[key] = row[key];
                }
              });
              await Setting.create(settingData);
            }
          } catch (e) {
            console.error(`  Error migrating settings:`, e.message);
          }
        }
        break;

      case 'ci_beneficiary':
      case 'beneficiary':
        stats.others += rows.length;
        break;

      case 'ci_support_tickets':
      case 'support_tickets':
        stats.others += rows.length;
        break;

      case 'ci_notifications':
      case 'notifications':
        stats.others += rows.length;
        break;

      case 'ci_faqs':
      case 'faqs':
        for (const row of rows) {
          try {
            await FAQ.create({ question: row.question, answer: row.answer });
          } catch (e) { /* skip duplicates */ }
        }
        break;

      case 'ci_testimonials':
      case 'testimonials':
        for (const row of rows) {
          try {
            await Testimonial.create({ name: row.name, image: row.image || '', content: row.content });
          } catch (e) { /* skip duplicates */ }
        }
        break;

      case 'ci_news':
      case 'news':
        for (const row of rows) {
          try {
            await News.create({ title: row.title, body: row.body, status: row.status || '1' });
          } catch (e) { /* skip duplicates */ }
        }
        break;

      case 'ci_basic':
      case 'basic':
        for (const row of rows) {
          try {
            await BasicContent.create({ title: row.title, value: row.value });
          } catch (e) { /* skip duplicates */ }
        }
        break;

      case 'ci_payment_gateways':
      case 'payment_gateways':
        for (const row of rows) {
          try {
            await PaymentGateway.create({ name: row.name, status: Number(row.status) || 1, ticker: row.ticker || '' });
          } catch (e) { /* skip duplicates */ }
        }
        break;

      case 'ci_email_template':
      case 'email_template':
        for (const row of rows) {
          try {
            await EmailTemplate.create({ name: row.name, subject: row.subject, body: row.body });
          } catch (e) { /* skip duplicates */ }
        }
        break;

      case 'auth_accounts':
        for (const row of rows) {
          try {
            const existing = await AuthAccount.findOne({ account_id: row.account_id });
            if (!existing) {
              await AuthAccount.create({
                account_id: row.account_id, name: row.name,
                password: row.password, code_type: row.code_type || 'COT'
              });
            }
          } catch (e) { /* skip duplicates */ }
        }
        break;

      case 'auth_config':
        for (const row of rows) {
          try {
            const existing = await AuthConfig.findOne();
            if (!existing && row.data) {
              const parsed = typeof row.data === 'string' ? JSON.parse(row.data) : row.data;
              await AuthConfig.create(parsed);
            }
          } catch (e) { /* skip duplicates */ }
        }
        break;

      default:
        console.log(`  ⏭ Skipping table: ${table}`);
    }
  }

  console.log('\n📊 Migration Summary:');
  console.log(`  Users imported: ${stats.users}`);
  console.log(`  Admins imported: ${stats.admins}`);
  console.log(`  Transfers imported: ${stats.transfers}`);
  console.log(`  Transactions imported: ${stats.transactions}`);
  console.log(`  Other records: ${stats.others}`);

  console.log('\n✅ Migration complete!');
  process.exit(0);
}

migrate().catch(err => {
  console.error('❌ Migration failed:', err);
  process.exit(1);
});