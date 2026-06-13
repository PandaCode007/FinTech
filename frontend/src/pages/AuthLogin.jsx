import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authLookup } from '../api';

export default function AuthLogin() {
  const navigate = useNavigate();
  const [accountId, setAccountId] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showPass, setShowPass] = useState(false);

  const idValid = /^\d{10}$/.test(accountId);
  const passValid = password.trim().length >= 4;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const { data } = await authLookup({ account_id: accountId, password });
      localStorage.setItem('authName', data.account.name);
      localStorage.setItem('authAccountId', data.account.account_id);
      localStorage.setItem('authCodeType', data.account.code_type);
      navigate('/code-retrieval');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Invalid credentials.');
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#000', display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: 'Segoe UI, sans-serif' }}>
      <div style={{ background: '#0D0D0D', border: '1px solid #1A1A1A', padding: '30px', maxWidth: '400px', width: '90%', borderRadius: '16px', textAlign: 'center' }}>
        <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(255,78,200,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontSize: '1.5rem', color: '#FF4EC8' }}>
          <i className="fas fa-lock"></i>
        </div>
        <h2 style={{ color: '#fff', marginBottom: '4px' }}>Account Authenticator</h2>
        <p style={{ color: '#B3B3B3', marginBottom: '20px', fontSize: '0.9rem' }}>Access codes required for international transfers</p>
        {message && <div style={{ background: 'rgba(255,78,200,0.12)', color: '#FF4EC8', padding: '8px', borderRadius: '6px', marginBottom: '10px', fontSize: '0.85rem', border: '1px solid rgba(255,78,200,0.25)' }}>{message}</div>}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '12px' }}>
            <label style={{ display: 'block', textAlign: 'left', fontSize: '0.82rem', color: '#B3B3B3', marginBottom: '6px', fontWeight: 500 }}>Account ID</label>
            <input type="tel" placeholder="Enter 10-digit Account ID" maxLength={10} value={accountId}
              onChange={(e) => setAccountId(e.target.value)}
              style={{ width: '100%', padding: '12px', borderRadius: '10px', border: `2px solid ${accountId ? (idValid ? '#2ed573' : '#FF4EC8') : '#1A1A1A'}`, background: 'rgba(0,0,0,0.4)', color: '#fff', fontSize: '16px', boxSizing: 'border-box', outline: 'none', fontFamily: 'inherit' }} required />
          </div>
          <div style={{ position: 'relative', marginBottom: '16px' }}>
            <label style={{ display: 'block', textAlign: 'left', fontSize: '0.82rem', color: '#B3B3B3', marginBottom: '6px', fontWeight: 500 }}>Password</label>
            <input type={showPass ? 'text' : 'password'} placeholder="Enter Password" value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: '100%', padding: '12px', borderRadius: '10px', border: `2px solid ${password ? (passValid ? '#2ed573' : '#FF4EC8') : '#1A1A1A'}`, background: 'rgba(0,0,0,0.4)', color: '#fff', fontSize: '16px', boxSizing: 'border-box', outline: 'none', fontFamily: 'inherit', paddingRight: '40px' }} required />
            <span onClick={() => setShowPass(!showPass)} style={{ position: 'absolute', bottom: '12px', right: '12px', cursor: 'pointer', fontSize: '18px' }}>{showPass ? '🙈' : '💰'}</span>
          </div>
          <button type="submit" disabled={!idValid || !passValid}
            style={{ width: '100%', padding: '14px', borderRadius: '10px', border: 'none', fontSize: '16px', fontWeight: 'bold', background: (idValid && passValid) ? '#FF4EC8' : '#1A1A1A', color: '#fff', cursor: (idValid && passValid) ? 'pointer' : 'not-allowed' }}>
            Verify Account
          </button>
        </form>
        <Link to="/" style={{ display: 'block', marginTop: '15px', color: '#666', fontSize: '13px' }}>Back to Home</Link>
      </div>
    </div>
  );
}