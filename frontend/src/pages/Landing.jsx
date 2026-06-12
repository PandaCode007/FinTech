import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Landing({ settings }) {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    fetch('/api/public/testimonials').then(r => r.json()).then(d => setTestimonials(d)).catch(() => {});
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="bf-hero">
        <div className="bf-hero-content">
          <div className="bf-hero-text">
            <h1>Modern <span className="highlight">Digital Banking</span> for the <span className="highlight-gold">Future</span></h1>
            <p>Smart Investments, Global Transfers, and Secure Savings — all in one place. Experience banking reimagined with ButterField.</p>
            <div className="bf-hero-buttons">
              <Link to="/register" className="bf-btn bf-btn-primary">Open Account <i className="fas fa-arrow-right"></i></Link>
              <Link to="/login" className="bf-btn bf-btn-outline"><i className="fas fa-lock"></i> Login</Link>
            </div>
            <div className="bf-hero-stats">
              <div className="bf-hero-stat"><h3>$2.5B+</h3><p>Assets Managed</p></div>
              <div className="bf-hero-stat"><h3>150K+</h3><p>Active Users</p></div>
              <div className="bf-hero-stat"><h3>99.9%</h3><p>Uptime</p></div>
            </div>
          </div>
          <div className="bf-hero-visual">
            <div className="bf-hero-card">
              <div className="bf-hero-card-header">
                <span className="bf-hero-card-brand">BUTTERFIELD</span>
                <div className="bf-hero-card-chip"></div>
              </div>
              <div className="bf-hero-card-number">•••• •••• •••• 4589</div>
              <div className="bf-hero-card-details">
                <div><div className="bf-hero-card-label">Card Holder</div><div className="bf-hero-card-value">JOHN DOE</div></div>
                <div><div className="bf-hero-card-label">Expires</div><div className="bf-hero-card-value">12/28</div></div>
              </div>
            </div>
            <div className="bf-float-badge">
              <div className="bf-float-badge-icon green"><i className="fas fa-check"></i></div>
              <div className="bf-float-badge-text"><h4>Transfer Sent</h4><p>$1,250.00 to John</p></div>
            </div>
            <div className="bf-float-badge">
              <div className="bf-float-badge-icon blue"><i className="fas fa-chart-line"></i></div>
              <div className="bf-float-badge-text"><h4>Investment +12.5%</h4><p>Portfolio growth</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bf-section">
        <div className="bf-section-header">
          <span className="bf-eyebrow">Why ButterField</span>
          <h2>Banking Made <span className="highlight">Simple</span> & <span className="highlight-gold">Secure</span></h2>
          <p>Experience the future of digital banking with our comprehensive suite of financial services.</p>
        </div>
        <div className="bf-grid-3">
          {[
            { icon: 'fa-university', color: 'var(--bf-accent)', bg: 'rgba(233,69,96,0.15)', title: 'Smart Banking', desc: 'High-yield savings and premium checking accounts with zero monthly fees and instant access to your funds.' },
            { icon: 'fa-globe', color: 'var(--bf-success)', bg: 'rgba(46,213,115,0.15)', title: 'Global Transfers', desc: 'Send money worldwide with competitive exchange rates and instant delivery to over 150 countries.' },
            { icon: 'fa-chart-pie', color: 'var(--bf-gold)', bg: 'rgba(245,166,35,0.15)', title: 'Smart Investments', desc: 'AI-powered investment portfolios with real-time analytics and personalized recommendations.' },
            { icon: 'fa-shield-alt', color: 'var(--bf-info)', bg: 'rgba(55,66,250,0.15)', title: 'Bank-Grade Security', desc: 'Biometric login, real-time fraud alerts, and 256-bit SSL encrypted transactions.' },
            { icon: 'fa-wallet', color: 'var(--bf-accent)', bg: 'rgba(233,69,96,0.15)', title: 'Digital Wallet', desc: 'Manage all your cards, payments, and rewards in one secure digital wallet.' },
            { icon: 'fa-headset', color: 'var(--bf-success)', bg: 'rgba(46,213,115,0.15)', title: '24/7 Support', desc: 'Round-the-clock customer support with dedicated account managers for premium users.' },
          ].map((f, i) => (
            <div key={i} className="bf-feature-card">
              <div className="bf-feature-icon" style={{ background: f.bg, color: f.color }}><i className={`fas ${f.icon}`}></i></div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Rates */}
      <section className="bf-section bf-rates-section">
        <div className="bf-section-header">
          <span className="bf-eyebrow">Competitive Rates</span>
          <h2>Best <span className="highlight-gold">Rates</span> in the Market</h2>
          <p>Maximize your earnings with our industry-leading interest rates and investment returns.</p>
        </div>
        <div className="bf-grid-4">
          {[
            { label: 'Savings Rate', value: '4.5%', period: ' APY', name: 'High-Yield Savings', link: '/save' },
            { label: 'Checking Rate', value: '2.8%', period: ' APY', name: 'Premium Checking', link: '/bank' },
            { label: 'Investment Return', value: '12.5%', period: ' /yr', name: 'Smart Portfolio', link: '/invest' },
            { label: 'Loan Rate', value: '3.9%', period: ' APR', name: 'Personal Loans', link: '/borrow' },
          ].map((r, i) => (
            <div key={i} className="bf-rate-card">
              <div className="bf-rate-label">{r.label}</div>
              <div className="bf-rate-value">{r.value}<span className="period">{r.period}</span></div>
              <div className="bf-rate-name">{r.name}</div>
              <Link to={r.link} className="bf-rate-link">Learn More <i className="fas fa-arrow-right"></i></Link>
            </div>
          ))}
        </div>
      </section>

      {/* Trust Strip */}
      <section className="bf-section">
        <div className="bf-section-header">
          <span className="bf-eyebrow">Trusted Worldwide</span>
          <h2>Rated <span className="highlight">Excellent</span> by Our Users</h2>
        </div>
        <div className="bf-trust-strip">
          {[
            { rating: '4.9', label: 'Trustpilot' },
            { rating: '4.8', label: 'Google Reviews' },
            { rating: '4.7', label: 'App Store' },
            { rating: '4.9', label: 'Forbes' },
          ].map((t, i) => (
            <div key={i} className="bf-trust-strip-item">
              <div className="bf-trust-rating">{t.rating}<span>/5</span></div>
              <div className="bf-trust-stars">★★★★★</div>
              <div className="bf-trust-label">{t.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bf-section">
        <div className="bf-section-header">
          <span className="bf-eyebrow">Testimonials</span>
          <h2>What Our <span className="highlight">Customers</span> Say</h2>
          <p>Join thousands of satisfied users who trust ButterField for their financial needs.</p>
        </div>
        <div className="bf-testimonial-grid">
          {(testimonials.length > 0 ? testimonials.slice(0, 6) : [
            { name: 'James Wilson', title: 'Business Owner', content: 'ButterField has completely transformed how I manage my finances. The global transfers are instant and the rates are unbeatable.' },
            { name: 'Sarah Chen', title: 'Investor', content: 'The investment portfolio feature is incredible. I have seen a 15% return in just 6 months. Highly recommend!' },
            { name: 'Michael Brown', title: 'Freelancer', content: 'Security is top-notch. I feel completely safe with my money in ButterField. The biometric login is a game changer.' },
          ]).map((t, i) => (
            <div key={t._id || i} className="bf-testimonial-card">
              <div className="bf-testimonial-stars">★★★★★</div>
              <p>"{t.content}"</p>
              <div className="bf-testimonial-author">
                <div className="bf-testimonial-avatar" style={{ background: i % 2 === 0 ? 'var(--bf-gradient-accent)' : 'var(--bf-gradient-gold)' }}>
                  {t.name ? t.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <div>
                  <div className="bf-testimonial-name">{t.name} <span className="bf-verified"><i className="fas fa-check-circle"></i></span></div>
                  <div className="bf-testimonial-title">{t.title || 'Verified Customer'}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Security */}
      <section className="bf-section">
        <div className="bf-section-header">
          <span className="bf-eyebrow">Security</span>
          <h2>Your Money is <span className="highlight">Safe</span> With Us</h2>
          <p>We use the latest security technologies to protect your account and transactions.</p>
        </div>
        <div className="bf-security-band">
          {[
            { icon: 'fa-lock', title: '256-bit SSL', desc: 'End-to-end encryption' },
            { icon: 'fa-fingerprint', title: 'Biometric Login', desc: 'Face & fingerprint' },
            { icon: 'fa-shield-alt', title: 'Fraud Detection', desc: 'Real-time monitoring' },
            { icon: 'fa-user-shield', title: 'FDIC Insured', desc: 'Up to $250,000' },
          ].map((s, i) => (
            <div key={i} className="bf-security-band-item">
              <i className={`fas ${s.icon}`}></i>
              <div><strong>{s.title}</strong><span>{s.desc}</span></div>
            </div>
          ))}
        </div>
        <div className="bf-compliance-bar">
          <span><i className="fas fa-check-circle"></i>PCI DSS Compliant</span>
          <span><i className="fas fa-check-circle"></i>GDPR Compliant</span>
          <span><i className="fas fa-check-circle"></i>ISO 27001</span>
          <span><i className="fas fa-check-circle"></i>SOC 2 Type II</span>
        </div>
      </section>

      {/* CTA */}
      <section className="bf-section" style={{ textAlign: 'center' }}>
        <div className="bf-section-header">
          <span className="bf-eyebrow">Get Started</span>
          <h2>Ready to <span className="highlight">Transform</span> Your Banking?</h2>
          <p>Open your account in minutes and start experiencing the future of finance.</p>
        </div>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/register" className="bf-btn bf-btn-primary" style={{ fontSize: '1.05rem', padding: '14px 32px' }}>
            Open Account <i className="fas fa-arrow-right"></i>
          </Link>
          <Link to="/contact" className="bf-btn bf-btn-outline" style={{ fontSize: '1.05rem', padding: '14px 32px' }}>
            Contact Sales
          </Link>
        </div>
      </section>
    </div>
  );
}