/**
 * Pages Controller - Express version of PHP Pages controller
 * Handles all public-facing pages: about, contact, terms, FAQs, news, etc.
 */
const FAQ = require('../models/ExtraModels').FAQ;
const Testimonial = require('../models/ExtraModels').Testimonial;
const BasicContent = require('../models/ExtraModels').BasicContent;
const News = require('../models/ExtraModels').News;
const Setting = require('../models/ExtraModels').Setting;

/**
 * GET /api/public/about - Get About Us content
 */
exports.getAbout = async (req, res) => {
  try {
    const content = await BasicContent.findOne({ title: 'about' });
    const settings = await Setting.findOne();
    res.json({
      about_us: content ? content.value : '',
      company_name: settings ? settings.company_name : '',
      company_description: settings ? settings.company_description : '',
      company_email: settings ? settings.company_email : '',
      company_phone: settings ? settings.company_phone : '',
      company_address: settings ? settings.company_address : ''
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

/**
 * GET /api/public/terms - Get Terms & Conditions
 */
exports.getTerms = async (req, res) => {
  try {
    const content = await BasicContent.findOne({ title: 'terms' });
    res.json({ terms: content ? content.value : '' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

/**
 * GET /api/public/faqs - Get all FAQs
 */
exports.getFaqs = async (req, res) => {
  try {
    const faqs = await FAQ.find().sort({ createdAt: 1 });
    res.json(faqs);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

/**
 * GET /api/public/testimonials - Get all testimonials
 */
exports.getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: 1 });
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

/**
 * GET /api/public/news - Get active news articles
 */
exports.getNews = async (req, res) => {
  try {
    const news = await News.find({ status: '1' }).sort({ createdAt: -1 });
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

/**
 * GET /api/public/news/:id - Get single news article
 */
exports.getNewsItem = async (req, res) => {
  try {
    const article = await News.findById(req.params.id);
    if (!article) return res.status(404).json({ message: 'Article not found' });
    res.json(article);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

/**
 * POST /api/public/contact - Handle contact form submission
 */
exports.submitContact = async (req, res) => {
  try {
    const { first_name, last_name, email, phone, subject, message } = req.body;

    if (!first_name || !email || !message) {
      return res.status(400).json({ message: 'Please fill in required fields: name, email, and message.' });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email address.' });
    }

    const settings = await Setting.findOne();
    const bankEmail = settings ? settings.company_email : 'customercare@butterfieldapp.com';
    const fullName = `${first_name} ${last_name || ''}`.trim();
    const topic = subject || 'General Inquiry';
    const emailSubject = `Contact Form: ${topic} - ${fullName}`;

    // In production, send email here via Nodemailer
    console.log(`Contact form submission from ${fullName} <${email}>: ${emailSubject}`);

    res.json({
      success: true,
      message: `Thank you, ${first_name}. Your message has been sent to our team.`
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};