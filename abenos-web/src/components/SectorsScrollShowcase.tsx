"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export interface SubCategory {
  title: string;
  desc: string;
  image: string;
}

export interface SectorMain {
  id: string;
  tag: string;
  title: string;
  heroImage: string;
  categories: SubCategory[];
  link: string;
}

export const ONSHORE_DATA: SectorMain = {
  id: "onshore",
  tag: "ONSHORE SECTOR",
  title: "Remote Site, Health Care & Institutional Management",
  heroImage: "/images/sectors/onshore-remote-site.jpg",
  link: "/sectors/onshore",
  categories: [
    {
      title: "Remote Site",
      desc: "With dedicated professionals for the management of Oil & Gas, Mining, Energy, and Infrastructure Construction Projects in remote desert locations.",
      image: "/images/sectors/onshore-remote-site.jpg",
    },
    {
      title: "Health Care",
      desc: "We create safe, caring and productive environments. We help people, patients and staff members live healthier lifestyles and contribute to the health and development of local communities.",
      image: "/images/sectors/onshore-healthcare.jpg",
    },
    {
      title: "Education",
      desc: "Today's children are the leaders of tomorrow; the crème de la crème of every space we can imagine in the future. To nurture this enormous potential, we associate with schools to create clean, nourishing dining environments.",
      image: "/images/sectors/onshore-education.jpg",
    },
  ],
};

export const OFFSHORE_DATA: SectorMain = {
  id: "offshore",
  tag: "OFFSHORE SECTOR",
  title: "Integrated Catering, Marine Living Quarters & Victualing",
  heroImage: "/images/sectors/offshore-catering.jpg",
  link: "/sectors/offshore",
  categories: [
    {
      title: "Offshore Catering",
      desc: "A team of certified professionals ready 24/7 for catering onboard all kinds of ships, drilling rigs, self-elevating work boats, AWB, FPSO and offshore process platforms.",
      image: "/images/sectors/offshore-catering.jpg",
    },
    {
      title: "Housekeeping & Laundry",
      desc: "We help in maintaining a clean and hygienic living quarter. Following all international prevention, sanitation, and contamination control procedures.",
      image: "/images/sectors/offshore-housekeeping.jpg",
    },
    {
      title: "Man Power & Material Supply",
      desc: "We support clients with the need for food provisions and supply of certified maritime manpower such as Catering Supervisors, Chefs & Stewards with all necessary documentation.",
      image: "/images/sectors/offshore-manpower.jpg",
    },
  ],
};

// Ribbon Cards Sequence
// Card 4 is the HERO Breakout card that lifts out, centers, zooms full-screen, and slides smoothly
const RIBBON_ITEMS = [
  { img: "/images/sectors/offshore-catering.jpg", isHero: false },
  { img: "/images/sectors/onshore-healthcare.jpg", isHero: false },
  { img: "/images/sectors/offshore-housekeeping.jpg", isHero: false },
  { img: "/images/sectors/onshore-education.jpg", isHero: false },
  { img: "/images/sectors/onshore-remote-site.jpg", isHero: true }, // HERO CARD (Index 4)
  { img: "/images/sectors/offshore-manpower.jpg", isHero: false },
  { img: "/images/gallery-1.jpg", isHero: false },
  { img: "/images/gallery-2.jpg", isHero: false },
  { img: "/images/gallery-3.jpg", isHero: false },
];

