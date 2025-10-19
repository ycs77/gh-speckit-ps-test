<script setup lang="ts">
import type { FAQItem } from '@/types/FAQ'

interface Props {
  items: FAQItem[]
}

defineProps<Props>()
</script>

<template>
  <div class="space-y-6">
    <article
      v-for="item in items"
      :key="item.id"
      class="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200"
    >
      <dl>
        <dt class="flex items-start gap-3 mb-3">
          <span class="flex-shrink-0 w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
            Q
          </span>
          <h3 class="text-lg md:text-xl font-bold text-gray-900 flex-1">
            {{ item.question }}
          </h3>
        </dt>
        <dd class="flex items-start gap-3 ml-9">
          <div class="text-base md:text-lg text-gray-700 leading-relaxed">
            {{ item.answer }}
          </div>
        </dd>
        <dd v-if="item.category" class="mt-3 ml-9">
          <span class="inline-block text-xs font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
            {{ item.category }}
          </span>
        </dd>
      </dl>
    </article>
  </div>
</template>
