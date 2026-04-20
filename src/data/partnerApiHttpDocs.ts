/**
 * Documentation alignée sur OpenAPI 3.0.3 — Payment Switch Partner API
 * (contrat fourni par l’équipe ; URL serveur = servers[0] du spec).
 */
export const API_BASE = 'http://localhost:3000/v1/partner'

/** Documentation interactive (Swagger) hébergée — export / schémas complets */
export const PARTNER_OPENAPI_DOCS_URL = 'https://phoenix.small-pay.com/v1/partner/docs/'

export const OPENAPI_INFO = {
  title: 'Payment Switch Partner API',
  version: '1.0.0',
  description: 'API for partners to integrate with the Payment Switch',
} as const

export type CodeTab = 'curl' | 'node' | 'python' | 'php'

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

export type EndpointGroup =
  | 'health'
  | 'system'
  | 'auth'
  | 'payments'
  | 'payment_flows'
  | 'tenants'
  | 'api_keys'
  | 'users'
  | 'webhooks'
  | 'reports'
  | 'ledger'

export interface EndpointDoc {
  id: string
  group: EndpointGroup
  method: HttpMethod
  path: string
  summary: string
  description?: string
  deprecated?: boolean
  pathParams?: { name: string; type: string; required: boolean; description: string }[]
  queryParams?: { name: string; type: string; required: boolean; description: string }[]
  bodyParams?: { name: string; type: string; required: boolean; description: string }[]
  responseExample: string
  samples: Record<CodeTab, string>
}

const JWT = 'YOUR_JWT_TOKEN'
const X_API_KEY = 'YOUR_X_API_KEY'
const X_API_SECRET = 'YOUR_X_API_SECRET'
const X_TENANT_ID = '550e8400-e29b-41d4-a716-446655440000'
const PAY_ID = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890'
const KEY_ID = 'key_01HFXYZ'
const USER_ID = 'usr_01HFXYZ'
const WH_ID = 'wh_01HFXYZ'

function bearerHeadersCurl(): string {
  return `-H "Authorization: Bearer ${JWT}"`
}

function getBearer(pathResolved: string): Record<CodeTab, string> {
  const u = `${API_BASE}${pathResolved}`
  return {
    curl: `curl ${u} \\
  ${bearerHeadersCurl()}`,
    node: `const res = await fetch('${u}', {
  headers: { Authorization: 'Bearer ${JWT}' },
});
console.log(await res.json());`,
    python: `import requests

r = requests.get('${u}', headers={'Authorization': 'Bearer ${JWT}'})
print(r.json())`,
    php: `<?php
$ch = curl_init('${u}');
curl_setopt_array($ch, [
  CURLOPT_HTTPHEADER => ['Authorization: Bearer ${JWT}'],
  CURLOPT_RETURNTRANSFER => true,
]);
echo curl_exec($ch);`,
  }
}

function postBearerJson(
  pathResolved: string,
  curlBody: string,
  nodeBody: string,
  pyBody: string,
  phpBody: string,
): Record<CodeTab, string> {
  const u = `${API_BASE}${pathResolved}`
  return {
    curl: `curl -X POST ${u} \\
  ${bearerHeadersCurl()} \\
  -H "Content-Type: application/json" \\
  -d '${curlBody}'`,
    node: `const res = await fetch('${u}', {
  method: 'POST',
  headers: {
    Authorization: 'Bearer ${JWT}',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(${nodeBody}),
});
console.log(await res.json());`,
    python: `import requests

r = requests.post(
    '${u}',
    headers={'Authorization': 'Bearer ${JWT}', 'Content-Type': 'application/json'},
    json=${pyBody},
)
print(r.json())`,
    php: `<?php
$ch = curl_init('${u}');
curl_setopt_array($ch, [
  CURLOPT_POST => true,
  CURLOPT_HTTPHEADER => [
    'Authorization: Bearer ${JWT}',
    'Content-Type: application/json',
  ],
  CURLOPT_POSTFIELDS => json_encode(${phpBody}),
  CURLOPT_RETURNTRANSFER => true,
]);
echo curl_exec($ch);`,
  }
}

function putBearerJson(
  pathResolved: string,
  curlBody: string,
  nodeBody: string,
  pyBody: string,
  phpBody: string,
): Record<CodeTab, string> {
  const u = `${API_BASE}${pathResolved}`
  return {
    curl: `curl -X PUT ${u} \\
  ${bearerHeadersCurl()} \\
  -H "Content-Type: application/json" \\
  -d '${curlBody}'`,
    node: `const res = await fetch('${u}', {
  method: 'PUT',
  headers: {
    Authorization: 'Bearer ${JWT}',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(${nodeBody}),
});
console.log(await res.json());`,
    python: `import requests

r = requests.put(
    '${u}',
    headers={'Authorization': 'Bearer ${JWT}', 'Content-Type': 'application/json'},
    json=${pyBody},
)
print(r.json())`,
    php: `<?php
$ch = curl_init('${u}');
curl_setopt_array($ch, [
  CURLOPT_CUSTOMREQUEST => 'PUT',
  CURLOPT_HTTPHEADER => [
    'Authorization: Bearer ${JWT}',
    'Content-Type: application/json',
  ],
  CURLOPT_POSTFIELDS => json_encode(${phpBody}),
  CURLOPT_RETURNTRANSFER => true,
]);
echo curl_exec($ch);`,
  }
}

