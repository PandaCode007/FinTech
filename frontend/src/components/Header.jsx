import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Header({ settings }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  // Track scroll for header class
  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', () => {
      setScrolled(window.scrollY > 50);
    }, { passive: true });
  }

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/bank', label: 'Bank' },
    { path: '/save', label: 'Save' },
    { path: '/borrow', label: 'Borrow' },
    { path: '/invest', label: 'Invest' },
    { path: '/contact', label: 'Contact' },
  ];

  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <>
      <header className={`bf-header${scrolled ? ' scrolled' : ''}`} id="bf-header">
        <div className="bf-header-inner">
          <Link to="/" className="bf-logo">
            <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
              <rect width="38" height="38" rx="10" fill="url(#logo-grad)" />
              <path d="M10 26V14h6v12h-6zm12 0V10h6v16h-6z" fill="white" opacity="0.2"/>
              <path d="M10 22L19 10l9 12" stroke="white" strokeWidth="2" fill="none"/>
              <defs><linearGradient id="logo-grad" x1="0" y1="0" x2="38" y2="38"><stop stopColor="#e94560"/><stop offset="1" stopColor="#ff6b81"/></linearGradient></defs>
            </svg>
            <span className="bf-logo-text">ButterField <span className="bf-logo-badge">Fintech</span></span>
          </Link>

          <nav className="bf-nav">
            {navLinks.map(link => (
              <Link key={link.path} to={link.path} className={isActive(link.path)}>{link.label}</Link>
            ))}
          </nav>

          <div className="bf-nav-actions">
            <button className="bf-btn bf-btn-outline" onClick={() => setShowLogin(true)}>
              <i className="fas fa-lock"></i> Login
            </button>
            {settings.allow_register === 1 && (
              <button className="bf-btn bf-btn-primary" onClick={() => setShowRegister(true)}>
                Open Account <i className="fas fa-arrow-right"></i>
              </button>
            )}
          </div>

          <button
            type="button"
            className={`bf-nav-toggle${mobileOpen ? ' open' : ''}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation"
          >
            <span></span><span></span><span></span>
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <div className={`bf-mobile-menu${mobileOpen ? ' open' : ''}`}>
        <nav className="bf-mobile-nav">
          {navLinks.map(link => (
            <Link key={link.path} to={link.path} className={isActive(link.path)} onClick={() => setMobileOpen(false)}>
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="bf-mobile-actions">
          <button className="bf-btn bf-btn-outline" onClick={() => { setMobileOpen(false); setShowLogin(true); }}>
            <i className="fas fa-lock"></i> Login
          </button>
          {settings.allow_register === 1 && (
            <button className="bf-btn bf-btn-primary" onClick={() => { setMobileOpen(false); setShowRegister(true); }}>
              Open Account <i className="fas fa-arrow-right"></i>
            </button>
          )}
        </div>
      </div>
      <div className={`bf-mobile-overlay${mobileOpen ? ' open' : ''}`} onClick={() => setMobileOpen(false)}></div>

      {/* Login Modal */}
      {showLogin && (
        <div className="bf-modal-overlay" onClick={() => setShowLogin(false)}>
          <div className="bf-login-modal" onClick={e => e.stopPropagation()}>
            <button className="bf-modal-close" onClick={() => setShowLogin(false)}>&times;</button>
            <div className="bf-modal-icon"><i className="fas fa-lock"></i></div>
            <h3>Welcome Back</h3>
            <p>Login to your ButterField account</p>
            <form action="/api/auth/login" method="POST" onSubmit={async (e) => {
              e.preventDefault();
              const form = e.target;
              const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: form.email.value, password: form.password.value })
              });
              const data = await res.json();
              if (data.token) {
                localStorage.setItem('token', data.token);
                window.location.href = '/dashboard';
              } else {
                alert(data.message || 'Invalid credentials');
              }
            }}>
              <div className="bf-form-group">
                <label>Account ID / Email</label>
                <input name="email" type="text" required />
              </div>
              <div className="bf-form-group">
                <label>Password</label>
                <input name="password" type="password" required />
              </div>
              <button className="bf-btn bf-btn-primary" type="submit">
                Login <i className="fas fa-arrow-right"></i>
              </button>
            </form>
            <div className="bf-modal-footer">
              <Link to="/login">Forgot Password? Contact Support</Link>
            </div>
          </div>
        </div>
      )}

      {/* Register Modal */}
      {showRegister && (
        <div className="bf-modal-overlay" onClick={() => setShowRegister(false)}>
          <div className="bf-login-modal" onClick={e => e.stopPropagation()}>
            <button className="bf-modal-close" onClick={() => setShowRegister(false)}>&times;</button>
            <div className="bf-modal-icon"><i className="fas fa-user-plus"></i></div>
            <h3>Get Started</h3>
            <p>Open your ButterField account today</p>
            <form onSubmit={(e) => {
              e.preventDefault();
              window.location.href = '/register';
            }}>
              <div className="bf-form-group">
                <label>Full Name</label>
                <input name="name" type="text" required />
              </div>
              <div className="bf-form-group">
                <label>Email Address</label>
                <input name="email" type="email" required />
              </div>
              <button className="bf-btn bf-btn-gold" type="submit">
                Continue <i className="fas fa-arrow-right"></i>
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}