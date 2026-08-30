/**
 * API surface types, mirroring the Prisma models in `server/prisma/schema.prisma`.
 *
 * User-facing copy arrives as parallel `…En` / `…Ar` fields; `useL()` picks the
 * right one for the active language.
 */

export type Lang = "en" | "ar";

/** A bilingual value inside a JSON column (service outcomes, process tokens). */
export interface LocalizedEntry {
  en: string;
  ar: string;
}

// ─── Auth ────────────────────────────────────────────────────────────────────

export interface AdminUser {
  id: string;
  email: string;
  name: string | null;
  role: string;
}

export interface LoginResponse {
  token: string;
  admin: AdminUser;
}

// ─── Settings ────────────────────────────────────────────────────────────────

export interface SiteSettings {
  id: string;

  brandNameEn: string;
  brandNameAr: string;
  taglineEn: string;
  taglineAr: string;
  email: string;
  phone: string;
  locationEn: string;
  locationAr: string;

  heroHeadlineEn: string;
  heroHeadlineAr: string;
  heroAccentLine: number;
  heroSubcopyEn: string;
  heroSubcopyAr: string;
  heroTrustTitleEn: string;
  heroTrustTitleAr: string;
  heroTrustSubEn: string;
  heroTrustSubAr: string;

  trustHeadingEn: string;
  trustHeadingAr: string;
  trustAccentLine: number;
  trustBlurbEn: string;
  trustBlurbAr: string;

  aboutHeadingEn: string;
  aboutHeadingAr: string;
  aboutAccentLine: number;
  aboutBodyEn: string;
  aboutBodyAr: string;
  aboutBodyTwoEn: string;
  aboutBodyTwoAr: string;
  aboutTopologyTitleEn: string;
  aboutTopologyTitleAr: string;
  aboutTopologySubEn: string;
  aboutTopologySubAr: string;
  aboutCoreLabelEn: string;
  aboutCoreLabelAr: string;

  servicesHeadingEn: string;
  servicesHeadingAr: string;
  servicesAccentLine: number;

  processHeadingEn: string;
  processHeadingAr: string;
  processAccentLine: number;
  processBlurbEn: string;
  processBlurbAr: string;

  projectsHeadingEn: string;
  projectsHeadingAr: string;
  projectsAccentLine: number;
  projectsBlurbEn: string;
  projectsBlurbAr: string;

  partnersHeadingEn: string;
  partnersHeadingAr: string;
  partnersAccentLine: number;

  contactHeadingEn: string;
  contactHeadingAr: string;
  contactAccentLine: number;
  contactBlurbEn: string;
  contactBlurbAr: string;
  contactFormIntroEn: string;
  contactFormIntroAr: string;
  contactFormEncryptedEn: string;
  contactFormEncryptedAr: string;
  contactSubmitLabelEn: string;
  contactSubmitLabelAr: string;
  contactSubmitSendingEn: string;
  contactSubmitSendingAr: string;
  contactPrivacyNoteEn: string;
  contactPrivacyNoteAr: string;
  contactSuccessMessageEn: string;
  contactSuccessMessageAr: string;

  footerAboutBlurbEn: string;
  footerAboutBlurbAr: string;

  updatedAt: string;
}

// ─── Content collections ─────────────────────────────────────────────────────

export interface NavItem {
  id: string;
  labelEn: string;
  labelAr: string;
  href: string;
  order: number;
}

export interface SocialLink {
  id: string;
  icon: string;
  labelEn: string;
  labelAr: string;
  href: string;
  abbr: string;
  order: number;
}

export interface MarqueeItem {
  id: string;
  textEn: string;
  textAr: string;
  order: number;
}

export interface Stat {
  id: string;
  value: string;
  labelEn: string;
  labelAr: string;
  hintEn: string;
  hintAr: string;
  order: number;
}

export interface AboutBullet {
  id: string;
  textEn: string;
  textAr: string;
  order: number;
}

export interface TeamRole {
  id: string;
  roleEn: string;
  roleAr: string;
  count: number;
  noteEn: string;
  noteAr: string;
  order: number;
}

export interface Service {
  id: string;
  slug: string;
  tag: string;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  outcomes: LocalizedEntry[];
  stack: string[];
  active: boolean;
  order: number;
}

export interface ProcessStep {
  id: string;
  stepId: string;
  titleEn: string;
  titleAr: string;
  bodyEn: string;
  bodyAr: string;
  tokens: LocalizedEntry[];
  order: number;
}

export interface Project {
  id: string;
  slug: string;
  indexLabel: string;
  year: string;
  nameEn: string;
  nameAr: string;
  categoryEn: string;
  categoryAr: string;
  summaryEn: string;
  summaryAr: string;
  resultEn: string;
  resultAr: string;
  image: string;
  stack: string[];
  featured: boolean;
  active: boolean;
  order: number;
}

export interface Partner {
  id: string;
  nameEn: string;
  nameAr: string;
  logo: string;
  order: number;
}

export interface ProjectType {
  id: string;
  labelEn: string;
  labelAr: string;
  order: number;
}

export interface BudgetRange {
  id: string;
  label: string;
  order: number;
}

