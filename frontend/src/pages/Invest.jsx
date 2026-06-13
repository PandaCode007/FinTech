import { Link } from 'react-router-dom';

export default function Invest({ settings }) {
  return (
    <div>
      <section className="bf-section" style={{ paddingTop: '120px' }}>
        <div className="bf-section-header">
          <span className="bf-eyebrow">Investments</span>
          <h2>AI-Powered <span className="highlight-secondary">Investing</span></h2>
          <p>Stocks, crypto, ETFs, and AI-managed portfolios tailored to your risk profile.</p>
        </div>

        {/* Portfolio Performance */}
        <div style={{ maxWidth: '800px', margin: '0 auto 56px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
          <div className="bf-feature-card" style={{ textAlign: 'center' }}>
            <span className="bf-pill green" style={{ marginBottom: '12px' }}>Live</span>
            <h3 style={{ fontSize: '1.8rem', color: 'var(--bf-success)' }}>+14.2%</h3>
            <p style={{ color: 'var(--bf-text-muted)', fontSize: '0.85rem' }}>AI Portfolio YTD Return</p>
            <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', marginTop: '16px' }}>
              <div><span style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--bf-text)' }}>$2.8B</span><p style={{ fontSize: '0.75rem', color: 'var(--bf-text-muted)' }}>AUM</p></div>
              <div><span style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--bf-text)' }}>85K+</span><p style={{ fontSize: '0.75rem', color: 'var(--bf-text-muted)' }}>Investors</p></div>
              <div><span style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--bf-text)' }}>4.7★</span><p style={{ fontSize: '0.75rem', color: 'var(--bf-text-muted)' }}>Avg Rating</p></div>
            </div>
          </div>
          <div className="bf-feature-card">
            <h3 style={{ marginBottom: '16px' }}>Your Risk Profile</h3>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '16px' }}>
              <span className="bf-pill" style={{ cursor: 'pointer' }}>Conservative</span>
              <span className="bf-pill blue" style={{ cursor: 'pointer', opacity: 0.6 }}>Moderate</span>
              <span className="bf-pill green" style={{ cursor: 'pointer', opacity: 0.6 }}>Aggressive</span>
            </div>
            <p style={{ fontSize: '0.88rem', color: 'var(--bf-text-muted)', lineHeight: '1.6' }}>Take our 2-minute risk assessment quiz to get a personalized portfolio recommendation optimized for your goals and risk tolerance.</p>
            <Link to="/register" className="bf-btn bf-btn-secondary" style={{ marginTop: '16px', justifyContent: 'center', width: '100%' }}>
              Take Assessment <i className="fas fa-arrow-right"></i>
            </Link>
          </div>
        </div>

        {/* Investment Products */}
        <div className="bf-grid-3" style={{ marginBottom: '56px' }}>
          <div className="bf-feature-card bf-featured">
            <div className="bf-featured-badge">Best Performance</div>
            <div className="bf-feature-icon" style={{ background: 'rgba(255,78,200,0.12)', color: 'var(--bf-primary)' }}>
              <i className="fas fa-brain"></i>
            </div>
            <h3>AI Smart Portfolio</h3>
            <div className="bf-rate-value" style={{ margin: '12px 0' }}>14.2%<span className="period"> /yr</span></div>
            <p>Fully automated portfolio managed by our proprietary AI. Rebalances in real-time based on market conditions.</p>
            <ul className="bf-feature-list">
              <li><i className="fas fa-check"></i> Real-time AI rebalancing</li>
              <li><i className="fas fa-check"></i> Tax-loss harvesting</li>
              <li><i className="fas fa-check"></i> Dynamic risk adjustment</li>
              <li><i className="fas fa-check"></i> Dividend reinvestment</li>
              <li><i className="fas fa-check"></i> Performance dashboard</li>
              <li><i className="fas fa-check"></i> Monthly optimization reports</li>
            </ul>
            <Link to="/register" className="bf-btn bf-btn-primary" style={{ marginTop: '20px', width: '100%', justifyContent: 'center' }}>
              Start AI Investing <i className="fas fa-arrow-right"></i>
            </Link>
          </div>

          <div className="bf-feature-card">
            <div className="bf-feature-icon" style={{ background: 'rgba(78,158,255,0.12)', color: 'var(--bf-secondary)' }}>
              <i className="fas fa-chart-simple"></i>
            </div>
            <h3>Stocks & ETFs</h3>
            <div className="bf-rate-value" style={{ margin: '12px 0', color: 'var(--bf-secondary)' }}>Market<span className="period"> Rates</span></div>
            <p>Trade thousands of US and international stocks and ETFs with zero commission fees.</p>
            <ul className="bf-feature-list">
              <li><i className="fas fa-check"></i> 5,000+ US stocks & ETFs</li>
              <li><i className="fas fa-check"></i> Zero commission trading</li>
              <li><i className="fas fa-check"></i> Fractional shares available</li>
              <li><i className="fas fa-check"></i> Real-time market data</li>
              <li><i className="fas fa-check"></i> Extended hours trading</li>
              <li><i className="fas fa-check"></i> Advanced charting tools</li>
            </ul>
            <Link to="/register" className="bf-btn bf-btn-secondary" style={{ marginTop: '20px', width: '100%', justifyContent: 'center' }}>
              Start Trading <i className="fas fa-arrow-right"></i>
            </Link>
          </div>

          <div className="bf-feature-card">
            <div className="bf-feature-icon" style={{ background: 'rgba(255,78,200,0.12)', color: 'var(--bf-primary)' }}>
              <i className="fab fa-bitcoin"></i>
            </div>
            <h3>Crypto Trading</h3>
            <div className="bf-rate-value" style={{ margin: '12px 0' }}>50+<span className="period"> Assets</span></div>
            <p>Buy, sell, and store major cryptocurrencies with institutional-grade security.</p>
            <ul className="bf-feature-list">
              <li><i className="fas fa-check"></i> 50+ crypto assets</li>
              <li><i className="fas fa-check"></i> Cold storage custody</li>
              <li><i className="fas fa-check"></i> OTC desk for large orders</li>
              <li><i className="fas fa-check"></i> Staking & yield farming</li>
              <li><i className="fas fa-check"></i> Real-time price alerts</li>
              <li><i className="fas fa-check"></i> Multi-sig security</li>
            </ul>
            <Link to="/register" className="bf-btn bf-btn-outline" style={{ marginTop: '20px', width: '100%', justifyContent: 'center' }}>
              Buy Crypto <i className="fas fa-arrow-right"></i>
            </Link>
          </div>
        </div>

        {/* Info Box */}
        <div className="bf-info-box" style={{ maxWidth: '900px', margin: '0 auto' }}>
          <i className="fas fa-shield"></i>
          <div>
            <p><strong>Institutional-Grade Security:</strong> All investments are protected with cold storage wallets, multi-factor authentication, and real-time fraud monitoring. Crypto assets are stored in SOC 2 Type II certified custodians. Stock and ETF trades are SIPC insured up to $500,000.</p>
          </div>
        </div>
      </section>
    </div>
  );
}