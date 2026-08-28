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

// Hook: pull content section from Redux with a localizer helper.
export function useContent(section) {
  const data = useSelector((s) => (section ? s.content[section] : s.content));
  const lang = useLang();
  return { data, lang, l: (v) => pick(v, lang) };
}

// Helper: split a "||"-delimited localized headline into segments.
export { splitHeadline };
