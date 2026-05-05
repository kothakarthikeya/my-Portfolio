import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { BookOpen, Award, Briefcase, Users } from 'lucide-react';

const AnimatedCounter = ({ end, duration = 2, suffix = "+" }) => {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true });

  useEffect(() => {
    if (inView) {
      let startTime = null;
      const animateCount = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
        setCount(Math.floor(progress * end));
        if (progress < 1) {
          requestAnimationFrame(animateCount);
        }
      };
      requestAnimationFrame(animateCount);
    }
  }, [inView, end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const About = () => {
  const controls = useAnimation();
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [inView, controls]);

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, staggerChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="about" ref={ref}>
      <motion.div 
        variants={variants}
        initial="hidden"
        animate={controls}
        style={styles.container}
      >
        <motion.h2 variants={itemVariants} style={styles.title}>
          <span className="gradient-text">About Me</span>
        </motion.h2>

        <div style={styles.contentWrapper}>
          <motion.div variants={itemVariants} style={styles.textContent}>
            <p style={styles.paragraph}>
              B.Tech student in Artificial Intelligence & Machine Learning at Sri Vasavi Engineering College (2023–2027), passionate about AI development, machine learning, prompt engineering, and frontend technologies.
            </p>
            <p style={styles.paragraph}>
              <strong>Career Goal:</strong> To become a top AI Engineer and build impactful intelligent products.
            </p>

            <div className="glass-panel" style={styles.educationCard}>
              <div style={styles.edIcon}>
                <BookOpen size={24} color="var(--accent-purple)" />
              </div>
              <div style={styles.edInfo}>
                <h3 style={styles.edTitle}>Sri Vasavi Engineering College</h3>
                <p style={styles.edSubtitle}>B.Tech – Artificial Intelligence & Machine Learning</p>
                <p style={styles.edGpa}>CGPA: <span style={{color: 'var(--accent-cyan)'}}>7.19</span></p>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} style={styles.statsGrid}>
            <div className="glass-panel" style={styles.statCard}>
              <Briefcase size={32} color="var(--accent-cyan)" style={styles.statIcon} />
              <h3 style={styles.statNumber}><AnimatedCounter end={2} /></h3>
              <p style={styles.statLabel}>Projects</p>
            </div>
            
            <div className="glass-panel" style={styles.statCard}>
              <Award size={32} color="var(--accent-purple)" style={styles.statIcon} />
              <h3 style={styles.statNumber}><AnimatedCounter end={2} /></h3>
              <p style={styles.statLabel}>Professional Experiences</p>
            </div>
            
            <div className="glass-panel" style={styles.statCard}>
              <BookOpen size={32} color="var(--accent-cyan)" style={styles.statIcon} />
              <h3 style={styles.statNumber}><AnimatedCounter end={1} /></h3>
              <p style={styles.statLabel}>Certifications</p>
            </div>
            
            <div className="glass-panel" style={styles.statCard}>
              <Users size={32} color="var(--accent-purple)" style={styles.statIcon} />
              <h3 style={styles.statNumber}><AnimatedCounter end={5} /></h3>
              <p style={styles.statLabel}>Events Coordinated</p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

const styles = {
  container: {
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  title: {
    fontSize: 'clamp(2rem, 4vw, 3rem)',
    marginBottom: '40px',
    textAlign: 'center',
  },
  contentWrapper: {
    display: 'flex',
    gap: '40px',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  textContent: {
    flex: '1 1 500px',
  },
  paragraph: {
    color: 'var(--text-gray)',
    fontSize: '1.1rem',
    lineHeight: '1.8',
    marginBottom: '20px',
  },
  educationCard: {
    display: 'flex',
    gap: '20px',
    padding: '24px',
    marginTop: '30px',
    alignItems: 'center',
  },
  edIcon: {
    background: 'rgba(124, 58, 237, 0.1)',
    padding: '16px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  edInfo: {
    flex: 1,
  },
  edTitle: {
    fontSize: '1.2rem',
    fontWeight: '600',
    marginBottom: '5px',
    color: 'var(--text-white)',
  },
  edSubtitle: {
    fontSize: '0.95rem',
    color: 'var(--text-gray)',
    marginBottom: '8px',
  },
  edGpa: {
    fontSize: '1rem',
    fontWeight: '500',
  },
  statsGrid: {
    flex: '1 1 400px',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
  },
  statCard: {
    padding: '30px',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'transform 0.3s ease, border-color 0.3s ease',
    cursor: 'default',
  },
  statIcon: {
    marginBottom: '15px',
  },
  statNumber: {
    fontSize: '2.5rem',
    fontWeight: '700',
    color: 'var(--text-white)',
    marginBottom: '10px',
  },
  statLabel: {
    color: 'var(--text-gray)',
    fontSize: '0.9rem',
    fontWeight: '500',
  }
};

export default About;
