import React, { useState, useEffect, useRef } from 'react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: "Hi there! 👋 I'm here to help you get to know Kokulan. Ask me anything about his projects, skills, or how you can reach him!"
    }
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [chipsVisible, setChipsVisible] = useState(true);
  
  const scrollRef = useRef(null);

  // Scroll to bottom whenever messages or typing state updates
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, typing]);

  const getBotReply = (msg) => {
    const text = msg.toLowerCase();

    if (text.includes('project') || text.includes('work') || text.includes('built') || text.includes('skin') || text.includes('medi')) {
      return "Kokulan's favorite project is his skin disease classifier. It uses deep learning (an EfficientNet-B0 base) to recognize seven kinds of skin conditions with high accuracy, and it's hosted live on Hugging Face! He also built 'Medi Connect,' which helps doctors manage clinical data and run scans. You can read more about them in the 'Works' section of the page.";
    }
    
    if (text.includes('ml') || text.includes('machine') || text.includes('tensorflow') || text.includes('model') || text.includes('deep')) {
      return "He works mostly with Python, TensorFlow, Keras, and data libraries like Pandas and NumPy. He enjoys building neural networks, training models, and looking at validation curves to see how to make models perform better.";
    }

    if (text.includes('intern') || text.includes('available') || text.includes('hire') || text.includes('job') || text.includes('opportunit')) {
      return "Yes, he is! Kokulan is looking for a Data Science or ML internship starting around mid-2026. He'd love to join a team where he can learn and grow. You can email him at kokulankugathasan2003@gmail.com or call/text him at +94 76 752 0033.";
    }

    if (text.includes('contact') || text.includes('email') || text.includes('phone') || text.includes('reach') || text.includes('linkedin')) {
      return "Feel free to reach out to Kokulan directly:\n\n📧 Email: kokulankugathasan2003@gmail.com\n📞 Phone: +94 76 752 0033\n💼 LinkedIn: linkedin.com/in/kokulan-kugathasan\n🐙 GitHub: github.com/kokulanK";
    }

    if (text.includes('skill') || text.includes('tech') || text.includes('stack') || text.includes('python') || text.includes('language')) {
      return "Here is what Kokulan builds with:\n\n• Languages: Python, Java, C++, TypeScript\n• Data & AI: TensorFlow, Keras, OpenCV, Pandas, NumPy, Scikit-learn\n• Web Apps: React, Angular, Node.js, Express, Flask, Spring Boot\n• Tools & DBs: Docker, Git, MongoDB, MySQL, PostgreSQL";
    }

    if (text.includes('edu') || text.includes('sliit') || text.includes('study') || text.includes('degree') || text.includes('university') || text.includes('course')) {
      return "Kokulan is studying for his BSc (Hons) in IT, specializing in Data Science, at the Sri Lanka Institute of Information Technology (SLIIT). He started in March 2024 and has also completed several certifications in AI and ML pathways.";
    }

    if (text.includes('auc') || text.includes('accuracy') || text.includes('metric') || text.includes('result') || text.includes('performance')) {
      return "His skin lesion classifier achieves a macro-AUC of 0.982 and about 88% overall accuracy on validation datasets. He used an EfficientNet-B0 base and fine-tuned it over two training phases.";
    }

    return "I'm here to chat about Kokulan's work! Ask me about his projects, skills, SLIIT studies, or internship availability. 😊";
  };

  const handleSendMessage = (textToSend) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { sender: 'user', text: query }]);
    setInput('');
    setTyping(true);

    // Simulate bot response delay
    setTimeout(() => {
      const reply = getBotReply(query);
      setMessages(prev => [...prev, { sender: 'bot', text: reply }]);
      setTyping(false);
    }, 700);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      
      {/* Chat Window */}
      {isOpen && (
        <div className="w-[320px] sm:w-[340px] h-[440px] bg-bg-card border border-border-dark rounded-2xl overflow-hidden flex flex-col shadow-2xl mb-4 animate-fade-in">
          
          {/* Header */}
          <div className="p-4 border-b border-border-dark flex items-center justify-between bg-bg-section/80">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center select-none">
                <span className="font-display text-sm font-bold text-accent-cyan">KK</span>
              </div>
              <div>
                <h4 className="text-xs font-semibold text-text-main">Kokulan's Assistant</h4>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 pulse-dot-anim"></span>
                  <span className="text-[10px] text-emerald-400 font-medium tracking-wider">Online</span>
                </div>
              </div>
            </div>
            
            {/* Close Button */}
            <button 
              onClick={() => setIsOpen(false)}
              className="text-text-muted hover:text-text-main p-1 focus:outline-none"
              aria-label="Close Chat"
            >
              <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                className={`flex w-full ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[85%] text-xs px-3.5 py-2.5 leading-relaxed border whitespace-pre-wrap ${
                    msg.sender === 'user' 
                      ? 'bg-accent-cyan/10 border-accent-cyan/20 text-text-main rounded-2xl rounded-tr-sm' 
                      : 'bg-bg-surface border-border-dark text-text-main rounded-2xl rounded-tl-sm'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {typing && (
              <div className="flex justify-start">
                <div className="flex gap-1 items-center justify-center px-4 py-3 bg-bg-surface border border-border-dark rounded-2xl rounded-tl-sm w-16">
                  <span className="animate-typing-dot" style={{ animationDelay: '0s' }}></span>
                  <span className="animate-typing-dot" style={{ animationDelay: '0.2s' }}></span>
                  <span className="animate-typing-dot" style={{ animationDelay: '0.4s' }}></span>
                </div>
              </div>
            )}
            
            {/* Scroll Anchor */}
            <div ref={scrollRef} />
          </div>

          {/* Quick chips (Suggesion chips) */}
          {chipsVisible && (
            <div className="px-4 pb-2 flex flex-wrap gap-2">
              <button 
                onClick={() => handleSendMessage('Top projects')}
                className="text-[10px] text-text-muted bg-bg-surface border border-border-dark px-3 py-1.5 rounded-full hover:border-accent-cyan hover:text-accent-cyan transition-colors"
              >
                Top projects
              </button>
              <button 
                onClick={() => handleSendMessage('ML skills')}
                className="text-[10px] text-text-muted bg-bg-surface border border-border-dark px-3 py-1.5 rounded-full hover:border-accent-cyan hover:text-accent-cyan transition-colors"
              >
                ML skills
              </button>
              <button 
                onClick={() => handleSendMessage('Internship?')}
                className="text-[10px] text-text-muted bg-bg-surface border border-border-dark px-3 py-1.5 rounded-full hover:border-accent-cyan hover:text-accent-cyan transition-colors"
              >
                Internship?
              </button>
            </div>
          )}

          {/* Form input */}
          <div className="p-3 border-t border-border-dark flex gap-2 items-center bg-bg-section/80">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask me something..."
              className="flex-1 bg-bg-surface border border-border-dark rounded-lg px-3 py-2 text-xs text-text-main focus:border-accent-cyan focus:outline-none placeholder-text-muted/40"
            />
            <button
              onClick={() => handleSendMessage()}
              className="h-8 w-8 bg-accent-cyan rounded-lg flex items-center justify-center text-bg-primary hover:bg-cyan-400 active:scale-95 transition-transform"
            >
              →
            </button>
          </div>

        </div>
      )}

      {/* FAB Circle Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="h-13 w-13 rounded-full bg-accent-cyan text-bg-primary flex items-center justify-center hover:scale-105 active:scale-95 transition-transform duration-200 cursor-pointer shadow-[0_4px_24px_rgba(0,212,255,0.3)] focus:outline-none"
        style={{ width: '52px', height: '52px' }}
        aria-label="Chatbot Assistant"
      >
        {isOpen ? (
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <span className="text-xl">💬</span>
        )}
      </button>

    </div>
  );
};

export default Chatbot;
