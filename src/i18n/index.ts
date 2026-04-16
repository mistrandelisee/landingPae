import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import fr from './locales/fr.json'

export type LocaleMessages = typeof en

function getInitialLocale(): 'en' | 'fr' {
  if (typeof window === 'undefined') return 'fr'
  const saved = window.localStorage.getItem('locale')
  if (saved === 'en' || saved === 'fr') return saved
  if (window.navigator.language.toLowerCase().startsWith('fr')) return 'fr'
  return 'en'
}

export const i18n = createI18n({
  legacy: false,
  locale: getInitialLocale(),
  fallbackLocale: 'en',
  messages: {
    en,
    fr,
  },
})

export function persistLocale(locale: string) {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem('locale', locale)
  }
}
