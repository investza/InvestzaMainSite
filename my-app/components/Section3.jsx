import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

function Section3() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const subtitleRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        headingRef.current,
        {
          y: 100,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Subtitle animation
      gsap.fromTo(
        subtitleRef.current,
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: subtitleRef.current,
            start: "top 85%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Card animation
      gsap.fromTo(
        cardRef.current,
        {
          y: 80,
          opacity: 0,
          scale: 0.9,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          delay: 0.6,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 75%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Optional: Add smooth scrolling to the entire page
      gsap.to("body", {
        scrollBehavior: "smooth",
        duration: 0.1, // This enables smooth scrolling behavior
      });
    }, sectionRef);

    return () => ctx.revert(); // Cleanup
  }, []);

  return (
    <div
      ref={sectionRef}
      className="bg-black text-white min-h-screen flex flex-col items-center justify-center px-4 py-20 gap-10"
    >
      <h2
        ref={headingRef}
        className="text-4xl md:text-4xl font-bold text-center max-w-3xl leading-tight"
      >
        Discover the new way of personalized investing with Investza
      </h2>

      <p ref={subtitleRef} className="text-lg md:text-xl text-gray-300">
        Portfolio Solutions meant only for you and your vision.
      </p>

      <div
        ref={cardRef}
        className="bg-neutral-900 p-8 rounded-2xl border border-neutral-800 shadow-xl max-w-md w-full hover:border-neutral-700 transition-all duration-300"
      >
        <h4 className="text-indigo-400 font-semibold">
          Download the Wealth Tracker App today!
        </h4>
        <h4 className="text-indigo-400 font-semibold">
          Use our app to your advantage.
        </h4>

        <p className="text-gray-400 mt-3">Min. Investment: 50 Lakhs</p>

        <p className="text-gray-300 mt-4 mb-0 text-left">
          What you can expect working with Investza:
        </p>

        <div className="border-t border-neutral-700 my-6" />

        <ul className="space-y-3 text-gray-300 text-left">
          <li className="flex items-start gap-2">
            <span className="text-indigo-400 mt-1 flex-shrink-0">•</span>
            <span className="flex-1 text-left">
              Strategies tailored only for you
            </span>
          </li>

          <li className="flex items-start gap-2">
            <span className="text-indigo-400 mt-1 flex-shrink-0">•</span>
            <span className="flex-1 text-left">
              Wealth Creation and Preservation always built in to our strategies
            </span>
          </li>

          <li className="flex items-start gap-2">
            <span className="text-indigo-400 mt-1 flex-shrink-0">•</span>
            <span className="flex-1 text-left">
              High quality debt with stable returns
            </span>
          </li>

          <li className="flex items-start gap-2">
            <span className="text-indigo-400 mt-1 flex-shrink-0">•</span>
            <span className="flex-1 text-left">
              Investing for a robust tomorrow
            </span>
          </li>
        </ul>

        <button className="mt-8 w-full bg-indigo-600 hover:bg-indigo-500 text-white py-3 rounded-xl font-semibold transition-all duration-300">
          Download
        </button>
      </div>
    </div>
  );
}

export default Section3;
