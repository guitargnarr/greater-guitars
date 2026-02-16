export interface GuitarModel {
  id: string;
  name: string;
  basePrice: number;
  tagline: string;
  description: string;
  bodyStyles: string[];
  colors: string[];
  colorHexes: Record<string, string>;
  features: string[];
}

export const MODELS: GuitarModel[] = [
  {
    id: "danny-boy",
    name: "Danny Boy",
    basePrice: 850,
    tagline: "Where it all starts",
    description:
      "The Danny Boy is proof that a great guitar doesn't need to cost a fortune. Clean lines, honest tone, and the kind of playability that makes you pick it up every time you walk past it.",
    bodyStyles: ["Hardtail Guitar"],
    colors: ["Natural", "Sunburst", "Black"],
    colorHexes: { Natural: "#c49a6c", Sunburst: "#8B4513", Black: "#1a1a1a" },
    features: [
      "Solid body construction",
      "Set neck",
      "Handwound pickups",
      "Bone nut",
    ],
  },
  {
    id: "projector",
    name: "Projector",
    basePrice: 1200,
    tagline: "Your sound, amplified",
    description:
      "The Projector was designed for players who know what they want and need an instrument that gets out of the way. Versatile electronics, fast neck, and a voice that cuts through any mix.",
    bodyStyles: ["Hardtail Guitar", "Tremolo Guitar"],
    colors: ["Shell Pink", "Brown Trans", "Sea Foam Green"],
    colorHexes: { "Shell Pink": "#d4a0a0", "Brown Trans": "#8B6914", "Sea Foam Green": "#7fbfb0" },
    features: [
      "Contoured body",
      "Bolt-on maple neck",
      "Coil-split switching",
      "Stainless steel frets",
    ],
  },
  {
    id: "dantom",
    name: "The Dantom",
    basePrice: 1200,
    tagline: "No two are the same",
    description:
      "The Dantom is Greater Guitars at its most ambitious. Available in five configurations from tremolo to Bass VI, each one is built to the player's hand and ear. This is where semi-custom becomes personal.",
    bodyStyles: [
      "Tremolo Guitar",
      "Hardtail Guitar",
      "12 String Guitar",
      "Bass VI",
      "4 String Bass",
    ],
    colors: ["Yellow", "Lavender", "Shell Pink"],
    colorHexes: { Yellow: "#d4c870", Lavender: "#b0a0c8", "Shell Pink": "#d4a0a0" },
    features: [
      "5 body configurations",
      "Custom wound pickups per config",
      "Nitrocellulose finish",
      "Lifetime setup adjustments",
    ],
  },
];

export const CUSTOM_BUILD_INFO = {
  tagline: "Beyond the catalog",
  description:
    "If the models above are the starting point, a full custom build is the destination. Wood selection, scale length, pickup voicing, neck profile, inlay work — every decision is yours. Reach out to start the conversation.",
  email: "greaterguitars@gmail.com",
};
