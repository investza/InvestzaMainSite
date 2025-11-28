import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import trio from "../assets/pm2.png";

gsap.registerPlugin(ScrollTrigger);

function Section4() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardRef = useRef(null);
  const imageRef = useRef(null);
  const subheadingRef = useRef(null);
  const stat1Ref = useRef(null);
  const stat2Ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
          // Optional: improve performance
          fastScrollEnd: true,
        },
      });

      // Heading
      tl.fromTo(
        headingRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      );

      // Card (staggered slightly after heading)
      tl.fromTo(
        cardRef.current,
        { opacity: 0, y: 80 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
        "-=0.5"
      );

      // Image, subheading, and stats with stagger
      tl.fromTo(
        [
          imageRef.current,
          subheadingRef.current,
          stat1Ref.current,
          stat2Ref.current,
        ],
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: "power3.out",
        },
        "-=0.6"
      );
    }, sectionRef);

    return () => ctx.revert(); // Cleanup on unmount
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-black text-white py-20 px-6 md:px-12 lg:py-28 overflow-hidden"
      aria-labelledby="team-heading"
    >
      {/* Heading */}
      <header className="text-center mb-12 max-w-4xl mx-auto">
        <h2
          id="team-heading"
          ref={headingRef}
          className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
        >
          From a qualified team you can{" "}
          <span className="text-transparent bg-linear-to-r from-blue-400 to-purple-500 bg-clip-text">
            rely on
          </span>
          {/* <span
            style={{
              background: "linear-gradient(to right, #60a5fa, #a855f7)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            rely on
          </span> */}
          {/* <span className="text-transparent bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text">
            rely on
          </span> */}
        </h2>
        <p className="mt-4 text-lg md:text-xl text-gray-300 font-normal max-w-3xl mx-auto text-center">
          No fluff, no obligations, no fees. Just rare advice you’d have to pay
          for, heavily.
        </p>
      </header>

      {/* Card */}
      <div
        ref={cardRef}
        className="max-w-6xl mx-auto bg-[#111] rounded-3xl p-6 md:p-10 lg:p-12 flex flex-col lg:flex-row items-center gap-8 lg:gap-12 shadow-2xl border border-gray-800"
      >
        {/* Image */}
        <div className="flex justify-center lg:w-1/2">
          <figure className="relative w-full max-w-md lg:max-w-none">
            <img
              ref={imageRef}
              src={trio}
              alt="Investza founding team with decades of investment expertise"
              className="w-full h-auto rounded-2xl object-cover transition-transform duration-700 hover:scale-[1.02] shadow-xl"
              loading="lazy"
            />
          </figure>
        </div>

        {/* Content */}
        <div className="lg:w-1/2 space-y-6 lg:space-y-8">
          <h3
            ref={subheadingRef}
            className="text-2xl md:text-3xl font-semibold text-white max-w-lg text-left"
          >
            Meet the Experts behind Investza
          </h3>

          {/* Stats */}
          <div className="flex flex-wrap items-center gap-6 md:gap-10 pt-2">
            {/* Stat 1 */}
            <div
              ref={stat1Ref}
              className="flex flex-col sm:flex-row sm:items-end gap-1.5"
            >
              <div className="text-4xl md:text-5xl font-bold text-[#f5b97f] tracking-tight">
                ₹10,000
                <span className="text-3xl md:text-4xl  font-semibold ml-2 text-[#f5b97f] tracking-tight">
                  Cr
                </span>
                {/* <span className="text-2xl align-top ml-0.5">Cr</span> */}
              </div>
              <p className="text-gray-400 text-sm md:text-base sm:ml-2 leading-tight">
                Previously managed
              </p>
            </div>

            {/* Divider */}
            <div className="hidden sm:block w-px h-10 bg-gray-700"></div>

            {/* Stat 2 */}
            <div
              ref={stat2Ref}
              className="flex flex-col sm:flex-row sm:items-end gap-1.5"
            >
              {/* <div className="text-4xl md:text-5xl font-bold text-[#f5b97f] tracking-tight">
                8<span className="text-2xl align-top ml-1">Years</span>
              </div> */}
              <div className="text-4xl md:text-5xl font-bold text-[#f5b97f] tracking-tight">
                8
                <span className="text-3xl md:text-4xl  font-semibold ml-2 text-[#f5b97f] tracking-tight">
                  Years
                </span>
                {/* <span className="text-2xl align-top ml-0.5">Cr</span> */}
              </div>
              <p className="text-gray-400 text-sm md:text-base sm:ml-2 leading-tight">
                Of Expertise
              </p>
            </div>
          </div>

          {/* Divider Line */}
          <hr className="w-full border-t border-gray-800 mt-8" />
        </div>
      </div>
    </section>
  );
}

export default Section4;
