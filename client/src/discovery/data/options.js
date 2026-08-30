// Static option lists for the discovery form. Kept in a single file so tone
// stays consistent and it's easy to translate later.

export const BUSINESS_TYPES = [
  'Restaurant / Café',
  'Retail / Shop',
  'Car Services',
  'Clinic / Medical',
  'Beauty / Salon',
  'Real Estate',
  'Construction',
  'Technology',
  'Education',
  'Fitness / Gym',
  'Hotel / Hospitality',
  'Professional Services',
  'Personal Brand',
  'Other',
];

export const BUSINESS_DURATIONS = [
  'New / Not launched yet',
  'Less than 1 year',
  '1–3 years',
  '3–5 years',
  '5+ years',
];

export const REASONS = [
  'Get more customers',
  'Increase sales',
  'Build trust',
  'Show services',
  'Show products',
  'Receive bookings',
  'Receive orders',
  'Generate leads',
  'Show our location',
  'Build a professional brand',
  'Show previous work',
  'Compete with competitors',
  'Other',
];

export const PRIMARY_GOALS = [
  'More calls',
  'More WhatsApp messages',
  'More bookings',
  'More orders',
  'More store visits',
  'More online sales',
  'More inquiries',
  'Brand awareness',
  'Other',
];

export const AUDIENCES = [
  'Everyone',
  'Teenagers / Young People',
  'Adults',
  'Families',
  'Professionals',
  'Businesses',
  'Luxury / High-end Customers',
  'Local Customers',
  'International Customers',
  'Other',
];

export const OFFERING_TYPES = ['Products', 'Services', 'Both'];

export const QUANTITIES = ['1–5', '5–20', '20–50', '50–100', '100+'];

export const PRICE_OPTIONS = [
  'Yes',
  'No',
  'Only for some products/services',
  'Contact us for price',
];

export const YES_NO = ['Yes', 'No'];
export const YES_NO_SOMETIMES = ['Yes', 'No', 'Sometimes'];
export const YES_NO_UNSURE = ['Yes', 'No', 'Not sure'];

export const SECTIONS = [
  'Hero / Landing',
  'About Us',
  'Services',
  'Products',
  'Pricing',
  'Gallery',
  'Before & After',
  'Projects / Portfolio',
  'Testimonials',
  'Team',
  'FAQ',
  'Blog / News',
  'Contact',
  'Location / Map',
  'Social Media',
  'Booking',
  'Online Ordering',
  'Other',
];

export const FEATURES = [
  'WhatsApp button',
  'Phone call button',
  'Contact form',
  'Booking system',
  'Appointment system',
  'Online ordering',
  'Shopping cart',
  'Online payment',
  'Google Maps',
  'Branch selector',
  'Product search',
  'Product filtering',
  'Customer reviews',
  'Instagram integration',
  'Newsletter',
  'Login / Register',
  'Customer dashboard',
  'Admin dashboard',
  'Multi-language',
  'Other',
];

export const LANGUAGES = ['Arabic', 'English', 'Kurdish', 'Other'];

export const VISUAL_STYLES = [
  'Luxury',
  'Minimal',
  'Modern',
  'Professional',
  'Corporate',
  'Elegant',
  'Friendly',
  'Energetic',
  'Bold',
  'Creative',
  'Futuristic',
  'Technology',
  'Premium',
  'Dark',
  'Light',
  'Colorful',
  'Simple',
  'Artistic',
];

export const FEELINGS = [
  'Trust',
  'Luxury',
  'Professionalism',
  'Excitement',
  'Comfort',
  'Creativity',
  'Innovation',
  'Reliability',
  'Exclusivity',
  'Other',
];

export const ANIMATION_LEVELS = [
  { level: 1, label: 'Simple', hint: 'Static, quiet, focused on content.' },
  { level: 2, label: 'Subtle', hint: 'Small transitions, soft reveals.' },
  { level: 3, label: 'Modern', hint: 'Refined motion throughout — the current PORT-4 default.' },
  { level: 4, label: 'Highly Animated', hint: 'Rich, expressive movement on scroll and hover.' },
  { level: 5, label: 'Experimental', hint: 'Fully interactive, unconventional, motion-first.' },
];

export const THREE_D_LEVELS = [
  'Not needed',
  'Small 3D elements',
  'Some 3D sections',
  'Strong 3D experience',
  'Full immersive 3D',
];

export const INTERACTIONS = [
  'Smooth scrolling',
  'Scroll animations',
  'Parallax',
  'Magnetic buttons',
  'Cursor effects',
  'Text animations',
  'Image reveal animations',
  '3D objects',
  'Particle effects',
  'Interactive cards',
  'Page transitions',
  'Hover effects',
  'Video backgrounds',
  'Other',
];

export const AVOID = [
  'Too complicated',
  'Too colorful',
  'Too corporate',
  'Too childish',
  'Too dark',
  'Too futuristic',
  'Too animated',
  'Too simple',
  'Other',
];

export const CONTENT_AVAILABILITY = [
  'Yes, everything',
  'Some content',
  'Only basic information',
  'No, I need help creating it',
];

export const PHOTO_AVAILABILITY = ['Yes', 'Some', 'No'];
export const VIDEO_AVAILABILITY = ['Yes', 'No'];

export const TRUST_FACTORS = [
  'Years of experience',
  'Certifications',
  'Awards',
  'Famous clients',
  'Large customer base',
  'Qualified team',
  'Premium products',
  'Warranty',
  'Fast service',
  'Free delivery',
  'Other',
];

export const DAYS = [
  { key: 'sat', label: 'Saturday' },
  { key: 'sun', label: 'Sunday' },
  { key: 'mon', label: 'Monday' },
  { key: 'tue', label: 'Tuesday' },
  { key: 'wed', label: 'Wednesday' },
  { key: 'thu', label: 'Thursday' },
  { key: 'fri', label: 'Friday' },
];

// Steps meta (used by progress + review).
export const STEPS = [
  { index: 0, id: '01', short: 'Business', title: 'Tell us about your business' },
  { index: 1, id: '02', short: 'Goals', title: "Let's understand your goals" },
  { index: 2, id: '03', short: 'Services', title: 'What do you offer?' },
  { index: 3, id: '04', short: 'Experience', title: "Let's design the experience" },
  { index: 4, id: '05', short: 'Final Details', title: 'Almost there' },
];
