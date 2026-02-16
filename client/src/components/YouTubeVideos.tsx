import { VIDEOS } from "@/lib/content";

export default function YouTubeVideos() {
  return (
    <div>
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
          See It Live
        </p>
        <h2
          style={{
            fontFamily: '"Clash Display", sans-serif',
            fontSize: "clamp(2rem, 5vw, 3rem)",
            fontWeight: 600,
            color: "#1a1a18",
            letterSpacing: "-0.01em",
          }}
        >
          From the workshop to the stage
        </h2>
        <p
          style={{
            fontFamily: '"Instrument Serif", Georgia, serif',
            fontSize: "1.05rem",
            color: "#8a8580",
            marginTop: "0.75rem",
          }}
        >
          Watch the builds, hear the sound.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {VIDEOS.map((video, i) => (
          <div key={i}>
            {video.youtubeId ? (
              <div
                style={{
                  position: "relative",
                  aspectRatio: "16/9",
                  overflow: "hidden",
                  border: "1px solid #d4d0c8",
                }}
              >
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}`}
                  title={video.title}
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    border: "none",
                  }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              <div
                className="flex items-center justify-center"
                style={{
                  aspectRatio: "16/9",
                  background: "#e8e4db",
                  border: "1px dashed #d4d0c8",
                }}
              >
                <div className="text-center">
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#d4d0c8"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ margin: "0 auto 0.75rem" }}
                  >
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                  <p
                    style={{
                      fontFamily: '"DM Mono", monospace',
                      fontSize: "0.7rem",
                      color: "#d4d0c8",
                    }}
                  >
                    YouTube video
                  </p>
                </div>
              </div>
            )}

            <p
              style={{
                fontFamily: '"Clash Display", sans-serif',
                fontSize: "0.95rem",
                fontWeight: 400,
                color: video.youtubeId ? "#1a1a18" : "#d4d0c8",
                marginTop: "0.75rem",
              }}
            >
              {video.title}
            </p>
            {video.description && (
              <p
                style={{
                  fontFamily: '"Instrument Serif", Georgia, serif',
                  fontSize: "0.85rem",
                  color: video.youtubeId ? "#8a8580" : "#d4d0c8",
                  marginTop: "0.25rem",
                }}
              >
                {video.description}
              </p>
            )}
          </div>
        ))}
      </div>

      <p
        className="text-center mt-6"
        style={{
          fontFamily: '"DM Mono", monospace',
          fontSize: "0.65rem",
          color: "#d4d0c8",
          fontStyle: "italic",
        }}
      >
        Alex — add your YouTube video IDs to content.ts to activate these embeds.
      </p>
    </div>
  );
}
