<!doctype html>
<html class="no-js" lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <title><?= $page . ' | ' . $company_name ?></title>
    <meta name="description" content="<?= $company_description ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <meta property="og:title" content="<?= $page . ' | ' . $company_name ?>">
    <meta property="og:description" content="<?= $company_description ?>">
    <meta property="og:url" content="<?= base_url() ?>">
    <meta property="og:image" content="<?= base_url('uploads/' . $company_logo) ?>">
    <meta name="twitter:card" content="summary">
    <meta name="twitter:title" content="<?= $page . ' | ' . $company_name ?>">
    <meta name="twitter:description" content="<?= $company_description ?>">
    <link rel="canonical" href="<?= current_url() ?>">

    <link rel="apple-touch-icon" href="<?= base_url('uploads/' . $company_favicon) ?>">
    <link rel="shortcut icon" href="<?= base_url('uploads/' . $company_favicon) ?>">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">

    <link rel="stylesheet" href="<?= base_url('templates/bank-pro/css/butterfield-fintech.css') ?>">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">

    <script type="application/ld+json">
    {
        "@context": "http://schema.org",
        "@type": "WebSite",
        "url": "<?= base_url() ?>",
        "name": "<?= $company_name ?>",
        "description": "<?= $company_description ?>"
    }
    </script>
</head>
<body>

<div class="sticky-sentinel-before" aria-hidden="true"></div>

<header class="bf-header" id="bf-header">
    <div class="bf-header-inner">
        <a href="<?= base_url() ?>" class="bf-logo">
            <img src="<?= base_url('uploads/' . $company_favicon) ?>" alt="<?= $company_name ?>" class="bf-logo-image">
            <span class="bf-logo-text">ButterField <span class="bf-logo-badge">Fintech</span></span>
        </a>

        <nav class="bf-nav">
            <a href="<?= base_url() ?>" class="<?= ($page == 'Home') ? 'active' : '' ?>">Home</a>
            <a href="<?= base_url('bank') ?>" class="<?= ($page == 'Bank') ? 'active' : '' ?>">Bank</a>
            <a href="<?= base_url('save') ?>" class="<?= ($page == 'Save') ? 'active' : '' ?>">Save</a>
            <a href="<?= base_url('borrow') ?>" class="<?= ($page == 'Borrow') ? 'active' : '' ?>">Borrow</a>
            <a href="<?= base_url('invest') ?>" class="<?= ($page == 'Invest') ? 'active' : '' ?>">Invest</a>
            <a href="<?= base_url('contact') ?>" class="<?= ($page == 'Contact') ? 'active' : '' ?>">Contact</a>
        </nav>

        <div class="bf-nav-actions">
            <a href="#" class="bf-btn bf-btn-outline js-header-login-toggle" data-open="header-login">
                <i class="fas fa-lock"></i> Login
            </a>
            <?php if ($allow_register == 1) { ?>
                <a href="#" class="bf-btn bf-btn-primary js-header-login-toggle" data-open="header-register">
                    Open Account <i class="fas fa-arrow-right"></i>
                </a>
            <?php } ?>
        </div>

        <button type="button" class="bf-nav-toggle" id="bf-nav-toggle" aria-label="Toggle navigation menu" aria-expanded="false" aria-controls="bf-mobile-menu">
            <span></span><span></span><span></span>
        </button>
    </div>
</header>