export default function SectorsScrollShowcase() {
  const pinContainerRef = useRef<HTMLDivElement>(null);
  const introBlockRef = useRef<HTMLDivElement>(null);
  const ribbonTrackRef = useRef<HTMLDivElement>(null);
  const heroCardRef = useRef<HTMLDivElement>(null);
  const heroCardImgRef = useRef<HTMLImageElement>(null);
  const darkBackdropRef = useRef<HTMLDivElement>(null);

  // Stages
  const onshoreStageRef = useRef<HTMLDivElement>(null);
  const onshoreRightPanelRef = useRef<HTMLDivElement>(null);
  const offshoreStageRef = useRef<HTMLDivElement>(null);
  const offshoreRightImageRef = useRef<HTMLImageElement>(null);

  // Active Category Selection
  const [onshoreIdx, setOnshoreIdx] = useState(0);
  const [offshoreIdx, setOffshoreIdx] = useState(0);
  const [mobileTab, setMobileTab] = useState<"onshore" | "offshore">("onshore");

  // Keep hero image in sync with selected category
  useEffect(() => {
    if (heroCardImgRef.current) {
      heroCardImgRef.current.src = ONSHORE_DATA.categories[onshoreIdx].image;
    }
  }, [onshoreIdx]);

  useEffect(() => {
    if (offshoreRightImageRef.current) {
      offshoreRightImageRef.current.src = OFFSHORE_DATA.categories[offshoreIdx].image;
    }
  }, [offshoreIdx]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const pinContainer = pinContainerRef.current;
    const introBlock = introBlockRef.current;
    const ribbonTrack = ribbonTrackRef.current;
    const heroCard = heroCardRef.current;
    const darkBackdrop = darkBackdropRef.current;
    const onshoreStage = onshoreStageRef.current;
    const onshoreRightPanel = onshoreRightPanelRef.current;
    const offshoreStage = offshoreStageRef.current;

    if (
      !pinContainer ||
      !introBlock ||
      !ribbonTrack ||
      !heroCard ||
      !darkBackdrop ||
      !onshoreStage ||
      !onshoreRightPanel ||
      !offshoreStage
    )
      return;

    const mm = gsap.matchMedia();

    // ===================================================
    // Desktop Viewport Animation (Min-width: 992px)
    // 100% Video Accurate Sequence (scroll-32-650.webm):
    // 1. Ribbon scrolls horizontally tilted at -4.5deg.
    // 2. Hero card in center BREAKS OUT of ribbon (elevates, deep shadow).
    // 3. Ambient cards fade to pure black, ribbon straightens to 0deg.
    // 4. Hero card ZOOMS TO 100% FULL SCREEN (100vw x 100vh) over black.
    // 5. Solid black right panel SLIDES IN HORIZONTALLY from the right edge
    //    (xPercent: 100 -> 0) with a soft atmospheric feather shadow.
    //    NO INSTANT SNAP! ZERO OVERLAP!
    // 6. Horizontal slide transition from ONSHORE to OFFSHORE.
    // ===================================================
    mm.add("(min-width: 992px)", () => {
      const cardWidth = 380;
      const cardHeight = 240;
      const cardGap = 24;
      const heroIndex = 4;
      // Center of hero card inside ribbonTrack:
      const heroCenterOffset = heroIndex * (cardWidth + cardGap) + cardWidth / 2;

      // Target scale to cover 100% of viewport
      const computeMaxScale = () => {
        const sw = window.innerWidth;
        const sh = window.innerHeight;
        return Math.max(sw / cardWidth, sh / cardHeight) * 1.05;
      };

      // Set initial positions
      gsap.set(ribbonTrack, {
        rotation: -4.5,
        x: -550, // Initial offset showing cards 1-3
        transformOrigin: "center center",
      });
      gsap.set(heroCard, {
        scale: 1,
        rotation: 0,
        zIndex: 5,
        borderRadius: "14px",
        boxShadow: "0 14px 40px rgba(0, 0, 0, 0.25)",
        transformOrigin: "center center",
        x: 0,
      });
      gsap.set(darkBackdrop, { opacity: 0 });

      // Onshore Right Panel starts completely off-screen to the right (xPercent: 100)
      gsap.set(onshoreRightPanel, { xPercent: 100 });
      gsap.set(onshoreStage, { xPercent: 0 });

      // Offshore Stage starts completely off-screen to the right (xPercent: 100)
      gsap.set(offshoreStage, { xPercent: 100 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinContainer,
          start: "top top",
          end: "+=4600",
          pin: true,
          scrub: 1.15,
          anticipatePin: 1,
        },
      });

      // ----------------------------------------------------
      // STAGE 1: Ribbon Travels Horizontally (Progress 0.0 -> 0.20)
      // Card 4 travels to exact center of the screen
      // ----------------------------------------------------
      tl.to(
        ribbonTrack,
        {
          x: -heroCenterOffset,
          ease: "none",
          duration: 3,
        },
        0
      );

      tl.to(
        introBlock,
        {
          opacity: 0,
          y: -40,
          ease: "power1.out",
          duration: 1.2,
        },
        0
      );

      // ----------------------------------------------------
      // STAGE 2: Card BREAKS OUT of Ribbon (Progress 0.20 -> 0.32)
      // Matches Screenshot 1: Hero card pops out above neighbors,
      // casts prominent drop shadow, ribbon is still visible & tilted
      // ----------------------------------------------------
      tl.to(
        heroCard,
        {
          scale: 1.18,
          zIndex: 100,
          boxShadow: "0 35px 90px rgba(0, 0, 0, 0.95)",
          ease: "power2.out",
          duration: 1.5,
        },
        ">"
      );

      // ----------------------------------------------------
      // STAGE 3: Ambient Cards Fade to Black, Ribbon Levels to 0deg (Progress 0.32 -> 0.44)
      // Matches Screenshot 2: Ambient cards fade out, background turns pure black,
      // hero card straightens towards 0deg and scales larger
      // ----------------------------------------------------
      tl.to(
        ".ribbon-card-ambient",
        {
          opacity: 0,
          ease: "power1.out",
          duration: 1.2,
        },
        "<+=0.4"
      );

      tl.to(
        darkBackdrop,
        {
          opacity: 1,
          ease: "power2.inOut",
          duration: 1.4,
        },
        "<"
      );

      tl.to(
        ribbonTrack,
        {
          rotation: 0,
          ease: "power2.inOut",
          duration: 1.4,
        },
        "<"
      );

      tl.to(
        heroCard,
        {
          scale: () => computeMaxScale() * 0.42,
          ease: "power2.inOut",
          duration: 1.4,
        },
        "<"
      );

      // ----------------------------------------------------
      // STAGE 4: Card Zooms to 100% FULL SCREEN (Progress 0.44 -> 0.58)
      // Matches Screenshot 3: Full Screen 100vw x 100vh, 0deg, borderRadius 0
      // Entire viewport is covered by the hero image
      // ----------------------------------------------------
      tl.to(
        heroCard,
        {
          scale: () => computeMaxScale(),
          borderRadius: "0px",
          boxShadow: "none",
          ease: "power2.inOut",
          duration: 2.2,
        },
        ">"
      );

      // ----------------------------------------------------
      // STAGE 5: Black Panel Slides In Smoothly from the Right (Progress 0.58 -> 0.74)
      // NO INSTANT JUMP! The black panel smoothly enters from xPercent: 100 -> 0.
      // Simultaneously, hero image shifts gently left to frame the subject.
      // Matches Screenshot 4: Left image, right text over solid black (#000000).
      // ----------------------------------------------------
      tl.to(
        onshoreRightPanel,
        {
          xPercent: 0,
          ease: "power2.out",
          duration: 2.8,
        },
        ">+=0.3"
      );

      tl.to(
        heroCard,
        {
          x: () => -(window.innerWidth * 0.14),
          ease: "power2.out",
          duration: 2.8,
        },
        "<"
      );

      // Dwell period for reading Onshore operations
      tl.to({}, { duration: 1.5 });

      // ----------------------------------------------------
      // STAGE 6: Horizontal Slide from ONSHORE -> OFFSHORE (Progress 0.74 -> 0.92)
      // Entire Onshore stage slides left (-100%), Offshore slides in from right (0%)
      // ----------------------------------------------------
      tl.to(
        onshoreStage,
        {
          xPercent: -100,
          ease: "power2.inOut",
          duration: 3,
        },
        ">"
      );

      tl.to(
        offshoreStage,
        {
          xPercent: 0,
          ease: "power2.inOut",
          duration: 3,
        },
        "<"
      );

      // Dwell period for reading Offshore operations before unpinning
      tl.to({}, { duration: 2 });

      return () => {
        tl.kill();
      };
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <section
      ref={pinContainerRef}
      className="sectors-showcase-pin-section"
      id="sectors-showcase"
    >
      {/* ===================================================
          DESKTOP VIEWPORT PRESENTATION (Min-width: 992px)
          =================================================== */}
      <div className="d-none d-lg-block h-100 w-100 position-relative">
        {/* ===================================================
            Layer 1: Minimal Editorial Intro
            =================================================== */}
        <div
          ref={introBlockRef}
          className="sectors-intro-block"
          style={{
            position: "absolute",
            top: "50px",
            left: 0,
            right: 0,
            zIndex: 6,
            textAlign: "center",
            padding: "0 24px",
            pointerEvents: "none",
          }}
        >
          <span className="badge-brand-blue mb-2">SECTORS WE SERVE</span>
          <h2
            style={{
              fontSize: "clamp(26px, 3.2vw, 40px)",
              fontWeight: 800,
              lineHeight: 1.25,
              color: "#FFFFFF",
              margin: "10px auto",
              maxWidth: "800px",
            }}
          >
            Specialized Catering, Housekeeping & Victualing Operations
          </h2>
          <p
            style={{
              fontSize: "16px",
              color: "#94A3B8",
              maxWidth: "640px",
              margin: "0 auto",
            }}
          >
            Certified food safety and living quarter management across harsh remote desert and marine environments.
          </p>
        </div>

        {/* ===================================================
            Layer 2: Pitch Jet Black (#000000) Backdrop
            Fades in behind hero card at Stage 3
            =================================================== */}
        <div
          ref={darkBackdropRef}
          style={{
            position: "absolute",
            inset: 0,
            background: "#000000",
            zIndex: 10,
            pointerEvents: "none",
          }}
        />

        {/* ===================================================
            Layer 3: ONSHORE STAGE
            Contains:
            - Ribbon Track + Hero Card (which zooms full-screen)
            - Right Black Editorial Panel (slides in smoothly from xPercent: 100 -> 0)
            =================================================== */}
        <div
          ref={onshoreStageRef}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            zIndex: 20,
            overflow: "hidden",
          }}
        >
          {/* Ribbon Container */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: "100%",
              height: "0px",
              transform: "translateY(-50%)",
              zIndex: 20,
              overflow: "visible",
            }}
          >
            <div
              ref={ribbonTrackRef}
              className="d-flex align-items-center"
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                gap: "24px",
                width: "max-content",
                transform: "translateY(-50%)",
                transformOrigin: "center center",
                willChange: "transform",
                overflow: "visible",
              }}
            >
              {RIBBON_ITEMS.map((item, idx) => {
                if (item.isHero) {
                  // THE HERO BREAKOUT CARD (Index 4)
                  return (
                    <div
                      key={`hero-card-slot`}
                      ref={heroCardRef}
                      style={{
                        position: "relative",
                        width: "380px",
                        height: "240px",
                        borderRadius: "14px",
                        overflow: "hidden",
                        flexShrink: 0,
                        willChange: "transform, border-radius",
                      }}
                    >
                      <img
                        ref={heroCardImgRef}
                        src={ONSHORE_DATA.categories[onshoreIdx].image}
                        alt="ABENOS Onshore Operations"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          display: "block",
                        }}
                      />
                    </div>
                  );
                }

                // Ambient Ribbon Cards
                return (
                  <div
                    key={`ambient-card-${idx}`}
                    className="ribbon-card-ambient"
                    style={{
                      position: "relative",
                      width: "380px",
                      height: "240px",
                      borderRadius: "14px",
                      overflow: "hidden",
                      boxShadow: "0 14px 40px rgba(0, 0, 0, 0.35)",
                      flexShrink: 0,
                      willChange: "opacity",
                    }}
                  >
                    <img
                      src={item.img}
                      alt="ABENOS Operation"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Solid Black Editorial Panel (Slides in smoothly from xPercent: 100 -> 0) */}
          <div
            ref={onshoreRightPanelRef}
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: "48vw",
              height: "100vh",
              background: "#000000",
              zIndex: 50,
              display: "flex",
              alignItems: "center",
              padding: "0 5vw 0 3vw",
              // Soft deep shadow feathering over the left image
              boxShadow: "-35px 0 80px 10px rgba(0, 0, 0, 0.95)",
              willChange: "transform",
            }}
          >
            <div style={{ maxWidth: "560px", width: "100%" }}>
              {/* Badges */}
              <div className="d-flex align-items-center gap-3 mb-3">
                <span
                  style={{
                    fontSize: "13px",
                    fontWeight: 800,
                    letterSpacing: "2.5px",
                    color: "#FBAF41",
                    textTransform: "uppercase",
                  }}
                >
                  {ONSHORE_DATA.tag}
                </span>
                <span
                  style={{
                    fontSize: "11px",
                    padding: "3px 12px",
                    borderRadius: "12px",
                    background: "rgba(46, 164, 79, 0.2)",
                    color: "#2EA44F",
                    border: "1px solid rgba(46, 164, 79, 0.4)",
                    fontWeight: 700,
                    letterSpacing: "1px",
                  }}
                >
                  OIL & GAS APPROVED
                </span>
              </div>

              {/* Title */}
              <h3
                style={{
                  fontSize: "clamp(24px, 2.3vw, 34px)",
                  fontWeight: 800,
                  lineHeight: 1.25,
                  color: "#FFFFFF",
                  marginBottom: "22px",
                }}
              >
                {ONSHORE_DATA.title}
              </h3>

              {/* 3 Categories: Sleek Glass Cards matching Client Brochure */}
              <div className="category-stack mb-4">
                {ONSHORE_DATA.categories.map((cat, idx) => (
                  <div
                    key={`onshore-item-${idx}`}
                    className="cat-card mb-3"
                    onClick={() => setOnshoreIdx(idx)}
                    style={{
                      borderRadius: "12px",
                      padding: "16px 20px",
                      background:
                        onshoreIdx === idx
                          ? "rgba(251, 175, 65, 0.12)"
                          : "rgba(255, 255, 255, 0.03)",
                      border:
                        onshoreIdx === idx
                          ? "1px solid rgba(251, 175, 65, 0.4)"
                          : "1px solid rgba(255, 255, 255, 0.07)",
                      borderLeft:
                        onshoreIdx === idx
                          ? "4px solid #FBAF41"
                          : "4px solid rgba(255, 255, 255, 0.15)",
                      cursor: "pointer",
                      transition: "all 0.25s ease",
                    }}
                  >
                    <div className="d-flex align-items-center justify-content-between mb-1">
                      <h4
                        style={{
                          fontSize: "17px",
                          fontWeight: 700,
                          color: onshoreIdx === idx ? "#FBAF41" : "#FFFFFF",
                          margin: 0,
                        }}
                      >
                        0{idx + 1}. {cat.title}
                      </h4>
                      {onshoreIdx === idx && (
                        <span
                          style={{
                            fontSize: "10px",
                            fontWeight: 800,
                            padding: "2px 8px",
                            borderRadius: "10px",
                            background: "rgba(251, 175, 65, 0.25)",
                            color: "#FBAF41",
                            letterSpacing: "1px",
                          }}
                        >
                          SELECTED
                        </span>
                      )}
                    </div>
                    <p
                      style={{
                        fontSize: "13.5px",
                        lineHeight: 1.55,
                        color: onshoreIdx === idx ? "#E2E8F0" : "#94A3B8",
                        margin: 0,
                      }}
                    >
                      {cat.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="d-flex align-items-center gap-3">
                <Link
                  href={ONSHORE_DATA.link}
                  className="btn-default btn-highlighted"
                  style={{
                    padding: "12px 28px",
                    fontWeight: 700,
                  }}
                >
                  Explore Onshore Operations
                </Link>
                <span style={{ fontSize: "12px", color: "#64748B" }}>
                  Scroll for Offshore Operations →
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ===================================================
            Layer 4: OFFSHORE STAGE (Stage 6)
            Slides in horizontally from right (xPercent: 100 -> 0)
            Alternating Weave:
            LEFT 48%: Pure Black (#000000) Editorial Panel
            RIGHT 52%: Full-Height Offshore Image with switcher
            =================================================== */}
        <div
          ref={offshoreStageRef}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            zIndex: 35,
            background: "#000000",
            overflow: "hidden",
            willChange: "transform",
          }}
        >
          {/* Left Column: Solid Black Editorial Content Panel (48vw) */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "48vw",
              height: "100vh",
              background: "#000000",
              zIndex: 10,
              display: "flex",
              alignItems: "center",
              padding: "0 3vw 0 5vw",
              boxShadow: "35px 0 80px 10px rgba(0, 0, 0, 0.95)",
            }}
          >
            <div style={{ maxWidth: "560px", width: "100%" }}>
              {/* Badges */}
              <div className="d-flex align-items-center gap-3 mb-3">
                <span
                  style={{
                    fontSize: "13px",
                    fontWeight: 800,
                    letterSpacing: "2.5px",
                    color: "#1B75BC",
                    textTransform: "uppercase",
                  }}
                >
                  {OFFSHORE_DATA.tag}
                </span>
                <span
                  style={{
                    fontSize: "11px",
                    padding: "3px 12px",
                    borderRadius: "12px",
                    background: "rgba(27, 117, 188, 0.25)",
                    color: "#60A5FA",
                    border: "1px solid rgba(27, 117, 188, 0.5)",
                    fontWeight: 700,
                    letterSpacing: "1px",
                  }}
                >
                  ARAMCO & ADNOC COMPLIANT
                </span>
              </div>

              {/* Title */}
              <h3
                style={{
                  fontSize: "clamp(24px, 2.3vw, 34px)",
                  fontWeight: 800,
                  lineHeight: 1.25,
                  color: "#FFFFFF",
                  marginBottom: "22px",
                }}
              >
                {OFFSHORE_DATA.title}
              </h3>

              {/* 3 Categories: Sleek Glass Cards matching Client Brochure */}
              <div className="category-stack mb-4">
                {OFFSHORE_DATA.categories.map((cat, idx) => (
                  <div
                    key={`offshore-item-${idx}`}
                    className="cat-card mb-3"
                    onClick={() => setOffshoreIdx(idx)}
                    style={{
                      borderRadius: "12px",
                      padding: "16px 20px",
                      background:
                        offshoreIdx === idx
                          ? "rgba(27, 117, 188, 0.16)"
                          : "rgba(255, 255, 255, 0.03)",
                      border:
                        offshoreIdx === idx
                          ? "1px solid rgba(27, 117, 188, 0.45)"
                          : "1px solid rgba(255, 255, 255, 0.07)",
                      borderLeft:
                        offshoreIdx === idx
                          ? "4px solid #1B75BC"
                          : "4px solid rgba(255, 255, 255, 0.15)",
                      cursor: "pointer",
                      transition: "all 0.25s ease",
                    }}
                  >
                    <div className="d-flex align-items-center justify-content-between mb-1">
                      <h4
                        style={{
                          fontSize: "17px",
                          fontWeight: 700,
                          color: offshoreIdx === idx ? "#60A5FA" : "#FFFFFF",
                          margin: 0,
                        }}
                      >
                        0{idx + 1}. {cat.title}
                      </h4>
                      {offshoreIdx === idx && (
                        <span
                          style={{
                            fontSize: "10px",
                            fontWeight: 800,
                            padding: "2px 8px",
                            borderRadius: "10px",
                            background: "rgba(27, 117, 188, 0.3)",
                            color: "#60A5FA",
                            letterSpacing: "1px",
                          }}
                        >
                          SELECTED
                        </span>
                      )}
                    </div>
                    <p
                      style={{
                        fontSize: "13.5px",
                        lineHeight: 1.55,
                        color: offshoreIdx === idx ? "#E2E8F0" : "#94A3B8",
                        margin: 0,
                      }}
                    >
                      {cat.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="d-flex align-items-center gap-3">
                <Link
                  href={OFFSHORE_DATA.link}
                  className="btn-default btn-highlighted"
                  style={{
                    padding: "12px 28px",
                    fontWeight: 700,
                  }}
                >
                  Explore Offshore Operations
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Full-Height Offshore Image (52vw) with soft left vignette */}
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: "52vw",
              height: "100vh",
              overflow: "hidden",
              zIndex: 1,
            }}
          >
            <img
              ref={offshoreRightImageRef}
              src={OFFSHORE_DATA.categories[offshoreIdx].image}
              alt="ABENOS Offshore Operations"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
                transition: "filter 0.4s ease",
              }}
            />
            {/* Soft Left Edge Vignette blending into the black left panel */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                bottom: 0,
                width: "140px",
                background: "linear-gradient(to left, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 70%, #000000 100%)",
                pointerEvents: "none",
              }}
            />
          </div>
        </div>
      </div>

      {/* ===================================================
          MOBILE & TABLET VIEWPORT PRESENTATION (< 992px)
          Clean, Minimalist, Light-Themed Brochure Cards
          =================================================== */}
      <div
        className="d-block d-lg-none py-5 px-3"
        style={{
          background: "#F8FAFC",
          color: "#0B1528",
          minHeight: "100vh",
          position: "relative",
          zIndex: 10,
        }}
      >
        {/* Header Block */}
        <div className="text-center mb-4">
          <span
            style={{
              display: "inline-block",
              fontSize: "12px",
              fontWeight: 800,
              letterSpacing: "2px",
              color: "#1B75BC",
              background: "rgba(27, 117, 188, 0.08)",
              padding: "6px 16px",
              borderRadius: "20px",
              marginBottom: "10px",
              textTransform: "uppercase",
            }}
          >
            SECTORS WE SERVE
          </span>
          <h2
            style={{
              fontSize: "clamp(24px, 6vw, 32px)",
              fontWeight: 800,
              lineHeight: 1.25,
              color: "#0B1528",
              margin: "6px auto 10px",
              maxWidth: "500px",
            }}
          >
            Specialized Catering & Living Quarter Management
          </h2>
          <p
            style={{
              fontSize: "14.5px",
              lineHeight: 1.6,
              color: "#64748B",
              maxWidth: "460px",
              margin: "0 auto",
            }}
          >
            Delivering 24/7 food safety, housekeeping and victualing operations across remote desert and marine environments.
          </p>
        </div>

        {/* Minimalist Segmented Tabs: ONSHORE / OFFSHORE */}
        <div
          className="d-flex p-1 mb-4"
          style={{
            background: "#E2E8F0",
            borderRadius: "14px",
            gap: "6px",
            maxWidth: "420px",
            margin: "0 auto 28px",
          }}
        >
          <button
            type="button"
            onClick={() => setMobileTab("onshore")}
            style={{
              flex: 1,
              padding: "11px 14px",
              borderRadius: "10px",
              background: mobileTab === "onshore" ? "#FFFFFF" : "transparent",
              color: mobileTab === "onshore" ? "#0B1528" : "#64748B",
              fontWeight: 800,
              fontSize: "13.5px",
              border: "none",
              boxShadow:
                mobileTab === "onshore"
                  ? "0 4px 15px rgba(0, 0, 0, 0.08)"
                  : "none",
              transition: "all 0.25s ease",
              cursor: "pointer",
            }}
          >
            ONSHORE SECTOR
          </button>
          <button
            type="button"
            onClick={() => setMobileTab("offshore")}
            style={{
              flex: 1,
              padding: "11px 14px",
              borderRadius: "10px",
              background: mobileTab === "offshore" ? "#FFFFFF" : "transparent",
              color: mobileTab === "offshore" ? "#0B1528" : "#64748B",
              fontWeight: 800,
              fontSize: "13.5px",
              border: "none",
              boxShadow:
                mobileTab === "offshore"
                  ? "0 4px 15px rgba(0, 0, 0, 0.08)"
                  : "none",
              transition: "all 0.25s ease",
              cursor: "pointer",
            }}
          >
            OFFSHORE SECTOR
          </button>
        </div>

        {/* ===================================================
            ONSHORE CARDS (Clean Minimalist White Cards)
            =================================================== */}
        {mobileTab === "onshore" ? (
          <div>
            {/* Sector Subtitle */}
            <div className="d-flex align-items-center justify-content-between mb-3 px-1">
              <span style={{ fontSize: "13px", fontWeight: 800, color: "#1B75BC", letterSpacing: "1px" }}>
                3 ONSHORE DIVISIONS
              </span>
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  color: "#2EA44F",
                  background: "rgba(46, 164, 79, 0.12)",
                  padding: "3px 10px",
                  borderRadius: "12px",
                }}
              >
                OIL & GAS APPROVED
              </span>
            </div>

            {/* 3 Clean Brochure Cards */}
            {ONSHORE_DATA.categories.map((cat, idx) => (
              <div
                key={`mob-card-onshore-${idx}`}
                style={{
                  background: "#FFFFFF",
                  borderRadius: "16px",
                  overflow: "hidden",
                  boxShadow: "0 10px 30px rgba(11, 21, 40, 0.07)",
                  border: "1px solid #E2E8F0",
                  marginBottom: "20px",
                  transition: "transform 0.25s ease, box-shadow 0.25s ease",
                }}
              >
                {/* Image */}
                <div style={{ position: "relative", width: "100%", height: "200px" }}>
                  <img
                    src={cat.image}
                    alt={cat.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: "12px",
                      left: "12px",
                      background: "rgba(11, 21, 40, 0.75)",
                      backdropFilter: "blur(4px)",
                      color: "#FFFFFF",
                      fontSize: "11px",
                      fontWeight: 700,
                      padding: "4px 10px",
                      borderRadius: "6px",
                    }}
                  >
                    0{idx + 1}
                  </div>
                </div>

                {/* Card Body */}
                <div style={{ padding: "20px 22px" }}>
                  <h3
                    style={{
                      fontSize: "19px",
                      fontWeight: 800,
                      color: "#0B1528",
                      marginBottom: "10px",
                    }}
                  >
                    {cat.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "14px",
                      lineHeight: 1.65,
                      color: "#475569",
                      marginBottom: idx === 0 ? "10px" : "16px",
                    }}
                  >
                    {cat.desc}
                  </p>

                  {/* Bullet points for Remote Site */}
                  {idx === 0 && (
                    <ul
                      style={{
                        paddingLeft: "18px",
                        margin: "0 0 16px",
                        fontSize: "13.5px",
                        lineHeight: 1.7,
                        color: "#334155",
                      }}
                    >
                      <li>Oil & Gas, Mining</li>
                      <li>Energy, Construction Projects</li>
                    </ul>
                  )}

                  <Link
                    href={ONSHORE_DATA.link}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      fontSize: "13.5px",
                      fontWeight: 700,
                      color: "#1B75BC",
                      textDecoration: "none",
                    }}
                  >
                    Read More &rsaquo;
                  </Link>
                </div>
              </div>
            ))}

            {/* CTA Button */}
            <div className="text-center mt-3 mb-4">
              <Link
                href={ONSHORE_DATA.link}
                className="btn-default btn-highlighted w-100"
                style={{ padding: "14px 20px", fontWeight: 700, fontSize: "15px" }}
              >
                Explore Onshore Operations →
              </Link>
            </div>
          </div>
        ) : (
          /* ===================================================
              OFFSHORE CARDS (Clean Minimalist White Cards)
              =================================================== */
          <div>
            {/* Sector Subtitle */}
            <div className="d-flex align-items-center justify-content-between mb-3 px-1">
              <span style={{ fontSize: "13px", fontWeight: 800, color: "#1B75BC", letterSpacing: "1px" }}>
                3 OFFSHORE DIVISIONS
              </span>
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  color: "#1B75BC",
                  background: "rgba(27, 117, 188, 0.12)",
                  padding: "3px 10px",
                  borderRadius: "12px",
                }}
              >
                ARAMCO & ADNOC COMPLIANT
              </span>
            </div>

            <p
              style={{
                fontSize: "13.5px",
                lineHeight: 1.6,
                color: "#64748B",
                marginBottom: "18px",
                padding: "0 4px",
              }}
            >
              We provide integrated offshore catering solutions for all kinds of ships, drilling rigs, self-elevating work boats, AWB, FPSO and offshore process platforms.
            </p>

            {/* 3 Clean Brochure Cards */}
            {OFFSHORE_DATA.categories.map((cat, idx) => (
              <div
                key={`mob-card-offshore-${idx}`}
                style={{
                  background: "#FFFFFF",
                  borderRadius: "16px",
                  overflow: "hidden",
                  boxShadow: "0 10px 30px rgba(11, 21, 40, 0.07)",
                  border: "1px solid #E2E8F0",
                  marginBottom: "20px",
                  transition: "transform 0.25s ease, box-shadow 0.25s ease",
                }}
              >
                {/* Image */}
                <div style={{ position: "relative", width: "100%", height: "200px" }}>
                  <img
                    src={cat.image}
                    alt={cat.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: "12px",
                      left: "12px",
                      background: "rgba(11, 21, 40, 0.75)",
                      backdropFilter: "blur(4px)",
                      color: "#FFFFFF",
                      fontSize: "11px",
                      fontWeight: 700,
                      padding: "4px 10px",
                      borderRadius: "6px",
                    }}
                  >
                    0{idx + 1}
                  </div>
                </div>

                {/* Card Body */}
                <div style={{ padding: "20px 22px" }}>
                  <h3
                    style={{
                      fontSize: "19px",
                      fontWeight: 800,
                      color: "#0B1528",
                      marginBottom: "10px",
                    }}
                  >
                    {cat.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "14px",
                      lineHeight: 1.65,
                      color: "#475569",
                      marginBottom: "16px",
                    }}
                  >
                    {cat.desc}
                  </p>
                  <Link
                    href={OFFSHORE_DATA.link}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      fontSize: "13.5px",
                      fontWeight: 700,
                      color: "#1B75BC",
                      textDecoration: "none",
                    }}
                  >
                    Read More &rsaquo;
                  </Link>
                </div>
              </div>
            ))}

            {/* CTA Button */}
            <div className="text-center mt-3 mb-4">
              <Link
                href={OFFSHORE_DATA.link}
                className="btn-default btn-highlighted w-100"
                style={{ padding: "14px 20px", fontWeight: 700, fontSize: "15px" }}
              >
                Explore Offshore Operations →
              </Link>
            </div>
          </div>
        )}

        {/* Minimalist Trust Bar */}
        <div
          className="p-3 mt-2"
          style={{
            background: "#FFFFFF",
            borderRadius: "14px",
            border: "1px solid #E2E8F0",
            boxShadow: "0 4px 15px rgba(11, 21, 40, 0.04)",
          }}
        >
          <div className="row g-2 text-center">
            <div className="col-4">
              <span style={{ fontSize: "11.5px", fontWeight: 700, color: "#334155" }}>
                🛡️ ISO 22000
              </span>
            </div>
            <div className="col-4">
              <span style={{ fontSize: "11.5px", fontWeight: 700, color: "#334155" }}>
                ⚡ 24/7 Support
              </span>
            </div>
            <div className="col-4">
              <span style={{ fontSize: "11.5px", fontWeight: 700, color: "#334155" }}>
                🌊 Marine Rated
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
