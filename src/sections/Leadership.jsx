import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { UserPlus, Calendar, Presentation, Compass, HeartHandshake } from 'lucide-react';

const initiatives = [
  { title: "Lecturer & Mentor", icon: <UserPlus size={28} /> },
  { title: "Event Coordinator", icon: <Calendar size={28} /> },
  { title: "Workshop Facilitator", icon: <Presentation size={28} /> },
  { title: "Career Guidance Counselor", icon: <Compass size={28} /> },
  { title: "Social Outreach Volunteer", icon: <HeartHandshake size={28} /> }
];

const Leadership = () => {
  const controls = useAnimation();
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [inView, controls]);

  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 100 } }
  };

  return (
    <section id="leadership" ref={ref}>
      <div style={styles.container}>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          variants={{ visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
          style={styles.sectionTitle}
        >
          <span className="gradient-text">Leadership & Initiatives</span>
        </motion.h2>

        <motion.div 
          variants={variants}
          initial="hidden"
          animate={controls}
          style={styles.grid}
        >
          {initiatives.map((item, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className="glass-panel"
              style={styles.card}
              whileHover={{ y: -10, borderColor: 'var(--accent-purple)' }}
            >
              <div style={styles.iconWrapper}>
                {item.icon}
              </div>
              <h3 style={styles.title}>{item.title}</h3>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const styles = {
  container: {
    width: '100%',
    maxWidth: '1000px',
    margin: '0 auto',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 'clamp(2rem, 4vw, 3rem)',
    marginBottom: '60px',
  },
  grid: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '20px',
  },
  card: {
    padding: '30px 20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '180px',
    cursor: 'default',
    transition: 'all 0.3s ease',
  },
  iconWrapper: {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    background: 'rgba(6, 182, 212, 0.1)',
    color: 'var(--accent-cyan)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '15px',
    boxShadow: '0 0 20px rgba(6, 182, 212, 0.2)',
  },
  title: {
    fontSize: '1rem',
    fontWeight: '600',
    color: 'var(--text-white)',
    lineHeight: '1.4',
  }
};

export default Leadership;
