import { Link } from 'react-router-dom';

export default function Invest({ settings }) {
  return (
    <div>
      <section className="bf-section" style={{ paddingTop: '120px' }}>
        <div className="bf-section-header">
          <span className="bf-eyebrow">Investments</span>
          <h2>Smart <span className="highlight-gold">Investing</span></h2>
          <p>AI-powered portfolios with real-time analytics and personalized recommendations.</p>
        </div>
        <div className="bf-grid-3">
          {[
            { icon: 'fa-chart-line', title: 'Growth Portfolio', rate: '12.5%', period: '/yr avg', desc: 'Aggressive growth strategy focused on high-potential stocks and ETFs.', features: ['Diversified equity mix', 'Monthly rebalancing', 'Real-time dashboard', 'Tax-loss harvesting'] },
            { icon: 'fa-balance-scale', title: 'Balanced Portfolio', rate: '8.3%', period: '/yr avg', desc: 'Balanced approach mixing stocks and bonds for steady returns.', features: ['60/40 stock-bond split', 'Quarterly rebalancing', 'Risk assessment', 'Goal tracking'] },
            { icon: 'fa-shield-alt', title: 'Conservative Portfolio', rate: '5.8%', period: '/yr avg', desc: 'Capital preservation focus with bonds and dividend stocks.', features: ['Low volatility', 'Income generation', 'Capital preservation', 'Quarterly reports'] },
          ].map((item, i) => (
            <div key={i} className="bf-feature-card">
              <div className="bf-feature-icon" style={{ background: 'rgba(245,166,35,0.15)', color: 'var(--bf-gold)' }}>
                <i className={`fas ${item.icon}`}></i>
              </div>
              <h3>{item.title}</h3>
              <div className="bf-rate-value" style={{ margin: '12px 0' }}>{item.rate}<span className="period"> {item.period}</span></div>
              <p>{item.desc}</p>
              <ul style={{ listStyle: 'none', padding: 0, marginTop: '16px' }}>
                {item.features.map((f, j) => (
                  <li key={j} style={{ padding: '6px 0', color: 'var(--bf-text-muted)', fontSize: '0.85rem' }}>
                    <i className="fas fa-check" style={{ color: 'var(--bf-success)', marginRight: '8px' }}></i>{f}
                  </li>
                ))}
              </ul>
              <Link to="/register" className="bf-btn bf-btn-gold" style={{ marginTop: '20px', width: '100%', justifyContent: 'center' }}>
                Start Investing <i className="fas fa-arrow-right"></i>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}