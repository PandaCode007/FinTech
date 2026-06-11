import { Link } from 'react-router-dom';

export default function AuthSuccess() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#f0fff4', fontFamily: 'Segoe UI, sans-serif' }}>
      <div style={{ background: 'white', padding: '40px', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', textAlign: 'center', maxWidth: '450px', width: '90%' }}>
        <div style={{ fontSize: '60px', marginBottom: '20px' }}>✅</div>
        <h2 style={{ color: '#28a745' }}>Payment Submitted!</h2>
        <p>Your code activation payment has been submitted for verification.</p>
        <p style={{ fontSize: '14px', color: '#666', marginTop: '10px' }}>Transaction Hash: <strong>{localStorage.getItem('txHash')}</strong></p>
        <p style={{ fontSize: '14px', color: '#888' }}>Our team will review and activate your code shortly.</p>
        <Link to="/auth-login" style={{ display: 'inline-block', marginTop: '20px', padding: '12px 30px', background: '#28a745', color: 'white', textDecoration: 'none', borderRadius: '8px', fontWeight: 'bold' }}>Back to Auth</Link>
        <br /><Link to="/" style={{ display: 'inline-block', marginTop: '10px', color: '#666', fontSize: '13px' }}>Home</Link>
      </div>
    </div>
  );
}