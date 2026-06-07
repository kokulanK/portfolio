require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 5000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:5173';

// Configure Middleware
app.use(cors({
  origin: CORS_ORIGIN,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Log incoming requests for debugging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

  // POST Endpoint: contact form
  app.post('/api/contact', async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Print contact info to console
    console.log('====================================');
    console.log(`NEW CONTACT INQUIRY AT ${new Date().toLocaleString()}`);
    console.log(`Name:    ${name}`);
    console.log(`Email:   ${email}`);
    console.log(`Message: ${message}`);
    console.log('====================================');

    // Persist contact messages to a local file contacts.json
    const contactsFilePath = path.join(__dirname, 'contacts.json');
    try {
      let existingContacts = [];
      if (fs.existsSync(contactsFilePath)) {
        const fileContent = fs.readFileSync(contactsFilePath, 'utf8');
        existingContacts = JSON.parse(fileContent || '[]');
      }
      existingContacts.push({
        name,
        email,
        message,
        timestamp: new Date().toISOString()
      });
      fs.writeFileSync(contactsFilePath, JSON.stringify(existingContacts, null, 2), 'utf8');
      console.log(`✓ Message saved locally to ${contactsFilePath}`);
    } catch (err) {
      console.error('⚠ Failed to save message locally:', err.message);
    }

    // Send the HTTP response immediately so the UI is fast and doesn't load/hang
    res.status(200).json({ success: true, message: 'Message received and logged successfully.' });

    // Send emails in the background (non-blocking)
    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_TO, RESEND_API_KEY } = process.env;

    // Define email HTML bodies
    const adminHtml = `<div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">` +
          `<h2 style="color: #7c3aed;">New Portfolio Message</h2>` +
          `<p><strong>Name:</strong> ${name}</p>` +
          `<p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>` +
          `<hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />` +
          `<p style="white-space: pre-wrap;">${message}</p>` +
          `</div>`;

    const visitorHtml = `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #2c3e50; line-height: 1.6;">` +
          `<div style="border-bottom: 2px solid #00d4ff; padding-bottom: 15px; margin-bottom: 25px;">` +
          `<h2 style="color: #050810; margin: 0; font-size: 22px;">Hello ${name}!</h2>` +
          `<p style="color: #64748b; margin: 5px 0 0 0; font-size: 14px;">Thanks for reaching out.</p>` +
          `</div>` +
          `<p style="font-size: 15px;">` +
          `Thank you so much for visiting my portfolio website and taking the time to send a message. I've received it and will get back to you as soon as I can!` +
          `</p>` +
          `<p style="font-size: 15px; font-weight: bold; color: #7c3aed;">` +
          `Also, I am currently looking for an internship opportunity!` +
          `</p>` +
          `<div style="background-color: #f8fafc; border-left: 4px solid #00d4ff; padding: 15px; margin: 25px 0; border-radius: 4px;">` +
          `<h4 style="margin: 0 0 10px 0; color: #050810; font-size: 14px;">Your Message:</h4>` +
          `<p style="margin: 0; font-style: italic; white-space: pre-wrap; font-size: 14px; color: #475569;">"${message}"</p>` +
          `</div>` +
          `<p style="font-size: 15px;">` +
          `In the meantime, feel free to check out my <a href="https://github.com/kokulanK" style="color: #7c3aed; text-decoration: none; font-weight: 600;">GitHub</a> or connect with me on <a href="https://linkedin.com/in/kokulan-kugathasan" style="color: #7c3aed; text-decoration: none; font-weight: 600;">LinkedIn</a>.` +
          `</p>` +
          `<div style="border-top: 1px solid #e2e8f0; margin-top: 35px; padding-top: 15px; font-size: 13px; color: #64748b;">` +
          `<p style="margin: 0; padding-bottom: 5px;">Warm regards,</p>` +
          `<p style="margin: 5px 0 0 0; font-weight: bold; color: #050810; font-size: 14px;">Kokulan Kugathasan</p>` +
          `<p style="margin: 2px 0 0 0;">BSc (Hons) Information Technology (Data Science)</p>` +
          `<p style="margin: 2px 0 0 0;">SLIIT</p>` +
          `<p style="margin: 5px 0 0 0;">Email: <a href="mailto:kokulankugathasan2003@gmail.com" style="color: #64748b; text-decoration: none;">kokulankugathasan2003@gmail.com</a></p>` +
          `<p style="margin: 2px 0 0 0;">Phone: <a href="tel:+94767520033" style="color: #64748b; text-decoration: none;">+94 76 752 0033</a></p>` +
          `<p style="margin: 2px 0 0 0;">LinkedIn: <a href="https://linkedin.com/in/kokulan-kugathasan" style="color: #64748b; text-decoration: none;">linkedin.com/in/kokulan-kugathasan</a></p>` +
          `<p style="margin: 2px 0 0 0;">GitHub: <a href="https://github.com/kokulanK" style="color: #64748b; text-decoration: none;">github.com/kokulanK</a></p>` +
          `</div>` +
          `</div>`;

    // Prepare CV attachment if it exists
    const cvPath = path.join(__dirname, 'assets', 'Kokulan_Kugathasan_CV.pdf');
    const hasCV = fs.existsSync(cvPath);
    const resendAttachments = hasCV ? [{
      filename: 'Kokulan_Kugathasan_CV.pdf',
      content: hasCV ? fs.readFileSync(cvPath, { encoding: 'base64' }) : ''
    }] : [];
    const smtpAttachments = hasCV ? [{
      filename: 'Kokulan_Kugathasan_CV.pdf',
      path: cvPath
    }] : [];

    if (RESEND_API_KEY) {
      // Execute Resend sending in the background
      (async () => {
        // 1. Send admin alert
        try {
          const resAdmin = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${RESEND_API_KEY.trim()}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
              to: SMTP_TO || 'kokulankugathasan2003@gmail.com',
              subject: `Portfolio Contact from ${name}`,
              html: adminHtml
            })
          });
          const dataAdmin = await resAdmin.json();
          if (resAdmin.ok) {
            console.log(`✓ Admin notification sent via Resend API:`, dataAdmin.id);
          } else {
            console.error('⚠ Resend API Admin Alert failed:', dataAdmin);
          }
        } catch (err) {
          console.error('⚠ Failed to send email via Resend API:', err.message);
        }

        // 2. Send visitor confirmation (note: this only succeeds if user verified their domain on Resend)
        try {
          const resVisitor = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${RESEND_API_KEY.trim()}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
              to: email,
              subject: `Thanks for reaching out! - Kokulan Kugathasan`,
              html: visitorHtml,
              attachments: resendAttachments
            })
          });
          const dataVisitor = await resVisitor.json();
          if (resVisitor.ok) {
            console.log(`✓ Visitor confirmation sent via Resend API:`, dataVisitor.id);
          } else {
            console.log('ℹ Resend API Visitor confirmation failed (needs custom domain verification to send to external addresses):', dataVisitor.message);
          }
        } catch (err) {
          console.error('⚠ Failed to send visitor confirmation via Resend API:', err.message);
        }
      })();
    } else if (SMTP_HOST && SMTP_USER && SMTP_PASS) {
      // Execute SMTP sending in the background
      (async () => {
        try {
          const transporter = nodemailer.createTransport({
            host: SMTP_HOST.trim(),
            port: parseInt(SMTP_PORT) || 587,
            secure: parseInt(SMTP_PORT) === 465, // true for 465, false for other ports
            auth: {
              user: SMTP_USER.trim(),
              pass: SMTP_PASS.trim(),
            },
            connectionTimeout: 5000,
            greetingTimeout: 5000,
            socketTimeout: 5000
          });

          const adminMailOptions = {
            from: `"${name}" <${SMTP_USER.trim()}>`,
            replyTo: email,
            to: SMTP_TO || 'kokulankugathasan2003@gmail.com',
            subject: `Portfolio Contact from ${name}`,
            text: `You have received a new message from your portfolio contact form.\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
            html: adminHtml
          };

          await transporter.sendMail(adminMailOptions);
          console.log(`✓ Email successfully sent to ${SMTP_TO || 'kokulankugathasan2003@gmail.com'}`);

          const visitorMailOptions = {
            from: `"Kokulan Kugathasan" <${SMTP_USER.trim()}>`,
            to: email,
            subject: `Thanks for reaching out! - Kokulan Kugathasan`,
            text: `Hello ${name},\n\nThank you for visiting my portfolio website and getting in touch!\n\nHere is a copy of your message:\n"${message}"\n\nWarm regards,\nKokulan Kugathasan`,
            html: visitorHtml,
            attachments: smtpAttachments
          };

          await transporter.sendMail(visitorMailOptions);
          console.log(`✓ Confirmation email sent back to visitor: ${email}`);
        } catch (err) {
          console.error('⚠ Failed to send email via SMTP:', err.message);
        }
      })();
    } else {
      console.log('ℹ SMTP/Resend is not configured. Message logged to console only.');
    }
  });

// GET Endpoint: debug SMTP & Resend settings
app.get('/api/debug-smtp', async (req, res) => {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_TO, RESEND_API_KEY } = process.env;

  const status = {
    SMTP: {
      host: SMTP_HOST || 'Missing',
      port: SMTP_PORT || 'Missing',
      user: SMTP_USER || 'Missing',
      pass: SMTP_PASS ? 'Configured (***)' : 'Missing',
    },
    Resend: {
      key: RESEND_API_KEY ? 'Configured (***)' : 'Missing'
    }
  };

  const results = {};

  // 1. Test Resend if configured
  if (RESEND_API_KEY) {
    try {
      const fetchRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${RESEND_API_KEY.trim()}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: 'onboarding@resend.dev',
          to: SMTP_TO || 'kokulankugathasan2003@gmail.com',
          subject: 'Resend API Connection Test',
          html: '<p>Resend connection test successful!</p>'
        })
      });
      const data = await fetchRes.json();
      if (fetchRes.ok) {
        results.resend = { success: true, message: 'Resend test mail sent!', info: data };
      } else {
        results.resend = { success: false, error: data };
      }
    } catch (err) {
      results.resend = { success: false, error: err.message };
    }
  }

  // 2. Test SMTP if configured
  if (SMTP_HOST && SMTP_USER && SMTP_PASS) {
    try {
      const transporter = nodemailer.createTransport({
        host: SMTP_HOST.trim(),
        port: parseInt(SMTP_PORT) || 587,
        secure: parseInt(SMTP_PORT) === 465,
        auth: {
          user: SMTP_USER.trim(),
          pass: SMTP_PASS.trim(),
        },
        connectionTimeout: 5000,
        greetingTimeout: 5000,
        socketTimeout: 5000,
      });

      await transporter.verify();
      const info = await transporter.sendMail({
        from: `"Portfolio Test" <${SMTP_USER.trim()}>`,
        to: SMTP_TO || SMTP_USER.trim(),
        subject: "Portfolio SMTP Test Successful",
        text: "SMTP connection working!",
      });
      results.smtp = { success: true, message: 'SMTP test mail sent!', info: info };
    } catch (err) {
      results.smtp = { success: false, error: err.message, stack: err.stack };
    }
  }

  const isSuccess = Object.values(results).some(r => r.success);
  return res.status(isSuccess ? 200 : 500).json({
    status,
    results
  });
});

// GET Endpoint: download CV
app.get('/api/download-cv', (req, res) => {
  const cvPath = path.join(__dirname, 'assets', 'Kokulan_Kugathasan_CV.pdf');

  if (!fs.existsSync(cvPath)) {
    console.error(`[ERROR] CV file not found at expected path: ${cvPath}`);
    return res.status(404).json({ 
      error: 'CV file not found on server. Please ensure Kokulan_Kugathasan_CV.pdf is placed in /server/assets/' 
    });
  }

  // Stream file as attachment
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename="Kokulan_Kugathasan_CV.pdf"');
  
  const stream = fs.createReadStream(cvPath);
  stream.on('error', (err) => {
    console.error('Stream error during CV download:', err);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Failed to stream the CV file.' });
    }
  });

  stream.pipe(res);
});

// Start the Express Server
app.listen(PORT, () => {
  console.log(`\n====================================`);
  console.log(`🚀 Express server running on port ${PORT}`);
  console.log(`🔗 Allowed CORS Origin: ${CORS_ORIGIN}`);
  
  const cvPath = path.join(__dirname, 'assets', 'Kokulan_Kugathasan_CV.pdf');
  if (!fs.existsSync(cvPath)) {
    console.warn(`⚠ WARNING: CV file not found at: ${cvPath}`);
    console.warn(`  Please place "Kokulan_Kugathasan_CV.pdf" in the "/server/assets" folder.`);
  } else {
    console.log(`✓ CV file verified at server/assets/Kokulan_Kugathasan_CV.pdf`);
  }
  console.log(`====================================\n`);
});
