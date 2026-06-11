import { Link } from 'react-router-dom';

export default function AuthFailed() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#fff5f5', fontFamily: 'Segoe UI, sans-serif' }}>
      <div style={{ background: 'white', padding: '40px', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', textAlign: 'center', maxWidth: '450px', width: '90%' }}>
        <div style={{ fontSize: '60px', marginBottom: '20px' }}>❌</div>
        <h2 style={{ color: '#dc3545' }}>Payment Expired</h2>
        <p>Unfortunately, your payment session has expired.</p>
        <p style={{ fontSize: '14px', color: '#666' }}>Please try again to complete the transaction within the time limit.</p>
        <Link to="/auth-login" style={{ display: 'inline-block', marginTop: '20px', padding: '12px 30px', background: '#dc3545', color: 'white', textDecoration: 'none', borderRadius: '8px', fontWeight: 'bold' }}>Try Again</Link>
        <br /><Link to="/" style={{ display: 'inline-block', marginTop: '10px', color: '#666', fontSize: '13px' }}>Home</Link>
      </div>
    </div>
  );
}