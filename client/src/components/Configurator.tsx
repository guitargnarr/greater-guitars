/**
 * Configurator: Interactive guitar builder form
 *
 * Flow: Select model → pick options → add notes → submit inquiry
 * Sends to greaterguitars@gmail.com via mailto (no backend needed)
 * Also offers full custom build inquiry path
 */

import { useState, useEffect } from "react";
import { MODELS, CUSTOM_BUILD_INFO, type GuitarModel } from "@/lib/products";

interface ConfiguratorProps {
  selectedModelId: string | null;
}

export default function Configurator({ selectedModelId }: ConfiguratorProps) {
  const [modelId, setModelId] = useState(selectedModelId || "");
  const [bodyStyle, setBodyStyle] = useState("");
  const [color, setColor] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [isCustom, setIsCustom] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const selectedModel = MODELS.find((m) => m.id === modelId);

  // Sync external selection
  useEffect(() => {
    if (selectedModelId) {
      setModelId(selectedModelId);
      setIsCustom(false);
      setSubmitted(false);
    }
  }, [selectedModelId]);

  // Reset options when model changes
  useEffect(() => {
    if (selectedModel) {
      setBodyStyle(selectedModel.bodyStyles[0] || "");
      setColor(selectedModel.colors[0] || "");
    }
  }, [modelId, selectedModel]);

  const handleSubmit = () => {
    const subject = isCustom
      ? "Custom Build Inquiry — Greater Guitars"
      : `${selectedModel?.name} Inquiry — Greater Guitars`;

    const body = isCustom
      ? `Name: ${name}\nEmail: ${email}\n\nCustom Build Details:\n${notes}`
      : `Name: ${name}\nEmail: ${email}\n\nModel: ${selectedModel?.name}\nBody Style: ${bodyStyle}\nColor: ${color}\nBase Price: $${selectedModel?.basePrice.toLocaleString()}\n\nAdditional Notes:\n${notes || "(none)"}`;

    window.location.href = `mailto:${CUSTOM_BUILD_INFO.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSubmitted(true);
  };

  const inputStyle = {
    fontFamily: '"Inter", sans-serif',
    fontSize: "0.85rem",
    color: "#ebe1c8",
    background: "rgba(20, 18, 14, 0.9)",
    border: "1px solid rgba(200, 170, 90, 0.15)",
    borderRadius: "1px",
    padding: "0.75rem 1rem",
    width: "100%",
    outline: "none",
    transition: "border-color 0.3s ease",
  };

  const labelStyle = {
    fontFamily: '"Inter", sans-serif',
    fontSize: "0.7rem",
    letterSpacing: "0.2em",
    textTransform: "uppercase" as const,
    color: "rgba(200, 170, 90, 0.5)",
    marginBottom: "0.5rem",
    display: "block",
  };

  if (submitted) {
    return (
      <div className="text-center py-16">
        <h3
          style={{
            fontFamily: '"DM Serif Display", serif',
            fontSize: "1.8rem",
            color: "#ebe1c8",
            marginBottom: "1rem",
          }}
        >
          Inquiry sent
        </h3>
        <p
          style={{
            fontFamily: '"Inter", sans-serif',
            fontSize: "0.9rem",
            color: "rgba(200, 170, 90, 0.6)",
            fontWeight: 300,
            lineHeight: 1.7,
          }}
        >
          Your email client should have opened with the details.
          <br />
          Alex will get back to you to discuss your build.
        </p>
        <button
          onClick={() => { setSubmitted(false); setModelId(""); setIsCustom(false); setNotes(""); }}
          style={{
            ...inputStyle,
            cursor: "pointer",
            marginTop: "2rem",
            maxWidth: "200px",
            border: "1px solid rgba(200, 170, 90, 0.3)",
            textAlign: "center",
          }}
        >
          Start over
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="text-center mb-12">
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
          {isCustom ? "Full Custom" : "Configure"}
        </p>
        <h2
          style={{
            fontFamily: '"DM Serif Display", serif',
            fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
            color: "#ebe1c8",
          }}
        >
          {isCustom ? "Describe your dream guitar" : "Build yours"}
        </h2>
      </div>

      {/* Toggle between model config and full custom */}
      <div className="flex justify-center gap-4 mb-10">
        <button
          onClick={() => setIsCustom(false)}
          style={{
            ...inputStyle,
            maxWidth: "180px",
            textAlign: "center",
            cursor: "pointer",
            background: !isCustom ? "rgba(200, 170, 90, 0.15)" : "rgba(20, 18, 14, 0.9)",
            borderColor: !isCustom ? "rgba(200, 170, 90, 0.3)" : "rgba(200, 170, 90, 0.1)",
          }}
        >
          From a model
        </button>
        <button
          onClick={() => setIsCustom(true)}
          style={{
            ...inputStyle,
            maxWidth: "180px",
            textAlign: "center",
            cursor: "pointer",
            background: isCustom ? "rgba(200, 170, 90, 0.15)" : "rgba(20, 18, 14, 0.9)",
            borderColor: isCustom ? "rgba(200, 170, 90, 0.3)" : "rgba(200, 170, 90, 0.1)",
          }}
        >
          Full custom
        </button>
      </div>

      <div className="space-y-6">
        {/* Model selection (not shown in custom mode) */}
        {!isCustom && (
          <>
            <div>
              <label style={labelStyle}>Model</label>
              <select
                value={modelId}
                onChange={(e) => setModelId(e.target.value)}
                style={{ ...inputStyle, cursor: "pointer" }}
              >
                <option value="">Select a model...</option>
                {MODELS.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name} — ${m.basePrice.toLocaleString()}
                  </option>
                ))}
              </select>
            </div>

            {selectedModel && (
              <>
                <div>
                  <label style={labelStyle}>Body style</label>
                  <div className="flex flex-wrap gap-3">
                    {selectedModel.bodyStyles.map((bs) => (
                      <button
                        key={bs}
                        onClick={() => setBodyStyle(bs)}
                        style={{
                          ...inputStyle,
                          width: "auto",
                          cursor: "pointer",
                          background: bodyStyle === bs ? "rgba(200, 170, 90, 0.15)" : "rgba(20, 18, 14, 0.9)",
                          borderColor: bodyStyle === bs ? "rgba(200, 170, 90, 0.35)" : "rgba(200, 170, 90, 0.1)",
                        }}
                      >
                        {bs}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>Color</label>
                  <div className="flex flex-wrap gap-3">
                    {selectedModel.colors.map((c) => (
                      <button
                        key={c}
                        onClick={() => setColor(c)}
                        className="flex items-center gap-2"
                        style={{
                          ...inputStyle,
                          width: "auto",
                          cursor: "pointer",
                          background: color === c ? "rgba(200, 170, 90, 0.15)" : "rgba(20, 18, 14, 0.9)",
                          borderColor: color === c ? "rgba(200, 170, 90, 0.35)" : "rgba(200, 170, 90, 0.1)",
                        }}
                      >
                        <span
                          style={{
                            width: "0.75rem",
                            height: "0.75rem",
                            borderRadius: "50%",
                            background: selectedModel.colorHexes[c] || "#888",
                            border: "1px solid rgba(255,255,255,0.15)",
                            display: "inline-block",
                          }}
                        />
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </>
        )}

        {/* Contact info */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label style={labelStyle}>Your name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              style={inputStyle}
              onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(200, 170, 90, 0.4)"; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(200, 170, 90, 0.15)"; }}
            />
          </div>
          <div>
            <label style={labelStyle}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              style={inputStyle}
              onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(200, 170, 90, 0.4)"; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(200, 170, 90, 0.15)"; }}
            />
          </div>
        </div>

        <div>
          <label style={labelStyle}>
            {isCustom ? "Describe your build" : "Additional notes (optional)"}
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
            placeholder={
              isCustom
                ? "Wood preferences, scale length, pickups, neck profile, any reference instruments..."
                : "Anything else Alex should know about what you're looking for..."
            }
            style={{ ...inputStyle, resize: "vertical" }}
            onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(200, 170, 90, 0.4)"; }}
            onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(200, 170, 90, 0.15)"; }}
          />
        </div>

        {/* Summary + Submit */}
        {!isCustom && selectedModel && (
          <div
            className="flex items-center justify-between px-4 py-3"
            style={{
              background: "rgba(200, 170, 90, 0.05)",
              borderRadius: "1px",
              border: "1px solid rgba(200, 170, 90, 0.08)",
            }}
          >
            <span
              style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: "0.8rem",
                color: "rgba(200, 170, 90, 0.5)",
              }}
            >
              {selectedModel.name} / {bodyStyle} / {color}
            </span>
            <span
              style={{
                fontFamily: '"DM Serif Display", serif',
                fontSize: "1.2rem",
                color: "#ebe1c8",
              }}
            >
              Starting at ${selectedModel.basePrice.toLocaleString()}
            </span>
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={!name || !email || (!isCustom && !modelId)}
          style={{
            fontFamily: '"Inter", sans-serif',
            fontSize: "0.8rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            fontWeight: 500,
            color: "#0c0a08",
            background: (!name || !email || (!isCustom && !modelId))
              ? "rgba(200, 170, 90, 0.3)"
              : "rgba(200, 170, 90, 0.9)",
            border: "none",
            padding: "1rem 2rem",
            borderRadius: "1px",
            cursor: (!name || !email || (!isCustom && !modelId)) ? "not-allowed" : "pointer",
            transition: "background 0.3s ease",
            width: "100%",
          }}
        >
          {isCustom ? "Send custom inquiry" : "Send inquiry to Alex"}
        </button>

        <p
          className="text-center"
          style={{
            fontFamily: '"Inter", sans-serif',
            fontSize: "0.7rem",
            color: "rgba(200, 170, 90, 0.3)",
            fontWeight: 300,
          }}
        >
          Opens your email client. Alex reviews every inquiry personally and follows up within 48 hours.
        </p>
      </div>
    </div>
  );
}
