import { Link } from 'react-router-dom';

export default function AuthSuccess() {
  return (
    <div style={{ minHeight: '100vh', background: '#000', display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: 'Segoe UI, sans-serif' }}>
      <div style={{ background: '#0D0D0D', border: '1px solid #1A1A1A', padding: '40px', borderRadius: '16px', textAlign: 'center', maxWidth: '450px', width: '90%' }}>
        <div style={{ fontSize: '60px', marginBottom: '20px' }}>✅</div>
        <h2 style={{ color: '#2ed573' }}>Payment Submitted!</h2>
        <p style={{ color: '#B3B3B3' }}>Your code activation payment has been submitted for verification.</p>
        <p style={{ fontSize: '14px', color: '#666', marginTop: '10px' }}>Transaction Hash: <strong style={{ color: '#fff' }}>{localStorage.getItem('txHash')}</strong></p>
        <p style={{ fontSize: '14px', color: '#888' }}>Our team will review and activate your code shortly.</p>
        <Link to="/auth-login" style={{ display: 'inline-block', marginTop: '20px', padding: '12px 30px', background: '#FF4EC8', color: 'white', textDecoration: 'none', borderRadius: '10px', fontWeight: 'bold' }}>Back to Auth</Link>
        <br /><Link to="/" style={{ display: 'inline-block', marginTop: '10px', color: '#666', fontSize: '13px' }}>Home</Link>
      </div>
    </div>
  );
}