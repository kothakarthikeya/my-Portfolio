import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import CustomCursor from './components/CustomCursor';
import ParticleBg from './components/ParticleBg';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Experience from './sections/Experience';
import Projects from './sections/Projects';
import Certifications from './sections/Certifications';
import Leadership from './sections/Leadership';
import Resume from './sections/Resume';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

// Loading Screen Component
const LoadingScreen = ({ setLoading }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, [setLoading]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
      style={styles.loadingContainer}
    >
      <div style={styles.loadingWrapper}>
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            repeat: Infinity,
          }}
          style={styles.loadingCircle}
        />
        <motion.h1 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="gradient-text"
          style={styles.loadingText}
        >
          K.K.R.G
        </motion.h1>
      </div>
    </motion.div>
  );
};

// Scroll Progress Indicator
const ScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPx = document.documentElement.scrollTop;
      const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = `${scrollPx / winHeightPx * 100}%`;
      setScrollProgress(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={styles.scrollProgressContainer}>
      <motion.div 
        style={{...styles.scrollProgressBar, width: scrollProgress}} 
        layout
      />
    </div>
  );
};

function App() {
  const [loading, setLoading] = useState(true);

  // Preload images to prevent jumping after loading
  useEffect(() => {
    const images = [
      "/profile.jpg",
      "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=800&q=80"
    ];
    images.forEach(img => {
      new Image().src = img;
    });
  }, []);

  return (
    <div style={{ position: 'relative' }}>
      <AnimatePresence>
        {loading ? (
          <LoadingScreen key="loading" setLoading={setLoading} />
        ) : (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {/* Background and Utilities */}
            <ParticleBg />
            
            {/* Comment out custom cursor if on mobile to avoid issues, simplified here */}
            {window.innerWidth > 768 && <CustomCursor />}
            
            <ScrollProgress />

            {/* Main Content */}
            <div style={styles.contentWrap}>
              <Hero />
              <About />
              <Skills />
              <Experience />
              <Projects />
              <Certifications />
              <Leadership />
              <Resume />
              <Contact />
              <Footer />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const styles = {
  loadingContainer: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    background: 'var(--bg-black)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  loadingWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
  },
  loadingCircle: {
    width: '60px',
    height: '60px',
    border: '4px solid rgba(255, 255, 255, 0.1)',
    borderTopColor: 'var(--accent-purple)',
    borderRightColor: 'var(--accent-cyan)',
    borderRadius: '50%',
  },
  loadingText: {
    fontFamily: 'Poppins, sans-serif',
    fontSize: '2rem',
    fontWeight: '700',
    letterSpacing: '4px',
  },
  scrollProgressContainer: {
    position: 'fixed',
    top: 0, left: 0, right: 0,
    height: '4px',
    background: 'transparent',
    zIndex: 1000,
  },
  scrollProgressBar: {
    height: '100%',
    background: 'var(--gradient-primary)',
    boxShadow: '0 0 10px rgba(6, 182, 212, 0.5)',
  },
  contentWrap: {
    position: 'relative',
    zIndex: 10,
  }
};

export default App;
