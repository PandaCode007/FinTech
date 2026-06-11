import { useState } from 'react';
import { Link } from 'react-router-dom';
import { submitSupportTicket } from '../api';

export default function Support() {
  const [form, setForm] = useState({ dept: 'General', subject: '', description: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const { data } = await submitSupportTicket(form);
      setMessage(`Ticket submitted! Ref: ${data.reference}`);
      setForm({ dept: 'General', subject: '', description: '' });
    } catch (err) {
      setMessage(err.response?.data?.message || 'Submission failed.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-primary text-white px-6 py-4 flex justify-between items-center shadow-lg">
        <Link to="/dashboard" className="text-xl font-bold">ButterField</Link>
        <span>Support</span>
      </nav>
      <div className="max-w-2xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Submit a Ticket</h2>
        {message && <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded mb-4">{message}</div>}
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow space-y-4">
          <select name="dept" onChange={handleChange} className="input-field">
            <option>General</option>
            <option>Loan</option>
            <option>Card Deposit</option>
            <option>PIN Retrieval</option>
            <option>Change Password</option>
          </select>
          <input name="subject" placeholder="Subject" className="input-field" onChange={handleChange} value={form.subject} />
          <textarea name="description" placeholder="Describe your issue..." className="input-field min-h-[120px]" onChange={handleChange} value={form.description} required />
          <button type="submit" className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-opacity-90">Submit Ticket</button>
        </form>
      </div>
    </div>
  );
}