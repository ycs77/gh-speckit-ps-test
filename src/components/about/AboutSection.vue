<script setup lang="ts">
import type { AboutSection } from '@/types/About'

interface Props {
  section: AboutSection
}

defineProps<Props>()

const getTypeStyles = (type: AboutSection['type']) => {
  const styles = {
    intro: 'bg-indigo-50 border-indigo-200',
    mission: 'bg-purple-50 border-purple-200',
    team: 'bg-pink-50 border-pink-200',
    contact: 'bg-blue-50 border-blue-200'
  }
  return styles[type] || 'bg-gray-50 border-gray-200'
}
</script>

<template>
  <section
    :id="section.id"
    class="border rounded-lg p-6 md:p-8"
    :class="getTypeStyles(section.type)"
  >
    <h2 class="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
      {{ section.title }}
    </h2>
    <p class="text-base md:text-lg text-gray-700 leading-relaxed">
      {{ section.content }}
    </p>
  </section>
</template>
