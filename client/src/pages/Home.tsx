/**
 * Home: Greater Guitars — "The Zine Shop"
 *
 * Emotional arc:
 * 1. Energy (hero) — dark ink drip + bold type + punk confidence
 * 2. Philosophy (editorial) — why these guitars exist
 * 3. Trust (process) — how they're made, dark section
 * 4. Desire (models) — product cards on newsprint
 * 5. Action (configurator) — reach out
 * 6. Proof (gallery + credentials) — real work, real players
 */

import { useState, useRef, useEffect, useCallback } from "react";
import GrainDripHero from "@/components/GrainDripHero";
import Logo from "@/components/Logo";
import ProductCard from "@/components/ProductCard";
import Configurator from "@/components/Configurator";
import YouTubeVideos from "@/components/YouTubeVideos";
import Credentials from "@/components/Credentials";
import Footer from "@/components/Footer";
import { MODELS } from "@/lib/products";
import { useInView } from "@/hooks/useInView";

function SectionDivider() {
  return (
    <div
      style={{
        height: "1px",
        background: "linear-gradient(90deg, transparent 5%, #d4d0c8 30%, #d4d0c8 70%, transparent 95%)",
        margin: "0 auto",
        maxWidth: "90%",
      }}
    />
  );
}

function SectionReveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const [ref, inView] = useInView(0.12);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.4s ease-out ${delay}s, transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

const SECTION_IDS = ["hero", "philosophy", "process", "models", "configure", "gallery", "videos", "about"];

function ScrollNextButton() {
  const [visible, setVisible] = useState(true);

  const scrollToNext = useCallback(() => {
    const scrollY = window.scrollY;
    const vh = window.innerHeight;
    for (const id of SECTION_IDS) {
      const el = document.getElementById(id);
      if (el) {
        const top = el.getBoundingClientRect().top + scrollY;
        if (top > scrollY + 60) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
          return;
        }
      }
    }
    // Past all sections — scroll to footer
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const atBottom = window.innerHeight + window.scrollY >= document.body.scrollHeight - 200;
      setVisible(!atBottom);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={scrollToNext}
      aria-label="Scroll to next section"
      style={{
        position: "fixed",
        bottom: "2rem",
        right: "2rem",
        zIndex: 9990,
        width: "36px",
        height: "36px",
        background: "rgba(26, 26, 24, 0.6)",
        border: "1px solid rgba(242, 239, 232, 0.15)",
        borderRadius: "50%",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "background 0.15s ease, border-color 0.15s ease",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "rgba(255, 94, 26, 0.8)";
        e.currentTarget.style.borderColor = "rgba(255, 94, 26, 0.6)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "rgba(26, 26, 24, 0.6)";
        e.currentTarget.style.borderColor = "rgba(242, 239, 232, 0.15)";
      }}
    >
      <svg
        width="14" height="14" viewBox="0 0 24 24" fill="none"
        stroke="#f2efe8" strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round"
      >
        <path d="M7 13l5 5 5-5" />
      </svg>
    </button>
  );
}

