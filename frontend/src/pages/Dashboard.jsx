import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getDashboard } from '../api';

export default function Dashboard() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return navigate('/login');

    getDashboard()
      .then(({ data }) => {
        setData(data);
        setLoading(false);
      })
      .catch(() => {
        localStorage.clear();
        navigate('/login');
      });
  }, [navigate]);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-2xl">Loading...</div>;

  const user = data.user;
  const stats = data.stats;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Nav */}
      <nav className="bg-primary text-white px-6 py-4 flex justify-between items-center shadow-lg">
        <div>
          <h1 className="text-xl font-bold">ButterField</h1>
          <p className="text-xs opacity-70">Welcome, {user.name}</p>
        </div>
        <div className="flex space-x-4">
          <Link to="/transfer" className="bg-secondary px-3 py-1.5 rounded text-sm hover:bg-red-500">Transfer</Link>
          <Link to="/support" className="bg-gray-700 px-3 py-1.5 rounded text-sm hover:bg-gray-600">Support</Link>
          <button onClick={() => { localStorage.clear(); navigate('/login'); }} className="bg-gray-700 px-3 py-1.5 rounded text-sm hover:bg-gray-600">Logout</button>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Balances Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gradient-to-br from-primary to-[#2d2d5e] text-white p-6 rounded-2xl shadow-xl">
            <p className="text-sm opacity-80">Checking Account</p>
            <p className="text-3xl font-bold mt-1">{user.currency}{Number(user.check_balance || 0).toLocaleString()}</p>
            <p className="text-xs mt-1 opacity-60">Acc: {user.check_acc}</p>
            <div className="flex justify-between mt-4 text-xs opacity-80">
              <span>In: {user.currency}{stats.checking.monthlyCredit.toLocaleString()}</span>
              <span>Out: {user.currency}{stats.checking.monthlyDebit.toLocaleString()}</span>
            </div>
          </div>
          <div className="bg-gradient-to-br from-secondary to-red-600 text-white p-6 rounded-2xl shadow-xl">
            <p className="text-sm opacity-80">Savings Account</p>
            <p className="text-3xl font-bold mt-1">{user.currency}{Number(user.savings_balance || 0).toLocaleString()}</p>
            <p className="text-xs mt-1 opacity-60">Acc: {user.savings_acc}</p>
            <div className="flex justify-between mt-4 text-xs opacity-80">
              <span>In: {user.currency}{stats.savings.monthlyCredit.toLocaleString()}</span>
              <span>Out: {user.currency}{stats.savings.monthlyDebit.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-4 mb-8">
          <Link to="/transfer" className="bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:bg-opacity-90 transition shadow">Send Money</Link>
          <Link to="/beneficiaries" className="bg-white border px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition shadow">Beneficiaries</Link>
          <Link to="/support" className="bg-white border px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition shadow">Support</Link>
        </div>

        {/* Recent Transactions */}
        <h3 className="text-xl font-bold mb-4">Recent Transactions</h3>
        <div className="bg-white rounded-xl shadow overflow-hidden">
          {data.recentTransfers?.length > 0 ? (
            <table className="w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left p-3">Date</th>
                  <th className="text-left p-3">Type</th>
                  <th className="text-left p-3">Amount</th>
                  <th className="text-left p-3">Receiver</th>
                  <th className="text-left p-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {data.recentTransfers.map((tx) => (
                  <tr key={tx._id} className="border-t hover:bg-gray-50">
                    <td className="p-3">{new Date(tx.createdAt).toLocaleDateString()}</td>
                    <td className="p-3"><span className={`px-2 py-1 rounded text-xs font-semibold ${tx.type === 'Credit' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{tx.type}</span></td>
                    <td className="p-3">{user.currency}{Number(tx.amount).toLocaleString()}</td>
                    <td className="p-3">{tx.receiver_name || tx.receiver_acc || 'N/A'}</td>
                    <td className="p-3"><span className={`px-2 py-1 rounded text-xs ${tx.status === 'Successful' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}`}>{tx.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="p-6 text-gray-500 text-center">No recent transactions.</p>
          )}
        </div>
      </div>
    </div>
  );
}