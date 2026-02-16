import { TESTIMONIALS } from "@/lib/content";

const isPlaceholder = (t: { name: string }) => t.name === "Customer Name";

export default function Testimonials() {
  return (
    <div>
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
          What Players Say
        </p>
        <h2
          style={{
            fontFamily: '"DM Serif Display", serif',
            fontSize: "clamp(2rem, 5vw, 3rem)",
            color: "#ebe1c8",
          }}
        >
          Built on trust
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
          Real words from real players.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {TESTIMONIALS.map((t, i) => {
          const placeholder = isPlaceholder(t);
          return (
            <blockquote
              key={i}
              style={{
                background: placeholder
                  ? "rgba(20, 18, 14, 0.3)"
                  : "linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))",
                border: placeholder
                  ? "1px dashed rgba(200, 170, 90, 0.1)"
                  : "1px solid rgba(200, 170, 90, 0.1)",
                borderRadius: "2px",
                padding: "2rem",
                margin: 0,
                backdropFilter: placeholder ? "none" : "blur(20px)",
                WebkitBackdropFilter: placeholder ? "none" : "blur(20px)",
                boxShadow: placeholder
                  ? "none"
                  : "0 20px 60px -20px rgba(0,0,0,0.5), inset 0 1px 0 rgba(200, 170, 90, 0.06)",
              }}
            >
              {/* Quote mark */}
              <div
                style={{
                  fontFamily: '"DM Serif Display", serif',
                  fontSize: "4rem",
                  lineHeight: 0.8,
                  color: placeholder
                    ? "rgba(200, 170, 90, 0.1)"
                    : "rgba(200, 170, 90, 0.25)",
                  marginBottom: "1rem",
                }}
              >
                &ldquo;
              </div>

              {/* Quote text */}
              <p
                style={{
                  fontFamily: '"DM Serif Display", serif',
                  fontStyle: "italic",
                  fontSize: "1.05rem",
                  lineHeight: 1.7,
                  color: placeholder
                    ? "rgba(235, 225, 200, 0.2)"
                    : "rgba(235, 225, 200, 0.7)",
                  marginBottom: "1.5rem",
                }}
              >
                {t.quote}
              </p>

              {/* Attribution */}
              <footer>
                <cite
                  style={{
                    fontFamily: '"Inter", sans-serif',
                    fontStyle: "normal",
                    fontSize: "0.85rem",
                    color: placeholder
                      ? "rgba(200, 170, 90, 0.2)"
                      : "rgba(200, 170, 90, 0.6)",
                    fontWeight: 400,
                  }}
                >
                  {t.name}
                </cite>
                <p
                  style={{
                    fontFamily: '"Inter", sans-serif',
                    fontSize: "0.7rem",
                    color: placeholder
                      ? "rgba(200, 170, 90, 0.15)"
                      : "rgba(200, 170, 90, 0.4)",
                    fontWeight: 300,
                    marginTop: "0.25rem",
                  }}
                >
                  {t.context}
                </p>
              </footer>
            </blockquote>
          );
        })}
      </div>

      <p
        className="text-center mt-6"
        style={{
          fontFamily: '"Inter", sans-serif',
          fontSize: "0.7rem",
          color: "rgba(200, 170, 90, 0.25)",
          fontStyle: "italic",
          fontWeight: 300,
        }}
      >
        Alex — replace these placeholders with real customer testimonials.
      </p>
    </div>
  );
}
