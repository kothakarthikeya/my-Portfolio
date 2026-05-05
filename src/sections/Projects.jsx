import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Code } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

const projects = [
  {
    title: "Legal Contract Analyzer",
    description: "AI-powered contract analysis system using Hugging Face LLM APIs for clause classification, NER, and risk scoring.",
    features: ["Clause Classification", "Named Entity Recognition", "Risk Detection", "Contract Intelligence"],
    techStack: ["Python", "NLP", "Transformers", "Hugging Face"],
    github: "https://github.com/kothakarthikeya/legal-contract",
    live: "#",
    image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Sree Lasya Wellness World",
    description: "AI-built wellness website for health and wellness promotion featuring smart UI and content delivery.",
    features: ["Smart UI", "Wellness Content Delivery", "AI-based Design Workflow"],
    techStack: ["HTML", "CSS", "JavaScript", "AI Tools"],
    github: "#",
    live: "#",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80",
  }
];

const TiltCard = ({ project, index }) => {
  const controls = useAnimation();
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });
  
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [inView, controls]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setMousePosition({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: index * 0.2 } }
  };

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={controls}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        ...styles.cardWrapper,
        transform: `perspective(1000px) rotateX(${mousePosition.y * -0.05}deg) rotateY(${mousePosition.x * 0.05}deg)`
      }}
      className="glass-panel"
    >
      <div style={styles.imageContainer}>
        <img src={project.image} alt={project.title} style={styles.image} />
        <div style={styles.imageOverlay}>
          <a href={project.live} target="_blank" rel="noreferrer" style={styles.overlayIcon}>
            <ExternalLink size={24} />
          </a>
        </div>
      </div>
      
      <div style={styles.cardContent}>
        <h3 style={styles.title}>{project.title}</h3>
        <p style={styles.description}>{project.description}</p>
        
        <div style={styles.features}>
          {project.features.map((feature, i) => (
            <span key={i} style={styles.featureBadge}>✓ {feature}</span>
          ))}
        </div>

        <div style={styles.techStack}>
          {project.techStack.map((tech, i) => (
            <span key={i} style={styles.techBadge}>
              <Code size={12} style={{marginRight: '4px'}}/>
              {tech}
            </span>
          ))}
        </div>

        <div style={styles.cardFooter}>
          <a href={project.github} target="_blank" rel="noreferrer" style={styles.link}>
            <FaGithub size={18} /> Source Code
          </a>
          <a href={project.live} target="_blank" rel="noreferrer" style={styles.linkLive}>
            Live Preview <ExternalLink size={16} />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const controls = useAnimation();
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [inView, controls]);

  return (
    <section id="projects" ref={ref}>
      <div style={styles.container}>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          variants={{ visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
          style={styles.sectionTitle}
        >
          <span className="gradient-text">Featured Projects</span>
        </motion.h2>

        <div style={styles.grid}>
          {projects.map((project, index) => (
            <TiltCard key={index} project={project} index={index} />
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
  },
  sectionTitle: {
    fontSize: 'clamp(2rem, 4vw, 3rem)',
    marginBottom: '60px',
    textAlign: 'center',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: '40px',
  },
  cardWrapper: {
    overflow: 'hidden',
    transition: 'transform 0.1s ease-out',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  imageContainer: {
    width: '100%',
    height: '240px',
    position: 'relative',
    overflow: 'hidden',
    borderBottom: '1px solid rgba(255,255,255,0.05)',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.5s ease',
  },
  imageOverlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    background: 'rgba(10, 10, 10, 0.7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0,
    transition: 'opacity 0.3s ease',
  },
  overlayIcon: {
    background: 'var(--accent-cyan)',
    color: '#000',
    padding: '12px',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    transform: 'translateY(20px)',
    transition: 'all 0.3s ease',
  },
  cardContent: {
    padding: '30px',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: 'var(--text-white)',
    marginBottom: '15px',
  },
  description: {
    fontSize: '1rem',
    color: 'var(--text-gray)',
    lineHeight: '1.6',
    marginBottom: '20px',
  },
  features: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    marginBottom: '25px',
  },
  featureBadge: {
    fontSize: '0.8rem',
    color: 'var(--accent-purple)',
    background: 'rgba(124, 58, 237, 0.1)',
    padding: '4px 10px',
    borderRadius: '20px',
  },
  techStack: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    marginBottom: '30px',
    marginTop: 'auto',
  },
  techBadge: {
    fontSize: '0.8rem',
    color: 'var(--text-white)',
    background: 'rgba(255, 255, 255, 0.05)',
    padding: '6px 12px',
    borderRadius: '6px',
    display: 'flex',
    alignItems: 'center',
  },
  cardFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '20px',
    borderTop: '1px solid rgba(255, 255, 255, 0.05)',
  },
  link: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    color: 'var(--text-gray)',
    fontSize: '0.9rem',
    transition: 'color 0.3s',
  },
  linkLive: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    color: 'var(--accent-cyan)',
    fontSize: '0.9rem',
    fontWeight: '600',
    transition: 'color 0.3s',
  }
};

// Simple global CSS addition for hover effect on image overlay
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.innerHTML = `
    .glass-panel:hover .image-overlay { opacity: 1 !important; }
    .glass-panel:hover img { transform: scale(1.1); }
    .glass-panel:hover .overlay-icon { transform: translateY(0); }
  `;
  document.head.appendChild(style);
}

export default Projects;
