<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import ApiHttpDocsSidebar from '@/components/ApiHttpDocsSidebar.vue'
import {
  API_BASE,
  OPENAPI_INFO,
  OPENAPI_SCHEMA_NAMES,
  PARTNER_OPENAPI_DOCS_URL,
  partnerApiEndpoints,
  SCHEMAS_OVERVIEW_JSON,
  type EndpointDoc,
  type HttpMethod,
} from '@/data/partnerApiHttpDocs'

const { t, locale } = useI18n()
const route = useRoute()
const router = useRouter()

const activeSectionId = ref('doc-intro')

const endpoints: EndpointDoc[] = partnerApiEndpoints

const endpointById = computed(() => {
  const m = new Map<string, EndpointDoc>()
  for (const e of endpoints) {
    m.set(e.id, e)
  }
  return m
})

const activeEndpoint = computed(() => {
  if (activeSectionId.value.startsWith('ep-')) {
    return endpointById.value.get(activeSectionId.value) ?? null
  }
  return null
})

const introPanelCurl = computed(
  () => `curl -G ${API_BASE}/payments \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \\
  --data-urlencode "page=1" \\
  --data-urlencode "limit=10"`,
)

const introResponseExample = `{
  "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "amount": 100.5,
  "currency": "USD",
  "status": "PENDING",
  "intention": "CASHIN",
  "payment_method": "CARD",
  "created_at": "2025-01-15T10:00:00.000Z"
}`

const schemasExample = SCHEMAS_OVERVIEW_JSON

const schemaSectionCurl = `# Extrait components.schemas (OpenAPI 3.0.3)
# Payment, PaymentCreateRequest, CashinCreateRequest, …`

const rightPanelRequest = computed(() => {
  if (activeSectionId.value === 'doc-schemas') {
    return schemaSectionCurl
  }
  if (activeEndpoint.value) {
    return activeEndpoint.value.samples.curl
  }
  return introPanelCurl.value
})

const rightPanelResponse = computed(() => {
  if (activeSectionId.value === 'doc-schemas') {
    return schemasExample
  }
  if (activeEndpoint.value) {
    return activeEndpoint.value.responseExample
  }
  return introResponseExample
})

function methodClass(m: HttpMethod) {
  if (m === 'GET') {
    return 'method--get'
  }
  if (m === 'POST') {
    return 'method--post'
  }
  if (m === 'PUT') {
    return 'method--put'
  }
  return 'method--delete'
}

function scrollToId(id: string) {
  activeSectionId.value = id
  void router.push({ hash: `#${id}` })
  requestAnimationFrame(() => {
    const el = document.getElementById(id)
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  })
}

function onHashChange() {
  const h = route.hash.replace(/^#/, '')
  if (h && document.getElementById(h)) {
    activeSectionId.value = h
  }
}

let observer: IntersectionObserver | null = null

onMounted(() => {
  onHashChange()
  void nextTick(() => {
    const main = document.querySelector('.api-docs__main')
    if (!main) {
      return
    }
    const ids = [
      'doc-intro',
      'doc-auth',
      'doc-errors',
      ...endpoints.map((e) => e.id),
      'doc-schemas',
    ]
    observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]?.target?.id) {
          activeSectionId.value = visible[0].target.id
        }
      },
      { root: main, rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5, 1] },
    )
    for (const id of ids) {
      const el = document.getElementById(id)
      if (el) {
        observer?.observe(el)
      }
    }
  })
})

onUnmounted(() => {
  observer?.disconnect()
})

watch(
  () => route.hash,
  () => onHashChange(),
)

watch(locale, () => {
  document.documentElement.lang = locale.value
})
</script>

<template>
  <main class="api-docs" :aria-label="t('httpApiDoc.pageTitle')">
    <div class="api-docs__layout">
      <ApiHttpDocsSidebar @navigate="scrollToId" />

      <div class="api-docs__main">
        <section id="doc-intro" class="api-docs__section api-docs__section--hero">
          <h1 class="api-docs__title">{{ OPENAPI_INFO.title }}</h1>
          <p class="api-docs__version">v{{ OPENAPI_INFO.version }}</p>
          <p class="api-docs__lead">{{ OPENAPI_INFO.description }}</p>
          <p class="api-docs__muted">{{ t('httpApiDoc.introLead') }}</p>
          <div class="api-docs__server">
            <span class="api-docs__server-label">{{ t('httpApiDoc.server') }}</span>
            <code class="api-docs__server-url">{{ API_BASE }}</code>
          </div>
          <a
            class="api-docs__authorize"
            :href="PARTNER_OPENAPI_DOCS_URL"
            target="_blank"
            rel="noopener noreferrer"
          >{{ t('httpApiDoc.authorize') }}</a>
        </section>

        <section id="doc-auth" class="api-docs__section">
          <h2>{{ t('httpApiDoc.authentication') }}</h2>
          <p>{{ t('httpApiDoc.authIntro') }}</p>
          <h3 class="api-docs__h3">{{ t('httpApiDoc.authJwt') }}</h3>
          <pre class="api-docs__inline-code">Authorization: Bearer &lt;JWT&gt;</pre>
          <p class="api-docs__muted">{{ t('httpApiDoc.authJwtNote') }}</p>
          <h3 class="api-docs__h3">{{ t('httpApiDoc.authApiHeaders') }}</h3>
          <pre class="api-docs__inline-code">X-API-KEY: &lt;your_api_key&gt;
