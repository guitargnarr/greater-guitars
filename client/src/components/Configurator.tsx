/**
 * Configurator: Interactive guitar builder form
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

  useEffect(() => {
    if (selectedModelId) {
      setModelId(selectedModelId);
      setIsCustom(false);
      setSubmitted(false);
    }
  }, [selectedModelId]);

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
    fontFamily: '"DM Mono", monospace',
    fontSize: "0.8rem",
    color: "#1a1a18",
    background: "#fff",
    border: "1px solid #d4d0c8",
    padding: "0.75rem 1rem",
    width: "100%",
    outline: "none",
    transition: "border-color 0.15s ease",
  };

  const labelStyle = {
    fontFamily: '"DM Mono", monospace',
    fontSize: "0.65rem",
    letterSpacing: "0.15em",
    textTransform: "uppercase" as const,
    color: "#8a8580",
    marginBottom: "0.5rem",
    display: "block",
  };

  if (submitted) {
    return (
      <div className="text-center py-16">
        <h3
          style={{
            fontFamily: '"Clash Display", sans-serif',
            fontSize: "1.8rem",
            fontWeight: 600,
            color: "#1a1a18",
            marginBottom: "1rem",
          }}
        >
          Inquiry sent
        </h3>
        <p
          style={{
            fontFamily: '"Instrument Serif", Georgia, serif',
            fontSize: "1.05rem",
            color: "#6a6a68",
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
      <div className="text-center mb-10">
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
          {isCustom ? "Full Custom" : "Configure"}
        </p>
        <h2
          style={{
            fontFamily: '"Clash Display", sans-serif',
            fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
            fontWeight: 600,
            color: "#1a1a18",
            letterSpacing: "-0.01em",
          }}
        >
          {isCustom ? "Describe your dream guitar" : "Build yours"}
        </h2>
      </div>

      {/* Toggle */}
      <div className="flex justify-center gap-4 mb-10">
        <button
          onClick={() => setIsCustom(false)}
          style={{
            ...inputStyle,
            maxWidth: "180px",
            textAlign: "center",
            cursor: "pointer",
            background: !isCustom ? "#1a1a18" : "#fff",
            color: !isCustom ? "#f2efe8" : "#1a1a18",
            borderColor: !isCustom ? "#1a1a18" : "#d4d0c8",
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
            background: isCustom ? "#1a1a18" : "#fff",
            color: isCustom ? "#f2efe8" : "#1a1a18",
            borderColor: isCustom ? "#1a1a18" : "#d4d0c8",
          }}
        >
          Full custom
        </button>
      </div>

      <div className="space-y-6">
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
                          background: bodyStyle === bs ? "#1a1a18" : "#fff",
                          color: bodyStyle === bs ? "#f2efe8" : "#1a1a18",
                          borderColor: bodyStyle === bs ? "#1a1a18" : "#d4d0c8",
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
                          background: color === c ? "#1a1a18" : "#fff",
                          color: color === c ? "#f2efe8" : "#1a1a18",
                          borderColor: color === c ? "#1a1a18" : "#d4d0c8",
                        }}
                      >
                        <span
                          style={{
                            width: "0.75rem",
                            height: "0.75rem",
                            borderRadius: "50%",
                            background: selectedModel.colorHexes[c] || "#888",
                            border: "1px solid #d4d0c8",
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

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label style={labelStyle}>Your name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              style={inputStyle}
              onFocus={(e) => { e.currentTarget.style.borderColor = "#ff5e1a"; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = "#d4d0c8"; }}
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
              onFocus={(e) => { e.currentTarget.style.borderColor = "#ff5e1a"; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = "#d4d0c8"; }}
            />
          </div>
        </div>

        <div>
          <label style={labelStyle}>
            {isCustom ? "What's your sound?" : "Anything else? (optional)"}
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
            onFocus={(e) => { e.currentTarget.style.borderColor = "#ff5e1a"; }}
            onBlur={(e) => { e.currentTarget.style.borderColor = "#d4d0c8"; }}
          />
        </div>

        {!isCustom && selectedModel && (
          <div
            className="flex items-center justify-between px-4 py-3"
            style={{
              background: "#e8e4db",
              border: "1px solid #d4d0c8",
            }}
          >
            <span
              style={{
                fontFamily: '"DM Mono", monospace',
                fontSize: "0.75rem",
                color: "#6a6a68",
              }}
            >
              {selectedModel.name} / {bodyStyle} / {color}
            </span>
            <span
              style={{
                fontFamily: '"Clash Display", sans-serif',
                fontSize: "1.1rem",
                fontWeight: 600,
                color: "#1a1a18",
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
            fontFamily: '"DM Mono", monospace',
            fontSize: "0.75rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            fontWeight: 500,
            color: "#f2efe8",
            background: (!name || !email || (!isCustom && !modelId))
              ? "#d4d0c8"
              : "#ff5e1a",
            border: "none",
            padding: "1rem 2rem",
            cursor: (!name || !email || (!isCustom && !modelId)) ? "not-allowed" : "pointer",
            transition: "background 0.15s ease",
            width: "100%",
          }}
        >
          {isCustom ? "Send custom inquiry" : "Send inquiry to Alex"}
        </button>

        <p
          className="text-center"
          style={{
            fontFamily: '"Instrument Serif", Georgia, serif',
            fontSize: "0.85rem",
            color: "#8a8580",
            fontStyle: "italic",
          }}
        >
          Opens your email client. Alex reviews every inquiry personally and follows up within 48 hours.
        </p>
      </div>
    </div>
  );
}
