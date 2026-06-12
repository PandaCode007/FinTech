import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function History({ settings }) {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) { window.location.href = '/login'; return; }
    fetch('/api/user/transactions', { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(data => { setTransactions(Array.isArray(data) ? data : data.transactions || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const filtered = filter === 'all' ? transactions :
    transactions.filter(t => t.type === filter || t.status === filter);

  const formatAmount = (amt, currency) => {
    const num = parseFloat(amt);
    if (isNaN(num)) return '$0.00';
    return `${currency || '$'}${num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const formatDate = (d) => {
    if (!d) return 'N/A';
    return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bf-dark)' }}>
      {/* Dashboard Header */}
      <div style={{ background: 'rgba(10,10,26,0.85)', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '16px 24px', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link to="/dashboard" style={{ color: '#fff', textDecoration: 'none', fontWeight: 700, fontSize: '1.2rem' }}>
            <i className="fas fa-arrow-left" style={{ marginRight: '12px', color: 'var(--bf-accent)' }}></i>Transaction History
          </Link>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <Link to="/dashboard" className="bf-btn bf-btn-outline" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>Dashboard</Link>
            <button className="bf-btn bf-btn-outline" style={{ padding: '8px 16px', fontSize: '0.85rem' }} onClick={() => { localStorage.removeItem('token'); window.location.href = '/login'; }}>Logout</button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 24px' }}>
        {/* Filters */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '24px', flexWrap: 'wrap' }}>
          {['all', 'credit', 'debit', 'pending', 'completed'].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              style={{ padding: '8px 20px', borderRadius: '10px', border: '1px solid', borderColor: filter === f ? 'var(--bf-accent)' : 'rgba(255,255,255,0.1)',
                background: filter === f ? 'rgba(233,69,96,0.15)' : 'rgba(255,255,255,0.05)',
                color: filter === f ? 'var(--bf-accent)' : 'var(--bf-text-muted)', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600, textTransform: 'capitalize' }}>
              {f}
            </button>
          ))}
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--bf-text-muted)' }}>
            <i className="fas fa-spinner fa-spin" style={{ fontSize: '2rem', color: 'var(--bf-accent)' }}></i>
            <p style={{ marginTop: '16px' }}>Loading transactions...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--bf-text-muted)' }}>
            <i className="fas fa-inbox" style={{ fontSize: '3rem', marginBottom: '16px', display: 'block' }}></i>
            <h3 style={{ color: '#fff', marginBottom: '8px' }}>No transactions found</h3>
            <p>Your transaction history will appear here.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {filtered.map((tx, i) => (
              <div key={tx._id || i} className="bf-feature-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem',
                    background: (tx.type === 'credit' || tx.type === 'deposit') ? 'rgba(46,213,115,0.15)' : 'rgba(233,69,96,0.15)',
                    color: (tx.type === 'credit' || tx.type === 'deposit') ? 'var(--bf-success)' : 'var(--bf-accent)' }}>
                    <i className={`fas ${(tx.type === 'credit' || tx.type === 'deposit') ? 'fa-arrow-down' : 'fa-arrow-up'}`}></i>
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, color: '#fff', fontSize: '0.95rem' }}>{tx.description || tx.reference || 'Transfer'}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--bf-text-muted)', marginTop: '2px' }}>{formatDate(tx.createdAt || tx.date)}</div>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: 700, fontSize: '1rem',
                    color: (tx.type === 'credit' || tx.type === 'deposit') ? 'var(--bf-success)' : 'var(--bf-accent)' }}>
                    {(tx.type === 'credit' || tx.type === 'deposit') ? '+' : '-'}{formatAmount(tx.amount, tx.currency)}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: tx.status === 'completed' ? 'var(--bf-success)' : tx.status === 'pending' ? 'var(--bf-warning)' : 'var(--bf-text-muted)',
                    marginTop: '2px', textTransform: 'capitalize' }}>
                    {tx.status || 'completed'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}