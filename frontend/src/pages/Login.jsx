import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../api';

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const { data } = await loginUser(form);
      if (data.otpRequired) {
        navigate('/otp-verify', { state: { email: form.email } });
      } else {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/dashboard');
      }
    } catch (err) {
      setMessage(err.response?.data?.message || 'Login failed.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-secondary flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full">
        <h2 className="text-3xl font-bold text-center text-primary mb-6">Sign In</h2>
        {message && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">{message}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="email" type="email" placeholder="Email Address" className="input-field" onChange={handleChange} required />
          <input name="password" type="password" placeholder="Password" className="input-field" onChange={handleChange} required />
          <button type="submit" className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-opacity-90 transition">Sign In</button>
        </form>
        <p className="text-center mt-4 text-gray-500">
          Don't have an account? <Link to="/register" className="text-secondary hover:underline">Register</Link>
        </p>
        <p className="text-center mt-2">
          <Link to="/" className="text-sm text-gray-400 hover:underline">Home</Link>
        </p>
      </div>
    </div>
  );
}