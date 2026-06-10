<!-- ButterField Worldwide - Modern Fintech Hero Section -->
<section class="bf-hero">
    <div class="bf-hero-content">
        <div class="bf-hero-text">
            <h1>
                Banking That<br>
                <span class="highlight">Works for You</span><br>
                <span class="highlight-gold">Anytime, Anywhere</span>
            </h1>
            <p>
                Welcome to ButterField Worldwide — where modern fintech meets trusted banking. 
                Experience seamless digital banking, smart investments, and secure global transfers 
                all from one powerful platform.
            </p>
            <div class="bf-hero-buttons">
                <a href="#" class="bf-btn bf-btn-primary" onclick="event.preventDefault(); var m=document.getElementById('header-register'); if(typeof openRevealModal==='function') openRevealModal(m);">
                    Open Account <i class="fas fa-arrow-right"></i>
                </a>
                <a href="#features" class="bf-btn bf-btn-outline">
                    <i class="fas fa-play-circle"></i> How It Works
                </a>
            </div>
            <div class="bf-hero-stats">
                <div class="bf-hero-stat">
                    <h3>$2.8B+</h3>
                    <p>Assets Under Management</p>
                </div>
                <div class="bf-hero-stat">
                    <h3>50K+</h3>
                    <p>Active Users</p>
                </div>
                <div class="bf-hero-stat">
                    <h3>99.9%</h3>
                    <p>Uptime Guarantee</p>
                </div>
            </div>
        </div>

        <div class="bf-hero-visual">
            <div class="bf-hero-card">
                <div class="bf-hero-card-header">
                    <span class="bf-hero-card-brand">ButterField</span>
                    <div class="bf-hero-card-chip"></div>
                </div>
                <div class="bf-hero-card-number">•••• •••• •••• 4829</div>
                <div class="bf-hero-card-details">
                    <div>
                        <div class="bf-hero-card-label">Card Holder</div>
                        <div class="bf-hero-card-value">Valued Member</div>
                    </div>
                    <div>
                        <div class="bf-hero-card-label">Expires</div>
                        <div class="bf-hero-card-value"><?= date('m') . '/' . (date('y') + 4) ?></div>
                    </div>
                    <div>
                        <div class="bf-hero-card-label">CVV</div>
                        <div class="bf-hero-card-value">•••</div>
                    </div>
                </div>
            </div>

            <div class="bf-float-badge">
                <div class="bf-float-badge-icon green"><i class="fas fa-check-circle"></i></div>
                <div class="bf-float-badge-text">
                    <h4>Instant Approval</h4>
                    <p>Under 5 Minutes</p>
                </div>
            </div>
            <div class="bf-float-badge">
                <div class="bf-float-badge-icon blue"><i class="fas fa-shield-alt"></i></div>
                <div class="bf-float-badge-text">
                    <h4>Secure Banking</h4>
                    <p>256-bit Encryption</p>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Features Section -->
<section class="bf-section" id="features">
    <div class="bf-section-header">
        <h2>Everything You Need in <span class="highlight">One Place</span></h2>
        <p>From everyday banking to long-term investments, ButterField provides a complete financial ecosystem.</p>
    </div>
    <div class="bf-grid-3">
        <div class="bf-feature-card">
            <div class="bf-feature-icon" style="background:rgba(233,69,96,0.15);color:var(--bf-accent);">
                <i class="fas fa-university"></i>
            </div>
            <h3>Smart Checking</h3>
            <p>Fee-free digital checking accounts with real-time notifications, instant transfers, and intelligent budgeting tools.</p>
        </div>
        <div class="bf-feature-card">
            <div class="bf-feature-icon" style="background:rgba(245,166,35,0.15);color:var(--bf-gold);">
                <i class="fas fa-piggy-bank"></i>
            </div>
            <h3>High-Yield Savings</h3>
            <p>Earn competitive interest rates on your savings with flexible access and automated savings plans built for growth.</p>
        </div>
        <div class="bf-feature-card">
            <div class="bf-feature-icon" style="background:rgba(46,213,115,0.15);color:var(--bf-success);">
                <i class="fas fa-chart-line"></i>
            </div>
            <h3>Smart Investing</h3>
            <p>AI-powered investment portfolios tailored to your goals. Start with as little as $10 and watch your wealth grow.</p>
        </div>
        <div class="bf-feature-card">
            <div class="bf-feature-icon" style="background:rgba(55,66,250,0.15);color:var(--bf-info);">
                <i class="fas fa-globe"></i>
            </div>
            <h3>Global Transfers</h3>
            <p>Send money across borders with zero hidden fees, real-time exchange rates, and instant delivery to 150+ countries.</p>
        </div>
        <div class="bf-feature-card">
            <div class="bf-feature-icon" style="background:rgba(233,69,96,0.15);color:var(--bf-accent);">
                <i class="fas fa-credit-card"></i>
            </div>
            <h3>Premium Cards</h3>
            <p>Virtual and physical cards with unlimited cashback, travel rewards, and exclusive lifestyle benefits and perks.</p>
        </div>
        <div class="bf-feature-card">
            <div class="bf-feature-icon" style="background:rgba(245,166,35,0.15);color:var(--bf-gold);">
                <i class="fas fa-shield-alt"></i>
            </div>
            <h3>Bank-Grade Security</h3>
            <p>Multi-factor authentication, biometric login, real-time fraud monitoring, and FDIC insurance up to $250K.</p>
        </div>
    </div>
