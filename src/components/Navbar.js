import React from 'react';
import { motion } from 'framer-motion';

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
      
      <style jsx>{`
                .navbar {
                  position: fixed;
                  top: 0;
                  left: 0;
                  right: 0;
                  background: ${theme === 'dark' ? 'rgba(4, 42, 28, 0.9)' : 'rgba(238, 238, 238, 0.9)'};
                  backdrop-filter: blur(10px);
                  z-index: 100;
                  padding: 20px 0;
                }
        
        .nav-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: relative;
        }
        
        .nav-logo {
          font-family: 'Poppins', sans-serif;
          font-size: 22px;
          font-weight: 700;
          color: ${theme === 'dark' ? '#e3e5e6' : '#333333'};
          cursor: pointer;
          letter-spacing: 0.5px;
        }
        
        .nav-links {
          display: flex;
          gap: 30px;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
        }
        
        .nav-links button {
          background: none;
          border: none;
          color: ${theme === 'dark' ? '#e3e5e6' : '#333333'};
          font-family: 'Inter', sans-serif;
          font-size: 16px;
          font-weight: 500;
          cursor: pointer;
          transition: color 0.3s ease;
          position: relative;
        }
        
        .nav-links button:hover {
          color: ${theme === 'dark' ? '#e3e5e6' : '#333333'};
          opacity: 0.7;
        }
        
        .nav-links button::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 0;
          height: 2px;
          background: ${theme === 'dark' ? '#e3e5e6' : '#333333'};
          transition: width 0.3s ease;
        }
        
        .nav-links button:hover::after {
          width: 100%;
        }
        
        .ui-switch {
          --switch-bg: ${theme === 'dark' ? 'rgba(227, 229, 230, 0.3)' : 'rgba(0, 0, 0, 0.3)'};
          --switch-width: 48px;
          --switch-height: 20px;
          --circle-diameter: 32px;
          --circle-bg: ${theme === 'dark' ? '#e3e5e6' : '#333333'};
          --circle-inset: calc((var(--circle-diameter) - var(--switch-height)) / 2);
        }

        .ui-switch input {
          display: none;
        }

        .slider {
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
          width: var(--switch-width);
          height: var(--switch-height);
          background: var(--switch-bg);
          border-radius: 999px;
          position: relative;
          cursor: pointer;
        }

        .slider .circle {
          top: calc(var(--circle-inset) * -1);
          left: 0;
          width: var(--circle-diameter);
          height: var(--circle-diameter);
          position: absolute;
          background: var(--circle-bg);
          border-radius: inherit;
          background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjAiIHdpZHRoPSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj4KICAgIDxwYXRoIGZpbGw9IiNmZmYiCiAgICAgICAgZD0iTTkuMzA1IDEuNjY3VjMuNzVoMS4zODlWMS42NjdoLTEuMzl6bS00LjcwNyAxLjk1bC0uOTgyLjk4Mkw1LjA5IDYuMDcybC45ODItLjk4Mi0xLjQ3My0xLjQ3M3ptMTAuODAyIDBMMTMuOTI3IDUuMDlsLjk4Mi45ODIgMS40NzMtMS40NzMtLjk4Mi0uOTgyek0xMCA1LjEzOWE0Ljg3MiA0Ljg3MiAwIDAwLTQuODYyIDQuODZBNC44NzIgNC44NzIgMCAwMDEwIDE0Ljg2MiA0Ljg3MiA0Ljg3MiAwIDAwMTQuODYgMTAgNC44NzIgNC44NzIgMCAwMDEwIDUuMTM5em0wIDEuMzg5QTMuNDYyIDMuNDYyIDAgMDExMy40NzEgMTBhMy40NjIgMy40NjIgMCAwMS0zLjQ3MyAzLjQ3MkEzLjQ2MiAzLjQ2MiAwIDAxNi41MjcgMTAgMy40NjIgMy40NjIgMCAwMTEwIDYuNTI4ek0xLjY2NSA5LjMwNXYxLjM5aDIuMDgzdi0xLjM5SDEuNjY2em0xNC41ODMgMHYxLjM5aDIuMDg0di0xLjM5aC0yLjA4NHpNNS4wOSAxMy45MjhMMy42MTYgMTUuNGwuOTgyLjk4MiAxLjQ3My0xLjQ3My0uOTgyLS45ODJ6bTkuODIgMGwtLjk4Mi45ODIgMS40NzMgMS40NzMuOTgyLS45ODItMS40NzMtMS40NzN6TTkuMzA1IDE2LjI1djIuMDgzaDEuMzg5VjE2LjI1aC0xLjM5eiIgLz4KPC9zdmc+");
          background-repeat: no-repeat;
          background-position: center center;
          -webkit-transition: left 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, -webkit-transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
          -o-transition: left 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
          transition: left 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, -webkit-transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          -webkit-box-pack: center;
          -ms-flex-pack: center;
          justify-content: center;
          box-shadow: 0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12);
        }

        .slider .circle::before {
          content: "";
          position: absolute;
          width: 100%;
          height: 100%;
          background: rgba(255, 255, 255, 0.75);
          border-radius: inherit;
          -webkit-transition: all 500ms;
          -o-transition: all 500ms;
          transition: all 500ms;
          opacity: 0;
        }

        .ui-switch input:checked+.slider .circle {
          left: calc(100% - var(--circle-diameter));
          background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjAiIHdpZHRoPSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj4KICAgIDxwYXRoIGZpbGw9IiNmZmYiCiAgICAgICAgZD0iTTQuMiAyLjVsLS43IDEuOC0xLjguNyAxLjguNy43IDEuOC42LTEuOEw2LjcgNWwtMS45LS43LS42LTEuOHptMTUgOC4zYTYuNyA2LjcgMCAxMS02LjYtNi42IDUuOCA1LjggMCAwMDYuNiA2LjZ6IiAvPgo8L3N2Zz4=");
        }

        .ui-switch input:active+.slider .circle::before {
          -webkit-transition: 0s;
          -o-transition: 0s;
          transition: 0s;
          opacity: 1;
          width: 0;
          height: 0;
        }
        
        @media (max-width: 1024px) {
          .nav-container {
            padding: 0 15px;
          }
          
          .nav-logo {
            font-size: 20px;
          }
          
          .nav-links {
            gap: 25px;
          }
          
          .nav-links button {
            font-size: 15px;
          }
        }
        
        @media (max-width: 768px) {
          .navbar {
            padding: 15px 0;
          }
          
          .nav-container {
            padding: 0 15px;
          }
          
          .nav-logo {
            font-size: 18px;
          }
          
          .nav-links {
            gap: 20px;
          }
          
          .nav-links button {
            font-size: 14px;
          }
          
          .ui-switch {
            --switch-width: 44px;
            --switch-height: 18px;
            --circle-diameter: 28px;
          }
        }
        
        @media (max-width: 600px) {
          .nav-container {
            padding: 0 12px;
          }
          
          .nav-logo {
            font-size: 16px;
          }
          
          .nav-links {
            gap: 15px;
          }
          
          .nav-links button {
            font-size: 13px;
          }
          
          .ui-switch {
            --switch-width: 40px;
            --switch-height: 16px;
            --circle-diameter: 24px;
          }
        }
        
        @media (max-width: 480px) {
          .navbar {
            padding: 12px 0;
          }
          
          .nav-container {
            padding: 0 10px;
          }
          
          .nav-logo {
            font-size: 15px;
          }
          
          .nav-links {
            gap: 12px;
          }
          
          .nav-links button {
            font-size: 12px;
          }
          
          .ui-switch {
            --switch-width: 36px;
            --switch-height: 14px;
            --circle-diameter: 22px;
          }
        }
        
        @media (max-width: 414px) {
          .nav-container {
            padding: 0 8px;
          }
          
          .nav-logo {
            font-size: 14px;
          }
          
          .nav-links {
            gap: 10px;
          }
          
          .nav-links button {
            font-size: 11px;
          }
          
          .ui-switch {
            --switch-width: 32px;
            --switch-height: 12px;
            --circle-diameter: 20px;
          }
        }
        
        @media (max-width: 375px) {
          .navbar {
            padding: 10px 0;
          }
          
          .nav-container {
            padding: 0 6px;
          }
          
          .nav-logo {
            font-size: 13px;
          }
          
          .nav-links {
            gap: 8px;
          }
          
          .nav-links button {
            font-size: 10px;
          }
          
          .ui-switch {
            --switch-width: 30px;
            --switch-height: 10px;
            --circle-diameter: 18px;
          }
        }
        
        @media (max-width: 360px) {
          .nav-container {
            padding: 0 5px;
          }
          
          .nav-logo {
            font-size: 12px;
          }
          
          .nav-links {
            gap: 6px;
          }
          
          .nav-links button {
            font-size: 9px;
          }
          
          .ui-switch {
            --switch-width: 28px;
            --switch-height: 9px;
            --circle-diameter: 16px;
          }
        }
        
        @media (max-width: 320px) {
          .navbar {
            padding: 8px 0;
          }
          
          .nav-container {
            padding: 0 4px;
          }
          
          .nav-logo {
            font-size: 11px;
          }
          
          .nav-links {
            gap: 4px;
          }
          
          .nav-links button {
            font-size: 8px;
          }
          
          .ui-switch {
            --switch-width: 26px;
            --switch-height: 8px;
            --circle-diameter: 14px;
          }
        }
      `}</style>
    </motion.nav>
  );
};

export default Navbar;