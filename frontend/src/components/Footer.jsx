import { Link } from 'react-router-dom';

export default function Footer({ settings }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bf-footer">
      <div className="bf-footer-inner">
        <div className="bf-footer-grid">
          <div className="bf-footer-brand">
            <Link to="/" className="bf-logo">
              <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
                <rect width="38" height="38" rx="10" fill="url(#footer-logo-grad)" />
                <path d="M10 26V14h6v12h-6zm12 0V10h6v16h-6z" fill="white" opacity="0.2"/>
                <path d="M10 22L19 10l9 12" stroke="white" strokeWidth="2" fill="none"/>
                <defs><linearGradient id="footer-logo-grad" x1="0" y1="0" x2="38" y2="38"><stop stopColor="#e94560"/><stop offset="1" stopColor="#ff6b81"/></linearGradient></defs>
              </svg>
              <span className="bf-logo-text">ButterField</span>
            </Link>
            <p>{settings?.company_description || 'Modern Digital Banking, Smart Investments, Global Transfers.'}</p>
            <div className="bf-footer-social">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
            </div>
          </div>

          <div>
            <h4>Quick Links</h4>
            <ul className="bf-footer-links">
              <li><Link to="/bank">Banking</Link></li>
              <li><Link to="/save">Savings</Link></li>
              <li><Link to="/borrow">Loans</Link></li>
              <li><Link to="/invest">Investments</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4>Products</h4>
            <ul className="bf-footer-links">
              <li><Link to="/bank">Checking Accounts</Link></li>
              <li><Link to="/save">High-Yield Savings</Link></li>
              <li><Link to="/borrow">Personal Loans</Link></li>
              <li><Link to="/invest">Investment Portfolios</Link></li>
              <li><Link to="/bank">Debit Cards</Link></li>
              <li><Link to="/transfer">Global Transfers</Link></li>
            </ul>
          </div>

          <div>
            <h4>Contact Us</h4>
            <ul className="bf-footer-links">
              <li><i className="fas fa-map-marker-alt" style={{marginRight: '8px', color: 'var(--bf-accent)'}}></i>{settings?.company_address || 'Grand Cayman, CAYMAN ISLANDS'}</li>
              <li><i className="fas fa-phone" style={{marginRight: '8px', color: 'var(--bf-accent)'}}></i>{settings?.company_phone || '07915636507'}</li>
              <li><i className="fas fa-envelope" style={{marginRight: '8px', color: 'var(--bf-accent)'}}></i>{settings?.company_email || 'customercare@butterfieldapp.com'}</li>
            </ul>
          </div>
        </div>

        <div className="bf-footer-bottom">
          <p>&copy; {currentYear} {settings?.company_name || 'ButterField'}. All rights reserved.</p>
          <div className="bf-footer-badges">
            <span style={{fontSize: '0.75rem', color: 'var(--bf-text-muted)'}}>FDIC Insured</span>
            <span style={{fontSize: '0.75rem', color: 'var(--bf-text-muted)'}}>256-bit SSL</span>
            <span style={{fontSize: '0.75rem', color: 'var(--bf-text-muted)'}}>PCI DSS Compliant</span>
          </div>
        </div>
      </div>
    </footer>
  );
}