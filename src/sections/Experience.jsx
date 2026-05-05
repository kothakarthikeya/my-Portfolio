import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Briefcase, Heart, Award, Mic } from 'lucide-react';

const experiences = [
  {
    title: "Infosys Springboard Virtual Internship",
    date: "Nov 2025 – Feb 2026",
    role: "Intern",
    icon: <Briefcase size={20} />,
    description: [
      "Developed Legal Contract Analyzer",
      "Applied NLP and LLM concepts",
      "Built AI-powered contract analysis workflows",
      "Improved model accuracy by 70%"
    ]
  },
  {
    title: "Nexus Swarm Campus Ambassador",
    date: "Feb 2024 – March 2025",
    role: "Campus Ambassador",
    icon: <Mic size={20} />,
    description: [
      "Led campus campaigns",
      "Engaged 200+ students",
      "Organized workshops and technical events",
      "Increased participation by 20%"
    ]
  },
  ,
  {
    title: "AICTE Campus Ambassador",
    date: "Active",
    role: "Leadership Initiative",
    icon: <Award size={20} />,
    description: [
      "Representing the institution in AICTE programs",
      "Leading initiatives to connect students with national technical programs"
    ]
  },
  {
    title: "Wellness Coach",
    date: "Ongoing",
    role: "Entrepreneur & Mentor",
    icon: <Heart size={20} />,
    description: [
      "Running  Lasya Sree Wellness World",
      "Providing mentorship on health, wellness, and work-life balance"
    ]
  }
];

const TimelineItem = ({ exp, index }) => {
  const controls = useAnimation();
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [inView, controls]);

  const isLeft = index % 2 === 0;

  const variants = {
    hidden: { opacity: 0, x: isLeft ? -50 : 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, type: "spring", stiffness: 80 } }
  };

  return (
    <div style={styles.timelineItemContainer} ref={ref}>
      <div style={{ ...styles.timelineContent, ...(isLeft ? styles.contentLeft : styles.contentRight) }}>
        <motion.div
          variants={variants}
          initial="hidden"
          animate={controls}
          className="glass-panel"
          style={styles.card}
          whileHover={{ y: -5, boxShadow: '0 10px 40px rgba(124, 58, 237, 0.2)' }}
        >
          <div style={styles.cardHeader}>
            <h3 style={styles.title}>{exp.title}</h3>
            <span style={styles.date}>{exp.date}</span>
          </div>
          <h4 style={styles.role}>{exp.role}</h4>
          <ul style={styles.list}>
            {exp.description.map((item, i) => (
              <li key={i} style={styles.listItem}>{item}</li>
            ))}
          </ul>
        </motion.div>
      </div>

      <div style={styles.timelineCenter}>
        <motion.div
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : { scale: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          style={styles.iconContainer}
        >
          {exp.icon}
        </motion.div>
      </div>
    </div>
  );
};

const Experience = () => {
  const controls = useAnimation();
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [inView, controls]);

  return (
    <section id="experience" ref={ref}>
      <div style={styles.container}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          variants={{ visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
          style={styles.sectionTitle}
        >
          <span className="gradient-text">Experience Journey</span>
        </motion.h2>

        <div style={styles.timeline}>
          {/* Vertical line */}
          <div style={styles.timelineLine}></div>

          {experiences.map((exp, index) => (
            <TimelineItem key={index} exp={exp} index={index} />
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
    position: 'relative',
  },
  sectionTitle: {
    fontSize: 'clamp(2rem, 4vw, 3rem)',
    marginBottom: '60px',
    textAlign: 'center',
  },
  timeline: {
    position: 'relative',
    padding: '20px 0',
  },
  timelineLine: {
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '4px',
    height: '100%',
    background: 'linear-gradient(to bottom, transparent, var(--accent-purple), var(--accent-cyan), transparent)',
    borderRadius: '2px',
  },
  timelineItemContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: '40px',
    position: 'relative',
  },
  timelineContent: {
    width: '45%',
  },
  contentLeft: {
    paddingRight: '30px',
  },
  contentRight: {
    paddingLeft: '30px',
    marginLeft: 'auto',
  },
  timelineCenter: {
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  iconContainer: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    background: 'var(--bg-black)',
    border: '2px solid var(--accent-purple)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'var(--accent-cyan)',
    boxShadow: '0 0 15px rgba(124, 58, 237, 0.5)',
  },
  card: {
    padding: '25px',
    borderTop: '2px solid transparent',
    transition: 'all 0.3s ease',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '5px',
    flexWrap: 'wrap',
    gap: '10px',
  },
  title: {
    fontSize: '1.25rem',
    fontWeight: '600',
    color: 'var(--text-white)',
    margin: 0,
  },
  date: {
    fontSize: '0.85rem',
    color: 'var(--accent-cyan)',
    fontWeight: '500',
    backgroundColor: 'rgba(6, 182, 212, 0.1)',
    padding: '4px 10px',
    borderRadius: '12px',
    whiteSpace: 'nowrap',
  },
  role: {
    fontSize: '1rem',
    color: 'var(--text-gray)',
    fontWeight: '500',
    marginBottom: '15px',
    marginTop: '5px',
  },
  list: {
    margin: 0,
    paddingLeft: '20px',
    color: 'var(--text-gray)',
    fontSize: '0.95rem',
    lineHeight: '1.6',
  },
  listItem: {
    marginBottom: '8px',
  }
};

// Media query logic needs to be handled via CSS or window size check for purely responsive React inline styles.
// For simplicity, we can rely on standard CSS for basic responsive layout of the timeline if needed, 
// but flex-wrap and percentages give a good initial layout.

export default Experience;
