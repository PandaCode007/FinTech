import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getAdminStats, getAdminUsers, updateUser, deleteUser, getAdminTransfers, createTransfer, getAdminTickets, updateTicketStatus, getSettings, updateSettings } from '../api';

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

  if (!stats) return <div className="min-h-screen flex items-center justify-center">Loading Admin Panel...</div>;

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white p-6 hidden md:block">
        <h2 className="text-xl font-bold mb-8">ButterField Admin</h2>
        <nav className="space-y-2">
          {['dashboard', 'users', 'transfers', 'tickets', 'settings'].map((t) => (
            <button key={t} onClick={() => setTab(t)} className={`block w-full text-left px-4 py-2 rounded ${tab === t ? 'bg-gray-700' : 'hover:bg-gray-800'}`}>{t.charAt(0).toUpperCase() + t.slice(1)}</button>
          ))}
        </nav>
        <button onClick={() => { localStorage.clear(); navigate('/admin-login'); }} className="mt-8 text-sm text-gray-400 hover:text-white">Logout</button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-auto">
        {tab === 'dashboard' && (
          <>
            <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-xl shadow"><p className="text-gray-500">Total Users</p><p className="text-2xl font-bold">{stats.totalUsers}</p></div>
              <div className="bg-white p-5 rounded-xl shadow"><p className="text-gray-500">Tickets</p><p className="text-2xl font-bold">{stats.totalTickets}</p></div>
              <div className="bg-white p-5 rounded-xl shadow"><p className="text-gray-500">Pending</p><p className="text-2xl font-bold">{stats.pendingTickets}</p></div>
              <div className="bg-white p-5 rounded-xl shadow"><p className="text-gray-500">Total Deposits</p><p className="text-2xl font-bold">${Number(stats.totalSavings + stats.totalChecking).toLocaleString()}</p></div>
            </div>
            <Link to="/" className="block mt-8 text-sm text-gray-500 hover:underline">Back to Landing</Link>
          </>
        )}

        {tab === 'users' && (
          <>
            <h1 className="text-3xl font-bold mb-6">User Management</h1>
            <div className="bg-white rounded-xl shadow overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-100"><tr><th className="p-3 text-left">Name</th><th className="p-3 text-left">Email</th><th className="p-3 text-left">Savings</th><th className="p-3 text-left">Check</th><th className="p-3 text-left">Status</th><th className="p-3"></th></tr></thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u._id} className="border-t hover:bg-gray-50">
                      <td className="p-3">{u.name}</td>
                      <td className="p-3">{u.email}</td>
                      <td className="p-3">${Number(u.savings_balance).toLocaleString()}</td>
                      <td className="p-3">${Number(u.check_balance).toLocaleString()}</td>
                      <td className="p-3">
                        <select value={u.status} onChange={(e) => handleUserUpdate(u._id, 'status', e.target.value)} className="border rounded px-1 py-0.5 text-xs">
                          <option>Active</option>
                          <option>CotExpire</option>
                          <option>Dormant</option>
                          <option>Declined</option>
                        </select>
                      </td>
                      <td className="p-3">
                        <input type="number" placeholder="Add balance" className="border rounded px-1 py-0.5 w-20 text-xs mr-1" id={`bal-${u._id}`} />
                        <button onClick={() => { const inp = document.getElementById(`bal-${u._id}`); if (inp.value) { handleUserUpdate(u._id, 'savings_balance', Number(u.savings_balance) + Number(inp.value)); } }} className="text-blue-500 text-xs hover:underline">Add</button>
                        <button onClick={() => handleDeleteUser(u._id)} className="text-red-500 text-xs hover:underline ml-2">Delete</button>
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
            <h1 className="text-3xl font-bold mb-6">Transfer Logs</h1>
            <div className="bg-white rounded-xl shadow overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-100"><tr><th className="p-3">Date</th><th className="p-3">User</th><th className="p-3">Amount</th><th className="p-3">Type</th><th className="p-3">Receiver</th><th className="p-3">Status</th></tr></thead>
                <tbody>
                  {transfers.map((tx) => (
                    <tr key={tx._id} className="border-t text-center">
                      <td className="p-2">{new Date(tx.createdAt).toLocaleDateString()}</td>
                      <td className="p-2">{tx.user_id?.name || 'N/A'}</td>
                      <td className="p-2">${Number(tx.amount).toLocaleString()}</td>
                      <td className="p-2">{tx.type}</td>
                      <td className="p-2">{tx.receiver_name}</td>
                      <td className="p-2">{tx.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {tab === 'tickets' && (
          <>
            <h1 className="text-3xl font-bold mb-6">Support Tickets</h1>
            <div className="bg-white rounded-xl shadow">
              <table className="w-full text-sm">
                <thead className="bg-gray-100"><tr><th className="p-3">Ref</th><th className="p-3">User</th><th className="p-3">Subject</th><th className="p-3">Dept</th><th className="p-3">Status</th><th className="p-3"></th></tr></thead>
                <tbody>
                  {tickets.map((t) => (
                    <tr key={t._id} className="border-t text-center">
                      <td className="p-2">{t.reference}</td>
                      <td className="p-2">{t.name}</td>
                      <td className="p-2">{t.subject}</td>
                      <td className="p-2">{t.dept}</td>
                      <td className="p-2">{t.status === 0 ? 'Pending' : 'Resolved'}</td>
                      <td className="p-2">
                        {t.status === 0 && <button onClick={() => handleTicketStatus(t._id, 1)} className="bg-green-500 text-white px-3 py-1 rounded text-xs hover:bg-green-600">Resolve</button>}
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
            <h1 className="text-3xl font-bold mb-6">System Settings</h1>
            {settings && (
              <form onSubmit={handleSettingsSave} className="bg-white p-6 rounded-xl shadow max-w-2xl space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="block text-sm">Company Name</label><input value={settings.company_name} onChange={(e) => setSettings({...settings, company_name: e.target.value})} className="input-field" /></div>
                  <div><label className="block text-sm">Company Email</label><input value={settings.company_email} onChange={(e) => setSettings({...settings, company_email: e.target.value})} className="input-field" /></div>
                  <div><label className="block text-sm">Phone</label><input value={settings.company_phone} onChange={(e) => setSettings({...settings, company_phone: e.target.value})} className="input-field" /></div>
                  <div><label className="block text-sm">Bank Routing</label><input value={settings.bank_routing} onChange={(e) => setSettings({...settings, bank_routing: e.target.value})} className="input-field" /></div>
                  <div><label className="block text-sm">OTP Required</label><select value={settings.otp} onChange={(e) => setSettings({...settings, otp: e.target.value})} className="input-field"><option value={1}>Yes</option><option value={0}>No</option></select></div>
                  <div><label className="block text-sm">Allow Registration</label><select value={settings.allow_register} onChange={(e) => setSettings({...settings, allow_register: e.target.value})} className="input-field"><option value={1}>Yes</option><option value={0}>No</option></select></div>
                </div>
                <button type="submit" className="bg-primary text-white px-6 py-2 rounded-lg">Save Settings</button>
              </form>
            )}
          </>
        )}
      </div>
    </div>
  );
}