import React, { useEffect, useRef, useContext } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import slider1 from "../assets/Frame 2147223881.png";
import slider2 from "../assets/Frame 2147223884.png";
import slider3 from "../assets/sliderFrame3.png";

import { showFormContext } from "../contexts/showFormContext";

gsap.registerPlugin(ScrollTrigger);

function Section2() {
  const { showForm, setShowForm } = useContext(showFormContext);

  const containerRef = useRef(null);
  const slidesRef = useRef([]);

  useEffect(() => {
    const sections = slidesRef.current;
    const totalSlides = sections.length;

    // Dynamically get navbar height
    const navbar = document.querySelector("nav");
    const navbarHeight = navbar ? navbar.offsetHeight : 0;

    console.log("Navbar Height:", navbarHeight); // Debug log

    // Create horizontal scroll effect
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        scrub: 1,
        snap: 1 / (totalSlides - 1),
        start: `top ${navbarHeight}px`, // Dynamic navbar height
        end: `+=${totalSlides * 1000}`,
        // markers: true, // Remove after testing
      },
    });

    tl.to(sections, {
      xPercent: -100 * (totalSlides - 1),
      ease: "none",
    });

    return () => ScrollTrigger.getAll().forEach((st) => st.kill());
  }, []);

  const sections = [
    {
      title: "Identify all your investments across all platforms",
      text: "Know how your overall portfolio is performing. Let Investza experts analyse your investments and give you a deep dive insight on your portfolio performance.",
      img: slider1,
    },
    {
      title: "Know which funds to exit to maintain a healthy portfolio",
      text: "Intelligent Decisions help you avoid dents on your portfolio growth. Avoid the red flags in your portfolio today",
      img: slider2,
    },
    {
      title: "Get in touch with an Investza Expert via the App",
      text: "Make strategic moves to diversify and regulate your portfolio for maximum and optimal growth",
      img: slider3,
    },
  ];

  return (
    <section
      className="relative w-full h-screen overflow-hidden bg-black text-white"
      ref={containerRef}
    >
      {/* Fixed Background */}
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(20,20,20,1)_0%,rgba(0,0,0,1)_100%)]"
        style={{
          backgroundAttachment: "fixed",
        }}
      ></div>

      {/* Horizontal Scroll Wrapper */}
      <div className="flex h-full w-[300vw]">
        {sections.map((item, i) => (
          <div
            key={i}
            ref={(el) => (slidesRef.current[i] = el)}
            className="w-screen h-full flex flex-col md:flex-row items-center justify-center px-8 md:px-18 relative"
          >
            {/* Image */}
            <div className="md:w-1/2 flex justify-center">
              <div className="relative group w-[60%] max-w-[320px]">
                <img
                  src={item.img}
                  alt={`slide-${i}`}
                  className="rounded-3xl shadow-2xl transition-transform duration-1200 ease-out group-hover:scale-105 w-40 sm:w-52 md:w-64 lg:w-80 xl:w-96"
                />
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-black/40 to-transparent"></div>
              </div>
            </div>

            {/* Text Content */}
            <div className=" md:w-1/2 mt-4 md:mt-10 space-y-6 text-center md:text-left max-w-xl">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-bold leading-tight drop-shadow-lg">
                {item.title}
              </h2>

              <p className="text-sm sm:text-base md:text-base leading-relaxed bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                {item.text}
              </p>

              <button
                className="px-4 py-2 sm:px-6 sm:py-3 rounded-full text-white text-sm sm:text-base font-semibold cursor-pointer border-none bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 hover:opacity-90 transition-opacity duration-300"
                onClick={() => setShowForm(true)}
              >
                Review My Portfolio →
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Section2;
