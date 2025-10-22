import React from 'react';
import { motion } from 'framer-motion';
import './Navbar.css';

const Navbar = ({ theme, toggleTheme }) => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.nav
      className="navbar"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      style={{
        '--navbar-bg': theme === 'dark' ? 'rgba(4, 42, 28, 0.9)' : 'rgba(238, 238, 238, 0.9)',
        '--nav-logo-color': theme === 'dark' ? '#e3e5e6' : '#333333',
        '--nav-link-color': theme === 'dark' ? '#e3e5e6' : '#333333',
        '--switch-bg-color': theme === 'dark' ? 'rgba(227, 229, 230, 0.3)' : 'rgba(0, 0, 0, 0.3)',
        '--switch-circle-bg': theme === 'dark' ? '#e3e5e6' : '#333333'
      }}
    >
      <div className="nav-container">
        <motion.div
          className="nav-logo"
          whileHover={{ scale: 1.05 }}
          onClick={scrollToTop}
        >
          Nyan Aung
        </motion.div>
        
        <div className="nav-links">
          <button onClick={() => scrollToSection('about')}>About</button>
          <button onClick={() => scrollToSection('skills')}>Skills</button>
          <button onClick={() => scrollToSection('projects')}>Projects</button>
          <button onClick={() => scrollToSection('contact')}>Contact</button>
        </div>
        
        <label className="ui-switch">
          <input 
            type="checkbox" 
            checked={theme === 'dark'}
            onChange={toggleTheme}
          />
          <div className="slider">
            <div className="circle"></div>
          </div>
        </label>
      </div>
    </motion.nav>
  );
};
export default Navbar;
