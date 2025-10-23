import React, { useState, useEffect, useCallback, useMemo } from 'react';

const TypewriterText = ({ texts, speed = 100, deleteSpeed = 50, pauseTime = 2000, theme = 'light' }) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const memoizedTexts = useMemo(() => texts, [texts]);

  const updateText = useCallback(() => {
    if (!memoizedTexts || memoizedTexts.length === 0) return;
    
    const fullText = memoizedTexts[currentTextIndex];
    
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
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % memoizedTexts.length);
    }
  }, [currentText, isDeleting, currentTextIndex, memoizedTexts, pauseTime]);

  useEffect(() => {
    const timeout = setTimeout(updateText, isDeleting ? deleteSpeed : speed);
    return () => clearTimeout(timeout);
  }, [updateText, isDeleting, deleteSpeed, speed]);

  const cursorStyle = useMemo(() => ({
    color: theme === 'dark' ? '#e3e5e6' : '#000000'
  }), [theme]);

  if (!memoizedTexts || memoizedTexts.length === 0) {
    return <span className="typewriter-text">Full-Stack Engineer</span>;
  }

  return (
    <span className="typewriter-text">
      {currentText}
      <span 
        className="cursor"
        style={cursorStyle}
      >|</span>
    </span>
  );
};

export default TypewriterText;
