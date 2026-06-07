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
    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_TO } = process.env;

    if (SMTP_HOST && SMTP_USER && SMTP_PASS) {
      // Execute email sending in the background
      (async () => {
        try {
          const transporter = nodemailer.createTransport({
            host: SMTP_HOST,
            port: parseInt(SMTP_PORT) || 587,
            secure: parseInt(SMTP_PORT) === 465, // true for 465, false for other ports
            auth: {
              user: SMTP_USER,
              pass: SMTP_PASS,
            },
            connectionTimeout: 5000, // 5 seconds connection timeout
            greetingTimeout: 5000,
            socketTimeout: 5000
          });

          const adminMailOptions = {
            from: `"${name}" <${SMTP_USER}>`, // Send on behalf of user via authenticated SMTP
            replyTo: email,
            to: SMTP_TO || 'kokulankugathasan2003@gmail.com',
            subject: `Portfolio Contact from ${name}`,
            text: `You have received a new message from your portfolio contact form.\n\n` +
                  `Name: ${name}\n` +
                  `Email: ${email}\n\n` +
                  `Message:\n${message}`,
            html: `<div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">` +
                  `<h2 style="color: #7c3aed;">New Portfolio Message</h2>` +
                  `<p><strong>Name:</strong> ${name}</p>` +
                  `<p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>` +
                  `<hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />` +
                  `<p style="white-space: pre-wrap;">${message}</p>` +
                  `</div>`
          };

          await transporter.sendMail(adminMailOptions);
          console.log(`✓ Email successfully sent to ${SMTP_TO || 'kokulankugathasan2003@gmail.com'}`);

          // Send confirmation/thank-you email back to the visitor
          const visitorMailOptions = {
            from: `"Kokulan Kugathasan" <${SMTP_USER}>`,
            to: email,
            subject: `Thanks for reaching out! - Kokulan Kugathasan`,
            text: `Hello ${name},\n\n` +
                  `Thank you for visiting my portfolio website and getting in touch! I have received your message and will get back to you as soon as possible.\n\n` +
                  `Here is a copy of your message:\n` +
                  `"${message}"\n\n` +
                  `If you want to connect on other platforms, feel free to visit:\n` +
                  `GitHub: https://github.com/kokulanK\n` +
                  `LinkedIn: https://linkedin.com/in/kokulan-kugathasan\n\n` +
                  `Warm regards,\n` +
                  `Kokulan Kugathasan\n` +
                  `Data Science Student, SLIIT`,
            html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #2c3e50; line-height: 1.6;">` +
                  `<div style="border-bottom: 2px solid #00d4ff; padding-bottom: 15px; margin-bottom: 25px;">` +
                  `<h2 style="color: #050810; margin: 0; font-size: 22px;">Hello ${name}!</h2>` +
                  `<p style="color: #64748b; margin: 5px 0 0 0; font-size: 14px;">Thanks for reaching out.</p>` +
                  `</div>` +
                  `<p style="font-size: 15px;">` +
                  `Thank you so much for visiting my portfolio website and taking the time to send a message. I've received it and will get back to you as soon as I can!` +
                  `</p>` +
                  `<div style="background-color: #f8fafc; border-left: 4px solid #00d4ff; padding: 15px; margin: 25px 0; border-radius: 4px;">` +
                  `<h4 style="margin: 0 0 10px 0; color: #050810; font-size: 14px;">Your Message:</h4>` +
                  `<p style="margin: 0; font-style: italic; white-space: pre-wrap; font-size: 14px; color: #475569;">"${message}"</p>` +
                  `</div>` +
                  `<p style="font-size: 15px;">` +
                  `In the meantime, feel free to check out my <a href="https://github.com/kokulanK" style="color: #7c3aed; text-decoration: none; font-weight: 600;">GitHub</a> or connect with me on <a href="https://linkedin.com/in/kokulan-kugathasan" style="color: #7c3aed; text-decoration: none; font-weight: 600;">LinkedIn</a>.` +
                  `</p>` +
                  `<div style="border-top: 1px solid #e2e8f0; margin-top: 35px; padding-top: 15px; font-size: 13px; color: #64748b;">` +
                  `<p style="margin: 0;">Warm regards,</p>` +
                  `<p style="margin: 5px 0 0 0; font-weight: bold; color: #050810;">Kokulan Kugathasan</p>` +
                  `<p style="margin: 2px 0 0 0;">Data Science Student · SLIIT</p>` +
                  `</div>` +
                  `</div>`
          };

          await transporter.sendMail(visitorMailOptions);
          console.log(`✓ Confirmation email sent back to visitor: ${email}`);
        } catch (err) {
          console.error('⚠ Failed to send email via SMTP:', err.message);
        }
      })();
    } else {
      console.log('ℹ SMTP is not configured. Message logged to console only.');
    }
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
