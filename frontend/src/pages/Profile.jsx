import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Profile({ settings }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) { window.location.href = '/login'; return; }
    fetch('/api/user/profile', { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(data => { setUser(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    const token = localStorage.getItem('token');
    const form = e.target;
    try {
      const res = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          name: form.name.value,
          email: form.email.value,
          phone: form.phone.value,
          address: form.address.value,
        }),
      });
      const data = await res.json();
      if (res.ok) { setMessage('Profile updated successfully!'); setUser(data); }
      else { setMessage(data.message || 'Failed to update profile.'); }
    } catch { setMessage('An error occurred.'); }
    setSaving(false);
  };

  if (loading) return (
    <div style={{ minHeight: '100vh', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <i className="fas fa-spinner fa-spin" style={{ fontSize: '2rem', color: 'var(--bf-primary)' }}></i>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: '#000' }}>
      <div style={{ background: '#0D0D0D', borderBottom: '1px solid #1A1A1A', padding: '16px 24px', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link to="/dashboard" style={{ color: '#fff', textDecoration: 'none', fontWeight: 700, fontSize: '1.2rem' }}>
            <i className="fas fa-arrow-left" style={{ marginRight: '12px', color: 'var(--bf-primary)' }}></i>My Profile
          </Link>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <Link to="/dashboard" className="bf-btn bf-btn-outline" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>Dashboard</Link>
            <button className="bf-btn bf-btn-outline" style={{ padding: '8px 16px', fontSize: '0.85rem' }} onClick={() => { localStorage.removeItem('token'); window.location.href = '/login'; }}>Logout</button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '700px', margin: '0 auto', padding: '32px 24px' }}>
        <div className="bf-feature-card" style={{ textAlign: 'center', marginBottom: '32px', padding: '40px' }}>
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--bf-gradient-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontSize: '2rem', color: '#fff' }}>
            {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </div>
          <h2 style={{ color: '#fff', fontSize: '1.5rem', marginBottom: '4px' }}>{user?.name || 'User'}</h2>
          <p style={{ color: 'var(--bf-text-muted)', fontSize: '0.9rem' }}>{user?.email || 'user@example.com'}</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginTop: '20px' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#fff' }}>{user?.accountNumber || 'N/A'}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--bf-text-muted)' }}>Account Number</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--bf-primary)' }}>{user?.balance ? `$${parseFloat(user.balance).toLocaleString('en-US', { minimumFractionDigits: 2 })}` : '$0.00'}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--bf-text-muted)' }}>Balance</div>
            </div>
          </div>
        </div>

        <div className="bf-feature-card" style={{ padding: '32px' }}>
          <h3 style={{ color: '#fff', marginBottom: '24px', fontSize: '1.2rem' }}>
            <i className="fas fa-user-edit" style={{ marginRight: '10px', color: 'var(--bf-primary)' }}></i>Edit Profile
          </h3>
          {message && (
            <div style={{ padding: '12px 16px', borderRadius: '10px', marginBottom: '20px', fontSize: '0.9rem',
              background: message.includes('success') ? 'rgba(46,213,115,0.15)' : 'rgba(255,78,200,0.12)',
              color: message.includes('success') ? 'var(--bf-success)' : 'var(--bf-primary)' }}>
              {message}
            </div>
          )}
          <form onSubmit={handleSave}>
            {[
              { name: 'name', label: 'Full Name', type: 'text', value: user?.name || '' },
              { name: 'email', label: 'Email Address', type: 'email', value: user?.email || '' },
              { name: 'phone', label: 'Phone Number', type: 'tel', value: user?.phone || '' },
              { name: 'address', label: 'Address', type: 'text', value: user?.address || '' },
            ].map((field, i) => (
              <div key={i} className="bf-form-group">
                <label>{field.label}</label>
                <input name={field.name} type={field.type} defaultValue={field.value}
                  style={{ width: '100%', padding: '14px 16px', borderRadius: '10px', border: '1px solid #1A1A1A',
                    background: 'rgba(0,0,0,0.4)', color: '#fff', fontSize: '0.95rem', outline: 'none', fontFamily: 'inherit' }} />
              </div>
            ))}
            <button className="bf-btn bf-btn-primary" type="submit" disabled={saving}
              style={{ width: '100%', justifyContent: 'center', marginTop: '8px' }}>
              {saving ? <><i className="fas fa-spinner fa-spin"></i> Saving...</> : <><i className="fas fa-save"></i> Save Changes</>}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}