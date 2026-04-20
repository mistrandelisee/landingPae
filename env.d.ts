/// <reference types="vite/client" />

import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    titleKey?: string
  }
}

declare module '*.json' {
  const value: Record<string, unknown>
  export default value
}
