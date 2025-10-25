import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './About.css';

const About = ({ theme }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  React.useEffect(() => {
    const checkTouchDevice = () => {
      setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };
    
    checkTouchDevice();
    window.addEventListener('resize', checkTouchDevice);
    
    return () => window.removeEventListener('resize', checkTouchDevice);
  }, []);

  const handleCardClick = () => {
    setIsExpanded(!isExpanded);
  };

  const handleCardHover = () => {
    if (!isTouchDevice) {
      setIsHovered(true);
    }
  };

  const handleCardLeave = () => {
    if (!isTouchDevice) {
      setIsHovered(false);
    }
  };

  return (
    <section 
      id="about" 
      className="about-section"
      style={{
        '--about-bg': theme === 'dark' ? 'linear-gradient(135deg, #042a1c 0%, #042a1c 100%)' : 'linear-gradient(135deg, #EEEEEE 0%, #EEEEEE 100%)',
        '--about-title-color': theme === 'dark' ? '#e3e5e6' : '#000000',
        '--text-shadow-1': theme === 'dark' ? '#0d4f3c' : '#374151',
        '--text-shadow-2': theme === 'dark' ? '#1a5f4a' : '#4b5563',
        '--text-shadow-3': theme === 'dark' ? '#2d6b58' : '#6b7280',
        '--text-shadow-4': theme === 'dark' ? '#407766' : '#9ca3af',
        '--bio-card-bg': theme === 'dark' ? 'linear-gradient(135deg, #0a2e1f 0%, #1a4a35 100%)' : 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
        '--bio-card-shadow-1': theme === 'dark' ? 'rgba(0, 0, 0, 0.4)' : 'rgba(0, 0, 0, 0.08)',
        '--bio-card-shadow-2': theme === 'dark' ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.06)',
        '--bio-card-inset': theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.8)',
        '--bio-card-border': theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
        '--bio-card-expanded-shadow-1': theme === 'dark' ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0.12)',
        '--bio-card-expanded-shadow-2': theme === 'dark' ? 'rgba(0, 0, 0, 0.4)' : 'rgba(0, 0, 0, 0.08)',
        '--bio-card-expanded-inset': theme === 'dark' ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.9)',
        '--bio-title-color': theme === 'dark' ? '#bd9f67' : '#2563eb',
        '--bio-greeting-color': theme === 'dark' ? '#e3e5e6' : '#000000',
        '--bio-greeting-shadow': theme === 'dark' ? '0 2px 4px rgba(0, 0, 0, 0.3)' : '0 1px 2px rgba(0, 0, 0, 0.1)',
        '--bio-text-color': theme === 'dark' ? '#e3e5e6' : '#000000',
        '--bio-text-secondary': theme === 'dark' ? '#e3e5e6' : '#374151',
        '--bio-initial-color': theme === 'dark' ? '#e3e5e6' : '#000000',
        '--bio-initial-shadow': theme === 'dark' ? '0 4px 8px rgba(0, 0, 0, 0.3)' : '0 2px 4px rgba(0, 0, 0, 0.1)',
        '--logo-main-color': theme === 'dark' ? '#bd9f67' : '#2563eb',
        '--logo-second-color': theme === 'dark' ? '#bd9f67' : '#2563eb',
        '--border-color': theme === 'dark' ? '#e3e5e6' : '#000000',
        '--image-shadow': theme === 'dark' ? '0 25px 50px rgba(0, 0, 0, 0.4)' : '0 25px 50px rgba(0, 0, 0, 0.15)',
        '--image-bg': theme === 'dark' ? 'linear-gradient(135deg, rgba(227, 229, 230, 0.05), rgba(227, 229, 230, 0.02))' : 'linear-gradient(135deg, rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.02))',
        '--image-border-color': theme === 'dark' ? '#e3e5e6' : '#000000',
        '--image-border-gradient': theme === 'dark' ? 'linear-gradient(45deg, #e3e5e6, #ffffff, #e3e5e6, #ffffff)' : 'linear-gradient(45deg, #000000, #374151, #000000, #374151)',
        '--image-hover-shadow': theme === 'dark' ? '0 35px 70px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(227, 229, 230, 0.2)' : '0 35px 70px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.1)',
        '--skills-category-bg': theme === 'dark' ? 'rgba(227, 229, 230, 0.04)' : 'rgba(0, 0, 0, 0.04)',
        '--skills-category-border': theme === 'dark' ? 'rgba(227, 229, 230, 0.15)' : 'rgba(0, 0, 0, 0.08)',
        '--skills-category-shadow': theme === 'dark' ? '0 10px 30px rgba(0,0,0,0.35)' : '0 10px 20px rgba(0,0,0,0.08)',
        '--skills-title-color': theme === 'dark' ? '#e3e5e6' : '#000000',
        '--skill-bg': theme === 'dark' ? 'rgba(227, 229, 230, 0.06)' : 'rgba(0, 0, 0, 0.06)',
        '--skill-border': theme === 'dark' ? 'rgba(227, 229, 230, 0.18)' : 'rgba(0, 0, 0, 0.08)',
        '--skill-color': theme === 'dark' ? '#e3e5e6' : '#000000',
        '--skill-shadow': theme === 'dark' ? '0 6px 16px rgba(0,0,0,0.35)' : '0 6px 12px rgba(0,0,0,0.08)',
        '--skill-hover-bg': theme === 'dark' ? 'rgba(227, 229, 230, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        '--skill-hover-shadow': theme === 'dark' ? '0 10px 24px rgba(0,0,0,0.45), 0 0 12px rgba(227,229,230,0.25) inset' : '0 10px 20px rgba(0,0,0,0.15)',
        '--skill-tooltip-bg': theme === 'dark' ? 'rgba(0, 0, 0, 0.6)' : 'rgba(0, 0, 0, 0.8)',
        '--polaroid-border': theme === 'dark' ? '#e3e5e6' : 'black',
        '--polaroid-bg': theme === 'dark' ? '#0f3a2a' : '#fff',
        '--polaroid-image-bg': theme === 'dark' ? '#052015' : '#eee'
      }}
    >
      <motion.div 
        className="about-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.div
          className={`about-content ${isExpanded ? 'bio-expanded' : ''}`}
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div
            className="about-header"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: 0.05, ease: "easeOut" }}
            viewport={{ once: false }}
          >
          <motion.h2
            className="about-title"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.15, delay: 0.1, ease: "easeOut" }}
              viewport={{ once: false }}
            >
              About Me
            </motion.h2>
          </motion.div>

          <div className="about-layout">
            <motion.div
              className="about-image"
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2, delay: 0.15, ease: "easeOut" }}
              viewport={{ once: false }}
            >
              <motion.div
                className="education-section"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.25, ease: "easeOut" }}
                viewport={{ once: false }}
              >
                <div className="education-card">
                  <h3 className="education-title">Education</h3>
                  <div className="education-content">
                    <div className="education-entry">
                      <div className="university-info">
                        <h4 className="university-name">University of California San Diego (UCSD)</h4>
                      </div>
                      <div className="graduation-info">
                        <p className="graduation-date">Dec 2026</p>
                      </div>
                    </div>
                    <div className="degree-info">
                      <div>
                        <p className="degree">B.S. Computer Engineering</p>
                        <p className="specialization">B.S. Cognitive Science Specialization in Machine Learning and Neural Computation</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              <div className="image-container">
                <div className="polaroid-card">
                  <img 
                    src="/Nyan.jpeg" 
                    alt="Nyan Aung" 
                    className="profile-image"
                  />
                </div>
              </div>
            </motion.div>
            
            <motion.div
              className="about-text"
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2, delay: 0.2, ease: "easeOut" }}
              viewport={{ once: false }}
            >
              <div className="bio-content">
                <div 
                  className={`bio-card ${isExpanded ? 'expanded' : ''}`} 
                  onClick={handleCardClick}
                  onMouseEnter={handleCardHover}
                  onMouseLeave={handleCardLeave}
                >
                  <div className="border"></div>
                  <div className="content">
                    {!isExpanded ? (
                      <>
                        <span className="bio-initial-text">BIO</span>
                        <span className="hover-hint">
                          {isTouchDevice ? 'Click Me!' : 'HOVER ME!'}
                        </span>
                        <span className="logo-bottom-text">
                          {isTouchDevice ? 'CLICK TO READ BIO' : (isHovered ? 'CLICK TO READ BIO' : '')}
                        </span>
                      </>
                    ) : (
                      <div className="expanded-bio">
                        <h3 className="bio-greeting">Hello!</h3>
                        <p className="bio-text-expanded">
                          I'm Nyan Aung, a Computer Engineering student at UC San Diego excited to grow as a full stack and software engineer. I enjoy turning ideas into reliable, well designed products and I'm at my best when I am learning quickly, asking good questions, and building alongside others.
                        </p>
                        <p className="bio-text-expanded">
                          My experience spans modern front end frameworks, API design, databases, authentication, and real time features. I am comfortable with version control, containers, cloud deployment, and basic testing with continuous integration. I am looking for a team that values curiosity, clean code, and thoughtful problem solving where I can contribute right away and keep growing as a developer.
                        </p>
                        <div className="close-hint">Click to exit</div>
                      </div>
                    )}
                  </div>
                  <span className="bottom-text">NYAN'S BIO</span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

      </motion.div>
    </section>
  );
};

export default About;


