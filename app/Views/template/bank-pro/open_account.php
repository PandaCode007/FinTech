<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Open Account | <?= $company_name ?></title>
    <meta name="description" content="<?= $company_description ?>">
    <link rel="icon" href="<?= base_url('uploads/' . $company_favicon) ?>">
    
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
    <link rel="stylesheet" href="<?= base_url('templates/bank-pro/css/butterfield-fintech.css') ?>">
    
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Inter', -apple-system, sans-serif;
            background: #0b1220;
            color: #e5e7eb;
            min-height: 100vh;
        }

        /* Top nav bar */
        .top-bar {
            display: flex; align-items: center; justify-content: space-between;
            padding: 16px 40px; background: rgba(15,23,42,0.95);
            border-bottom: 1px solid rgba(255,255,255,0.06);
            position: sticky; top: 0; z-index: 100; backdrop-filter: blur(12px);
        }
        .top-bar .logo {
            display: flex; align-items: center; gap: 10px; text-decoration: none;
        }
        .top-bar .logo img { width: 32px; height: 32px; border-radius: 8px; }
        .top-bar .logo span {
            font-weight: 700; font-size: 1.2rem; color: #fff;
            letter-spacing: -0.3px;
        }
        .top-bar .logo span small {
            font-weight: 400; color: #f59e0b; font-size: 0.7rem;
            background: rgba(245,166,35,0.15); padding: 2px 8px;
            border-radius: 6px; margin-left: 6px;
        }
        .top-bar .back-link {
            color: #94a3b8; text-decoration: none; font-size: 0.9rem;
            display: flex; align-items: center; gap: 6px; transition: color .2s;
        }
        .top-bar .back-link:hover { color: #fff; }

        /* Page wrapper */
        .page-wrapper {
            max-width: 960px; margin: 0 auto; padding: 40px 24px 80px;
        }

        /* Header */
        .page-header {
            text-align: center; margin-bottom: 48px;
        }
        .page-header .step-badge {
            display: inline-block; background: rgba(245,166,35,0.12);
            color: #f59e0b; font-size: 0.75rem; font-weight: 600;
            padding: 4px 14px; border-radius: 20px; letter-spacing: 0.5px;
            text-transform: uppercase; margin-bottom: 12px;
        }
        .page-header h1 {
            font-size: 2rem; font-weight: 800; color: #fff;
            letter-spacing: -0.5px; margin-bottom: 8px;
        }
        .page-header h1 .highlight { color: #f59e0b; }
        .page-header p {
            color: #94a3b8; font-size: 1rem; max-width: 500px; margin: 0 auto; line-height: 1.6;
        }

        /* Progress steps */
        .progress-steps {
            display: flex; justify-content: center; gap: 8px; margin-bottom: 40px;
        }
        .progress-steps .step {
            display: flex; align-items: center; gap: 8px;
        }
        .progress-steps .step .dot {
            width: 10px; height: 10px; border-radius: 50%;
            background: rgba(255,255,255,0.1); transition: all .3s;
        }
        .progress-steps .step .dot.active { background: #f59e0b; box-shadow: 0 0 12px rgba(245,166,35,0.4); }
        .progress-steps .step .dot.done { background: #22c55e; }
        .progress-steps .step .label {
            font-size: 0.75rem; color: #64748b; font-weight: 500;
        }
        .progress-steps .step .label.active { color: #f59e0b; }
        .progress-steps .step .label.done { color: #22c55e; }
        .progress-steps .connector {
            width: 40px; height: 2px; background: rgba(255,255,255,0.1); align-self: center;
        }
        .progress-steps .connector.done { background: #22c55e; }

        /* Form card */
        .form-card {
            background: linear-gradient(135deg, #0f172a 0%, #0d1627 100%);
            border: 1px solid rgba(255,255,255,0.06);
            border-radius: 24px; padding: 40px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.4);
        }
        .form-card .section-title {
            font-size: 0.8rem; font-weight: 600; color: #f59e0b;
            text-transform: uppercase; letter-spacing: 1px; margin-bottom: 24px;
            display: flex; align-items: center; gap: 10px;
        }
        .form-card .section-title i { font-size: 1rem; }
        .form-card .section-title::after {
            content: ''; flex: 1; height: 1px; background: rgba(255,255,255,0.06);
        }
        .form-row {
            display: grid; grid-template-columns: 1fr 1fr; gap: 16px;
            margin-bottom: 16px;
        }
        .form-row.full { grid-template-columns: 1fr; }
        .form-row.three { grid-template-columns: 1fr 1fr 1fr; }
        .form-group {
            display: flex; flex-direction: column; gap: 6px;
        }
        .form-group label {
            font-size: 0.8rem; font-weight: 500; color: #94a3b8;
            letter-spacing: 0.3px;
        }
        .form-group input,
        .form-group select,
        .form-group textarea {
            background: rgba(255,255,255,0.04);
            border: 1px solid rgba(255,255,255,0.08);
            border-radius: 12px; padding: 12px 16px;
            color: #fff; font-size: 0.9rem; font-family: inherit;
            outline: none; transition: all .2s;
        }
        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
            border-color: #f59e0b; box-shadow: 0 0 0 3px rgba(245,166,35,0.1);
        }
        .form-group input::placeholder { color: #475569; }
        .form-group select option { background: #0f172a; color: #fff; }
        .form-group .file-hint {
            font-size: 0.7rem; color: #64748b; margin-top: 4px;
        }

        .form-divider { height: 1px; background: rgba(255,255,255,0.06); margin: 32px 0; }

        /* Submit button */
        .submit-area {
            display: flex; gap: 16px; justify-content: flex-end; margin-top: 32px;
            padding-top: 24px; border-top: 1px solid rgba(255,255,255,0.06);
        }
        .btn-submit {
            background: linear-gradient(135deg, #f59e0b, #d97706);
            color: #0b1220; border: none; border-radius: 14px;
            padding: 14px 40px; font-size: 1rem; font-weight: 700;
            cursor: pointer; transition: all .3s; display: flex; align-items: center; gap: 10px
        }
        .btn-submit:hover {
            transform: translateY(-2px); box-shadow: 0 8px 24px rgba(245,166,35,0.3);
        }
        .btn-cancel {
            background: rgba(255,255,255,0.04); color: #94a3b8;
            border: 1px solid rgba(255,255,255,0.08); border-radius: 14px;
            padding: 14px 32px; font-size: 0.9rem; font-weight: 500;
            cursor: pointer; transition: all .2s; text-decoration: none;
        }
        .btn-cancel:hover { background: rgba(255,255,255,0.08); color: #fff; }

        /* ===== MODAL ===== */
        .modal-overlay {
            display: none; position: fixed; inset: 0;
            background: rgba(0,0,0,0.7); backdrop-filter: blur(8px);
            z-index: 9999; align-items: center; justify-content: center;
        }
        .modal-overlay.show { display: flex; animation: fadeIn .3s ease; }
        .modal-box {
            background: linear-gradient(135deg, #0f172a, #162033);
            border: 1px solid rgba(255,255,255,0.08);
            border-radius: 28px; padding: 48px 40px 36px;
            max-width: 520px; width: 90%; text-align: center;
            box-shadow: 0 40px 80px rgba(0,0,0,0.6); position: relative;
            animation: slideUp .4s ease;
        }
        .modal-box .icon-success {
            width: 72px; height: 72px; border-radius: 50%;
            background: rgba(34,197,94,0.12); display: flex;
            align-items: center; justify-content: center;
            margin: 0 auto 20px; font-size: 2rem; color: #22c55e;
        }
        .modal-box h2 {
            font-size: 1.4rem; font-weight: 700; color: #fff;
            margin-bottom: 12px;
        }
        .modal-box p {
            color: #94a3b8; font-size: 0.9rem; line-height: 1.6; margin-bottom: 8px;
        }
        .modal-box .account-id-box {
            background: rgba(255,255,255,0.04);
            border: 1px dashed rgba(245,166,35,0.3);
            border-radius: 16px; padding: 20px; margin: 20px 0 24px;
        }
        .modal-box .account-id-box .label {
            font-size: 0.7rem; color: #64748b; text-transform: uppercase;
            letter-spacing: 1px; margin-bottom: 8px;
        }
        .modal-box .account-id-box .id-value {
            font-size: 1.8rem; font-weight: 800; color: #f59e0b;
            letter-spacing: 2px; font-family: monospace;
        }
        .modal-box .modal-buttons {
            display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;
        }
        .modal-box .modal-buttons a {
            padding: 12px 28px; border-radius: 14px; font-weight: 600;
            font-size: 0.9rem; text-decoration: none; transition: all .2s;
        }
        .modal-box .modal-buttons .btn-home {
            background: rgba(255,255,255,0.05); color: #94a3b8;
            border: 1px solid rgba(255,255,255,0.08);
        }
        .modal-box .modal-buttons .btn-home:hover { background: rgba(255,255,255,0.1); color: #fff; }
        .modal-box .modal-buttons .btn-login {
            background: linear-gradient(135deg, #f59e0b, #d97706); color: #0b1220;
        }
        .modal-box .modal-buttons .btn-login:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(245,166,35,0.3); }

        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }

        /* File upload styling */
        .file-upload-area {
            position: relative; padding: 20px; border: 1px dashed rgba(255,255,255,0.1);
            border-radius: 12px; text-align: center; cursor: pointer;
            transition: all .2s;
        }
        .file-upload-area:hover { border-color: #f59e0b; background: rgba(245,166,35,0.03); }
        .file-upload-area i { font-size: 1.5rem; color: #64748b; margin-bottom: 6px; }
        .file-upload-area p { font-size: 0.8rem; color: #64748b; }
        .file-upload-area input[type="file"] {
            position: absolute; inset: 0; opacity: 0; cursor: pointer;
        }

        @media (max-width: 768px) {
            .top-bar { padding: 12px 16px; }
            .page-wrapper { padding: 24px 16px 60px; }
            .form-card { padding: 24px; }
            .form-row { grid-template-columns: 1fr; }
            .form-row.three { grid-template-columns: 1fr; }
            .submit-area { flex-direction: column; }
            .modal-box { padding: 32px 24px; }
            .modal-box .account-id-box .id-value { font-size: 1.4rem; }
        }
    </style>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
</head>
<body>
    <!-- Top Bar -->
    <div class="top-bar">
        <a href="<?= base_url() ?>" class="logo">
            <img src="<?= base_url('uploads/' . $company_logo) ?>" alt="<?= $company_name ?>">
            <span>ButterField <small>Fintech</small></span>
        </a>
        <a href="<?= base_url() ?>" class="back-link"><i class="fas fa-arrow-left"></i> Back to Home</a>
    </div>

    <!-- Page Content -->
    <div class="page-wrapper">
        <div class="page-header">
            <div class="step-badge"><i class="fas fa-rocket"></i> Get Started in Minutes</div>
            <h1>Open Your <span class="highlight">Account</span></h1>
            <p>Complete the form below to open your ButterField Worldwide account. It takes less than 5 minutes.</p>
        </div>

        <!-- Progress Steps -->
        <div class="progress-steps">
            <div class="step">
                <div class="dot active"></div>
                <span class="label active">Personal Info</span>
            </div>
            <div class="connector"></div>
            <div class="step">
                <div class="dot"></div>
                <span class="label">Contact & KYC</span>
            </div>
            <div class="connector"></div>
            <div class="step">
                <div class="dot"></div>
                <span class="label">Account Setup</span>
            </div>
            <div class="connector"></div>
            <div class="step">
                <div class="dot"></div>
                <span class="label">Submit</span>
            </div>
        </div>

        <!-- Form Card -->
        <div class="form-card">
            <form method="post" action="<?= base_url('open_account') ?>" enctype="multipart/form-data">
                <input type="hidden" name="complete_acount" value="1">
                
                <!-- Section 1: Personal Information -->
                <div class="section-title"><i class="fas fa-user"></i> Personal Information</div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Full Name</label>
                        <input type="text" name="name" value="<?= $name ?>" placeholder="e.g. John Doe" required>
                    </div>
                    <div class="form-group">
                        <label>Email Address</label>
                        <input type="email" name="email" value="<?= $email ?>" placeholder="e.g. john@example.com" required>
                    </div>
                </div>
                <div class="form-row three">
                    <div class="form-group">
                        <label>Phone Number</label>
                        <input type="text" name="phone" placeholder="+1 (555) 000-0000" required>
                    </div>
                    <div class="form-group">
                        <label>Date of Birth</label>
                        <input type="date" name="dob" required>
                    </div>
                    <div class="form-group">
                        <label>Gender</label>
                        <select name="gender">
                            <option value="">Select</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Social Security / Tax ID</label>
                        <input type="text" name="ssn" placeholder="SSN or Tax ID">
                    </div>
                    <div class="form-group">
                        <label>Occupation</label>
                        <input type="text" name="occupation" placeholder="e.g. Software Engineer">
                    </div>
                </div>

                <div class="form-divider"></div>

                <!-- Section 2: Contact Information -->
                <div class="section-title"><i class="fas fa-map-marker-alt"></i> Contact Information</div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Country</label>
                        <select name="country" id="country">
                            <option value="">Select Country</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>City</label>
                        <select name="city" id="state">
                            <option value="">Select Country First</option>
                        </select>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>ZIP / Postal Code</label>
                        <input type="text" name="zip" placeholder="e.g. 10001">
                    </div>
                    <div class="form-group">
                        <label>&nbsp;</label>
                        <input type="text" name="pin" maxlength="4" placeholder="4-digit PIN" required>
                    </div>
                </div>
                <div class="form-row full">
                    <div class="form-group">
                        <label>Address</label>
                        <textarea name="address" rows="2" placeholder="Street address, P.O. Box, etc."></textarea>
                    </div>
                </div>

                <div class="form-divider"></div>

                <!-- Section 3: Next of Kin -->
                <div class="section-title"><i class="fas fa-users"></i> Next of Kin</div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Full Name</label>
                        <input type="text" name="nok_name" placeholder="Next of kin full name" required>
                    </div>
                    <div class="form-group">
                        <label>Relationship</label>
                        <input type="text" name="nok_relationship" placeholder="e.g. Brother, Spouse" required>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Email</label>
                        <input type="email" name="nok_email" placeholder="nok@example.com" required>
                    </div>
                    <div class="form-group">
                        <label>Phone</label>
                        <input type="text" name="nok_phone" placeholder="+1 (555) 000-0000" required>
                    </div>
                </div>
                <div class="form-row full">
                    <div class="form-group">
                        <label>Address</label>
                        <textarea name="nok_address" rows="2" placeholder="Next of kin address"></textarea>
                    </div>
                </div>

                <div class="form-divider"></div>

                <!-- Section 4: Account Setup -->
                <div class="section-title"><i class="fas fa-cog"></i> Account Setup</div>
                <div class="form-row three">
                    <div class="form-group">
                        <label>Account Currency</label>
                        <select name="currency" required>
                            <option value="">Select Currency</option>
                            <option value="$">US Dollar ($)</option>
                            <option value="€">Euro (€)</option>
                            <option value="£">Pounds Sterling (£)</option>
                            <option value="SGD$">Singapore Dollar (SGD)</option>
                            <option value="₹">Indian Rupee (₹)</option>
                            <option value="CAD$">Canadian Dollar (CAD)</option>
                            <option value="AUD$">Australian Dollar (AUD)</option>
                            <option value="¥">Japanese Yen (¥)</option>
                            <option value="₱">Philippine Peso (₱)</option>
                            <option value="₩">South Korean Won (₩)</option>
                            <option value="RM">Malaysian Ringgit (RM)</option>
                            <option value="฿">Thailand Baht (฿)</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Password</label>
                        <input type="password" name="password" placeholder="Create a strong password" required>
                    </div>
                    <div class="form-group">
                        <label>Confirm Password</label>
                        <input type="password" name="repeat_password" placeholder="Repeat password" required>
                    </div>
                </div>

                <div class="form-divider"></div>

                <!-- Section 5: KYC -->
                <div class="section-title"><i class="fas fa-id-card"></i> KYC Verification</div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Passport Photograph</label>
                        <div class="file-upload-area">
                            <i class="fas fa-camera"></i>
                            <p>Upload passport photo (png, jpg, gif)</p>
                            <input type="file" name="passport" required>
                        </div>
                        <div class="file-hint">Max 5MB. Accepted: png, jpg, gif</div>
                    </div>
                    <div class="form-group">
                        <label>Means of Identification</label>
                        <div class="file-upload-area">
                            <i class="fas fa-file-alt"></i>
                            <p>Upload ID, Passport, or Utility Bill</p>
                            <input type="file" name="kyc" required>
                        </div>
                        <div class="file-hint">Max 5MB. Accepted: PDF, png, jpg, gif</div>
                    </div>
                </div>

                <?php if (isset($recaptcha) && $recaptcha == 1) : ?>
                <div class="form-divider"></div>
                <div class="form-row full">
                    <div class="form-group">
                        <div class="g-recaptcha" data-sitekey="<?= $captchaPublicKey; ?>"></div>
                    </div>
                </div>
                <?php endif; ?>

                <div class="submit-area">
                    <a href="<?= base_url() ?>" class="btn-cancel"><i class="fas fa-times"></i> Cancel</a>
                    <button type="submit" class="btn-submit">
                        Create Account <i class="fas fa-arrow-right"></i>
                    </button>
                </div>
            </form>
        </div>
    </div>

    <!-- ===== SUCCESS MODAL ===== -->
    <?php if (session()->getFlashdata("finish")) { 
        $finishMsg = session()->getFlashdata("finish");
        // Extract Account ID from the message for cleaner display
        preg_match('/ACCOUNT ID: <span[^>]*>([^<]+)<\/span>/', $finishMsg, $matches);
        $accountId = $matches[1] ?? '';
    ?>
    <div class="modal-overlay show" id="successModal">
        <div class="modal-box">
            <div class="icon-success"><i class="fas fa-check"></i></div>
            <h2>🎉 Account Created Successfully!</h2>
            <p>Your ButterField Worldwide account has been created. Your account is pending verification — you'll get access once verified.</p>
            
            <div class="account-id-box">
                <div class="label">Your Account ID</div>
                <div class="id-value"><?= $accountId ?></div>
            </div>

            <p style="font-size:0.8rem;color:#64748b;margin-bottom:20px;">
                <i class="fas fa-info-circle"></i> Save this Account ID — it's your login credential.
            </p>

            <div class="modal-buttons">
                <a href="<?= base_url() ?>" class="btn-home"><i class="fas fa-home"></i> Back to Home</a>
                <a href="<?= base_url('login') ?>" class="btn-login"><i class="fas fa-lock"></i> Login to Account</a>
            </div>
        </div>
    </div>
    <?php } ?>

    <!-- ===== ERROR MODAL ===== -->
    <?php if (session()->getFlashdata("msg")) { 
        $errorMsg = session()->getFlashdata("msg");
    ?>
    <div class="modal-overlay show" id="errorModal">
        <div class="modal-box" style="border-color:rgba(239,68,68,0.2);">
            <div class="icon-success" style="background:rgba(239,68,68,0.12);color:#ef4444;">
                <i class="fas fa-exclamation-triangle"></i>
            </div>
            <h2>Notice</h2>
            <p><?= $errorMsg ?></p>
            <div class="modal-buttons" style="margin-top:24px;">
                <a href="#" class="btn-home" onclick="document.getElementById('errorModal').classList.remove('show'); return false;">
                    <i class="fas fa-times"></i> Close
                </a>
            </div>
        </div>
    </div>
    <?php } ?>

    <script src="<?= base_url('assets/javascript/countries.js') ?>"></script>
    <script>
        populateCountries("country", "state");

        // File upload preview — shows the selected image/file name right in the upload area
        document.querySelectorAll('.file-upload-area input[type="file"]').forEach(function(input) {
            input.addEventListener('change', function(e) {
                var area = this.closest('.file-upload-area');
                var file = this.files[0];
                if (!file) return;

                // Reset area content
                area.innerHTML = '';

                if (file.type.startsWith('image/')) {
                    // Show image thumbnail
                    var reader = new FileReader();
                    reader.onload = function(ev) {
                        area.innerHTML = '<img src="' + ev.target.result + '" style="max-height:80px;max-width:100%;border-radius:8px;margin-bottom:6px;display:block;margin-left:auto;margin-right:auto;" />'
                            + '<p style="font-size:0.8rem;color:#22c55e;font-weight:500;"><i class="fas fa-check-circle"></i> ' + file.name + '</p>';
                        // Re-append the file input (hidden) so it still submits
                        var reInput = document.createElement('input');
                        reInput.type = 'file';
                        reInput.name = input.name;
                        reInput.required = input.required;
                        reInput.style.cssText = 'position:absolute;inset:0;opacity:0;cursor:pointer;';
                        reInput.addEventListener('change', arguments.callee);
                        area.appendChild(reInput);
                        area.style.borderColor = '#22c55e';
                        area.style.background = 'rgba(34,197,94,0.04)';
                    };
                    reader.readAsDataURL(file);
                } else {
                    // PDF or other file — show icon + name
                    var icon = file.type === 'application/pdf' ? 'fa-file-pdf' : 'fa-file';
                    area.innerHTML = '<i class="fas ' + icon + '" style="font-size:1.5rem;color:#22c55e;margin-bottom:6px;"></i>'
                        + '<p style="font-size:0.8rem;color:#22c55e;font-weight:500;"><i class="fas fa-check-circle"></i> ' + file.name + '</p>';
                    var reInput = document.createElement('input');
                    reInput.type = 'file';
                    reInput.name = input.name;
                    reInput.required = input.required;
                    reInput.style.cssText = 'position:absolute;inset:0;opacity:0;cursor:pointer;';
                    reInput.addEventListener('change', arguments.callee);
                    area.appendChild(reInput);
                    area.style.borderColor = '#22c55e';
                    area.style.background = 'rgba(34,197,94,0.04)';
                }
            });
        });
    </script>
    <?php if (isset($recaptcha) && $recaptcha == 1) : ?>
    <script src='https://www.google.com/recaptcha/api.js' async defer></script>
    <?php endif; ?>
</body>
</html>