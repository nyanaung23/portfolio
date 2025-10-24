import React, { useMemo, useEffect, useRef } from 'react';
import './Projects.css';

const Projects = ({ theme }) => {
  const wrapperRef = useRef(null);
  const allWindowsRef = useRef([]);

  const sectionStyles = useMemo(() => ({
    '--paralaxY': '50%',
    '--projects-bg': theme === 'dark' ? 'linear-gradient(135deg, #042a1c 0%, #042a1c 100%)' : 'linear-gradient(135deg, #EEEEEE 0%, #EEEEEE 100%)',
    '--projects-title-color': theme === 'dark' ? '#e3e5e6' : '#000000',
  }), [theme]);

  const projects = useMemo(() => [
    { 
      id: 1, 
      title: 'Help N Seek', 
      description: 'Exclusive lost and found website for UCSD students with real time messaging and secure authentication, built using RESTful APIs, MongoDB, and JWT for safe peer to peer item recovery. Collaborated with two frontend engineers to integrate backend APIs with React frontend.',
      techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT'],
      color: '#4F46E5',
      githubUrl: 'https://github.com/Angelina-Yee/help-seek'
    },
    { 
      id: 2, 
      title: 'RPS-1', 
      description: 'Online multiplayer Rock Paper Scissors Minus One game inspired by Squid Game, where players pick two hands and subtract one before revealing. Built with Django Channels and React, featuring real-time WebSocket communication and lobby based matchmaking.',
      techStack: ['React', 'Python', 'Django', 'PostgreSQL', 'Docker'],
      color: '#059669',
      githubUrl: 'https://github.com/nyanaung23/rock-paper-scissors-minus1',
      liveUrl: 'https://rock-paper-scissors-minus1.vercel.app/'
    },
    { 
      id: 3, 
      title: 'Forest Flow - Pomodoro Timer', 
      description: 'Responsive Pomodoro timer with custom interval configuration, auto cycle progression, and persistent state management using vanilla JavaScript and LocalStorage.',
      techStack: ['JavaScript', 'HTML', 'CSS'],
      color: '#DC2626',
      githubUrl: 'https://github.com/Angelina-Yee/Forest_Flow',
      liveUrl: 'https://forestflow.netlify.app/pomodoro'
    },
    { 
      id: 4, 
      title: 'Portfolio Website', 
      description: 'Responsive React portfolio with custom animations and particle effects using Canvas API. Features smooth scroll navigation, dynamic theme system with CSS custom properties.',
      techStack: ['React', 'JavaScript', 'CSS', 'Framer Motion'],
      color: '#7C3AED',
      githubUrl: 'https://github.com/nyanaung23/portfolio'
    },
    { 
      id: 5, 
      title: 'Badminton Mesh', 
      description: 'Coming Soon',
      color: '#333333'
    }
  ], []);

  const getIconPath = (tech) => {
    const iconMap = {
      'React': '/icons/React.svg',
      'Node.js': '/icons/Node.js.svg',
      'Express': '/icons/Express.svg',
      'MongoDB': '/icons/MongoDB(color).svg',
      'JWT': '/icons/JWT.svg',
      'Python': '/icons/Python.svg',
      'Django': '/icons/Django.svg',
      'PostgreSQL': '/icons/PostgreSQL(color).svg',
      'Docker': '/icons/Docker(color).svg',
      'JavaScript': '/icons/JavaScript(color).svg',
      'HTML': '/icons/HTML5(color).svg',
      'CSS': '/icons/CSS3(color).svg',
      'Framer Motion': '/icons/Framer(color).svg'
    };
    return iconMap[tech] || null;
  };

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const allWindows = allWindowsRef.current;
    let isInHorizontalMode = false;
    let horizontalModeTimeout = null;

    const handleWheel = (e) => {
      if (e.deltaX !== 0) return;
      
      const isAtLeftEdge = wrapper.scrollLeft <= 10;
      const isAtRightEdge = wrapper.scrollLeft >= wrapper.scrollWidth - wrapper.clientWidth - 10;
      
      if ((isAtLeftEdge && e.deltaY < 0) || (isAtRightEdge && e.deltaY > 0)) {
        return;
      }
      
      const isInMiddle = !isAtLeftEdge && !isAtRightEdge;
      
      if (isInMiddle) {
        e.preventDefault();
        wrapper.scrollLeft += 8 * e.deltaY;
        isInHorizontalMode = true;
        
        if (horizontalModeTimeout) {
          clearTimeout(horizontalModeTimeout);
        }
        
        horizontalModeTimeout = setTimeout(() => {
          isInHorizontalMode = false;
        }, 150);
      }
    };

    const calculateParalax = (container, elem) => {
      const elemCenterX = elem.offsetLeft + (elem.offsetWidth / 2);
      const viewCenterX = container.scrollLeft + (container.offsetWidth / 2);
      const delta = elemCenterX - viewCenterX;
      const max = container.offsetWidth / 2 + elem.offsetWidth / 2;
      elem.style.setProperty('--paralaxX', (delta * 100 / max) + 50 + "%");
    };

    const handleScroll = (e) => {
      for (let i = 0; i < allWindows.length; i++) {
        calculateParalax(e.target, allWindows[i]);
      }
      
      const isAtLeftEdge = wrapper.scrollLeft <= 10;
      const isAtRightEdge = wrapper.scrollLeft >= wrapper.scrollWidth - wrapper.clientWidth - 10;
      
      wrapper.classList.toggle('at-left-edge', isAtLeftEdge);
      wrapper.classList.toggle('at-right-edge', isAtRightEdge);
    };

    const handleMouseMove = (e) => {
      const delta = e.clientY - (document.documentElement.offsetHeight / 2);
      const max = document.documentElement.offsetHeight * 2;
      document.documentElement.style.setProperty('--paralaxY', (delta * 100 / max) + 50 + "%");
    };


    wrapper.addEventListener('wheel', handleWheel);
    wrapper.addEventListener('scroll', handleScroll);
    document.documentElement.addEventListener('mousemove', handleMouseMove);


    wrapper.scrollLeft = wrapper.scrollWidth / 2 - wrapper.clientWidth / 2;
    return () => {
      wrapper.removeEventListener('wheel', handleWheel);
      wrapper.removeEventListener('scroll', handleScroll);
      document.documentElement.removeEventListener('mousemove', handleMouseMove);
      if (horizontalModeTimeout) {
        clearTimeout(horizontalModeTimeout);
      }
    };
  }, []);

  return (
    <section 
      id="projects" 
      className="projects-section"
      style={sectionStyles}
    >
      <div className="projects-container">
        <div className="projects-content">
          <div className="projects-header">
            <h2 className="projects-title">
              Projects
            </h2>
          </div>
          
          <div id="wrapper" ref={wrapperRef}>
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="window"
                ref={el => allWindowsRef.current[index] = el}
                style={{
                  '--paralaxX': '50%',
                  backgroundColor: project.color,
                  background: `linear-gradient(135deg, ${project.color} 0%, ${project.color}dd 100%)`
                }}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  
                  const window = e.currentTarget;
                  
                  if (window.classList.contains('selected')) {
                    window.classList.remove('selected');
                  } else {
                    allWindowsRef.current.forEach(w => w.classList.remove('selected'));
                    window.classList.add('selected');
                  }
                }}
              >
                <div className="window-content">
                  <h3 className="project-title">{project.title}</h3>
                  {(project.githubUrl || project.liveUrl) && (
                    <div className="project-links">
                      {project.githubUrl && (
                        <a 
                          href={project.githubUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="project-link github-link"
                          onClick={(e) => e.stopPropagation()}
                          title="View on GitHub"
                        >
                          <img src="/icons/GitHub.svg" alt="GitHub" className="link-icon" />
                        </a>
                      )}
                      {project.liveUrl && (
                        <a 
                          href={project.liveUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="project-link live-link"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <span>Live</span>
                        </a>
                      )}
                      <a 
                        href="#"
                        className="project-link details-link"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                        }}
                      >
                        <span>Project Details</span>
                      </a>
                    </div>
                  )}
                  {project.description && (
                    <p className="project-description">{project.description}</p>
                  )}
                  {project.techStack && (
                    <div className="tech-stack">
                      {project.techStack.map((tech, index) => (
                        <div key={index} className="tech-icon">
                          <img 
                            src={getIconPath(tech)} 
                            alt={tech}
                            title={tech}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;