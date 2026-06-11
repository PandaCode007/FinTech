import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import OtpVerify from './pages/OtpVerify';
import Dashboard from './pages/Dashboard';
import Transfer from './pages/Transfer';
import Beneficiaries from './pages/Beneficiaries';
import Support from './pages/Support';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AuthLogin from './pages/AuthLogin';
import CodeRetrieval from './pages/CodeRetrieval';
import PaymentProcess from './pages/PaymentProcess';
import AuthSuccess from './pages/AuthSuccess';
import AuthFailed from './pages/AuthFailed';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/otp-verify" element={<OtpVerify />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/transfer" element={<Transfer />} />
        <Route path="/beneficiaries" element={<Beneficiaries />} />
        <Route path="/support" element={<Support />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/auth-login" element={<AuthLogin />} />
        <Route path="/code-retrieval" element={<CodeRetrieval />} />
        <Route path="/payment-process" element={<PaymentProcess />} />
        <Route path="/auth-success" element={<AuthSuccess />} />
        <Route path="/auth-failed" element={<AuthFailed />} />
      </Routes>
    </Router>
  );
}

export default App;