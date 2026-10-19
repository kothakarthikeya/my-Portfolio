import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, MapPin, Send, Phone } from 'lucide-react';

const Contact = () => {
  const controls = useAnimation();
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [inView, controls]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch("https://formsubmit.co/ajax/karthikeya.r.gupta@gmail.com", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            message: formData.message,
            _subject: "New Message from Portfolio Website!"
        })
      });
      
      if (response.ok) {
        setFormData({ name: '', email: '', message: '' });
        alert("Message sent successfully!");
      } else {
        alert("Oops! Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("Oops! Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section id="contact" ref={ref}>
      <div style={styles.container}>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          variants={{ visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
          style={styles.sectionTitle}
        >
          <span className="gradient-text">Get In Touch</span>
        </motion.h2>

        <div style={styles.content}>
          <motion.div 
            variants={variants}
            initial="hidden"
            animate={controls}
            style={styles.infoSection}
          >
            <h3 style={styles.infoTitle}>Let's Connect</h3>
            <p style={styles.infoText}>
              I'm always open to discussing product design work or partnership opportunities. Feel free to reach out!
            </p>
            
            <div style={styles.contactDetails}>
              <div style={styles.contactItem}>
                <div style={styles.iconBox}>
                  <Mail size={24} color="var(--accent-cyan)" />
                </div>
                <div>
                  <h4 style={styles.itemTitle}>Email</h4>
                  <a href="mailto:karthikeya.r.gupta@gmail.com" style={styles.itemText}>karthikeya.r.gupta@gmail.com</a>
                </div>
              </div>

              <div style={styles.contactItem}>
                <div style={styles.iconBox}>
                  <MapPin size={24} color="var(--accent-purple)" />
                </div>
                <div>
                  <h4 style={styles.itemTitle}>Location</h4>
                  <p style={styles.itemText}>Palakollu, Andhra Pradesh</p>
                </div>
              </div>

              <div style={styles.contactItem}>
                <div style={styles.iconBox}>
                  <Phone size={24} color="var(--accent-cyan)" />
                </div>
                <div>
                  <h4 style={styles.itemTitle}>Phone</h4>
                  <a href="tel:9949423637" style={styles.itemText}>+91 99494 23637</a>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            variants={variants}
            initial="hidden"
            animate={controls}
            className="glass-panel"
            style={styles.formSection}
          >
            <form onSubmit={handleSubmit} style={styles.form}>
              <div style={styles.inputGroup}>
                <label style={styles.label} htmlFor="name">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  required 
                  style={styles.input}
                  placeholder="John Doe"
                />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label} htmlFor="email">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  required 
                  style={styles.input}
                  placeholder="john@example.com"
                />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label} htmlFor="message">Message</label>
                <textarea 
                  id="message" 
                  name="message" 
                  value={formData.message} 
                  onChange={handleChange} 
                  required 
                  rows="5"
                  style={{...styles.input, resize: 'none'}}
                  placeholder="How can I help you?"
                ></textarea>
              </div>
              <button 
                type="submit" 
                className="glow-button" 
                style={{...styles.submitBtn, opacity: isSubmitting ? 0.7 : 1}}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : <><Send size={18} /> Send Message </>}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const styles = {
  container: {
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  sectionTitle: {
    fontSize: 'clamp(2rem, 4vw, 3rem)',
    marginBottom: '60px',
    textAlign: 'center',
  },
  content: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '50px',
  },
  infoSection: {
    flex: '1 1 400px',
  },
  infoTitle: {
    fontSize: '2rem',
    fontWeight: '700',
    color: 'var(--text-white)',
    marginBottom: '15px',
  },
  infoText: {
    fontSize: '1.1rem',
    color: 'var(--text-gray)',
    lineHeight: '1.6',
    marginBottom: '40px',
  },
  contactDetails: {
    display: 'flex',
    flexDirection: 'column',
    gap: '30px',
  },
  contactItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },
  iconBox: {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    background: 'rgba(255, 255, 255, 0.05)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemTitle: {
    fontSize: '0.9rem',
    color: 'var(--text-gray)',
    fontWeight: '500',
    marginBottom: '5px',
  },
  itemText: {
    fontSize: '1.1rem',
    color: 'var(--text-white)',
    fontWeight: '600',
  },
  formSection: {
    flex: '1 1 500px',
    padding: '40px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  label: {
    fontSize: '0.9rem',
    color: 'var(--text-gray)',
    fontWeight: '500',
  },
  input: {
    width: '100%',
    padding: '15px',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '8px',
    color: 'var(--text-white)',
    fontSize: '1rem',
    outline: 'none',
    fontFamily: 'inherit',
    transition: 'border-color 0.3s ease',
  },
  submitBtn: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
    marginTop: '10px',
    width: '100%',
    padding: '16px',
    fontSize: '1.1rem',
  }
};

export default Contact;
