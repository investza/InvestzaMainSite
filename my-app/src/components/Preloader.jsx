import React, { useEffect, useState } from 'react';
import preloaderImage from './preloader_comp.png';

const Preloader = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [assetsLoaded, setAssetsLoaded] = useState(false);

  useEffect(() => {
    const styleTag = document.createElement('style');
    styleTag.setAttribute('data-preloader-styles', 'true');
    styleTag.innerHTML = `
      .preloader-wrapper {
        position: fixed;
        inset: 0;
        width: 100vw;
        height: 100vh;
        background: #ffffff;
        z-index: 9999;
        overflow: hidden;
        pointer-events: none;
      }

      .preloader-image-container {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        transform-origin: 52% 57%;
      }

      .preloader-image-container.loaded {
        animation: preloaderZoomIn 4500ms cubic-bezier(0.65, 0, 0.35, 1) forwards;
      }

      .preloader-loading-text {
        position: fixed;
        bottom: 10%;
        left: 50%;
        transform: translateX(-50%);
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
        font-size: 1.5rem;
        font-weight: 600;
        color: #ffffff;
        text-align: center;
        z-index: 10000;
        mix-blend-mode: difference;
        opacity: 1;
        transition: opacity 1s ease-out;
      }

      .preloader-loading-text.fade-out {
        opacity: 0;
      }

      .preloader-image {
        width: 100vw;
        height: 100vh;
        object-fit: cover;
        user-select: none;
        pointer-events: none;
        transform: scale(1);
      }

      @keyframes preloaderBackgroundFade {
        0% {
          background: #ffffff;
        }
        26.67% {
          background: #ffffff;
        }
        44.44% {
          background: transparent;
        }
        100% {
          background: transparent;
        }
      }

      @keyframes preloaderBackgroundFadePaused {
        0% {
          background: #ffffff;
        }
        63.16% {
          background: #ffffff;
        }
        100% {
          background: transparent;
        }
      }

      .preloader-wrapper.paused {
        animation: preloaderBackgroundFadePaused 1900ms ease-out forwards;
        animation-play-state: paused;
      }

      .preloader-wrapper.loaded {
        animation: preloaderBackgroundFade 4500ms ease-out forwards;
      }

      @keyframes preloaderZoomIn {
        0% {
          transform: scale(1);
        }
        44.44% {
          transform: scale(1);
        }
        100% {
          transform: scale(120);
        }
      }

      @media (max-width: 1024px) {
        .preloader-image-container {
          transform-origin: 52% 56%;
        }

        .preloader-loading-text {
          font-size: 1.3rem;
        }

        @keyframes preloaderZoomIn {
          0% {
            transform: scale(1);
          }
          44.44% {
            transform: scale(1);
          }
          100% {
            transform: scale(120);
          }
        }
      }

      @media (max-width: 768px) {
        .preloader-image-container {
          transform-origin: 52% 56%;
        }

        .preloader-loading-text {
          font-size: 1.1rem;
        }

        @keyframes preloaderZoomIn {
          0% {
            transform: scale(1);
          }
          44.44% {
            transform: scale(1);
          }
          100% {
            transform: scale(100);
          }
        }
      }

      @media (max-width: 480px) {
        .preloader-image-container {
          transform-origin: 52% 52.28%;
        }

        .preloader-image-container::before,
        .preloader-image-container::after {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          height: 35vh;
          background: #08090A;
          z-index: 1;
        }

        .preloader-image-container::before {
          top: 0;
        }

        .preloader-image-container::after {
          bottom: 0;
        }

        .preloader-image {
          object-fit: contain;
        }

        .preloader-loading-text {
          font-size: 1rem;
          bottom: 8%;
          z-index: 2;
        }

        @keyframes preloaderZoomIn {
          0% {
            transform: scale(1);
          }
          44.44% {
            transform: scale(1);
          }
          100% {
            transform: scale(150);
          }
        }
      }
    `;
    document.head.appendChild(styleTag);

    return () => {
      const existing = document.querySelector("style[data-preloader-styles='true']");
      if (existing) existing.remove();
    };
  }, []);

  useEffect(() => {
    let progressInterval;
    let loadComplete = false;

    // Animate progress from 0 to 100
    progressInterval = setInterval(() => {
      setLoadingProgress((prev) => {
        // If assets loaded, jump to 100
        if (loadComplete && prev < 100) {
          return 100;
        }
        
        // If not loaded yet, slow down near 95
        if (!loadComplete && prev >= 95) {
          return prev + 0.5;
        }
        
        // Normal increment
        const increment = prev < 60 ? 8 : prev < 80 ? 4 : 2;
        return Math.min(prev + increment, loadComplete ? 100 : 95);
      });
    }, 150);

    // Track actual asset loading
    const handleLoad = () => {
      loadComplete = true;
      setLoadingProgress(100);
      
      // Wait a bit then mark as loaded to trigger animation
      setTimeout(() => {
        setAssetsLoaded(true);
        
        // Complete animation after 4500ms total
        setTimeout(() => {
          setIsVisible(false);
          if (onComplete) {
            onComplete();
          }
        }, 4500);
      }, 300);
    };

    // Check if already loaded
    if (document.readyState === 'complete') {
      // Delay to show animation
      setTimeout(handleLoad, 500);
    } else {
      window.addEventListener('load', handleLoad);
    }

    return () => {
      clearInterval(progressInterval);
      window.removeEventListener('load', handleLoad);
    };
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div className={`preloader-wrapper ${assetsLoaded ? 'loaded' : 'paused'}`}>
      <div className={`preloader-image-container ${assetsLoaded ? 'loaded' : ''}`}>
        <img 
          src={preloaderImage} 
          alt="Investza" 
          className="preloader-image"
        />
      </div>
      <div className={`preloader-loading-text ${loadingProgress === 100 ? 'fade-out' : ''}`}>
        {loadingProgress}%
      </div>
    </div>
  );
};

export default Preloader;
