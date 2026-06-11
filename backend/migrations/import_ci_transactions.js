/* Migration script: import ci_transactions from butterfield.sql into MongoDB Transactions collection

Run: node backend/migrations/import_ci_transactions.js

Requirements: backend/.env must contain MONGODB_URI. The script will try to associate SQL rows to existing users by email when possible.
*/

const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const Transaction = require('../models/Transaction');
const User = require('../models/User');

const SQL_PATH = path.join(__dirname, '..', '..', 'butterfield.sql');

function splitTopLevelParenthesesValues(valuesText) {
  // returns array of strings that were inside top-level parentheses
  const rows = [];
  let depth = 0;
  let buf = '';
  for (let i = 0; i < valuesText.length; i++) {
    const ch = valuesText[i];
    if (ch === '(') {
      depth++;
      if (depth === 1) { buf = ''; continue; }
    }
    if (ch === ')') {
      depth--;
      if (depth === 0) { rows.push(buf); continue; }
    }
    if (depth >= 1) buf += ch;
  }
  return rows.map(r => r.trim()).filter(Boolean);
}

function parseSQLValueRow(rowText) {
  // rowText is the content of a parenthesis, e.g. "1, 2, 'abc', NULL, '2020-01-01'"
  const values = [];
  let i = 0;
  const n = rowText.length;
  while (i < n) {
    while (i < n && /[\s\n\r]/.test(rowText[i])) i++;
    if (i >= n) break;
    let ch = rowText[i];
    if (ch === "'") {
      // single-quoted string, SQL escapes single quote by doubling ''
      i++;
      let str = '';
      while (i < n) {
        if (rowText[i] === "'") {
          if (rowText[i+1] === "'") { str += "'"; i += 2; continue; }
          i++; break; // end of string
        }
        str += rowText[i++];
      }
      values.push(str);
      // skip until comma
      while (i < n && /[\s]/.test(rowText[i])) i++;
      if (rowText[i] === ',') i++;
      continue;
    }
    // unquoted token
    let token = '';
    while (i < n && rowText[i] !== ',') { token += rowText[i++]; }
    // consume comma
    if (rowText[i] === ',') i++;
    token = token.trim();
    if (/^NULL$/i.test(token)) values.push(null);
    else if (/^-?\d+\.?\d*$/.test(token)) values.push(Number(token));
    else {
      // maybe quoted with double quotes or other
      token = token.replace(/^"|"$/g, '');
      values.push(token);
    }
  }
  return values;
}

async function main() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('MONGODB_URI not set in backend/.env');
    process.exit(1);
  }
  console.log('Connecting to MongoDB...');
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log('Connected');

  const sql = fs.readFileSync(SQL_PATH, 'utf8');
  const insertRegex = /INSERT INTO `ci_transactions`\s*\(([^)]+)\)\s*VALUES\s*([^;]+);/gmi;
  let match;
  const toInsert = [];
  while ((match = insertRegex.exec(sql)) !== null) {
    const colsRaw = match[1];
    const valuesRaw = match[2];
    const cols = colsRaw.split(',').map(c => c.replace(/`/g, '').trim());

    const rows = splitTopLevelParenthesesValues(valuesRaw);
    for (const row of rows) {
      const parsed = parseSQLValueRow(row);
      if (parsed.length !== cols.length) {
        console.warn('Column/value length mismatch, skipping row:', cols.length, parsed.length);
        continue;
      }
      const obj = {};
      for (let i = 0; i < cols.length; i++) {
        obj[cols[i]] = parsed[i];
      }
      // Map SQL columns to Transaction model fields
      const doc = {
        // attempt to associate user by email when possible
        user_id: null,
        name: obj.name || '',
        email: obj.email || '',
        status: obj.status != null ? String(obj.status) : 'Pending',
        coin_type: obj.coin_type || '',
        coin_id: obj.coin_id || '',
        transaction_type: obj.transaction_type || '',
        amount: obj.amount != null ? Number(obj.amount) : 0,
        reference: obj.reference != null ? String(obj.reference) : (obj.token ? String(obj.token) : `ref-${Date.now()}`),
        token: obj.token || null,
      };

      // created_at / updated_at mapping
      if (obj.created_at) doc.createdAt = new Date(obj.created_at);
      if (obj.updated_at) doc.updatedAt = new Date(obj.updated_at);

      toInsert.push({ raw: obj, doc });
    }
  }

  console.log(`Parsed ${toInsert.length} transaction rows from SQL`);

  // Try to associate users by email and prepare final docs
  const finalDocs = [];
  for (const entry of toInsert) {
    const { raw, doc } = entry;
    if (doc.email) {
      const user = await User.findOne({ email: doc.email.toLowerCase().trim() }).exec();
      if (user) doc.user_id = user._id;
    }
    // fallback: if raw.user_id is numeric, attempt to find by account_id (if account_id existed mapping) - skipped
    finalDocs.push(doc);
  }

  if (finalDocs.length === 0) {
    console.log('No transactions to insert. Exiting.');
    await mongoose.disconnect();
    return;
  }

  console.log(`Inserting ${finalDocs.length} transactions into MongoDB...`);
  try {
    const res = await Transaction.insertMany(finalDocs, { ordered: false });
    console.log(`Inserted ${res.length} transactions successfully.`);
  } catch (err) {
    console.error('Error inserting documents:', err);
  }

  await mongoose.disconnect();
  console.log('Disconnected. Migration complete.');
}

if (require.main === module) {
  main().catch(err => { console.error(err); process.exit(1); });
}