function deleteBearer(pathResolved: string): Record<CodeTab, string> {
  const u = `${API_BASE}${pathResolved}`
  return {
    curl: `curl -X DELETE ${u} \\
  ${bearerHeadersCurl()}`,
    node: `const res = await fetch('${u}', {
  method: 'DELETE',
  headers: { Authorization: 'Bearer ${JWT}' },
});
console.log(await res.json());`,
    python: `import requests

r = requests.delete('${u}', headers={'Authorization': 'Bearer ${JWT}'})
print(r.json())`,
    php: `<?php
$ch = curl_init('${u}');
curl_setopt_array($ch, [
  CURLOPT_CUSTOMREQUEST => 'DELETE',
  CURLOPT_HTTPHEADER => ['Authorization: Bearer ${JWT}'],
  CURLOPT_RETURNTRANSFER => true,
]);
echo curl_exec($ch);`,
  }
}

function postAuthLogin(): Record<CodeTab, string> {
  const u = `${API_BASE}/auth`
  return {
    curl: `curl -X POST ${u} \\
  -H "Content-Type: application/json" \\
  -d '{"username":"partner_user","password":"your_password"}'`,
    node: `const res = await fetch('${u}', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ username: 'partner_user', password: 'your_password' }),
});
console.log(await res.json());`,
    python: `import requests

r = requests.post(
    '${u}',
    headers={'Content-Type': 'application/json'},
    json={'username': 'partner_user', 'password': 'your_password'},
)
print(r.json())`,
    php: `<?php
$ch = curl_init('${u}');
curl_setopt_array($ch, [
  CURLOPT_POST => true,
  CURLOPT_HTTPHEADER => ['Content-Type: application/json'],
  CURLOPT_POSTFIELDS => json_encode([
    'username' => 'partner_user',
    'password' => 'your_password',
  ]),
  CURLOPT_RETURNTRANSFER => true,
]);
echo curl_exec($ch);`,
  }
}

function postAuthToken(): Record<CodeTab, string> {
  const u = `${API_BASE}/auth/token`
  return {
    curl: `curl -X POST ${u} \\
  -H "X-API-KEY: ${X_API_KEY}" \\
  -H "X-API-SECRET: ${X_API_SECRET}" \\
  -H "X-Tenant-ID: ${X_TENANT_ID}"`,
    node: `const res = await fetch('${u}', {
  method: 'POST',
  headers: {
    'X-API-KEY': '${X_API_KEY}',
    'X-API-SECRET': '${X_API_SECRET}',
    'X-Tenant-ID': '${X_TENANT_ID}',
  },
});
console.log(await res.json());`,
    python: `import requests

r = requests.post(
    '${u}',
    headers={
        'X-API-KEY': '${X_API_KEY}',
        'X-API-SECRET': '${X_API_SECRET}',
        'X-Tenant-ID': '${X_TENANT_ID}',
    },
)
print(r.json())`,
    php: `<?php
$ch = curl_init('${u}');
curl_setopt_array($ch, [
  CURLOPT_POST => true,
  CURLOPT_HTTPHEADER => [
    'X-API-KEY: ${X_API_KEY}',
    'X-API-SECRET: ${X_API_SECRET}',
    'X-Tenant-ID: ${X_TENANT_ID}',
  ],
  CURLOPT_RETURNTRANSFER => true,
]);
echo curl_exec($ch);`,
  }
}

function getNoAuth(pathResolved: string): Record<CodeTab, string> {
  const u = `${API_BASE}${pathResolved}`
  return {
    curl: `curl ${u}`,
    node: `const res = await fetch('${u}');
console.log(await res.json());`,
    python: `import requests

r = requests.get('${u}')
print(r.json())`,
    php: `<?php
$ch = curl_init('${u}');
curl_setopt_array($ch, [CURLOPT_RETURNTRANSFER => true]);
echo curl_exec($ch);`,
  }
}

const paymentJson = `{
  "id": "${PAY_ID}",
  "amount": 100.5,
  "currency": "USD",
  "status": "PENDING",
  "intention": "CASHIN",
  "payment_method": "CARD"
}`

export const OPENAPI_SCHEMA_NAMES: string[] = [
  'Payment',
  'PaymentCreateRequest',
  'PaymentCreateResponse',
  'CashinCreateRequest',
  'CashoutCreateRequest',
  'TransferCreateRequest',
  'ServicePaymentCreateRequest',
  'PaymentListResponse',
  'CaptureRequest',
  'RefundRequest',
  'CardDetails',
  'BankTransferDetails',
  'WalletDetails',
  'CryptoDetails',
  'OtherDetails',
  'Auth',
  'ApiKey',
  'ApiKeyCreateRequest',
  'ApiKeyUpdateRequest',
  'PartnerUserCreateRequest',
  'WebhookSubscriptionRequest',
  'WebhookSubscription',
  'WebhookUpdateRequest',
  'TransactionsReportResponse',
  'HealthResponse',
  'Tenant',
  'TenantWhitelistUpdateRequest',
  'TenantWhitelistUpdateResponse',
  'ApiKeyListResponse',
  'DeleteResponse',
  'PartnerUser',
  'PartnerUserListResponse',
  'WebhookListResponse',
]

