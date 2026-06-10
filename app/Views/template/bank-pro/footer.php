<!-- ============ ButterField Modern Footer ============ -->
<footer class="bf-footer">
    <div class="bf-footer-grid">
        <div class="bf-footer-brand">
            <a href="<?= base_url() ?>" class="bf-logo" style="margin-bottom:16px;">
                <img src="<?= base_url('uploads/' . $company_favicon) ?>" alt="<?= $company_name ?>" class="bf-logo-image">
                <span class="bf-logo-text">ButterField <span class="bf-logo-badge">Fintech</span></span>
            </a>
            <p><?= $company_description ?></p>
            <div class="bf-footer-social">
                <a href="https://www.facebook.com/ButterfieldCayman" target="_blank" rel="noopener" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
                <a href="https://www.instagram.com/butterfield.cayman/" target="_blank" rel="noopener" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
                <a href="https://x.com/Butterfield_CAY" target="_blank" rel="noopener" aria-label="X (Twitter)"><i class="fab fa-x-twitter"></i></a>
                <a href="https://www.linkedin.com/company/butterfield-cayman/" target="_blank" rel="noopener" aria-label="LinkedIn"><i class="fab fa-linkedin-in"></i></a>
                <a href="https://www.youtube.com/@ButterfieldCayman" target="_blank" rel="noopener" aria-label="YouTube"><i class="fab fa-youtube"></i></a>
            </div>
        </div>

        <div class="bf-footer-col">
            <h4>Banking</h4>
            <a href="<?= base_url('bank') ?>">Checking Accounts</a>
            <a href="<?= base_url('save') ?>">Savings Accounts</a>
            <a href="<?= base_url('bank') ?>">Credit Cards</a>
            <a href="<?= base_url('save') ?>">Certificates</a>
            <a href="<?= base_url('save') ?>">Money Market</a>
        </div>

        <div class="bf-footer-col">
            <h4>Services</h4>
            <a href="<?= base_url('borrow') ?>">Loans</a>
            <a href="<?= base_url('borrow') ?>">Mortgages</a>
            <a href="<?= base_url('invest') ?>">Investing</a>
            <a href="<?= base_url('bank') ?>">Insurance</a>
            <a href="#" class="js-header-login-toggle" data-open="header-login">Online Banking</a>
        </div>

        <div class="bf-footer-col">
            <h4>Company</h4>
            <a href="<?= base_url() ?>#about">About Us</a>
            <a href="<?= base_url('contact') ?>">Careers</a>
            <a href="<?= base_url() ?>#features">News</a>
            <a href="<?= base_url('contact') ?>">Contact Us</a>
            <a href="<?= base_url('contact') ?>">Support</a>
        </div>
    </div>

    <div class="bf-footer-bottom">
        <p>&copy; <?= date('Y') ?> <?= $company_name ?>. All rights reserved. | Routing #<?= $bank_routing ?></p>
        <div class="bf-footer-badges">
            <span style="color:var(--bf-text-muted);font-size:0.7rem;">Federally Insured by NCUA</span>
            <img src="<?= $front_theme ?>/images/assets/ncua-lender.png" alt="NCUA Lender">
            <img src="<?= $front_theme ?>/images/assets/ncua-cert.png" alt="NCUA Cert">
            <img src="<?= $front_theme ?>/blue-seal-200-42-bbb-80015515.png" alt="BBB" style="height:28px;">
        </div>
    </div>
</footer>

<!-- Scripts -->
<script src="<?= $front_theme ?>/sitecore_modules/Web/ExperienceForms/scripts/jquery.validate.min.js"></script>
<script src="<?= $front_theme ?>/sitecore_modules/Web/ExperienceForms/scripts/jquery.validate.unobtrusive.min.js"></script>
<script src="<?= $front_theme ?>/sitecore_modules/Web/ExperienceForms/scripts/jquery.unobtrusive-ajax.min.js"></script>
<script src="<?= $front_theme ?>/sitecore_modules/Web/ExperienceForms/scripts/form.validate.js"></script>
<script src="<?= $front_theme ?>/sitecore_modules/Web/ExperienceForms/scripts/form.conditions.js"></script>

<script>
// FAQ accordion (bank-pro pages)
document.addEventListener('click', function (e) {
    var q = e.target.closest('.bf-faq-q');
    if (!q) return;
    var item = q.parentElement;
    var isOpen = item.classList.contains('open');
    var group = item.parentElement;
    group.querySelectorAll('.bf-faq-item.open').forEach(function (el) { el.classList.remove('open'); });
    if (!isOpen) item.classList.add('open');
});
// Header scroll shadow
window.addEventListener('scroll', function () {
    var h = document.querySelector('.bf-header');
    if (h) h.classList.toggle('scrolled', window.scrollY > 20);
});
// Show more testimonials
(function () {
    var btn = document.getElementById('bf-load-more-testimonials');
    if (!btn) return;
    btn.addEventListener('click', function () {
        var hidden = document.querySelectorAll('#bf-testimonial-grid .bf-testimonial-hidden');
        if (hidden.length === 0) return;
        hidden.forEach(function (el) { el.classList.remove('bf-testimonial-hidden'); });
        btn.style.display = 'none';
    });
})();
</script>

<?= view('includes/livechat') ?>
</body>
</html>
</content>
</invoke>