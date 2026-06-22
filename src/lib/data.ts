export const navLinks = [
  {
    label: "Products",
    children: [
      { label: "Home Design", href: "/solutions/home", desc: "Cloud design for efficient home interiors" },
      { label: "Commercial Design", href: "/solutions/commercial", desc: "Fast commercial space design" },
      { label: "E-commerce Studio", href: "/solutions/ecommerce", desc: "3D product photography" },
      { label: "Ad 3D Design", href: "/solutions/advertising", desc: "2D to 3D ad design" },
      { label: "Lighting Design", href: "/solutions/lighting", desc: "Professional lighting simulation" },
      { label: "Digital Education", href: "/solutions/education", desc: "Design education platform" },
    ],
  },
  {
    label: "AI Tools",
    children: [
      { label: "AI Smart Design", href: "/tools/ai-design", desc: "3-step AI-generated 3D spaces" },
      { label: "AI 3D Modeling", href: "/tools/ai-modeling", desc: "Text/image to 3D models" },
      { label: "AI Image Gen", href: "/tools/ai-image", desc: "High-quality renderings from prompts" },
    ],
  },
  {
    label: "Design Tools",
    children: [
      { label: "Room Designer", href: "/tools/room-designer", desc: "3D interior design studio" },
      { label: "Floor Plan", href: "/tools/floor-plan", desc: "2D floor plan editor" },
      { label: "Render Studio", href: "/tools/render", desc: "Cloud rendering engine" },
      { label: "Material Library", href: "/tools/materials", desc: "Thousands of 3D assets" },
    ],
  },
  { label: "Pricing", href: "/pricing" },
];

export const features = [
  {
    title: "3-Step Workflow",
    subtitle: "Zero learning curve",
    desc: "Minimal 3-step design workflow — get started instantly with no barriers.",
    icon: "workflow",
  },
  {
    title: "Lightning Render",
    subtitle: "Ideas become reality instantly",
    desc: "10 years of rendering technology — photorealistic results in seconds.",
    icon: "zap",
  },
  {
    title: "Ultimate Detail",
    subtitle: "Quality that matches your vision",
    desc: "Hair-level detail with premium material rendering and lighting.",
    icon: "sparkles",
  },
  {
    title: "Panorama & Video",
    subtitle: "More than one way to present",
    desc: "Panoramic tours, video animations, and diverse render outputs.",
    icon: "video",
  },
  {
    title: "Massive Asset Library",
    subtitle: "Perfect match for every design",
    desc: "Thousands of models and materials — drag, drop, and create.",
    icon: "library",
  },
];

export const industries = [
  {
    slug: "home",
    title: "Home Design",
    tagline: "Cloud design, more efficient home interiors",
    features: [
      "Import floor plans in CAD and multiple formats",
      "One-click drag & drop asset matching",
      "Cloud rendering with speed and quality combined",
    ],
    gradient: "from-blue-600 to-indigo-700",
  },
  {
    slug: "commercial",
    title: "Commercial Design",
    tagline: "Fast output, leading commercial design",
    features: [
      "Massive commercial asset library",
      "CAD smart recognition — 2D to 3D in seconds",
      "Instant renders, panoramas, and videos",
    ],
    gradient: "from-violet-600 to-purple-700",
  },
  {
    slug: "ecommerce",
    title: "E-commerce Studio",
    tagline: "3D rendering for stunning product shots",
    features: [
      "Complete product shots in 15 minutes",
      "One-stop e-commerce assets — 3D and 2D",
      "Cloud asset management with role-based access",
    ],
    gradient: "from-orange-500 to-red-600",
  },
  {
    slug: "advertising",
    title: "Ad 3D Design",
    tagline: "2D to 3D — simpler advertising design",
    features: [
      "One-click 2D to 3D conversion",
      "Real-scene matching for immersive effects",
      "Preset ad typography library",
    ],
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    slug: "lighting",
    title: "Lighting Design",
    tagline: "Second-level operations, professional lighting",
    features: [
      "True-to-life light rendering",
      "Real-time simulation preview",
      "Professional reports in minutes",
    ],
    gradient: "from-amber-500 to-yellow-600",
  },
  {
    slug: "education",
    title: "Digital Education",
    tagline: "Technology-powered design education",
    features: [
      "Education and student editions",
      "Digital teaching solution matrix",
      "Complete education service system",
    ],
    gradient: "from-cyan-500 to-blue-600",
  },
];

