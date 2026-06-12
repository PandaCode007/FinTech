import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { adminLogin } from '../api';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);
    try {
      const { data } = await adminLogin(form);
      localStorage.setItem('token', data.token);
      localStorage.setItem('admin', JSON.stringify(data.admin));
      navigate('/admin');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Invalid admin credentials.');
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bf-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', background: 'radial-gradient(ellipse at 50% 30%, rgba(233,69,96,0.08) 0%, var(--bf-dark) 70%)' }}>
      <div style={{ width: '100%', maxWidth: '440px' }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <Link to="/" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '12px' }}>
            <svg width="48" height="48" viewBox="0 0 38 38" fill="none">
              <rect width="38" height="38" rx="10" fill="url(#admin-logo-grad)" />
              <path d="M10 26V14h6v12h-6zm12 0V10h6v16h-6z" fill="white" opacity="0.2"/>
              <path d="M10 22L19 10l9 12" stroke="white" strokeWidth="2" fill="none"/>
              <defs><linearGradient id="admin-logo-grad" x1="0" y1="0" x2="38" y2="38"><stop stopColor="#e94560"/><stop offset="1" stopColor="#ff6b81"/></linearGradient></defs>
            </svg>
            <span style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--bf-text)' }}>ButterField</span>
          </Link>
        </div>

        {/* Login Card */}
        <div className="bf-feature-card" style={{ padding: '40px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: 'rgba(233,69,96,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontSize: '1.3rem', color: 'var(--bf-accent)' }}>
              <i className="fas fa-shield-alt"></i>
            </div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#fff', marginBottom: '4px' }}>Admin Portal</h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--bf-text-muted)' }}>Secure administration access</p>
          </div>

          {message && (
            <div style={{ padding: '12px 16px', borderRadius: '10px', marginBottom: '20px', fontSize: '0.85rem', background: 'rgba(233,69,96,0.15)', color: 'var(--bf-accent)', border: '1px solid rgba(233,69,96,0.3)' }}>
              <i className="fas fa-exclamation-circle" style={{ marginRight: '8px' }}></i>{message}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '18px' }}>
              <label style={{ display: 'block', fontSize: '0.82rem', color: 'rgba(255,255,255,0.7)', marginBottom: '6px', fontWeight: 500 }}>
                <i className="fas fa-user" style={{ marginRight: '6px', color: 'var(--bf-accent)' }}></i>Username
              </label>
              <input name="username" type="text" required placeholder="Enter admin username"
                onChange={handleChange} value={form.username}
                style={{ width: '100%', padding: '14px 16px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.06)', color: '#fff', fontSize: '0.95rem', outline: 'none', transition: 'border-color 0.2s', fontFamily: 'inherit' }} />
            </div>
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '0.82rem', color: 'rgba(255,255,255,0.7)', marginBottom: '6px', fontWeight: 500 }}>
                <i className="fas fa-lock" style={{ marginRight: '6px', color: 'var(--bf-accent)' }}></i>Password
              </label>
              <input name="password" type="password" required placeholder="Enter admin password"
                onChange={handleChange} value={form.password}
                style={{ width: '100%', padding: '14px 16px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.06)', color: '#fff', fontSize: '0.95rem', outline: 'none', transition: 'border-color 0.2s', fontFamily: 'inherit' }} />
            </div>
            <button className="bf-btn bf-btn-primary" type="submit" disabled={loading}
              style={{ width: '100%', justifyContent: 'center', padding: '14px', fontSize: '0.95rem' }}>
              {loading ? <><i className="fas fa-spinner fa-spin" style={{ marginRight: '8px' }}></i>Authenticating...</> : <><i className="fas fa-sign-in-alt" style={{ marginRight: '8px' }}></i>Sign In</>}
            </button>
          </form>

          <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.06)', textAlign: 'center' }}>
            <Link to="/" style={{ color: 'var(--bf-text-muted)', fontSize: '0.85rem', textDecoration: 'none', transition: 'color 0.2s' }}>
              <i className="fas fa-arrow-left" style={{ marginRight: '6px' }}></i>Back to Home
            </Link>
          </div>
        </div>

        {/* Security badge */}
        <div style={{ textAlign: 'center', marginTop: '24px' }}>
          <p style={{ fontSize: '0.75rem', color: 'var(--bf-text-muted)' }}>
            <i className="fas fa-lock" style={{ marginRight: '4px', color: 'var(--bf-success)' }}></i>
            256-bit SSL Encrypted • Session Timeout: 4 Hours
          </p>
        </div>
      </div>
    </div>
  );
}