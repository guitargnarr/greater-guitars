import { useState } from "react";
import type { GuitarModel } from "@/lib/products";

interface ProductCardProps {
  model: GuitarModel;
  onSelect: () => void;
}

export default function ProductCard({ model, onSelect }: ProductCardProps) {
  const [imgIdx, setImgIdx] = useState(0);
  const hasImages = model.images.length > 0;

  return (
    <div
      className="group relative flex flex-col h-full"
      style={{
        background: "#fff",
        border: "1px solid #d4d0c8",
        overflow: "hidden",
        transition: "border-color 0.15s ease, box-shadow 0.15s ease",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "#ff5e1a";
        (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(255, 94, 26, 0.08)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "#d4d0c8";
        (e.currentTarget as HTMLElement).style.boxShadow = "none";
      }}
    >
      {/* Photo */}
      {hasImages && (
        <div style={{ position: "relative", aspectRatio: "4/3", overflow: "hidden" }}>
          <img
            src={model.images[imgIdx]}
            alt={`${model.name} — ${imgIdx + 1} of ${model.images.length}`}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
          {model.images.length > 1 && (
            <div
              className="flex gap-1.5 justify-center"
              style={{
                position: "absolute",
                bottom: "0.75rem",
                left: 0,
                right: 0,
              }}
            >
              {model.images.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setImgIdx(i); }}
                  style={{
                    width: "0.5rem",
                    height: "0.5rem",
                    borderRadius: "50%",
                    background: i === imgIdx ? "#ff5e1a" : "rgba(255,255,255,0.5)",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                    transition: "background 0.15s ease",
                  }}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Content */}
      <div className="flex flex-col flex-1 px-5 pt-4 pb-5">
        {/* Tagline badge */}
        <span className="tag-orange mb-3 self-start">{model.tagline}</span>

        <h3
          style={{
            fontFamily: '"Clash Display", sans-serif',
            fontSize: "1.5rem",
            fontWeight: 600,
            color: "#1a1a18",
            marginBottom: "0.25rem",
            letterSpacing: "-0.01em",
          }}
        >
          {model.name}
        </h3>

        <p
          style={{
            fontFamily: '"DM Mono", monospace',
            fontSize: "1rem",
            color: "#ff5e1a",
            marginBottom: "1rem",
            fontWeight: 500,
          }}
        >
          ${model.basePrice.toLocaleString()}
        </p>

        <p
          style={{
            fontFamily: '"Instrument Serif", Georgia, serif',
            fontSize: "1rem",
            lineHeight: 1.7,
            color: "#6a6a68",
            marginBottom: "1.25rem",
          }}
        >
          {model.description}
        </p>

        {/* Color swatches */}
        <div className="flex gap-2 mb-4">
          {model.colors.map((color) => (
            <div
              key={color}
              title={color}
              style={{
                width: "1.1rem",
                height: "1.1rem",
                borderRadius: "50%",
                background: model.colorHexes[color] || "#888",
                border: "1px solid #d4d0c8",
              }}
            />
          ))}
        </div>

        {/* Features */}
        <ul className="mt-auto mb-4" style={{ listStyle: "none", padding: 0 }}>
          {model.features.map((f) => (
            <li
              key={f}
              style={{
                fontFamily: '"DM Mono", monospace',
                fontSize: "0.7rem",
                color: "#8a8580",
                padding: "0.25rem 0",
                borderBottom: "1px solid #e8e4db",
              }}
            >
              {f}
            </li>
          ))}
        </ul>

        {/* Body styles */}
        <p
          style={{
            fontFamily: '"DM Mono", monospace',
            fontSize: "0.65rem",
            color: "#8a8580",
            marginBottom: "1.25rem",
          }}
        >
          Available as: {model.bodyStyles.join(" / ")}
        </p>

        <button
          onClick={onSelect}
          style={{
            fontFamily: '"DM Mono", monospace',
            fontSize: "0.7rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            fontWeight: 500,
            color: "#f2efe8",
            background: "#1a1a18",
            border: "none",
            padding: "0.85rem 1.5rem",
            cursor: "pointer",
            transition: "background 0.15s ease",
            width: "100%",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background = "#ff5e1a";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = "#1a1a18";
          }}
        >
          Configure & Inquire
        </button>
      </div>
    </div>
  );
}
