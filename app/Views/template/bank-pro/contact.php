<!-- Contact Page -->
<section class="bf-page-hero">
    <span class="bf-eyebrow">We're Here to Help</span>
    <h1>Get in <span class="highlight">Touch</span></h1>
    <p>Our team is here 24/7 to help. Reach out via phone, email, or live chat — we're always ready to assist with anything you need.</p>
</section>

<section class="bf-section" style="padding-top:40px;">
    <div class="bf-stats-band">
        <div class="bf-stat-box"><div class="num">24/7</div><span class="label">Live Support</span></div>
        <div class="bf-stat-box"><div class="num">2min</div><span class="label">Avg. Wait Time</span></div>
        <div class="bf-stat-box"><div class="num">98%</div><span class="label">Satisfaction Rate</span></div>
        <div class="bf-stat-box"><div class="num">40+</div><span class="label">Languages</span></div>
    </div>
</section>

<section class="bf-section">
    <div class="bf-section-header">
        <h2>Contact <span class="highlight">Information</span></h2>
        <p>Choose the best way to reach us. We respond within minutes during business hours.</p>
    </div>
    <div class="bf-grid-3">
        <div class="bf-account-card">
            <div class="bf-account-card-icon" style="background:rgba(233,69,96,0.15);color:var(--bf-accent);">
                <i class="fas fa-headset"></i>
            </div>
            <h3>24/7 Support</h3>
            <p>Live agents available around the clock. Average wait time: under 2 minutes.</p>
            <a href="tel:+18005551234" class="bf-btn bf-btn-primary" style="justify-content:center;margin-top:auto;">
                <i class="fas fa-phone"></i> Call Now
            </a>
        </div>

        <div class="bf-account-card">
            <div class="bf-account-card-icon" style="background:rgba(245,166,35,0.15);color:var(--bf-gold);">
                <i class="fas fa-envelope"></i>
            </div>
            <h3>Email Us</h3>
            <p>Send us a detailed message. We respond within 2 business hours.</p>
            <a href="mailto:<?= $company_email ?>" class="bf-btn bf-btn-primary" style="justify-content:center;margin-top:auto;">
                <i class="fas fa-paper-plane"></i> Send Email
            </a>
        </div>

        <div class="bf-account-card">
            <div class="bf-account-card-icon" style="background:rgba(46,213,115,0.15);color:var(--bf-success);">
                <i class="fas fa-comments"></i>
            </div>
            <h3>Live Chat</h3>
            <p>Get instant answers from our AI assistant or connect to a human expert.</p>
            <a href="#" class="bf-btn bf-btn-primary" style="justify-content:center;margin-top:auto;">
                <i class="fas fa-message"></i> Start Chat
            </a>
        </div>
    </div>
</section>

<!-- Departments -->
<section class="bf-section" style="padding-top:0;">
    <div class="bf-section-header">
        <h2>Reach the Right <span class="highlight">Team</span></h2>
        <p>Connect directly with the department that can help you fastest.</p>
    </div>
    <div class="bf-grid-4">
        <div class="bf-feature-card">
            <div class="bf-feature-icon" style="background:rgba(233,69,96,0.15);color:var(--bf-accent);"><i class="fas fa-user-shield"></i></div>
            <h3>Account Support</h3>
            <p>Login issues, account changes, and general questions.</p>
        </div>
        <div class="bf-feature-card">
            <div class="bf-feature-icon" style="background:rgba(245,166,35,0.15);color:var(--bf-gold);"><i class="fas fa-file-invoice-dollar"></i></div>
            <h3>Loans & Credit</h3>
            <p>Applications, rates, and repayment assistance.</p>
        </div>
        <div class="bf-feature-card">
            <div class="bf-feature-icon" style="background:rgba(46,213,115,0.15);color:var(--bf-success);"><i class="fas fa-chart-line"></i></div>
            <h3>Investments</h3>
            <p>Portfolio questions and advisor consultations.</p>
        </div>
        <div class="bf-feature-card">
            <div class="bf-feature-icon" style="background:rgba(55,66,250,0.15);color:var(--bf-info);"><i class="fas fa-building"></i></div>
            <h3>Business Banking</h3>
            <p>Dedicated support for business accounts.</p>
        </div>
    </div>
</section>

