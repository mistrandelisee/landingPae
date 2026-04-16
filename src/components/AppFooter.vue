<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <footer class="footer" id="blog">
    <div class="container footer__grid">
      <div class="footer__brand">
        <a href="#" class="brand brand--footer">
          <span class="brand__text">{{ t('brand.name') }}</span>
        </a>
        <div class="social-row social-row--footer">
          <a href="#" class="social social--inv" :aria-label="t('a11y.facebook')">f</a>
          <a href="#" class="social social--inv" :aria-label="t('a11y.twitter')">X</a>
          <a href="#" class="social social--inv" :aria-label="t('a11y.linkedin')">in</a>
        </div>
      </div>
      <div>
        <h4 class="footer__h">{{ t('footer.links') }}</h4>
        <ul class="footer__links">
          <li><a href="#home">{{ t('footer.home') }}</a></li>
          <li><a href="#about">{{ t('footer.aboutUs') }}</a></li>
          <li><a href="#contact">{{ t('footer.contactUs') }}</a></li>
          <li><a href="#services">{{ t('nav.apiDocs') }}</a></li>
        </ul>
      </div>
      <div>
        <h4 class="footer__h">{{ t('footer.services') }}</h4>
        <ul class="footer__links">
          <li><a href="#services">{{ t('footer.svcPayments') }}</a></li>
          <li><a href="#services">{{ t('footer.svcPayouts') }}</a></li>
          <li><a href="#services">{{ t('footer.svcInvoicing') }}</a></li>
          <li><a href="#services">{{ t('footer.svcApi') }}</a></li>
        </ul>
      </div>
      <div>
        <h4 class="footer__h">{{ t('footer.contact') }}</h4>
        <ul class="footer__links">
          <li>{{ t('contact.phone') }}</li>
          <li>
            <a :href="'mailto:' + t('contact.emailValue')">{{ t('contact.emailValue') }}</a>
          </li>
          <li>{{ t('contact.addressShort') }}</li>
        </ul>
      </div>
    </div>
    <div class="container footer__bottom">
      <p>
        {{
          t('footer.copyright', {
            year: new Date().getFullYear(),
            brand: t('brand.name'),
          })
        }}
      </p>
    </div>
  </footer>
</template>

<style scoped>
.container {
  width: min(100% - 2.5rem, var(--max-width));
  margin-inline: auto;
}

.footer {
  background: var(--navy);
  color: rgba(255, 255, 255, 0.85);
  padding-block: 3.5rem 1.5rem;
}

.footer__grid {
  display: grid;
  gap: 2.5rem;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
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

.brand--footer {
  color: var(--white);
}

.brand__text {
  line-height: 1;
}

.social-row {
  display: flex;
  gap: 0.65rem;
}

.social {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--navy);
  color: var(--white);
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  font-weight: 700;
  font-size: 0.85rem;
  transition:
    transform 0.15s,
    background 0.2s;
}

.social:hover {
  transform: scale(1.05);
  background: var(--navy-soft);
}

.social--inv {
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.social--inv:hover {
  background: rgba(255, 255, 255, 0.2);
}

.footer__h {
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-bottom: 1rem;
  color: var(--white);
}

.footer__links {
  list-style: none;
  padding: 0;
  font-size: 0.92rem;
}

.footer__links li + li {
  margin-top: 0.5rem;
}

.footer__links a {
  color: inherit;
  text-decoration: none;
  opacity: 0.85;
}

.footer__links a:hover {
  opacity: 1;
  color: var(--mint);
}

.footer__brand .social-row {
  margin-top: 1.25rem;
}

.footer__bottom {
  margin-top: 2.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.12);
  font-size: 0.85rem;
  opacity: 0.7;
  text-align: center;
}
</style>
