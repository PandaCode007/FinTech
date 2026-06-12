import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Transfer from './pages/Transfer';
import Beneficiaries from './pages/Beneficiaries';
import Support from './pages/Support';
import History from './pages/History';
import Profile from './pages/Profile';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AuthLogin from './pages/AuthLogin';
import CodeRetrieval from './pages/CodeRetrieval';
import PaymentProcess from './pages/PaymentProcess';
import AuthSuccess from './pages/AuthSuccess';
import AuthFailed from './pages/AuthFailed';
import Bank from './pages/Bank';
import Save from './pages/Save';
import Borrow from './pages/Borrow';
import Invest from './pages/Invest';
import Contact from './pages/Contact';
import About from './pages/About';
import OtpVerify from './pages/OtpVerify';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  const [settings, setSettings] = useState({
    company_name: 'ButterField',
    company_description: 'Modern Digital Banking, Smart Investments, Global Transfers',
    company_email: 'customercare@butterfieldapp.com',
    company_phone: '07915636507',
    company_address: 'Butterfield Place, 12 Albert Panton Street, Grand Cayman KY1-1107, CAYMAN ISLANDS',
    allow_register: 1,
    abrv: 'BFA'
  });

  useEffect(() => {
    fetch('/api/public/settings')
      .then(r => r.json())
      .then(data => {
        if (data && data.company_name) setSettings(data);
      })
      .catch(() => {});
  }, []);

  return (
    <Router>
      <Routes>
        {/* Public Pages - with Header/Footer */}
        <Route path="/" element={<><Header settings={settings} /><Landing settings={settings} /><Footer settings={settings} /></>} />
        <Route path="/bank" element={<><Header settings={settings} /><Bank settings={settings} /><Footer settings={settings} /></>} />
        <Route path="/save" element={<><Header settings={settings} /><Save settings={settings} /><Footer settings={settings} /></>} />
        <Route path="/borrow" element={<><Header settings={settings} /><Borrow settings={settings} /><Footer settings={settings} /></>} />
        <Route path="/invest" element={<><Header settings={settings} /><Invest settings={settings} /><Footer settings={settings} /></>} />
        <Route path="/contact" element={<><Header settings={settings} /><Contact settings={settings} /><Footer settings={settings} /></>} />
        <Route path="/about" element={<><Header settings={settings} /><About settings={settings} /><Footer settings={settings} /></>} />

        {/* Auth Pages */}
        <Route path="/login" element={<Login settings={settings} />} />
        <Route path="/register" element={<Register settings={settings} />} />
        <Route path="/otp-verify" element={<OtpVerify settings={settings} />} />

        {/* User Dashboard Pages */}
        <Route path="/dashboard" element={<Dashboard settings={settings} />} />
        <Route path="/transfer" element={<Transfer settings={settings} />} />
        <Route path="/beneficiaries" element={<Beneficiaries settings={settings} />} />
        <Route path="/support" element={<Support settings={settings} />} />
        <Route path="/history" element={<History settings={settings} />} />
        <Route path="/profile" element={<Profile settings={settings} />} />

        {/* Admin Pages */}
        <Route path="/admin-login" element={<AdminLogin settings={settings} />} />
        <Route path="/admin" element={<AdminDashboard settings={settings} />} />

        {/* Auth Code System Pages */}
        <Route path="/auth-login" element={<AuthLogin settings={settings} />} />
        <Route path="/code-retrieval" element={<CodeRetrieval settings={settings} />} />
        <Route path="/payment-process" element={<PaymentProcess settings={settings} />} />
        <Route path="/auth-success" element={<AuthSuccess settings={settings} />} />
        <Route path="/auth-failed" element={<AuthFailed settings={settings} />} />
      </Routes>
    </Router>
  );
}

export default App;