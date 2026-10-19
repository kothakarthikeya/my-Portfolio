import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Code } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

const projects = [
  {
    title: "Sahaay — AI Citizen Service Agent",
    description: "Full-stack AI citizen service agent simplifying public services with intent parsing, automated eligibility verification, document readiness checking, and structured grievance resolution.",
    features: ["Natural Language Intent", "Scheme Matching", "Document Readiness Checker", "Grievance Resolution"],
    techStack: ["Python", "FastAPI", "React", "Docker", "Vercel"],
    github: "https://github.com/kothakarthikeya/AI-Citizen-Service-Agent",
    live: "https://frontend-theta-jade-40.vercel.app",
    image: "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "RecoverAI — Revenue Recovery Agent",
    description: "Autonomous, policy-guarded revenue recovery agent built for Razorpay Buildathon. Diagnoses payment failures & abandonments, enforcing bounded recovery workflows with full auditability.",
    features: ["Payment Failure Diagnosis", "Bounded Recovery Workflows", "Strict Policy Guardrails", "Deterministic Audit Trail"],
    techStack: ["Python", "FastAPI", "AI Agents", "Risk Scoring"],
    github: "https://github.com/kothakarthikeya/recover-ai",
    live: "#",
    image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Legal Contract Analyzer",
    description: "AI-powered contract intelligence system using Hugging Face LLM APIs and Pinecone vector search for clause classification, NER, risk scoring, and multi-agent compliance audits.",
    features: ["Multi-Agent AI Analysis", "Pinecone Semantic Search", "Clause Classification", "Weighted Risk Scoring"],
    techStack: ["Python", "Pinecone", "Hugging Face", "NLP", "FastAPI"],
    github: "https://github.com/kothakarthikeya/legal-contract",
    live: "#",
    image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "AI Interview Trainer Agent",
    description: "Interactive mock interview preparation platform built with IBM watsonx.ai and Meta Llama 3 70B, dynamically generating domain-tailored technical questions and evaluating answers.",
    features: ["IBM watsonx.ai Studio", "Llama 3 70B Instruct", "Difficulty Selection", "Real-Time AI Feedback"],
    techStack: ["React.js", "FastAPI", "IBM watsonx.ai", "Llama 3"],
    github: "https://github.com/kothakarthikeya/AI-Interview-Trainer-Agent",
    live: "#",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "AI Future Self & Habit Predictor",
    description: "AI web application combining historical habit tracking with a Random Forest classifier to predict habit failure points and Generative AI to simulate best/worst-case life trajectories.",
    features: ["Random Forest ML Model", "LLM Future Simulation", "Habit Failure Prediction", "Actionable Interventions"],
    techStack: ["React", "FastAPI", "Scikit-Learn", "Google GenAI"],
    github: "https://github.com/kothakarthikeya/AIFUTURESELF",
    live: "#",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "VisionAI Reviewer",
    description: "Multimodal computer vision and video analysis platform extracting keyframes via OpenCV and employing Google Gemini for comprehensive contextual evaluation and storytelling.",
    features: ["OpenCV Frame Extraction", "Gemini Multimodal Reasoning", "FastAPI REST Engine", "Docker Containerized"],
    techStack: ["TypeScript", "React", "FastAPI", "OpenCV", "Google Gemini"],
    github: "https://github.com/kothakarthikeya/visionai-reviewer-",
    live: "#",
    image: "https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Smart Lender — Loan Predictor",
    description: "Machine Learning loan approval prediction system leveraging XGBoost to analyze applicant financials and credit constraints, enabling fast and data-driven risk decisions.",
    features: ["XGBoost Classification", "Applicant Risk Analysis", "Financial Feature Engineering", "Interactive Web UI"],
    techStack: ["Python", "Flask", "XGBoost", "Scikit-Learn", "Pandas"],
    github: "https://github.com/kothakarthikeya/smart-lender",
    live: "#",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "AI Images Detector & Analyzer",
    description: "Automated single and batch image detection platform that analyzes authenticity and AI-generated probabilities using Sightengine APIs, providing structured web and sheet reports.",
    features: ["Batch Image Processing", "Sightengine AI Integration", "Confidence Scoring", "CSV & Sheet Export"],
    techStack: ["React", "FastAPI", "Sightengine API", "Asyncio"],
    github: "https://github.com/kothakarthikeya/Aimagesdectector",
    live: "#",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "SearchIQS Ashford Land Scraper",
    description: "Production-grade, resilient scraper for CT Ashford land records adhering to strict headless-free rules, managing ASP.NET postbacks, viewstate, and SHA-256 deduplication.",
    features: ["Pure HTTP Session (No Headless)", "ASP.NET Postback Engine", "SHA-256 Deduplication", "Multi-Destination Export"],
    techStack: ["Python", "BeautifulSoup4", "Requests", "Data Pipeline"],
    github: "https://github.com/kothakarthikeya/searchiqs-ashford-scraper",
    live: "#",
    image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "EventCraft — Event Management",
    description: "Modern full-stack event ticketing and discovery platform built with Next.js and MongoDB, featuring animated interactions, secure session auth, and real-time event booking.",
    features: ["Event Ticketing & Discovery", "Session & JWT Security", "Framer Motion Animations", "MongoDB Data Layer"],
    techStack: ["Next.js", "React", "MongoDB", "Framer Motion", "TailwindCSS"],
    github: "https://github.com/kothakarthikeya/eventcraft",
    live: "#",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Healthcare AI Assistant",
    description: "Conversational healthcare intelligence chatbot designed for patient symptom triage, preliminary inquiry analysis, and verified health guidance.",
    features: ["Symptom Triage Guidance", "Medical Knowledge Retrieval", "Conversational AI Interface", "Interactive Health Advisor"],
    techStack: ["Python", "NLP", "Conversational AI", "Healthcare Tech"],
    github: "https://github.com/kothakarthikeya/health-care-chatbot",
    live: "#",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80",
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
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: (index % 3) * 0.15 } }
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
          <a 
            href={project.live && project.live !== '#' ? project.live : project.github} 
            target="_blank" 
            rel="noreferrer" 
            style={styles.overlayIcon}
            title={project.live && project.live !== '#' ? "Live Preview" : "GitHub Repository"}
          >
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
          {project.live && project.live !== '#' ? (
            <a href={project.live} target="_blank" rel="noreferrer" style={styles.linkLive}>
              Live Preview <ExternalLink size={16} />
            </a>
          ) : (
            <a href={project.github} target="_blank" rel="noreferrer" style={styles.linkLive}>
              View Repo <ExternalLink size={16} />
            </a>
          )}
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