</section>

<!-- Rates Section -->
<section class="bf-rates-section">
    <div class="bf-section" style="position:relative;z-index:1;">
        <div class="bf-section-header">
            <h2>Competitive <span class="highlight-gold">Rates</span></h2>
            <p>Earn more with our market-leading rates designed to help your money work harder.</p>
        </div>
        <div class="bf-grid-4">
            <div class="bf-rate-card">
                <div class="bf-rate-label">Savings</div>
                <div class="bf-rate-value">3.75%<span class="period"> APY</span></div>
                <div class="bf-rate-name">High Yield Savings</div>
                <a href="#" class="bf-rate-link">Learn More <i class="fas fa-arrow-right"></i></a>
            </div>
            <div class="bf-rate-card">
                <div class="bf-rate-label">Certificate</div>
                <div class="bf-rate-value">4.00%<span class="period"> APY</span></div>
                <div class="bf-rate-name">12-Month Certificate</div>
                <a href="#" class="bf-rate-link">Learn More <i class="fas fa-arrow-right"></i></a>
            </div>
            <div class="bf-rate-card">
                <div class="bf-rate-label">Credit Card</div>
                <div class="bf-rate-value">0%<span class="period"> APR</span></div>
                <div class="bf-rate-name">Intro for 15 Months</div>
                <a href="#" class="bf-rate-link">Learn More <i class="fas fa-arrow-right"></i></a>
            </div>
            <div class="bf-rate-card">
                <div class="bf-rate-label">Loan</div>
                <div class="bf-rate-value">5.99%<span class="period"> APR</span></div>
                <div class="bf-rate-name">Personal Loan</div>
                <a href="#" class="bf-rate-link">Learn More <i class="fas fa-arrow-right"></i></a>
            </div>
        </div>
    </div>
</section>

<!-- Testimonials -->
<?php
// Simple heuristic to vary avatar color by likely gender of first name
$bf_female_names = ['sarah','emily','jessica','olivia','sophia','ava','isabella','mia','charlotte','amelia','grace','chloe','emma','lily','hannah','natalie','victoria','zoe','ella','aria'];
?>
<section class="bf-section" id="testimonials">
    <div class="bf-section-header">
        <span class="bf-eyebrow">Loved by 50,000+ Members</span>
        <h2>What Our <span class="highlight">Members</span> Say</h2>
        <p>Real stories from real people who trust ButterField Worldwide with their financial lives.</p>
    </div>

    <div class="bf-trust-strip">
        <div class="bf-trust-strip-item"><div class="bf-trust-rating">4.9<span>/5</span></div><div class="bf-trust-stars"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star-half-alt"></i></div><span class="bf-trust-label">App Store Rating</span></div>
        <div class="bf-trust-strip-item"><div class="bf-trust-rating">98<span>%</span></div><span class="bf-trust-label">Would Recommend</span></div>
        <div class="bf-trust-strip-item"><div class="bf-trust-rating">12k<span>+</span></div><span class="bf-trust-label">5-Star Reviews</span></div>
        <div class="bf-trust-strip-item"><div class="bf-trust-rating">24/7</div><span class="bf-trust-label">Member Support</span></div>
    </div>

    <div class="bf-testimonial-grid" id="bf-testimonial-grid">
        <?php foreach ($testimonials as $i => $testimonial) {
            $firstName = strtolower(strtok($testimonial['name'], ' '));
            $isFemale  = in_array($firstName, $bf_female_names);
            $genderClass = $isFemale ? 'female' : 'male';
            $hiddenClass = $i >= 6 ? ' bf-testimonial-hidden' : '';
        ?>
        <div class="bf-testimonial bf-testimonial-card<?= $hiddenClass ?>">
            <div class="bf-testimonial-stars"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></div>
            <p><?= $testimonial['content'] ?></p>
            <div class="bf-testimonial-author">
                <?php if (!empty($testimonial['image'])) { ?>
                    <img class="bf-testimonial-avatar-img" src="<?= base_url('uploads/' . $testimonial['image']) ?>" alt="<?= esc($testimonial['name']) ?>">
                <?php } else { ?>
                    <div class="bf-testimonial-avatar <?= $genderClass ?>"><i class="fas <?= $isFemale ? 'fa-user' : 'fa-user' ?>"></i></div>
                <?php } ?>
                <div>
                    <div class="bf-testimonial-name"><?= $testimonial['name'] ?> <i class="fas fa-circle-check bf-verified" title="Verified Member"></i></div>
                    <div class="bf-testimonial-title">Verified Member</div>
                </div>
            </div>
        </div>
        <?php } ?>
    </div>

    <?php if (count($testimonials) > 6) { ?>
    <div style="text-align:center;margin-top:40px;">
        <button type="button" class="bf-btn bf-btn-outline" id="bf-load-more-testimonials">
            Show More Reviews <i class="fas fa-chevron-down"></i>
        </button>
    </div>
    <?php } ?>
