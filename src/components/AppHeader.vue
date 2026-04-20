<script setup lang="ts">
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { RouterLink, useRoute } from 'vue-router'
import { persistLocale } from '@/i18n'

const { t, locale } = useI18n()
const route = useRoute()

const navOpen = ref(false)

function closeNav() {
  navOpen.value = false
}

function setLocale(code: 'en' | 'fr') {
  locale.value = code
  closeNav()
}

watch(
  [locale, () => route.fullPath],
  () => {
    const l = locale.value
    document.documentElement.lang = l
    persistLocale(l)
    const titleKey = route.meta.titleKey as string | undefined
    document.title = titleKey
      ? `${t(titleKey)} — ${t('brand.name')}`
      : `${t('brand.name')} — ${t('meta.titleSuffix')}`
  },
  { immediate: true },
)
</script>

<template>
  <header class="header">
    <div class="header__inner">
      <RouterLink to="/" class="brand">
        <span class="brand__text">{{ t('brand.name') }}</span>
      </RouterLink>

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
        <RouterLink to="/#home" @click="closeNav">{{ t('nav.home') }}</RouterLink>
        <RouterLink to="/#about" @click="closeNav">{{ t('nav.about') }}</RouterLink>
        <RouterLink to="/#services" @click="closeNav">{{ t('nav.services') }}</RouterLink>
        <RouterLink to="/api-docs" @click="closeNav">{{ t('nav.apiDocs') }}</RouterLink>
        <RouterLink to="/#contact" @click="closeNav">{{ t('nav.contact') }}</RouterLink>
        <RouterLink to="/#blog" @click="closeNav">{{ t('nav.blog') }}</RouterLink>
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

.nav a.router-link-active {
  opacity: 1;
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
}
</style>
