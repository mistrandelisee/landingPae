<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { persistLocale } from '@/i18n'

const { t, locale } = useI18n()

const navOpen = ref(false)
const apiDocsOpen = ref(false)

const apiDocsItems = computed(() => [
  { href: '#', label: t('apiDocsMenu.httpApi') },
  { href: '#', label: t('apiDocsMenu.wooCommerce') },
  { href: '#', label: t('apiDocsMenu.shortcode') },
  { href: '#', label: t('apiDocsMenu.edd') },
  { href: '#', label: t('apiDocsMenu.give') },
  { href: '#', label: t('apiDocsMenu.androidSdk') },
  { href: '#', label: t('apiDocsMenu.pythonSdk') },
])

function closeNav() {
  navOpen.value = false
  apiDocsOpen.value = false
}

function setLocale(code: 'en' | 'fr') {
  locale.value = code
  closeNav()
}

function toggleApiDocsMobile() {
  if (typeof window !== 'undefined' && window.matchMedia('(min-width: 960px)').matches) {
    return
  }
  apiDocsOpen.value = !apiDocsOpen.value
}

watch(
  locale,
  (l) => {
    document.documentElement.lang = l
    persistLocale(l)
    document.title = `${t('brand.name')} — ${t('meta.titleSuffix')}`
  },
  { immediate: true },
)
</script>

<template>
  <header class="header">
    <div class="header__inner">
      <a href="#" class="brand">
        <span class="brand__text">{{ t('brand.name') }}</span>
      </a>

      <button
        type="button"
        class="nav-toggle"
        :aria-expanded="navOpen"
        :aria-label="t('a11y.menu')"
        @click="navOpen = !navOpen"
      >
        <span />
        <span />
        <span />
      </button>

      <nav class="nav" :class="{ 'nav--open': navOpen }" :aria-label="t('a11y.menu')">
        <a href="#home" @click="closeNav">{{ t('nav.home') }}</a>
        <a href="#about" @click="closeNav">{{ t('nav.about') }}</a>
        <a href="#services" @click="closeNav">{{ t('nav.services') }}</a>
        <div class="nav__dropdown" :class="{ 'nav__dropdown--open': apiDocsOpen }">
          <button
            id="api-docs-trigger"
            type="button"
            class="nav__dropdown-trigger"
            :aria-expanded="apiDocsOpen"
            aria-haspopup="true"
            aria-controls="api-docs-menu"
            @click="toggleApiDocsMobile"
          >
            <span>{{ t('nav.apiDocs') }}</span>
            <svg class="nav__chevron" width="10" height="6" viewBox="0 0 10 6" aria-hidden="true">
              <path
                d="M1 1.5L5 4.5L9 1.5"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
              />
            </svg>
          </button>
          <div
            id="api-docs-menu"
            class="nav__dropdown-panel"
            role="menu"
            aria-labelledby="api-docs-trigger"
          >
            <a
              v-for="(item, i) in apiDocsItems"
              :key="locale + '-' + i"
              role="menuitem"
              :href="item.href"
              class="nav__dropdown-link"
              @click="closeNav"
            >
              {{ item.label }}
            </a>
          </div>
        </div>
        <a href="#contact" @click="closeNav">{{ t('nav.contact') }}</a>
        <a href="#blog" @click="closeNav">{{ t('nav.blog') }}</a>
      </nav>

      <div class="header__actions">
        <a
          href="https://phoenix.small-pay.com/partner-portal/login?returnUrl=%2Fdashboard"
          class="link-signin"
          target="_blank"
          rel="noopener noreferrer"
        >{{ t('nav.signIn') }}</a>
        <a
          href="https://phoenix.small-pay.com/partner-portal/register"
          class="btn btn--navy"
          target="_blank"
          rel="noopener noreferrer"
        >{{ t('nav.signUp') }}</a>
        <div class="lang-switch" role="group" :aria-label="t('lang.switchToEn') + ' / ' + t('lang.switchToFr')">
          <button
            type="button"
            class="lang-switch__btn"
            :class="{ 'lang-switch__btn--active': locale === 'fr' }"
            @click="setLocale('fr')"
          >
            FR
          </button>
          <button
            type="button"
            class="lang-switch__btn"
            :class="{ 'lang-switch__btn--active': locale === 'en' }"
            @click="setLocale('en')"
          >
            EN
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  width: 100%;
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(0, 11, 51, 0.06);
}

.header__inner {
  width: min(100% - 2.5rem, var(--max-width));
  margin-inline: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  min-height: 72px;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: var(--navy);
  font-weight: 800;
  font-size: 1.25rem;
  letter-spacing: -0.02em;
}

.brand__text {
  line-height: 1;
}

.nav {
  display: none;
  align-items: center;
  gap: 1.75rem;
}

.nav a {
  color: var(--navy);
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 500;
  opacity: 0.85;
  transition: opacity 0.2s;
}

.nav a:hover {
  opacity: 1;
}

.nav__dropdown {
  position: relative;
}

.nav__dropdown-trigger {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  font: inherit;
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--navy);
  opacity: 0.85;
  transition: opacity 0.2s;
}

