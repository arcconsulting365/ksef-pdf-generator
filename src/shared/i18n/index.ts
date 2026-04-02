import pl from './pl.json';
import en from './en.json';

export type Lang = 'pl' | 'en';

const translations: Record<Lang, Record<string, string>> = { pl, en };

let currentLang: Lang = 'pl';

export function setInvoiceLang(lang: Lang): void {
  currentLang = lang;
}

export function t(key: string, params?: Record<string, string | number>): string {
  let text = translations[currentLang][key] ?? key;

  if (params) {
    for (const [k, v] of Object.entries(params)) {
      text = text.replace(`{${k}}`, String(v));
    }
  }
  return text;
}