export const SCHEMAS_OVERVIEW_JSON = `{
  "Payment": { "id": "uuid", "amount": "number", "currency": "string", "status": "enum", "intention": "CASHIN|CASHOUT|TRANSFER|SERVICE_PAYMENT", "payment_method": "CARD|BANK_TRANSFER|…" },
  "PaymentCreateRequest": { "required": ["amount","currency","payment_method"], "optional": ["intention","reference","customer_id","metadata",…] },
  "CashinCreateRequest": { "required": ["amount","currency","source_method"], "source_details": "CardDetails | BankTransferDetails | …" },
  "RefundRequest": { "amount": "number?", "reason": "string?" },
  "Auth": { "username": "string", "password": "string" },
  "ApiKeyCreateRequest": { "required": ["name"], "environment": "SANDBOX|LIVE", "scopes": "string[]" },
  "WebhookSubscriptionRequest": { "required": ["url","event_types"] }
  /* … voir OpenAPI components.schemas complet */
}`

export const partnerApiEndpoints: EndpointDoc[] = [
  {
    id: 'ep-get-health',
    group: 'health',
    method: 'GET',
    path: '/health',
    summary: 'Health check',
    responseExample: `{"status":"ok"}`,
    samples: getNoAuth('/health'),
  },
  {
    id: 'ep-get-metrics',
    group: 'system',
    method: 'GET',
    path: '/metrics',
    summary: 'Prometheus metrics',
    description: 'Réponse text/plain (format Prometheus).',
    responseExample: '# HELP http_requests_total …',
    samples: {
      curl: `curl ${API_BASE}/metrics \\
  ${bearerHeadersCurl()}`,
      node: `const res = await fetch('${API_BASE}/metrics', {
  headers: { Authorization: 'Bearer ${JWT}' },
});
console.log(await res.text());`,
      python: `import requests

r = requests.get('${API_BASE}/metrics', headers={'Authorization': 'Bearer ${JWT}'})
print(r.text)`,
      php: `<?php
$ch = curl_init('${API_BASE}/metrics');
curl_setopt_array($ch, [
  CURLOPT_HTTPHEADER => ['Authorization: Bearer ${JWT}'],
  CURLOPT_RETURNTRANSFER => true,
]);
echo curl_exec($ch);`,
    },
  },
  {
    id: 'ep-post-auth',
    group: 'auth',
    method: 'POST',
    path: '/auth',
    summary: 'Exchange API key/secret for JWT',
    description: 'Corps JSON schema Auth (username, password). Sécurité désactivée sur cette route.',
    bodyParams: [
      { name: 'username', type: 'string', required: false, description: 'Identifiant partenaire.' },
      { name: 'password', type: 'string', required: false, description: 'Mot de passe.' },
    ],
    responseExample: `{"token":"eyJ…","expiresIn":"3600s"}`,
    samples: postAuthLogin(),
  },
  {
    id: 'ep-post-auth-token',
    group: 'auth',
    method: 'POST',
    path: '/auth/token',
    summary: 'Exchange API key/secret for JWT',
    description: 'En-têtes X-API-KEY, X-API-SECRET, X-Tenant-ID (sans corps JSON requis).',
    responseExample: `{"token":"eyJ…","expiresIn":"3600s"}`,
    samples: postAuthToken(),
  },
  {
    id: 'ep-post-payments-legacy',
    group: 'payments',
    method: 'POST',
    path: '/payments',
    summary: 'Initiate a payment (legacy, use intention-specific endpoints)',
    deprecated: true,
    bodyParams: [
      { name: 'amount', type: 'number', required: true, description: 'Montant.' },
      { name: 'currency', type: 'string', required: true, description: 'Code ISO 4217 (3 lettres).' },
      { name: 'payment_method', type: 'string', required: true, description: 'CARD, BANK_TRANSFER, WALLET, CRYPTO, OTHER.' },
      { name: 'intention', type: 'string', required: false, description: 'CASHIN, CASHOUT, TRANSFER, SERVICE_PAYMENT.' },
      { name: 'customer_id', type: 'string', required: false, description: 'Référence client.' },
      { name: 'customer_email', type: 'string', required: false, description: 'Email.' },
      { name: 'metadata', type: 'object', required: false, description: 'Métadonnées libres.' },
    ],
    responseExample: paymentJson,
    samples: postBearerJson(
      '/payments',
      '{"amount":100.5,"currency":"USD","payment_method":"CARD","intention":"CASHIN"}',
      `{ amount: 100.5, currency: 'USD', payment_method: 'CARD', intention: 'CASHIN' }`,
      `{'amount': 100.5, 'currency': 'USD', 'payment_method': 'CARD', 'intention': 'CASHIN'}`,
      `['amount' => 100.5, 'currency' => 'USD', 'payment_method' => 'CARD', 'intention' => 'CASHIN']`,
    ),
  },
  {
    id: 'ep-get-payments',
    group: 'payments',
    method: 'GET',
    path: '/payments',
    summary: 'List payments',
    queryParams: [
      { name: 'page', type: 'integer', required: false, description: 'Défaut 1.' },
      { name: 'limit', type: 'integer', required: false, description: 'Défaut 20.' },
      { name: 'status', type: 'string', required: false, description: 'Filtrer par statut.' },
      {
        name: 'intention',
        type: 'string',
        required: false,
        description: 'CASHIN, CASHOUT, TRANSFER, SERVICE_PAYMENT.',
      },
      { name: 'fromDate', type: 'string', required: false, description: 'Date (format date).' },
      { name: 'toDate', type: 'string', required: false, description: 'Date (format date).' },
    ],
    responseExample: `{"payments":[],"total":0,"page":1,"limit":20,"pages":0}`,
    samples: {
      curl: `curl -G ${API_BASE}/payments \\
  ${bearerHeadersCurl()} \\
  --data-urlencode "page=1" \\
  --data-urlencode "limit=20"`,
      node: `const url = new URL('${API_BASE}/payments');
url.searchParams.set('page', '1');
url.searchParams.set('limit', '20');
const res = await fetch(url, { headers: { Authorization: 'Bearer ${JWT}' } });
console.log(await res.json());`,
      python: `import requests

r = requests.get(
    '${API_BASE}/payments',
    headers={'Authorization': 'Bearer ${JWT}'},
    params={'page': 1, 'limit': 20},
)
print(r.json())`,
      php: `<?php
$ch = curl_init('${API_BASE}/payments?page=1&limit=20');
curl_setopt_array($ch, [
  CURLOPT_HTTPHEADER => ['Authorization: Bearer ${JWT}'],
  CURLOPT_RETURNTRANSFER => true,
]);
echo curl_exec($ch);`,
    },
  },
  {
    id: 'ep-get-payment-by-id',
    group: 'payments',
    method: 'GET',
    path: '/payments/{id}',
    summary: 'Get payment status',
    pathParams: [{ name: 'id', type: 'string', required: true, description: 'Identifiant paiement.' }],
    responseExample: paymentJson,
    samples: getBearer(`/payments/${PAY_ID}`),
  },
  {
    id: 'ep-post-payment-capture',
    group: 'payments',
    method: 'POST',
    path: '/payments/{id}/capture',
    summary: 'Capture an authorized payment',
    pathParams: [{ name: 'id', type: 'string', required: true, description: 'Identifiant paiement.' }],
    bodyParams: [{ name: 'amount', type: 'number', required: false, description: 'Montant à capturer (partiel).' }],
    responseExample: paymentJson,
    samples: postBearerJson(
      `/payments/${PAY_ID}/capture`,
      '{"amount":50}',
      `{ amount: 50 }`,
      `{'amount': 50}`,
      `['amount' => 50]`,
    ),
  },
  {
    id: 'ep-post-payment-refund',
    group: 'payments',
    method: 'POST',
    path: '/payments/{id}/refund',
    summary: 'Refund a captured payment',
    pathParams: [{ name: 'id', type: 'string', required: true, description: 'Identifiant paiement.' }],
    bodyParams: [
      { name: 'amount', type: 'number', required: false, description: 'Remboursement partiel.' },
      { name: 'reason', type: 'string', required: false, description: 'Motif.' },
    ],
    responseExample: paymentJson,
    samples: postBearerJson(
      `/payments/${PAY_ID}/refund`,
      '{"amount":25,"reason":"requested_by_customer"}',
      `{ amount: 25, reason: 'requested_by_customer' }`,
      `{'amount': 25, 'reason': 'requested_by_customer'}`,
      `['amount' => 25, 'reason' => 'requested_by_customer']`,
    ),
  },
  {
    id: 'ep-post-payment-cancel',
    group: 'payments',
    method: 'POST',
    path: '/payments/{id}/cancel',
    summary: 'Cancel a payment',
    pathParams: [{ name: 'id', type: 'string', required: true, description: 'Identifiant paiement.' }],
    responseExample: paymentJson,
    samples: postBearerJson(`/payments/${PAY_ID}/cancel`, '{}', `{}`, `{}`, `new stdClass()`),
  },
  {
    id: 'ep-post-payments-cashin',
    group: 'payment_flows',
    method: 'POST',
    path: '/payments/cashin',
    summary: 'Create a cash-in payment',
    description: 'Corps : CashinCreateRequest (amount, currency, source_method, source_details, …).',
    bodyParams: [
      { name: 'amount', type: 'number', required: true, description: 'Montant.' },
      { name: 'currency', type: 'string', required: true, description: 'ISO 4217.' },
      { name: 'source_method', type: 'string', required: true, description: 'CARD, BANK_TRANSFER, WALLET, …' },
      { name: 'source_details', type: 'object', required: false, description: 'CardDetails, WalletDetails, etc.' },
      { name: 'customer_email', type: 'string', required: false, description: 'Email payeur.' },
    ],
    responseExample: paymentJson,
    samples: postBearerJson(
      '/payments/cashin',
      '{"amount":100.5,"currency":"USD","intention":"CASHIN","source_method":"CARD","source_details":{"card_token":"tok_123","last4":"4242"}}',
      `{ amount: 100.5, currency: 'USD', intention: 'CASHIN', source_method: 'CARD', source_details: { card_token: 'tok_123', last4: '4242' } }`,
      `{'amount': 100.5, 'currency': 'USD', 'intention': 'CASHIN', 'source_method': 'CARD', 'source_details': {'card_token': 'tok_123', 'last4': '4242'}}`,
      `['amount' => 100.5, 'currency' => 'USD', 'intention' => 'CASHIN', 'source_method' => 'CARD', 'source_details' => ['card_token' => 'tok_123', 'last4' => '4242']]`,
    ),
  },
  {
    id: 'ep-post-payments-cashout',
    group: 'payment_flows',
    method: 'POST',
    path: '/payments/cashout',
    summary: 'Create a cash-out payment',
    description: 'Corps : CashoutCreateRequest.',
    bodyParams: [
      { name: 'amount', type: 'number', required: true, description: 'Montant.' },
      { name: 'currency', type: 'string', required: true, description: 'ISO 4217.' },
      { name: 'destination_method', type: 'string', required: true, description: 'Méthode de destination.' },
      { name: 'destination_details', type: 'object', required: false, description: 'Détails selon la méthode.' },
    ],
    responseExample: paymentJson,
    samples: postBearerJson(
      '/payments/cashout',
      '{"amount":125,"currency":"USD","intention":"CASHOUT","destination_method":"BANK_TRANSFER","destination_details":{"iban":"GB29NWBK60161331926819"}}',
      `{ amount: 125, currency: 'USD', intention: 'CASHOUT', destination_method: 'BANK_TRANSFER', destination_details: { iban: 'GB29NWBK60161331926819' } }`,
      `{'amount': 125, 'currency': 'USD', 'intention': 'CASHOUT', 'destination_method': 'BANK_TRANSFER', 'destination_details': {'iban': 'GB29NWBK60161331926819'}}`,
      `['amount' => 125, 'currency' => 'USD', 'intention' => 'CASHOUT', 'destination_method' => 'BANK_TRANSFER', 'destination_details' => ['iban' => 'GB29NWBK60161331926819']]`,
    ),
  },
  {
    id: 'ep-post-payments-transfer',
    group: 'payment_flows',
    method: 'POST',
    path: '/payments/transfer',
    summary: 'Create a transfer payment',
    description: 'Corps : TransferCreateRequest.',
    bodyParams: [
      { name: 'amount', type: 'number', required: true, description: 'Montant.' },
      { name: 'currency', type: 'string', required: true, description: 'ISO 4217.' },
      { name: 'source_method', type: 'string', required: true, description: 'Méthode source.' },
      { name: 'destination_method', type: 'string', required: false, description: 'Méthode destination.' },
      { name: 'to_tenant_id', type: 'string (uuid)', required: false, description: 'Transfert interne vers un autre tenant.' },
    ],
    responseExample: paymentJson,
    samples: postBearerJson(
      '/payments/transfer',
      '{"amount":20,"currency":"USD","intention":"TRANSFER","source_method":"WALLET","source_details":{"wallet_id":"wal_src"}}',
      `{ amount: 20, currency: 'USD', intention: 'TRANSFER', source_method: 'WALLET', source_details: { wallet_id: 'wal_src' } }`,
      `{'amount': 20, 'currency': 'USD', 'intention': 'TRANSFER', 'source_method': 'WALLET', 'source_details': {'wallet_id': 'wal_src'}}`,
      `['amount' => 20, 'currency' => 'USD', 'intention' => 'TRANSFER', 'source_method' => 'WALLET', 'source_details' => ['wallet_id' => 'wal_src']]`,
    ),
  },
  {
    id: 'ep-post-payments-service-payment',
    group: 'payment_flows',
    method: 'POST',
    path: '/payments/service-payment',
    summary: 'Create a service payment',
    description: 'Corps : ServicePaymentCreateRequest.',
    bodyParams: [
      { name: 'amount', type: 'number', required: true, description: 'Montant.' },
      { name: 'currency', type: 'string', required: true, description: 'ISO 4217.' },
      { name: 'source_method', type: 'string', required: true, description: 'Méthode source.' },
    ],
    responseExample: paymentJson,
    samples: postBearerJson(
      '/payments/service-payment',
      '{"amount":10,"currency":"USD","intention":"SERVICE_PAYMENT","source_method":"WALLET","source_details":{"wallet_id":"wal_abc"},"destination_method":"OTHER","destination_details":{"type":"airtime"}}',
      `{ amount: 10, currency: 'USD', intention: 'SERVICE_PAYMENT', source_method: 'WALLET', source_details: { wallet_id: 'wal_abc' }, destination_method: 'OTHER', destination_details: { type: 'airtime' } }`,
      `{'amount': 10, 'currency': 'USD', 'intention': 'SERVICE_PAYMENT', 'source_method': 'WALLET', 'source_details': {'wallet_id': 'wal_abc'}, 'destination_method': 'OTHER', 'destination_details': {'type': 'airtime'}}`,
      `['amount' => 10, 'currency' => 'USD', 'intention' => 'SERVICE_PAYMENT', 'source_method' => 'WALLET', 'source_details' => ['wallet_id' => 'wal_abc'], 'destination_method' => 'OTHER', 'destination_details' => ['type' => 'airtime']]`,
    ),
  },
  {
    id: 'ep-get-tenant',
    group: 'tenants',
    method: 'GET',
    path: '/tenants/{id}',
    summary: 'Get tenant info',
    pathParams: [{ name: 'id', type: 'string', required: true, description: 'Identifiant tenant.' }],
    responseExample: `{"id":"${X_TENANT_ID}","name":"Acme","status":"ACTIVE"}`,
    samples: getBearer(`/tenants/${X_TENANT_ID}`),
  },
  {
    id: 'ep-put-tenant-whitelist',
    group: 'tenants',
    method: 'PUT',
    path: '/tenants/{id}/whitelist',
    summary: 'Update tenant IP whitelist',
    pathParams: [{ name: 'id', type: 'string', required: true, description: 'Identifiant tenant.' }],
    bodyParams: [
      { name: 'ip_whitelist', type: 'string[]', required: true, description: 'Liste d’adresses IP autorisées.' },
    ],
    responseExample: `{"ip_whitelist":["203.0.113.10"]}`,
    samples: putBearerJson(
      `/tenants/${X_TENANT_ID}/whitelist`,
      '{"ip_whitelist":["203.0.113.10","198.51.100.0/24"]}',
      `{ ip_whitelist: ['203.0.113.10', '198.51.100.0/24'] }`,
      `{'ip_whitelist': ['203.0.113.10', '198.51.100.0/24']}`,
      `['ip_whitelist' => ['203.0.113.10', '198.51.100.0/24']]`,
    ),
  },
  {
    id: 'ep-get-tenant-api-keys',
    group: 'api_keys',
    method: 'GET',
    path: '/tenants/{tenantId}/api-keys',
    summary: 'List API keys for a tenant',
    pathParams: [{ name: 'tenantId', type: 'string', required: true, description: 'Identifiant tenant.' }],
    responseExample: `{"keys":[{"id":"${KEY_ID}","name":"CI","environment":"SANDBOX"}]}`,
    samples: getBearer(`/tenants/${X_TENANT_ID}/api-keys`),
  },
  {
    id: 'ep-post-tenant-api-keys',
    group: 'api_keys',
    method: 'POST',
    path: '/tenants/{tenantId}/api-keys',
    summary: 'Create a new API key',
    pathParams: [{ name: 'tenantId', type: 'string', required: true, description: 'Identifiant tenant.' }],
    bodyParams: [
      { name: 'name', type: 'string', required: true, description: 'Nom de la clé.' },
      { name: 'environment', type: 'string', required: false, description: 'SANDBOX ou LIVE.' },
      { name: 'scopes', type: 'string[]', required: false, description: 'Scopes.' },
    ],
    responseExample: `{"id":"${KEY_ID}","name":"CI","environment":"SANDBOX","status":"ACTIVE"}`,
    samples: postBearerJson(
      `/tenants/${X_TENANT_ID}/api-keys`,
      '{"name":"CI integration","environment":"SANDBOX"}',
      `{ name: 'CI integration', environment: 'SANDBOX' }`,
      `{'name': 'CI integration', 'environment': 'SANDBOX'}`,
      `['name' => 'CI integration', 'environment' => 'SANDBOX']`,
    ),
  },
  {
    id: 'ep-get-tenant-api-key',
    group: 'api_keys',
    method: 'GET',
    path: '/tenants/{tenantId}/api-keys/{id}',
    summary: 'Get API key details',
    pathParams: [
      { name: 'tenantId', type: 'string', required: true, description: 'Tenant.' },
      { name: 'id', type: 'string', required: true, description: 'Clé API.' },
    ],
    responseExample: `{"id":"${KEY_ID}","name":"CI","status":"ACTIVE"}`,
    samples: getBearer(`/tenants/${X_TENANT_ID}/api-keys/${KEY_ID}`),
  },
  {
    id: 'ep-put-tenant-api-key',
    group: 'api_keys',
    method: 'PUT',
    path: '/tenants/{tenantId}/api-keys/{id}',
    summary: 'Update API key',
    pathParams: [
      { name: 'tenantId', type: 'string', required: true, description: 'Tenant.' },
      { name: 'id', type: 'string', required: true, description: 'Clé API.' },
    ],
    bodyParams: [
      { name: 'name', type: 'string', required: false, description: 'Nouveau nom.' },
      { name: 'status', type: 'string', required: false, description: 'ACTIVE ou INACTIVE.' },
    ],
    responseExample: `{"id":"${KEY_ID}","status":"INACTIVE"}`,
    samples: putBearerJson(
      `/tenants/${X_TENANT_ID}/api-keys/${KEY_ID}`,
      '{"status":"INACTIVE"}',
      `{ status: 'INACTIVE' }`,
      `{'status': 'INACTIVE'}`,
      `['status' => 'INACTIVE']`,
    ),
  },
  {
    id: 'ep-delete-tenant-api-key',
    group: 'api_keys',
    method: 'DELETE',
    path: '/tenants/{tenantId}/api-keys/{id}',
    summary: 'Revoke API key',
    pathParams: [
      { name: 'tenantId', type: 'string', required: true, description: 'Tenant.' },
      { name: 'id', type: 'string', required: true, description: 'Clé API.' },
    ],
    responseExample: `{"success":true}`,
    samples: deleteBearer(`/tenants/${X_TENANT_ID}/api-keys/${KEY_ID}`),
  },
  {
    id: 'ep-get-tenant-users',
    group: 'users',
    method: 'GET',
    path: '/tenants/{tenantId}/users',
    summary: 'List users for a tenant',
    pathParams: [{ name: 'tenantId', type: 'string', required: true, description: 'Tenant.' }],
    responseExample: `{"users":[],"total":0,"page":1,"limit":20,"pages":0}`,
    samples: getBearer(`/tenants/${X_TENANT_ID}/users`),
  },
  {
    id: 'ep-post-tenant-users',
    group: 'users',
    method: 'POST',
    path: '/tenants/{tenantId}/users',
    summary: 'Create a new user',
    pathParams: [{ name: 'tenantId', type: 'string', required: true, description: 'Tenant.' }],
    bodyParams: [
      { name: 'email', type: 'string', required: true, description: 'Email.' },
      { name: 'first_name', type: 'string', required: true, description: 'Prénom.' },
      { name: 'last_name', type: 'string', required: true, description: 'Nom.' },
      {
        name: 'role',
        type: 'string',
        required: true,
        description: 'ADMIN, DEVELOPER, FINANCE, VIEWER.',
      },
    ],
    responseExample: `{"id":"${USER_ID}","email":"dev@example.com","role":"DEVELOPER"}`,
    samples: postBearerJson(
      `/tenants/${X_TENANT_ID}/users`,
      '{"email":"dev@example.com","first_name":"Ada","last_name":"Dev","role":"DEVELOPER"}',
      `{ email: 'dev@example.com', first_name: 'Ada', last_name: 'Dev', role: 'DEVELOPER' }`,
      `{'email': 'dev@example.com', 'first_name': 'Ada', 'last_name': 'Dev', 'role': 'DEVELOPER'}`,
      `['email' => 'dev@example.com', 'first_name' => 'Ada', 'last_name' => 'Dev', 'role' => 'DEVELOPER']`,
    ),
  },
  {
    id: 'ep-post-webhooks',
    group: 'webhooks',
    method: 'POST',
    path: '/webhooks',
    summary: 'Create webhook subscription',
    bodyParams: [
      { name: 'url', type: 'string (uri)', required: true, description: 'URL du webhook.' },
      { name: 'event_types', type: 'string[]', required: true, description: 'Types d’événements.' },
      { name: 'description', type: 'string', required: false, description: 'Libellé.' },
    ],
    responseExample: `{"id":"${WH_ID}","url":"https://example.com/hook","status":"ACTIVE"}`,
    samples: postBearerJson(
      '/webhooks',
      '{"url":"https://example.com/hook","event_types":["payment.completed"]}',
      `{ url: 'https://example.com/hook', event_types: ['payment.completed'] }`,
      `{'url': 'https://example.com/hook', 'event_types': ['payment.completed']}`,
      `['url' => 'https://example.com/hook', 'event_types' => ['payment.completed']]`,
    ),
  },
  {
    id: 'ep-get-webhooks',
    group: 'webhooks',
    method: 'GET',
    path: '/webhooks',
    summary: 'List webhook subscriptions',
    responseExample: `{"webhooks":[]}`,
    samples: getBearer('/webhooks'),
  },
  {
    id: 'ep-get-webhook',
    group: 'webhooks',
    method: 'GET',
    path: '/webhooks/{id}',
    summary: 'Get webhook details',
    pathParams: [{ name: 'id', type: 'string', required: true, description: 'Webhook.' }],
    responseExample: `{"id":"${WH_ID}","url":"https://example.com/hook"}`,
    samples: getBearer(`/webhooks/${WH_ID}`),
  },
  {
    id: 'ep-put-webhook',
    group: 'webhooks',
    method: 'PUT',
    path: '/webhooks/{id}',
    summary: 'Update webhook',
    pathParams: [{ name: 'id', type: 'string', required: true, description: 'Webhook.' }],
    bodyParams: [
      { name: 'url', type: 'string', required: false, description: 'Nouvelle URL.' },
      { name: 'event_types', type: 'string[]', required: false, description: 'Événements.' },
      { name: 'status', type: 'string', required: false, description: 'ACTIVE ou INACTIVE.' },
    ],
    responseExample: `{"id":"${WH_ID}","status":"INACTIVE"}`,
    samples: putBearerJson(
      `/webhooks/${WH_ID}`,
      '{"status":"INACTIVE"}',
      `{ status: 'INACTIVE' }`,
      `{'status': 'INACTIVE'}`,
      `['status' => 'INACTIVE']`,
    ),
  },
  {
    id: 'ep-delete-webhook',
    group: 'webhooks',
    method: 'DELETE',
    path: '/webhooks/{id}',
    summary: 'Delete webhook',
    pathParams: [{ name: 'id', type: 'string', required: true, description: 'Webhook.' }],
    responseExample: `{"success":true}`,
    samples: deleteBearer(`/webhooks/${WH_ID}`),
  },
  {
    id: 'ep-get-reports-transactions',
    group: 'reports',
    method: 'GET',
    path: '/reports/transactions',
    summary: 'Paginated transactions report',
    queryParams: [
      { name: 'page', type: 'integer', required: false, description: 'Défaut 1.' },
      { name: 'limit', type: 'integer', required: false, description: 'Défaut 20.' },
      { name: 'fromDate', type: 'string', required: false, description: 'Date.' },
      { name: 'toDate', type: 'string', required: false, description: 'Date.' },
      { name: 'status', type: 'string', required: false, description: 'Filtre statut.' },
    ],
    responseExample: `{"transactions":[],"total":0,"page":1,"limit":20,"pages":0}`,
    samples: getBearer('/reports/transactions?page=1&limit=20'),
  },
  {
    id: 'ep-get-reports-transactions-export',
    group: 'reports',
    method: 'GET',
    path: '/reports/transactions/export',
    summary: 'Export transactions to CSV',
    queryParams: [
      { name: 'fromDate', type: 'string', required: true, description: 'Date début.' },
      { name: 'toDate', type: 'string', required: true, description: 'Date fin.' },
      { name: 'status', type: 'string', required: false, description: 'Filtre.' },
    ],
    responseExample: '(fichier CSV — Content-Type: text/csv)',
    samples: {
      curl: `curl -G ${API_BASE}/reports/transactions/export \\
  ${bearerHeadersCurl()} \\
  --data-urlencode "fromDate=2025-01-01" \\
  --data-urlencode "toDate=2025-01-31" \\
  -o export.csv`,
      node: `const url = new URL('${API_BASE}/reports/transactions/export');
url.searchParams.set('fromDate', '2025-01-01');
url.searchParams.set('toDate', '2025-01-31');
const res = await fetch(url, { headers: { Authorization: 'Bearer ${JWT}' } });
const buf = await res.arrayBuffer();
// … écrire en fichier`,
      python: `import requests

r = requests.get(
    '${API_BASE}/reports/transactions/export',
    headers={'Authorization': 'Bearer ${JWT}'},
    params={'fromDate': '2025-01-01', 'toDate': '2025-01-31'},
)
open('export.csv', 'wb').write(r.content)`,
      php: `<?php
$ch = curl_init('${API_BASE}/reports/transactions/export?fromDate=2025-01-01&toDate=2025-01-31');
curl_setopt_array($ch, [
  CURLOPT_HTTPHEADER => ['Authorization: Bearer ${JWT}'],
  CURLOPT_RETURNTRANSFER => true,
]);
file_put_contents('export.csv', curl_exec($ch));`,
    },
  },
  {
    id: 'ep-get-tenant-balances',
    group: 'ledger',
    method: 'GET',
    path: '/tenants/{tenantId}/balances',
    summary: 'List balances for a tenant',
    pathParams: [{ name: 'tenantId', type: 'string', required: true, description: 'Tenant.' }],
    responseExample: `{"balance":{"currency":"USD","available_minor":10000,"pending_minor":0,"reserved_minor":500}}`,
    samples: getBearer(`/tenants/${X_TENANT_ID}/balances`),
  },
  {
    id: 'ep-get-tenant-ledger',
    group: 'ledger',
    method: 'GET',
    path: '/tenants/{tenantId}/ledger',
    summary: 'List ledger entries for a tenant',
    pathParams: [{ name: 'tenantId', type: 'string', required: true, description: 'Tenant.' }],
    queryParams: [
      { name: 'page', type: 'integer', required: false, description: 'Défaut 1.' },
      { name: 'limit', type: 'integer', required: false, description: 'Défaut 20.' },
      { name: 'fromDate', type: 'string', required: false, description: 'date-time.' },
      { name: 'toDate', type: 'string', required: false, description: 'date-time.' },
      { name: 'type', type: 'string', required: false, description: 'Type d’écriture.' },
    ],
    responseExample: `{"items":[],"total":0,"page":1,"limit":20}`,
    samples: getBearer(`/tenants/${X_TENANT_ID}/ledger?page=1&limit=20`),
  },
]
