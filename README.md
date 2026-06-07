# Kokulan Kugathasan - Personal Portfolio Website

A premium, interactive personal portfolio website showcasing my works, experience, and skills in Data Science and Machine Learning. The website features an advanced 3D bouncy tech stack canvas, a custom virtual assistant chatbot, auto-scrolling visual elements, and a Node.js/Express contact system.

---

## ✨ Features

- **🧠 Interactive 3D Physics Tech Stack**: A custom HTML5 canvas rendering 22 skill spheres bouncing inside a 3D coordinate space. Implements realistic 3D elastic collisions, floor shadows, depth sorting, and cursor/touch repulsion.
- **✨ Custom Floating Chatbot**: An offline-capable portfolio assistant with pre-loaded insights on projects, certifications, and academic background. Includes quick response chips and smooth typing indicators.
- **📁 Automated CV Streaming**: Securely downloads and streams my professional resume from the backend with error-handling and file checks.
- **✉️ Live Dual-Email Contact Form**: Saves messages locally to `contacts.json` and uses NodeMailer SMTP configurations to instantly notify me of new messages while sending a confirmation email back to the visitor.
- **🌀 Canvas Particle Background**: A clean floating particle system dynamically drawing line connections when particles drift near each other.
- **📱 Responsive & Animated**: Built with mobile-first layouts, custom scroll-revealing fade-in transitions, and clean hover state animations.

---

## 🛠️ Project Structure

```text
portfolio/
├── package.json              # Root task runner (concurrent client & server)
├── client/                   # React frontend application (Vite)
│   ├── index.html
│   ├── src/
│   │   ├── main.jsx
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── components/       # Component-driven design
│   │       ├── Navbar.jsx
│   │       ├── Hero.jsx
│   │       ├── About.jsx
│   │       ├── WhatIDo.jsx
│   │       ├── Experience.jsx
│   │       ├── Works.jsx
│   │       ├── TechStack.jsx  # 3D gravity-physics canvas
│   │       ├── Contact.jsx
│   │       ├── Chatbot.jsx    # Assistant AI
│   │       └── Footer.jsx
└── server/                   # Node.js backend application (Express)
    ├── index.js              # Server logic & API endpoints
    ├── .env                  # Port & SMTP configuration
    └── assets/
        └── Kokulan_Kugathasan_CV.pdf # Professional PDF Resume
```

---

## 🚀 Getting Started

### 📋 Prerequisites

- **Node.js** (v18 or higher recommended)
- **npm** (v9 or higher)

### 💻 Local Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/kokulanK/portfolio.git
   cd portfolio
   ```

2. **Install all dependencies** (installs root, client, and server dependencies):
   ```bash
   npm run install:all
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the `server` directory and specify your parameters:
   ```env
   PORT=5000
   CORS_ORIGIN=http://localhost:5173

   # SMTP configuration (Gmail example)
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-gmail-app-password
   SMTP_TO=your-receiving-email@gmail.com
   ```

4. **Verify CV Asset:**
   Place your resume file named `Kokulan_Kugathasan_CV.pdf` inside `server/assets/`.

5. **Run the development servers:**
   ```bash
   npm run dev
   ```
   This command starts the React development client at `http://localhost:5173` and the Express server at `http://localhost:5000` concurrently.

---

## 🧪 Technologies Used

- **Frontend:** React, Vite, Tailwind CSS, HTML5 Canvas API
- **Backend:** Node.js, Express, Nodemailer, CORS, Dotenv
- **Icons:** SVG Brand Icons (GitHub, LinkedIn)
