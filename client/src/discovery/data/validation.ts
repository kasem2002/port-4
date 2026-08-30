import type { ClientBrief } from "@/types";

/**
 * Per-step validation. `t` is supplied by the caller so messages come out in
 * the active language. The server re-checks all of this in
 * `server/src/validators/submission.validator.ts` — this exists to give the
 * client a friendly, immediate response, not to be the only gate.
 */

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const urlRe = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/\S*)?$/i;
const phoneRe = /^[+\d][\d\s\-()]{5,}$/;

type Translate = (key: string) => string;

/** Errors keyed by dot-path; an empty object means the step is valid. */
export function buildErrors(
  step: number,
  form: ClientBrief,
  t: Translate,
): Record<string, string> {
  const errors: Record<string, string> = {};

  switch (step) {
    case 0: {
      if (!form.business.name.trim()) errors["business.name"] = t("v.business.name");
      if (!form.business.type) errors["business.type"] = t("v.business.type");
      if (form.business.type === "Other" && !form.business.typeOther.trim()) {
        errors["business.typeOther"] = t("v.business.typeOther");
      }
      if (form.business.description.trim().length < 15) {
        errors["business.description"] = t("v.business.description");
      }
      break;
    }

    case 1: {
      if (form.goals.reasons.length === 0) errors["goals.reasons"] = t("v.goals.reasons");
      if (!form.goals.primaryGoal) errors["goals.primaryGoal"] = t("v.goals.primaryGoal");
      if (form.goals.targetAudience.length === 0) {
        errors["goals.targetAudience"] = t("v.goals.targetAudience");
      }
      break;
    }

    case 2: {
      if (!form.services.offeringType) {
        errors["services.offeringType"] = t("v.services.offeringType");
      }
      break;
    }

    case 3: {
      if (form.website.languages.length === 0) {
        errors["website.languages"] = t("v.website.languages");
      }
      if (form.website.languages.includes("Arabic") && !form.website.rtl) {
        errors["website.rtl"] = t("v.website.rtl");
      }
      break;
    }

    case 4: {
      if (!form.final.primaryAction.trim()) {
        errors["final.primaryAction"] = t("v.final.primaryAction");
      }

      const { whatsapp, phone, email } = form.contact;
      if (!whatsapp.trim() && !phone.trim() && !email.trim()) {
        errors["contact.__any"] = t("v.contact.any");
      }
      if (email.trim() && !emailRe.test(email.trim())) {
        errors["contact.email"] = t("v.contact.email");
      }
      if (phone.trim() && !phoneRe.test(phone.trim())) {
        errors["contact.phone"] = t("v.contact.phone");
      }
      if (whatsapp.trim() && !phoneRe.test(whatsapp.trim())) {
        errors["contact.whatsapp"] = t("v.contact.whatsapp");
      }

      form.design.references.forEach((reference, i) => {
        if (reference.trim() && !urlRe.test(reference.trim())) {
          errors[`design.references.${i}`] = t("v.design.reference");
        }
      });
      break;
    }

    default:
      break;
  }

  return errors;
}
