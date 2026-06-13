import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getBeneficiaries, addBeneficiary, deleteBeneficiary } from '../api';

export default function Beneficiaries() {
  const [list, setList] = useState([]);
  const [form, setForm] = useState({ name: '', bank: '', acc_no: '', swift: '', rtn: '', address: '', email: '' });
  const [message, setMessage] = useState('');

  const load = () => getBeneficiaries().then(({ data }) => setList(data)).catch(() => {});

  useEffect(() => { load(); }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([k, v]) => formData.append(k, v));
      await addBeneficiary(formData);
      setMessage('Beneficiary added successfully.');
      setForm({ name: '', bank: '', acc_no: '', swift: '', rtn: '', address: '', email: '' });
      load();
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error adding beneficiary.');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this beneficiary?')) return;
    try {
      await deleteBeneficiary(id);
      setMessage('Deleted.');
      load();
    } catch { setMessage('Delete failed.'); }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#000' }}>
      <nav style={{ background: '#0D0D0D', borderBottom: '1px solid #1A1A1A', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/dashboard" style={{ color: '#fff', textDecoration: 'none', fontWeight: 700, fontSize: '1.2rem' }}>ButterField</Link>
        <span style={{ color: '#B3B3B3' }}>Beneficiaries</span>
      </nav>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '32px 24px' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '24px', color: '#fff' }}>Manage Beneficiaries</h2>
        {message && <div style={{ padding: '12px 16px', borderRadius: '10px', marginBottom: '16px', fontSize: '0.85rem', background: 'rgba(78,158,255,0.12)', color: 'var(--bf-secondary)', border: '1px solid rgba(78,158,255,0.25)' }}>{message}</div>}

        <form onSubmit={handleAdd} style={{ background: '#0D0D0D', border: '1px solid #1A1A1A', borderRadius: '16px', padding: '24px', marginBottom: '32px' }}>
          <h3 style={{ fontWeight: 700, marginBottom: '16px', color: '#fff' }}>Add Beneficiary</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <input name="name" placeholder="Full Name" onChange={handleChange} value={form.name} required style={{ width: '100%', padding: '14px 16px', borderRadius: '10px', border: '1px solid #1A1A1A', background: 'rgba(0,0,0,0.4)', color: '#fff', fontSize: '0.95rem', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' }} />
            <input name="bank" placeholder="Bank Name" onChange={handleChange} value={form.bank} required style={{ width: '100%', padding: '14px 16px', borderRadius: '10px', border: '1px solid #1A1A1A', background: 'rgba(0,0,0,0.4)', color: '#fff', fontSize: '0.95rem', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' }} />
            <input name="acc_no" placeholder="Account Number" onChange={handleChange} value={form.acc_no} required style={{ width: '100%', padding: '14px 16px', borderRadius: '10px', border: '1px solid #1A1A1A', background: 'rgba(0,0,0,0.4)', color: '#fff', fontSize: '0.95rem', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' }} />
            <input name="swift" placeholder="SWIFT Code" onChange={handleChange} value={form.swift} style={{ width: '100%', padding: '14px 16px', borderRadius: '10px', border: '1px solid #1A1A1A', background: 'rgba(0,0,0,0.4)', color: '#fff', fontSize: '0.95rem', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' }} />
            <input name="rtn" placeholder="Routing Number" onChange={handleChange} value={form.rtn} style={{ width: '100%', padding: '14px 16px', borderRadius: '10px', border: '1px solid #1A1A1A', background: 'rgba(0,0,0,0.4)', color: '#fff', fontSize: '0.95rem', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' }} />
            <input name="email" placeholder="Email" onChange={handleChange} value={form.email} style={{ width: '100%', padding: '14px 16px', borderRadius: '10px', border: '1px solid #1A1A1A', background: 'rgba(0,0,0,0.4)', color: '#fff', fontSize: '0.95rem', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' }} />
          </div>
          <input name="address" placeholder="Address" onChange={handleChange} value={form.address} style={{ width: '100%', padding: '14px 16px', borderRadius: '10px', border: '1px solid #1A1A1A', background: 'rgba(0,0,0,0.4)', color: '#fff', fontSize: '0.95rem', outline: 'none', fontFamily: 'inherit', marginTop: '12px', boxSizing: 'border-box' }} />
          <button className="bf-btn bf-btn-primary" type="submit" style={{ marginTop: '16px' }}>Add Beneficiary</button>
        </form>

        <div style={{ background: '#0D0D0D', border: '1px solid #1A1A1A', borderRadius: '16px', overflow: 'hidden' }}>
          <table style={{ width: '100%', fontSize: '0.88rem', color: '#fff' }}>
            <thead style={{ background: '#1A1A1A' }}>
              <tr>
                <th style={{ textAlign: 'left', padding: '12px 16px', color: '#B3B3B3', fontWeight: 600 }}>Name</th>
                <th style={{ textAlign: 'left', padding: '12px 16px', color: '#B3B3B3', fontWeight: 600 }}>Bank</th>
                <th style={{ textAlign: 'left', padding: '12px 16px', color: '#B3B3B3', fontWeight: 600 }}>Account</th>
                <th style={{ textAlign: 'left', padding: '12px 16px', color: '#B3B3B3', fontWeight: 600 }}></th>
              </tr>
            </thead>
            <tbody>
              {list.map((b) => (
                <tr key={b._id} style={{ borderTop: '1px solid #1A1A1A' }}>
                  <td style={{ padding: '12px 16px', color: '#fff' }}>{b.name}</td>
                  <td style={{ padding: '12px 16px', color: '#B3B3B3' }}>{b.bank}</td>
                  <td style={{ padding: '12px 16px', color: '#B3B3B3' }}>{b.acc_no}</td>
                  <td style={{ padding: '12px 16px' }}><button onClick={() => handleDelete(b._id)} style={{ color: 'var(--bf-primary)', background: 'none', border: 'none', fontSize: '0.8rem', cursor: 'pointer', textDecoration: 'underline' }}>Delete</button></td>
                </tr>
              ))}
              {list.length === 0 && <tr><td colSpan={4} style={{ padding: '24px', textAlign: 'center', color: '#B3B3B3' }}>No beneficiaries yet.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}