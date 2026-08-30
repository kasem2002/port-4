// Per-step validation. `t` is a translator supplied by the caller so error
// messages come out in the active language.

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const urlRe = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/\S*)?$/i;
const phoneRe = /^[+\d][\d\s\-()]{5,}$/;

export function buildErrors(step, form, t) {
  const e = {};
  switch (step) {
    case 0: {
      if (!form.business.name.trim()) e['business.name'] = t('v.business.name');
      if (!form.business.type) e['business.type'] = t('v.business.type');
      if (form.business.type === 'Other' && !form.business.typeOther.trim())
        e['business.typeOther'] = t('v.business.typeOther');
      if (!form.business.description.trim() || form.business.description.trim().length < 15)
        e['business.description'] = t('v.business.description');
      break;
    }
    case 1: {
      if (form.goals.reasons.length === 0) e['goals.reasons'] = t('v.goals.reasons');
      if (!form.goals.primaryGoal) e['goals.primaryGoal'] = t('v.goals.primaryGoal');
      if (form.goals.targetAudience.length === 0)
        e['goals.targetAudience'] = t('v.goals.targetAudience');
      break;
    }
    case 2: {
      if (!form.services.offeringType)
        e['services.offeringType'] = t('v.services.offeringType');
      break;
    }
    case 3: {
      if (form.website.languages.length === 0)
        e['website.languages'] = t('v.website.languages');
      if (form.website.languages.includes('Arabic') && !form.website.rtl)
        e['website.rtl'] = t('v.website.rtl');
      break;
    }
    case 4: {
      if (!form.final.primaryAction.trim())
        e['final.primaryAction'] = t('v.final.primaryAction');
      const hasAnyContact =
        form.contact.whatsapp.trim() ||
        form.contact.phone.trim() ||
        form.contact.email.trim();
      if (!hasAnyContact) e['contact.__any'] = t('v.contact.any');
      if (form.contact.email && !emailRe.test(form.contact.email.trim()))
        e['contact.email'] = t('v.contact.email');
      if (form.contact.phone && !phoneRe.test(form.contact.phone.trim()))
        e['contact.phone'] = t('v.contact.phone');
      if (form.contact.whatsapp && !phoneRe.test(form.contact.whatsapp.trim()))
        e['contact.whatsapp'] = t('v.contact.whatsapp');
      form.design.references.forEach((r, i) => {
        if (r && !urlRe.test(r.trim()))
          e[`design.references.${i}`] = t('v.design.reference');
      });
      break;
    }
    default:
      break;
  }
  return e;
}
