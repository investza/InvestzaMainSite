import React, {
  useEffect,
  useRef,
  useCallback,
  useState,
  useContext,
} from "react";
import { FaChevronDown } from "react-icons/fa";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import mobileimg from "../assets/mockupFront.png";
import { showFormContext } from "../contexts/showFormContext";

gsap.registerPlugin(ScrollTrigger);
gsap.config({ force3D: true, autoSleep: 60, nullTargetWarn: false });

function HeroSection() {
  const { showForm, setShowForm } = useContext(showFormContext);

  const refs = useRef({
    hero: null,
    image: null,
    textContainer: null,
    backgroundGradient: null,
    seeHow: null,
    newText: null,
  });
  const animationInstances = useRef([]);

  const createRef = (key) => (el) => (refs.current[key] = el);

  const handleMouseMove = useCallback((e) => {
    if (!refs.current.image) return;
    const { innerWidth, innerHeight } = window;
    const x = (e.clientX / innerWidth - 0.5) * 6;
    const y = (e.clientY / innerHeight - 0.5) * 6;

    gsap.to(refs.current.image, {
      rotateY: x,
      rotateX: -y,
      transformPerspective: 1000,
      ease: "power2.out",
      duration: 0.5,
    });
  }, []);

  useEffect(() => {
    const { hero, image, textContainer, backgroundGradient, seeHow, newText } =
      refs.current;
    if (!hero) return;

    animationInstances.current.forEach((instance) => instance?.kill?.());
    animationInstances.current = [];

    // Unified GSAP timeline — ends INSIDE the same section
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: hero,
        start: "top top",
        end: "bottom top", // ✅ stops right at the end of hero section
        scrub: 1.5,
        pin: textContainer,
        pinSpacing: true,
        anticipatePin: 1,
      },
    });

    // Fade out "See how it works"
    tl.to(seeHow, { opacity: 0, y: -30, ease: "power1.out" }, 0);

    // Move image + newText upward together
    tl.fromTo(
      image,
      { y: 0, scale: 1 },
      { y: -600, scale: 1.1, ease: "power2.inOut" },
      0
    );

    tl.fromTo(
      newText,
      { opacity: 0, y: 80 },
      { opacity: 1, y: -50, ease: "power2.inOut" },
      0.14
    );

    // Fade everything out right before section ends
    tl.to(
      [image, newText, textContainer],
      {
        opacity: 0,
        yPercent: -50,
        ease: "power2.inOut",
      },
      0.8
    );

    // Background parallax
    const bgAnim = gsap.to(backgroundGradient, {
      scale: 1.15,
      opacity: 0.6,
      ease: "sine.inOut",
      scrollTrigger: {
        trigger: hero,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.5,
      },
    });

    animationInstances.current.push(tl.scrollTrigger, bgAnim.scrollTrigger);

    const optimizedMouseMove = throttleRAF(handleMouseMove);
    window.addEventListener("mousemove", optimizedMouseMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", optimizedMouseMove);
      animationInstances.current.forEach((instance) => instance?.kill?.());
      animationInstances.current = [];
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [handleMouseMove]);

  const headlineWords = "Our App, Your Control".split(" ");

  return (
    <section
      ref={createRef("hero")}
      className="relative h-[300vh] bg-black text-white overflow-hidden flex flex-col items-center justify-start"
    >
      {/* Background Gradient */}
      <div
        ref={createRef("backgroundGradient")}
        className="absolute inset-0 transition-all duration-700"
        style={{
          background: `
            radial-gradient(circle at 20% 70%, rgba(59,130,246,0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(168,85,247,0.3) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(236,72,153,0.2) 0%, transparent 60%),
            radial-gradient(circle at 60% 80%, rgba(34,197,94,0.15) 0%, transparent 50%)
          `,
          transform: "translateZ(0)",
        }}
      />
      {/* Text Container */}
      <div
        ref={createRef("textContainer")}
        className="sticky top-0 flex flex-col items-center justify-center text-center z-10 pt-12 h-screen px-4"
      >
        {/* Main Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal max-w-6xl mx-auto leading-tight md:leading-snug mb-6 tracking-tight">
          {headlineWords.map((word, index) => (
            <span
              key={index}
              className="hero-word inline-block mr-3 bg-linear-to-r from-white to-gray-300 bg-clip-text text-transparent"
              style={{
                backgroundSize: "200% 100%",
                backgroundPosition: "0% 0%",
              }}
            >
              {word}
            </span>
          ))}
        </h1>
        <p className="font-montserrat text-white text-lg md:text-xl max-w-3xl mx-auto font-normal opacity-90">
          Have full control over your Investments with us.
        </p>

        {/* See How It Works */}
        <div
          ref={createRef("seeHow")}
          className="flex items-center justify-center gap-3 text-lg md:text-xl lg:text-2xl font-medium text-white/90 cursor-pointer group mb-8"
        >
          <p className="underline decoration-white/60 decoration-2 underline-offset-4 group-hover:decoration-white transition-all duration-300 group-hover:scale-105">
            See How it works
          </p>
          <FaChevronDown className="text-lg md:text-xl text-white/70 group-hover:text-white transition-colors animate-soft-bounce" />
        </div>

        {/* Secondary Text and CTA */}
        <div
          ref={createRef("newText")}
          className="opacity-0 mt-8 text-center flex flex-col items-center justify-center max-w-3xl"
        >
          <p className="text-base md:text-lg lg:text-xl text-white/80 leading-relaxed mb-8 px-4">
            Your wealth deserves more than vague updates. Investza’s Wealth
            Tracker consolidates and analyses every rupee across all your
            investments in real time{" "}
            <span className="bg-linear-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent font-semibold">
              India's leading experts.
            </span>
          </p>
          <button
            className="gradient-button px-6 py-3 rounded-full text-white font-semibold cursor-pointer border-none"
            onClick={() => setShowForm(true)}
          >
            Review My Portfolio
          </button>
        </div>
      </div>
      {/* Floating Image */}
      <div className="absolute bottom-270 left-1/2 transform -translate-x-1/2 z-20 pointer-events-none">
        <div className="relative group">
          <img
            ref={createRef("image")}
            src={mobileimg}
            alt="Mobile app preview showing investment tracking interface"
            className="max-w-40 sm:max-w-34 md:max-w-42 lg:max-w-50 xl:max-w-85 w-auto h-auto transition-all duration-500 ease-out group-hover:scale-105"
            style={{
              transformStyle: "preserve-3d",
              backfaceVisibility: "hidden",
            }}
            loading="eager"
            decoding="async"
          />

          <div className="absolute inset-0 bg-linear-to-br from-blue-500/30 via-purple-500/20 to-cyan-500/20 rounded-4xl blur-2xl -z-10 opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
        </div>
      </div>
    </section>
  );
}

// throttle helper
function throttleRAF(func) {
  let rafId = null;
  return function (...args) {
    if (rafId === null) {
      rafId = requestAnimationFrame(() => {
        func.apply(this, args);
        rafId = null;
      });
    }
  };
}

// style injection
const useInjectStyles = () => {
  React.useEffect(() => {
    if (
      typeof document !== "undefined" &&
      !document.getElementById("hero-styles")
    ) {
      const style = document.createElement("style");
      style.id = "hero-styles";
      style.textContent = `
        @keyframes soft-bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-4px); }
          60% { transform: translateY(-2px); }
        }
        .animate-soft-bounce { animation: soft-bounce 2s infinite; }
        @media (prefers-reduced-motion: reduce) {
          .animate-soft-bounce { animation: none; }
        }
      `;
      document.head.appendChild(style);
    }
  }, []);
};

function HeroSectionWithStyles() {
  useInjectStyles();
  return <HeroSection />;
}

export default React.memo(HeroSectionWithStyles);
