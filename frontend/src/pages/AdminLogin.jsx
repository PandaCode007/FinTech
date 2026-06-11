import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { adminLogin } from '../api';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const { data } = await adminLogin(form);
      localStorage.setItem('token', data.token);
      localStorage.setItem('admin', JSON.stringify(data.admin));
      navigate('/admin');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Admin login failed.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Admin Login</h2>
        <p className="text-center text-gray-400 mb-6 text-sm">ButterField Administration</p>
        {message && <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4">{message}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="username" placeholder="Admin Username" className="input-field" onChange={handleChange} required />
          <input name="password" type="password" placeholder="Admin Password" className="input-field" onChange={handleChange} required />
          <button type="submit" className="w-full bg-gray-800 text-white py-3 rounded-lg font-semibold hover:bg-gray-700">Sign In</button>
        </form>
        <Link to="/" className="block text-center mt-4 text-sm text-gray-400 hover:underline">Back to Home</Link>
      </div>
    </div>
  );
}