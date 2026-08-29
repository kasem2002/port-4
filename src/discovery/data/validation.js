// Per-step validation. Returns { field: 'friendly message' } for each field
// that failed. Empty object === valid.

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const urlRe = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/\S*)?$/i;
const phoneRe = /^[+\d][\d\s\-()]{5,}$/;

export function validateStep(step, form) {
  const e = {};
  switch (step) {
    case 0: {
      if (!form.business.name.trim())
        e['business.name'] = 'Please tell us your business name so we can address it correctly.';
      if (!form.business.type)
        e['business.type'] = 'Choose the option that best describes what you do.';
      if (form.business.type === 'Other' && !form.business.typeOther.trim())
        e['business.typeOther'] = 'Let us know what kind of business this is.';
      if (!form.business.description.trim() || form.business.description.trim().length < 15)
        e['business.description'] =
          'Please share a couple of sentences about your business so we can plan properly.';
      break;
    }
    case 1: {
      if (form.goals.reasons.length === 0)
        e['goals.reasons'] = 'Pick at least one reason — this shapes the whole strategy.';
      if (!form.goals.primaryGoal)
        e['goals.primaryGoal'] =
          'Please choose your most important result so we know what to optimize for.';
      if (form.goals.targetAudience.length === 0)
        e['goals.targetAudience'] = 'Pick at least one audience so we design for the right people.';
      break;
    }
    case 2: {
      if (!form.services.offeringType)
        e['services.offeringType'] = 'Let us know if you offer products, services, or both.';
      break;
    }
    case 3: {
      if (form.website.languages.length === 0)
        e['website.languages'] = 'Choose at least one language for the website.';
      if (form.website.languages.includes('Arabic') && !form.website.rtl)
        e['website.rtl'] = 'Please let us know if Arabic should use a right-to-left layout.';
      break;
    }
    case 4: {
      if (!form.final.primaryAction.trim())
        e['final.primaryAction'] =
          'Please describe the single action you want visitors to take on your site.';
      const hasAnyContact =
        form.contact.whatsapp.trim() ||
        form.contact.phone.trim() ||
        form.contact.email.trim();
      if (!hasAnyContact)
        e['contact.__any'] =
          'Please add at least one way we can reach you — WhatsApp, phone or email.';
      if (form.contact.email && !emailRe.test(form.contact.email.trim()))
        e['contact.email'] = 'That email address does not look right — please double-check it.';
      if (form.contact.phone && !phoneRe.test(form.contact.phone.trim()))
        e['contact.phone'] = 'Please enter a valid phone number.';
      if (form.contact.whatsapp && !phoneRe.test(form.contact.whatsapp.trim()))
        e['contact.whatsapp'] = 'Please enter a valid WhatsApp number.';
      form.design.references.forEach((r, i) => {
        if (r && !urlRe.test(r.trim()))
          e[`design.references.${i}`] = 'That does not look like a valid URL.';
      });
      break;
    }
    default:
      break;
  }
  return e;
}

export function isStepValid(step, form) {
  return Object.keys(validateStep(step, form)).length === 0;
}
