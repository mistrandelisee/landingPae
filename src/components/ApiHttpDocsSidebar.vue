<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import {
  partnerApiEndpoints,
  type EndpointDoc,
  type EndpointGroup,
  type HttpMethod,
} from '@/data/partnerApiHttpDocs'

const { t } = useI18n()

const emit = defineEmits<{
  navigate: [id: string]
}>()

const searchQuery = ref('')

const endpoints: EndpointDoc[] = partnerApiEndpoints

const filteredEndpoints = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  if (!q) {
    return endpoints
  }
  return endpoints.filter(
    (e) =>
      e.path.toLowerCase().includes(q) ||
      e.summary.toLowerCase().includes(q) ||
      e.method.toLowerCase().includes(q),
  )
})

function endpointsForGroup(group: EndpointGroup) {
  return filteredEndpoints.value.filter((e) => e.group === group)
}

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

function onNavigate(id: string) {
  emit('navigate', id)
}
</script>

<template>
  <aside class="api-docs__sidebar">
    <div class="api-docs__brand">
      <span class="api-docs__brand-mark">{{ t('brand.name') }}</span>
      <span class="api-docs__brand-api">{{ t('httpApiDoc.apiReference') }}</span>
    </div>
    <div class="api-docs__search-wrap">
      <input
        v-model="searchQuery"
        type="search"
        class="api-docs__search"
        :placeholder="t('httpApiDoc.searchPlaceholder')"
        autocomplete="off"
      />
    </div>
    <nav class="api-docs__nav" :aria-label="t('httpApiDoc.sidebarNav')">
      <p class="api-docs__nav-heading">{{ t('httpApiDoc.general') }}</p>
      <button type="button" class="api-docs__nav-link" @click="onNavigate('doc-intro')">
        {{ t('httpApiDoc.intro') }}
      </button>
      <button type="button" class="api-docs__nav-link" @click="onNavigate('doc-auth')">
        {{ t('httpApiDoc.authentication') }}
      </button>
      <button type="button" class="api-docs__nav-link" @click="onNavigate('doc-errors')">
        {{ t('httpApiDoc.errors') }}
      </button>

      <p class="api-docs__nav-heading">{{ t('httpApiDoc.navHealth') }}</p>
      <button
        v-for="e in endpointsForGroup('health')"
        :key="e.id"
        type="button"
        class="api-docs__nav-link api-docs__nav-link--mono"
        @click="onNavigate(e.id)"
      >
        <span class="api-docs__nav-method" :class="methodClass(e.method)">{{ e.method }}</span>
        {{ e.path }}
      </button>

      <p class="api-docs__nav-heading">{{ t('httpApiDoc.navSystem') }}</p>
      <button
        v-for="e in endpointsForGroup('system')"
        :key="e.id"
        type="button"
        class="api-docs__nav-link api-docs__nav-link--mono"
        @click="onNavigate(e.id)"
      >
        <span class="api-docs__nav-method" :class="methodClass(e.method)">{{ e.method }}</span>
        {{ e.path }}
      </button>

      <p class="api-docs__nav-heading">{{ t('httpApiDoc.navAuth') }}</p>
      <button
        v-for="e in endpointsForGroup('auth')"
        :key="e.id"
        type="button"
        class="api-docs__nav-link api-docs__nav-link--mono"
        @click="onNavigate(e.id)"
      >
        <span class="api-docs__nav-method" :class="methodClass(e.method)">{{ e.method }}</span>
        {{ e.path }}
      </button>

      <p class="api-docs__nav-heading">{{ t('httpApiDoc.navPayments') }}</p>
      <button
        v-for="e in endpointsForGroup('payments')"
        :key="e.id"
        type="button"
        class="api-docs__nav-link api-docs__nav-link--mono"
        @click="onNavigate(e.id)"
      >
        <span class="api-docs__nav-method" :class="methodClass(e.method)">{{ e.method }}</span>
        {{ e.path }}
      </button>

      <p class="api-docs__nav-heading">{{ t('httpApiDoc.navPaymentFlows') }}</p>
      <button
        v-for="e in endpointsForGroup('payment_flows')"
        :key="e.id"
        type="button"
        class="api-docs__nav-link api-docs__nav-link--mono"
        @click="onNavigate(e.id)"
      >
        <span class="api-docs__nav-method" :class="methodClass(e.method)">{{ e.method }}</span>
        {{ e.path }}
      </button>

      <p class="api-docs__nav-heading">{{ t('httpApiDoc.navTenants') }}</p>
      <button
        v-for="e in endpointsForGroup('tenants')"
        :key="e.id"
        type="button"
        class="api-docs__nav-link api-docs__nav-link--mono"
        @click="onNavigate(e.id)"
      >
        <span class="api-docs__nav-method" :class="methodClass(e.method)">{{ e.method }}</span>
        {{ e.path }}
      </button>

      <p class="api-docs__nav-heading">{{ t('httpApiDoc.navApiKeys') }}</p>
      <button
        v-for="e in endpointsForGroup('api_keys')"
        :key="e.id"
        type="button"
        class="api-docs__nav-link api-docs__nav-link--mono"
        @click="onNavigate(e.id)"
      >
        <span class="api-docs__nav-method" :class="methodClass(e.method)">{{ e.method }}</span>
        {{ e.path }}
      </button>

      <p class="api-docs__nav-heading">{{ t('httpApiDoc.navUsers') }}</p>
      <button
        v-for="e in endpointsForGroup('users')"
        :key="e.id"
        type="button"
        class="api-docs__nav-link api-docs__nav-link--mono"
        @click="onNavigate(e.id)"
      >
        <span class="api-docs__nav-method" :class="methodClass(e.method)">{{ e.method }}</span>
        {{ e.path }}
      </button>

      <p class="api-docs__nav-heading">{{ t('httpApiDoc.navWebhooks') }}</p>
      <button
        v-for="e in endpointsForGroup('webhooks')"
        :key="e.id"
        type="button"
        class="api-docs__nav-link api-docs__nav-link--mono"
        @click="onNavigate(e.id)"
      >
        <span class="api-docs__nav-method" :class="methodClass(e.method)">{{ e.method }}</span>
        {{ e.path }}
      </button>

      <p class="api-docs__nav-heading">{{ t('httpApiDoc.navReports') }}</p>
      <button
        v-for="e in endpointsForGroup('reports')"
        :key="e.id"
        type="button"
        class="api-docs__nav-link api-docs__nav-link--mono"
        @click="onNavigate(e.id)"
      >
        <span class="api-docs__nav-method" :class="methodClass(e.method)">{{ e.method }}</span>
        {{ e.path }}
      </button>

      <p class="api-docs__nav-heading">{{ t('httpApiDoc.navLedger') }}</p>
      <button
        v-for="e in endpointsForGroup('ledger')"
        :key="e.id"
        type="button"
        class="api-docs__nav-link api-docs__nav-link--mono"
        @click="onNavigate(e.id)"
      >
        <span class="api-docs__nav-method" :class="methodClass(e.method)">{{ e.method }}</span>
        {{ e.path }}
      </button>

      <p class="api-docs__nav-heading">{{ t('httpApiDoc.schemas') }}</p>
      <button type="button" class="api-docs__nav-link" @click="onNavigate('doc-schemas')">
        {{ t('httpApiDoc.schemasModels') }}
      </button>
    </nav>
  </aside>
