import { z } from "zod";

/**
 * Settings are edited section by section, so every field is optional and the
 * controller patches only what was sent. Localized copy is allowed to be
 * empty — a blank heading is a legitimate editorial choice.
 */
const text = z.string().optional();
const accent = z.number().int().min(-1).max(5).optional();

export const settingsSchema = z.object({
  // Brand
  brandNameEn: text,
  brandNameAr: text,
  taglineEn: text,
  taglineAr: text,
  email: z.string().email().or(z.literal("")).optional(),
  phone: text,
  locationEn: text,
  locationAr: text,

  // Hero
  heroHeadlineEn: text,
  heroHeadlineAr: text,
  heroAccentLine: accent,
  heroSubcopyEn: text,
  heroSubcopyAr: text,
  heroTrustTitleEn: text,
  heroTrustTitleAr: text,
  heroTrustSubEn: text,
  heroTrustSubAr: text,

  // Trust / stats
  trustHeadingEn: text,
  trustHeadingAr: text,
  trustAccentLine: accent,
  trustBlurbEn: text,
  trustBlurbAr: text,

  // About
  aboutHeadingEn: text,
  aboutHeadingAr: text,
  aboutAccentLine: accent,
  aboutBodyEn: text,
  aboutBodyAr: text,
  aboutBodyTwoEn: text,
  aboutBodyTwoAr: text,
  aboutTopologyTitleEn: text,
  aboutTopologyTitleAr: text,
  aboutTopologySubEn: text,
  aboutTopologySubAr: text,
  aboutCoreLabelEn: text,
  aboutCoreLabelAr: text,

  // Services
  servicesHeadingEn: text,
  servicesHeadingAr: text,
  servicesAccentLine: accent,

  // Process
  processHeadingEn: text,
  processHeadingAr: text,
  processAccentLine: accent,
  processBlurbEn: text,
  processBlurbAr: text,

  // Projects
  projectsHeadingEn: text,
  projectsHeadingAr: text,
  projectsAccentLine: accent,
  projectsBlurbEn: text,
  projectsBlurbAr: text,

  // Partners
  partnersHeadingEn: text,
  partnersHeadingAr: text,
  partnersAccentLine: accent,

  // Contact
  contactHeadingEn: text,
  contactHeadingAr: text,
  contactAccentLine: accent,
  contactBlurbEn: text,
  contactBlurbAr: text,
  contactFormIntroEn: text,
  contactFormIntroAr: text,
  contactFormEncryptedEn: text,
  contactFormEncryptedAr: text,
  contactSubmitLabelEn: text,
  contactSubmitLabelAr: text,
  contactSubmitSendingEn: text,
  contactSubmitSendingAr: text,
  contactPrivacyNoteEn: text,
  contactPrivacyNoteAr: text,
  contactSuccessMessageEn: text,
  contactSuccessMessageAr: text,

  // Footer
  footerAboutBlurbEn: text,
  footerAboutBlurbAr: text,
});
