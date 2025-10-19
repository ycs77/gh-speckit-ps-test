<script setup lang="ts">
import { aboutSections } from '@/data/about'
import AboutSection from '@/components/about/AboutSection.vue'
</script>

<template>
  <div class="py-12 md:py-16 bg-gray-50 min-h-screen">
    <div class="container mx-auto px-4">
      <header class="mb-8 text-center">
        <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          關於我們
        </h1>
        <p class="text-lg text-gray-600">
          了解 Podcat 播客的背景、使命與團隊
        </p>
      </header>

      <div class="grid grid-cols-1 gap-8 max-w-4xl mx-auto">
        <AboutSection
          v-for="section in aboutSections"
          :key="section.id"
          :section="section"
        />
      </div>
    </div>
  </div>
</template>
