/**
 * Credentials: Alex's story — dark section, editorial profile style
 */

export default function Credentials() {
  return (
    <div>
      {/* Header */}
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
          The Builder
        </p>
        <h2
          style={{
            fontFamily: '"Clash Display", sans-serif',
            fontSize: "clamp(2rem, 5vw, 3rem)",
            fontWeight: 600,
            color: "#f2efe8",
            letterSpacing: "-0.01em",
          }}
        >
          Alex MacLeod
        </h2>
      </div>

      {/* Bio */}
      <div className="max-w-2xl mx-auto mb-20">
        <p
          style={{
            fontFamily: '"Instrument Serif", Georgia, serif',
            fontSize: "1.1rem",
            lineHeight: 1.85,
            color: "rgba(242, 239, 232, 0.6)",
            textAlign: "center",
          }}
        >
          Greater Guitars is a one-person shop in Louisville, Kentucky. Every instrument
          is built by hand — from selecting the wood to winding the pickups to the final
          setup. This isn't a factory operation. It's a craft practice, informed by years of
          building, repairing, and playing alongside professional musicians.
        </p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-8 mb-20">
        {[
          { label: "Handmade", value: "Every one", detail: "No CNC, no templates. Each guitar shaped by hand." },
          { label: "Louisville, KY", value: "Built here", detail: "From a dedicated workshop in the city." },
          { label: "Repairs & builds", value: "Full service", detail: "From setups to ground-up custom instruments." },
        ].map((stat) => (
          <div
            key={stat.label}
            className="text-center"
            style={{
              padding: "2rem",
              border: "1px solid rgba(242, 239, 232, 0.08)",
            }}
          >
            <p
              style={{
                fontFamily: '"Clash Display", sans-serif',
                fontSize: "1.3rem",
                fontWeight: 600,
                color: "#f2efe8",
                marginBottom: "0.25rem",
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
                color: "#ff5e1a",
                marginBottom: "0.75rem",
              }}
            >
              {stat.label}
            </p>
            <p
              style={{
                fontFamily: '"Instrument Serif", Georgia, serif',
                fontSize: "0.9rem",
                color: "rgba(242, 239, 232, 0.4)",
                lineHeight: 1.6,
              }}
            >
              {stat.detail}
            </p>
          </div>
        ))}
      </div>

      {/* Musician slots */}
      <div className="text-center mb-10">
        <h3
          style={{
            fontFamily: '"Clash Display", sans-serif',
            fontSize: "1.4rem",
            fontWeight: 600,
            color: "#f2efe8",
            marginBottom: "0.5rem",
          }}
        >
          Trusted by players
        </h3>
        <p
          style={{
            fontFamily: '"Instrument Serif", Georgia, serif',
            fontSize: "0.95rem",
            color: "rgba(242, 239, 232, 0.4)",
          }}
        >
          Working musicians who play Greater Guitars instruments
        </p>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="text-center"
            style={{
              padding: "2rem 1.5rem",
              border: "1px dashed rgba(242, 239, 232, 0.1)",
            }}
          >
            <div
              className="mx-auto mb-3"
              style={{
                width: "3.5rem",
                height: "3.5rem",
                borderRadius: "50%",
                background: "rgba(242, 239, 232, 0.06)",
                border: "1px solid rgba(242, 239, 232, 0.1)",
              }}
            />
            <p
              style={{
                fontFamily: '"Clash Display", sans-serif',
                fontSize: "0.95rem",
                fontWeight: 400,
                color: "rgba(242, 239, 232, 0.3)",
                marginBottom: "0.25rem",
              }}
            >
              Musician Name
            </p>
            <p
              style={{
                fontFamily: '"DM Mono", monospace',
                fontSize: "0.65rem",
                color: "rgba(242, 239, 232, 0.2)",
              }}
            >
              Band / Project
            </p>
          </div>
        ))}
      </div>

      <p
        className="text-center mt-6"
        style={{
          fontFamily: '"DM Mono", monospace',
          fontSize: "0.65rem",
          color: "rgba(242, 239, 232, 0.2)",
          fontStyle: "italic",
        }}
      >
        Alex — replace these placeholders with your musician photos and names.
      </p>
    </div>
  );
}
