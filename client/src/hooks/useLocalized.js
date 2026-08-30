import { useSelector } from 'react-redux';
import { translations } from '../i18n/translations.js';
import { pick, splitHeadline } from '../data/defaults.js';

// Hook: current language.
export function useLang() {
  return useSelector((s) => s.i18n.lang);
}

// Hook: translation function (UI chrome strings).
export function useT() {
  const lang = useLang();
  return (key) => {
    const table = translations[lang] || translations.en;
    return table[key] ?? translations.en[key] ?? key;
  };
}

// Hook: pick localized value from any {en, ar} shape (or a plain string).
export function useL() {
  const lang = useLang();
  return (value) => pick(value, lang);
}

// Draft content — used by dashboard editors.
export function useContent(section) {
  const data = useSelector((s) => (section ? s.content[section] : s.content));
  const lang = useLang();
  return { data, lang, l: (v) => pick(v, lang) };
}

// Published content — used by every public site component.
// Falls back to draft if published is missing (defensive; hydration should
// always seed it).
export function usePublicContent(section) {
  const data = useSelector((s) => {
    const source = s.published || s.content;
    return section ? source[section] : source;
  });
  const lang = useLang();
  return { data, lang, l: (v) => pick(v, lang) };
}

// Helper: split a "||"-delimited localized headline into segments.
export { splitHeadline };
