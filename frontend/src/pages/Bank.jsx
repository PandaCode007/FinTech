import { Link } from 'react-router-dom';

export default function Bank({ settings }) {
  return (
    <div>
      <section className="bf-section" style={{ paddingTop: '120px' }}>
        <div className="bf-section-header">
          <span className="bf-eyebrow">Banking</span>
          <h2>Smart <span className="highlight">Banking</span> Solutions</h2>
          <p>High-yield savings and premium checking accounts with zero monthly fees.</p>
        </div>
        <div className="bf-grid-3">
          {[
            { icon: 'fa-university', title: 'Checking Account', desc: 'Free checking with unlimited transactions, no monthly fees, and instant notifications.', features: ['Zero monthly fees', 'Free debit card', 'Instant notifications', 'Mobile check deposit'] },
            { icon: 'fa-piggy-bank', title: 'Savings Account', desc: 'Earn 4.5% APY on your savings with our high-yield savings account.', features: ['4.5% APY', 'No minimum balance', 'FDIC insured', 'Auto-save features'] },
            { icon: 'fa-credit-card', title: 'Premium Card', desc: 'Get 2% cashback on all purchases with our premium debit card.', features: ['2% cashback', 'No foreign fees', 'Travel insurance', 'Airport lounge access'] },
          ].map((item, i) => (
            <div key={i} className="bf-feature-card">
              <div className="bf-feature-icon" style={{ background: 'rgba(233,69,96,0.15)', color: 'var(--bf-accent)' }}>
                <i className={`fas ${item.icon}`}></i>
              </div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
              <ul style={{ listStyle: 'none', padding: 0, marginTop: '16px' }}>
                {item.features.map((f, j) => (
                  <li key={j} style={{ padding: '6px 0', color: 'var(--bf-text-muted)', fontSize: '0.85rem' }}>
                    <i className="fas fa-check" style={{ color: 'var(--bf-success)', marginRight: '8px' }}></i>{f}
                  </li>
                ))}
              </ul>
              <Link to="/register" className="bf-btn bf-btn-primary" style={{ marginTop: '20px', width: '100%', justifyContent: 'center' }}>
                Open Account <i className="fas fa-arrow-right"></i>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}