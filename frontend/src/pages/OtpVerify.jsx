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
    <div className="min-h-screen bg-gradient-to-br from-primary to-secondary flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full text-center">
        <h2 className="text-2xl font-bold text-primary mb-2">OTP Verification</h2>
        <p className="text-gray-500 mb-6">A code has been sent to {email}</p>
        {message && <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4">{message}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="Enter 6-digit OTP" className="input-field text-center text-2xl tracking-widest" required maxLength={6} />
          <button type="submit" className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-opacity-90">Verify OTP</button>
        </form>
      </div>
    </div>
  );
}