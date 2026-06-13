import { Link } from 'react-router-dom';

export default function Save({ settings }) {
  return (
    <div>
      <section className="bf-section" style={{ paddingTop: '120px' }}>
        <div className="bf-section-header">
          <span className="bf-eyebrow">Savings</span>
          <h2>High-Yield <span className="highlight">Vaults</span></h2>
          <p>Grow your wealth with automated savings, goal-based vaults, and tiered interest rates.</p>
        </div>

        {/* Rate Comparison */}
        <div className="bf-grid-4" style={{ marginBottom: '56px' }}>
          {[
            { tier: 'Standard', rate: '3.5%', period: ' APY', min: 'No minimum', color: 'var(--bf-text-muted)' },
            { tier: 'Premium', rate: '5.2%', period: ' APY', min: '$10,000+', color: 'var(--bf-primary)' },
            { tier: 'Pro', rate: '6.8%', period: ' APY', min: '$50,000+', color: 'var(--bf-secondary)' },
            { tier: 'Enterprise', rate: '8.0%', period: ' APY', min: '$250,000+', color: 'var(--bf-primary)' },
          ].map((r, i) => (
            <div key={i} className="bf-rate-card">
              <div className="bf-rate-label">{r.tier} Vault</div>
              <div className="bf-rate-value" style={r.tier === 'Pro' ? { color: 'var(--bf-secondary)' } : {}}>{r.rate}<span className="period">{r.period}</span></div>
              <div className="bf-rate-name" style={{ fontSize: '0.8rem', color: 'var(--bf-text-muted)' }}>{r.min}</div>
              <span className="bf-pill" style={r.tier === 'Pro' ? { background: 'rgba(78,158,255,0.1)', color: 'var(--bf-secondary)' } : r.tier === 'Standard' ? { background: 'rgba(179,179,179,0.1)', color: 'var(--bf-text-muted)' } : {}}>
                {r.tier === 'Standard' ? 'Starter' : r.tier === 'Premium' ? 'Popular' : r.tier === 'Pro' ? 'Best Value' : 'Institutional'}
              </span>
            </div>
          ))}
        </div>

        {/* Savings Products */}
        <div className="bf-grid-3">
          <div className="bf-feature-card bf-featured">
            <div className="bf-featured-badge">Best for Growth</div>
            <div className="bf-feature-icon" style={{ background: 'rgba(255,78,200,0.12)', color: 'var(--bf-primary)' }}>
              <i className="fas fa-vault"></i>
            </div>
            <h3>High-Yield Vault</h3>
            <div className="bf-rate-value" style={{ margin: '12px 0' }}>5.2%<span className="period"> APY</span></div>
            <p>Compound your savings daily with our best-in-class high-yield vault. Auto-compound interest with zero fees.</p>
            <ul className="bf-feature-list">
              <li><i className="fas fa-check"></i> Daily compound interest</li>
              <li><i className="fas fa-check"></i> No minimum balance required</li>
              <li><i className="fas fa-check"></i> Instant withdrawals anytime</li>
              <li><i className="fas fa-check"></i> Auto-save round-ups included</li>
              <li><i className="fas fa-check"></i> FDIC insured up to $250K</li>
            </ul>
            <Link to="/register" className="bf-btn bf-btn-primary" style={{ marginTop: '20px', width: '100%', justifyContent: 'center' }}>
              Open Vault <i className="fas fa-arrow-right"></i>
            </Link>
          </div>

          <div className="bf-feature-card">
            <div className="bf-feature-icon" style={{ background: 'rgba(78,158,255,0.12)', color: 'var(--bf-secondary)' }}>
              <i className="fas fa-bullseye"></i>
            </div>
            <h3>Goal-Based Saving</h3>
            <p>Set savings goals and let our AI optimize your savings plan to reach them faster.</p>
            <ul className="bf-feature-list">
              <li><i className="fas fa-check"></i> Custom savings goals</li>
              <li><i className="fas fa-check"></i> AI-optimized savings plans</li>
              <li><i className="fas fa-check"></i> Visual progress tracking</li>
              <li><i className="fas fa-check"></i> Milestone rewards & bonuses</li>
              <li><i className="fas fa-check"></i> Multiple goal management</li>
              <li><i className="fas fa-check"></i> Automatic top-up options</li>
            </ul>
            <Link to="/register" className="bf-btn bf-btn-secondary" style={{ marginTop: '20px', width: '100%', justifyContent: 'center' }}>
              Set a Goal <i className="fas fa-arrow-right"></i>
            </Link>
          </div>

          <div className="bf-feature-card">
            <div className="bf-feature-icon" style={{ background: 'rgba(255,78,200,0.12)', color: 'var(--bf-primary)' }}>
              <i className="fas fa-robot"></i>
            </div>
            <h3>Automated Savings</h3>
            <p>Set-and-forget smart savings that automatically grow your money based on your habits.</p>
            <ul className="bf-feature-list">
              <li><i className="fas fa-check"></i> Round-up spare change</li>
              <li><i className="fas fa-check"></i> Recurring auto-transfers</li>
              <li><i className="fas fa-check"></i> AI-driven savings insights</li>
              <li><i className="fas fa-check"></i> Smart paycheck splitting</li>
              <li><i className="fas fa-check"></i> Save the change feature</li>
              <li><i className="fas fa-check"></i> Boost savings on payday</li>
            </ul>
            <Link to="/register" className="bf-btn bf-btn-outline" style={{ marginTop: '20px', width: '100%', justifyContent: 'center' }}>
              Automate Now <i className="fas fa-arrow-right"></i>
            </Link>
          </div>
        </div>

        {/* Info Box */}
        <div className="bf-info-box" style={{ marginTop: '48px', maxWidth: '900px', margin: '48px auto 0' }}>
          <i className="fas fa-chart-line"></i>
          <div>
            <p><strong>Interest Tiers Explained:</strong> The more you save, the more you earn. Our tiered system automatically upgrades your rate as your balance grows. Premium tier unlocks at $10K, Pro at $50K, and Enterprise at $250K. Rates are calculated daily and paid monthly.</p>
          </div>
        </div>
      </section>
    </div>
  );
}