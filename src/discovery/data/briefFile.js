// Serialization + delivery helpers for a submitted brief. Kept out of the
// slice so the slice stays pure.

// Envelope schema — versioned so the dashboard's importer can migrate old
// files if the form ever changes shape.
export const BRIEF_VERSION = 1;

export function buildBrief(form) {
  return {
    id: crypto.randomUUID(),
    version: BRIEF_VERSION,
    submittedAt: form.meta?.submittedAt || new Date().toISOString(),
    businessName: form.business?.name?.trim() || 'Untitled brief',
    form,
  };
}

// A .port4brief file is just JSON with a distinctive extension so drag-drop
// can auto-recognize it in the dashboard.
export function downloadBrief(brief) {
  const json = JSON.stringify(brief, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const safe = (brief.businessName || 'brief').toLowerCase().replace(/[^a-z0-9]+/gi, '-').slice(0, 40);
  const stamp = brief.submittedAt.slice(0, 10);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${safe}-${stamp}.port4brief`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Human-readable summary the client can paste into WhatsApp/email so the
// owner sees the essentials before opening the file.
export function briefSummary(brief) {
  const f = brief.form;
  const bits = [];
  bits.push(`New PORT-4 project brief`);
  bits.push(`Business: ${f.business?.name || '—'}`);
  if (f.business?.type) bits.push(`Type: ${f.business.type}`);
  if (f.business?.location) bits.push(`Location: ${f.business.location}`);
  if (f.goals?.primaryGoal) bits.push(`Primary goal: ${f.goals.primaryGoal}`);
  const contacts = [
    f.contact?.whatsapp && `WhatsApp: ${f.contact.whatsapp}`,
    f.contact?.phone && `Phone: ${f.contact.phone}`,
    f.contact?.email && `Email: ${f.contact.email}`,
  ].filter(Boolean);
  if (contacts.length) bits.push(contacts.join(' · '));
  bits.push('');
  bits.push('Full brief attached (.port4brief file).');
  return bits.join('\n');
}

// wa.me link — client taps and their WhatsApp opens pre-filled to the owner's
// number. `phone` is the owner's number in international format, no + prefix.
export function whatsappUrl(phone, text) {
  const clean = String(phone || '').replace(/[^\d]/g, '');
  return `https://wa.me/${clean}?text=${encodeURIComponent(text)}`;
}

export function mailtoUrl(email, subject, body) {
  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
