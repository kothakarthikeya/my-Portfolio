import React from 'react';
import { Mail, ArrowUp } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.content}>
          <div style={styles.brandInfo}>
            <h3 style={styles.name}>K. Karthikeya <span style={{color: 'var(--accent-purple)'}}>.</span></h3>
            <p style={styles.tagline}>Building the future with Artificial Intelligence and Premium Design.</p>
          </div>
          
          <div style={styles.links}>
            <h4 style={styles.title}>Quick Links</h4>
            <div style={styles.linkGroup}>
              <a href="#about" style={styles.link}>About</a>
              <a href="#projects" style={styles.link}>Projects</a>
              <a href="#experience" style={styles.link}>Experience</a>
              <a href="#contact" style={styles.link}>Contact</a>
            </div>
          </div>

          <div style={styles.social}>
            <h4 style={styles.title}>Social Profiles</h4>
            <div style={styles.socialGroup}>
              <a href="https://linkedin.com/in/karthikeya-r-gupta" target="_blank" rel="noreferrer" style={styles.socialIcon}>
                <FaLinkedin size={20} />
              </a>
              <a href="https://github.com/kothakarthikeya" target="_blank" rel="noreferrer" style={styles.socialIcon}>
                <FaGithub size={20} />
              </a>
              <a href="mailto:karthikeya.r.gupta@gmail.com" style={styles.socialIcon}>
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>

        <div style={styles.bottomBar}>
          <p style={styles.copyright}>&copy; {new Date().getFullYear()} Kotha Karthikeya Ramalingeswara Gupta. All rights reserved.</p>
          
          <button onClick={scrollToTop} style={styles.scrollBtn} aria-label="Scroll to top">
            <ArrowUp size={20} />
          </button>
        </div>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    padding: '80px 0 20px',
    borderTop: '1px solid rgba(255, 255, 255, 0.05)',
    background: 'linear-gradient(to top, rgba(17, 24, 39, 0.5), transparent)',
    position: 'relative',
    zIndex: 10,
  },
  container: {
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 5%',
  },
  content: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: '40px',
    marginBottom: '60px',
  },
  brandInfo: {
    flex: '1 1 300px',
  },
  name: {
    fontSize: '1.8rem',
    fontWeight: '700',
    color: 'var(--text-white)',
    marginBottom: '15px',
    fontFamily: 'Poppins, sans-serif',
  },
  tagline: {
    color: 'var(--text-gray)',
    lineHeight: '1.6',
    maxWidth: '300px',
  },
  links: {
    flex: '1 1 150px',
  },
  title: {
    fontSize: '1.1rem',
    color: 'var(--text-white)',
    fontWeight: '600',
    marginBottom: '20px',
  },
  linkGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  link: {
    color: 'var(--text-gray)',
    transition: 'color 0.3s ease',
    textDecoration: 'none',
    width: 'fit-content',
  },
  social: {
    flex: '1 1 200px',
  },
  socialGroup: {
    display: 'flex',
    gap: '15px',
  },
  socialIcon: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    background: 'rgba(255, 255, 255, 0.05)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'var(--text-gray)',
    transition: 'all 0.3s ease',
  },
  bottomBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '20px',
    borderTop: '1px solid rgba(255, 255, 255, 0.05)',
    flexWrap: 'wrap',
    gap: '20px',
  },
  copyright: {
    color: 'var(--text-gray)',
    fontSize: '0.9rem',
  },
  scrollBtn: {
    background: 'var(--glass-bg)',
    border: '1px solid var(--glass-border)',
    color: 'var(--text-white)',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  }
};

// Global hover styles
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.innerHTML = `
    footer .linkGroup a:hover { color: var(--accent-cyan); }
    footer .socialIcon:hover { background: var(--accent-purple); color: #fff; transform: translateY(-3px); }
    footer .scrollBtn:hover { background: var(--accent-cyan); color: #000; }
    .input:focus { border-color: var(--accent-cyan) !important; box-shadow: 0 0 10px rgba(6, 182, 212, 0.2); }
  `;
  document.head.appendChild(style);
}

export default Footer;
