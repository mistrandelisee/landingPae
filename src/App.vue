<script setup lang="ts">
import AppFooter from './components/AppFooter.vue'
import AppHeader from './components/AppHeader.vue'
</script>

<template>
  <div class="page">
    <AppHeader />
    <router-view class="page__main" />
    <AppFooter />
  </div>
</template>

<style scoped>
.page {
  overflow-x: hidden;
  padding-top: 72px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.page__main {
  flex: 1;
  width: 100%;
}
</style>
