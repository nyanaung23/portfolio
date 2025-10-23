import React, { useEffect, useRef, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import TypewriterText from './TypewriterText';
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';
import './Intro.css';

const Intro = ({ theme }) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const isResizingRef = useRef(false);
  const resizeTimeoutRef = useRef(null);
  const dispersalBoostRef = useRef(false);
  const dispersalTimeoutRef = useRef(null);
  const lastFrameTimeRef = useRef(0);

  const getParticleCount = useCallback(() => {
    if (window.innerWidth <= 375) return 30;
    if (window.innerWidth <= 480) return 45;
    if (window.innerWidth <= 768) return 60;
    if (window.innerWidth <= 1024) return 75;
    if (window.innerWidth <= 1366) return 90;
    return 105;
  }, []);

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
      const targetParticleCount = getParticleCount();
      
      if (targetParticleCount > currentParticleCount) {
        const newParticles = [];
        for (let i = currentParticleCount; i < targetParticleCount; i++) {
          newParticles.push({
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
        particlesRef.current.push(...newParticles);
      }
      else if (targetParticleCount < currentParticleCount) {
        particlesRef.current = particlesRef.current.slice(0, targetParticleCount);
      }
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const initParticles = () => {
      particlesRef.current = [];
      const particleCount = getParticleCount();
      
      const particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push({
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
      particlesRef.current = particles;
    };

    initParticles();

    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = (currentTime) => {
      if (currentTime - lastFrameTimeRef.current < 16.67) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }
      lastFrameTimeRef.current = currentTime;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const particles = particlesRef.current;
      const mouseX = mouseRef.current.x;
      const mouseY = mouseRef.current.y;
      const isResizing = isResizingRef.current;
      const dispersalBoost = dispersalBoostRef.current;
      
      for (let index = 0; index < particles.length; index++) {
        const particle = particles[index];
        
        let speedMultiplier = 1.0;
        if (isResizing) {
          speedMultiplier = 3.0;
        } else if (dispersalBoost) {
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
        
        const dx = mouseX - particle.x;
        const dy = mouseY - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) {
          const force = (150 - distance) / 150;
          let attractionForce = 0.02;
          if (isResizing) {
            attractionForce = 0.06;
          } else if (dispersalBoost) {
            attractionForce = 0.08;
          }
          particle.x += dx * force * attractionForce;
          particle.y += dy * force * attractionForce;
          
          particle.size = particle.originalSize + force * 1;
          particle.opacity = Math.min(0.8, particle.opacity + force * 0.1);
        } else {
          particle.size = particle.originalSize + Math.sin(currentTime * particle.pulseSpeed) * 0.5;
          particle.opacity = Math.random() * 0.6 + 0.2;
        }
        
        if (dispersalBoost) {
          for (let otherIndex = 0; otherIndex < particles.length; otherIndex++) {
            if (index !== otherIndex) {
              const otherParticle = particles[otherIndex];
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
          }
        }
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        
        ctx.shadowBlur = particle.size * 2;
        ctx.shadowColor = theme === 'dark' ? 'rgba(227, 229, 230, 0.5)' : 'rgba(51, 51, 51, 0.3)';
        
        ctx.fillStyle = theme === 'dark' ? `rgba(227, 229, 230, ${particle.opacity})` : `rgba(51, 51, 51, ${particle.opacity})`;
        ctx.fill();
        
        ctx.shadowBlur = 0;
      }
      
      const connections = [];
      for (let i = 0; i < particles.length; i++) {
        const particle = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const otherParticle = particles[j];
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
      }
      
      for (let i = 0; i < connections.length; i++) {
        const connection = connections[i];
        const { particle1, particle2, opacity } = connection;
        
        const mouseDx1 = particle1.x - mouseX;
        const mouseDy1 = particle1.y - mouseY;
        const mouseDx2 = particle2.x - mouseX;
        const mouseDy2 = particle2.y - mouseY;
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
      }
      
      const cursorParticle = {
        x: mouseX,
        y: mouseY,
        size: 8
      };
      
      for (let i = 0; i < particles.length; i++) {
        const particle = particles[i];
        const dx = cursorParticle.x - particle.x;
        const dy = cursorParticle.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) {
          const baseOpacity = (150 - distance) / 150 * 0.6;
          let opacity = baseOpacity;
          if (isResizing) {
            opacity = Math.min(1.0, baseOpacity * 1.5);
          } else if (dispersalBoost) {
            opacity = Math.min(0.9, baseOpacity * 1.3);
          }
          
          ctx.beginPath();
          ctx.moveTo(cursorParticle.x, cursorParticle.y);
          ctx.lineTo(particle.x, particle.y);
          
          const glowBlur = isResizing ? 10 : (dispersalBoost ? 8 : 6);
          ctx.shadowBlur = glowBlur;
          ctx.shadowColor = theme === 'dark' ? 'rgba(227, 229, 230, 0.6)' : 'rgba(51, 51, 51, 0.4)';
          
          ctx.strokeStyle = theme === 'dark' ? `rgba(227, 229, 230, ${opacity})` : `rgba(51, 51, 51, ${opacity})`;
          const lineWidth = isResizing ? 3 : (dispersalBoost ? 2.5 : 2);
          ctx.lineWidth = lineWidth;
          ctx.stroke();
          
          ctx.shadowBlur = 0;
        }
      }
      
      ctx.beginPath();
      ctx.arc(cursorParticle.x, cursorParticle.y, cursorParticle.size, 0, Math.PI * 2);
      ctx.shadowBlur = 10;
      ctx.shadowColor = theme === 'dark' ? 'rgba(227, 229, 230, 0.8)' : 'rgba(51, 51, 51, 0.5)';
      ctx.fillStyle = theme === 'dark' ? 'rgba(227, 229, 230, 0.3)' : 'rgba(51, 51, 51, 0.2)';
      ctx.fill();
      ctx.shadowBlur = 0;
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animationRef.current = requestAnimationFrame(animate);

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
  }, [theme, getParticleCount]);

  const scrollToAbout = useCallback(() => {
    const element = document.getElementById('about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const downloadResume = useCallback((event) => {
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
  }, []);

  return (
    <section id="intro" className="intro-section">
      <canvas
        ref={canvasRef}
        className="particles-canvas"
      />
      
      <motion.div 
        className="intro-content"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <motion.h1
          className="intro-name"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
        >
          Nyan Aung
        </motion.h1>
        
        <motion.div
          className="intro-subtitle"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
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
          transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
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
          transition={{ duration: 0.8, delay: 1.4, ease: "easeOut" }}
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
      </motion.div>

             <div
        className="scroll-indicator"
        onClick={scrollToAbout}
             >
               <div className="container_mouse">
                 <span className="mouse-btn">
                   <span className="mouse-scroll"></span>
                 </span>
                 <span>Scroll Down</span>
          </div>
        </div>

    </section>
  );
};

export default Intro;