import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import TypewriterText from './TypewriterText';
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';

const Intro = ({ theme }) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const isResizingRef = useRef(false);
  const resizeTimeoutRef = useRef(null);
  const dispersalBoostRef = useRef(false);
  const dispersalTimeoutRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      isResizingRef.current = true;
      
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
      
      resizeTimeoutRef.current = setTimeout(() => {
        isResizingRef.current = false;
        
        dispersalBoostRef.current = true;
        
        if (dispersalTimeoutRef.current) {
          clearTimeout(dispersalTimeoutRef.current);
        }
        
        dispersalTimeoutRef.current = setTimeout(() => {
          dispersalBoostRef.current = false;
        }, 8000);
      }, 150);
      adjustParticleCount();
    };
    
    const adjustParticleCount = () => {
      const currentParticleCount = particlesRef.current.length;
      let targetParticleCount;
      
      if (window.innerWidth <= 375) {
        targetParticleCount = 40;
      } else if (window.innerWidth <= 480) {
        targetParticleCount = 60;
      } else if (window.innerWidth <= 768) {
        targetParticleCount = 80;
      } else if (window.innerWidth <= 1024) {
        targetParticleCount = 100;
      } else if (window.innerWidth <= 1366) {
        targetParticleCount = 120;
      } else {
        targetParticleCount = 150;
      }
      
      if (targetParticleCount > currentParticleCount) {
        for (let i = currentParticleCount; i < targetParticleCount; i++) {
          particlesRef.current.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.6,
            vy: (Math.random() - 0.5) * 0.6,
            size: Math.random() * 4 + 1,
            opacity: Math.random() * 0.6 + 0.2,
            originalSize: Math.random() * 4 + 1,
            pulseSpeed: Math.random() * 0.02 + 0.01
          });
        }
      }
      else if (targetParticleCount < currentParticleCount) {
        particlesRef.current = particlesRef.current.slice(0, targetParticleCount);
      }
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const initParticles = () => {
      particlesRef.current = [];
      
      let particleCount;
      if (window.innerWidth <= 375) {
        particleCount = 40;
      } else if (window.innerWidth <= 480) {
        particleCount = 60;
      } else if (window.innerWidth <= 768) {
        particleCount = 80;
      } else if (window.innerWidth <= 1024) {
        particleCount = 100;
      } else if (window.innerWidth <= 1366) {
        particleCount = 120;
      } else {
        particleCount = 150;
      }
      
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.6,
          vy: (Math.random() - 0.5) * 0.6,
          size: Math.random() * 4 + 1,
          opacity: Math.random() * 0.6 + 0.2,
          originalSize: Math.random() * 4 + 1,
          pulseSpeed: Math.random() * 0.02 + 0.01
        });
      }
    };

    initParticles();

    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particlesRef.current.forEach((particle, index) => {
        let speedMultiplier = 1.0;
        if (isResizingRef.current) {
          speedMultiplier = 3.0;
        } else if (dispersalBoostRef.current) {
          speedMultiplier = 4.0;
        }
        
        particle.x += particle.vx * speedMultiplier;
        particle.y += particle.vy * speedMultiplier;
        
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.vx *= -1;
          particle.x = Math.max(0, Math.min(canvas.width, particle.x));
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.vy *= -1;
          particle.y = Math.max(0, Math.min(canvas.height, particle.y));
        }
        
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) {
          const force = (150 - distance) / 150;
          let attractionForce = 0.02;
          if (isResizingRef.current) {
            attractionForce = 0.06;
          } else if (dispersalBoostRef.current) {
            attractionForce = 0.08;
          }
          particle.x += dx * force * attractionForce;
          particle.y += dy * force * attractionForce;
          
          particle.size = particle.originalSize + force * 1;
          particle.opacity = Math.min(0.8, particle.opacity + force * 0.1);
        } else {
          particle.size = particle.originalSize + Math.sin(Date.now() * particle.pulseSpeed) * 0.5;
          particle.opacity = Math.random() * 0.6 + 0.2;
        }
        
        if (dispersalBoostRef.current) {
          particlesRef.current.forEach((otherParticle, otherIndex) => {
            if (index !== otherIndex) {
              const dx = particle.x - otherParticle.x;
              const dy = particle.y - otherParticle.y;
              const distance = Math.sqrt(dx * dx + dy * dy);
              
              if (distance < 100 && distance > 0) {
                const pushForce = (100 - distance) / 100 * 0.6;
                const pushX = (dx / distance) * pushForce;
                const pushY = (dy / distance) * pushForce;
                
                particle.x += pushX;
                particle.y += pushY;
              }
            }
          });
        }
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        
        ctx.shadowBlur = particle.size * 2;
        ctx.shadowColor = theme === 'dark' ? 'rgba(227, 229, 230, 0.5)' : 'rgba(51, 51, 51, 0.3)';
        
        ctx.fillStyle = theme === 'dark' ? `rgba(227, 229, 230, ${particle.opacity})` : `rgba(51, 51, 51, ${particle.opacity})`;
        ctx.fill();
        
        ctx.shadowBlur = 0;
      });
      
      const connections = [];
      
      particlesRef.current.forEach((particle, i) => {
        particlesRef.current.forEach((otherParticle, j) => {
          if (i < j) {
            const dx = particle.x - otherParticle.x;
            const dy = particle.y - otherParticle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 120) {
              connections.push({
                particle1: particle,
                particle2: otherParticle,
                distance: distance,
                opacity: Math.max(0.1, (120 - distance) / 120 * 0.5)
              });
            }
          }
        });
      });
      
      connections.forEach(connection => {
        const { particle1, particle2, opacity } = connection;
        
        const mouseDx1 = particle1.x - mouseRef.current.x;
        const mouseDy1 = particle1.y - mouseRef.current.y;
        const mouseDx2 = particle2.x - mouseRef.current.x;
        const mouseDy2 = particle2.y - mouseRef.current.y;
        const mouseDistance1 = Math.sqrt(mouseDx1 * mouseDx1 + mouseDy1 * mouseDy1);
        const mouseDistance2 = Math.sqrt(mouseDx2 * mouseDx2 + mouseDy2 * mouseDy2);
        
        let enhancedOpacity = opacity;
        let lineWidth = 1;
        let hasGlow = false;
        
        if (mouseDistance1 < 150 || mouseDistance2 < 150) {
          enhancedOpacity = Math.min(0.9, opacity + 0.4);
          lineWidth = 2;
          hasGlow = true;
        }
        
        ctx.beginPath();
        ctx.moveTo(particle1.x, particle1.y);
        ctx.lineTo(particle2.x, particle2.y);
        
        if (hasGlow) {
          ctx.shadowBlur = 4;
          ctx.shadowColor = theme === 'dark' ? 'rgba(227, 229, 230, 0.4)' : 'rgba(51, 51, 51, 0.3)';
        }
        
        ctx.strokeStyle = theme === 'dark' ? `rgba(227, 229, 230, ${enhancedOpacity})` : `rgba(51, 51, 51, ${enhancedOpacity})`;
        ctx.lineWidth = lineWidth;
        ctx.stroke();
        
        ctx.shadowBlur = 0;
      });
      
      const cursorParticle = {
        x: mouseRef.current.x,
        y: mouseRef.current.y,
        size: 8
      };
      
      particlesRef.current.forEach(particle => {
        const dx = cursorParticle.x - particle.x;
        const dy = cursorParticle.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) {
          const baseOpacity = (150 - distance) / 150 * 0.6;
          let opacity = baseOpacity;
          if (isResizingRef.current) {
            opacity = Math.min(1.0, baseOpacity * 1.5);
          } else if (dispersalBoostRef.current) {
            opacity = Math.min(0.9, baseOpacity * 1.3);
          }
          
          ctx.beginPath();
          ctx.moveTo(cursorParticle.x, cursorParticle.y);
          ctx.lineTo(particle.x, particle.y);
          
          const glowBlur = isResizingRef.current ? 10 : (dispersalBoostRef.current ? 8 : 6);
          ctx.shadowBlur = glowBlur;
          ctx.shadowColor = theme === 'dark' ? 'rgba(227, 229, 230, 0.6)' : 'rgba(51, 51, 51, 0.4)';
          
          ctx.strokeStyle = theme === 'dark' ? `rgba(227, 229, 230, ${opacity})` : `rgba(51, 51, 51, ${opacity})`;
          const lineWidth = isResizingRef.current ? 3 : (dispersalBoostRef.current ? 2.5 : 2);
          ctx.lineWidth = lineWidth;
          ctx.stroke();
          
          ctx.shadowBlur = 0;
        }
      });
      
      ctx.beginPath();
      ctx.arc(cursorParticle.x, cursorParticle.y, cursorParticle.size, 0, Math.PI * 2);
      ctx.shadowBlur = 10;
      ctx.shadowColor = theme === 'dark' ? 'rgba(227, 229, 230, 0.8)' : 'rgba(51, 51, 51, 0.5)';
      ctx.fillStyle = theme === 'dark' ? 'rgba(227, 229, 230, 0.3)' : 'rgba(51, 51, 51, 0.2)';
      ctx.fill();
      ctx.shadowBlur = 0;
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
      if (dispersalTimeoutRef.current) {
        clearTimeout(dispersalTimeoutRef.current);
      }
    };
  }, [theme]);

  const scrollToAbout = () => {
    const element = document.getElementById('about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const downloadResume = (event) => {
    if (event.target.checked) {
      const link = document.createElement('a');
      link.href = '/Resume.pdf';
      link.download = 'Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setTimeout(() => {
        event.target.checked = false;
      }, 4000);
    }
  };

  return (
    <section className="intro-section">
      <canvas
        ref={canvasRef}
        className="particles-canvas"
      />
      
      <div className="intro-content">
        <motion.h1
          className="intro-name"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Nyan Aung
        </motion.h1>
        
        <motion.div
          className="intro-subtitle"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <TypewriterText 
            texts={[
              "Full-Stack Engineer",
              "Software Engineer",
              "Backend Engineer",
              "Frontend Engineer"
            ]}
            speed={80}
            deleteSpeed={40}
            pauseTime={2000}
            theme={theme}
          />
        </motion.div>

                <motion.div
                  className="social-icons"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.2 }}
                >
                  <motion.a
                    href="#"
                    className="social-icon"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaLinkedin />
                  </motion.a>
                  <motion.a
                    href="https://github.com/nyanaung23"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaGithub />
                  </motion.a>
                  <motion.a
                    href="mailto:nyan.wl.aung@gmail.com"
                    className="social-icon"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaEnvelope />
                  </motion.a>
                </motion.div>

                <motion.div
                  className="resume-download-container"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.4 }}
                  style={{ marginTop: '20px' }}
                >
                  <label className="resume-download-label">
                    <input 
                      type="checkbox" 
                      className="resume-download-input" 
                      onChange={downloadResume}
                    />
                    <span className="resume-download-circle">
                      <svg
                        className="resume-download-icon"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M12 19V5m0 14-4-4m4 4 4-4"
                        />
                      </svg>
                      <div className="resume-download-square"></div>
                    </span>
                    <p className="resume-download-title">Resume</p>
                    <p className="resume-download-title">Resume</p>
                  </label>
                </motion.div>
      </div>

      <motion.div
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        onClick={scrollToAbout}
      >
        <div className="scrolldown" style={{'--color': theme === 'dark' ? '#e3e5e6' : '#333333'}}>
          <div className="chevrons">
            <div className="chevrondown"></div>
            <div className="chevrondown"></div>
          </div>
        </div>
      </motion.div>

      <style jsx>{`
                .intro-section {
                  height: 100vh;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  position: relative;
                  background: ${theme === 'dark' ? 'linear-gradient(135deg, #042a1c 0%, #042a1c 100%)' : 'linear-gradient(135deg, #EEEEEE 0%, #EEEEEE 100%)'};
                  overflow: hidden;
                }
        
        .particles-canvas {
          position: absolute !important;
          top: 0 !important;
          left: 0 !important;
          width: 100% !important;
          height: 100% !important;
          z-index: 1 !important;
          pointer-events: none;
        }
        
                .intro-content {
                  text-align: center;
                  z-index: 10;
                  position: relative;
                  transform: translateY(-20px);
                }
        
        .intro-name {
          font-family: 'Chiron Sung HK', serif;
          font-size: 170px;
          font-weight: 900;
          color: ${theme === 'dark' ? '#e3e5e6' : '#000000'};
          margin-bottom: 20px;
        }
        
        .intro-subtitle {
          font-family: 'Inter', sans-serif;
          font-size: 48px;
          font-weight: 700;
          color: ${theme === 'dark' ? '#e3e5e6' : '#000000'};
          opacity: 0.9;
          max-width: 600px;
          margin: 0 auto 40px auto;
          min-height: 50px;
        }
        
        .social-icons {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 30px;
          margin-top: 20px;
        }
        
        .social-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: ${theme === 'dark' ? 'rgba(227, 229, 230, 0.1)' : 'rgba(0, 0, 0, 0.1)'} !important;
          color: ${theme === 'dark' ? '#e3e5e6' : '#000000'} !important;
          text-decoration: none;
          font-size: 20px;
          transition: all 0.3s ease;
          border: 2px solid ${theme === 'dark' ? 'rgba(227, 229, 230, 0.3)' : 'rgba(0, 0, 0, 0.3)'} !important;
        }
        
        .social-icon:hover {
          background: ${theme === 'dark' ? 'rgba(227, 229, 230, 0.2)' : 'rgba(0, 0, 0, 0.2)'} !important;
          border-color: ${theme === 'dark' ? '#e3e5e6' : '#000000'} !important;
          box-shadow: 0 4px 15px ${theme === 'dark' ? 'rgba(227, 229, 230, 0.3)' : 'rgba(0, 0, 0, 0.3)'} !important;
        }
        
        .resume-download-container {
          padding: 0;
          margin: 0;
          box-sizing: border-box;
          font-family: Arial, Helvetica, sans-serif;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        
        .resume-download-label {
          background-color: transparent;
          border: 2px solid ${theme === 'dark' ? '#e3e5e6' : '#000000'};
          display: flex;
          align-items: center;
          border-radius: 50px;
          width: 140px;
          cursor: pointer;
          transition: all 0.4s ease;
          padding: 5px;
          position: relative;
        }
        
        .resume-download-label:hover {
          background: ${theme === 'dark' ? 'rgba(227, 229, 230, 0.2)' : 'rgba(0, 0, 0, 0.2)'};
          border-color: ${theme === 'dark' ? '#e3e5e6' : '#000000'};
          box-shadow: 0 4px 15px ${theme === 'dark' ? 'rgba(227, 229, 230, 0.3)' : 'rgba(0, 0, 0, 0.3)'};
        }
        
        .resume-download-label::before {
          content: "";
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          background-color: ${theme === 'dark' ? '#e3e5e6' : '#000000'};
          width: 8px;
          height: 8px;
          transition: all 0.4s ease;
          border-radius: 100%;
          margin: auto;
          opacity: 0;
          visibility: hidden;
        }
        
        .resume-download-input {
          display: none;
        }
        
        .resume-download-title {
          font-size: 18px;
          color: ${theme === 'dark' ? '#e3e5e6' : '#000000'};
          transition: all 0.4s ease;
          position: absolute;
          right: 18px;
          bottom: 14px;
          text-align: center;
        }
        
        .resume-download-title:last-child {
          opacity: 0;
          visibility: hidden;
        }
        
        .resume-download-circle {
          height: 40px;
          width: 40px;
          border-radius: 50%;
          background-color: ${theme === 'dark' ? '#e3e5e6' : '#000000'};
          display: flex;
          justify-content: center;
          align-items: center;
          transition: all 0.4s ease;
          position: relative;
          box-shadow: 0 0 0 0 ${theme === 'dark' ? 'rgba(211, 211, 211, 0.7)' : 'rgba(0, 0, 0, 0.7)'};
          overflow: hidden;
        }
        
        .resume-download-icon {
          color: #fff;
          width: 25px;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          transition: all 0.4s ease;
        }
        
        .resume-download-square {
          aspect-ratio: 1;
          width: 12px;
          border-radius: 2px;
          background-color: #fff;
          opacity: 0;
          visibility: hidden;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          transition: all 0.4s ease;
        }
        
        .resume-download-circle::before {
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          background-color: ${theme === 'dark' ? '#D3D3D3' : '#333333'};
          width: 100%;
          height: 0;
          transition: all 0.4s ease;
        }
        
        .resume-download-label:has(.resume-download-input:checked) {
          width: 55px;
          animation: resumeInstalled 0.4s ease 3.5s forwards;
        }
        
        .resume-download-label:has(.resume-download-input:checked)::before {
          animation: resumeRotate 3s ease-in-out 0.4s forwards;
        }
        
        .resume-download-input:checked + .resume-download-circle {
          animation:
            resumePulse 1s forwards,
            resumeCircleDelete 0.2s ease 3.5s forwards;
          rotate: 180deg;
        }
        
        .resume-download-input:checked + .resume-download-circle::before {
          animation: resumeInstalling 3s ease-in-out forwards;
        }
        
        .resume-download-input:checked + .resume-download-circle .resume-download-icon {
          opacity: 0;
          visibility: hidden;
        }
        
        .resume-download-input:checked ~ .resume-download-circle .resume-download-square {
          opacity: 1;
          visibility: visible;
        }
        
        .resume-download-input:checked ~ .resume-download-title {
          opacity: 0;
          visibility: hidden;
        }
        
        .resume-download-input:checked ~ .resume-download-title:last-child {
          animation: resumeShowResumeMessage 0.4s ease 3.5s forwards;
        }
        
        @keyframes resumePulse {
          0% {
            scale: 0.95;
            box-shadow: 0 0 0 0 ${theme === 'dark' ? 'rgba(211, 211, 211, 0.7)' : 'rgba(0, 0, 0, 0.7)'};
          }
          70% {
            scale: 1;
            box-shadow: 0 0 0 16px ${theme === 'dark' ? 'rgba(16, 185, 129, 0)' : 'rgba(0, 0, 0, 0)'};
          }
          100% {
            scale: 0.95;
            box-shadow: 0 0 0 0 ${theme === 'dark' ? 'rgba(16, 185, 129, 0)' : 'rgba(0, 0, 0, 0)'};
          }
        }
        
        @keyframes resumeInstalling {
          from {
            height: 0;
          }
          to {
            height: 100%;
          }
        }
        
        @keyframes resumeRotate {
          0% {
            transform: rotate(-90deg) translate(27px) rotate(0);
            opacity: 1;
            visibility: visible;
          }
          99% {
            transform: rotate(270deg) translate(27px) rotate(270deg);
            opacity: 1;
            visibility: visible;
          }
          100% {
            opacity: 0;
            visibility: hidden;
          }
        }
        
        @keyframes resumeInstalled {
          100% {
            width: 140px;
            border-color: ${theme === 'dark' ? '#10b981' : '#000000'};
          }
        }
        
        @keyframes resumeCircleDelete {
          100% {
            opacity: 0;
            visibility: hidden;
          }
        }
        
        @keyframes resumeShowResumeMessage {
          100% {
            opacity: 1;
            visibility: visible;
            right: 60px;
          }
        }
        
        .typewriter-text {
          display: inline-block;
        }
        
        .cursor {
          animation: blink 1s infinite;
          color: var(--accent-blue);
          font-weight: 400;
        }
        
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        
        .scroll-indicator {
          position: absolute;
          bottom: 40px;
          left: 50%;
          transform: translateX(-50%);
          cursor: pointer;
          z-index: 10;
        }
        
        .scrolldown {
          --sizeX: 30px;
          --sizeY: 50px;
          position: relative;
          width: var(--sizeX);
          height: var(--sizeY);
          margin-left: calc(var(--sizeX) / 2);
          border: calc(var(--sizeX) / 10) solid var(--color);
          border-radius: 50px;
          box-sizing: border-box;
          margin-bottom: 16px;
          cursor: pointer;
        }

        .scrolldown::before {
          content: "";
          position: absolute;
          bottom: 30px;
          left: 50%;
          width: 6px;
          height: 6px;
          margin-left: -3px;
          background-color: var(--color);
          border-radius: 100%;
          animation: scrolldown-anim 2s infinite;
          box-sizing: border-box;
          box-shadow: 0px -5px 3px 1px rgba(42, 84, 112, 0.4);
        }

        @keyframes scrolldown-anim {
          0% {
            opacity: 0;
            height: 6px;
          }

          40% {
            opacity: 1;
            height: 10px;
          }

          80% {
            transform: translate(0, 20px);
            height: 10px;
            opacity: 0;
          }

          100% {
            height: 3px;
            opacity: 0;
          }
        }

        .chevrons {
          padding: 6px 0 0 0;
          margin-left: -3px;
          margin-top: 48px;
          width: 30px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .chevrondown {
          margin-top: -6px;
          position: relative;
          border: solid var(--color);
          border-width: 0 3px 3px 0;
          display: inline-block;
          width: 10px;
          height: 10px;
          transform: rotate(45deg);
        }

        .chevrondown:nth-child(odd) {
          animation: pulse54012 500ms ease infinite alternate;
        }

        .chevrondown:nth-child(even) {
          animation: pulse54012 500ms ease infinite alternate 250ms;
        }

        @keyframes pulse54012 {
          from {
            opacity: 0;
          }

          to {
            opacity: 0.5;
          }
        }
        
        @media (max-width: 1920px) {
          .intro-name {
            font-size: 160px;
          }
          
          .intro-subtitle {
            font-size: 44px;
          }
        }
        
        @media (max-width: 1680px) {
          .intro-name {
            font-size: 150px;
          }
          
          .intro-subtitle {
            font-size: 42px;
          }
        }
        
        @media (max-width: 1440px) {
          .intro-name {
            font-size: 140px;
          }
          
          .intro-subtitle {
            font-size: 40px;
          }
        }
        
        @media (max-width: 1366px) {
          .intro-name {
            font-size: 130px;
          }
          
          .intro-subtitle {
            font-size: 38px;
          }
          
          .social-icons {
            gap: 25px;
          }
          
          .social-icon {
            width: 45px;
            height: 45px;
            font-size: 18px;
          }
          
          .resume-button {
            padding: 10px 20px;
            font-size: 15px;
          }
        }
        
        @media (max-width: 1280px) {
          .intro-name {
            font-size: 120px;
          }
          
          .intro-subtitle {
            font-size: 36px;
          }
        }
        
        @media (max-width: 1024px) {
          .intro-name {
            font-size: 90px;
          }
          
          .intro-subtitle {
            font-size: 28px;
          }
          
          .social-icons {
            gap: 20px;
          }
          
          .social-icon {
            width: 45px;
            height: 45px;
            font-size: 18px;
          }
          
          .resume-button {
            padding: 10px 20px;
            font-size: 14px;
          }
          
          .scroll-text {
            font-size: 13px;
          }
          
          .scroll-arrow {
            font-size: 22px;
          }
        }
        
        @media (max-width: 912px) {
          .intro-name {
            font-size: 80px;
          }
          
          .intro-subtitle {
            font-size: 26px;
          }
        }
        
        @media (max-width: 820px) {
          .intro-name {
            font-size: 75px;
          }
          
          .intro-subtitle {
            font-size: 24px;
          }
        }
        
        @media (max-width: 768px) {
          .intro-name {
            font-size: 85px;
          }
          
          .intro-subtitle {
            font-size: 26px;
            padding: 0 20px;
          }
          
          .social-icons {
            gap: 18px;
            flex-wrap: wrap;
            justify-content: center;
          }
          
          .social-icon {
            width: 42px;
            height: 42px;
            font-size: 17px;
          }
          
          .resume-button {
            padding: 9px 18px;
            font-size: 13px;
          }
          
          .scroll-indicator {
            bottom: 20px;
          }
          
          .scroll-text {
            font-size: 12px;
          }
          
          .scroll-arrow {
            font-size: 20px;
          }
        }
        
        @media (max-width: 667px) {
          .intro-name {
            font-size: 65px;
          }
          
          .intro-subtitle {
            font-size: 20px;
          }
        }
        
        @media (max-width: 600px) {
          .intro-name {
            font-size: 60px;
          }
          
          .intro-subtitle {
            font-size: 19px;
          }
        }
        
        @media (max-width: 540px) {
          .intro-name {
            font-size: 55px;
          }
          
          .intro-subtitle {
            font-size: 18px;
          }
        }
        
        @media (max-width: 480px) {
          .intro-name {
            font-size: 60px;
          }
          
          .intro-subtitle {
            font-size: 20px;
          }
          
          .social-icons {
            gap: 15px;
          }
          
          .social-icon {
            width: 40px;
            height: 40px;
            font-size: 16px;
          }
          
          .resume-button {
            padding: 8px 16px;
            font-size: 12px;
          }
          
          .scroll-text {
            font-size: 11px;
          }
          
          .scroll-arrow {
            font-size: 18px;
          }
        }
        
        @media (max-width: 414px) {
          .intro-name {
            font-size: 45px;
          }
          
          .intro-subtitle {
            font-size: 16px;
          }
        }
        
        @media (max-width: 390px) {
          .intro-name {
            font-size: 42px;
          }
          
          .intro-subtitle {
            font-size: 15px;
          }
        }
        
        @media (max-width: 375px) {
          .intro-name {
            font-size: 50px;
          }
          
          .intro-subtitle {
            font-size: 18px;
          }
          
          .social-icons {
            gap: 12px;
          }
          
          .social-icon {
            width: 38px;
            height: 38px;
            font-size: 15px;
          }
          
          .resume-button {
            padding: 7px 14px;
            font-size: 11px;
          }
          
          .scroll-text {
            font-size: 10px;
          }
          
          .scroll-arrow {
            font-size: 16px;
          }
        }
        
        @media (max-width: 360px) {
          .intro-name {
            font-size: 38px;
          }
          
          .intro-subtitle {
            font-size: 13px;
          }
        }
        
        @media (max-width: 320px) {
          .intro-name {
            font-size: 35px;
          }
          
          .intro-subtitle {
            font-size: 12px;
          }
          
          .social-icons {
            gap: 10px;
          }
          
          .social-icon {
            width: 35px;
            height: 35px;
            font-size: 14px;
          }
          
          .resume-button {
            padding: 6px 12px;
            font-size: 10px;
          }
          
          .scroll-text {
            font-size: 9px;
          }
          
          .scroll-arrow {
            font-size: 14px;
          }
        }
      `}</style>
    </section>
  );
};

export default Intro;
