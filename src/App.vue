<script setup lang="ts">
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
</script>

<template>
  <a href="#main-content" class="skip-link">跳至主要內容</a>
  <AppHeader />
  <main id="main-content" tabindex="-1" class="min-h-screen">
    <router-view />
  </main>
  <AppFooter />
</template>

<style scoped>
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: #000;
  color: #fff;
  padding: 8px 16px;
  z-index: 100;
  text-decoration: none;
  border-radius: 0 0 4px 0;
}

.skip-link:focus {
  top: 0;
}
</style>