X-API-SECRET: &lt;your_api_secret&gt;
X-Tenant-ID: &lt;tenant_uuid&gt;</pre>
          <p class="api-docs__muted">{{ t('httpApiDoc.authApiHeadersNote') }}</p>
          <h3 class="api-docs__h3">{{ t('httpApiDoc.authPasswordGrant') }}</h3>
          <pre class="api-docs__inline-code">POST /auth
Content-Type: application/json

{ "username": "partner_user", "password": "..." }</pre>
        </section>

        <section id="doc-errors" class="api-docs__section">
          <h2>{{ t('httpApiDoc.errors') }}</h2>
          <p>{{ t('httpApiDoc.errorsBody') }}</p>
        </section>

        <section
          v-for="e in endpoints"
          :id="e.id"
          :key="e.id"
          class="api-docs__section api-docs__section--endpoint"
        >
          <div class="api-docs__endpoint-head">
            <span class="api-docs__method" :class="methodClass(e.method)">{{ e.method }}</span>
            <code class="api-docs__path">{{ e.path }}</code>
            <span v-if="e.deprecated" class="api-docs__deprecated">{{ t('httpApiDoc.deprecated') }}</span>
          </div>
          <h2>{{ e.summary }}</h2>
          <p class="api-docs__role">
            <span class="api-docs__role-label">{{ t('httpApiDoc.endpointRole') }}</span>
            {{ t('httpApiDoc.endpointRoles.' + e.id) }}
          </p>
          <p v-if="e.description" class="api-docs__muted">{{ e.description }}</p>

          <div v-if="e.pathParams?.length" class="api-docs__table-wrap">
            <h3>{{ t('httpApiDoc.pathParams') }}</h3>
            <table class="api-docs__table">
              <thead>
                <tr>
                  <th>{{ t('httpApiDoc.colName') }}</th>
                  <th>{{ t('httpApiDoc.colType') }}</th>
                  <th>{{ t('httpApiDoc.colRequired') }}</th>
                  <th>{{ t('httpApiDoc.colDescription') }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="p in e.pathParams" :key="p.name">
                  <td><code>{{ p.name }}</code></td>
                  <td>{{ p.type }}</td>
                  <td>{{ p.required ? t('httpApiDoc.yes') : t('httpApiDoc.no') }}</td>
                  <td>{{ p.description }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div v-if="e.queryParams?.length" class="api-docs__table-wrap">
            <h3>{{ t('httpApiDoc.queryParams') }}</h3>
            <table class="api-docs__table">
              <thead>
                <tr>
                  <th>{{ t('httpApiDoc.colName') }}</th>
                  <th>{{ t('httpApiDoc.colType') }}</th>
                  <th>{{ t('httpApiDoc.colRequired') }}</th>
                  <th>{{ t('httpApiDoc.colDescription') }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="p in e.queryParams" :key="p.name">
                  <td><code>{{ p.name }}</code></td>
                  <td>{{ p.type }}</td>
                  <td>{{ p.required ? t('httpApiDoc.yes') : t('httpApiDoc.no') }}</td>
                  <td>{{ p.description }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div v-if="e.bodyParams?.length" class="api-docs__table-wrap">
            <h3>{{ t('httpApiDoc.bodyParams') }}</h3>
            <table class="api-docs__table">
              <thead>
                <tr>
                  <th>{{ t('httpApiDoc.colName') }}</th>
                  <th>{{ t('httpApiDoc.colType') }}</th>
                  <th>{{ t('httpApiDoc.colRequired') }}</th>
                  <th>{{ t('httpApiDoc.colDescription') }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="p in e.bodyParams" :key="p.name">
                  <td><code>{{ p.name }}</code></td>
                  <td>{{ p.type }}</td>
                  <td>{{ p.required ? t('httpApiDoc.yes') : t('httpApiDoc.no') }}</td>
                  <td>{{ p.description }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="api-docs__table-wrap">
            <h3>{{ t('httpApiDoc.response200') }}</h3>
            <p class="api-docs__muted">{{ t('httpApiDoc.responseExample') }}</p>
          </div>
        </section>

        <section id="doc-schemas" class="api-docs__section">
          <h2>{{ t('httpApiDoc.schemas') }}</h2>
          <p class="api-docs__muted">
            {{ t('httpApiDoc.schemasIntroBefore') }}
            <a
              class="api-docs__inline-link"
              :href="PARTNER_OPENAPI_DOCS_URL"
              target="_blank"
              rel="noopener noreferrer"
            >OpenAPI</a>
            {{ t('httpApiDoc.schemasIntroAfter') }}
          </p>
          <ul class="api-docs__schema-list">
            <li v-for="name in OPENAPI_SCHEMA_NAMES" :key="name">{{ name }}</li>
          </ul>
        </section>
      </div>

      <aside class="api-docs__code-panel" :aria-label="t('httpApiDoc.curlPanel')">
        <div class="api-docs__code-lang-bar">
          <span class="api-docs__code-lang api-docs__code-lang--active">cURL</span>
        </div>
        <div class="api-docs__code-block">
          <p class="api-docs__code-label">{{ t('httpApiDoc.requestSample') }}</p>
          <pre><code>{{ rightPanelRequest }}</code></pre>
        </div>
        <div class="api-docs__code-block api-docs__code-block--response">
          <p class="api-docs__code-label">{{ t('httpApiDoc.responseSample') }}</p>
          <pre><code>{{ rightPanelResponse }}</code></pre>
        </div>
      </aside>
    </div>
  </main>
</template>

<style scoped>
.api-docs {
  flex: 1;
  --docs-accent: #ff4500;
  --docs-bg: #f6f7fb;
  --docs-sidebar: #ffffff;
  --docs-code-bg: #0d1117;
  --docs-code-border: #1f2937;
  --method-get: #61affe;
  --method-get-bg: rgba(97, 175, 254, 0.12);
  --method-post: #49cc90;
  --method-post-bg: rgba(73, 204, 144, 0.12);
  --method-delete: #f93e3e;
  --method-delete-bg: rgba(249, 62, 62, 0.12);
  --method-put: #fca130;
  --method-put-bg: rgba(252, 163, 48, 0.15);
  background: var(--docs-bg);
  color: var(--navy);
}

.api-docs__layout {
  display: grid;
  grid-template-columns: 260px minmax(0, 1fr) minmax(280px, 380px);
  min-height: calc(100vh - 72px);
  max-width: 1600px;
  margin-inline: auto;
}

.method--get {
  color: #1e5a8a;
  background: var(--method-get-bg);
}

.method--post {
  color: #1b6b4d;
  background: var(--method-post-bg);
}

.method--put {
  color: #8a5a16;
  background: var(--method-put-bg);
}

.method--delete {
  color: #9b1c1c;
  background: var(--method-delete-bg);
}

.api-docs__main {
  padding: 2rem 2.25rem 4rem;
  overflow-y: auto;
  max-height: calc(100vh - 72px);
  scroll-behavior: smooth;
}

.api-docs__section {
  scroll-margin-top: 96px;
  margin-bottom: 2.5rem;
}

.api-docs__section--hero {
  padding-bottom: 1.5rem;
  border-bottom: 1px solid rgba(0, 11, 51, 0.08);
}

.api-docs__title {
  margin: 0;
  font-size: clamp(1.65rem, 3vw, 2.1rem);
  font-weight: 800;
  letter-spacing: -0.03em;
}

.api-docs__version {
  margin: 0.35rem 0 1rem;
  font-size: 0.9rem;
  color: rgba(0, 11, 51, 0.5);
}

.api-docs__lead {
  margin: 0 0 1.25rem;
  max-width: 62ch;
  line-height: 1.65;
  color: rgba(0, 11, 51, 0.75);
}

.api-docs__server {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem 0.75rem;
  margin-bottom: 1rem;
}

.api-docs__server-label {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: rgba(0, 11, 51, 0.45);
}

.api-docs__server-url {
  font-size: 0.85rem;
  padding: 0.35rem 0.6rem;
  background: #fff;
  border: 1px solid rgba(0, 11, 51, 0.1);
  border-radius: 6px;
}

.api-docs__authorize {
  display: inline-flex;
  align-items: center;
  padding: 0.55rem 1.2rem;
  border-radius: 8px;
  border: none;
  background: var(--method-post);
  color: #fff;
  font-weight: 700;
  font-size: 0.9rem;
  cursor: pointer;
  box-shadow: 0 6px 20px rgba(73, 204, 144, 0.35);
  text-decoration: none;
}

.api-docs__authorize:hover {
  filter: brightness(1.05);
}

.api-docs__section h2 {
  margin: 0 0 0.65rem;
  font-size: 1.35rem;
  font-weight: 800;
}

.api-docs__role {
  margin: 0 0 0.75rem;
  padding: 0.65rem 0.85rem;
  background: rgba(0, 11, 51, 0.04);
  border-left: 3px solid var(--docs-accent);
  border-radius: 0 6px 6px 0;
  font-size: 0.9rem;
  line-height: 1.55;
  color: rgba(0, 11, 51, 0.82);
}

.api-docs__role-label {
  display: block;
  font-size: 0.68rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--docs-accent);
  margin-bottom: 0.35rem;
}

.api-docs__section h3 {
  margin: 1.25rem 0 0.5rem;
  font-size: 0.95rem;
  font-weight: 700;
}

.api-docs__muted {
  margin: 0 0 0.75rem;
  color: rgba(0, 11, 51, 0.65);
  line-height: 1.6;
}

.api-docs__inline-link {
  color: var(--docs-accent);
  font-weight: 600;
  text-decoration: underline;
  text-underline-offset: 2px;
}

.api-docs__inline-link:hover {
  text-decoration-thickness: 2px;
}

.api-docs__inline-code {
  margin: 0.5rem 0 0;
  padding: 0.85rem 1rem;
  background: #fff;
  border: 1px solid rgba(0, 11, 51, 0.1);
  border-radius: 8px;
  font-size: 0.85rem;
  overflow-x: auto;
}

.api-docs__endpoint-head {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.65rem;
}

.api-docs__deprecated {
  font-size: 0.7rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  padding: 0.15rem 0.45rem;
  border-radius: 4px;
  background: rgba(252, 163, 48, 0.2);
  color: #8a5a16;
}

.api-docs__h3 {
  margin: 1.25rem 0 0.5rem;
  font-size: 0.95rem;
  font-weight: 700;
}

.api-docs__method {
  font-size: 0.72rem;
  font-weight: 800;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  letter-spacing: 0.04em;
}

.api-docs__path {
  font-size: 0.95rem;
  font-weight: 600;
}

.api-docs__table-wrap {
  margin-top: 1rem;
}

.api-docs__table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.88rem;
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid rgba(0, 11, 51, 0.08);
}

.api-docs__table th,
.api-docs__table td {
  padding: 0.65rem 0.85rem;
  text-align: left;
  border-bottom: 1px solid rgba(0, 11, 51, 0.06);
}

.api-docs__table th {
  background: rgba(0, 11, 51, 0.03);
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: rgba(0, 11, 51, 0.5);
}

.api-docs__table tr:last-child td {
  border-bottom: none;
}

.api-docs__schema-list {
  margin: 0.5rem 0 0;
  padding-left: 1.25rem;
  line-height: 1.8;
  color: rgba(0, 11, 51, 0.8);
}

.api-docs__code-panel {
  position: sticky;
  top: 72px;
  align-self: start;
  max-height: calc(100vh - 72px);
  overflow-y: auto;
  background: var(--docs-code-bg);
  color: #e6edf3;
  border-left: 1px solid var(--docs-code-border);
  display: flex;
  flex-direction: column;
}

.api-docs__code-lang-bar {
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--docs-code-border);
  background: #0a0e14;
  position: sticky;
  top: 0;
  z-index: 1;
  padding: 0.5rem 0.85rem;
}

.api-docs__code-lang {
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  color: rgba(230, 237, 243, 0.45);
}

.api-docs__code-lang--active {
  color: #7ee787;
  padding-bottom: 0.35rem;
  border-bottom: 2px solid var(--docs-accent);
}

.api-docs__code-block {
  padding: 1rem 1rem 1.25rem;
  border-bottom: 1px solid var(--docs-code-border);
}

.api-docs__code-block--response pre code {
  color: #a5d6ff;
}

.api-docs__code-label {
  margin: 0 0 0.5rem;
  font-size: 0.65rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: rgba(230, 237, 243, 0.45);
}

.api-docs__code-block pre {
  margin: 0;
  overflow-x: auto;
  font-family: ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, monospace;
  font-size: 0.72rem;
  line-height: 1.55;
}

.api-docs__code-block code {
  white-space: pre;
  color: #d2a8ff;
}

@media (max-width: 1100px) {
  .api-docs__layout {
    grid-template-columns: 220px minmax(0, 1fr);
  }

  .api-docs__code-panel {
    display: none;
  }
}

@media (max-width: 860px) {
  .api-docs__layout {
    grid-template-columns: 1fr;
  }

  .api-docs__main {
    max-height: none;
  }
}
</style>
