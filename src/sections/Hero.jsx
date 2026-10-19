import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, ChevronRight, Mail } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const ROLES = [
  "AIML Student",
  "SAP Back-End Developer",
  "Machine Learning Engineer",
  "AI Developer",
  "Frontend Developer",
  "Prompt Engineer",
  "Campus Ambassador"
];

const Hero = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    const handleTyping = () => {
      const currentRole = ROLES[roleIndex];
      
      if (isDeleting) {
        setText(currentRole.substring(0, text.length - 1));
        setTypingSpeed(50);
      } else {
        setText(currentRole.substring(0, text.length + 1));
        setTypingSpeed(100);
      }

      if (!isDeleting && text === currentRole) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % ROLES.length);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, roleIndex, typingSpeed]);

  return (
    <section id="hero" style={styles.section}>
      <div style={styles.container}>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={styles.content}
        >
          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            style={styles.greeting}
          >
            Hello, I'm
          </motion.h2>
          
          <motion.h1 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="gradient-text"
            style={styles.name}
          >
            Kotha Karthikeya<br/>Ramalingeswara Gupta
          </motion.h1>

          <div style={styles.typewriterContainer}>
            <span style={styles.roleText}>{text}</span>
            <motion.span 
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              style={styles.cursor}
            >
              |
            </motion.span>
          </div>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            style={styles.description}
          >
            Results-driven AI & ML enthusiast with expertise in Machine Learning, Prompt Engineering, Frontend Development, and scalable AI applications. Passionate about building intelligent systems and solving real-world problems.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            style={styles.buttonGroup}
          >
            <a href="#projects">
                <button className="glow-button" style={styles.btnPrimary}>
                View Projects <ChevronRight size={18} />
                </button>
            </a>
            <a href="#resume">
                <button className="glass-panel" style={styles.btnSecondary}>
                <Download size={18} /> Resume
                </button>
            </a>
            <a href="#contact">
                <button className="glass-panel" style={styles.btnSecondary}>
                <Mail size={18} /> Contact
                </button>
            </a>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            style={styles.socialGroup}
          >
            <a href="https://linkedin.com/in/karthikeya-r-gupta" target="_blank" rel="noreferrer" style={styles.socialIcon}>
              <FaLinkedin size={24} />
            </a>
            <a href="https://github.com/kothakarthikeya" target="_blank" rel="noreferrer" style={styles.socialIcon}>
              <FaGithub size={24} />
            </a>
            <a href="mailto:karthikeya.r.gupta@gmail.com" style={styles.socialIcon}>
              <Mail size={24} />
            </a>
          </motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
          style={styles.imageContainer}
        >
          <div style={styles.imageGlow}></div>
          <img src="/profile.jpg" alt="Profile" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover', position: 'relative', zIndex: 2 }} />
          
          {/* Floating Elements */}
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            style={{...styles.floatingIcon, top: '10%', left: '-10%'}}
            className="glass-panel"
          >
            🤖 AI/ML
          </motion.div>
          <motion.div
            animate={{ y: [0, 20, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
            style={{...styles.floatingIcon, bottom: '20%', right: '-15%'}}
            className="glass-panel"
          >
            💻 React
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const styles = {
  section: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    paddingTop: '0',
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    flexWrap: 'wrap-reverse',
    gap: '40px',
  },
  content: {
    flex: '1 1 500px',
  },
  greeting: {
    color: 'var(--accent-cyan)',
    fontSize: '1.2rem',
    fontWeight: '500',
    marginBottom: '10px',
    letterSpacing: '2px',
  },
  name: {
    fontSize: 'clamp(2.5rem, 5vw, 4rem)',
    fontWeight: '800',
    lineHeight: '1.2',
    marginBottom: '15px',
  },
  typewriterContainer: {
    fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)',
    fontWeight: '600',
    color: 'var(--text-white)',
    marginBottom: '20px',
    height: '40px',
  },
  roleText: {
    color: 'var(--text-white)',
  },
  cursor: {
    color: 'var(--accent-purple)',
    fontWeight: 'bold',
  },
  description: {
    color: 'var(--text-gray)',
    fontSize: '1.1rem',
    lineHeight: '1.6',
    marginBottom: '30px',
    maxWidth: '600px',
  },
  buttonGroup: {
    display: 'flex',
    gap: '15px',
    flexWrap: 'wrap',
    marginBottom: '40px',
  },
  btnPrimary: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '1rem',
  },
  btnSecondary: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 24px',
    color: 'var(--text-white)',
    fontSize: '1rem',
    fontWeight: '500',
    border: '1px solid var(--glass-border)',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
  },
  socialGroup: {
    display: 'flex',
    gap: '20px',
  },
  socialIcon: {
    color: 'var(--text-gray)',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '45px',
    height: '45px',
    borderRadius: '50%',
    background: 'rgba(255,255,255,0.05)',
  },
  imageContainer: {
    flex: '1 1 400px',
    position: 'relative',
    maxWidth: '500px',
    aspectRatio: '1/1',
    margin: '0 auto',
  },
  imageGlow: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    height: '100%',
    background: 'var(--gradient-primary)',
    borderRadius: '50%',
    filter: 'blur(60px)',
    opacity: '0.4',
    zIndex: '1',
  },
  floatingIcon: {
    position: 'absolute',
    padding: '10px 20px',
    fontWeight: '600',
    fontSize: '0.9rem',
    zIndex: '3',
    color: 'var(--text-white)',
  }
};

export default Hero;
