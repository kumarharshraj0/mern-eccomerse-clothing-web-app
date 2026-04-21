export const HERO_SLIDES = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=80",
    tag: "Top Collection",
    heading: ["CloudeyStyles."],
    description: "Discover our wide ranging and timeless of Lifestyle products. Pick your favourite stuff that matches your personal taste, style and suits your style.",
    cta: "Start shopping",
    link: "/shop",
    stats: [
      { value: "2k+", label: "Styles" },
      { value: "Premium", label: "Fabrics" },
      { value: "Global", label: "Shipping" },
    ],
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1445205170230-053b830c6039?auto=format&fit=crop&w=1600&q=80",
    tag: "Urban Editorial",
    heading: ["Modern", "Minimalism"],
    description: "Curated silhouettes that transition seamlessly from day to night. Discover our most versatile pieces yet.",
    cta: "Explore Styles",
    link: "/shop",
    stats: [
      { value: "Pure", label: "Cotton" },
      { value: "24/7", label: "Support" },
      { value: "Fast", label: "Delivery" },
    ],
  },
];

export const IMAGE_VARIANTS = {
  enter: (dir) => ({ opacity: 0, scale: 1.05, x: dir > 0 ? 50 : -50 }),
  center: { opacity: 1, scale: 1, x: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } },
  exit: (dir) => ({ opacity: 0, scale: 0.95, x: dir > 0 ? -50 : 50, transition: { duration: 0.8 } }),
};

export const TEXT_VARIANTS = {
  enter: { opacity: 0, y: 30 },
  center: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] } }),
  exit: { opacity: 0, y: -20, transition: { duration: 0.4 } },
};