export const workflowSteps = [
  { step: "01", title: "Upload Files", desc: "Upload your floor plan or design files", action: "Upload Now" },
  { step: "02", title: "Place Models", desc: "Drag furniture and decor from the asset library", action: "Browse Library" },
  { step: "03", title: "Render Output", desc: "One-click cloud render for photorealistic results", action: "Start Render" },
];

export const testimonials = [
  {
    quote: "As a career-changer from computer science to design, I was taking orders within weeks. Rendering has become my full-time profession.",
    author: "Hunter",
    role: "Rendering Artist",
  },
  {
    quote: "The AI design tool helped us reduce project turnaround from 72 hours to 24 hours. The standardized workflow is a game-changer.",
    author: "Simon",
    role: "Design Director",
  },
  {
    quote: "Monthly active usage is near 100%. Over 3 million designs created. The panoramic viewer alone has 80 million views.",
    author: "Lisa",
    role: "Marketing VP",
  },
];

export const furnitureCatalog = [
  { id: "sofa", name: "Modern Sofa", category: "Seating", color: "#4a5568", size: [2.2, 0.85, 0.9] as [number, number, number] },
  { id: "table", name: "Dining Table", category: "Tables", color: "#8b6914", size: [1.6, 0.75, 0.9] as [number, number, number] },
  { id: "chair", name: "Accent Chair", category: "Seating", color: "#c05621", size: [0.7, 0.9, 0.7] as [number, number, number] },
  { id: "bed", name: "King Bed", category: "Bedroom", color: "#e2e8f0", size: [2.0, 0.5, 2.2] as [number, number, number] },
  { id: "desk", name: "Work Desk", category: "Office", color: "#2d3748", size: [1.4, 0.75, 0.7] as [number, number, number] },
  { id: "lamp", name: "Floor Lamp", category: "Lighting", color: "#f6e05e", size: [0.3, 1.6, 0.3] as [number, number, number] },
  { id: "plant", name: "Potted Plant", category: "Decor", color: "#38a169", size: [0.5, 1.2, 0.5] as [number, number, number] },
  { id: "bookshelf", name: "Bookshelf", category: "Storage", color: "#744210", size: [1.2, 2.0, 0.35] as [number, number, number] },
];

export const materialLibrary = [
  { id: "wood-oak", name: "Oak Wood", category: "Wood", color: "#c4a35a" },
  { id: "wood-walnut", name: "Walnut", category: "Wood", color: "#5c4033" },
  { id: "marble-white", name: "White Marble", category: "Stone", color: "#f0ece4" },
  { id: "marble-black", name: "Black Marble", category: "Stone", color: "#2d2d2d" },
  { id: "fabric-linen", name: "Linen Fabric", category: "Fabric", color: "#e8dcc8" },
  { id: "fabric-velvet", name: "Velvet", category: "Fabric", color: "#4a5568" },
  { id: "tile-subway", name: "Subway Tile", category: "Tile", color: "#f7fafc" },
  { id: "concrete", name: "Polished Concrete", category: "Stone", color: "#a0aec0" },
  { id: "brass", name: "Brushed Brass", category: "Metal", color: "#b8860b" },
  { id: "glass", name: "Clear Glass", category: "Glass", color: "#bee3f8" },
  { id: "leather", name: "Leather", category: "Fabric", color: "#744210" },
  { id: "paint-sage", name: "Sage Green", category: "Paint", color: "#9caf88" },
];

export const aiDesignStyles = [
  "Modern Minimalist",
  "Scandinavian",
  "New Chinese",
  "Cream Style",
  "European Classic",
  "American",
  "Wabi-Sabi",
  "Eclectic Mix",
  "Light Luxury",
];

export const pricingPlans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    features: ["5 renders/month", "Basic asset library", "AI design (3 uses/day)", "720p output", "Community support"],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Pro",
    price: "$29",
    period: "/month",
    features: ["Unlimited renders", "Full asset library", "Unlimited AI tools", "4K output", "Panorama & video", "Priority support"],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    features: ["Everything in Pro", "Team collaboration", "API access", "Custom branding", "Dedicated account manager", "SLA guarantee"],
    cta: "Contact Sales",
    popular: false,
  },
];
