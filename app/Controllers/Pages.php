<?php

namespace App\Controllers;

use App\Models\FaqModel;
use App\Models\TestimonialModel;
use App\Models\BasicModel;

class Pages extends License
{

  public

  function index()
  {
    return redirect()->to(base_url());
  }

  public

  function view($page = 'home')
  {

    $FaqModel = new FaqModel();
    $TestimonialModel = new TestimonialModel();
    $BasicModel = new BasicModel();
    $data = $this->site;

    //FAQs
    $data['faqs'] = $FaqModel->orderBy('id', 'ASC')->findAll();
    //Testimonials
    $data['testimonials'] = $TestimonialModel->orderBy('id', 'ASC')->findAll();
    //Terms and Conditions
    $data['terms'] = $BasicModel->where('title', 'terms')->first()['value'];
    //About Us
    $data['about_us'] = $BasicModel->where('title', 'about')->first()['value'];

    $data['page'] = ucfirst(str_replace('-', ' ', $page));
    return view("template/$this->template/header", $data)
      . view("template/$this->template/$page", $data)
      . view("template/$this->template/footer", $data);
  }

  public function contact()
  {
    // Always send to the Bank email defined in General Settings (company_email)
    $bankEmail = $this->site['company_email'];

    $firstName = trim((string) $this->request->getPost('first_name'));
    $lastName  = trim((string) $this->request->getPost('last_name'));
    $email     = trim((string) $this->request->getPost('email'));
    $phone     = trim((string) $this->request->getPost('phone'));
    $subject   = trim((string) $this->request->getPost('subject'));
    $messageIn = trim((string) $this->request->getPost('message'));

    // Basic validation
    if ($firstName === '' || $email === '' || $messageIn === '' || ! filter_var($email, FILTER_VALIDATE_EMAIL)) {
      session()->setFlashdata('msg', '<div class="bf-modal-icon"><i class="fas fa-exclamation-triangle"></i></div><h3>Incomplete Form</h3><p>Please fill in your name, a valid email address, and a message before submitting.</p>');
      return redirect()->to('contact');
    }

    $fullName  = trim($firstName . ' ' . $lastName);
    $topic     = $subject !== '' ? $subject : 'General Inquiry';
    $emailSubj = 'Contact Form: ' . $topic . ' - ' . $fullName;

    $bodyHtml = '<h2>New Contact Message</h2>'
      . '<p><strong>Name:</strong> ' . esc($fullName) . '</p>'
      . '<p><strong>Email:</strong> ' . esc($email) . '</p>'
      . '<p><strong>Phone:</strong> ' . esc($phone !== '' ? $phone : 'N/A') . '</p>'
      . '<p><strong>Subject:</strong> ' . esc($topic) . '</p>'
      . '<p><strong>Message:</strong></p>'
      . '<p>' . nl2br(esc($messageIn)) . '</p>'
      . '<hr><p style="color:#888;font-size:12px;">Sent from the ' . esc($this->site['company_name']) . ' website contact form on ' . date('jS F, Y h:i A') . '.</p>';

    $headerHtml = $this->site['email_header'] ?? '';
    $footerHtml = $this->site['email_footer'] ?? '';

    $this->mail->setFrom($this->site['noreply'], $this->site['company_name']);
    $this->mail->setTo($bankEmail);
    if ($email !== '') {
      $this->mail->setReplyTo($email, $fullName);
    }
    $this->mail->setSubject($emailSubj);
    $this->mail->setMessage($headerHtml . $bodyHtml . $footerHtml);
    $this->mail->send();

    session()->setFlashdata('msg', '<div class="bf-modal-icon"><i class="fas fa-check"></i></div><h3>Message Sent</h3><p>Thank you, ' . esc($firstName) . '. Your message has been sent to our team and we will get back to you within 2 business hours.</p>');
    return redirect()->to('contact');
  }

  public function otp_verification()
  {
    $data = $this->site;
    $data['page'] = 'OTP Verification';
    return view("template/$this->template/header", $data)
      . view("template/$this->template/otp_verification", $data)
      . view("template/$this->template/footer", $data);
  }
  public function verify_otp()
  {
    
    $inputOtp = $this->request->getPost('otp');
    $sessionOtp = session()->get('otp');
  
      if ($inputOtp == $sessionOtp) {
          $ses_data = [
              "user_id" => session()->get('otp_user_id'),
          ];
  
          session()->set($ses_data);
  
          // Remove OTP and related session data
          session()->remove('otp');

          // OTP is correct, proceed with login or next steps
          session()->setFlashdata('msg', 'OTP verified successfully.');
          // Redirect to the user dashboard or another page
          return redirect()->to("user");
      } else {
          // OTP is incorrect
          session()->setFlashdata('msg', 'Invalid OTP. Please try again.');
          return redirect()->to('otp-verification');
      }
  }
  
}
