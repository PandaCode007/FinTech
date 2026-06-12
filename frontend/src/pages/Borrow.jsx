import { Link } from 'react-router-dom';

export default function Borrow({ settings }) {
  return (
    <div>
      <section className="bf-section" style={{ paddingTop: '120px' }}>
        <div className="bf-section-header">
          <span className="bf-eyebrow">Loans</span>
          <h2>Borrow <span className="highlight">Smartly</span></h2>
          <p>Competitive rates and flexible terms for personal and business loans.</p>
        </div>
        <div className="bf-grid-3">
          {[
            { icon: 'fa-user', title: 'Personal Loan', rate: '3.9%', apr: 'APR', desc: 'Quick approval for personal expenses, home improvements, or debt consolidation.', features: ['Fixed monthly payments', 'No collateral required', 'Same-day approval', 'Flexible terms 12-60 months'] },
            { icon: 'fa-briefcase', title: 'Business Loan', rate: '5.2%', apr: 'APR', desc: 'Grow your business with our flexible financing options.', features: ['Up to $500,000', 'Line of credit available', 'Dedicated advisor', 'Custom repayment plans'] },
            { icon: 'fa-home', title: 'Mortgage', rate: '4.1%', apr: 'APR', desc: 'Make your dream home a reality with our competitive mortgage rates.', features: ['Fixed & variable rates', 'Up to 30-year terms', 'Low down payment', 'Pre-approval in 24 hours'] },
          ].map((item, i) => (
            <div key={i} className="bf-feature-card">
              <div className="bf-feature-icon" style={{ background: 'rgba(233,69,96,0.15)', color: 'var(--bf-accent)' }}>
                <i className={`fas ${item.icon}`}></i>
              </div>
              <h3>{item.title}</h3>
              <div className="bf-rate-value" style={{ margin: '12px 0' }}>{item.rate}<span className="period"> {item.apr}</span></div>
              <p>{item.desc}</p>
              <ul style={{ listStyle: 'none', padding: 0, marginTop: '16px' }}>
                {item.features.map((f, j) => (
                  <li key={j} style={{ padding: '6px 0', color: 'var(--bf-text-muted)', fontSize: '0.85rem' }}>
                    <i className="fas fa-check" style={{ color: 'var(--bf-success)', marginRight: '8px' }}></i>{f}
                  </li>
                ))}
              </ul>
              <Link to="/register" className="bf-btn bf-btn-primary" style={{ marginTop: '20px', width: '100%', justifyContent: 'center' }}>
                Apply Now <i className="fas fa-arrow-right"></i>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}