</template>

<style scoped>
.api-docs__sidebar {
  position: sticky;
  top: 72px;
  align-self: start;
  max-height: calc(100vh - 72px);
  overflow-y: auto;
  padding: 1.25rem 1rem 2rem;
  background: var(--docs-sidebar);
  border-right: 1px solid rgba(0, 11, 51, 0.08);
}

.api-docs__brand {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(0, 11, 51, 0.08);
}

.api-docs__brand-mark {
  font-weight: 800;
  font-size: 1.1rem;
  color: var(--docs-accent);
  letter-spacing: -0.02em;
}

.api-docs__brand-api {
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: rgba(0, 11, 51, 0.45);
}

.api-docs__search-wrap {
  margin-bottom: 1rem;
}

.api-docs__search {
  width: 100%;
  padding: 0.5rem 0.65rem;
  border-radius: 8px;
  border: 1px solid rgba(0, 11, 51, 0.12);
  font-size: 0.85rem;
  background: #fafbfe;
}

.api-docs__search:focus {
  outline: 2px solid rgba(255, 69, 0, 0.35);
  border-color: var(--docs-accent);
}

.api-docs__nav-heading {
  margin: 1rem 0 0.35rem;
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(0, 11, 51, 0.45);
}

.api-docs__nav-heading:first-of-type {
  margin-top: 0;
}

.api-docs__nav-link {
  display: flex;
  align-items: baseline;
  gap: 0.35rem;
  width: 100%;
  text-align: left;
  border: none;
  background: none;
  padding: 0.35rem 0.25rem;
  font-size: 0.88rem;
  color: var(--navy);
  cursor: pointer;
  border-radius: 6px;
  line-height: 1.3;
}

.api-docs__nav-link:hover {
  background: rgba(255, 69, 0, 0.08);
  color: var(--docs-accent);
}

.api-docs__nav-link--mono {
  font-family: ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, monospace;
  font-size: 0.78rem;
}

.api-docs__nav-method {
  font-size: 0.65rem;
  font-weight: 800;
  padding: 0.1rem 0.3rem;
  border-radius: 4px;
  flex-shrink: 0;
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

@media (max-width: 860px) {
  .api-docs__sidebar {
    position: relative;
    top: 0;
    max-height: none;
    border-right: none;
    border-bottom: 1px solid rgba(0, 11, 51, 0.08);
  }
}
</style>
