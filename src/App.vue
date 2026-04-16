<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import AppFooter from './components/AppFooter.vue'
import AppHeader from './components/AppHeader.vue'

const { t, locale } = useI18n()

const openFaq = ref<number | null>(0)

const faqs = computed(() => [
  { q: t('faq.q1'), a: t('faq.a1') },
  { q: t('faq.q2'), a: t('faq.a2') },
  { q: t('faq.q3'), a: t('faq.a3') },
])

function toggleFaq(i: number) {
  openFaq.value = openFaq.value === i ? null : i
}

const partnerPortalLoginUrl =
  'https://phoenix.small-pay.com/partner-portal/login?returnUrl=%2Fdashboard'

const heroImg =
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&h=700&fit=crop'
const flexImg =
  'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=600&fit=crop'
</script>

<template>
  <div class="page">
    <AppHeader />

    <main>
      <section id="home" class="hero section">
        <div class="hero__grid container">
          <div class="hero__copy">
            <h1 class="hero__title">
              {{ t('hero.titleBefore') }}
              <span class="brush">{{ t('hero.titleHighlight') }}</span>
              {{ t('hero.titleAfter') }}
            </h1>
            <p class="hero__sub">
              {{ t('hero.sub') }}
            </p>
            <a
              :href="partnerPortalLoginUrl"
              class="btn btn--yellow hero__cta"
              target="_blank"
              rel="noopener noreferrer"
            >{{ t('hero.cta') }}</a>
            <div class="hero__trust">
              <span class="trust-item">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                {{ t('hero.trustNoCard') }}
              </span>
              <span class="trust-item">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
                {{ t('hero.trustCompanies') }}
              </span>
            </div>
          </div>
          <div class="hero__visual">
            <div class="hero__photo-wrap">
              <img :src="heroImg" :alt="t('hero.altTeam')" class="hero__photo" width="900" height="700" />
              <div class="float-card float-card--chart">
                <div class="mini-bars">
                  <span /><span /><span /><span />
                </div>
                <span class="float-card__label">{{ t('hero.revenue') }}</span>
              </div>
              <div class="float-card float-card--stat">
                <strong>2,000,000</strong>
                <span>{{ t('hero.processed') }}</span>
              </div>
              <div class="float-card float-card--badge">100</div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" class="section features">
        <div class="container features__head">
          <h2 class="section-title">{{ t('features.title') }}</h2>
          <a href="#contact" class="btn btn--outline">{{ t('features.learnMore') }}</a>
        </div>
        <div class="container features__grid">
          <article class="feature-card">
            <div class="feature-card__icon feature-card__icon--1">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="2" y="5" width="20" height="14" rx="2" />
                <path d="M2 10h20" />
              </svg>
            </div>
            <h3>{{ t('features.managePayments.title') }}</h3>
            <p>{{ t('features.managePayments.desc') }}</p>
          </article>
          <article class="feature-card">
            <div class="feature-card__icon feature-card__icon--2">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
                <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
                <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
              </svg>
            </div>
            <h3>{{ t('features.checkout.title') }}</h3>
            <p>{{ t('features.checkout.desc') }}</p>
          </article>
          <article class="feature-card">
            <div class="feature-card__icon feature-card__icon--3">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="8" cy="8" r="6" />
                <circle cx="16" cy="8" r="6" />
                <path d="M9.9 14a6 6 0 0 0 4.1 4" />
              </svg>
            </div>
            <h3>{{ t('features.massPayouts.title') }}</h3>
            <p>{{ t('features.massPayouts.desc') }}</p>
          </article>
          <article class="feature-card">
            <div class="feature-card__icon feature-card__icon--4">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
              </svg>
            </div>
            <h3>{{ t('features.invoices.title') }}</h3>
            <p>{{ t('features.invoices.desc') }}</p>
          </article>
          <article class="feature-card">
            <div class="feature-card__icon feature-card__icon--5">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
              </svg>
            </div>
            <h3>{{ t('features.api.title') }}</h3>
            <p>{{ t('features.api.desc') }}</p>
          </article>
          <article class="feature-card">
            <div class="feature-card__icon feature-card__icon--6">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.3-4.3M11 8v6M8 11h6" />
              </svg>
            </div>
            <h3>{{ t('features.tracking.title') }}</h3>
            <p>{{ t('features.tracking.desc') }}</p>
          </article>
        </div>
      </section>

      <section id="about" class="section mesh">
        <div class="container mesh__grid">
          <div class="mesh__copy">
            <h2 class="section-title section-title--light">{{ t('flex.title') }}</h2>
            <ol class="mesh__list">
              <li>
                <span class="mesh__num">1</span>
                <div>
                  <h3>{{ t('flex.point1Title') }}</h3>
                  <p>{{ t('flex.point1Desc') }}</p>
                </div>
              </li>
              <li>
                <span class="mesh__num">2</span>
                <div>
                  <h3>{{ t('flex.point2Title') }}</h3>
                  <p>{{ t('flex.point2Desc') }}</p>
                </div>
              </li>
            </ol>
          </div>
          <div class="mesh__visual">
            <div class="mesh__photo-wrap">
              <img :src="flexImg" :alt="t('flex.altTeam')" width="800" height="600" />
              <div class="gauge-card">
                <div class="gauge" aria-hidden="true">
                  <span class="gauge__arc" />
                  <span class="gauge__value">665</span>
                </div>
                <span class="gauge-card__cap">{{ t('flex.gaugeCaption') }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="container mesh__stats">
          <div>
            <strong>99.5%</strong>
            <span>{{ t('flex.statUptime') }}</span>
          </div>
          <div>
            <strong>2K+</strong>
            <span>{{ t('flex.statIntegrations') }}</span>
          </div>
          <div>
            <strong>100%</strong>
            <span>{{ t('flex.statChargeback') }}</span>
          </div>
          <div>
            <strong>99.9%</strong>
            <span>{{ t('flex.statFraud') }}</span>
          </div>
        </div>
      </section>

      <section id="pricing" class="section pricing">
        <div class="container">
          <h2 class="section-title section-title--center">{{ t('pricing.title') }}</h2>
          <div class="pricing__grid">
            <article class="price-card">
              <div class="wire-icon" aria-hidden="true">
                <span class="wire-cube" />
              </div>
              <h3>{{ t('pricing.tier1Title') }}</h3>
              <p>{{ t('pricing.tier1Desc') }}</p>
            </article>
            <article class="price-card">
              <div class="wire-icon" aria-hidden="true">
                <span class="wire-cube wire-cube--2" />
              </div>
              <h3>{{ t('pricing.tier2Title') }}</h3>
              <p>{{ t('pricing.tier2Desc') }}</p>
            </article>
            <article class="price-card">
              <div class="wire-icon" aria-hidden="true">
                <span class="wire-cube wire-cube--3" />
              </div>
              <h3>{{ t('pricing.tier3Title') }}</h3>
              <p>{{ t('pricing.tier3Desc') }}</p>
            </article>
          </div>
        </div>
      </section>

      <section id="contact" class="section contact">
        <div class="container contact__grid">
          <div class="contact__intro">
            <h2 class="section-title">{{ t('contact.title') }}</h2>
            <p class="contact__sub">{{ t('contact.sub') }}</p>
            <div class="social-row">
              <a href="#" class="social" :aria-label="t('a11y.facebook')">f</a>
              <a href="#" class="social" :aria-label="t('a11y.twitter')">X</a>
              <a href="#" class="social" :aria-label="t('a11y.linkedin')">in</a>
              <a href="#" class="social" :aria-label="t('a11y.instagram')">◎</a>
            </div>
          </div>
          <div class="contact__card">
            <div class="contact__row">
              <span class="contact__label">{{ t('contact.location') }}</span>
              <p>{{ t('contact.addressLine1') }}<br />{{ t('contact.addressLine2') }}</p>
            </div>
            <div class="contact__row">
              <span class="contact__label">{{ t('contact.email') }}</span>
              <p>
                <a :href="'mailto:' + t('contact.emailValue')">{{ t('contact.emailValue') }}</a>
              </p>
            </div>
            <div class="contact__row">
              <span class="contact__label">{{ t('contact.whatsapp') }}</span>
              <p>
                <a href="tel:+15551234567">{{ t('contact.phone') }}</a>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section class="section faq">
        <div class="container faq__inner">
          <h2 class="section-title section-title--center">{{ t('faq.title') }}</h2>
          <p class="faq__sub">{{ t('faq.sub') }}</p>
          <ul class="faq__list">
            <li v-for="(item, i) in faqs" :key="locale + '-' + i" class="faq__item">
              <button type="button" class="faq__q" @click="toggleFaq(i)">
                {{ item.q }}
                <span class="faq__toggle">{{ openFaq === i ? '−' : '+' }}</span>
              </button>
              <div v-show="openFaq === i" class="faq__a">
                {{ item.a }}
              </div>
            </li>
          </ul>
        </div>
      </section>

      <section class="section mesh mesh--cta">
        <div class="container cta-row">
          <h2 class="section-title section-title--light cta-row__title">{{ t('cta.title') }}</h2>
          <a
            :href="partnerPortalLoginUrl"
            class="btn btn--yellow"
            target="_blank"
            rel="noopener noreferrer"
          >{{ t('cta.button') }}</a>
        </div>
      </section>
    </main>

    <AppFooter />
  </div>
</template>

<style scoped>
.page {
  overflow-x: hidden;
  padding-top: 72px;
}

.container {
  width: min(100% - 2.5rem, var(--max-width));
  margin-inline: auto;
}

.section {
  padding-block: clamp(3.5rem, 8vw, 6rem);
}

.section-title {
  font-size: clamp(1.75rem, 4vw, 2.35rem);
  font-weight: 800;
  color: var(--navy);
  line-height: 1.2;
  letter-spacing: -0.02em;
}

.section-title--center {
  text-align: center;
}

.section-title--light {
  color: var(--navy);
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

.btn--yellow {
  background: var(--yellow);
  color: var(--navy);
}

.btn--yellow:hover {
  transform: translateY(-1px);
  box-shadow: 0 10px 28px rgba(247, 209, 94, 0.45);
}

.btn--outline {
  border: 2px solid var(--navy);
  color: var(--navy);
  background: transparent;
}

.btn--outline:hover {
  background: var(--navy);
  color: var(--white);
}

/* Hero */
.hero__grid {
  display: grid;
  gap: 2.5rem;
  align-items: center;
}

@media (min-width: 900px) {
  .hero__grid {
    grid-template-columns: 1fr 1.05fr;
    gap: 3rem;
  }
}

.hero__title {
  font-size: clamp(2rem, 5vw, 3.1rem);
  font-weight: 800;
  color: var(--navy);
  line-height: 1.12;
  letter-spacing: -0.03em;
  margin-bottom: 1.25rem;
}

.brush {
  position: relative;
  z-index: 0;
  white-space: nowrap;
}

.brush::after {
  content: '';
  position: absolute;
  left: -0.12em;
  right: -0.12em;
  bottom: 0.08em;
  height: 0.42em;
  background: var(--mint);
  opacity: 0.75;
  border-radius: 6px;
  z-index: -1;
  transform: rotate(-1.5deg) skewX(-3deg);
}

.hero__sub {
  color: var(--text-muted);
  font-size: 1.05rem;
  max-width: 34ch;
  margin-bottom: 1.75rem;
}

.hero__cta {
  padding: 0.85rem 1.85rem;
  border-radius: var(--radius-md);
  margin-bottom: 1.75rem;
}

.hero__trust {
  display: flex;
  flex-wrap: wrap;
  gap: 1.25rem 2rem;
}

.trust-item {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  font-size: 0.88rem;
  color: var(--text-muted);
}

.trust-item svg {
  color: var(--mint);
  flex-shrink: 0;
}

.hero__photo-wrap {
  position: relative;
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-card);
}

.hero__photo {
  width: 100%;
  object-fit: cover;
  aspect-ratio: 5 / 4;
}

.float-card {
  position: absolute;
  background: var(--white);
  border-radius: var(--radius-sm);
  box-shadow: 0 12px 40px rgba(0, 11, 51, 0.12);
  padding: 0.75rem 1rem;
  font-size: 0.8rem;
}

.float-card--chart {
  top: 12%;
  left: 8%;
}

.mini-bars {
  display: flex;
  align-items: flex-end;
  gap: 4px;
  height: 36px;
  margin-bottom: 0.35rem;
}

.mini-bars span {
  width: 8px;
  border-radius: 3px;
  background: linear-gradient(180deg, var(--mint), #6eb5ff);
}

.mini-bars span:nth-child(1) {
  height: 40%;
}
.mini-bars span:nth-child(2) {
  height: 65%;
}
.mini-bars span:nth-child(3) {
  height: 50%;
}
.mini-bars span:nth-child(4) {
  height: 85%;
}

.float-card__label {
  font-weight: 600;
  color: var(--navy);
  font-size: 0.75rem;
}

.float-card--stat {
  bottom: 18%;
  right: 6%;
  text-align: center;
}

.float-card--stat strong {
  display: block;
  font-size: 1.1rem;
  color: var(--navy);
}

.float-card--stat span {
  font-size: 0.72rem;
  color: var(--text-muted);
}

.float-card--badge {
  top: 22%;
  right: 10%;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 0.95rem;
  color: var(--navy);
  background: var(--yellow);
  padding: 0;
}

/* Features */
.features__head {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  margin-bottom: 2.5rem;
}

@media (min-width: 768px) {
  .features__head {
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
  }

  .features__head .section-title {
    max-width: 20ch;
  }
}

.features__grid {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
}

.feature-card {
  background: var(--white);
  border: 1px solid rgba(0, 11, 51, 0.06);
  border-radius: var(--radius-md);
  padding: 1.5rem 1.35rem;
  box-shadow: 0 4px 24px rgba(0, 11, 51, 0.04);
  transition:
    box-shadow 0.2s,
    transform 0.2s;
}

.feature-card:hover {
  box-shadow: var(--shadow-card);
  transform: translateY(-2px);
}

.feature-card__icon {
  width: 52px;
  height: 52px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
}

.feature-card__icon--1 {
  background: #e8f4ff;
  color: #2563eb;
}
.feature-card__icon--2 {
  background: #fff4e0;
  color: #d97706;
}
.feature-card__icon--3 {
  background: #fef3c7;
  color: #b45309;
}
.feature-card__icon--4 {
  background: #e0f7f0;
  color: #059669;
}
.feature-card__icon--5 {
  background: #ede9fe;
  color: #7c3aed;
}
.feature-card__icon--6 {
  background: #fce7f3;
  color: #db2777;
}

.feature-card h3 {
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: var(--navy);
}

.feature-card p {
  font-size: 0.92rem;
  color: var(--text-muted);
  line-height: 1.55;
}

/* Mesh / flexibility */
.mesh {
  background:
    radial-gradient(ellipse 90% 70% at 10% 30%, rgba(247, 209, 94, 0.95), transparent 55%),
    radial-gradient(ellipse 80% 60% at 90% 20%, rgba(168, 230, 207, 0.9), transparent 50%),
    radial-gradient(ellipse 70% 50% at 50% 100%, rgba(110, 181, 255, 0.35), transparent 45%),
    linear-gradient(125deg, #f7d15e 0%, #c8f0e0 42%, #8ec5ff 100%);
}

.mesh__grid {
  display: grid;
  gap: 2.5rem;
  align-items: center;
}

@media (min-width: 900px) {
  .mesh__grid {
    grid-template-columns: 1fr 1fr;
  }
}

.mesh__list {
  list-style: none;
  padding: 0;
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
}

.mesh__list li {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}

.mesh__num {
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--navy);
  color: var(--white);
  font-weight: 700;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.mesh__list h3 {
  font-size: 1.05rem;
  font-weight: 700;
  margin-bottom: 0.35rem;
  color: var(--navy);
}

.mesh__list p {
  font-size: 0.92rem;
  color: var(--navy-soft);
  opacity: 0.9;
}

.mesh__photo-wrap {
  position: relative;
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-card);
}

.mesh__photo-wrap img {
  width: 100%;
  object-fit: cover;
  aspect-ratio: 4 / 3;
}

.gauge-card {
  position: absolute;
  bottom: 10%;
  left: 8%;
  background: var(--white);
  border-radius: var(--radius-md);
  padding: 1rem 1.25rem;
  box-shadow: 0 12px 40px rgba(0, 11, 51, 0.15);
  text-align: center;
}

.gauge {
  position: relative;
  width: 88px;
  height: 88px;
  margin: 0 auto 0.35rem;
}

.gauge__arc {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 8px solid #e8ecf4;
  border-top-color: var(--mint);
  border-right-color: #6eb5ff;
  transform: rotate(-45deg);
}

.gauge__value {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 1.25rem;
  color: var(--navy);
}

.gauge-card__cap {
  font-size: 0.75rem;
  color: var(--text-muted);
  font-weight: 500;
}

.mesh__stats {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.5);
}

@media (min-width: 768px) {
  .mesh__stats {
    grid-template-columns: repeat(4, 1fr);
  }
}

.mesh__stats strong {
  display: block;
  font-size: 1.65rem;
  font-weight: 800;
  color: var(--white);
  text-shadow: 0 1px 2px rgba(0, 11, 51, 0.15);
}

.mesh__stats span {
  font-size: 0.82rem;
  color: rgba(255, 255, 255, 0.95);
  font-weight: 500;
}

/* Pricing */
.pricing__grid {
  display: grid;
  gap: 1.5rem;
  margin-top: 2.5rem;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
}

.price-card {
  background: var(--white);
  border-radius: var(--radius-md);
  padding: 2rem 1.5rem;
  text-align: center;
  border: 1px solid rgba(0, 11, 51, 0.06);
  box-shadow: 0 8px 32px rgba(0, 11, 51, 0.06);
}

.wire-icon {
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.25rem;
}

.wire-cube {
  width: 48px;
  height: 48px;
  border: 2px solid var(--mint);
  border-radius: 10px;
  transform: rotate(-12deg) skewX(-6deg);
  box-shadow: 4px 4px 0 rgba(168, 230, 207, 0.5);
}

.wire-cube--2 {
  transform: rotate(8deg) skewX(4deg);
}

.wire-cube--3 {
  width: 56px;
  height: 40px;
  transform: rotate(-6deg);
}

.price-card h3 {
  font-size: 1.2rem;
  font-weight: 800;
  color: var(--navy);
  margin-bottom: 0.65rem;
}

.price-card p {
  font-size: 0.92rem;
  color: var(--text-muted);
  line-height: 1.55;
}

/* Contact */
.contact__grid {
  display: grid;
  gap: 2.5rem;
  align-items: start;
}

@media (min-width: 900px) {
  .contact__grid {
    grid-template-columns: 1fr 1fr;
  }
}

.contact__sub {
  color: var(--text-muted);
  margin-top: 0.75rem;
  margin-bottom: 1.5rem;
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

.contact__card {
  background: var(--navy);
  color: var(--white);
  border-radius: var(--radius-lg);
  padding: 2rem 1.75rem;
  box-shadow: var(--shadow-card);
}

.contact__row + .contact__row {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.12);
}

.contact__label {
  display: block;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  opacity: 0.7;
  margin-bottom: 0.35rem;
}

.contact__card a {
  color: var(--mint);
  text-decoration: none;
}

.contact__card a:hover {
  text-decoration: underline;
}

/* FAQ */
.faq__sub {
  text-align: center;
  color: var(--text-muted);
  margin-top: 0.5rem;
  margin-bottom: 2rem;
}

.faq__list {
  list-style: none;
  padding: 0;
  max-width: 720px;
  margin-inline: auto;
}

.faq__item {
  border-bottom: 1px solid rgba(0, 11, 51, 0.1);
}

.faq__q {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.15rem 0;
  background: none;
  border: none;
  text-align: left;
  font-size: 1rem;
  font-weight: 600;
  color: var(--navy);
}

.faq__toggle {
  font-size: 1.25rem;
  font-weight: 400;
  color: var(--text-muted);
  flex-shrink: 0;
}

.faq__a {
  padding-bottom: 1.15rem;
  color: var(--text-muted);
  font-size: 0.95rem;
  line-height: 1.6;
}

/* CTA row */
.mesh--cta {
  padding-block: clamp(2.5rem, 6vw, 4rem);
}

.cta-row {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: flex-start;
}

@media (min-width: 768px) {
  .cta-row {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  .cta-row__title {
    max-width: 18ch;
    margin: 0;
  }
}
</style>
