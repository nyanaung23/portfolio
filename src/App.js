import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import SplashScreen from './components/SplashScreen';
import Intro from './components/Intro';
import Navbar from './components/Navbar';

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

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="App">
      <AnimatePresence>
        {isLoading && <SplashScreen />}
      </AnimatePresence>
      
              {!isLoading && (
                <>
                  <Navbar theme={theme} toggleTheme={toggleTheme} />
                  <Intro theme={theme} />
                </>
              )}
    </div>
  );
}

export default App;
