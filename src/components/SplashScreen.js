import React from 'react';
import { motion } from 'framer-motion';

const SplashScreen = () => {
  return (
    <motion.div
      className="splash-screen"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="splash-content">
            <motion.div
              className="loader-container"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                duration: 1.5, 
                ease: "easeOut",
                delay: 0.5 
              }}
            >
              <div className="liquid-loader">
                <div className="loading-title">
                  Loading Portfolio<span className="dot">.</span><span className="dot">.</span><span className="dot">.</span>
                </div>
                
                <div className="loader-track">
                  <div className="liquid-fill"></div>
                </div>
              </div>
            </motion.div>
      </div>
      
      <style jsx>{`
        .splash-screen {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: linear-gradient(135deg, #042a1c 0%, #042a1c 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
        }
        
        .splash-content {
          text-align: center;
          color: var(--text-light);
        }
        
            .loader-container {
              margin-bottom: 40px;
            }
            
            .liquid-loader {
              display: flex;
              flex-direction: column;
              align-items: center;
              gap: 40px;
              padding: 20px;
              font-family: 'Chiron Sung HK', serif;
            }
            
            .loading-title {
              color: #e3e5e6;
              font-size: 42px;
              font-weight: 700;
              letter-spacing: 3px;
              text-align: center;
              animation: titleGlow 2s ease-in-out infinite;
              text-shadow: 0 0 20px rgba(13, 79, 60, 0.5);
            }
            
            .loader-track {
              position: relative;
              width: 800px;
              height: 50px;
              background: linear-gradient(135deg, #0a2e1f, #1a4a35);
              border-radius: 25px;
              overflow: hidden;
              box-shadow:
                inset 0 2px 4px rgba(0, 0, 0, 0.6),
                0 1px 3px rgba(227, 229, 230, 0.1);
            }

            .liquid-fill {
              position: absolute;
              top: 2px;
              left: 2px;
              height: calc(100% - 4px);
              background: linear-gradient(90deg, #0d4f3c, #1a5f4a, #2d6b58, #407766);
              border-radius: 23px;
              animation:
                fillProgress 4s ease-out forwards,
                colorShift 3s linear infinite;
              box-shadow:
                0 0 12px rgba(26, 95, 74, 0.4),
                inset 0 1px 2px rgba(227, 229, 230, 0.2);
            }
            
            .dot {
              margin-left: 5px;
              animation: blink 1.5s infinite;
            }
            .dot:nth-of-type(1) {
              animation-delay: 0s;
            }
            .dot:nth-of-type(2) {
              animation-delay: 0.3s;
            }
            .dot:nth-of-type(3) {
              animation-delay: 0.6s;
            }

            @keyframes fillProgress {
              0% {
                width: 4px;
              }
              10% {
                width: 8%;
              }
              20% {
                width: 18%;
              }
              30% {
                width: 30%;
              }
              40% {
                width: 45%;
              }
              50% {
                width: 60%;
              }
              60% {
                width: 72%;
              }
              70% {
                width: 82%;
              }
              80% {
                width: 90%;
              }
              90% {
                width: 96%;
              }
              100% {
                width: calc(100% - 4px);
              }
            }

            @keyframes colorShift {
              0% {
                filter: hue-rotate(0deg) brightness(1);
              }
              33% {
                filter: hue-rotate(120deg) brightness(1.1);
              }
              66% {
                filter: hue-rotate(240deg) brightness(0.9);
              }
              100% {
                filter: hue-rotate(360deg) brightness(1);
              }
            }

            @keyframes titleGlow {
              0%,
              100% {
                opacity: 0.8;
                text-shadow: 0 0 20px rgba(13, 79, 60, 0.5);
              }
              50% {
                opacity: 1;
                text-shadow: 0 0 30px rgba(13, 79, 60, 0.8);
              }
            }


            @keyframes blink {
              0%,
              50% {
                opacity: 1;
              }
              51%,
              100% {
                opacity: 0;
              }
            }
        
        @media (max-width: 768px) {
          .liquid-loader {
            gap: 20px;
          }
          
          .loading-title {
            font-size: 20px;
            letter-spacing: 1px;
          }
          
          .loader-track {
            width: 300px;
            height: 30px;
          }
          
          .liquid-fill {
            border-radius: 14px;
          }
        }
        
        @media (max-width: 480px) {
          .liquid-loader {
            gap: 15px;
          }
          
          .loading-title {
            font-size: 16px;
            letter-spacing: 0.5px;
          }
          
          .loader-track {
            width: 250px;
            height: 25px;
          }
          
          .liquid-fill {
            border-radius: 12px;
          }
        }
        
        @media (max-width: 360px) {
          .liquid-loader {
            gap: 12px;
          }
          
          .loading-title {
            font-size: 14px;
            letter-spacing: 0px;
          }
          
          .loader-track {
            width: 200px;
            height: 20px;
          }
          
          .liquid-fill {
            border-radius: 10px;
          }
        }
      `}</style>
    </motion.div>
  );
};

export default SplashScreen;
