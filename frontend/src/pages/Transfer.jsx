import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { submitTransfer, verifyCodes } from '../api';

export default function Transfer() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    accountType: 'checking', type: 'wire', bankName: '', receiverName: '',
    receiverAcc: '', amount: '', swift: '', routing: '', address: '', remarks: '', pin: ''
  });
  const [message, setMessage] = useState('');
  const [codeStage, setCodeStage] = useState(null);
  const [ref, setRef] = useState('');
  const [codeInput, setCodeInput] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleTransfer = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const { data } = await submitTransfer({ ...form, amount: Number(form.amount) });
      if (data.codeRequired) {
        setCodeStage(data.codeType);
        setRef(data.reference);
        setMessage('COT verification code needed.');
      } else {
        setMessage(data.message + (data.reference ? ` Ref: ${data.reference}` : ''));
      }
    } catch (err) {
      setMessage(err.response?.data?.message || 'Transfer failed.');
    }
  };

  const handleCodeVerify = async (e) => {
    e.preventDefault();
    try {
      const { data } = await verifyCodes({ reference: ref, codeType: codeStage, enteredCode: codeInput });
      if (data.nextStage) {
        setCodeStage(data.nextStage);
        setCodeInput('');
        setMessage(data.message);
      } else if (data.success) {
        setMessage('Transfer completed successfully!');
        setCodeStage(null);
      }
    } catch (err) {
      setMessage(err.response?.data?.message || 'Code verification failed.');
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#000' }}>
      <nav style={{ background: '#0D0D0D', borderBottom: '1px solid #1A1A1A', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/dashboard" style={{ color: '#fff', textDecoration: 'none', fontWeight: 700, fontSize: '1.2rem' }}>ButterField</Link>
        <span style={{ color: '#B3B3B3' }}>Transfer</span>
      </nav>
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '32px 24px' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '24px', color: '#fff' }}>Make a Transfer</h2>
        {message && <div style={{ padding: '12px 16px', borderRadius: '10px', marginBottom: '16px', fontSize: '0.85rem', background: message.includes('success') ? 'rgba(46,213,115,0.15)' : 'rgba(255,78,200,0.12)', color: message.includes('success') ? '#2ed573' : 'var(--bf-primary)', border: `1px solid ${message.includes('success') ? 'rgba(46,213,115,0.25)' : 'rgba(255,78,200,0.25)'}` }}>{message}</div>}

        {codeStage ? (
          <form onSubmit={handleCodeVerify} style={{ background: '#0D0D0D', border: '1px solid #1A1A1A', borderRadius: '16px', padding: '24px' }}>
            <h3 style={{ fontWeight: 700, marginBottom: '16px', color: '#fff' }}>Enter {codeStage} Code</h3>
            <input value={codeInput} onChange={(e) => setCodeInput(e.target.value)} placeholder={`${codeStage} Code`} style={{ width: '100%', padding: '14px 16px', borderRadius: '10px', border: '1px solid #1A1A1A', background: 'rgba(0,0,0,0.4)', color: '#fff', fontSize: '0.95rem', outline: 'none', fontFamily: 'inherit', marginBottom: '16px', boxSizing: 'border-box' }} required />
            <button type="submit" className="bf-btn bf-btn-primary" style={{ justifyContent: 'center' }}>Verify</button>
          </form>
        ) : (
          <form onSubmit={handleTransfer} style={{ background: '#0D0D0D', border: '1px solid #1A1A1A', borderRadius: '16px', padding: '24px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
              <select name="accountType" onChange={handleChange} style={{ width: '100%', padding: '14px 16px', borderRadius: '10px', border: '1px solid #1A1A1A', background: 'rgba(0,0,0,0.4)', color: '#fff', fontSize: '0.95rem', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' }}>
                <option value="checking">Checking</option>
                <option value="savings">Savings</option>
              </select>
              <select name="type" onChange={handleChange} style={{ width: '100%', padding: '14px 16px', borderRadius: '10px', border: '1px solid #1A1A1A', background: 'rgba(0,0,0,0.4)', color: '#fff', fontSize: '0.95rem', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' }}>
                <option value="wire">Wire Transfer</option>
                <option value="local">Local Transfer</option>
                <option value="internal">Internal Transfer</option>
              </select>
            </div>
            <input name="bankName" placeholder="Bank Name" onChange={handleChange} style={{ width: '100%', padding: '14px 16px', borderRadius: '10px', border: '1px solid #1A1A1A', background: 'rgba(0,0,0,0.4)', color: '#fff', fontSize: '0.95rem', outline: 'none', fontFamily: 'inherit', marginBottom: '12px', boxSizing: 'border-box' }} />
            <input name="receiverName" placeholder="Receiver Name" onChange={handleChange} required style={{ width: '100%', padding: '14px 16px', borderRadius: '10px', border: '1px solid #1A1A1A', background: 'rgba(0,0,0,0.4)', color: '#fff', fontSize: '0.95rem', outline: 'none', fontFamily: 'inherit', marginBottom: '12px', boxSizing: 'border-box' }} />
            <input name="receiverAcc" placeholder="Receiver Account Number" onChange={handleChange} required style={{ width: '100%', padding: '14px 16px', borderRadius: '10px', border: '1px solid #1A1A1A', background: 'rgba(0,0,0,0.4)', color: '#fff', fontSize: '0.95rem', outline: 'none', fontFamily: 'inherit', marginBottom: '12px', boxSizing: 'border-box' }} />
            <input name="amount" type="number" placeholder="Amount" onChange={handleChange} required style={{ width: '100%', padding: '14px 16px', borderRadius: '10px', border: '1px solid #1A1A1A', background: 'rgba(0,0,0,0.4)', color: '#fff', fontSize: '0.95rem', outline: 'none', fontFamily: 'inherit', marginBottom: '12px', boxSizing: 'border-box' }} />
            <input name="swift" placeholder="SWIFT Code (optional)" onChange={handleChange} style={{ width: '100%', padding: '14px 16px', borderRadius: '10px', border: '1px solid #1A1A1A', background: 'rgba(0,0,0,0.4)', color: '#fff', fontSize: '0.95rem', outline: 'none', fontFamily: 'inherit', marginBottom: '12px', boxSizing: 'border-box' }} />
            <input name="routing" placeholder="Routing Number" onChange={handleChange} style={{ width: '100%', padding: '14px 16px', borderRadius: '10px', border: '1px solid #1A1A1A', background: 'rgba(0,0,0,0.4)', color: '#fff', fontSize: '0.95rem', outline: 'none', fontFamily: 'inherit', marginBottom: '12px', boxSizing: 'border-box' }} />
            <input name="remarks" placeholder="Remarks (optional)" onChange={handleChange} style={{ width: '100%', padding: '14px 16px', borderRadius: '10px', border: '1px solid #1A1A1A', background: 'rgba(0,0,0,0.4)', color: '#fff', fontSize: '0.95rem', outline: 'none', fontFamily: 'inherit', marginBottom: '12px', boxSizing: 'border-box' }} />
            <input name="pin" type="password" placeholder="Transaction PIN" onChange={handleChange} required style={{ width: '100%', padding: '14px 16px', borderRadius: '10px', border: '1px solid #1A1A1A', background: 'rgba(0,0,0,0.4)', color: '#fff', fontSize: '0.95rem', outline: 'none', fontFamily: 'inherit', marginBottom: '16px', boxSizing: 'border-box' }} />
            <button className="bf-btn bf-btn-primary" type="submit" style={{ width: '100%', justifyContent: 'center' }}>Submit Transfer</button>
          </form>
        )}
      </div>
    </div>
  );
}