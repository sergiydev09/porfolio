import { es, type Translations } from './es';
import { en } from './en';

export type Language = 'es' | 'en';

// Translations map
export const translations: Record<Language, Translations> = { es, en };

// Reactive language state (Svelte 5 runes work in .svelte.ts files)
let currentLang = $state<Language>('es');

export function getLanguage(): Language {
  return currentLang;
}

export function setLanguage(lang: Language): void {
  currentLang = lang;
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('lang', lang);
  }
}

export function initLanguage(): void {
  if (typeof localStorage !== 'undefined') {
    const saved = localStorage.getItem('lang') as Language | null;
    if (saved && (saved === 'es' || saved === 'en')) {
      currentLang = saved;
    }
  }
}

// Get current translations object
export function getTranslations(): Translations {
  return translations[currentLang];
}

// Helper to get nested translation by dot notation key
export function t(key: string): string {
  const keys = key.split('.');
  let value: unknown = translations[currentLang];

  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = (value as Record<string, unknown>)[k];
    } else {
      return key; // Return key if translation not found
    }
  }

  return typeof value === 'string' ? value : key;
}

// Export translations type for components
export type { Translations };
