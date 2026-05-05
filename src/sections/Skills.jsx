import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const skillCategories = [
  {
    title: "Programming",
    skills: [
      { name: "Python", level: 90 },
      { name: "Java", level: 80 },
      { name: "C", level: 75 },
      { name: "JavaScript", level: 85 }
    ]
  },
  {
    title: "AI & ML",
    skills: [
      { name: "Machine Learning", level: 88 },
      { name: "NLP", level: 85 },
      { name: "Transformer Models", level: 80 },
      { name: "Prompt Engineering", level: 95 },
      { name: "Model Training", level: 85 },
      { name: "Model Evaluation", level: 82 }
    ]
  },
  {
    title: "Frontend & Tools",
    skills: [
      { name: "HTML/CSS", level: 90 },
      { name: "React/Vite", level: 85 },
      { name: "Git/GitHub", level: 88 },
      { name: "Canva & MS Office", level: 95 }
    ]
  },
  {
    title: "Soft Skills",
    skills: [
      { name: "Leadership", level: 95 },
      { name: "Communication", level: 90 },
      { name: "Problem Solving", level: 88 },
      { name: "Team Collaboration", level: 92 }
    ]
  }
];

const ProgressBar = ({ name, level }) => {
  const controls = useAnimation();
  const { ref, inView } = useInView({ triggerOnce: true });

  useEffect(() => {
    if (inView) {
      controls.start({ width: `${level}%`, transition: { duration: 1.5, ease: "easeOut" } });
    }
  }, [inView, controls, level]);

  return (
    <div style={styles.skillItem} ref={ref}>
      <div style={styles.skillHeader}>
        <span style={styles.skillName}>{name}</span>
        <span style={styles.skillLevel}>{level}%</span>
      </div>
      <div style={styles.progressBg}>
        <motion.div 
          initial={{ width: 0 }}
          animate={controls}
          style={styles.progressBar}
          className="progress-glow"
        />
      </div>
    </div>
  );
};

const Skills = () => {
  const controls = useAnimation();
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

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
    <section id="skills" ref={ref}>
      <motion.div 
        variants={variants}
        initial="hidden"
        animate={controls}
        style={styles.container}
      >
        <motion.h2 variants={itemVariants} style={styles.title}>
          <span className="gradient-text">Skills Matrix</span>
        </motion.h2>

        <div style={styles.grid}>
          {skillCategories.map((category, idx) => (
            <motion.div 
              key={idx} 
              variants={itemVariants} 
              className="glass-panel" 
              style={styles.categoryCard}
              whileHover={{ y: -5, borderColor: 'rgba(124, 58, 237, 0.4)' }}
            >
              <h3 style={styles.categoryTitle}>{category.title}</h3>
              <div style={styles.skillsList}>
                {category.skills.map((skill, i) => (
                  <ProgressBar key={i} name={skill.name} level={skill.level} />
                ))}
              </div>
            </motion.div>
          ))}
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
    marginBottom: '50px',
    textAlign: 'center',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '30px',
  },
  categoryCard: {
    padding: '30px',
    transition: 'all 0.3s ease',
  },
  categoryTitle: {
    fontSize: '1.4rem',
    fontWeight: '600',
    marginBottom: '25px',
    color: 'var(--accent-cyan)',
    borderBottom: '1px solid rgba(255,255,255,0.1)',
    paddingBottom: '10px',
  },
  skillsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  skillItem: {
    width: '100%',
  },
  skillHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '8px',
  },
  skillName: {
    fontSize: '0.95rem',
    fontWeight: '500',
    color: 'var(--text-white)',
  },
  skillLevel: {
    fontSize: '0.85rem',
    color: 'var(--text-gray)',
  },
  progressBg: {
    width: '100%',
    height: '6px',
    background: 'rgba(255,255,255,0.05)',
    borderRadius: '4px',
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    background: 'var(--gradient-primary)',
    borderRadius: '4px',
    boxShadow: '0 0 10px rgba(124, 58, 237, 0.5)',
  }
};

export default Skills;