export default function Home() {
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const configuratorRef = useRef<HTMLDivElement>(null);

  const handleSelectModel = (id: string) => {
    setSelectedModel(id);
    setTimeout(() => {
      configuratorRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  return (
    <div style={{ overscrollBehavior: "none" }}>
      {/* ═══════════════════════════════════════════════ */}
      {/* HERO — Dark, ink drip, punk energy             */}
      {/* ═══════════════════════════════════════════════ */}
      <section
        id="hero"
        className="relative flex items-center justify-center overflow-hidden"
        style={{ height: "100dvh", minHeight: "600px", background: "#1a1a18" }}
      >
        {/* Background photo — low opacity */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url(/guitars/custom-body.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center 30%",
            opacity: 0.12,
          }}
        />

        {/* Ink drip animation — disabled per client preference */}
        {/* <GrainDripHero /> */}

        {/* Brand overlay */}
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <div style={{ marginBottom: "1.5rem", animation: "fadeIn 0.6s ease-out 0.1s both" }}>
            <Logo size={80} showText={false} />
          </div>

          <h1
            style={{
              fontFamily: '"Clash Display", "Arial Black", sans-serif',
              fontSize: "clamp(3rem, 12vw, 7rem)",
              fontWeight: 700,
              color: "#f2efe8",
              letterSpacing: "-0.02em",
              lineHeight: 0.95,
              textTransform: "uppercase",
              animation: "fadeUp 0.6s ease-out 0.2s both",
            }}
          >
            Greater<br />
            <span style={{ color: "#ff5e1a" }}>Guitars</span>
          </h1>

          <p
            style={{
              fontFamily: '"DM Mono", monospace',
              fontSize: "clamp(0.6rem, 1.5vw, 0.75rem)",
              fontWeight: 400,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(242, 239, 232, 0.5)",
              marginTop: "1.5rem",
              animation: "fadeIn 0.5s ease-out 0.6s both",
            }}
          >
            Handmade in Louisville, KY
          </p>

          <p
            style={{
              fontFamily: '"Instrument Serif", Georgia, serif',
              fontStyle: "italic",
              fontSize: "clamp(1.05rem, 2.5vw, 1.4rem)",
              color: "rgba(242, 239, 232, 0.4)",
              marginTop: "2rem",
              lineHeight: 1.6,
              animation: "fadeIn 0.5s ease-out 0.9s both",
            }}
          >
            Concept-driven instruments for players who know what they want.
          </p>

          {/* Scroll indicator */}
          <div
            className="flex flex-col items-center"
            style={{ marginTop: "2.5rem", animation: "fadeIn 0.5s ease-out 1.2s both" }}
          >
            <div
              className="w-px"
              style={{
                height: "2.5rem",
                background: "linear-gradient(to bottom, transparent, rgba(255, 94, 26, 0.4))",
              }}
            />
            <svg
              width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="#ff5e1a" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round"
              style={{ marginTop: "0.5rem", opacity: 0.5 }}
            >
              <path d="M7 13l5 5 5-5" />
            </svg>
          </div>
        </div>

        {/* Bottom gradient fade to newsprint */}
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{ height: "25%", background: "linear-gradient(to bottom, transparent, #f2efe8)" }}
        />
      </section>

      {/* ═══════════════════════════════════════════════ */}
      {/* PHILOSOPHY — Editorial two-column on newsprint */}
      {/* ═══════════════════════════════════════════════ */}
      <section id="philosophy" className="halftone-bg relative py-24 px-6" style={{ background: "#f2efe8" }}>
        <div className="max-w-5xl mx-auto">
          <SectionReveal>
            <div className="grid md:grid-cols-2 gap-16 items-start">
              {/* Left — big pull quote */}
              <div>
                <p
                  style={{
                    fontFamily: '"Clash Display", sans-serif',
                    fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                    fontWeight: 600,
                    color: "#1a1a18",
                    lineHeight: 1.15,
                    letterSpacing: "-0.01em",
                  }}
                >
                  We build guitars<span style={{ color: "#ff5e1a" }}>.</span><br />
                  By hand. In Louisville.<br />
                  They sound incredible and they're built to last.
                </p>
                <div style={{ width: "3rem", height: "3px", background: "#ff5e1a", marginTop: "2rem" }} />
              </div>

              {/* Right — body text */}
              <div style={{ paddingTop: "0.5rem" }}>
                <p
                  style={{
                    fontFamily: '"Instrument Serif", Georgia, serif',
                    fontSize: "1.15rem",
                    lineHeight: 1.85,
                    color: "#4a4a48",
                  }}
                >
                  The best guitars were built by people who understood what came before them.
                  Every Greater Guitars instrument carries that lineage forward — the joinery,
                  the tonewoods, the hand-shaped necks. Some things don't improve with automation.
                </p>
                <p
                  style={{
                    fontFamily: '"Instrument Serif", Georgia, serif',
                    fontSize: "1.15rem",
                    lineHeight: 1.85,
                    color: "#4a4a48",
                    marginTop: "1.5rem",
                  }}
                >
                  But respect for history doesn't mean staying there. Modern players need instruments
                  that adapt — versatile electronics, ergonomic profiles, finishes that age
                  gracefully. We use responsibly sourced tonewoods because it's the right
                  thing to do and the wood sounds better anyway.
                </p>
                <p
                  style={{
                    fontFamily: '"DM Mono", monospace',
                    fontSize: "0.7rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "#5a6b4f",
                    marginTop: "1.5rem",
                  }}
                >
                  Sustainably sourced / Handmade / Louisville, KY
                </p>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      <SectionDivider />

      {/* ═══════════════════════════════════════════════ */}
      {/* THE PROCESS — Dark section, numbered steps     */}
      {/* ═══════════════════════════════════════════════ */}
      <section id="process" className="halftone-bg halftone-dark relative py-24 px-6" style={{ background: "#1a1a18" }}>
        <div className="max-w-5xl mx-auto">
          <SectionReveal>
            <div className="text-center mb-20">
              <p
                style={{
                  fontFamily: '"DM Mono", monospace',
                  fontSize: "0.7rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#ff5e1a",
                  marginBottom: "0.75rem",
                }}
              >
                The Process
              </p>
              <h2
                style={{
                  fontFamily: '"Clash Display", sans-serif',
                  fontSize: "clamp(2rem, 5vw, 3.2rem)",
                  fontWeight: 600,
                  color: "#f2efe8",
                  letterSpacing: "-0.01em",
                }}
              >
                How a Greater Guitar is made
              </h2>
            </div>
          </SectionReveal>

          <div className="space-y-16">
            {[
              {
                step: "01",
                title: "Wood selection",
                description: "Every build starts with the wood. Tonewoods are chosen by hand — inspected for grain direction, tap-tested for resonance, and matched to the player's sound. Mahogany, maple, rosewood, ash. The wood tells you what it wants to become.",
              },
              {
                step: "02",
                title: "Shaping & carving",
                description: "No CNC. Each body is roughed on a bandsaw and shaped by hand with rasps, files, and sandpaper. The neck profile is carved to feel right — not to a specification, but to a standard that comes from years of knowing what plays well.",
              },
              {
                step: "03",
                title: "Assembly & electronics",
                description: "Frets are leveled and crowned by hand. Pickups are wound in-house, voiced for the specific guitar they'll live in. Wiring is clean, shielded, and built to last. Every solder joint matters.",
              },
              {
                step: "04",
                title: "Finishing",
                description: "Nitrocellulose lacquer, applied in thin coats. Each coat is hand-sanded between applications. The finish breathes — it ages with the guitar, opens up the tone over years. This is where patience becomes audible.",
              },
              {
                step: "05",
                title: "Final setup & play test",
                description: "Action, intonation, pickup height, truss rod — everything is dialed in by hand. Then it gets played. Every Greater Guitar leaves the shop sounding the way it was meant to sound.",
              },
            ].map((item, i) => (
              <SectionReveal key={item.step} delay={i * 0.06}>
                <div className={`flex flex-col md:flex-row gap-6 items-start ${i % 2 === 1 ? "md:flex-row-reverse md:text-right" : ""}`}>
                  <div className="flex-shrink-0">
                    <span
                      style={{
                        fontFamily: '"DM Mono", monospace',
                        fontSize: "5rem",
                        fontWeight: 300,
                        color: "rgba(255, 94, 26, 0.12)",
                        lineHeight: 1,
                      }}
                    >
                      {item.step}
                    </span>
                  </div>
                  <div className="max-w-xl">
                    <h3
                      style={{
                        fontFamily: '"Clash Display", sans-serif',
                        fontSize: "1.3rem",
                        fontWeight: 600,
                        color: "#f2efe8",
                        marginBottom: "0.75rem",
                      }}
                    >
                      {item.title}
                    </h3>
                    <p
                      style={{
                        fontFamily: '"Instrument Serif", Georgia, serif',
                        fontSize: "1.05rem",
                        lineHeight: 1.8,
                        color: "rgba(242, 239, 232, 0.55)",
                      }}
                    >
                      {item.description}
                    </p>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>

          {/* Trust numbers */}
          <SectionReveal delay={0.1}>
            <div className="grid grid-cols-3 gap-6 mt-20 max-w-2xl mx-auto">
              {[
                { value: "100+", label: "Hours per build" },
                { value: "Louisville", label: "Built here" },
                { value: "Every one", label: "By hand" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p
                    style={{
                      fontFamily: '"Clash Display", sans-serif',
                      fontSize: "clamp(1.2rem, 3vw, 1.6rem)",
                      fontWeight: 600,
                      color: "#ff5e1a",
                    }}
                  >
                    {stat.value}
                  </p>
                  <p
                    style={{
                      fontFamily: '"DM Mono", monospace',
                      fontSize: "0.6rem",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: "rgba(242, 239, 232, 0.35)",
                      marginTop: "0.5rem",
                    }}
                  >
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════ */}
      {/* MODELS — Product showcase on newsprint         */}
      {/* ═══════════════════════════════════════════════ */}
      <section id="models" className="halftone-bg relative py-24 px-6" style={{ background: "#f2efe8" }}>
        <div className="max-w-6xl mx-auto">
          <SectionReveal>
            <div className="text-center mb-16">
              <p
                style={{
                  fontFamily: '"DM Mono", monospace',
                  fontSize: "0.7rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#ff5e1a",
                  marginBottom: "0.75rem",
                }}
              >
                The Lineup
              </p>
              <h2
                style={{
                  fontFamily: '"Clash Display", sans-serif',
                  fontSize: "clamp(2rem, 5vw, 3.2rem)",
                  fontWeight: 600,
                  color: "#1a1a18",
                  letterSpacing: "-0.01em",
                }}
              >
                Choose your starting point
              </h2>
              <p
                style={{
                  fontFamily: '"Instrument Serif", Georgia, serif',
                  fontSize: "1.1rem",
                  color: "#8a8580",
                  marginTop: "0.75rem",
                }}
              >
                Each model is semi-custom — pick your color, body style, and configuration.
              </p>
            </div>
          </SectionReveal>

          <div className="grid md:grid-cols-3 gap-8">
            {MODELS.map((model, i) => (
              <SectionReveal key={model.id} delay={i * 0.08}>
                <ProductCard
                  model={model}
                  onSelect={() => handleSelectModel(model.id)}
                />
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ═══════════════════════════════════════════════ */}
      {/* CONFIGURATOR                                   */}
      {/* ═══════════════════════════════════════════════ */}
      <section
        id="configure"
        ref={configuratorRef}
        className="relative py-24 px-6"
        style={{ background: "#e8e4db" }}
      >
        <div className="max-w-3xl mx-auto">
          <SectionReveal>
            <div
              style={{
                background: "#f2efe8",
                border: "1px solid #d4d0c8",
                padding: "2.5rem",
                boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
              }}
            >
              <Configurator selectedModelId={selectedModel} />
            </div>
          </SectionReveal>
        </div>
      </section>

      <SectionDivider />

      {/* ═══════════════════════════════════════════════ */}
      {/* GALLERY — Full-bleed photo grid                */}
      {/* ═══════════════════════════════════════════════ */}
      <section id="gallery" className="relative py-24 px-6" style={{ background: "#f2efe8" }}>
        <div className="max-w-5xl mx-auto">
          <SectionReveal>
            <div className="text-center mb-12">
              <p
                style={{
                  fontFamily: '"DM Mono", monospace',
                  fontSize: "0.7rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#ff5e1a",
                  marginBottom: "0.75rem",
                }}
              >
                From the Workshop
              </p>
              <h2
                style={{
                  fontFamily: '"Clash Display", sans-serif',
                  fontSize: "clamp(2rem, 5vw, 3.2rem)",
                  fontWeight: 600,
                  color: "#1a1a18",
                  letterSpacing: "-0.01em",
                }}
              >
                The details matter
              </h2>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {[
              { src: "/guitars/custom-body.jpg", alt: "Custom body — black with gold wood grain", span: "row-span-2" },
              { src: "/guitars/headstock-logo.jpg", alt: "Greater Guitars headstock with logo", span: "" },
              { src: "/guitars/custom-christmas.jpg", alt: "Custom Christmas tree headstock", span: "" },
              { src: "/guitars/live-gorillas.jpg", alt: "The Go Go Gorillas playing Greater Guitars live", span: "md:col-span-2" },
              { src: "/guitars/live-gorillas-closeup.jpg", alt: "Live performance close-up", span: "" },
            ].map((img) => (
              <SectionReveal key={img.src} className={img.span}>
                <div
                  style={{
                    overflow: "hidden",
                    height: "100%",
                    cursor: "pointer",
                    border: "1px solid #d4d0c8",
                    transition: "border-color 0.15s ease, box-shadow 0.15s ease",
                  }}
                  onClick={() => setLightboxSrc(img.src)}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "#ff5e1a";
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(255, 94, 26, 0.1)";
                    const imgEl = e.currentTarget.querySelector("img") as HTMLElement;
                    if (imgEl) imgEl.style.transform = "scale(1.03)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "#d4d0c8";
                    (e.currentTarget as HTMLElement).style.boxShadow = "none";
                    const imgEl = e.currentTarget.querySelector("img") as HTMLElement;
                    if (imgEl) imgEl.style.transform = "scale(1)";
                  }}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    loading="lazy"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                      transition: "transform 0.3s ease",
                      filter: "saturate(0.85)",
                    }}
                  />
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ═══════════════════════════════════════════════ */}
      {/* YOUTUBE                                        */}
      {/* ═══════════════════════════════════════════════ */}
      <section id="videos" className="relative py-24 px-6" style={{ background: "#e8e4db" }}>
        <div className="max-w-5xl mx-auto">
          <SectionReveal>
            <YouTubeVideos />
          </SectionReveal>
        </div>
      </section>

      <SectionDivider />

      {/* ═══════════════════════════════════════════════ */}
      {/* CREDENTIALS — Dark section                     */}
      {/* ═══════════════════════════════════════════════ */}
      <section id="about" className="halftone-bg halftone-dark relative py-24 px-6" style={{ background: "#1a1a18" }}>
        <div className="max-w-5xl mx-auto">
          <SectionReveal>
            <Credentials />
          </SectionReveal>
        </div>
      </section>

      <Footer />

      {/* LIGHTBOX */}
      {lightboxSrc && (
        <div
          className="lightbox-overlay"
          onClick={() => setLightboxSrc(null)}
        >
          <img src={lightboxSrc} alt="Gallery detail" />
        </div>
      )}

      {/* Section scroll indicator */}
      <ScrollNextButton />
    </div>
  );
}
