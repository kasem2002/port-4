import { z } from "zod";

export const SUBMISSION_STATUSES = ["new", "reviewing", "contacted", "archived"] as const;

/**
 * A file that has already been uploaded via POST /api/uploads. The brief
 * carries the returned reference, never the bytes.
 */
const fileRef = z
  .object({
    url: z.string().min(1),
    originalName: z.string().default(""),
    mimeType: z.string().default(""),
    size: z.number().int().min(0).default(0),
  })
  .nullable()
  .optional();

const product = z.object({
  id: z.string().min(1),
  name: z.string().default(""),
  description: z.string().default(""),
  price: z.string().default(""),
  image: fileRef,
  featured: z.boolean().default(false),
});

const review = z.object({
  id: z.string().min(1),
  customerName: z.string().default(""),
  text: z.string().default(""),
  rating: z.number().int().min(1).max(5).default(5),
});

const teamMember = z.object({
  id: z.string().min(1),
  name: z.string().default(""),
  position: z.string().default(""),
  bio: z.string().default(""),
  photo: fileRef,
});

const businessHour = z.object({
  day: z.enum(["sat", "sun", "mon", "tue", "wed", "thu", "fri"]),
  closed: z.boolean().default(false),
  open: z.string().default("09:00"),
  close: z.string().default("18:00"),
});

const asset = z.object({
  id: z.string().min(1),
  url: z.string().min(1),
  originalName: z.string().default(""),
  mimeType: z.string().default(""),
  size: z.number().int().min(0).default(0),
  category: z.string().default("other"),
});

/**
 * The full brief. Required fields mirror the client-side rules in
 * `client/src/discovery/data/validation.ts`, so a brief that passes in the
 * browser also passes here — and one that skips the browser still can't.
 */
export const submissionSchema = z.object({
  locale: z.enum(["en", "ar"]).default("en"),

  business: z.object({
    name: z.string().min(1, "Business name is required"),
    type: z.string().min(1, "Business type is required"),
    typeOther: z.string().default(""),
    duration: z.string().default(""),
    location: z.string().default(""),
    hasBranches: z.string().default(""),
    branchCount: z.number().int().min(0).default(1),
    description: z.string().min(15, "Tell us a little more about the business"),
  }),

  goals: z.object({
    reasons: z.array(z.string()).min(1, "Choose at least one reason"),
    reasonOther: z.string().default(""),
    primaryGoal: z.string().min(1, "A primary goal is required"),
    primaryGoalOther: z.string().default(""),
    targetAudience: z.array(z.string()).min(1, "Choose at least one audience"),
    audienceOther: z.string().default(""),
    audienceDescription: z.string().default(""),
  }),

  services: z.object({
    offeringType: z.string().min(1, "Tell us what you offer"),
    quantity: z.string().default(""),
    products: z.array(product).default([]),
    showPrices: z.string().default(""),
    hasPackages: z.string().default(""),
    packageDetails: z.string().default(""),
    hasOffers: z.string().default(""),
    offerDetails: z.string().default(""),
  }),

  website: z.object({
    sections: z.array(z.string()).default([]),
    sectionOther: z.string().default(""),
    features: z.array(z.string()).default([]),
    featureOther: z.string().default(""),
    languages: z.array(z.string()).min(1, "Choose at least one language"),
    languageOther: z.string().default(""),
    rtl: z.string().default(""),
  }),

  brand: z.object({
    hasLogo: z.string().default(""),
    logo: fileRef,
    hasColors: z.string().default(""),
    colors: z.array(z.string()).default([]),
    visualStyle: z.array(z.string()).max(5).default([]),
    desiredFeeling: z.array(z.string()).default([]),
    feelingOther: z.string().default(""),
  }),

  design: z.object({
    animationLevel: z.number().int().min(1).max(5).default(3),
    threeDLevel: z.string().default(""),
    interactions: z.array(z.string()).default([]),
    interactionOther: z.string().default(""),
    avoid: z.array(z.string()).default([]),
    avoidOther: z.string().default(""),
    references: z.array(z.string()).default([]),
  }),

  content: z.object({
    availability: z.string().default(""),
    photos: z.string().default(""),
    videos: z.string().default(""),
  }),

  trust: z.object({
    differentiators: z.string().default(""),
    competitiveAdvantage: z.string().default(""),
    trustFactors: z.array(z.string()).default([]),
    trustFactorOther: z.string().default(""),
    hasReviews: z.string().default(""),
    reviews: z.array(review).default([]),
  }),

  team: z.object({
    showTeam: z.string().default(""),
    members: z.array(teamMember).default([]),
  }),

  contact: z
    .object({
      whatsapp: z.string().default(""),
      phone: z.string().default(""),
      email: z.string().default(""),
      instagram: z.string().default(""),
      facebook: z.string().default(""),
      otherSocial: z.string().default(""),
      maps: z.string().default(""),
      address: z.string().default(""),
    })
    .refine(
      (c) => Boolean(c.whatsapp.trim() || c.phone.trim() || c.email.trim()),
      { message: "Provide at least one of WhatsApp, phone or email" },
    )
    .refine((c) => !c.email.trim() || z.string().email().safeParse(c.email.trim()).success, {
      message: "That email address does not look right",
      path: ["email"],
    }),

  businessHours: z.array(businessHour).default([]),
  assets: z.array(asset).default([]),

  final: z.object({
    primaryAction: z.string().min(1, "Tell us the one action visitors should take"),
    keywords: z.array(z.string()).default([]),
    mustInclude: z.string().default(""),
    mustAvoid: z.string().default(""),
    additionalNotes: z.string().default(""),
  }),
});

export type SubmissionInput = z.infer<typeof submissionSchema>;

export const submissionStatusSchema = z.object({
  status: z.enum(SUBMISSION_STATUSES).optional(),
  isRead: z.boolean().optional(),
});

export const submissionQuerySchema = z.object({
  status: z.enum(SUBMISSION_STATUSES).optional(),
  search: z.string().optional(),
});
