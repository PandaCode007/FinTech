import { Link } from 'react-router-dom';

export default function About({ settings }) {
  return (
    <div>
      <section className="bf-section" style={{ paddingTop: '120px' }}>
        <div className="bf-section-header">
          <span className="bf-eyebrow">About Us</span>
          <h2>Redefining <span className="highlight">Digital Banking</span></h2>
          <p>We're on a mission to make financial services accessible, transparent, and innovative for everyone.</p>
        </div>

        <div style={{ maxWidth: '800px', margin: '0 auto 60px', textAlign: 'center' }}>
          <p style={{ fontSize: '1.1rem', color: 'var(--bf-text-muted)', lineHeight: 1.8 }}>
            Founded in 2024, ButterField is a next-generation digital banking platform headquartered in the Cayman Islands.
            We combine cutting-edge technology with traditional banking values to deliver a seamless financial experience.
            Our platform serves over 150,000 active users across 50+ countries with competitive rates, instant transfers,
            and bank-grade security.
          </p>
        </div>

        <div className="bf-grid-3" style={{ marginBottom: '60px' }}>
          {[
            { number: '150K+', label: 'Active Users Worldwide' },
            { number: '$2.5B+', label: 'Assets Under Management' },
            { number: '50+', label: 'Countries Supported' },
          ].map((stat, i) => (
            <div key={i} className="bf-rate-card">
              <div className="bf-rate-value">{stat.number}</div>
              <div className="bf-rate-name">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="bf-section-header">
          <h2>Our <span className="highlight-secondary">Values</span></h2>
        </div>
        <div className="bf-grid-3">
          {[
            { icon: 'fa-lightbulb', title: 'Innovation', desc: 'We leverage AI, blockchain, and modern technology to build the future of finance.' },
            { icon: 'fa-lock', title: 'Security', desc: 'Your money and data are protected by 256-bit encryption and multi-factor authentication.' },
            { icon: 'fa-heart', title: 'Transparency', desc: 'No hidden fees, no surprises. We believe in clear, honest communication.' },
          ].map((v, i) => (
            <div key={i} className="bf-feature-card" style={{ textAlign: 'center' }}>
              <div className="bf-feature-icon" style={{ background: i === 0 ? 'rgba(255,78,200,0.12)' : i === 1 ? 'rgba(78,158,255,0.12)' : 'rgba(255,78,200,0.12)', color: i === 0 ? 'var(--bf-primary)' : i === 1 ? 'var(--bf-secondary)' : 'var(--bf-primary)', margin: '0 auto 20px' }}>
                <i className={`fas ${v.icon}`}></i>
              </div>
              <h3>{v.title}</h3>
              <p>{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bf-section" style={{ textAlign: 'center' }}>
        <div className="bf-section-header">
          <h2>Ready to <span className="highlight">Get Started</span>?</h2>
          <p>Join ButterField today and experience the future of banking.</p>
        </div>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
          <Link to="/register" className="bf-btn bf-btn-primary">
            Open Account <i className="fas fa-arrow-right"></i>
          </Link>
          <Link to="/contact" className="bf-btn bf-btn-outline">
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}