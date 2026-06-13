import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getAdminStats, getAdminUsers, updateUser, deleteUser, getAdminTransfers, getAdminTickets, updateTicketStatus, getSettings, updateSettings } from '../api';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('dashboard');
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [transfers, setTransfers] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [settings, setSettings] = useState(null);

  const load = () => {
    getAdminStats().then(({ data }) => setStats(data)).catch(() => navigate('/admin-login'));
    getAdminUsers().then(({ data }) => setUsers(data)).catch(() => {});
    getAdminTransfers().then(({ data }) => setTransfers(data)).catch(() => {});
    getAdminTickets().then(({ data }) => setTickets(data)).catch(() => {});
    getSettings().then(({ data }) => setSettings(data)).catch(() => {});
  };

  useEffect(() => { load(); }, []);

  const handleUserUpdate = async (id, field, value) => {
    await updateUser(id, { [field]: value });
    load();
  };

  const handleDeleteUser = async (id) => {
    if (!confirm('Delete user and all their data?')) return;
    await deleteUser(id);
    load();
  };

  const handleTicketStatus = async (id, status) => {
    await updateTicketStatus(id, { status });
    load();
  };

  const handleSettingsSave = async (e) => {
    e.preventDefault();
    try {
      const { data } = await updateSettings(settings);
      alert('Settings updated!');
      setSettings(data.setting);
    } catch { alert('Update failed'); }
  };

  if (!stats) return <div style={{ minHeight: '100vh', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#B3B3B3' }}>Loading Admin Panel...</div>;

  return (
    <div style={{ minHeight: '100vh', background: '#000', display: 'flex' }}>
      <div style={{ width: '240px', background: '#0D0D0D', borderRight: '1px solid #1A1A1A', padding: '24px 16px', display: 'none' }} className="md-block">
        <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '32px', color: '#fff' }}>ButterField Admin</h2>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {['dashboard', 'users', 'transfers', 'tickets', 'settings'].map((t) => (
            <button key={t} onClick={() => setTab(t)} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '10px 16px', borderRadius: '8px', border: 'none', background: tab === t ? '#1A1A1A' : 'transparent', color: tab === t ? '#fff' : '#B3B3B3', cursor: 'pointer', fontSize: '0.88rem', fontWeight: tab === t ? 600 : 400 }}>
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </nav>
        <button onClick={() => { localStorage.clear(); navigate('/admin-login'); }} style={{ marginTop: '32px', color: '#666', fontSize: '0.85rem', background: 'none', border: 'none', cursor: 'pointer' }}>Logout</button>
      </div>

      <div style={{ flex: 1, padding: '32px', overflow: 'auto' }}>
        {tab === 'dashboard' && (
          <>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '24px', color: '#fff' }}>Dashboard Overview</h1>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
              {[
                { label: 'Total Users', value: stats.totalUsers },
                { label: 'Tickets', value: stats.totalTickets },
                { label: 'Pending', value: stats.pendingTickets },
                { label: 'Total Deposits', value: `$${Number(stats.totalSavings + stats.totalChecking).toLocaleString()}` },
              ].map((item, i) => (
                <div key={i} style={{ background: '#0D0D0D', border: '1px solid #1A1A1A', borderRadius: '12px', padding: '24px' }}>
                  <p style={{ color: '#B3B3B3', fontSize: '0.85rem' }}>{item.label}</p>
                  <p style={{ fontSize: '1.8rem', fontWeight: 700, color: '#fff', marginTop: '4px' }}>{item.value}</p>
                </div>
              ))}
            </div>
            <Link to="/" style={{ display: 'block', marginTop: '32px', color: '#666', fontSize: '0.85rem' }}>Back to Landing</Link>
          </>
        )}

        {tab === 'users' && (
          <>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '24px', color: '#fff' }}>User Management</h1>
            <div style={{ background: '#0D0D0D', border: '1px solid #1A1A1A', borderRadius: '16px', overflow: 'auto' }}>
              <table style={{ width: '100%', fontSize: '0.85rem', color: '#fff' }}>
                <thead style={{ background: '#1A1A1A' }}>
                  <tr>
                    <th style={{ textAlign: 'left', padding: '12px 16px', color: '#B3B3B3', fontWeight: 600 }}>Name</th>
                    <th style={{ textAlign: 'left', padding: '12px 16px', color: '#B3B3B3', fontWeight: 600 }}>Email</th>
                    <th style={{ textAlign: 'left', padding: '12px 16px', color: '#B3B3B3', fontWeight: 600 }}>Savings</th>
                    <th style={{ textAlign: 'left', padding: '12px 16px', color: '#B3B3B3', fontWeight: 600 }}>Check</th>
                    <th style={{ textAlign: 'left', padding: '12px 16px', color: '#B3B3B3', fontWeight: 600 }}>Status</th>
                    <th style={{ textAlign: 'left', padding: '12px 16px', color: '#B3B3B3', fontWeight: 600 }}></th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u._id} style={{ borderTop: '1px solid #1A1A1A' }}>
                      <td style={{ padding: '12px 16px', color: '#fff' }}>{u.name}</td>
                      <td style={{ padding: '12px 16px', color: '#B3B3B3' }}>{u.email}</td>
                      <td style={{ padding: '12px 16px', color: '#fff' }}>${Number(u.savings_balance).toLocaleString()}</td>
                      <td style={{ padding: '12px 16px', color: '#fff' }}>${Number(u.check_balance).toLocaleString()}</td>
                      <td style={{ padding: '12px 16px' }}>
                        <select value={u.status} onChange={(e) => handleUserUpdate(u._id, 'status', e.target.value)} style={{ background: '#0D0D0D', color: '#fff', border: '1px solid #1A1A1A', borderRadius: '6px', padding: '4px 8px', fontSize: '0.8rem', outline: 'none' }}>
                          <option>Active</option>
                          <option>CotExpire</option>
                          <option>Dormant</option>
                          <option>Declined</option>
                        </select>
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        <input type="number" placeholder="Add" style={{ background: '#0D0D0D', color: '#fff', border: '1px solid #1A1A1A', borderRadius: '6px', padding: '4px 8px', width: '70px', fontSize: '0.8rem', outline: 'none', marginRight: '6px' }} id={`bal-${u._id}`} />
                        <button onClick={() => { const inp = document.getElementById(`bal-${u._id}`); if (inp.value) { handleUserUpdate(u._id, 'savings_balance', Number(u.savings_balance) + Number(inp.value)); } }} style={{ color: 'var(--bf-secondary)', background: 'none', border: 'none', fontSize: '0.8rem', cursor: 'pointer' }}>Add</button>
                        <button onClick={() => handleDeleteUser(u._id)} style={{ color: 'var(--bf-primary)', background: 'none', border: 'none', fontSize: '0.8rem', cursor: 'pointer', marginLeft: '8px' }}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {tab === 'transfers' && (
          <>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '24px', color: '#fff' }}>Transfer Logs</h1>
            <div style={{ background: '#0D0D0D', border: '1px solid #1A1A1A', borderRadius: '16px', overflow: 'auto' }}>
              <table style={{ width: '100%', fontSize: '0.85rem', color: '#fff' }}>
                <thead style={{ background: '#1A1A1A' }}>
                  <tr>
                    <th style={{ padding: '12px 16px', color: '#B3B3B3', fontWeight: 600 }}>Date</th>
                    <th style={{ padding: '12px 16px', color: '#B3B3B3', fontWeight: 600 }}>User</th>
                    <th style={{ padding: '12px 16px', color: '#B3B3B3', fontWeight: 600 }}>Amount</th>
                    <th style={{ padding: '12px 16px', color: '#B3B3B3', fontWeight: 600 }}>Type</th>
                    <th style={{ padding: '12px 16px', color: '#B3B3B3', fontWeight: 600 }}>Receiver</th>
                    <th style={{ padding: '12px 16px', color: '#B3B3B3', fontWeight: 600 }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {transfers.map((tx) => (
                    <tr key={tx._id} style={{ borderTop: '1px solid #1A1A1A', textAlign: 'center' }}>
                      <td style={{ padding: '8px 16px', color: '#B3B3B3' }}>{new Date(tx.createdAt).toLocaleDateString()}</td>
                      <td style={{ padding: '8px 16px', color: '#fff' }}>{tx.user_id?.name || 'N/A'}</td>
                      <td style={{ padding: '8px 16px', color: '#fff' }}>${Number(tx.amount).toLocaleString()}</td>
                      <td style={{ padding: '8px 16px', color: '#B3B3B3' }}>{tx.type}</td>
                      <td style={{ padding: '8px 16px', color: '#B3B3B3' }}>{tx.receiver_name}</td>
                      <td style={{ padding: '8px 16px' }}>{tx.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {tab === 'tickets' && (
          <>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '24px', color: '#fff' }}>Support Tickets</h1>
            <div style={{ background: '#0D0D0D', border: '1px solid #1A1A1A', borderRadius: '16px', overflow: 'auto' }}>
              <table style={{ width: '100%', fontSize: '0.85rem', color: '#fff' }}>
                <thead style={{ background: '#1A1A1A' }}>
                  <tr>
                    <th style={{ padding: '12px 16px', color: '#B3B3B3', fontWeight: 600 }}>Ref</th>
                    <th style={{ padding: '12px 16px', color: '#B3B3B3', fontWeight: 600 }}>User</th>
                    <th style={{ padding: '12px 16px', color: '#B3B3B3', fontWeight: 600 }}>Subject</th>
                    <th style={{ padding: '12px 16px', color: '#B3B3B3', fontWeight: 600 }}>Dept</th>
                    <th style={{ padding: '12px 16px', color: '#B3B3B3', fontWeight: 600 }}>Status</th>
                    <th style={{ padding: '12px 16px', color: '#B3B3B3', fontWeight: 600 }}></th>
                  </tr>
                </thead>
                <tbody>
                  {tickets.map((t) => (
                    <tr key={t._id} style={{ borderTop: '1px solid #1A1A1A', textAlign: 'center' }}>
                      <td style={{ padding: '8px 16px', color: '#B3B3B3' }}>{t.reference}</td>
                      <td style={{ padding: '8px 16px', color: '#fff' }}>{t.name}</td>
                      <td style={{ padding: '8px 16px', color: '#B3B3B3' }}>{t.subject}</td>
                      <td style={{ padding: '8px 16px', color: '#B3B3B3' }}>{t.dept}</td>
                      <td style={{ padding: '8px 16px' }}>{t.status === 0 ? 'Pending' : 'Resolved'}</td>
                      <td style={{ padding: '8px 16px' }}>
                        {t.status === 0 && <button onClick={() => handleTicketStatus(t._id, 1)} style={{ padding: '6px 14px', background: '#2ed573', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '0.8rem', cursor: 'pointer' }}>Resolve</button>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {tab === 'settings' && (
          <>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '24px', color: '#fff' }}>System Settings</h1>
            {settings && (
              <form onSubmit={handleSettingsSave} style={{ background: '#0D0D0D', border: '1px solid #1A1A1A', borderRadius: '16px', padding: '24px', maxWidth: '600px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="bf-form-group">
                    <label>Company Name</label>
                    <input value={settings.company_name} onChange={(e) => setSettings({...settings, company_name: e.target.value})} style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1px solid #1A1A1A', background: 'rgba(0,0,0,0.4)', color: '#fff', fontSize: '0.9rem', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' }} />
                  </div>
                  <div className="bf-form-group">
                    <label>Company Email</label>
                    <input value={settings.company_email} onChange={(e) => setSettings({...settings, company_email: e.target.value})} style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1px solid #1A1A1A', background: 'rgba(0,0,0,0.4)', color: '#fff', fontSize: '0.9rem', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' }} />
                  </div>
                  <div className="bf-form-group">
                    <label>Phone</label>
                    <input value={settings.company_phone} onChange={(e) => setSettings({...settings, company_phone: e.target.value})} style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1px solid #1A1A1A', background: 'rgba(0,0,0,0.4)', color: '#fff', fontSize: '0.9rem', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' }} />
                  </div>
                  <div className="bf-form-group">
                    <label>Bank Routing</label>
                    <input value={settings.bank_routing} onChange={(e) => setSettings({...settings, bank_routing: e.target.value})} style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1px solid #1A1A1A', background: 'rgba(0,0,0,0.4)', color: '#fff', fontSize: '0.9rem', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' }} />
                  </div>
                  <div className="bf-form-group">
                    <label>OTP Required</label>
                    <select value={settings.otp} onChange={(e) => setSettings({...settings, otp: e.target.value})} style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1px solid #1A1A1A', background: 'rgba(0,0,0,0.4)', color: '#fff', fontSize: '0.9rem', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' }}>
                      <option value={1}>Yes</option>
                      <option value={0}>No</option>
                    </select>
                  </div>
                  <div className="bf-form-group">
                    <label>Allow Registration</label>
                    <select value={settings.allow_register} onChange={(e) => setSettings({...settings, allow_register: e.target.value})} style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1px solid #1A1A1A', background: 'rgba(0,0,0,0.4)', color: '#fff', fontSize: '0.9rem', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' }}>
                      <option value={1}>Yes</option>
                      <option value={0}>No</option>
                    </select>
                  </div>
                </div>
                <button className="bf-btn bf-btn-primary" type="submit" style={{ marginTop: '20px' }}>Save Settings</button>
              </form>
            )}
          </>
        )}
      </div>
    </div>
  );
}