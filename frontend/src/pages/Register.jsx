import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../api';

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '' });
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const { data } = await registerUser(form);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setSuccess(true);
      setTimeout(() => navigate('/dashboard'), 1500);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Registration failed.');
    }
  };

  return (
    <div className="bf-auth-page">
      <div className="bf-auth-form">
        <div className="bf-login-modal" style={{ maxWidth: '100%', padding: '40px 32px' }}>
          <div className="bf-modal-icon"><i className="fas fa-user-plus"></i></div>
          <h3>Open Account</h3>
          <p>Create your ButterField account in minutes</p>
          {success && <div style={{ padding: '12px 16px', borderRadius: '10px', marginBottom: '20px', fontSize: '0.85rem', background: 'rgba(46,213,115,0.15)', color: 'var(--bf-success)', border: '1px solid rgba(46,213,115,0.25)' }}>Account created successfully! Redirecting...</div>}
          {message && <div style={{ padding: '12px 16px', borderRadius: '10px', marginBottom: '20px', fontSize: '0.85rem', background: 'rgba(255,78,200,0.12)', color: 'var(--bf-primary)', border: '1px solid rgba(255,78,200,0.25)' }}>{message}</div>}
          <form onSubmit={handleSubmit}>
            <div className="bf-form-group">
              <label>Full Name</label>
              <input name="name" placeholder="John Doe" onChange={handleChange} required />
            </div>
            <div className="bf-form-group">
              <label>Email Address</label>
              <input name="email" type="email" placeholder="your@email.com" onChange={handleChange} required />
            </div>
            <div className="bf-form-group">
              <label>Phone Number</label>
              <input name="phone" placeholder="+1 (555) 123-4567" onChange={handleChange} required />
            </div>
            <div className="bf-form-group">
              <label>Create Password</label>
              <input name="password" type="password" placeholder="Min. 6 characters" onChange={handleChange} required minLength={6} />
            </div>
            <button className="bf-btn bf-btn-primary" type="submit" style={{ width: '100%', justifyContent: 'center', padding: '14px' }}>
              Create Account <i className="fas fa-arrow-right"></i>
            </button>
          </form>
          <div className="bf-modal-footer">
            <span style={{ color: 'var(--bf-text-muted)', fontSize: '0.85rem' }}>
              Already a member?{' '}
              <Link to="/login" style={{ color: 'var(--bf-primary)' }}>Sign In</Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}