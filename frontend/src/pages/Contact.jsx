import { useState } from 'react';

export default function Contact({ settings }) {
  const [submitted, setSubmitted] = useState(false);

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

  return (
    <div>
      <section className="bf-section" style={{ paddingTop: '120px' }}>
        <div className="bf-section-header">
          <span className="bf-eyebrow">Contact Us</span>
          <h2>Get in <span className="highlight">Touch</span></h2>
          <p>Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', maxWidth: '900px', margin: '0 auto' }}>
          <div>
            <div className="bf-contact-form">
              {submitted ? (
                <div style={{ textAlign: 'center', padding: '40px 0' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '16px' }}>✅</div>
                  <h3 style={{ color: '#fff', marginBottom: '8px' }}>Message Sent!</h3>
                  <p style={{ color: 'var(--bf-text-muted)' }}>We'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="bf-form-group" style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', fontSize: '0.82rem', color: 'rgba(255,255,255,0.7)', marginBottom: '6px', fontWeight: 500 }}>Full Name</label>
                    <input name="name" type="text" required placeholder="Your name" />
                  </div>
                  <div className="bf-form-group" style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', fontSize: '0.82rem', color: 'rgba(255,255,255,0.7)', marginBottom: '6px', fontWeight: 500 }}>Email Address</label>
                    <input name="email" type="email" required placeholder="you@example.com" />
                  </div>
                  <div className="bf-form-group" style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', fontSize: '0.82rem', color: 'rgba(255,255,255,0.7)', marginBottom: '6px', fontWeight: 500 }}>Subject</label>
                    <select name="subject" required>
                      <option value="">Select a topic</option>
                      <option value="general">General Inquiry</option>
                      <option value="support">Technical Support</option>
                      <option value="billing">Billing</option>
                      <option value="partnership">Partnership</option>
                    </select>
                  </div>
                  <div className="bf-form-group" style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', fontSize: '0.82rem', color: 'rgba(255,255,255,0.7)', marginBottom: '6px', fontWeight: 500 }}>Message</label>
                    <textarea name="message" rows="5" required placeholder="How can we help you?" style={{ resize: 'vertical' }}></textarea>
                  </div>
                  <button className="bf-btn bf-btn-primary" type="submit" style={{ width: '100%', justifyContent: 'center' }}>
                    Send Message <i className="fas fa-paper-plane"></i>
                  </button>
                </form>
              )}
            </div>
          </div>
          <div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {[
                { icon: 'fa-map-marker-alt', title: 'Address', text: settings?.company_address || 'Butterfield Place, 12 Albert Panton Street, Grand Cayman KY1-1107, CAYMAN ISLANDS' },
                { icon: 'fa-phone', title: 'Phone', text: settings?.company_phone || '07915636507' },
                { icon: 'fa-envelope', title: 'Email', text: settings?.company_email || 'customercare@butterfieldapp.com' },
                { icon: 'fa-clock', title: 'Hours', text: '24/7 Customer Support' },
              ].map((item, i) => (
                <div key={i} className="bf-feature-card" style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                  <div className="bf-feature-icon" style={{ background: 'rgba(233,69,96,0.15)', color: 'var(--bf-accent)', flexShrink: 0 }}>
                    <i className={`fas ${item.icon}`}></i>
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1rem', marginBottom: '4px' }}>{item.title}</h3>
                    <p style={{ fontSize: '0.9rem', color: 'var(--bf-text-muted)', margin: 0 }}>{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}