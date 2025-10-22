import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Skills = ({ theme }) => {
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const languages = [
    'Python', 'JavaScript', 'TypeScript', 'Java', 'C++', 'C', 'HTML', 'CSS', 'SQL'
  ];
  
  const frameworks = [
    'React', 'Node.js', 'Express', 'Django', 'scikit-learn', 'NumPy', 'Mongoose'
  ];
  
  const tools = [
    'Git', 'GitHub', 'Docker', 'MongoDB', 'PostgreSQL', 'JWT', 'Cloudinary', 'REST APIs', 'Postman', 'Vercel', 'Railway'
  ];

  const getIconPath = (name, isHovered = false) => {
    switch (name) {
      case 'C++': return isHovered ? '/icons/C++ (color).svg' : '/icons/C++.svg';
      case 'C': return isHovered ? '/icons/C(color).svg' : '/icons/C.svg';
      case 'JavaScript': return isHovered ? '/icons/JavaScript(color).svg' : '/icons/JavaScript.svg';
      case 'TypeScript': return isHovered ? '/icons/TypeScript(color).svg' : '/icons/TypeScript.svg';
      case 'HTML': return isHovered ? '/icons/HTML5(color).svg' : '/icons/HTML5.svg';
      case 'CSS': return isHovered ? '/icons/CSS3(color).svg' : '/icons/CSS3.svg';
      case 'Docker': return isHovered ? '/icons/Docker(color).svg' : '/icons/Docker.svg';
      case 'MongoDB': return isHovered ? '/icons/MongoDB(color).svg' : '/icons/MongoDB.svg';
      case 'PostgreSQL': return isHovered ? '/icons/PostgreSQL(color).svg' : '/icons/PostgreSQL.svg';
      case 'Postman': return isHovered ? '/icons/Postman(color).svg' : '/icons/Postman.svg';
      case 'REST APIs': return isHovered ? '/icons/RestAPIs(color).svg' : '/icons/RestAPIs.svg';
      case 'Node.js': return '/icons/Node.js.svg';
      case 'Mongoose': return '/icons/Mongoose.js.svg';
      case 'scikit-learn': return isHovered ? '/icons/scikit-learn(color).svg' : '/icons/scikit-learn.svg';
      case 'Railway': return '/icons/railway.svg';
      default: return `/icons/${name}.svg`;
    }
  };

  return (
    <section id="skills" className="skills-section">
      <motion.div 
        className="skills-container"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        viewport={{ once: false, margin: '-100px' }}
      >
        <motion.h2
          className="about-title text-shadows"
          initial={{ opacity: 0, scale: 0.8, y: -30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
          viewport={{ once: false }}
        >
          Technical Skills
        </motion.h2>

        <motion.div 
          className="skills-grid"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
          viewport={{ once: false }}
        >
          <motion.div 
            className="skills-category"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.7, ease: 'easeOut' }}
            viewport={{ once: false }}
          >
            <h3 className="skills-category-title">Languages</h3>
            <div className="skills-icons-grid">
              {languages.map((name, index) => (
                <motion.div 
                  className="skill-item" 
                  key={name}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: 0.8 + (index * 0.1), 
                    ease: 'easeOut' 
                  }}
                  viewport={{ once: false }}
                  onMouseEnter={() => setHoveredSkill(name)}
                  onMouseLeave={() => setHoveredSkill(null)}
                >
                  <img 
                    className="skill-icon" 
                    src={getIconPath(name, hoveredSkill === name)} 
                    alt={name} 
                    loading="lazy" 
                  />
                  <span className="skill-label">{name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            className="skills-category"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.8, ease: 'easeOut' }}
            viewport={{ once: false }}
          >
            <h3 className="skills-category-title">Frameworks & Libraries</h3>
            <div className="skills-icons-grid">
              {frameworks.map((name, index) => (
                <motion.div 
                  className="skill-item" 
                  key={name}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: 0.9 + (index * 0.1), 
                    ease: 'easeOut' 
                  }}
                  viewport={{ once: false }}
                  onMouseEnter={() => setHoveredSkill(name)}
                  onMouseLeave={() => setHoveredSkill(null)}
                >
                  <img 
                    className="skill-icon" 
                    src={getIconPath(name, hoveredSkill === name)} 
                    alt={name} 
                    loading="lazy" 
                  />
                  <span className="skill-label">{name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            className="skills-category"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0, ease: 'easeOut' }}
            viewport={{ once: false }}
          >
            <h3 className="skills-category-title">Developer Tools</h3>
            <div className="skills-icons-grid">
              {tools.map((name, index) => (
                <motion.div 
                  className="skill-item" 
                  key={name}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: 1.1 + (index * 0.05), 
                    ease: 'easeOut' 
                  }}
                  viewport={{ once: false }}
                  onMouseEnter={() => setHoveredSkill(name)}
                  onMouseLeave={() => setHoveredSkill(null)}
                >
                  <img 
                    className="skill-icon" 
                    src={getIconPath(name, hoveredSkill === name)} 
                    alt={name} 
                    loading="lazy" 
                  />
                  <span className="skill-label">{name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      <style jsx>{`
        .skills-section {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 60px 0;
          background: ${theme === 'dark' ? 'linear-gradient(135deg, #042a1c 0%, #042a1c 100%)' : 'linear-gradient(135deg, #EEEEEE 0%, #EEEEEE 100%)'};
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
          scroll-snap-align: start;
          scroll-snap-stop: always;
        }
        .skills-container { max-width: 1200px; width: 100%; padding: 0 20px; }
        .about-title { color: ${theme === 'dark' ? '#e3e5e6' : '#000000'}; }
        .text-shadows {
          text-shadow: 3px 3px 0 ${theme === 'dark' ? '#0d4f3c' : '#374151'}, 6px 6px 0 ${theme === 'dark' ? '#1a5f4a' : '#4b5563'}, 9px 9px 0 ${theme === 'dark' ? '#2d6b58' : '#6b7280'}, 12px 12px 0 ${theme === 'dark' ? '#407766' : '#9ca3af'};
          font-family: 'Chiron Sung HK', serif;
          font-weight: 700;
          text-transform: uppercase;
          font-size: calc(1.5rem + 3vw);
          text-align: center;
          margin: 0 0 24px 0;
          color: ${theme === 'dark' ? '#e3e5e6' : '#000000'};
          animation: shadows 1.2s ease-in infinite;
          letter-spacing: 0.2rem;
        }
        @keyframes shadows {
          0% { text-shadow: none; }
          10% { transform: translate(-3px, -3px); text-shadow: 3px 3px 0 ${theme === 'dark' ? '#0d4f3c' : '#374151'}; }
          20% { transform: translate(-6px, -6px); text-shadow: 3px 3px 0 ${theme === 'dark' ? '#0d4f3c' : '#374151'}, 6px 6px 0 ${theme === 'dark' ? '#1a5f4a' : '#4b5563'}; }
          30% { transform: translate(-9px, -9px); text-shadow: 3px 3px 0 ${theme === 'dark' ? '#0d4f3c' : '#374151'}, 6px 6px 0 ${theme === 'dark' ? '#1a5f4a' : '#4b5563'}, 9px 9px 0 ${theme === 'dark' ? '#2d6b58' : '#6b7280'}; }
          40% { transform: translate(-12px, -12px); text-shadow: 3px 3px 0 ${theme === 'dark' ? '#0d4f3c' : '#374151'}, 6px 6px 0 ${theme === 'dark' ? '#1a5f4a' : '#4b5563'}, 9px 9px 0 ${theme === 'dark' ? '#2d6b58' : '#6b7280'}, 12px 12px 0 ${theme === 'dark' ? '#407766' : '#9ca3af'}; }
          50% { transform: translate(-12px, -12px); text-shadow: 3px 3px 0 ${theme === 'dark' ? '#0d4f3c' : '#374151'}, 6px 6px 0 ${theme === 'dark' ? '#1a5f4a' : '#4b5563'}, 9px 9px 0 ${theme === 'dark' ? '#2d6b58' : '#6b7280'}, 12px 12px 0 ${theme === 'dark' ? '#407766' : '#9ca3af'}; }
          60% { text-shadow: 3px 3px 0 ${theme === 'dark' ? '#0d4f3c' : '#374151'}, 6px 6px 0 ${theme === 'dark' ? '#1a5f4a' : '#4b5563'}, 9px 9px 0 ${theme === 'dark' ? '#2d6b58' : '#6b7280'}, 12px 12px 0 ${theme === 'dark' ? '#407766' : '#9ca3af'}; }
          70% { text-shadow: 3px 3px 0 ${theme === 'dark' ? '#0d4f3c' : '#374151'}, 6px 6px 0 ${theme === 'dark' ? '#1a5f4a' : '#4b5563'}, 9px 9px 0 ${theme === 'dark' ? '#2d6b58' : '#6b7280'}; }
          80% { text-shadow: 3px 3px 0 ${theme === 'dark' ? '#0d4f3c' : '#374151'}, 6px 6px 0 ${theme === 'dark' ? '#1a5f4a' : '#4b5563'}; }
          90% { text-shadow: 3px 3px 0 ${theme === 'dark' ? '#0d4f3c' : '#374151'}; }
          100% { text-shadow: none; }
        }
        .skills-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: auto auto;
          gap: 16px;
        }
        .skills-category:last-child {
          grid-column: 1 / -1;
        }
        .skills-category { 
          background: ${theme === 'dark' ? 'rgba(227, 229, 230, 0.04)' : 'rgba(0, 0, 0, 0.04)'}; 
          border: 1px solid ${theme === 'dark' ? 'rgba(227, 229, 230, 0.15)' : 'rgba(0, 0, 0, 0.08)'}; 
          border-radius: 12px; 
          padding: 12px; 
          box-shadow: ${theme === 'dark' ? '0 6px 20px rgba(0,0,0,0.25)' : '0 6px 15px rgba(0,0,0,0.06)'}; 
          overflow: hidden; 
          box-sizing: border-box; 
        }
        .skills-category-title { 
          font-family: 'Poppins', sans-serif; 
          font-size: 16px; 
          font-weight: 700; 
          margin-bottom: 8px; 
          color: ${theme === 'dark' ? '#e3e5e6' : '#000000'}; 
          text-align: center;
        }
        .skills-icons-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
          gap: 12px;
          align-items: start;
          justify-items: center;
          max-height: none;
        }
        .skill-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          gap: 6px;
          padding: 8px 6px;
          border-radius: 8px;
          background: ${theme === 'dark' ? 'rgba(227, 229, 230, 0.03)' : 'rgba(0, 0, 0, 0.03)'};
          border: 1px solid ${theme === 'dark' ? 'rgba(227, 229, 230, 0.12)' : 'rgba(0, 0, 0, 0.06)'};
          transition: all 0.3s ease;
          cursor: pointer;
          width: 80px;
          height: 80px;
          box-sizing: border-box;
        }
        .skill-item:hover {
          transform: translateY(-4px) scale(1.05);
          background: ${theme === 'dark' ? 'rgba(227, 229, 230, 0.08)' : 'rgba(0, 0, 0, 0.08)'};
          border-color: ${theme === 'dark' ? 'rgba(227, 229, 230, 0.25)' : 'rgba(0, 0, 0, 0.15)'};
          box-shadow: ${theme === 'dark' 
            ? '0 8px 25px rgba(0,0,0,0.4), 0 0 15px rgba(227,229,230,0.1)' 
            : '0 8px 20px rgba(0,0,0,0.15)'};
        }
        .skill-icon {
          width: 40px;
          height: 40px;
          object-fit: contain;
          filter: ${theme === 'dark' 
            ? 'brightness(0) invert(1) contrast(100%) drop-shadow(0 4px 8px rgba(0,0,0,0.35))' 
            : 'brightness(0) contrast(100%) drop-shadow(0 3px 6px rgba(0,0,0,0.1))'};
          transition: all 0.3s ease;
        }
        .skill-item:hover .skill-icon {
          filter: ${theme === 'dark' 
            ? 'drop-shadow(0 6px 12px rgba(0,0,0,0.5))' 
            : 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))'};
          transform: scale(1.1);
        }
        .skill-label {
          font-family: 'Poppins', sans-serif;
          font-size: 10px;
          font-weight: 600;
          color: ${theme === 'dark' ? '#e3e5e6' : '#111827'};
          text-align: center;
          line-height: 1.2;
          word-break: break-word;
        }

        /* Ultra-wide monitors (3440px+) */
        @media (min-width: 3440px) {
          .skills-section { padding: 20px 0; }
          .skills-container { padding: 0 40px; }
          .text-shadows { font-size: calc(2.4rem + 4vw); }
          .skills-grid { gap: 24px; }
          .skills-category { padding: 20px; }
          .skills-category-title { font-size: 24px; margin-bottom: 12px; }
          .skills-icons-grid { gap: 16px; grid-template-columns: repeat(auto-fit, minmax(100px, 1fr)); }
          .skill-item { width: 100px; height: 100px; }
          .skill-icon { width: 50px; height: 50px; }
          .skill-label { font-size: 12px; }
        }
        
        /* Large 4K monitors (2560px - 3439px) */
        @media (min-width: 2560px) and (max-width: 3439px) {
          .skills-section { padding: 70px 0; }
          .skills-container { padding: 0 30px; }
          .text-shadows { font-size: calc(2.2rem + 3.5vw); }
          .skills-grid { gap: 20px; }
          .skills-category { padding: 18px; }
          .skills-category-title { font-size: 22px; margin-bottom: 10px; }
          .skills-icons-grid { gap: 14px; grid-template-columns: repeat(auto-fit, minmax(90px, 1fr)); }
          .skill-item { width: 90px; height: 90px; }
          .skill-icon { width: 45px; height: 45px; }
          .skill-label { font-size: 11px; }
        }
        
        /* Standard large monitors (1920px - 2559px) */
        @media (min-width: 1920px) and (max-width: 2559px) {
          .skills-section { padding: 30px 0; }
          .skills-container { padding: 0 25px; }
          .text-shadows { font-size: calc(2rem + 3vw); }
          .skills-grid { gap: 18px; }
          .skills-category { padding: 16px; }
          .skills-category-title { font-size: 20px; margin-bottom: 10px; }
          .skills-icons-grid { gap: 12px; grid-template-columns: repeat(auto-fit, minmax(85px, 1fr)); }
          .skill-item { width: 85px; height: 85px; }
          .skill-icon { width: 42px; height: 42px; }
          .skill-label { font-size: 10px; }
        }
        
        /* Standard desktop (1440px - 1919px) */
        @media (min-width: 1440px) and (max-width: 1919px) {
          .skills-section { padding: 30px 0; }
          .skills-container { padding: 0 20px; }
          .text-shadows { font-size: calc(1.9rem + 3vw); }
          .skills-grid { gap: 16px; }
          .skills-category { padding: 12px; }
          .skills-category-title { font-size: 16px; margin-bottom: 8px; }
          .skills-icons-grid { gap: 12px; grid-template-columns: repeat(auto-fit, minmax(80px, 1fr)); }
          .skill-item { width: 80px; height: 80px; }
          .skill-icon { width: 40px; height: 40px; }
          .skill-label { font-size: 10px; }
        }
        
        /* Small desktop/large laptop (1280px - 1439px) */
        @media (min-width: 1280px) and (max-width: 1439px) {
          .skills-section { padding: 25px 0; }
          .skills-container { padding: 0 20px; }
          .text-shadows { font-size: calc(1.8rem + 2.8vw); }
          .skills-grid { gap: 16px; }
          .skills-category { padding: 12px; }
          .skills-category-title { font-size: 16px; margin-bottom: 8px; }
          .skills-icons-grid { gap: 12px; grid-template-columns: repeat(auto-fit, minmax(80px, 1fr)); }
          .skill-item { width: 80px; height: 80px; }
          .skill-icon { width: 40px; height: 40px; }
          .skill-label { font-size: 10px; }
        }
        
        /* Laptop (1024px - 1279px) */
        @media (min-width: 1024px) and (max-width: 1279px) {
          .skills-section { padding: 25px 0; }
          .skills-container { padding: 0 20px; }
          .text-shadows { font-size: calc(1.7rem + 2.5vw); }
          .skills-grid { gap: 16px; }
          .skills-category { padding: 12px; }
          .skills-category-title { font-size: 16px; margin-bottom: 8px; }
          .skills-icons-grid { gap: 12px; grid-template-columns: repeat(auto-fit, minmax(80px, 1fr)); }
          .skill-item { width: 80px; height: 80px; }
          .skill-icon { width: 40px; height: 40px; }
          .skill-label { font-size: 10px; }
        }
        
        /* iPad Pro (1024px) */
        @media (min-width: 1024px) and (max-width: 1024px) and (orientation: landscape) {
          .skills-section { padding: 20px 0; }
          .skills-container { padding: 0 30px; }
          .text-shadows { font-size: calc(2rem + 2.2vw); }
          .skills-grid { gap: 14px; }
          .skills-category { padding: 10px; }
          .skills-category-title { font-size: 15px; margin-bottom: 8px; }
          .skills-icons-grid { gap: 10px; grid-template-columns: repeat(auto-fit, minmax(75px, 1fr)); }
          .skill-item { width: 75px; height: 75px; }
          .skill-icon { width: 38px; height: 38px; }
          .skill-label { font-size: 9px; }
        }
        
        /* iPad Air (820px) */
        @media (min-width: 820px) and (max-width: 1023px) {
          .skills-section { padding: 20px 0; }
          .skills-container { padding: 0 25px; }
          .text-shadows { font-size: calc(1.5rem + 2vw); }
          .skills-grid { gap: 14px; }
          .skills-category { padding: 10px; }
          .skills-category-title { font-size: 15px; margin-bottom: 8px; }
          .skills-icons-grid { gap: 10px; grid-template-columns: repeat(auto-fit, minmax(75px, 1fr)); }
          .skill-item { width: 75px; height: 75px; }
          .skill-icon { width: 38px; height: 38px; }
          .skill-label { font-size: 9px; }
        }
        
        /* iPad Mini (768px) */
        @media (min-width: 768px) and (max-width: 819px) {
          .skills-section { padding: 20px 0; }
          .skills-container { padding: 0 20px; }
          .text-shadows { font-size: calc(1.4rem + 1.8vw); }
          .skills-grid { gap: 14px; }
          .skills-category { padding: 10px; }
          .skills-category-title { font-size: 15px; margin-bottom: 8px; }
          .skills-icons-grid { gap: 10px; grid-template-columns: repeat(auto-fit, minmax(70px, 1fr)); }
          .skill-item { width: 70px; height: 70px; }
          .skill-icon { width: 36px; height: 36px; }
          .skill-label { font-size: 9px; }
        }
        
        /* Large phones/Small tablets (481px - 767px) */
        @media (min-width: 481px) and (max-width: 767px) {
          .skills-section { padding: 0 0 40px 0; }
          .skills-container { padding: 0 20px; }
          .text-shadows { font-size: calc(2.2rem + 2.5vw); }
          .skills-grid { grid-template-columns: 1fr; gap: 16px; }
          .skills-category:last-child { grid-column: 1; }
          .skills-category { padding: 10px; }
          .skills-category-title { font-size: 14px; margin-bottom: 8px; }
          .skills-icons-grid { gap: 10px; grid-template-columns: repeat(auto-fit, minmax(70px, 1fr)); }
          .skill-item { width: 70px; height: 70px; }
          .skill-icon { width: 36px; height: 36px; }
          .skill-label { font-size: 9px; }
        }
        
        /* iPhone 14 Pro Max, Samsung Galaxy S20 Ultra (428px) */
        @media (min-width: 428px) and (max-width: 480px) {
          .skills-section { padding: 0 0 35px 0; }
          .skills-container { padding: 0 18px; }
          .text-shadows { font-size: calc(2rem + 2.2vw); }
          .skills-grid { grid-template-columns: 1fr; gap: 14px; }
          .skills-category:last-child { grid-column: 1; }
          .skills-category { padding: 8px; }
          .skills-category-title { font-size: 13px; margin-bottom: 6px; }
          .skills-icons-grid { gap: 8px; grid-template-columns: repeat(auto-fit, minmax(65px, 1fr)); }
          .skill-item { width: 65px; height: 65px; }
          .skill-icon { width: 34px; height: 34px; }
          .skill-label { font-size: 8px; }
        }
        
        /* iPhone 12 Pro, iPhone XR (390px) */
        @media (min-width: 390px) and (max-width: 427px) {
          .skills-section { padding: 0 0 30px 0; }
          .skills-container { padding: 0 16px; }
          .text-shadows { font-size: calc(1.8rem + 2vw); }
          .skills-grid { grid-template-columns: 1fr; gap: 12px; }
          .skills-category:last-child { grid-column: 1; }
          .skills-category { padding: 8px; }
          .skills-category-title { font-size: 12px; margin-bottom: 6px; }
          .skills-icons-grid { gap: 8px; grid-template-columns: repeat(auto-fit, minmax(60px, 1fr)); }
          .skill-item { width: 60px; height: 60px; }
          .skill-icon { width: 32px; height: 32px; }
          .skill-label { font-size: 8px; }
        }
        
        /* iPhone SE, Samsung Galaxy A51/71 (375px) */
        @media (min-width: 375px) and (max-width: 389px) {
          .skills-section { padding: 0 0 25px 0; }
          .skills-container { padding: 0 15px; }
          .text-shadows { font-size: calc(1.6rem + 1.8vw); }
          .skills-grid { grid-template-columns: 1fr; gap: 12px; }
          .skills-category:last-child { grid-column: 1; }
          .skills-category { padding: 8px; }
          .skills-category-title { font-size: 11px; margin-bottom: 6px; }
          .skills-icons-grid { gap: 8px; grid-template-columns: repeat(auto-fit, minmax(55px, 1fr)); }
          .skill-item { width: 55px; height: 55px; }
          .skill-icon { width: 30px; height: 30px; }
          .skill-label { font-size: 7px; }
        }
        
        /* Samsung Galaxy S8+ (360px) */
        @media (min-width: 360px) and (max-width: 374px) {
          .skills-section { padding: 0 0 25px 0; }
          .skills-container { padding: 0 14px; }
          .text-shadows { font-size: calc(1.5rem + 1.6vw); }
          .skills-grid { grid-template-columns: 1fr; gap: 10px; }
          .skills-category:last-child { grid-column: 1; }
          .skills-category { padding: 6px; }
          .skills-category-title { font-size: 10px; margin-bottom: 6px; }
          .skills-icons-grid { gap: 6px; grid-template-columns: repeat(auto-fit, minmax(50px, 1fr)); }
          .skill-item { width: 50px; height: 50px; }
          .skill-icon { width: 28px; height: 28px; }
          .skill-label { font-size: 6px; }
        }
        
        /* Small phones (320px - 359px) */
        @media (min-width: 320px) and (max-width: 359px) {
          .skills-section { padding: 0 0 20px 0; }
          .skills-container { padding: 0 12px; }
          .text-shadows { font-size: calc(1.4rem + 1.4vw); }
          .skills-grid { grid-template-columns: 1fr; gap: 10px; }
          .skills-category:last-child { grid-column: 1; }
          .skills-category { padding: 6px; }
          .skills-category-title { font-size: 9px; margin-bottom: 6px; }
          .skills-icons-grid { gap: 6px; grid-template-columns: repeat(auto-fit, minmax(45px, 1fr)); }
          .skill-item { width: 45px; height: 45px; }
          .skill-icon { width: 26px; height: 26px; }
          .skill-label { font-size: 5px; }
        }
        
        /* Foldable devices - Surface Duo (540px x 720px) */
        @media (min-width: 540px) and (max-width: 720px) and (orientation: portrait) {
          .skills-section { padding: 0 0 40px 0; }
          .skills-container { padding: 0 20px; }
          .text-shadows { font-size: calc(1.3rem + 1.6vw); }
          .skills-grid { grid-template-columns: 1fr; gap: 16px; }
          .skills-category:last-child { grid-column: 1; }
          .skills-category { padding: 10px; }
          .skills-category-title { font-size: 14px; margin-bottom: 8px; }
          .skills-icons-grid { gap: 10px; grid-template-columns: repeat(auto-fit, minmax(70px, 1fr)); }
          .skill-item { width: 70px; height: 70px; }
          .skill-icon { width: 36px; height: 36px; }
          .skill-label { font-size: 9px; }
        }
        
        /* Galaxy Z Fold 5 - Folded (280px) */
        @media (max-width: 280px) {
          .skills-section { padding: 0 0 15px 0; }
          .skills-container { padding: 0 8px; }
          .text-shadows { font-size: calc(0.7rem + 0.4vw); }
          .skills-grid { grid-template-columns: 1fr; gap: 8px; }
          .skills-category:last-child { grid-column: 1; }
          .skills-category { padding: 4px; }
          .skills-category-title { font-size: 8px; margin-bottom: 4px; }
          .skills-icons-grid { gap: 4px; grid-template-columns: repeat(auto-fit, minmax(40px, 1fr)); }
          .skill-item { width: 40px; height: 40px; }
          .skill-icon { width: 24px; height: 24px; }
          .skill-label { font-size: 4px; }
        }
        
        /* Galaxy Z Fold 5 - Unfolded (1768px) */
        @media (min-width: 1768px) and (max-width: 1768px) {
          .skills-section { padding: 80px 0; }
          .skills-container { padding: 0 40px; }
          .text-shadows { font-size: calc(2.2rem + 3.5vw); }
          .skills-grid { gap: 20px; }
          .skills-category { padding: 18px; }
          .skills-category-title { font-size: 22px; margin-bottom: 10px; }
          .skills-icons-grid { gap: 14px; grid-template-columns: repeat(auto-fit, minmax(90px, 1fr)); }
          .skill-item { width: 90px; height: 90px; }
          .skill-icon { width: 45px; height: 45px; }
          .skill-label { font-size: 11px; }
        }
        
        /* Landscape orientation adjustments */
        @media (orientation: landscape) and (max-height: 500px) {
          .skills-section { padding: 20px 0; }
          .text-shadows { font-size: calc(1.1rem + 1vw); }
          .skills-grid { gap: 8px; }
          .skills-category { padding: 6px; }
          .skills-category-title { font-size: 10px; margin-bottom: 4px; }
          .skills-icons-grid { gap: 6px; grid-template-columns: repeat(auto-fit, minmax(50px, 1fr)); }
          .skill-item { width: 50px; height: 50px; }
          .skill-icon { width: 28px; height: 28px; }
          .skill-label { font-size: 6px; }
        }
      `}</style>
    </section>
  );
};

export default Skills;


