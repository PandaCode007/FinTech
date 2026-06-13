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
    <div className="bf-auth-page">
      <div style={{ width: '100%', maxWidth: '440px', padding: '24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <Link to="/" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '12px' }}>
            <svg width="48" height="48" viewBox="0 0 38 38" fill="none">
              <rect width="38" height="38" rx="10" fill="url(#admin-logo-grad)" />
              <path d="M10 26V14h6v12h-6zm12 0V10h6v16h-6z" fill="white" opacity="0.15"/>
              <path d="M10 22L19 10l9 12" stroke="white" strokeWidth="2" fill="none"/>
              <defs><linearGradient id="admin-logo-grad" x1="0" y1="0" x2="38" y2="38"><stop stopColor="#FF4EC8"/><stop offset="1" stopColor="#4E9EFF"/></linearGradient></defs>
            </svg>
            <span style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fff' }}>ButterField</span>
          </Link>
        </div>

        <div className="bf-feature-card" style={{ padding: '40px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: 'rgba(255,78,200,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontSize: '1.3rem', color: 'var(--bf-primary)' }}>
              <i className="fas fa-shield-alt"></i>
            </div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#fff', marginBottom: '4px' }}>Admin Portal</h2>
            <p style={{ fontSize: '0.85rem', color: '#B3B3B3' }}>Secure administration access</p>
          </div>

          {message && (
            <div style={{ padding: '12px 16px', borderRadius: '10px', marginBottom: '20px', fontSize: '0.85rem', background: 'rgba(255,78,200,0.12)', color: 'var(--bf-primary)', border: '1px solid rgba(255,78,200,0.25)' }}>
              <i className="fas fa-exclamation-circle" style={{ marginRight: '8px' }}></i>{message}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="bf-form-group">
              <label><i className="fas fa-user" style={{ marginRight: '6px', color: 'var(--bf-primary)' }}></i>Username</label>
              <input name="username" type="text" required placeholder="Enter admin username"
                onChange={handleChange} value={form.username}
                style={{ width: '100%', padding: '14px 16px', borderRadius: '10px', border: '1px solid #1A1A1A', background: 'rgba(0,0,0,0.4)', color: '#fff', fontSize: '0.95rem', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' }} />
            </div>
            <div className="bf-form-group">
              <label><i className="fas fa-lock" style={{ marginRight: '6px', color: 'var(--bf-primary)' }}></i>Password</label>
              <input name="password" type="password" required placeholder="Enter admin password"
                onChange={handleChange} value={form.password}
                style={{ width: '100%', padding: '14px 16px', borderRadius: '10px', border: '1px solid #1A1A1A', background: 'rgba(0,0,0,0.4)', color: '#fff', fontSize: '0.95rem', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' }} />
            </div>
            <button className="bf-btn bf-btn-primary" type="submit" disabled={loading}
              style={{ width: '100%', justifyContent: 'center', padding: '14px', fontSize: '0.95rem' }}>
              {loading ? <><i className="fas fa-spinner fa-spin" style={{ marginRight: '8px' }}></i>Authenticating...</> : <><i className="fas fa-sign-in-alt" style={{ marginRight: '8px' }}></i>Sign In</>}
            </button>
          </form>

          <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid #1A1A1A', textAlign: 'center' }}>
            <Link to="/" style={{ color: '#B3B3B3', fontSize: '0.85rem', textDecoration: 'none' }}>
              <i className="fas fa-arrow-left" style={{ marginRight: '6px' }}></i>Back to Home
            </Link>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '24px' }}>
          <p style={{ fontSize: '0.75rem', color: '#B3B3B3' }}>
            <i className="fas fa-lock" style={{ marginRight: '4px', color: '#2ed573' }}></i>
            256-bit SSL Encrypted • Session Timeout: 4 Hours
          </p>
        </div>
      </div>
    </div>
  );
}