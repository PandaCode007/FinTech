import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Contact({ settings }) {
  const [submitted, setSubmitted] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [faqOpen, setFaqOpen] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    try {
      const res = await fetch('/api/public/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.value,
          email: form.email.value,
          subject: form.subject.value,
          message: form.message.value,
        }),
      });
      if (res.ok) setSubmitted(true);
    } catch {
      setSubmitted(true);
    }
  };

  const faqs = [
    { q: 'How do I open an account?', a: 'Opening an account takes less than 3 minutes. Download the app or sign up on our website, verify your identity with a valid ID, and you\'re ready to start banking.' },
    { q: 'What are the fees?', a: 'ButterField has zero monthly fees, zero ATM fees at 50,000+ locations, and no foreign transaction fees. Premium accounts earn 2% cashback on all purchases.' },
    { q: 'How fast are international transfers?', a: 'Most international transfers arrive within seconds. We support 150+ currencies with real-time exchange rates and no hidden fees.' },
    { q: 'Is my money safe?', a: 'Yes. We use 256-bit SSL encryption, biometric authentication, and AI-powered fraud detection. Deposits are FDIC insured up to $250,000.' },
    { q: 'How do I contact support?', a: 'You can reach us via live chat (24/7), email at customercare@butterfieldapp.com, or call us at 07915636507. Premium users get dedicated account managers.' },
    { q: 'What investment options are available?', a: 'We offer AI-managed portfolios, individual stocks and ETFs (5,000+), and cryptocurrency trading (50+ assets). Minimum investment starts at $1.' },
    { q: 'Can I get a loan?', a: 'Yes! We offer personal loans from 3.9% APR, business loans up to $500K, and a credit builder program. Most applications get approved within 60 seconds.' },
    { q: 'How does the savings vault work?', a: 'Our high-yield vault earns up to 6.8% APY with daily compounding. You can set savings goals, automate deposits, and withdraw anytime with no penalties.' },
  ];

  return (
    <div>
      <section className="bf-section" style={{ paddingTop: '120px' }}>
        <div className="bf-section-header">
          <span className="bf-eyebrow">Support Center</span>
          <h2>We're Here to <span className="highlight">Help</span></h2>
          <p>24/7 customer support via live chat, email, and phone. Get answers in seconds, not hours.</p>
        </div>

        {/* Support Cards */}
        <div className="bf-grid-4" style={{ marginBottom: '56px' }}>
          {[
            { icon: 'fa-comment-dots', color: 'var(--bf-primary)', bg: 'rgba(255,78,200,0.12)', title: 'Live Chat', desc: 'Chat with our support team in real-time. Average response: 30 seconds.', action: 'Start Chat', hours: '24/7 Support' },
            { icon: 'fa-envelope', color: 'var(--bf-secondary)', bg: 'rgba(78,158,255,0.12)', title: 'Email Support', desc: 'Send us a detailed message and we\'ll respond within 2 hours during business hours.', action: 'Send Email', hours: 'Response < 2 hrs' },
            { icon: 'fa-phone', color: 'var(--bf-primary)', bg: 'rgba(255,78,200,0.12)', title: 'Phone Support', desc: 'Speak directly with a support specialist for urgent matters.', action: 'Call Now', hours: '24/7 Hotline' },
            { icon: 'fa-circle-question', color: 'var(--bf-secondary)', bg: 'rgba(78,158,255,0.12)', title: 'Help Center', desc: 'Browse our comprehensive knowledge base with guides and tutorials.', action: 'Browse Guides', hours: 'Self-Service' },
          ].map((item, i) => (
            <div key={i} className="bf-feature-card" style={{ textAlign: 'center' }}>
              <div className="bf-feature-icon" style={{ background: item.bg, color: item.color, margin: '0 auto 16px' }}>
                <i className={`fas ${item.icon}`}></i>
              </div>
              <h3>{item.title}</h3>
              <p style={{ fontSize: '0.85rem', marginBottom: '12px' }}>{item.desc}</p>
              <span className="bf-pill" style={{ marginBottom: '16px', display: 'inline-block' }}>{item.hours}</span>
              <Link to="#" className="bf-btn bf-btn-outline" style={{ marginTop: '12px', width: '100%', justifyContent: 'center' }} onClick={(e) => { e.preventDefault(); if (i === 0) setChatOpen(true); }}>
                {item.action} <i className="fas fa-arrow-right"></i>
              </Link>
            </div>
          ))}
        </div>

        {/* Contact Form + Info */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', maxWidth: '1000px', margin: '0 auto 56px' }}>
          <div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '20px' }}>Send Us a Message</h3>
            <div className="bf-contact-form">
              {submitted ? (
                <div style={{ textAlign: 'center', padding: '40px 0' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '16px', color: 'var(--bf-success)' }}><i className="fas fa-check-circle"></i></div>
                  <h3 style={{ color: 'var(--bf-text)', marginBottom: '8px' }}>Message Sent!</h3>
                  <p style={{ color: 'var(--bf-text-muted)' }}>Our team will get back to you within 2 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="bf-form-group">
                    <label>Full Name</label>
                    <input name="name" type="text" required placeholder="Your full name" />
                  </div>
                  <div className="bf-form-group">
                    <label>Email Address</label>
                    <input name="email" type="email" required placeholder="you@example.com" />
                  </div>
                  <div className="bf-form-group">
                    <label>Subject</label>
                    <select name="subject" required>
                      <option value="">Select a topic</option>
                      <option value="general">General Inquiry</option>
                      <option value="support">Technical Support</option>
                      <option value="billing">Billing & Payments</option>
                      <option value="account">Account Issues</option>
                      <option value="loans">Loan Applications</option>
                      <option value="investments">Investment Help</option>
                      <option value="partnership">Partnership</option>
                      <option value="complaint">Complaint</option>
                    </select>
                  </div>
                  <div className="bf-form-group">
                    <label>Message</label>
                    <textarea name="message" rows="5" required placeholder="How can we help you today?" style={{ resize: 'vertical' }}></textarea>
                  </div>
                  <button className="bf-btn bf-btn-primary" type="submit" style={{ width: '100%', justifyContent: 'center' }}>
                    Send Message <i className="fas fa-paper-plane"></i>
                  </button>
                </form>
              )}
            </div>
          </div>
          <div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '20px' }}>Contact Information</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {[
                { icon: 'fa-map-marker-alt', title: 'Headquarters', text: settings?.company_address || 'Butterfield Place, 12 Albert Panton Street, Grand Cayman KY1-1107, CAYMAN ISLANDS' },
                { icon: 'fa-phone', title: 'Phone Support', text: settings?.company_phone || '07915636507' },
                { icon: 'fa-envelope', title: 'Email Address', text: settings?.company_email || 'customercare@butterfieldapp.com' },
                { icon: 'fa-clock', title: 'Support Hours', text: '24 hours a day, 7 days a week — including holidays' },
              ].map((item, i) => (
                <div key={i} className="bf-feature-card" style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', padding: '24px' }}>
                  <div className="bf-feature-icon" style={{ background: i % 2 === 0 ? 'rgba(255,78,200,0.12)' : 'rgba(78,158,255,0.12)', color: i % 2 === 0 ? 'var(--bf-primary)' : 'var(--bf-secondary)', flexShrink: 0, marginBottom: 0 }}>
                    <i className={`fas ${item.icon}`}></i>
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1rem', marginBottom: '4px' }}>{item.title}</h3>
                    <p style={{ fontSize: '0.88rem', color: 'var(--bf-text-muted)', margin: 0, lineHeight: '1.6' }}>{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bf-divider" style={{ marginBottom: '48px' }}>Frequently Asked Questions</div>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {faqs.map((faq, i) => (
              <div key={i} className="bf-faq-item" onClick={() => setFaqOpen(faqOpen === i ? null : i)}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h4>{faq.q}</h4>
                  <i className={`fas fa-chevron-${faqOpen === i ? 'up' : 'down'}`} style={{ color: 'var(--bf-text-muted)', fontSize: '0.8rem', transition: 'transform 0.3s' }}></i>
                </div>
                {faqOpen === i && <p>{faq.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Chat Floating Badge */}
      <button className="bf-chat-badge" onClick={() => setChatOpen(true)} aria-label="Open live chat">
        <i className="fas fa-comment"></i>
      </button>

      {/* Live Chat Modal */}
      {chatOpen && (
        <div className="bf-modal-overlay" onClick={() => setChatOpen(false)}>
          <div className="bf-login-modal" onClick={e => e.stopPropagation()} style={{ maxWidth: '380px', padding: '32px 28px' }}>
            <button className="bf-modal-close" onClick={() => setChatOpen(false)}>&times;</button>
            <div className="bf-modal-icon" style={{ background: 'rgba(78,158,255,0.12)', color: 'var(--bf-secondary)' }}><i className="fas fa-comment-dots"></i></div>
            <h3>Live Chat Support</h3>
            <p>Our team is online and ready to help. How can we assist you today?</p>
            <div className="bf-form-group" style={{ textAlign: 'left' }}>
              <label>Your Message</label>
              <textarea rows="3" style={{ width: '100%', padding: '14px 16px', borderRadius: '10px', border: '1px solid var(--bf-border)', background: 'rgba(0,0,0,0.4)', color: 'var(--bf-text)', fontSize: '0.95rem', outline: 'none', fontFamily: 'inherit', resize: 'none' }} placeholder="Type your message here..."></textarea>
            </div>
            <button className="bf-btn bf-btn-secondary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => { setChatOpen(false); alert('A support agent will be with you shortly. In production, this would connect to a live chat system.'); }}>
              Start Chat <i className="fas fa-arrow-right"></i>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}