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
    <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#f3f9ff', fontFamily: 'Segoe UI, sans-serif' }}>
      <div style={{ background: 'white', maxWidth: '450px', width: '90%', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', textAlign: 'center' }}>
        <h2>Get New Code</h2>
        <p>Account ID: <strong>{accountId}</strong></p>
        <p>Code Type: <strong>{codeType}</strong></p>
        <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#28a745' }}>
          {codeType} Code Price: ${Number(price).toLocaleString()}
        </p>
        <button onClick={handleAccess} disabled={!price}
          style={{ width: '100%', padding: '14px', marginTop: '20px', borderRadius: '8px', border: 'none', fontSize: '16px', fontWeight: 'bold', background: price ? '#28a745' : 'gray', color: 'white', cursor: price ? 'pointer' : 'not-allowed' }}>
          Access Code Now
        </button>
        <Link to="/auth-login" style={{ display: 'block', marginTop: '15px', color: '#666', fontSize: '13px' }}>Back</Link>
      </div>
    </div>
  );
}