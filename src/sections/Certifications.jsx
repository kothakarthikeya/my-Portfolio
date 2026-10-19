import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Award, ShieldCheck, Server } from 'lucide-react';

const certifications = [
  {
    title: "SAP Certified",
    subtitle: "Back-End Developer - ABAP Cloud",
    date: "2025",
    organization: "SAP",
    icon: <Server size={46} color="var(--accent-cyan)" />
  },
  {
    title: "Oracle Cloud Infrastructure 2025 Certified",
    subtitle: "Generative AI Professional",
    date: "2025",
    organization: "Oracle",
    icon: <Award size={46} color="var(--accent-purple)" />
  },
  {
    title: "Salesforce Certified",
    subtitle: "Agentforce Specialist",
    date: "2025",
    organization: "Salesforce",
    icon: <ShieldCheck size={46} color="var(--accent-cyan)" />
  }
];

const Certifications = () => {
  const controls = useAnimation();
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [inView, controls]);

  const variants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } }
  };

  return (
    <section id="certifications" ref={ref}>
      <div style={styles.container}>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          variants={{ visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
          style={styles.sectionTitle}
        >
          <span className="gradient-text">Certifications</span>
        </motion.h2>

        <div style={styles.carouselContainer}>
          {certifications.map((cert, index) => (
            <motion.div 
              key={index}
              variants={variants}
              initial="hidden"
              animate={controls}
              className="glass-panel"
              style={styles.certCard}
              whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(124, 58, 237, 0.3)' }}
            >
              <div style={styles.badgeContainer}>
                <motion.div
                  animate={{ rotateY: 360 }}
                  transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                  style={styles.badgeGlow}
                >
                  {cert.icon}
                </motion.div>
              </div>
              <div style={styles.certContent}>
                <h3 style={styles.title}>{cert.title}</h3>
                <h4 style={styles.subtitle}>{cert.subtitle}</h4>
                <div style={styles.meta}>
                  <span style={styles.org}>{cert.organization}</span>
                  <span style={styles.date}>{cert.date}</span>
                </div>
              </div>
            </motion.div>
          ))}
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
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 'clamp(2rem, 4vw, 3rem)',
    marginBottom: '60px',
  },
  carouselContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '30px',
    justifyContent: 'center',
  },
  certCard: {
    padding: '40px 30px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
    height: '100%',
    cursor: 'pointer',
  },
  badgeContainer: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    background: 'rgba(255, 255, 255, 0.05)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginBottom: '20px',
  },
  badgeGlow: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  certContent: {
    textAlign: 'center',
  },
  title: {
    fontSize: '1.4rem',
    fontWeight: '700',
    color: 'var(--text-white)',
    marginBottom: '10px',
  },
  subtitle: {
    fontSize: '1.1rem',
    color: 'var(--accent-cyan)',
    marginBottom: '20px',
  },
  meta: {
    display: 'flex',
    justifyContent: 'center',
    gap: '15px',
    color: 'var(--text-gray)',
    fontSize: '0.9rem',
    fontWeight: '500',
  },
  org: {
    paddingRight: '15px',
    borderRight: '1px solid rgba(255, 255, 255, 0.2)',
  },
  date: {
  }
};

export default Certifications;