<section class="bf-rates-section">
    <div class="bf-section" style="position:relative;z-index:1;">
        <div class="bf-section-header">
            <h2>Send Us a <span class="highlight-gold">Message</span></h2>
            <p>Fill out the form below and our team will get back to you within 2 business hours.</p>
        </div>
        <form class="bf-contact-form" action="<?= base_url('contact') ?>" method="POST">
            <?= csrf_field() ?>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:20px;">
                <div class="bf-form-group" style="margin-bottom:0;">
                    <label>First Name</label>
                    <input type="text" name="first_name" required>
                </div>
                <div class="bf-form-group" style="margin-bottom:0;">
                    <label>Last Name</label>
                    <input type="text" name="last_name">
                </div>
            </div>
            <div class="bf-form-group">
                <label>Email Address</label>
                <input type="email" name="email" required>
            </div>
            <div class="bf-form-group">
                <label>Phone Number</label>
                <input type="tel" name="phone">
            </div>
            <div class="bf-form-group">
                <label>Subject</label>
                <select name="subject" required>
                    <option value="">Select a topic...</option>
                    <option>Account Support</option>
                    <option>Technical Issue</option>
                    <option>Billing Question</option>
                    <option>Product Information</option>
                    <option>Other</option>
                </select>
            </div>
            <div class="bf-form-group">
                <label>Message</label>
                <textarea name="message" rows="5" required style="width:100%;padding:14px 16px;border-radius:12px;border:1px solid rgba(255,255,255,0.1);background:rgba(255,255,255,0.05);color:#fff;font-size:0.95rem;outline:none;transition:border-color 0.2s;box-sizing:border-box;font-family:inherit;resize:vertical;"></textarea>
            </div>
            <button type="submit" class="bf-btn bf-btn-primary" style="width:100%;justify-content:center;padding:16px 24px;font-size:1rem;">
                Send Message <i class="fas fa-paper-plane"></i>
            </button>
        </form>
    </div>
</section>

<section class="bf-section">
    <div class="bf-section-header">
        <h2>Visit <span class="highlight">Us</span></h2>
    </div>
    <div class="bf-contact-info">
        <div class="bf-contact-info-icon"><i class="fas fa-map-marker-alt"></i></div>
        <div>
            <h4>Headquarters</h4>
            <p><?= $company_address ?></p>
        </div>
    </div>
    <div class="bf-contact-info">
        <div class="bf-contact-info-icon"><i class="fas fa-clock"></i></div>
        <div>
            <h4>Branch Hours</h4>
            <p>Mon-Thurs: 8:30 AM - 5:00 PM | Friday: 8:30 AM - 6:00 PM | Saturday: 9:00 AM - 1:00 PM</p>
        </div>
    </div>
    <div class="bf-contact-info">
        <div class="bf-contact-info-icon"><i class="fas fa-phone-alt"></i></div>
        <div>
            <h4>Customer Service</h4>
            <p><?= $company_email ?></p>
        </div>
    </div>
    <div class="bf-contact-info">
        <div class="bf-contact-info-icon"><i class="fas fa-shield-alt"></i></div>
        <div>
            <h4>Fraud Hotline</h4>
            <p>24/7 dedicated line for reporting suspicious activity on your account</p>
        </div>
    </div>
</section>

<!-- FAQ -->
<section class="bf-rates-section">
    <div class="bf-section" style="position:relative;z-index:1;">
        <div class="bf-section-header">
            <h2>Common <span class="highlight-gold">Questions</span></h2>
            <p>Quick answers to help you before you even reach out.</p>
        </div>
        <div class="bf-faq">
            <div class="bf-faq-item"><button class="bf-faq-q">How do I reset my password? <i class="fas fa-chevron-down"></i></button><div class="bf-faq-a">Click "Forgot Password" on the login page and follow the secure link sent to your registered email. For help, our 24/7 support team is one call or chat away.</div></div>
            <div class="bf-faq-item"><button class="bf-faq-q">How fast will I get a response? <i class="fas fa-chevron-down"></i></button><div class="bf-faq-a">Live chat and phone are answered in under 2 minutes on average. Email and contact form messages receive a reply within 2 business hours.</div></div>
            <div class="bf-faq-item"><button class="bf-faq-q">How do I report a lost or stolen card? <i class="fas fa-chevron-down"></i></button><div class="bf-faq-a">Freeze your card instantly in the mobile app, then call our 24/7 fraud hotline. We'll issue a replacement and protect you with $0 fraud liability.</div></div>
            <div class="bf-faq-item"><button class="bf-faq-q">Do you offer support in other languages? <i class="fas fa-chevron-down"></i></button><div class="bf-faq-a">Yes — our support is available in 40+ languages through phone interpreters and our multilingual chat assistant.</div></div>
        </div>
    </div>
</section>

<section class="bf-section">
    <div class="bf-cta-band">
        <h2>Still have questions?</h2>
        <p>Our team is standing by 24/7 to give you the answers you need.</p>
        <div class="bf-cta-buttons">
            <a href="tel:+18005551234" class="bf-btn bf-btn-light"><i class="fas fa-phone"></i> Call Us Now</a>
            <a href="#" class="bf-btn bf-btn-outline"><i class="fas fa-comments"></i> Start Live Chat</a>
        </div>
    </div>
</section>
</content>