export const products = [
  {
    id: 4,
    name: 'Bone Straight 22" HD Lace',
    category: 'Bone Straight · HD Lace',
    specs: '22 inch · 130% Density · Glueless',
    price: 510,
    badge: 'Signature',
    badgeStyle: { background: 'linear-gradient(135deg,#E8C97A,#C9A96E)', color: '#1E1510', fontWeight: 600 },
    bgClass: 'prod-bg-4',
    imgFront: '/src/assets/straight-front.jpg',
    imgSide: '/src/assets/straight-side.jpg',
    viewers: 6,
    lengths: ['16"', '18"', '20"', '22"'],
    defaultLength: '22"',
    capSizes: ['S', 'M', 'L'],
    defaultCap: 'M',
    countdown: '2h 14m',
    delivery: 'Thursday',
    inStock: true,
  },
  {
    id: 1,
    name: 'Body Wave 24" HD Lace',
    category: 'Body Wave · HD Lace',
    specs: '24 inch · 150% Density · Glueless',
    price: 420,
    badge: 'Best Seller',
    badgeStyle: { background: 'linear-gradient(135deg,#C9A96E,#B8974A)', color: '#1E1510', fontWeight: 600 },
    bgClass: 'prod-bg-1',
    imgFront: '/src/assets/bodywave-front.jpg',
    imgSide: '/src/assets/bodywave-side.jpg',
    viewers: 8,
    lengths: ['18"', '20"', '24"', '26"', '28"'],
    defaultLength: '24"',
    capSizes: ['S', 'M', 'L'],
    defaultCap: 'M',
    countdown: '3h 22m',
    delivery: 'Thursday',
    inStock: true,
  },
  {
    id: 2,
    name: 'Deep Wave 26" HD Lace',
    category: 'Deep Wave · HD Lace',
    specs: '26 inch · 180% Density · Glueless',
    price: 460,
    badge: 'New',
    badgeStyle: { background: '#1E1510', color: 'var(--champagne)', border: '1px solid rgba(201,169,110,0.4)' },
    bgClass: 'prod-bg-2',
    imgFront: '/src/assets/deepwave-front.jpg',
    imgSide: '/src/assets/deepwave-side.jpg',
    viewers: 12,
    lengths: ['20"', '22"', '24"', '26"', '28"'],
    defaultLength: '26"',
    capSizes: ['S', 'M', 'L'],
    defaultCap: 'M',
    countdown: '1h 45m',
    delivery: 'Thursday',
    inStock: true,
  },
  {
    id: 3,
    name: 'Water Wave 22" HD Lace',
    category: 'Water Wave · HD Lace',
    specs: '22 inch · 150% Density · Glueless',
    price: 390,
    badge: null,
    bgClass: 'prod-bg-3',
    imgFront: '/src/assets/waterwave-front.jpg',
    imgSide: '/src/assets/waterwave-side.jpg',
    viewers: 5,
    lengths: ['16"', '18"', '22"', '24"'],
    defaultLength: '22"',
    capSizes: ['S', 'M', 'L'],
    defaultCap: 'M',
    countdown: '2h 14m',
    delivery: 'Thursday',
    inStock: true,
    waitlist: 47,
  },
];

export const collections = [
  {
    id: 1,
    tag: 'Signature Collection',
    name: 'Body Wave & Loose Curl',
    featured: true,
    bg: 'linear-gradient(145deg, #2A1F1A 0%, #4A3228 50%, #2A1F1A 100%)',
  },
  { id: 2, tag: 'Classic Edit', name: 'Silky Straight', bg: 'linear-gradient(145deg, #1E1510 0%, #3D2C22 100%)' },
  { id: 3, tag: 'Textured Series', name: 'Deep Wave', bg: 'linear-gradient(145deg, #3D2C22 0%, #5A4035 100%)' },
  { id: 4, tag: 'Curl Define', name: 'Kinky & Coily', bg: 'linear-gradient(145deg, #2A1F1A 0%, #3D2C22 100%)' },
  { id: 5, tag: 'Seasonal Drop', name: 'The New Arrivals', bg: 'linear-gradient(145deg, #4A3228 0%, #2A1F1A 100%)' },
];

