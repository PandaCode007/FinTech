import { Link } from 'react-router-dom';

export default function Save({ settings }) {
  return (
    <div>
      <section className="bf-section" style={{ paddingTop: '120px' }}>
        <div className="bf-section-header">
          <span className="bf-eyebrow">Savings</span>
          <h2>Grow Your <span className="highlight-gold">Savings</span></h2>
          <p>Earn industry-leading interest rates with our high-yield savings accounts.</p>
        </div>
        <div className="bf-grid-3">
          {[
            { title: 'Basic Savings', rate: '3.5%', apy: 'APY', desc: 'Start saving with as little as $1. No minimum balance required.', features: ['No minimum balance', 'Monthly interest', 'Free transfers', 'FDIC insured'] },
            { title: 'Premium Savings', rate: '4.5%', apy: 'APY', desc: 'Earn more with our premium tier. Higher rates for balances over $10,000.', features: ['Higher interest rate', 'Priority support', 'Auto-compound', 'No withdrawal limits'], featured: true },
            { title: 'Fixed Deposit', rate: '5.2%', apy: 'APY', desc: 'Lock in the best rates with our 12-month fixed deposit product.', features: ['Best available rate', 'Guaranteed returns', 'Flexible terms', 'Early withdrawal option'] },
          ].map((item, i) => (
            <div key={i} className={`bf-feature-card ${item.featured ? 'bf-featured' : ''}`} style={item.featured ? { borderColor: 'var(--bf-gold)', border: '2px solid var(--bf-gold)' } : {}}>
              <h3>{item.title}</h3>
              <div className="bf-rate-value" style={{ margin: '16px 0' }}>{item.rate}<span className="period"> {item.apy}</span></div>
              <p>{item.desc}</p>
              <ul style={{ listStyle: 'none', padding: 0, marginTop: '16px' }}>
                {item.features.map((f, j) => (
                  <li key={j} style={{ padding: '6px 0', color: 'var(--bf-text-muted)', fontSize: '0.85rem' }}>
                    <i className="fas fa-check" style={{ color: 'var(--bf-success)', marginRight: '8px' }}></i>{f}
                  </li>
                ))}
              </ul>
              <Link to="/register" className={`bf-btn ${item.featured ? 'bf-btn-gold' : 'bf-btn-primary'}`} style={{ marginTop: '20px', width: '100%', justifyContent: 'center' }}>
                {item.featured ? 'Get Premium' : 'Open Account'} <i className="fas fa-arrow-right"></i>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}