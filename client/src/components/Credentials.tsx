/**
 * Credentials: Alex's professional story and musician relationships
 *
 * Placeholder slots for real photos/names — Alex fills these in.
 * No fabricated testimonials or endorsements.
 */

export default function Credentials() {
  return (
    <div>
      {/* Header */}
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
          The Builder
        </p>
        <h2
          style={{
            fontFamily: '"DM Serif Display", serif',
            fontSize: "clamp(2rem, 5vw, 3rem)",
            color: "#ebe1c8",
          }}
        >
          Alex MacLeod
        </h2>
      </div>

      {/* Bio */}
      <div className="max-w-2xl mx-auto mb-20">
        <p
          style={{
            fontFamily: '"Inter", sans-serif',
            fontSize: "0.95rem",
            lineHeight: 1.9,
            color: "rgba(200, 170, 90, 0.6)",
            fontWeight: 300,
            textAlign: "center",
          }}
        >
          Greater Guitars is a one-person shop in Louisville, Kentucky. Every instrument
          is built by hand — from selecting the wood to winding the pickups to the final
          setup. This isn't a factory operation. It's a craft practice, informed by years of
          building, repairing, and playing alongside professional musicians.
        </p>
      </div>

      {/* Stats / Highlights */}
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
              background: "rgba(20, 18, 14, 0.5)",
              border: "1px solid rgba(200, 170, 90, 0.06)",
              borderRadius: "2px",
            }}
          >
            <p
              style={{
                fontFamily: '"DM Serif Display", serif',
                fontSize: "1.4rem",
                color: "#ebe1c8",
                marginBottom: "0.25rem",
              }}
            >
              {stat.value}
            </p>
            <p
              style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: "0.65rem",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "rgba(200, 170, 90, 0.45)",
                marginBottom: "0.75rem",
              }}
            >
              {stat.label}
            </p>
            <p
              style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: "0.8rem",
                color: "rgba(200, 170, 90, 0.4)",
                fontWeight: 300,
                lineHeight: 1.6,
              }}
            >
              {stat.detail}
            </p>
          </div>
        ))}
      </div>

      {/* Musician Relationships — placeholder slots */}
      <div className="text-center mb-10">
        <h3
          style={{
            fontFamily: '"DM Serif Display", serif',
            fontSize: "1.5rem",
            color: "#ebe1c8",
            marginBottom: "0.5rem",
          }}
        >
          Trusted by players
        </h3>
        <p
          style={{
            fontFamily: '"Inter", sans-serif',
            fontSize: "0.85rem",
            color: "rgba(200, 170, 90, 0.45)",
            fontWeight: 300,
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
              background: "rgba(20, 18, 14, 0.3)",
              border: "1px dashed rgba(200, 170, 90, 0.1)",
              borderRadius: "2px",
            }}
          >
            {/* Placeholder avatar */}
            <div
              className="mx-auto mb-3"
              style={{
                width: "3.5rem",
                height: "3.5rem",
                borderRadius: "50%",
                background: "rgba(200, 170, 90, 0.08)",
                border: "1px solid rgba(200, 170, 90, 0.1)",
              }}
            />
            <p
              style={{
                fontFamily: '"DM Serif Display", serif',
                fontSize: "0.95rem",
                color: "rgba(235, 225, 200, 0.35)",
                marginBottom: "0.25rem",
              }}
            >
              Musician Name
            </p>
            <p
              style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: "0.7rem",
                color: "rgba(200, 170, 90, 0.25)",
                fontWeight: 300,
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
          fontFamily: '"Inter", sans-serif',
          fontSize: "0.7rem",
          color: "rgba(200, 170, 90, 0.25)",
          fontStyle: "italic",
          fontWeight: 300,
        }}
      >
        Alex — replace these placeholders with your musician photos and names.
      </p>
    </div>
  );
}
