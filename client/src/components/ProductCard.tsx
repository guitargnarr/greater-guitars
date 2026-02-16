import type { GuitarModel } from "@/lib/products";

interface ProductCardProps {
  model: GuitarModel;
  onSelect: () => void;
}

export default function ProductCard({ model, onSelect }: ProductCardProps) {
  return (
    <div
      className="group relative flex flex-col h-full"
      style={{
        background: "rgba(20, 18, 14, 0.8)",
        border: "1px solid rgba(196, 154, 108, 0.08)",
        borderRadius: "2px",
        overflow: "hidden",
        transition: "border-color 0.4s ease, transform 0.4s ease",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(196, 154, 108, 0.2)";
        (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(196, 154, 108, 0.08)";
        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
      }}
    >
      {/* Color swatches as header accent */}
      <div className="flex gap-2 px-6 pt-6">
        {model.colors.map((color) => (
          <div
            key={color}
            title={color}
            style={{
              width: "1.25rem",
              height: "1.25rem",
              borderRadius: "50%",
              background: model.colorHexes[color] || "#888",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 px-6 pt-4 pb-6">
        <p
          style={{
            fontFamily: '"Inter", sans-serif',
            fontSize: "0.65rem",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "rgba(196, 154, 108, 0.4)",
            marginBottom: "0.5rem",
          }}
        >
          {model.tagline}
        </p>

        <h3
          style={{
            fontFamily: '"DM Serif Display", serif',
            fontSize: "1.6rem",
            color: "#e8dcc8",
            marginBottom: "0.25rem",
          }}
        >
          {model.name}
        </h3>

        <p
          style={{
            fontFamily: '"DM Serif Display", serif',
            fontSize: "1.1rem",
            color: "rgba(196, 154, 108, 0.7)",
            marginBottom: "1.25rem",
          }}
        >
          ${model.basePrice.toLocaleString()}
        </p>

        <p
          style={{
            fontFamily: '"Inter", sans-serif',
            fontSize: "0.85rem",
            lineHeight: 1.75,
            color: "rgba(196, 154, 108, 0.5)",
            fontWeight: 300,
            marginBottom: "1.5rem",
          }}
        >
          {model.description}
        </p>

        {/* Features */}
        <ul className="mt-auto mb-6" style={{ listStyle: "none", padding: 0 }}>
          {model.features.map((f) => (
            <li
              key={f}
              style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: "0.75rem",
                color: "rgba(196, 154, 108, 0.4)",
                padding: "0.3rem 0",
                borderBottom: "1px solid rgba(196, 154, 108, 0.05)",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <span style={{ color: "rgba(196, 154, 108, 0.25)", fontSize: "0.5rem" }}>&#9670;</span>
              {f}
            </li>
          ))}
        </ul>

        {/* Body styles */}
        <p
          style={{
            fontFamily: '"Inter", sans-serif',
            fontSize: "0.7rem",
            color: "rgba(196, 154, 108, 0.3)",
            marginBottom: "1.5rem",
          }}
        >
          Available as: {model.bodyStyles.join(" / ")}
        </p>

        <button
          onClick={onSelect}
          style={{
            fontFamily: '"Inter", sans-serif',
            fontSize: "0.75rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            fontWeight: 500,
            color: "#0c0a08",
            background: "rgba(196, 154, 108, 0.85)",
            border: "none",
            padding: "0.85rem 1.5rem",
            borderRadius: "1px",
            cursor: "pointer",
            transition: "background 0.3s ease",
            width: "100%",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background = "rgba(212, 165, 116, 1)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = "rgba(196, 154, 108, 0.85)";
          }}
        >
          Configure &amp; Inquire
        </button>
      </div>
    </div>
  );
}
