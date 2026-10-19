import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FileText, Download } from 'lucide-react';

const Resume = () => {
  const controls = useAnimation();
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [inView, controls]);

  return (
    <section id="resume" ref={ref} style={styles.section}>
      <div style={styles.container}>
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={controls}
          variants={{ visible: { opacity: 1, y: 0, transition: { duration: 0.8 } } }}
          className="glass-panel"
          style={styles.card}
        >
          <div style={styles.iconWrapper}>
            <motion.div
              animate={{ y: [-5, 5, -5] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            >
              <FileText size={60} color="var(--accent-purple)" />
            </motion.div>
          </div>
          
          <h2 style={styles.title}>My Resume</h2>
          <p style={styles.subtitle}>Get a detailed overview of my experience, skills, and education.</p>
          
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <a href="/Karthikeya_Resume.pdf" download="Karthikeya_Resume.pdf" style={styles.downloadWrapper}>
              <button className="glow-button" style={styles.btn}>
                <Download size={20} /> Download Resume
              </button>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const styles = {
  section: {
    minHeight: '60vh',
  },
  container: {
    width: '100%',
    maxWidth: '800px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    padding: '60px 40px',
    textAlign: 'center',
    width: '100%',
    position: 'relative',
    overflow: 'hidden',
  },
  iconWrapper: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: '700',
    color: 'var(--text-white)',
    marginBottom: '15px',
  },
  subtitle: {
    fontSize: '1.1rem',
    color: 'var(--text-gray)',
    marginBottom: '40px',
  },
  downloadWrapper: {
    display: 'inline-block',
  },
  btn: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '1.1rem',
    padding: '15px 35px',
  }
};

export default Resume;
