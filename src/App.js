import React, { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import SplashScreen from './components/SplashScreen';
import Intro from './components/Intro';
import Navbar from './components/Navbar';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }, [theme]);

  return (
    <div className="App">
      <AnimatePresence mode="wait">
        {isLoading && <SplashScreen />}
      </AnimatePresence>
      
      <AnimatePresence>
        {!isLoading && (
          <motion.div
            key="main-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Navbar theme={theme} toggleTheme={toggleTheme} />
            <Intro theme={theme} />
            <About theme={theme} />
            <Skills theme={theme} />
            <Projects theme={theme} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