export const reviews = [
  {
    id: 1, stars: 5,
    text: '"Honestly the best wig I\'ve ever owned. The hairline looks unbelievably natural — nobody can tell it\'s not my hair."',
    author: 'Danielle M.', location: 'Atlanta, GA', product: 'Silk Crown Body Wave', verified: true,
  },
  {
    id: 2, stars: 5,
    text: '"I\'ve spent thousands on salon appointments. This wig looks better, lasts longer, and I can install it myself in minutes."',
    author: 'Keisha T.', location: 'Houston, TX', product: 'Royal Wave 26"', verified: true,
  },
  {
    id: 3, stars: 5,
    text: '"The HD lace is *chef\'s kiss*. I wore it to my sister\'s wedding and had women asking who did my hair all night."',
    author: 'Monique L.', location: 'Miami, FL', product: 'Velvet Straight 22"', verified: true,
  },
  {
    id: 4, stars: 5,
    text: '"Second purchase and just as perfect as the first. The 2-year guarantee gave me confidence, but the quality speaks for itself."',
    author: 'Tiffany R.', location: 'Chicago, IL', product: 'Crown Curl 20"', verified: true,
  },
];

export const whyFeatures = [
  {
    num: '01', title: 'Ethically Sourced Hair',
    desc: 'Every strand is collected responsibly from verified, consenting donors. We ensure fair compensation and humane practices at every step of our supply chain.',
  },
  {
    num: '02', title: 'Natural Movement & Texture',
    desc: 'Premium cuticles kept intact and perfectly aligned for the silkiest, most natural feel. Our wigs move like your own hair — because they are real hair.',
  },
  {
    num: '03', title: 'Invisible HD Lace Technology',
    desc: 'Our proprietary HD lace melts seamlessly into every skin tone, creating a hairline so natural it\'s undetectable — even in the highest definition.',
  },
  {
    num: '04', title: 'Beginner-Friendly Installation',
    desc: 'Glueless design means flawless installation in under 10 minutes. No salon. No experience needed. Just confidence, immediately.',
  },
];

export const loyaltyTiers = [
  {
    icon: '🌿', name: 'Pearl', threshold: 'Free to join · 0–499 pts',
    perks: ['Early access to new drops', 'Birthday gift', '1pt per $1 spent', 'Member pricing'],
    featured: false,
  },
  {
    icon: '✦', name: 'Gold', threshold: '500–1,499 pts · ~2 purchases',
    perks: ['Everything in Pearl', 'Free express shipping always', 'Priority customer care', 'Exclusive Gold-only styles'],
    featured: true,
  },
  {
    icon: '👑', name: 'Platinum', threshold: '1,500+ pts · Top 5% of members',
    perks: ['Everything in Gold', 'Free annual wig maintenance kit', 'Invite-only preview events', 'Dedicated personal stylist'],
    featured: false,
  },
];

export const navLinks = ['Shop', 'Collections', 'Our Story', 'Journal', 'Contact'];

export const compareRows = [
  { feature: 'Hair Type', veloura: '100% Virgin Human', salon: 'Human / Mixed', synthetic: 'Synthetic Fiber' },
  { feature: 'Natural Look', veloura: '✓ Undetectable', salon: '✓ Natural', synthetic: '✗ Visible sheen', velouraCheck: true, syntheticCross: true },
  { feature: 'Heat Styling', veloura: '✓ Full range', salon: '✓ Yes', synthetic: '✗ Melts/damages', velouraCheck: true, syntheticCross: true },
  { feature: 'Lifespan', veloura: '✓ 1–2+ years', salon: '3–6 months', synthetic: '✗ 1–3 months', velouraCheck: true, syntheticCross: true },
  { feature: 'Installation', veloura: '✓ 10 min glueless', salon: '✗ Salon required', synthetic: '15–30 min', velouraCheck: true, salonCross: true },
  { feature: 'Lace Type', veloura: '✓ Invisible HD', salon: 'Varies', synthetic: '✗ None / basic', velouraCheck: true, syntheticCross: true },
  { feature: 'Ethical Sourcing', veloura: '✓ Verified', salon: 'Often unclear', synthetic: '✗ Unknown', velouraCheck: true, syntheticCross: true },
  { feature: 'Cost Per Wear', veloura: '✓ ~$1–3', salon: '$20–40+', synthetic: '$5–15', velouraCheck: true },
  { feature: '2-Year Guarantee', veloura: '✓ Included', salon: '✗ None', synthetic: '✗ None', velouraCheck: true, salonCross: true, syntheticCross: true },
];
