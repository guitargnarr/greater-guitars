/**
 * Home: Greater Guitars — Hybrid cinematic + business site
 *
 * Structure:
 * 1. Cinematic hero (paint-drip animation + brand statement)
 * 2. Philosophy strip (innovation + history)
 * 3. Testimonials (customer trust)
 * 4. Product showcase (3 models)
 * 5. Configurator / inquiry form
 * 6. Craft gallery (workshop + live photos)
 * 7. YouTube videos (brand content)
 * 8. Credentials (Alex's work + musician relationships)
 * 9. Footer
 */

import { useState, useRef } from "react";
import GrainDripHero from "@/components/GrainDripHero";
import GrainDripBg from "@/components/GrainDripBg";
import Logo from "@/components/Logo";
import ProductCard from "@/components/ProductCard";
import Configurator from "@/components/Configurator";
import Testimonials from "@/components/Testimonials";
import YouTubeVideos from "@/components/YouTubeVideos";
import Credentials from "@/components/Credentials";
import Footer from "@/components/Footer";
import { MODELS } from "@/lib/products";
import { useInView } from "@/hooks/useInView";

function AccentLine() {
  return (
    <div
      style={{
        height: "1px",
        background: "linear-gradient(90deg, transparent, rgba(200, 170, 90, 0.4), transparent)",
        margin: "0 auto",
        maxWidth: "80%",
      }}
    />
  );
}

function SectionReveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const [ref, inView] = useInView(0.15);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