</section>

<!-- Safety & Security Section -->
<section class="bf-section" id="security">
    <div class="bf-section-header">
        <span class="bf-eyebrow">Your Money, Protected</span>
        <h2>Bank With <span class="highlight-gold">Total Confidence</span></h2>
        <p>Your security is engineered into every layer of ButterField. From government-backed deposit insurance to military-grade encryption, we protect what matters most.</p>
    </div>

    <div class="bf-security-band">
        <div class="bf-security-band-item"><i class="fas fa-building-columns"></i><div><strong>$250,000</strong><span>FDIC Insured per depositor</span></div></div>
        <div class="bf-security-band-item"><i class="fas fa-lock"></i><div><strong>256-bit AES</strong><span>End-to-end encryption</span></div></div>
        <div class="bf-security-band-item"><i class="fas fa-shield-halved"></i><div><strong>$0 Liability</strong><span>Guaranteed fraud protection</span></div></div>
        <div class="bf-security-band-item"><i class="fas fa-clock-rotate-left"></i><div><strong>24/7</strong><span>Real-time monitoring</span></div></div>
    </div>

    <div class="bf-grid-3" style="margin-top:48px;">
        <div class="bf-feature-card">
            <div class="bf-feature-icon" style="background:rgba(46,213,115,0.15);color:var(--bf-success);"><i class="fas fa-fingerprint"></i></div>
            <h3>Biometric & MFA Login</h3>
            <p>Access your accounts with Face ID, fingerprint, or hardware security keys. Multi-factor authentication blocks unauthorized access even if your password is compromised.</p>
        </div>
        <div class="bf-feature-card">
            <div class="bf-feature-icon" style="background:rgba(55,66,250,0.15);color:var(--bf-info);"><i class="fas fa-eye"></i></div>
            <h3>AI Fraud Detection</h3>
            <p>Machine-learning models analyze every transaction in real time, flagging and freezing suspicious activity in milliseconds — often before you even notice.</p>
        </div>
        <div class="bf-feature-card">
            <div class="bf-feature-icon" style="background:rgba(245,166,35,0.15);color:var(--bf-gold);"><i class="fas fa-snowflake"></i></div>
            <h3>Instant Card Freeze</h3>
            <p>Misplaced your card? Freeze and unfreeze it instantly from the app. Set spending limits, lock online purchases, and control exactly where your card works.</p>
        </div>
        <div class="bf-feature-card">
            <div class="bf-feature-icon" style="background:rgba(233,69,96,0.15);color:var(--bf-accent);"><i class="fas fa-user-shield"></i></div>
            <h3>Identity Protection</h3>
            <p>Continuous dark-web monitoring and identity theft alerts keep your personal information safe, with dedicated specialists ready to help you recover.</p>
        </div>
        <div class="bf-feature-card">
            <div class="bf-feature-icon" style="background:rgba(46,213,115,0.15);color:var(--bf-success);"><i class="fas fa-server"></i></div>
            <h3>Secure Infrastructure</h3>
            <p>Data is encrypted at rest and in transit across geo-redundant data centers with SOC 2 Type II controls, regular penetration testing, and 99.9% uptime.</p>
        </div>
        <div class="bf-feature-card">
            <div class="bf-feature-icon" style="background:rgba(55,66,250,0.15);color:var(--bf-info);"><i class="fas fa-bell"></i></div>
            <h3>Real-Time Alerts</h3>
            <p>Get instant push, email, and SMS notifications for every login, transaction, and account change so you always know exactly what is happening.</p>
        </div>
    </div>

    <div class="bf-compliance-bar">
        <span><i class="fas fa-circle-check"></i> FDIC Insured</span>
        <span><i class="fas fa-circle-check"></i> PCI-DSS Compliant</span>
        <span><i class="fas fa-circle-check"></i> SOC 2 Type II</span>
        <span><i class="fas fa-circle-check"></i> GDPR Ready</span>
        <span><i class="fas fa-circle-check"></i> Equal Housing Lender</span>
    </div>
