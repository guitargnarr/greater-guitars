import { CUSTOM_BUILD_INFO } from "@/lib/products";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer
      className="relative py-16 px-6"
      style={{
        background: "#1a1a18",
        borderTop: "1px solid rgba(242, 239, 232, 0.06)",
      }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <Logo size={32} showText={false} />
              <h4
                style={{
                  fontFamily: '"Clash Display", sans-serif',
                  fontSize: "1.2rem",
                  fontWeight: 600,
                  color: "#f2efe8",
                }}
              >
                Greater Guitars
              </h4>
            </div>
            <p
              style={{
                fontFamily: '"Instrument Serif", Georgia, serif',
                fontSize: "0.9rem",
                lineHeight: 1.7,
                color: "rgba(242, 239, 232, 0.4)",
              }}
            >
              Handmade guitars and repairs.
              <br />
              Louisville, Kentucky.
            </p>
          </div>

          {/* Links */}
          <div>
            <p
              style={{
                fontFamily: '"DM Mono", monospace',
                fontSize: "0.6rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "#ff5e1a",
                marginBottom: "1rem",
              }}
            >
              Navigate
            </p>
            <nav className="flex flex-col gap-2">
              {[
                { label: "Models", href: "#models" },
                { label: "Configure", href: "#configure" },
                { label: "Videos", href: "#videos" },
                { label: "About Alex", href: "#about" },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  style={{
                    fontFamily: '"DM Mono", monospace',
                    fontSize: "0.75rem",
                    color: "rgba(242, 239, 232, 0.5)",
                    textDecoration: "none",
                    transition: "color 0.15s ease",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#ff5e1a"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(242, 239, 232, 0.5)"; }}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <p
              style={{
                fontFamily: '"DM Mono", monospace',
                fontSize: "0.6rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "#ff5e1a",
                marginBottom: "1rem",
              }}
            >
              Get in touch
            </p>
            <a
              href={`mailto:${CUSTOM_BUILD_INFO.email}`}
              style={{
                fontFamily: '"DM Mono", monospace',
                fontSize: "0.75rem",
                color: "rgba(242, 239, 232, 0.6)",
                textDecoration: "none",
              }}
            >
              {CUSTOM_BUILD_INFO.email}
            </a>
            <div className="mt-3">
              <a
                href="https://www.instagram.com/greater_guitars/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: '"DM Mono", monospace',
                  fontSize: "0.75rem",
                  color: "rgba(242, 239, 232, 0.5)",
                  textDecoration: "none",
                }}
              >
                @greater_guitars
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div
          className="pt-8 text-center"
          style={{ borderTop: "1px solid rgba(242, 239, 232, 0.06)" }}
        >
          <p
            style={{
              fontFamily: '"DM Mono", monospace',
              fontSize: "0.6rem",
              color: "rgba(242, 239, 232, 0.2)",
            }}
          >
            &copy; {new Date().getFullYear()} Greater Guitars. Built by hand. Louisville, KY.
          </p>
        </div>
      </div>
    </footer>
  );
}
