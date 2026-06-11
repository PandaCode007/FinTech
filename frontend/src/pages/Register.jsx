import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../api';

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '' });
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const { data } = await registerUser(form);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setSuccess(true);
      setTimeout(() => navigate('/dashboard'), 1500);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Registration failed.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-secondary flex items-center justify-center px-4 py-8">
      <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full">
        <h2 className="text-3xl font-bold text-center text-primary mb-6">Open Account</h2>
        {success && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded mb-4">Account created successfully! Redirecting...</div>}
        {message && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">{message}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="name" placeholder="Full Name" className="input-field" onChange={handleChange} required />
          <input name="email" type="email" placeholder="Email Address" className="input-field" onChange={handleChange} required />
          <input name="phone" placeholder="Phone Number" className="input-field" onChange={handleChange} required />
          <input name="password" type="password" placeholder="Create Password" className="input-field" onChange={handleChange} required minLength={6} />
          <button type="submit" className="w-full bg-secondary text-white py-3 rounded-lg font-semibold hover:bg-red-500 transition">Create Account</button>
        </form>
        <p className="text-center mt-4 text-gray-500">
          Already a member? <Link to="/login" className="text-secondary hover:underline">Sign In</Link>
        </p>
      </div>
    </div>
  );
}