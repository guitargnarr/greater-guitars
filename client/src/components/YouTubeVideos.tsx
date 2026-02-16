import { VIDEOS } from "@/lib/content";

export default function YouTubeVideos() {
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
          See It Live
        </p>
        <h2
          style={{
            fontFamily: '"DM Serif Display", serif',
            fontSize: "clamp(2rem, 5vw, 3rem)",
            color: "#ebe1c8",
          }}
        >
          From the workshop to the stage
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
          Watch the builds, hear the sound.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {VIDEOS.map((video, i) => (
          <div key={i}>
            {/* Video container — 16:9 */}
            {video.youtubeId ? (
              <div
                style={{
                  position: "relative",
                  aspectRatio: "16/9",
                  borderRadius: "2px",
                  overflow: "hidden",
                  border: "1px solid rgba(200, 170, 90, 0.1)",
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
                  background: "rgba(20, 18, 14, 0.5)",
                  border: "1px dashed rgba(200, 170, 90, 0.1)",
                  borderRadius: "2px",
                }}
              >
                {/* Play icon placeholder */}
                <div className="text-center">
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="rgba(200, 170, 90, 0.2)"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ margin: "0 auto 0.75rem" }}
                  >
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                  <p
                    style={{
                      fontFamily: '"Inter", sans-serif',
                      fontSize: "0.75rem",
                      color: "rgba(200, 170, 90, 0.2)",
                      fontWeight: 300,
                    }}
                  >
                    YouTube video
                  </p>
                </div>
              </div>
            )}

            {/* Title */}
            <p
              style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: "0.85rem",
                color: video.youtubeId
                  ? "rgba(200, 170, 90, 0.6)"
                  : "rgba(200, 170, 90, 0.2)",
                fontWeight: 300,
                marginTop: "0.75rem",
              }}
            >
              {video.title}
            </p>
            {video.description && (
              <p
                style={{
                  fontFamily: '"Inter", sans-serif',
                  fontSize: "0.7rem",
                  color: video.youtubeId
                    ? "rgba(200, 170, 90, 0.4)"
                    : "rgba(200, 170, 90, 0.15)",
                  fontWeight: 300,
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
          fontFamily: '"Inter", sans-serif',
          fontSize: "0.7rem",
          color: "rgba(200, 170, 90, 0.25)",
          fontStyle: "italic",
          fontWeight: 300,
        }}
      >
        Alex — add your YouTube video IDs to content.ts to activate these embeds.
      </p>
    </div>
  );
}