export default function Home() {
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
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
      {/* HERO — Cinematic opening                       */}
      {/* ═══════════════════════════════════════════════ */}
      <section
        className="relative flex items-center justify-center overflow-hidden"
        style={{ height: "100dvh", minHeight: "600px", background: "#0c0a08" }}
      >
        <GrainDripHero />

        {/* Brand overlay */}
        <div className="relative z-10 text-center px-6 max-w-3xl">
          {/* Logo */}
          <div style={{ marginBottom: "2rem", animation: "fadeIn 1s ease-out 0.1s both" }}>
            <Logo size={100} showText={false} />
          </div>

          <h1
            style={{
              fontFamily: '"DM Serif Display", serif',
              fontSize: "clamp(2.8rem, 10vw, 5.5rem)",
              fontWeight: 400,
              color: "#ebe1c8",
              letterSpacing: "0.02em",
              lineHeight: 1.05,
              textShadow: "0 0 80px rgba(200, 170, 90, 0.25), 0 4px 20px rgba(0,0,0,0.8)",
              animation: "fadeUp 1.5s ease-out 0.3s both",
            }}
          >
            Greater Guitars
          </h1>
          <p
            style={{
              fontFamily: '"Inter", sans-serif',
              fontSize: "clamp(0.75rem, 2vw, 1rem)",
              fontWeight: 300,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "rgba(200, 170, 90, 0.6)",
              marginTop: "1.25rem",
              animation: "fadeIn 1s ease-out 1s both",
            }}
          >
            Handmade in Louisville
          </p>

          {/* Tagline — the philosophy hook */}
          <p
            style={{
              fontFamily: '"DM Serif Display", serif',
              fontStyle: "italic",
              fontSize: "clamp(1rem, 2.5vw, 1.35rem)",
              color: "rgba(235, 225, 200, 0.55)",
              marginTop: "2.5rem",
              lineHeight: 1.6,
              animation: "fadeIn 1s ease-out 1.6s both",
            }}
          >
            Every piece of wood has a voice. We just help it speak.
          </p>

          {/* Scroll indicator */}
          <div
            className="flex flex-col items-center"
            style={{ marginTop: "3rem", animation: "fadeIn 1s ease-out 2.2s both" }}
          >
            <div
              className="w-px"
              style={{
                height: "3rem",
                background: "linear-gradient(to bottom, transparent, rgba(200, 170, 90, 0.4))",
              }}
            />
            <svg
              width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="rgba(200, 170, 90, 0.35)" strokeWidth="1.5"
              strokeLinecap="round" strokeLinejoin="round"
              style={{ marginTop: "0.5rem", animation: "fadeUp 2s ease-in-out infinite alternate" }}
            >
              <path d="M7 13l5 5 5-5" />
            </svg>
          </div>
        </div>

        {/* Bottom gradient fade */}
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{ height: "30%", background: "linear-gradient(to bottom, transparent, #0c0a08)" }}
        />
      </section>

      <AccentLine />

      {/* ═══════════════════════════════════════════════ */}
      {/* PHILOSOPHY STRIP                               */}
      {/* ═══════════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-24 px-6" style={{ background: "#0c0a08" }}>
        <GrainDripBg />
        <div className="relative max-w-4xl mx-auto">
          <SectionReveal>
            <div className="grid md:grid-cols-2 gap-16">
              <div>
                <h3
                  style={{
                    fontFamily: '"DM Serif Display", serif',
                    fontSize: "clamp(1.4rem, 3vw, 1.8rem)",
                    color: "#ebe1c8",
                    marginBottom: "1rem",
                  }}
                >
                  Rooted in tradition
                </h3>
                <p
                  style={{
                    fontFamily: '"Inter", sans-serif',
                    fontSize: "0.95rem",
                    lineHeight: 1.85,
                    color: "rgba(200, 170, 90, 0.65)",
                    fontWeight: 300,
                  }}
                >
                  The best guitars were built by people who understood what came before them.
                  Every Greater Guitars instrument carries that lineage forward — the joinery,
                  the tonewoods, the hand-shaped necks. Some things don't improve with automation.
                </p>
              </div>
              <div>
                <h3
                  style={{
                    fontFamily: '"DM Serif Display", serif',
                    fontSize: "clamp(1.4rem, 3vw, 1.8rem)",
                    color: "#ebe1c8",
                    marginBottom: "1rem",
                  }}
                >
                  Built for what's next
                </h3>
                <p
                  style={{
                    fontFamily: '"Inter", sans-serif',
                    fontSize: "0.95rem",
                    lineHeight: 1.85,
                    color: "rgba(200, 170, 90, 0.65)",
                    fontWeight: 300,
                  }}
                >
                  Respect for history doesn't mean staying there. Modern players need instruments
                  that adapt — versatile electronics, ergonomic profiles, finishes that age
                  gracefully. Innovation isn't about reinventing the guitar. It's about removing
                  everything between the player and the sound.
                </p>
              </div>
            </div>
          </SectionReveal>

          {/* Divider */}
          <div
            className="mx-auto my-20"
            style={{
              width: "60px",
              height: "1px",
              background: "linear-gradient(to right, transparent, rgba(200, 170, 90, 0.3), transparent)",
            }}
          />

          <SectionReveal>
            <p
              className="text-center max-w-2xl mx-auto"
              style={{
                fontFamily: '"DM Serif Display", serif',
                fontStyle: "italic",
                fontSize: "clamp(1.2rem, 3vw, 1.6rem)",
                color: "rgba(235, 225, 200, 0.5)",
                lineHeight: 1.6,
              }}
            >
              Sound is identity. The guitar you play shapes the music you make —
              and the music you make shapes who you become.
            </p>
          </SectionReveal>
        </div>
      </section>

      <AccentLine />

      {/* ═══════════════════════════════════════════════ */}
      {/* TESTIMONIALS — Customer Trust                  */}
      {/* ═══════════════════════════════════════════════ */}
      <section className="relative py-24 px-6" style={{ background: "#0e0c0a" }}>
        <div className="max-w-5xl mx-auto">
          <SectionReveal>
            <Testimonials />
          </SectionReveal>
        </div>
      </section>

      <AccentLine />

      {/* ═══════════════════════════════════════════════ */}
      {/* MODELS — Product Showcase                      */}
      {/* ═══════════════════════════════════════════════ */}
      <section id="models" className="relative py-24 px-6" style={{ background: "#0e0c0a" }}>
        <div className="max-w-6xl mx-auto">
          <SectionReveal>
            <div className="text-center mb-16">
              <p
                style={{
                  fontFamily: '"Inter", sans-serif',
                  fontSize: "0.7rem",
                  letterSpacing: "0.4em",
                  textTransform: "uppercase",
                  color: "rgba(200, 170, 90, 0.45)",
                  marginBottom: "0.75rem",
                }}
              >
                The Lineup
              </p>
              <h2
                style={{
                  fontFamily: '"DM Serif Display", serif',
                  fontSize: "clamp(2rem, 5vw, 3rem)",
                  color: "#ebe1c8",
                }}
              >
                Choose your starting point
              </h2>
              <p
                style={{
                  fontFamily: '"Inter", sans-serif',
                  fontSize: "0.9rem",
                  color: "rgba(200, 170, 90, 0.5)",
                  marginTop: "1rem",
                  fontWeight: 300,
                }}
              >
                Each model is semi-custom — pick your color, body style, and configuration.
              </p>
            </div>
          </SectionReveal>

          <div className="grid md:grid-cols-3 gap-8">
            {MODELS.map((model, i) => (
              <SectionReveal key={model.id} delay={i * 0.15}>
                <ProductCard
                  model={model}
                  onSelect={() => handleSelectModel(model.id)}
                />
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      <AccentLine />

      {/* ═══════════════════════════════════════════════ */}
      {/* CONFIGURATOR — Build Your Guitar               */}
      {/* ═══════════════════════════════════════════════ */}
      <section
        id="configure"
        ref={configuratorRef}
        className="relative py-24 px-6"
        style={{ background: "#0c0a08" }}
      >
        <div className="max-w-3xl mx-auto">
          <SectionReveal>
            <div
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))",
                border: "1px solid rgba(200, 170, 90, 0.1)",
                borderRadius: "4px",
                padding: "2.5rem",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                boxShadow: "0 20px 60px -20px rgba(0,0,0,0.5), inset 0 1px 0 rgba(200, 170, 90, 0.06)",
              }}
            >
              <Configurator selectedModelId={selectedModel} />
            </div>
          </SectionReveal>
        </div>
      </section>

      <AccentLine />

      {/* ═══════════════════════════════════════════════ */}
      {/* CRAFT GALLERY — Workshop + Live                */}
      {/* ═══════════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-24 px-6" style={{ background: "#0e0c0a" }}>
        <GrainDripBg />
        <div className="relative max-w-5xl mx-auto">
          <SectionReveal>
            <div className="text-center mb-16">
              <p
                style={{
                  fontFamily: '"Inter", sans-serif',
                  fontSize: "0.7rem",
                  letterSpacing: "0.4em",
                  textTransform: "uppercase",
                  color: "rgba(200, 170, 90, 0.45)",
                  marginBottom: "0.75rem",
                }}
              >
                From the Workshop
              </p>
              <h2
                style={{
                  fontFamily: '"DM Serif Display", serif',
                  fontSize: "clamp(2rem, 5vw, 3rem)",
                  color: "#ebe1c8",
                }}
              >
                The details matter
              </h2>
            </div>
          </SectionReveal>

          {/* Masonry-style gallery */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { src: "/guitars/custom-body.jpg", alt: "Custom body — black with gold wood grain", span: "row-span-2" },
              { src: "/guitars/headstock-logo.jpg", alt: "Greater Guitars headstock with logo", span: "" },
              { src: "/guitars/custom-christmas.jpg", alt: "Custom Christmas tree headstock", span: "" },
              { src: "/guitars/live-gorillas.jpg", alt: "The Go Go Gorillas playing Greater Guitars live", span: "md:col-span-2" },
              { src: "/guitars/live-gorillas-closeup.jpg", alt: "Live performance close-up with Greater Guitars instrument", span: "" },
            ].map((img) => (
              <SectionReveal key={img.src} className={img.span}>
                <div
                  style={{
                    overflow: "hidden",
                    borderRadius: "2px",
                    border: "1px solid rgba(200, 170, 90, 0.08)",
                    height: "100%",
                    transition: "border-color 0.5s ease, box-shadow 0.5s ease",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(200, 170, 90, 0.25)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 0 30px rgba(200, 170, 90, 0.08)";
                    const img = e.currentTarget.querySelector("img") as HTMLElement;
                    if (img) img.style.transform = "scale(1.03)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(200, 170, 90, 0.08)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "none";
                    const img = e.currentTarget.querySelector("img") as HTMLElement;
                    if (img) img.style.transform = "scale(1)";
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
                      transition: "transform 0.6s ease",
                    }}
                  />
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      <AccentLine />

      {/* ═══════════════════════════════════════════════ */}
      {/* YOUTUBE — Brand Content                        */}
      {/* ═══════════════════════════════════════════════ */}
      <section id="videos" className="relative py-24 px-6" style={{ background: "#0c0a08" }}>
        <div className="max-w-5xl mx-auto">
          <SectionReveal>
            <YouTubeVideos />
          </SectionReveal>
        </div>
      </section>

      <AccentLine />

      {/* ═══════════════════════════════════════════════ */}
      {/* CREDENTIALS                                    */}
      {/* ═══════════════════════════════════════════════ */}
      <section id="about" className="relative overflow-hidden py-24 px-6" style={{ background: "#0e0c0a" }}>
        <GrainDripBg />
        <div className="relative max-w-5xl mx-auto">
          <SectionReveal>
            <Credentials />
          </SectionReveal>
        </div>
      </section>

      <AccentLine />

      {/* ═══════════════════════════════════════════════ */}
      {/* FOOTER                                         */}
      {/* ═══════════════════════════════════════════════ */}
      <Footer />
    </div>
  );
}
