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
    <div style={{ minHeight: '100vh', background: '#000' }}>
      <nav style={{ background: '#0D0D0D', borderBottom: '1px solid #1A1A1A', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/dashboard" style={{ color: '#fff', textDecoration: 'none', fontWeight: 700, fontSize: '1.2rem' }}>ButterField</Link>
        <span style={{ color: '#B3B3B3' }}>Support</span>
      </nav>
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '32px 24px' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '24px', color: '#fff' }}>Submit a Ticket</h2>
        {message && <div style={{ padding: '12px 16px', borderRadius: '10px', marginBottom: '16px', fontSize: '0.85rem', background: 'rgba(78,158,255,0.12)', color: 'var(--bf-secondary)', border: '1px solid rgba(78,158,255,0.25)' }}>{message}</div>}
        <form onSubmit={handleSubmit} style={{ background: '#0D0D0D', border: '1px solid #1A1A1A', borderRadius: '16px', padding: '24px' }}>
          <div className="bf-form-group">
            <label>Department</label>
            <select name="dept" onChange={handleChange} style={{ width: '100%', padding: '14px 16px', borderRadius: '10px', border: '1px solid #1A1A1A', background: 'rgba(0,0,0,0.4)', color: '#fff', fontSize: '0.95rem', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' }}>
              <option>General</option>
              <option>Loan</option>
              <option>Card Deposit</option>
              <option>PIN Retrieval</option>
              <option>Change Password</option>
            </select>
          </div>
          <div className="bf-form-group">
            <label>Subject</label>
            <input name="subject" placeholder="Subject" onChange={handleChange} value={form.subject} style={{ width: '100%', padding: '14px 16px', borderRadius: '10px', border: '1px solid #1A1A1A', background: 'rgba(0,0,0,0.4)', color: '#fff', fontSize: '0.95rem', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' }} />
          </div>
          <div className="bf-form-group">
            <label>Description</label>
            <textarea name="description" placeholder="Describe your issue..." onChange={handleChange} value={form.description} required style={{ width: '100%', padding: '14px 16px', borderRadius: '10px', border: '1px solid #1A1A1A', background: 'rgba(0,0,0,0.4)', color: '#fff', fontSize: '0.95rem', outline: 'none', fontFamily: 'inherit', minHeight: '120px', resize: 'vertical', boxSizing: 'border-box' }} />
          </div>
          <button className="bf-btn bf-btn-primary" type="submit" style={{ width: '100%', justifyContent: 'center' }}>Submit Ticket</button>
        </form>
      </div>
    </div>
  );
}