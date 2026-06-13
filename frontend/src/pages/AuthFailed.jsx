import { Link } from 'react-router-dom';

export default function AuthFailed() {
  return (
    <div style={{ minHeight: '100vh', background: '#000', display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: 'Segoe UI, sans-serif' }}>
      <div style={{ background: '#0D0D0D', border: '1px solid #1A1A1A', padding: '40px', borderRadius: '16px', textAlign: 'center', maxWidth: '450px', width: '90%' }}>
        <div style={{ fontSize: '60px', marginBottom: '20px' }}>❌</div>
        <h2 style={{ color: '#FF4EC8' }}>Payment Expired</h2>
        <p style={{ color: '#B3B3B3' }}>Unfortunately, your payment session has expired.</p>
        <p style={{ fontSize: '14px', color: '#666' }}>Please try again to complete the transaction within the time limit.</p>
        <Link to="/auth-login" style={{ display: 'inline-block', marginTop: '20px', padding: '12px 30px', background: '#FF4EC8', color: 'white', textDecoration: 'none', borderRadius: '10px', fontWeight: 'bold' }}>Try Again</Link>
        <br /><Link to="/" style={{ display: 'inline-block', marginTop: '10px', color: '#666', fontSize: '13px' }}>Home</Link>
      </div>
    </div>
  );
}