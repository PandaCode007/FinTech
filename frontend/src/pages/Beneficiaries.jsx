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
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-primary text-white px-6 py-4 flex justify-between items-center shadow-lg">
        <Link to="/dashboard" className="text-xl font-bold">ButterField</Link>
        <span>Beneficiaries</span>
      </nav>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Manage Beneficiaries</h2>
        {message && <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded mb-4">{message}</div>}

        <form onSubmit={handleAdd} className="bg-white p-6 rounded-xl shadow space-y-3 mb-8">
          <h3 className="font-bold">Add Beneficiary</h3>
          <div className="grid grid-cols-2 gap-3">
            <input name="name" placeholder="Full Name" className="input-field" onChange={handleChange} value={form.name} required />
            <input name="bank" placeholder="Bank Name" className="input-field" onChange={handleChange} value={form.bank} required />
            <input name="acc_no" placeholder="Account Number" className="input-field" onChange={handleChange} value={form.acc_no} required />
            <input name="swift" placeholder="SWIFT Code" className="input-field" onChange={handleChange} value={form.swift} />
            <input name="rtn" placeholder="Routing Number" className="input-field" onChange={handleChange} value={form.rtn} />
            <input name="email" placeholder="Email" className="input-field" onChange={handleChange} value={form.email} />
          </div>
          <input name="address" placeholder="Address" className="input-field" onChange={handleChange} value={form.address} />
          <button type="submit" className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-opacity-90">Add Beneficiary</button>
        </form>

        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-100"><tr><th className="p-3 text-left">Name</th><th className="p-3 text-left">Bank</th><th className="p-3 text-left">Account</th><th className="p-3"></th></tr></thead>
            <tbody>
              {list.map((b) => (
                <tr key={b._id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{b.name}</td>
                  <td className="p-3">{b.bank}</td>
                  <td className="p-3">{b.acc_no}</td>
                  <td className="p-3"><button onClick={() => handleDelete(b._id)} className="text-red-500 hover:underline text-xs">Delete</button></td>
                </tr>
              ))}
              {list.length === 0 && <tr><td colSpan={4} className="p-6 text-center text-gray-500">No beneficiaries yet.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}