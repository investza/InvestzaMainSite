import { useEffect, useState } from "react";

const Preloader = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [assetsLoaded, setAssetsLoaded] = useState(false);
  const [isLiftingUp, setIsLiftingUp] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const [videoRef, setVideoRef] = useState(null);

  useEffect(() => {
    const styleTag = document.createElement("style");
    styleTag.setAttribute("data-preloader-styles", "true");
    styleTag.innerHTML = `
      .preloader-wrapper {
        position: fixed;
        inset: 0;
        width: 100vw;
        height: 100vh;
        background: #000000;
        z-index: 9999;
        overflow: hidden;
        pointer-events: none;
        transition: transform 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      }

      .preloader-wrapper.lifting {
        transform: translateY(-100vh);
      }

      .preloader-wrapper.fade-out {
        opacity: 0;
        transition: opacity 0.3s ease-out;
      }

      .preloader-video-container {
        position: absolute;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
      }

      .preloader-video {
        width: 100vw;
        height: 100vh;
        object-fit: cover;
        user-select: none;
        pointer-events: none;
        display: block;
      }



      .preloader-loading-text {
        position: fixed;
        bottom: 10%;
        left: 50%;
        transform: translateX(-50%);
        font-family: 'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        font-size: 1.5rem;
        font-weight: 600;
        color: #ffffff;
        text-align: center;
        z-index: 10000;
        opacity: 1;
        transition: opacity 0.5s ease-out;
      }

      .preloader-loading-text.fade-out {
        opacity: 0;
      }

      @media (max-width: 768px) {
        .preloader-loading-text {
          font-size: 1.2rem;
          bottom: 8%;
        }
      }

      @media (max-width: 480px) {
        .preloader-loading-text {
          font-size: 1rem;
          bottom: 6%;
        }
      }
    `;
    document.head.appendChild(styleTag);

    return () => {
      const existing = document.querySelector(
        "style[data-preloader-styles='true']"
      );
      if (existing) existing.remove();
    };
  }, []);

  useEffect(() => {
    let progressInterval;
    let assetsLoaded = false;

    // Animate progress from 0 to 100 based on asset loading
    progressInterval = setInterval(() => {
      setLoadingProgress((prev) => {
        // If assets are fully loaded, jump to 100
        if (assetsLoaded && prev < 100) {
          return 100;
        }

        // If assets not loaded yet, slow down near 95 and cap at 99
        if (!assetsLoaded && prev >= 95) {
          return Math.min(prev + 0.3, 99);
        }

        // Normal increment - smooth progression
        const increment = prev < 60 ? 5 : prev < 85 ? 3 : 1;
        return Math.min(prev + increment, assetsLoaded ? 100 : 95);
      });
    }, 150);

    // Comprehensive asset loading check
    const checkAllAssetsLoaded = () => {
      // Check document ready state
      const documentReady = document.readyState === "complete";

      // Check critical images only (hero section, not lazy-loaded carousel)
      const images = Array.from(document.images);
      const criticalImages = images.filter((img) => {
        const src = img.src || "";
        // Exclude lazy-loaded expert images (they'll load later)
        return !src.includes("expert") || src.includes("expert1");
      });
      const imagesLoaded =
        criticalImages.length === 0 ||
        criticalImages.every((img) => img.complete && img.naturalHeight !== 0);

      // Check only critical videos (hero videos, NOT carousel videos)
      const videos = Array.from(document.querySelectorAll("video"));
      const criticalVideos = videos.filter((video) => {
        const src = video.getAttribute("src") || "";
        // Only wait for hero videos, not carousel expert videos
        return src.includes("hero_vid.mp4") || src.includes("preloader");
      });
      const videosLoaded =
        criticalVideos.length === 0 ||
        criticalVideos.every((video) => {
          // Check if video is loaded (readyState >= 3 means HAVE_FUTURE_DATA)
          return video.readyState >= 3;
        });

      // Check all stylesheets are loaded
      const stylesheets = Array.from(document.styleSheets);
      const stylesheetsLoaded = stylesheets.every((sheet) => {
        try {
          return sheet.cssRules !== null;
        } catch (e) {
          return true; // Cross-origin stylesheets
        }
      });

      // More lenient check - just need document ready and critical assets
      return documentReady && imagesLoaded && videosLoaded && stylesheetsLoaded;
    };

    // Track actual asset loading
    const handleAssetsLoaded = () => {
      if (checkAllAssetsLoaded()) {
        assetsLoaded = true;
        // Assets are loaded, progress will jump to 100 in next interval
      }
    };

    // Check periodically for asset loading
    const assetCheckInterval = setInterval(() => {
      if (!assetsLoaded && checkAllAssetsLoaded()) {
        handleAssetsLoaded();
      }

      // When progress reaches 100% AND video has ended, start curtain lift
      if (loadingProgress >= 100 && videoEnded) {
        clearInterval(progressInterval);
        clearInterval(assetCheckInterval);

        // Brief pause to show 100%, then lift curtain
        setTimeout(() => {
          setAssetsLoaded(true);
          setIsLiftingUp(true);

          // Remove preloader AFTER curtain animation completes
          setTimeout(() => {
            setIsVisible(false);
            if (onComplete) {
              onComplete();
            }
          }, 1500); // Exact curtain animation duration
        }, 500);
      }
    }, 100);

    // Also listen for load event
    const loadHandler = () => {
      setTimeout(handleAssetsLoaded, 200);
    };

    // Check if already loaded
    if (checkAllAssetsLoaded()) {
      setTimeout(handleAssetsLoaded, 300);
    } else {
      window.addEventListener("load", loadHandler);
    }

    return () => {
      clearInterval(progressInterval);
      clearInterval(assetCheckInterval);
      window.removeEventListener("load", loadHandler);
    };
  }, [onComplete, loadingProgress, videoEnded]);

  // Determine which video to show based on screen size
  const getPreloaderVideo = () => {
    if (typeof window !== "undefined") {
      const isMobile = window.innerWidth <= 768;
      return isMobile
        ? "/preloaders/preloader_phone.mp4"
        : "/preloaders/preloader_desktop.mp4";
    }
    return "/preloaders/preloader_desktop.mp4";
  };

  const handleVideoRef = (video) => {
    if (video && video !== videoRef) {
      setVideoRef(video);
    }
  };

  const handleVideoEnded = () => {
    setVideoEnded(true);
    // Pause the video at the last frame (no white screen now!)
    if (videoRef) {
      videoRef.currentTime = videoRef.duration;
      videoRef.pause();
    }
  };

  if (!isVisible) return null;

  return (
    <div className={`preloader-wrapper ${isLiftingUp ? "lifting" : ""}`}>
      <div className="preloader-video-container">
        <video
          ref={handleVideoRef}
          src={getPreloaderVideo()}
          className="preloader-video"
          autoPlay
          muted
          playsInline
          loop={false}
          preload="auto"
          onEnded={handleVideoEnded}
        />
      </div>
      <div
        className={`preloader-loading-text ${assetsLoaded ? "fade-out" : ""}`}
      >
        {Math.floor(loadingProgress)}%
      </div>
    </div>
  );
};

export default Preloader;
