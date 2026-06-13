import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getAuthConfig } from '../api';

export default function CodeRetrieval() {
  const navigate = useNavigate();
  const [config, setConfig] = useState(null);
  const [price, setPrice] = useState(0);
  const codeType = localStorage.getItem('authCodeType') || 'COT';
  const accountId = localStorage.getItem('authAccountId') || '';

  useEffect(() => {
    getAuthConfig().then(({ data }) => {
      setConfig(data);
      setPrice(data.prices?.[codeType] || 0);
    }).catch(() => {});
  }, []);

  const handleAccess = () => {
    localStorage.setItem('authPrice', price.toString());
    navigate('/payment-process');
  };

  return (
    <div style={{ minHeight: '100vh', background: '#000', display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: 'Segoe UI, sans-serif' }}>
      <div style={{ background: '#0D0D0D', border: '1px solid #1A1A1A', maxWidth: '450px', width: '90%', padding: '30px', borderRadius: '16px', textAlign: 'center' }}>
        <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(255,78,200,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontSize: '1.5rem', color: '#FF4EC8' }}>
          <i className="fas fa-key"></i>
        </div>
        <h2 style={{ color: '#fff', marginBottom: '4px' }}>Get New Code</h2>
        <p style={{ color: '#B3B3B3', fontSize: '0.9rem', marginBottom: '16px' }}>Account ID: <strong style={{ color: '#fff' }}>{accountId}</strong></p>
        <p style={{ color: '#B3B3B3', fontSize: '0.9rem' }}>Code Type: <strong style={{ color: '#fff' }}>{codeType}</strong></p>
        <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#FF4EC8', margin: '16px 0' }}>
          {codeType} Code Price: ${Number(price).toLocaleString()}
        </p>
        <button onClick={handleAccess} disabled={!price}
          style={{ width: '100%', padding: '14px', borderRadius: '10px', border: 'none', fontSize: '16px', fontWeight: 'bold', background: price ? '#FF4EC8' : '#1A1A1A', color: '#fff', cursor: price ? 'pointer' : 'not-allowed' }}>
          Access Code Now
        </button>
        <Link to="/auth-login" style={{ display: 'block', marginTop: '15px', color: '#666', fontSize: '13px' }}>Back</Link>
      </div>
    </div>
  );
}