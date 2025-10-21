import React, { useState, useEffect } from 'react';

const TypewriterText = ({ texts, speed = 100, deleteSpeed = 50, pauseTime = 2000, theme = 'light' }) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!texts || texts.length === 0) return;
    
    const timeout = setTimeout(() => {
      const fullText = texts[currentTextIndex];
      
      if (!fullText) return;
      
      if (isDeleting) {
        setCurrentText(fullText.substring(0, currentText.length - 1));
      } else {
        setCurrentText(fullText.substring(0, currentText.length + 1));
      }

      if (!isDeleting && currentText === fullText) {
        setTimeout(() => setIsDeleting(true), pauseTime);
      } else if (isDeleting && currentText === '') {
        setIsDeleting(false);
        setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
      }
    }, isDeleting ? deleteSpeed : speed);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentTextIndex, texts, speed, deleteSpeed, pauseTime]);

  if (!texts || texts.length === 0) {
    return <span className="typewriter-text">Full-Stack Engineer</span>;
  }

  return (
    <span className="typewriter-text">
      {currentText}
      <span 
        className="cursor"
        style={{ color: theme === 'dark' ? '#e3e5e6' : '#000000' }}
      >|</span>
    </span>
  );
};

export default TypewriterText;