</section>

<!-- CTA Section -->
<section class="bf-rates-section">
    <div class="bf-section" style="position:relative;z-index:1;text-align:center;">
        <div class="bf-section-header">
            <h2>Ready to <span class="highlight">Transform</span> Your Banking?</h2>
            <p>Join ButterField Worldwide today and experience the future of fintech banking.</p>
        </div>
        <div style="display:flex;gap:16px;justify-content:center;flex-wrap:wrap;">
            <a href="#" class="bf-btn bf-btn-primary bf-btn-gold" onclick="event.preventDefault(); var m=document.getElementById('header-register'); if(typeof openRevealModal==='function') openRevealModal(m);" style="padding:16px 36px;font-size:1.1rem;">
                Get Started Free <i class="fas fa-arrow-right"></i>
            </a>
            <a href="<?= base_url('contact') ?>" class="bf-btn bf-btn-outline" style="padding:16px 36px;font-size:1.1rem;">
                <i class="fas fa-phone-alt"></i> Contact Us
            </a>
        </div>
    </div>
</section>

<!-- FAQs Section -->
<section class="bf-section" id="faqs">
    <div class="bf-section-header">
        <h2>Frequently Asked <span class="highlight">Questions</span></h2>
        <p>Everything you need to know about banking with ButterField Worldwide.</p>
    </div>
    <div style="max-width:768px;margin:0 auto;">
        <?php foreach ($faqs as $faq) { ?>
        <div style="background:var(--bf-card-bg);border:1px solid var(--bf-card-border);border-radius:16px;padding:24px;margin-bottom:16px;">
            <h4 style="color:#fff;font-size:1.05rem;font-weight:600;margin-bottom:12px;">
                <i class="fas fa-question-circle" style="color:var(--bf-accent);margin-right:10px;"></i>
                <?= $faq['question'] ?>
            </h4>
            <p style="color:var(--bf-text);font-size:0.95rem;line-height:1.7;margin:0;padding-left:28px;">
                <?= $faq['answer'] ?>
            </p>
        </div>
        <?php } ?>
    </div>
</section>

<!-- About Section -->
<section class="bf-section" id="about" style="border-top:1px solid rgba(255,255,255,0.05);">
    <div class="bf-section-header">
        <h2>About <span class="highlight-gold">ButterField Worldwide</span></h2>
    </div>
    <div style="max-width:800px;margin:0 auto;text-align:center;">
        <p style="color:var(--bf-text);font-size:1.05rem;line-height:1.9;">
            <?= $about_us ?>
        </p>
        <div class="bf-hero-stats" style="justify-content:center;border-top-color:rgba(255,255,255,0.08);margin-top:48px;">
            <div class="bf-hero-stat">
                <h3>50K+</h3>
                <p>Happy Members</p>
            </div>
            <div class="bf-hero-stat">
                <h3>$2.8B</h3>
                <p>Assets Managed</p>
            </div>
            <div class="bf-hero-stat">
                <h3>150+</h3>
                <p>Countries Served</p>
            </div>
            <div class="bf-hero-stat">
                <h3>24/7</h3>
                <p>Customer Support</p>
            </div>
        </div>
    </div>
</section>

<script>
// Reveal-modal opening for hero/CTA buttons is handled centrally in header.php
// via openRevealModal(). Bind any [data-open] buttons that live outside the header.
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('[data-open]').forEach(function (btn) {
        if (btn.classList.contains('js-header-login-toggle')) return; // handled in header.php
        if (btn.id === 'popup') return; // alert modal trigger
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            var modal = document.getElementById(this.getAttribute('data-open'));
            if (modal && typeof openRevealModal === 'function') openRevealModal(modal);
        });
    });
});
</script>
