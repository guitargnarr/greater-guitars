/**
 * Editorial content — testimonials and video embeds.
 * Alex: replace placeholder entries with real customer quotes and YouTube URLs.
 */

export interface Testimonial {
  quote: string;
  name: string;
  context: string; // e.g. "Danny Boy owner", "Custom build client"
}

export interface VideoEmbed {
  title: string;
  youtubeId: string | null; // null = placeholder; set to YouTube video ID
  description: string;
}

// ─── Testimonials ────────────────────────────────────────────
// Replace each placeholder with a real customer quote.
// Example:
//   { quote: "Best guitar I've ever played.", name: "John D.", context: "Danny Boy owner" }

export const TESTIMONIALS: Testimonial[] = [
  {
    quote: "Customer testimonial goes here — ask permission before displaying.",
    name: "Customer Name",
    context: "Model or project",
  },
  {
    quote: "Customer testimonial goes here — ask permission before displaying.",
    name: "Customer Name",
    context: "Model or project",
  },
  {
    quote: "Customer testimonial goes here — ask permission before displaying.",
    name: "Customer Name",
    context: "Model or project",
  },
];

// ─── YouTube Videos ──────────────────────────────────────────
// Set youtubeId to the video ID from the URL.
// Example: https://www.youtube.com/watch?v=abc123 → youtubeId: "abc123"

export const VIDEOS: VideoEmbed[] = [
  {
    title: "Video title",
    youtubeId: null,
    description: "Video description",
  },
  {
    title: "Video title",
    youtubeId: null,
    description: "Video description",
  },
  {
    title: "Video title",
    youtubeId: null,
    description: "Video description",
  },
];