/** Everything the public site renders, from `GET /api/content`. */
export interface SiteContent {
  settings: SiteSettings;
  nav: NavItem[];
  social: SocialLink[];
  marquee: MarqueeItem[];
  stats: Stat[];
  aboutBullets: AboutBullet[];
  teamRoles: TeamRole[];
  services: Service[];
  processSteps: ProcessStep[];
  projects: Project[];
  partners: Partner[];
  projectTypes: ProjectType[];
  budgets: BudgetRange[];
}

// ─── Uploads ─────────────────────────────────────────────────────────────────

export interface UploadedFile {
  filename: string;
  url: string;
  originalName: string;
  mimeType: string;
  size: number;
}

// ─── Discovery brief ─────────────────────────────────────────────────────────

/** A file already uploaded; the brief carries the reference, not the bytes. */
export interface FileRef {
  url: string;
  originalName: string;
  mimeType: string;
  size: number;
}

export interface BriefProduct {
  id: string;
  name: string;
  description: string;
  price: string;
  image: FileRef | null;
  featured: boolean;
}

export interface BriefReview {
  id: string;
  customerName: string;
  text: string;
  rating: number;
}

export interface BriefTeamMember {
  id: string;
  name: string;
  position: string;
  bio: string;
  photo: FileRef | null;
}

export type WeekDay = "sat" | "sun" | "mon" | "tue" | "wed" | "thu" | "fri";

export interface BriefBusinessHour {
  day: WeekDay;
  closed: boolean;
  open: string;
  close: string;
}

export interface BriefAsset extends FileRef {
  id: string;
  category: string;
}

/** The complete client brief — the shape the discovery form produces. */
export interface ClientBrief {
  locale: Lang;

  business: {
    name: string;
    type: string;
    typeOther: string;
    duration: string;
    location: string;
    hasBranches: string;
    branchCount: number;
    description: string;
  };

  goals: {
    reasons: string[];
    reasonOther: string;
    primaryGoal: string;
    primaryGoalOther: string;
    targetAudience: string[];
    audienceOther: string;
    audienceDescription: string;
  };

  services: {
    offeringType: string;
    quantity: string;
    products: BriefProduct[];
    showPrices: string;
    hasPackages: string;
    packageDetails: string;
    hasOffers: string;
    offerDetails: string;
  };

  website: {
    sections: string[];
    sectionOther: string;
    features: string[];
    featureOther: string;
    languages: string[];
    languageOther: string;
    rtl: string;
  };

  brand: {
    hasLogo: string;
    logo: FileRef | null;
    hasColors: string;
    colors: string[];
    visualStyle: string[];
    desiredFeeling: string[];
    feelingOther: string;
  };

  design: {
    animationLevel: number;
    threeDLevel: string;
    interactions: string[];
    interactionOther: string;
    avoid: string[];
    avoidOther: string;
    references: string[];
  };

  content: {
    availability: string;
    photos: string;
    videos: string;
  };

  trust: {
    differentiators: string;
    competitiveAdvantage: string;
    trustFactors: string[];
    trustFactorOther: string;
    hasReviews: string;
    reviews: BriefReview[];
  };

  team: {
    showTeam: string;
    members: BriefTeamMember[];
  };

  contact: {
    whatsapp: string;
    phone: string;
    email: string;
    instagram: string;
    facebook: string;
    otherSocial: string;
    maps: string;
    address: string;
  };

  businessHours: BriefBusinessHour[];
  assets: BriefAsset[];

  final: {
    primaryAction: string;
    keywords: string[];
    mustInclude: string;
    mustAvoid: string;
    additionalNotes: string;
  };
}

// ─── Submissions ─────────────────────────────────────────────────────────────

export type SubmissionStatus = "new" | "reviewing" | "contacted" | "archived";

/** Row shape returned by the list endpoint — no `data` payload. */
export interface SubmissionSummary {
  id: string;
  businessName: string;
  businessType: string;
  contactEmail: string;
  contactPhone: string;
  contactWhatsapp: string;
  primaryGoal: string;
  locale: Lang;
  status: SubmissionStatus;
  isRead: boolean;
  submittedAt: string;
  _count: { files: number };
}

export interface SubmissionFile {
  id: string;
  submissionId: string;
  field: "logo" | "productImage" | "teamPhoto" | "asset";
  url: string;
  originalName: string;
  mimeType: string;
  size: number;
  createdAt: string;
}

/** Full record from the detail endpoint. */
export interface Submission extends Omit<SubmissionSummary, "_count"> {
  data: ClientBrief;
  files: SubmissionFile[];
  createdAt: string;
  updatedAt: string;
}

export interface SubmissionStats {
  total: number;
  unread: number;
  byStatus: Partial<Record<SubmissionStatus, number>>;
}

// ─── Inquiries (the short contact form) ──────────────────────────────────────

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  company: string;
  projectType: string;
  budget: string;
  message: string;
  status: SubmissionStatus;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
}

// ─── Dashboard overview ──────────────────────────────────────────────────────

export interface Overview {
  submissions: { total: number; unread: number };
  inquiries: { total: number; unread: number };
  content: { services: number; projects: number };
  recentSubmissions: Pick<
    SubmissionSummary,
    "id" | "businessName" | "businessType" | "status" | "isRead" | "submittedAt"
  >[];
  recentInquiries: Pick<Inquiry, "id" | "name" | "company" | "status" | "isRead" | "createdAt">[];
}
