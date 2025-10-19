<script setup lang="ts">
import { faqItems } from '@/data/faq'
import FaqList from '@/components/faq/FaqList.vue'
</script>

<template>
  <div class="py-12 md:py-16 bg-gray-50 min-h-screen">
    <div class="container mx-auto px-4">
      <header class="mb-8 text-center">
        <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          常見問題
        </h1>
        <p class="text-lg text-gray-600">
          快速找到您需要的答案
        </p>
      </header>

      <div class="max-w-3xl mx-auto">
        <FaqList :items="faqItems" />
      </div>
    </div>
  </div>
</template>
