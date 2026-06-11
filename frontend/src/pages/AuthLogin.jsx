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
    <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundImage: 'url(/images/background.png)', backgroundSize: 'cover', fontFamily: 'Segoe UI, sans-serif' }}>
      <div style={{ background: 'white', padding: '30px', maxWidth: '400px', width: '90%', borderRadius: '10px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', textAlign: 'center' }}>
        <img src="/images/logo.png" alt="Logo" style={{ width: '90px', marginBottom: '10px' }} />
        <h2>🔐 Account Authenticator</h2>
        <p style={{ marginBottom: '20px' }}>Access Codes Required to process International Transfers!</p>
        {message && <div style={{ background: '#fee', color: '#c00', padding: '8px', borderRadius: '6px', marginBottom: '10px' }}>{message}</div>}
        <form onSubmit={handleSubmit}>
          <input type="tel" placeholder="Enter 10-digit Account ID" maxLength={10} value={accountId}
            onChange={(e) => setAccountId(e.target.value)}
            style={{ width: '100%', padding: '12px', marginTop: '10px', borderRadius: '6px', border: `2px solid ${accountId ? (idValid ? 'green' : 'red') : '#ccc'}`, boxSizing: 'border-box', fontSize: '16px' }} required />
          <div style={{ position: 'relative', width: '100%' }}>
            <input type={showPass ? 'text' : 'password'} placeholder="Enter Password" value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: '100%', padding: '12px', marginTop: '10px', borderRadius: '6px', border: `2px solid ${password ? (passValid ? 'green' : 'red') : '#ccc'}`, boxSizing: 'border-box', fontSize: '16px', paddingRight: '40px' }} required />
            <span onClick={() => setShowPass(!showPass)} style={{ position: 'absolute', top: '50%', right: '12px', transform: 'translateY(-50%)', cursor: 'pointer', fontSize: '20px' }}>{showPass ? '🙈' : '💰'}</span>
          </div>
          <button type="submit" disabled={!idValid || !passValid}
            style={{ width: '100%', padding: '12px', marginTop: '15px', borderRadius: '6px', border: 'none', fontSize: '16px', fontWeight: 'bold', background: (idValid && passValid) ? '#28a745' : 'gray', color: 'white', cursor: (idValid && passValid) ? 'pointer' : 'not-allowed' }}>
            Verify Account
          </button>
        </form>
        <Link to="/" style={{ display: 'block', marginTop: '15px', color: '#666', fontSize: '13px' }}>Back to Home</Link>
      </div>
    </div>
  );
}