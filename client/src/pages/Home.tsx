/**
 * Home: Greater Guitars — Hybrid cinematic + business site
 *
 * Structure:
 * 1. Cinematic hero (3D vibrating strings + brand statement)
 * 2. Philosophy strip (innovation + history)
 * 3. Product showcase (3 models)
 * 4. Configurator / inquiry form
 * 5. Credentials (Alex's work + musician relationships)
 * 6. Footer
 */

import { Suspense, useState, useRef } from "react";
import HeroScene from "@/components/HeroScene";
import ProductCard from "@/components/ProductCard";
import Configurator from "@/components/Configurator";
import Credentials from "@/components/Credentials";
import Footer from "@/components/Footer";
import { MODELS } from "@/lib/products";
import { useInView } from "@/hooks/useInView";

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
        <Suspense fallback={null}>
          <HeroScene />
        </Suspense>

        {/* Brand overlay */}
        <div className="relative z-10 text-center px-6 max-w-3xl">
          <h1
            style={{
              fontFamily: '"DM Serif Display", serif',
              fontSize: "clamp(2.8rem, 10vw, 5.5rem)",
              fontWeight: 400,
              color: "#e8dcc8",
              letterSpacing: "0.02em",
              lineHeight: 1.05,
              textShadow: "0 0 60px rgba(196, 154, 108, 0.2), 0 4px 20px rgba(0,0,0,0.8)",
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
              color: "rgba(196, 154, 108, 0.6)",
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
              color: "rgba(232, 220, 200, 0.55)",
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
                background: "linear-gradient(to bottom, transparent, rgba(196, 154, 108, 0.4))",
              }}
            />
            <svg
              width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="rgba(196, 154, 108, 0.35)" strokeWidth="1.5"
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

      {/* ═══════════════════════════════════════════════ */}
      {/* PHILOSOPHY STRIP                               */}
      {/* ═══════════════════════════════════════════════ */}
      <section className="py-24 px-6" style={{ background: "#0c0a08" }}>
        <div className="max-w-4xl mx-auto">
          <SectionReveal>
            <div className="grid md:grid-cols-2 gap-16">
              <div>
                <h3
                  style={{
                    fontFamily: '"DM Serif Display", serif',
                    fontSize: "clamp(1.4rem, 3vw, 1.8rem)",
                    color: "#e8dcc8",
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
                    color: "rgba(196, 154, 108, 0.65)",
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
                    color: "#e8dcc8",
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
                    color: "rgba(196, 154, 108, 0.65)",
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
              background: "linear-gradient(to right, transparent, rgba(196, 154, 108, 0.3), transparent)",
            }}
          />

          <SectionReveal>
            <p
              className="text-center max-w-2xl mx-auto"
              style={{
                fontFamily: '"DM Serif Display", serif',
                fontStyle: "italic",
                fontSize: "clamp(1.2rem, 3vw, 1.6rem)",
                color: "rgba(232, 220, 200, 0.5)",
                lineHeight: 1.6,
              }}
            >
              Sound is identity. The guitar you play shapes the music you make —
              and the music you make shapes who you become.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════ */}
      {/* MODELS — Product Showcase                      */}
      {/* ═══════════════════════════════════════════════ */}
      <section id="models" className="py-24 px-6" style={{ background: "#0e0c0a" }}>
        <div className="max-w-6xl mx-auto">
          <SectionReveal>
            <div className="text-center mb-16">
              <p
                style={{
                  fontFamily: '"Inter", sans-serif',
                  fontSize: "0.7rem",
                  letterSpacing: "0.4em",
                  textTransform: "uppercase",
                  color: "rgba(196, 154, 108, 0.45)",
                  marginBottom: "0.75rem",
                }}
              >
                The Lineup
              </p>
              <h2
                style={{
                  fontFamily: '"DM Serif Display", serif',
                  fontSize: "clamp(2rem, 5vw, 3rem)",
                  color: "#e8dcc8",
                }}
              >
                Choose your starting point
              </h2>
              <p
                style={{
                  fontFamily: '"Inter", sans-serif',
                  fontSize: "0.9rem",
                  color: "rgba(196, 154, 108, 0.5)",
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

      {/* ═══════════════════════════════════════════════ */}
      {/* CONFIGURATOR — Build Your Guitar               */}
      {/* ═══════════════════════════════════════════════ */}
      <section
        id="configure"
        ref={configuratorRef}
        className="py-24 px-6"
        style={{ background: "#0c0a08" }}
      >
        <div className="max-w-3xl mx-auto">
          <SectionReveal>
            <Configurator selectedModelId={selectedModel} />
          </SectionReveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════ */}
      {/* CREDENTIALS                                    */}
      {/* ═══════════════════════════════════════════════ */}
      <section id="about" className="py-24 px-6" style={{ background: "#0e0c0a" }}>
        <div className="max-w-5xl mx-auto">
          <SectionReveal>
            <Credentials />
          </SectionReveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════ */}
      {/* FOOTER                                         */}
      {/* ═══════════════════════════════════════════════ */}
      <Footer />
    </div>
  );
}
