import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { verifyOtpLogin } from '../api';

export default function OtpVerify() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || '';
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const { data } = await verifyOtpLogin({ email, otp });
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/dashboard');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Invalid OTP.');
    }
  };

  return (
    <div className="bf-auth-page">
      <div className="bf-auth-form">
        <div className="bf-login-modal" style={{ maxWidth: '100%', padding: '40px 32px', textAlign: 'center' }}>
          <div className="bf-modal-icon"><i className="fas fa-shield-alt"></i></div>
          <h3>OTP Verification</h3>
          <p>A verification code has been sent to {email}</p>
          {message && <div style={{ padding: '12px 16px', borderRadius: '10px', marginBottom: '20px', fontSize: '0.85rem', background: 'rgba(255,78,200,0.12)', color: 'var(--bf-primary)', border: '1px solid rgba(255,78,200,0.25)' }}>{message}</div>}
          <form onSubmit={handleSubmit}>
            <div className="bf-form-group">
              <label>Enter 6-digit OTP</label>
              <input value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="000000" style={{ textAlign: 'center', fontSize: '1.5rem', letterSpacing: '8px', fontFamily: 'monospace' }} required maxLength={6} />
            </div>
            <button className="bf-btn bf-btn-primary" type="submit" style={{ width: '100%', justifyContent: 'center' }}>
              Verify OTP <i className="fas fa-arrow-right"></i>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}