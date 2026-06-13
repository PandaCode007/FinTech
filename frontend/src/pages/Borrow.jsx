import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Borrow({ settings }) {
  const [loanAmount, setLoanAmount] = useState(10000);
  const [loanTerm, setLoanTerm] = useState(36);

  const interestRate = 3.9;
  const monthlyPayment = ((loanAmount * (interestRate / 100 / 12)) / (1 - Math.pow(1 + interestRate / 100 / 12, -loanTerm))).toFixed(2);
  const totalInterest = (parseFloat(monthlyPayment) * loanTerm - loanAmount).toFixed(2);

  return (
    <div>
      <section className="bf-section" style={{ paddingTop: '120px' }}>
        <div className="bf-section-header">
          <span className="bf-eyebrow">Borrow</span>
          <h2>Borrow <span className="highlight">Smartly</span>, Build <span className="highlight-secondary">Credit</span></h2>
          <p>Competitive rates, instant approval, and flexible repayment options tailored to your needs.</p>
        </div>

        {/* Loan Calculator */}
        <div style={{ maxWidth: '800px', margin: '0 auto 56px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
          <div className="bf-feature-card">
            <h3 style={{ marginBottom: '20px' }}>Repayment Calculator</h3>
            <div className="bf-form-group">
              <label>Loan Amount: <strong style={{ color: 'var(--bf-primary)' }}>${loanAmount.toLocaleString()}</strong></label>
              <input type="range" className="bf-calc-input" min="1000" max="100000" step="1000" value={loanAmount} onChange={e => setLoanAmount(Number(e.target.value))} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--bf-text-muted)', marginTop: '4px' }}>
                <span>$1,000</span>
                <span>$100,000</span>
              </div>
            </div>
            <div className="bf-form-group">
              <label>Loan Term: <strong style={{ color: 'var(--bf-secondary)' }}>{loanTerm} months</strong></label>
              <input type="range" className="bf-calc-input" min="12" max="72" step="6" value={loanTerm} onChange={e => setLoanTerm(Number(e.target.value))} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--bf-text-muted)', marginTop: '4px' }}>
                <span>12 mo</span>
                <span>72 mo</span>
              </div>
            </div>
          </div>
          <div className="bf-calc-display" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', background: 'var(--bf-surface)', border: '1px solid var(--bf-border)', borderRadius: '20px', padding: '32px' }}>
            <p style={{ color: 'var(--bf-text-muted)', fontSize: '0.85rem', marginBottom: '8px' }}>Monthly Payment</p>
            <div className="bf-rate-value" style={{ fontSize: '2.8rem', marginBottom: '4px' }}>${monthlyPayment}</div>
            <p style={{ color: 'var(--bf-text-muted)', fontSize: '0.85rem' }}>Total interest: ${totalInterest} at {interestRate}% APR</p>
            <Link to="/register" className="bf-btn bf-btn-primary" style={{ marginTop: '20px', justifyContent: 'center' }}>
              Apply Now <i className="fas fa-arrow-right"></i>
            </Link>
          </div>
        </div>

        {/* Loan Products */}
        <div className="bf-grid-3" style={{ marginBottom: '56px' }}>
          <div className="bf-feature-card bf-featured">
            <div className="bf-featured-badge">Instant Approval</div>
            <div className="bf-feature-icon" style={{ background: 'rgba(255,78,200,0.12)', color: 'var(--bf-primary)' }}>
              <i className="fas fa-user"></i>
            </div>
            <h3>Personal Loan</h3>
            <div className="bf-rate-value" style={{ margin: '12px 0' }}>3.9%<span className="period"> APR</span></div>
            <p>Quick approval for personal expenses, debt consolidation, or major purchases.</p>
            <ul className="bf-feature-list">
              <li><i className="fas fa-check"></i> Same-day approval decision</li>
              <li><i className="fas fa-check"></i> No collateral required</li>
              <li><i className="fas fa-check"></i> Funds in minutes post-approval</li>
              <li><i className="fas fa-check"></i> Terms from 12–72 months</li>
              <li><i className="fas fa-check"></i> No prepayment penalties</li>
              <li><i className="fas fa-check"></i> Fixed monthly payments</li>
            </ul>
            <Link to="/register" className="bf-btn bf-btn-primary" style={{ marginTop: '20px', width: '100%', justifyContent: 'center' }}>
              Apply Now <i className="fas fa-arrow-right"></i>
            </Link>
          </div>

          <div className="bf-feature-card">
            <div className="bf-feature-icon" style={{ background: 'rgba(78,158,255,0.12)', color: 'var(--bf-secondary)' }}>
              <i className="fas fa-arrow-trend-up"></i>
            </div>
            <h3>Credit Builder</h3>
            <p>Build or rebuild your credit score with our secured credit builder loan.</p>
            <ul className="bf-feature-list">
              <li><i className="fas fa-check"></i> Reports to all 3 bureaus</li>
              <li><i className="fas fa-check"></i> Low minimum deposit</li>
              <li><i className="fas fa-check"></i> No credit check required</li>
              <li><i className="fas fa-check"></i> Build credit with payments</li>
              <li><i className="fas fa-check"></i> Graduation to unsecured</li>
              <li><i className="fas fa-check"></i> Credit score tracking</li>
            </ul>
            <Link to="/register" className="bf-btn bf-btn-secondary" style={{ marginTop: '20px', width: '100%', justifyContent: 'center' }}>
              Build Credit <i className="fas fa-arrow-right"></i>
            </Link>
          </div>

          <div className="bf-feature-card">
            <div className="bf-feature-icon" style={{ background: 'rgba(255,78,200,0.12)', color: 'var(--bf-primary)' }}>
              <i className="fas fa-briefcase"></i>
            </div>
            <h3>Business Loan</h3>
            <div className="bf-rate-value" style={{ margin: '12px 0', color: 'var(--bf-secondary)' }}>5.2%<span className="period"> APR</span></div>
            <p>Fuel your business growth with flexible financing solutions tailored for you.</p>
            <ul className="bf-feature-list">
              <li><i className="fas fa-check"></i> Up to $500,000 funding</li>
              <li><i className="fas fa-check"></i> Line of credit available</li>
              <li><i className="fas fa-check"></i> Dedicated account advisor</li>
              <li><i className="fas fa-check"></i> Custom repayment plans</li>
              <li><i className="fas fa-check"></i> No early repayment fees</li>
              <li><i className="fas fa-check"></i> Revenue-based options</li>
            </ul>
            <Link to="/register" className="bf-btn bf-btn-outline" style={{ marginTop: '20px', width: '100%', justifyContent: 'center' }}>
              Apply for Business <i className="fas fa-arrow-right"></i>
            </Link>
          </div>
        </div>

        {/* Info Box */}
        <div className="bf-info-box" style={{ maxWidth: '900px', margin: '0 auto' }}>
          <i className="fas fa-circle-info"></i>
          <div>
            <p><strong>Instant Approval:</strong> Our AI-powered underwriting engine reviews your application in seconds. Most applicants receive a decision within 60 seconds. Funds are disbursed instantly upon approval — no waiting days for bank transfers.</p>
          </div>
        </div>
      </section>
    </div>
  );
}