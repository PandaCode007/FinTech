import { Link } from 'react-router-dom';

export default function Bank({ settings }) {
  return (
    <div>
      <section className="bf-section" style={{ paddingTop: '120px' }}>
        <div className="bf-section-header">
          <span className="bf-eyebrow">Banking</span>
          <h2>Next-Gen <span className="highlight">Banking</span> Platform</h2>
          <p>Instant transfers, virtual cards, multi-currency accounts — all in one secure platform.</p>
        </div>

        {/* Hero Banking Cards */}
        <div className="bf-grid-3" style={{ marginBottom: '56px' }}>
          <div className="bf-feature-card bf-featured">
            <div className="bf-featured-badge">Most Popular</div>
            <div className="bf-feature-icon" style={{ background: 'rgba(255,78,200,0.12)', color: 'var(--bf-primary)' }}>
              <i className="fas fa-credit-card"></i>
            </div>
            <h3>Premium Checking</h3>
            <p>Zero-fee global checking with unlimited transactions and premium perks.</p>
            <ul className="bf-feature-list">
              <li><i className="fas fa-check"></i> Unlimited free transactions</li>
              <li><i className="fas fa-check"></i> Free global ATM withdrawals</li>
              <li><i className="fas fa-check"></i> 2% cashback on all purchases</li>
              <li><i className="fas fa-check"></i> Airport lounge access</li>
              <li><i className="fas fa-check"></i> Travel & purchase insurance</li>
              <li><i className="fas fa-check"></i> Priority customer support</li>
            </ul>
            <Link to="/register" className="bf-btn bf-btn-primary" style={{ marginTop: '20px', width: '100%', justifyContent: 'center' }}>
              Get Premium <i className="fas fa-arrow-right"></i>
            </Link>
          </div>

          <div className="bf-feature-card">
            <div className="bf-feature-icon" style={{ background: 'rgba(78,158,255,0.12)', color: 'var(--bf-secondary)' }}>
              <i className="fas fa-exchange-alt"></i>
            </div>
            <h3>Instant Transfers</h3>
            <p>Send money globally in seconds with real-time conversion and zero hidden fees.</p>
            <ul className="bf-feature-list">
              <li><i className="fas fa-check"></i> Real-time payments 24/7</li>
              <li><i className="fas fa-check"></i> 150+ supported currencies</li>
              <li><i className="fas fa-check"></i> Mid-market exchange rates</li>
              <li><i className="fas fa-check"></i> No hidden transfer fees</li>
              <li><i className="fas fa-check"></i> Scheduled & recurring transfers</li>
              <li><i className="fas fa-check"></i> SWIFT & SEPA compatible</li>
            </ul>
            <Link to="/register" className="bf-btn bf-btn-secondary" style={{ marginTop: '20px', width: '100%', justifyContent: 'center' }}>
              Start Transferring <i className="fas fa-arrow-right"></i>
            </Link>
          </div>

          <div className="bf-feature-card">
            <div className="bf-feature-icon" style={{ background: 'rgba(255,78,200,0.12)', color: 'var(--bf-primary)' }}>
              <i className="fas fa-id-card"></i>
            </div>
            <h3>Virtual Cards</h3>
            <p>Generate disposable and multi-purpose virtual cards for secure online spending.</p>
            <ul className="bf-feature-list">
              <li><i className="fas fa-check"></i> Instant virtual card generation</li>
              <li><i className="fas fa-check"></i> Single-use disposable cards</li>
              <li><i className="fas fa-check"></i> Merchant-locked cards</li>
              <li><i className="fas fa-check"></i> Spending limits & controls</li>
              <li><i className="fas fa-check"></i> Apple Pay & Google Pay</li>
              <li><i className="fas fa-check"></i> Freeze/unfreeze instantly</li>
            </ul>
            <Link to="/register" className="bf-btn bf-btn-outline" style={{ marginTop: '20px', width: '100%', justifyContent: 'center' }}>
              Explore Cards <i className="fas fa-arrow-right"></i>
            </Link>
          </div>
        </div>

        {/* Multi-Currency Section */}
        <div className="bf-info-box" style={{ marginBottom: '48px', maxWidth: '900px', margin: '0 auto 48px' }}>
          <i className="fas fa-globe"></i>
          <div>
            <p><strong>Multi-Currency Accounts:</strong> Hold, manage, and exchange 50+ currencies in a single account. Open sub-accounts with local IBANs for USD, EUR, GBP, and more. Convert between currencies at true interbank rates with no markup.</p>
          </div>
        </div>

        {/* Security Layers */}
        <div className="bf-section-header" style={{ marginTop: '48px' }}>
          <span className="bf-eyebrow">Bank-Grade Security</span>
          <h2>Your Money, <span className="highlight">Protected</span></h2>
          <p>Multi-layered security that keeps your finances safe at all times.</p>
        </div>
        <div className="bf-grid-4">
          {[
            { icon: 'fa-shield-halved', title: '256-bit Encryption', desc: 'Military-grade encryption for all transactions and data' },
            { icon: 'fa-fingerprint', title: 'Biometric Auth', desc: 'Face ID, fingerprint, and multi-factor authentication' },
            { icon: 'fa-robot', title: 'AI Fraud Detection', desc: 'Real-time AI monitors and blocks suspicious activity' },
            { icon: 'fa-user-lock', title: 'FDIC Insured', desc: 'Deposits insured up to $250,000 per account' },
          ].map((s, i) => (
            <div key={i} className="bf-security-band-item">
              <i className={`fas ${s.icon}`}></i>
              <div><strong>{s.title}</strong><span>{s.desc}</span></div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}