.nav__dropdown-trigger:hover {
  opacity: 1;
}

.nav__chevron {
  flex-shrink: 0;
  opacity: 0.75;
  transition: transform 0.2s;
}

.nav__dropdown-panel {
  z-index: 110;
}

.nav__dropdown-link {
  display: block;
  padding: 0.55rem 1.15rem;
  font-size: 0.92rem;
  font-weight: 500;
  color: var(--navy);
  text-decoration: none;
  white-space: nowrap;
}

.nav__dropdown-link:hover {
  background: rgba(0, 11, 51, 0.06);
}

.header__actions {
  display: none;
  align-items: center;
  gap: 0.75rem;
}

.lang-switch {
  display: flex;
  border: 1px solid rgba(0, 11, 51, 0.15);
  border-radius: 8px;
  overflow: hidden;
}

.lang-switch__btn {
  padding: 0.35rem 0.55rem;
  font-size: 0.72rem;
  font-weight: 700;
  border: none;
  background: transparent;
  color: var(--navy);
  opacity: 0.55;
  cursor: pointer;
  line-height: 1;
}

.lang-switch__btn:hover {
  opacity: 0.9;
}

.lang-switch__btn--active {
  background: var(--navy);
  color: var(--white);
  opacity: 1;
}

.link-signin {
  color: var(--navy);
  text-decoration: none;
  font-weight: 600;
  font-size: 0.95rem;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.65rem 1.35rem;
  border-radius: var(--radius-sm);
  font-weight: 600;
  font-size: 0.95rem;
  text-decoration: none;
  border: none;
  transition:
    transform 0.15s,
    box-shadow 0.2s;
}

.btn--navy {
  background: var(--navy);
  color: var(--white);
}

.btn--navy:hover {
  box-shadow: 0 8px 24px rgba(0, 11, 51, 0.25);
}

.nav-toggle {
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 0.5rem;
  background: none;
  border: none;
  cursor: pointer;
}

.nav-toggle span {
  width: 22px;
  height: 2px;
  background: var(--navy);
  border-radius: 1px;
}

@media (min-width: 960px) {
  .nav-toggle {
    display: none;
  }

  .nav {
    display: flex;
    position: static;
    background: none;
    padding: 0;
    flex-direction: row;
    align-items: center;
  }

  .nav__dropdown-panel {
    position: absolute;
    top: calc(100% + 14px);
    left: 50%;
    transform: translateX(-50%);
    min-width: 288px;
    padding: 0.45rem 0;
    background: var(--white);
    border: 1px solid rgba(0, 11, 51, 0.1);
    border-radius: var(--radius-sm);
    box-shadow: 0 16px 40px rgba(0, 11, 51, 0.12);
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    transition:
      opacity 0.15s ease,
      visibility 0.15s ease;
  }

  .nav__dropdown-panel::before {
    content: '';
    position: absolute;
    top: -6px;
    left: 50%;
    margin-left: -7px;
    width: 12px;
    height: 12px;
    background: var(--white);
    border-left: 1px solid rgba(0, 11, 51, 0.1);
    border-top: 1px solid rgba(0, 11, 51, 0.1);
    transform: rotate(45deg);
    z-index: 1;
  }

  .nav__dropdown:hover .nav__dropdown-panel,
  .nav__dropdown:focus-within .nav__dropdown-panel {
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
  }

  .header__actions {
    display: flex;
  }
}

@media (max-width: 959px) {
  .nav {
    display: none;
    position: absolute;
    left: 0;
    right: 0;
    top: 72px;
    flex-direction: column;
    padding: 1.25rem;
    background: var(--white);
    border-bottom: 1px solid rgba(0, 11, 51, 0.08);
    box-shadow: var(--shadow-card);
  }

  .nav--open {
    display: flex;
  }

  .header__actions {
    display: flex;
    gap: 0.75rem;
  }

  .link-signin {
    display: none;
  }

  .btn--navy {
    padding: 0.5rem 1rem;
    font-size: 0.85rem;
  }

  .nav__dropdown {
    width: 100%;
  }

  .nav__dropdown-trigger {
    justify-content: space-between;
    width: 100%;
    text-align: left;
    padding: 0.35rem 0;
  }

  .nav__dropdown-panel {
    position: static;
    margin: 0.25rem 0 0.5rem;
    padding: 0.35rem 0;
    background: rgba(0, 11, 51, 0.03);
    border-radius: var(--radius-sm);
    border: 1px solid rgba(0, 11, 51, 0.08);
    box-shadow: none;
    transform: none;
    min-width: unset;
  }

  .nav__dropdown-panel::before {
    display: none;
  }

  .nav__dropdown:not(.nav__dropdown--open) .nav__dropdown-panel {
    display: none;
  }

  .nav__dropdown--open .nav__dropdown-panel {
    display: flex;
    flex-direction: column;
  }

  .nav__dropdown--open .nav__chevron {
    transform: rotate(180deg);
  }

  .nav__dropdown-link {
    white-space: normal;
  }
}
</style>
