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
  const [codeStage, setCodeStage] = useState(null); // null | 'COT' | 'IMF' | 'TAX'
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
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-primary text-white px-6 py-4 flex justify-between items-center shadow-lg">
        <Link to="/dashboard" className="text-xl font-bold">ButterField</Link>
        <span>Transfer</span>
      </nav>
      <div className="max-w-2xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Make a Transfer</h2>
        {message && <div className={`px-4 py-2 rounded mb-4 ${message.includes('success') ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{message}</div>}

        {codeStage ? (
          <form onSubmit={handleCodeVerify} className="bg-white p-6 rounded-xl shadow space-y-4">
            <h3 className="font-bold text-lg">Enter {codeStage} Code</h3>
            <input value={codeInput} onChange={(e) => setCodeInput(e.target.value)} placeholder={`${codeStage} Code`} className="input-field" required />
            <button type="submit" className="bg-primary text-white px-6 py-2 rounded-lg">Verify</button>
          </form>
        ) : (
          <form onSubmit={handleTransfer} className="bg-white p-6 rounded-xl shadow space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <select name="accountType" onChange={handleChange} className="input-field">
                <option value="checking">Checking</option>
                <option value="savings">Savings</option>
              </select>
              <select name="type" onChange={handleChange} className="input-field">
                <option value="wire">Wire Transfer</option>
                <option value="local">Local Transfer</option>
                <option value="internal">Internal Transfer</option>
              </select>
            </div>
            <input name="bankName" placeholder="Bank Name" className="input-field" onChange={handleChange} />
            <input name="receiverName" placeholder="Receiver Name" className="input-field" onChange={handleChange} required />
            <input name="receiverAcc" placeholder="Receiver Account Number" className="input-field" onChange={handleChange} required />
            <input name="amount" type="number" placeholder="Amount" className="input-field" onChange={handleChange} required />
            <input name="swift" placeholder="SWIFT Code (optional)" className="input-field" onChange={handleChange} />
            <input name="routing" placeholder="Routing Number" className="input-field" onChange={handleChange} />
            <input name="address" placeholder="Bank Address" className="input-field" onChange={handleChange} />
            <input name="remarks" placeholder="Remarks (optional)" className="input-field" onChange={handleChange} />
            <input name="pin" type="password" placeholder="Transaction PIN" className="input-field" onChange={handleChange} required />
            <button type="submit" className="w-full bg-secondary text-white py-3 rounded-lg font-semibold hover:bg-red-500">Submit Transfer</button>
          </form>
        )}
      </div>
    </div>
  );
}