<!-- Mobile Menu (kept outside the header so it escapes the header's stacking context and stays on top) -->
<div class="bf-mobile-menu" id="bf-mobile-menu">
    <nav class="bf-mobile-nav">
        <a href="<?= base_url() ?>" class="<?= ($page == 'Home') ? 'active' : '' ?>">Home</a>
        <a href="<?= base_url('bank') ?>" class="<?= ($page == 'Bank') ? 'active' : '' ?>">Bank</a>
        <a href="<?= base_url('save') ?>" class="<?= ($page == 'Save') ? 'active' : '' ?>">Save</a>
        <a href="<?= base_url('borrow') ?>" class="<?= ($page == 'Borrow') ? 'active' : '' ?>">Borrow</a>
        <a href="<?= base_url('invest') ?>" class="<?= ($page == 'Invest') ? 'active' : '' ?>">Invest</a>
        <a href="<?= base_url('contact') ?>" class="<?= ($page == 'Contact') ? 'active' : '' ?>">Contact</a>
    </nav>
    <div class="bf-mobile-actions">
        <a href="#" class="bf-btn bf-btn-outline js-header-login-toggle" data-open="header-login">
            <i class="fas fa-lock"></i> Login
        </a>
        <?php if ($allow_register == 1) { ?>
            <a href="#" class="bf-btn bf-btn-primary js-header-login-toggle" data-open="header-register">
                Open Account <i class="fas fa-arrow-right"></i>
            </a>
        <?php } ?>
    </div>
</div>
<div class="bf-mobile-overlay" id="bf-mobile-overlay"></div>

<!-- Login Modal -->
<div id="header-login" class="reveal" data-reveal data-animation-in="fade-in" data-animation-out="fade-out">
    <button class="close-button" data-close type="button" aria-label="Close">
        <i class="fas fa-times" style="color:#fff;font-size:1.5rem;"></i>
    </button>
    <div class="bf-login-modal">
        <div class="bf-modal-icon"><i class="fas fa-lock"></i></div>
        <h3>Welcome Back</h3>
        <p>Login to your ButterField account</p>
        <form action="<?= base_url('auth/login') ?>" method="POST">
            <input type="hidden" name="url" value="<?= base_url('user') ?>" required>
            <div class="bf-form-group">
                <label>Account ID</label>
                <input name="email" type="text" required>
            </div>
            <div class="bf-form-group">
                <label>Password</label>
                <input name="password" type="password" required>
            </div>
            <button class="bf-btn bf-btn-primary" type="submit" style="width:100%;justify-content:center;">
                Login <i class="fas fa-arrow-right"></i>
            </button>
        </form>
        <div class="bf-modal-footer">
            <a href="#">Forgot Password? Contact Support</a>
        </div>
    </div>
</div>

<!-- Register Modal -->
<div id="header-register" class="reveal" data-reveal data-animation-in="fade-in" data-animation-out="fade-out">
    <button class="close-button" data-close type="button" aria-label="Close">
        <i class="fas fa-times" style="color:#fff;font-size:1.5rem;"></i>
    </button>
    <div class="bf-login-modal">
        <div class="bf-modal-icon"><i class="fas fa-user-plus"></i></div>
        <h3>Get Started</h3>
        <p>Open your ButterField account today</p>
        <form action="<?= base_url('open_account') ?>" method="GET">
            <div class="bf-form-group">
                <label>Full Name</label>
                <input name="name" type="text" required>
                <input name="start_account" type="hidden" value="1">
            </div>
            <div class="bf-form-group">
                <label>Email Address</label>
                <input name="email" type="email" required>
            </div>
            <button class="bf-btn bf-btn-gold" type="submit" style="width:100%;justify-content:center;">
                Continue <i class="fas fa-arrow-right"></i>
            </button>
        </form>
    </div>
</div>

<!-- Alert Modal -->
<button class="l-header__login-toggle" type="button" id="popup" data-open="header-alert" style="display:none">&nbsp;</button>
<?php if (session()->getFlashdata("msg")) { ?>
    <script>window.onload = function () { document.getElementById("popup").click(); }</script>
    <div id="header-alert" class="reveal" data-reveal data-animation-in="fade-in" data-animation-out="fade-out">
        <button class="close-button" data-close type="button" aria-label="Close">
            <i class="fas fa-times" style="color:#fff;font-size:1.5rem;"></i>
        </button>
        <div class="bf-login-modal">
            <?= session()->getFlashdata("msg") ?>
        </div>
    </div>
<?php } ?>

<script>
const header = document.getElementById('bf-header');
window.addEventListener('scroll', function() {
    header.classList.toggle('scrolled', window.scrollY > 50);
});

// Mobile menu toggle
(function () {
    const toggle = document.getElementById('bf-nav-toggle');
    const menu = document.getElementById('bf-mobile-menu');
    const overlay = document.getElementById('bf-mobile-overlay');
    if (!toggle || !menu) return;

    function closeMenu() {
        menu.classList.remove('open');
        if (overlay) overlay.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('bf-menu-open');
    }
    function openMenu() {
        menu.classList.add('open');
        if (overlay) overlay.classList.add('open');
        toggle.classList.add('open');
        toggle.setAttribute('aria-expanded', 'true');
        document.body.classList.add('bf-menu-open');
    }

    toggle.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        menu.classList.contains('open') ? closeMenu() : openMenu();
    });
    if (overlay) overlay.addEventListener('click', closeMenu);

    // Handle menu link / button taps
    menu.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', function (e) {
            var target = this.getAttribute('data-open');
            if (target) {
                // This is a Login / Open Account button -> open its modal
                e.preventDefault();
                closeMenu();
                var modal = document.getElementById(target);
                if (modal) {
                    setTimeout(function () { openRevealModal(modal); }, 50);
                }
            } else {
                // Plain navigation link -> just close the menu and let it navigate
                closeMenu();
            }
        });
    });

    // Close on resize back to desktop
    window.addEventListener('resize', function () {
        if (window.innerWidth > 768) closeMenu();
    });
})();

// Bind ALL header login/register toggle buttons (desktop + mobile, every page)
document.querySelectorAll('.js-header-login-toggle[data-open]').forEach(function (btn) {
    if (btn.closest('#bf-mobile-menu')) return; // mobile handled above
    btn.addEventListener('click', function (e) {
        e.preventDefault();
        var modal = document.getElementById(this.getAttribute('data-open'));
        if (modal) openRevealModal(modal);
    });
});

// Self-contained reveal-modal opener (works on every page, not just home)
function openRevealModal(modal) {
    if (!modal) return;
    modal.setAttribute('aria-hidden', 'false');
    // Avoid stacking duplicate overlays
    var existing = document.querySelector('.reveal-overlay');
    if (existing) existing.remove();
    var overlay = document.createElement('div');
    overlay.className = 'reveal-overlay';
    overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.7);z-index:9999;';
    function closeModal() {
        modal.setAttribute('aria-hidden', 'true');
        overlay.remove();
    }
    overlay.addEventListener('click', closeModal);
    document.body.appendChild(overlay);
    var closeBtn = modal.querySelector('.close-button');
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
}
</script>
