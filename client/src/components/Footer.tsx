import { CUSTOM_BUILD_INFO } from "@/lib/products";

export default function Footer() {
  return (
    <footer
      className="py-16 px-6"
      style={{
        background: "#080604",
        borderTop: "1px solid rgba(196, 154, 108, 0.06)",
      }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h4
              style={{
                fontFamily: '"DM Serif Display", serif',
                fontSize: "1.3rem",
                color: "#e8dcc8",
                marginBottom: "0.75rem",
              }}
            >
              Greater Guitars
            </h4>
            <p
              style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: "0.8rem",
                lineHeight: 1.7,
                color: "rgba(196, 154, 108, 0.4)",
                fontWeight: 300,
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
                fontFamily: '"Inter", sans-serif',
                fontSize: "0.65rem",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "rgba(196, 154, 108, 0.35)",
                marginBottom: "1rem",
              }}
            >
              Navigate
            </p>
            <nav className="flex flex-col gap-2">
              {[
                { label: "Models", href: "#models" },
                { label: "Configure", href: "#configure" },
                { label: "About Alex", href: "#about" },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  style={{
                    fontFamily: '"Inter", sans-serif',
                    fontSize: "0.8rem",
                    color: "rgba(196, 154, 108, 0.5)",
                    textDecoration: "none",
                    fontWeight: 300,
                    transition: "color 0.3s ease",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(196, 154, 108, 0.8)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(196, 154, 108, 0.5)"; }}
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
                fontFamily: '"Inter", sans-serif',
                fontSize: "0.65rem",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "rgba(196, 154, 108, 0.35)",
                marginBottom: "1rem",
              }}
            >
              Get in touch
            </p>
            <a
              href={`mailto:${CUSTOM_BUILD_INFO.email}`}
              style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: "0.8rem",
                color: "rgba(196, 154, 108, 0.6)",
                textDecoration: "none",
                fontWeight: 300,
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
                  fontFamily: '"Inter", sans-serif',
                  fontSize: "0.8rem",
                  color: "rgba(196, 154, 108, 0.5)",
                  textDecoration: "none",
                  fontWeight: 300,
                }}
              >
                @greater_guitars
              </a>
            </div>
          </div>
        </div>

        {/* Bottom line */}
        <div
          className="pt-8 text-center"
          style={{ borderTop: "1px solid rgba(196, 154, 108, 0.06)" }}
        >
          <p
            style={{
              fontFamily: '"Inter", sans-serif',
              fontSize: "0.65rem",
              color: "rgba(196, 154, 108, 0.2)",
              fontWeight: 300,
            }}
          >
            &copy; {new Date().getFullYear()} Greater Guitars. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
