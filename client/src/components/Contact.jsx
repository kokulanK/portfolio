import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError(''); // Clear error on edit
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, message } = formData;

    if (!name || !email || !message) {
      setError('Please fill in all fields.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess(false);

    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';

    try {
      const response = await fetch(`${apiUrl}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setFormData({ name: '', email: '', message: '' });
      } else {
        setError(data.error || 'Something went wrong. Please try emailing me directly.');
      }
    } catch (err) {
      console.error('Contact submission error:', err);
      setError('Could not connect to the server. Please check your internet connection or email directly.');
    } finally {
      setLoading(false);
    }
  };

  const contactDetails = [
    { emoji: '📧', label: 'Email', val: 'kokulankugathasan2003@gmail.com', href: 'mailto:kokulankugathasan2003@gmail.com' },
    { emoji: '📞', label: 'Phone', val: '+94 76 752 0033', href: 'tel:+94767520033' },
    { emoji: '💼', label: 'LinkedIn', val: 'linkedin.com/in/kokulan-kugathasan', href: 'https://linkedin.com/in/kokulan-kugathasan' },
    { emoji: '🐙', label: 'GitHub', val: 'github.com/kokulanK', href: 'https://github.com/kokulanK' },
    { emoji: '🎓', label: 'Education', val: 'SLIIT — Data Science (2024–Present)', href: '#experience' }
  ];

  return (
    <section 
      id="contact" 
      className="section-hidden bg-bg-primary py-24 px-6 md:px-12 w-full transition-all duration-700"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-16">
          <span className="text-[11px] font-bold tracking-[0.2em] text-text-muted uppercase mb-3 block">
            Let's work together
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-text-main">
            Get in <span className="text-accent-cyan">Touch</span>
          </h2>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left: Contact Info Info-boxes */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <h3 className="font-display text-xl font-bold text-text-main mb-4">
                Reach out for collaborations
              </h3>
              <p className="text-sm text-text-muted leading-relaxed font-light">
                I am actively seeking internship positions or part-time junior roles starting from mid-2026. If you have questions about my machine learning projects, or want to discuss full-stack integrations, drop a line!
              </p>
            </div>

            {/* List */}
            <div className="space-y-4">
              {contactDetails.map((det, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  {/* Icon Box */}
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-accent-cyan/5 border border-accent-cyan/15 text-lg select-none">
                    {det.emoji}
                  </div>
                  
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-text-muted">
                      {det.label}
                    </div>
                    {det.href.startsWith('#') ? (
                      <a 
                        href={det.href}
                        className="text-xs sm:text-sm text-text-main hover:text-accent-cyan transition-colors"
                      >
                        {det.val}
                      </a>
                    ) : (
                      <a 
                        href={det.href}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-xs sm:text-sm text-text-main hover:text-accent-cyan transition-colors"
                      >
                        {det.val}
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="lg:col-span-7 bg-bg-card border border-border-dark rounded-2xl p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Name */}
              <div>
                <label htmlFor="cf-name" className="text-[10px] font-bold uppercase tracking-wider text-text-muted block mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="cf-name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full bg-bg-primary border border-border-dark rounded-lg px-4 py-3 text-sm text-text-main placeholder-text-muted/50 focus:border-accent-cyan focus:outline-none transition-colors duration-200"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="cf-email" className="text-[10px] font-bold uppercase tracking-wider text-text-muted block mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="cf-email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="w-full bg-bg-primary border border-border-dark rounded-lg px-4 py-3 text-sm text-text-main placeholder-text-muted/50 focus:border-accent-cyan focus:outline-none transition-colors duration-200"
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="cf-msg" className="text-[10px] font-bold uppercase tracking-wider text-text-muted block mb-2">
                  Message
                </label>
                <textarea
                  id="cf-msg"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Hello Kokulan, I would like to discuss..."
                  className="w-full bg-bg-primary border border-border-dark rounded-lg px-4 py-3 text-sm text-text-main placeholder-text-muted/50 focus:border-accent-cyan focus:outline-none transition-colors duration-200 resize-y"
                />
              </div>

              {/* Error Box */}
              {error && (
                <div className="text-red-400 text-xs sm:text-sm font-semibold mt-2 animate-pulse">
                  ⚠ {error}
                </div>
              )}

              {/* Success Box */}
              {success && (
                <div className="text-emerald-400 text-xs sm:text-sm font-semibold mt-2 bg-emerald-400/5 border border-emerald-400/10 p-3 rounded-lg flex items-center gap-2">
                  ✓ Thanks! Your message was received successfully.
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-accent-cyan text-bg-primary font-display font-bold text-xs uppercase tracking-wider rounded-lg transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? 'Sending Message...' : 'Send Message →'}
              </button>

            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
