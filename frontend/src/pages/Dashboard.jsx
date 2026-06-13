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

  if (loading) return <div style={{ minHeight: '100vh', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--bf-text-muted)' }}><i className="fas fa-spinner fa-spin" style={{ fontSize: '2rem', color: 'var(--bf-primary)' }}></i></div>;

  const user = data.user;
  const stats = data.stats;

  return (
    <div style={{ minHeight: '100vh', background: '#000' }}>
      {/* Top Nav */}
      <nav style={{ background: '#0D0D0D', borderBottom: '1px solid #1A1A1A', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fff' }}>ButterField</h1>
          <p style={{ fontSize: '0.75rem', color: '#B3B3B3' }}>Welcome, {user.name}</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <Link to="/transfer" style={{ padding: '8px 16px', background: 'var(--bf-primary)', color: '#fff', borderRadius: '8px', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 600 }}>Transfer</Link>
          <Link to="/support" style={{ padding: '8px 16px', background: '#1A1A1A', color: '#fff', borderRadius: '8px', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 600 }}>Support</Link>
          <button onClick={() => { localStorage.clear(); navigate('/login'); }} style={{ padding: '8px 16px', background: '#1A1A1A', color: '#fff', borderRadius: '8px', border: 'none', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer' }}>Logout</button>
        </div>
      </nav>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 24px' }}>
        {/* Balances Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '32px' }}>
          <div style={{ background: 'linear-gradient(135deg, #0D0D0D 0%, #1A1A1A 100%)', border: '1px solid #1A1A1A', borderRadius: '16px', padding: '24px', color: '#fff' }}>
            <p style={{ fontSize: '0.85rem', color: '#B3B3B3' }}>Checking Account</p>
            <p style={{ fontSize: '2rem', fontWeight: 700, marginTop: '4px' }}>{user.currency}{Number(user.check_balance || 0).toLocaleString()}</p>
            <p style={{ fontSize: '0.75rem', color: '#B3B3B3', marginTop: '4px' }}>Acc: {user.check_acc}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px', fontSize: '0.8rem', color: '#B3B3B3' }}>
              <span>In: {user.currency}{stats.checking.monthlyCredit.toLocaleString()}</span>
              <span>Out: {user.currency}{stats.checking.monthlyDebit.toLocaleString()}</span>
            </div>
          </div>
          <div style={{ background: 'linear-gradient(135deg, #0D0D0D 0%, #1A1A1A 100%)', border: '1px solid #1A1A1A', borderRadius: '16px', padding: '24px', color: '#fff' }}>
            <p style={{ fontSize: '0.85rem', color: '#B3B3B3' }}>Savings Account</p>
            <p style={{ fontSize: '2rem', fontWeight: 700, marginTop: '4px' }}>{user.currency}{Number(user.savings_balance || 0).toLocaleString()}</p>
            <p style={{ fontSize: '0.75rem', color: '#B3B3B3', marginTop: '4px' }}>Acc: {user.savings_acc}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px', fontSize: '0.8rem', color: '#B3B3B3' }}>
              <span>In: {user.currency}{stats.savings.monthlyCredit.toLocaleString()}</span>
              <span>Out: {user.currency}{stats.savings.monthlyDebit.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '32px' }}>
          <Link to="/transfer" style={{ padding: '12px 24px', background: 'var(--bf-primary)', color: '#fff', borderRadius: '12px', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem' }}>Send Money</Link>
          <Link to="/beneficiaries" style={{ padding: '12px 24px', background: '#0D0D0D', border: '1px solid #1A1A1A', color: '#fff', borderRadius: '12px', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem' }}>Beneficiaries</Link>
          <Link to="/support" style={{ padding: '12px 24px', background: '#0D0D0D', border: '1px solid #1A1A1A', color: '#fff', borderRadius: '12px', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem' }}>Support</Link>
        </div>

        {/* Recent Transactions */}
        <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '16px', color: '#fff' }}>Recent Transactions</h3>
        <div style={{ background: '#0D0D0D', border: '1px solid #1A1A1A', borderRadius: '16px', overflow: 'hidden' }}>
          {data.recentTransfers?.length > 0 ? (
            <table style={{ width: '100%', fontSize: '0.88rem', color: '#fff' }}>
              <thead style={{ background: '#1A1A1A' }}>
                <tr>
                  <th style={{ textAlign: 'left', padding: '12px 16px', color: '#B3B3B3', fontWeight: 600 }}>Date</th>
                  <th style={{ textAlign: 'left', padding: '12px 16px', color: '#B3B3B3', fontWeight: 600 }}>Type</th>
                  <th style={{ textAlign: 'left', padding: '12px 16px', color: '#B3B3B3', fontWeight: 600 }}>Amount</th>
                  <th style={{ textAlign: 'left', padding: '12px 16px', color: '#B3B3B3', fontWeight: 600 }}>Receiver</th>
                  <th style={{ textAlign: 'left', padding: '12px 16px', color: '#B3B3B3', fontWeight: 600 }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {data.recentTransfers.map((tx) => (
                  <tr key={tx._id} style={{ borderTop: '1px solid #1A1A1A' }}>
                    <td style={{ padding: '12px 16px', color: '#B3B3B3' }}>{new Date(tx.createdAt).toLocaleDateString()}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{ padding: '2px 10px', borderRadius: '6px', fontSize: '0.78rem', fontWeight: 600, background: tx.type === 'Credit' ? 'rgba(46,213,115,0.15)' : 'rgba(255,78,200,0.15)', color: tx.type === 'Credit' ? '#2ed573' : 'var(--bf-primary)' }}>{tx.type}</span>
                    </td>
                    <td style={{ padding: '12px 16px', color: '#fff' }}>{user.currency}{Number(tx.amount).toLocaleString()}</td>
                    <td style={{ padding: '12px 16px', color: '#B3B3B3' }}>{tx.receiver_name || tx.receiver_acc || 'N/A'}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{ padding: '2px 10px', borderRadius: '6px', fontSize: '0.78rem', background: tx.status === 'Successful' ? 'rgba(46,213,115,0.15)' : 'rgba(255,165,2,0.15)', color: tx.status === 'Successful' ? '#2ed573' : '#ffa502' }}>{tx.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p style={{ padding: '24px', textAlign: 'center', color: '#B3B3B3' }}>No recent transactions.</p>
          )}
        </div>
      </div>
    </div>
  );
}