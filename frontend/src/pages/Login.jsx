import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../api';

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const { data } = await loginUser(form);
      if (data.otpRequired) {
        navigate('/otp-verify', { state: { email: form.email } });
      } else {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/dashboard');
      }
    } catch (err) {
      setMessage(err.response?.data?.message || 'Login failed.');
    }
  };

  return (
    <div className="bf-auth-page">
      <div className="bf-auth-form">
        <div className="bf-login-modal" style={{ maxWidth: '100%', padding: '40px 32px' }}>
          <div className="bf-modal-icon"><i className="fas fa-lock"></i></div>
          <h3>Sign In</h3>
          <p>Welcome back to ButterField</p>
          {message && <div style={{ padding: '12px 16px', borderRadius: '10px', marginBottom: '20px', fontSize: '0.85rem', background: 'rgba(255,78,200,0.12)', color: 'var(--bf-primary)', border: '1px solid rgba(255,78,200,0.25)' }}>{message}</div>}
          <form onSubmit={handleSubmit}>
            <div className="bf-form-group">
              <label>Email Address</label>
              <input name="email" type="email" placeholder="your@email.com" onChange={handleChange} required />
            </div>
            <div className="bf-form-group">
              <label>Password</label>
              <input name="password" type="password" placeholder="Enter your password" onChange={handleChange} required />
            </div>
            <button className="bf-btn bf-btn-primary" type="submit" style={{ width: '100%', justifyContent: 'center', padding: '14px' }}>
              Sign In <i className="fas fa-arrow-right"></i>
            </button>
          </form>
          <div className="bf-modal-footer">
            <span style={{ color: 'var(--bf-text-muted)', fontSize: '0.85rem' }}>
              Don't have an account?{' '}
              <Link to="/register" style={{ color: 'var(--bf-primary)' }}>Register</Link>
            </span>
          </div>
          <div className="bf-modal-footer">
            <Link to="/">Back to Home</Link>
          </div>
        </div>
      </div>
    </div>
  );
}