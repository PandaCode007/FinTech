<main class="app-main">
    <div class="wrapper">
        <!-- .page -->
        <div class="page">
            <!-- .page-inner -->
            <div class="page-inner">
                <!-- .container -->

                <div class="page-section">
                    <header class="page-title-bar bg-primary">
                        <p class="lead font-weight-bold text-center text-white p-2">
                            <?= $page ?>
                        </p>
                    </header>
                    <!-- Transactions -->
                    <div class="section mt-4">
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="card">
                                    <div class="card-header d-flex justify-content-between align-items-center">
                                        <h5 class="mb-0"><i class="fa fa-file-invoice"></i> Transaction Receipt</h5>
                                        <div>
                                            <button onclick="window.print()" class="btn btn-sm btn-outline-primary mr-2">
                                                <i class="fa fa-print"></i> Print
                                            </button>
                                            <a href="<?= base_url("admin/manage?id=$user_id") ?>" class="btn btn-sm btn-primary">
                                                <i class="fa fa-arrow-left"></i> Back
                                            </a>
                                        </div>
                                    </div>
                                    <div class="card-body">
                                        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&family=Playfair+Display:wght@700&display=swap">
                                        <style>
                                            @media print {
                                                body * {
                                                    visibility: hidden;
                                                }
                                                #receipt-container, #receipt-container * {
                                                    visibility: visible;
                                                }
                                                #receipt-container {
                                                    position: absolute;
                                                    left: 0;
                                                    top: 0;
                                                    width: 100%;
                                                }
                                                .no-print {
                                                    display: none !important;
                                                }
                                            }

                                            #receipt-container {
                                                max-width: 800px;
                                                margin: 0 auto;
                                                background: #ffffff;
                                                border: 3px solid #1a365d;
                                                border-radius: 8px;
                                                box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
                                                padding: 40px;
                                                font-family: 'Roboto', sans-serif;
                                                position: relative;
                                                overflow: hidden;
                                            }

                                            #receipt-container::before {
                                                content: '';
                                                position: absolute;
                                                top: 0;
                                                left: 0;
                                                right: 0;
                                                height: 8px;
                                                background: linear-gradient(90deg, #1a365d 0%, #2c5282 50%, #1a365d 100%);
                                            }

                                            .receipt-watermark {
                                                position: absolute;
                                                top: 50%;
                                                left: 50%;
                                                transform: translate(-50%, -50%) rotate(-45deg);
                                                font-size: 120px;
                                                font-weight: 700;
                                                color: rgba(26, 54, 93, 0.03);
                                                font-family: 'Playfair Display', serif;
                                                z-index: 0;
                                                pointer-events: none;
                                                white-space: nowrap;
                                            }

                                            .receipt-header {
                                                text-align: center;
                                                border-bottom: 2px solid #e2e8f0;
                                                padding-bottom: 30px;
                                                margin-bottom: 30px;
                                                position: relative;
                                                z-index: 1;
                                            }

                                            .receipt-header .logo-container {
                                                margin-bottom: 20px;
                                            }

                                            .receipt-header .logo-container img {
                                                max-height: 80px;
                                                max-width: 200px;
                                                object-fit: contain;
                                            }

                                            .receipt-header h1 {
                                                font-family: 'Playfair Display', serif;
                                                font-size: 32px;
                                                font-weight: 700;
                                                color: #1a365d;
                                                margin: 15px 0 10px 0;
                                                letter-spacing: 1px;
                                            }

                                            .receipt-header .subtitle {
                                                font-size: 14px;
                                                color: #64748b;
                                                text-transform: uppercase;
                                                letter-spacing: 2px;
                                                margin-bottom: 5px;
                                            }

                                            .receipt-header .status-badge {
                                                display: inline-block;
                                                background: linear-gradient(135deg, #10b981 0%, #059669 100%);
                                                color: white;
                                                padding: 8px 20px;
                                                border-radius: 20px;
                                                font-size: 12px;
                                                font-weight: 600;
                                                text-transform: uppercase;
                                                letter-spacing: 1px;
                                                margin-top: 10px;
                                                box-shadow: 0 4px 6px rgba(16, 185, 129, 0.3);
                                            }

                                            .receipt-body {
                                                position: relative;
                                                z-index: 1;
                                            }

                                            .receipt-section {
                                                margin-bottom: 35px;
                                                background: #f8fafc;
                                                border-left: 4px solid #1a365d;
                                                padding: 20px;
                                                border-radius: 4px;
                                            }

                                            .receipt-section-title {
                                                font-family: 'Playfair Display', serif;
                                                font-size: 18px;
                                                font-weight: 700;
                                                color: #1a365d;
                                                margin-bottom: 20px;
                                                text-transform: uppercase;
                                                letter-spacing: 1px;
                                                padding-bottom: 10px;
                                                border-bottom: 2px solid #e2e8f0;
                                            }

                                            .receipt-row {
                                                display: flex;
                                                justify-content: space-between;
                                                padding: 12px 0;
                                                border-bottom: 1px solid #e2e8f0;
                                            }

                                            .receipt-row:last-child {
                                                border-bottom: none;
                                            }

                                            .receipt-label {
                                                font-size: 13px;
                                                font-weight: 600;
                                                color: #475569;
                                                text-transform: uppercase;
                                                letter-spacing: 0.5px;
                                                min-width: 180px;
                                            }

                                            .receipt-value {
                                                font-size: 14px;
                                                font-weight: 500;
                                                color: #0f172a;
                                                text-align: right;
                                                flex: 1;
                                            }

                                            .receipt-value.amount {
                                                font-size: 20px;
                                                font-weight: 700;
                                                color: #1a365d;
                                                font-family: 'Roboto', sans-serif;
                                            }

                                            .receipt-value.reference {
                                                font-family: 'Courier New', monospace;
                                                font-weight: 600;
                                                color: #1a365d;
                                                letter-spacing: 1px;
                                            }

                                            .receipt-highlight {
                                                background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
                                                border: 2px solid #3b82f6;
                                                border-radius: 6px;
                                                padding: 25px;
                                                margin: 25px 0;
                                                text-align: center;
                                            }

                                            .receipt-highlight .highlight-label {
                                                font-size: 11px;
                                                text-transform: uppercase;
                                                letter-spacing: 2px;
                                                color: #3b82f6;
                                                font-weight: 600;
                                                margin-bottom: 8px;
                                            }

                                            .receipt-highlight .highlight-value {
                                                font-size: 28px;
                                                font-weight: 700;
                                                color: #1e40af;
                                                font-family: 'Roboto', sans-serif;
                                            }

                                            .receipt-footer {
                                                margin-top: 40px;
                                                padding-top: 30px;
                                                border-top: 2px solid #e2e8f0;
                                                text-align: center;
                                                position: relative;
                                                z-index: 1;
                                            }

                                            .receipt-footer .security-note {
                                                font-size: 11px;
                                                color: #64748b;
                                                font-style: italic;
                                                margin: 15px 0;
                                                padding: 15px;
                                                background: #f1f5f9;
                                                border-radius: 4px;
                                                border-left: 3px solid #cbd5e1;
                                            }

                                            .receipt-footer .print-date {
                                                font-size: 12px;
                                                color: #94a3b8;
                                                margin-top: 20px;
                                            }

                                            .receipt-footer .verification-code {
                                                margin-top: 20px;
                                                padding: 15px;
                                                background: #f8fafc;
                                                border: 1px dashed #cbd5e1;
                                                border-radius: 4px;
                                            }

                                            .receipt-footer .verification-code-label {
                                                font-size: 10px;
                                                text-transform: uppercase;
                                                letter-spacing: 1px;
                                                color: #64748b;
                                                margin-bottom: 5px;
                                            }

                                            .receipt-footer .verification-code-value {
                                                font-family: 'Courier New', monospace;
                                                font-size: 14px;
                                                font-weight: 600;
                                                color: #1a365d;
                                                letter-spacing: 2px;
                                            }

                                            .receipt-qr-section {
                                                text-align: center;
                                                margin: 30px 0;
                                                padding: 20px;
                                                background: #f8fafc;
                                                border-radius: 6px;
                                            }

                                            @media (max-width: 768px) {
                                                #receipt-container {
                                                    padding: 20px;
                                                }

                                                .receipt-header h1 {
                                                    font-size: 24px;
                                                }

                                                .receipt-row {
                                                    flex-direction: column;
                                                }

                                                .receipt-label {
                                                    margin-bottom: 5px;
                                                }

                                                .receipt-value {
                                                    text-align: left;
                                                }
                                            }
                                        </style>

                                        <div id="receipt-container">
                                            <div class="receipt-watermark"><?= strtoupper($company_name) ?></div>
                                            
                                            <!-- Header -->
                                            <div class="receipt-header">
                                                <div class="logo-container">
                                                    <img src="<?= base_url('uploads/' . $company_logo) ?>" alt="<?= $company_name ?>">
                                                </div>
                                                <h1>Transaction Receipt</h1>
                                                <div class="subtitle">Official Bank Document</div>
                                                <div class="status-badge">
                                                    <i class="fa fa-check-circle"></i> Transaction Successful
                                                </div>
                                            </div>

                                            <!-- Body -->
                                            <div class="receipt-body">
                                                <!-- Transaction Amount Highlight -->
                                                <div class="receipt-highlight">
                                                    <div class="highlight-label">Transaction Amount</div>
                                                    <div class="highlight-value"><?= $the_amount ?></div>
                                                </div>

                                                <!-- Sender Details -->
                                                <div class="receipt-section">
                                                    <div class="receipt-section-title">
                                                        <i class="fa fa-user"></i> Sender Information
                                                    </div>
                                                    <div class="receipt-row">
                                                        <div class="receipt-label">Full Name</div>
                                                        <div class="receipt-value"><?= ucwords($name) ?></div>
                                                    </div>
                                                    <div class="receipt-row">
                                                        <div class="receipt-label">Account Number</div>
                                                        <div class="receipt-value">****<?= $sender ?></div>
                                                    </div>
                                                    <div class="receipt-row">
                                                        <div class="receipt-label">Account Type</div>
                                                        <div class="receipt-value"><?= $xType ?></div>
                                                    </div>
                                                </div>

                                                <!-- Receiver Details -->
                                                <div class="receipt-section">
                                                    <div class="receipt-section-title">
                                                        <i class="fa fa-user-check"></i> Receiver Information
                                                    </div>
                                                    <div class="receipt-row">
                                                        <div class="receipt-label">Full Name</div>
                                                        <div class="receipt-value"><?= ucwords($receiver_name) ?></div>
                                                    </div>
                                                    <div class="receipt-row">
                                                        <div class="receipt-label">Account Number</div>
                                                        <div class="receipt-value">****<?= $receiver_account ?></div>
                                                    </div>
                                                    <div class="receipt-row">
                                                        <div class="receipt-label">Amount Transferred</div>
                                                        <div class="receipt-value amount"><?= $the_amount ?></div>
                                                    </div>
                                                </div>

                                                <!-- Bank Details -->
                                                <div class="receipt-section">
                                                    <div class="receipt-section-title">
                                                        <i class="fa fa-university"></i> Bank Details
                                                    </div>
                                                    <div class="receipt-row">
                                                        <div class="receipt-label">Bank Name</div>
                                                        <div class="receipt-value"><?= $theBank ?></div>
                                                    </div>
                                                    <?php if ($theBankAddress): ?>
                                                    <div class="receipt-row">
                                                        <div class="receipt-label">Bank Address</div>
                                                        <div class="receipt-value"><?= $theBankAddress ?></div>
                                                    </div>
                                                    <?php endif; ?>
                                                    <?php if ($theRouting !== ''): ?>
                                                    <div class="receipt-row">
                                                        <div class="receipt-label">Routing Number</div>
                                                        <div class="receipt-value"><?= $theRouting ?></div>
                                                    </div>
                                                    <?php endif; ?>
                                                    <?php if ($swiftCode !== ''): ?>
                                                    <div class="receipt-row">
                                                        <div class="receipt-label">SWIFT Code</div>
                                                        <div class="receipt-value"><?= $swiftCode ?></div>
                                                    </div>
                                                    <?php endif; ?>
                                                </div>

                                                <!-- Transaction Details -->
                                                <div class="receipt-section">
                                                    <div class="receipt-section-title">
                                                        <i class="fa fa-info-circle"></i> Transaction Details
                                                    </div>
                                                    <div class="receipt-row">
                                                        <div class="receipt-label">Transaction Reference</div>
                                                        <div class="receipt-value reference"><?= $theReference ?></div>
                                                    </div>
                                                    <div class="receipt-row">
                                                        <div class="receipt-label">Transaction Date & Time</div>
                                                        <div class="receipt-value"><?= $theDate ?></div>
                                                    </div>
                                                    <div class="receipt-row">
                                                        <div class="receipt-label">Remarks / Description</div>
                                                        <div class="receipt-value"><?= $theRemarks ?></div>
                                                    </div>
                                                    <div class="receipt-row">
                                                        <div class="receipt-label">Transaction Status</div>
                                                        <div class="receipt-value">
                                                            <span style="color: #10b981; font-weight: 600;">
                                                                <i class="fa fa-check-circle"></i> Completed
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <!-- Transaction Note -->
                                                <?php if ($header): ?>
                                                <div class="receipt-section" style="background: #fef3c7; border-left-color: #f59e0b;">
                                                    <div class="receipt-section-title" style="color: #92400e;">
                                                        <i class="fa fa-info-circle"></i> Important Notice
                                                    </div>
                                                    <div style="color: #78350f; font-size: 13px; line-height: 1.6;">
                                                        <?= $header ?>
                                                    </div>
                                                </div>
                                                <?php endif; ?>
                                            </div>

                                            <!-- Footer -->
                                            <div class="receipt-footer">
                                                <div class="security-note">
                                                    <i class="fa fa-shield-alt"></i> This is an official bank document. Please keep this receipt for your records. 
                                                    For verification purposes, retain this receipt as proof of transaction.
                                                </div>
                                                
                                                <div class="verification-code">
                                                    <div class="verification-code-label">Verification Code</div>
                                                    <div class="verification-code-value"><?= strtoupper(substr(md5($theReference . $theDate), 0, 12)) ?></div>
                                                </div>

                                                <div class="print-date">
                                                    <i class="fa fa-calendar"></i> Printed on <?= date("l, F jS, Y \a\\t g:i A") ?>
                                                </div>

                                                <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
                                                    <img src="<?= base_url('uploads/' . $company_logo) ?>" alt="<?= $company_name ?>" style="max-height: 40px; opacity: 0.6;">
                                                    <div style="font-size: 11px; color: #94a3b8; margin-top: 10px;">
                                                        <?= $company_name ?> &copy; <?= date('Y') ?>. All rights reserved.
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</main>
