<script setup lang="ts">
import { computed } from 'vue'
import type { Episode } from '@/types/Episode'

interface Props {
  episode: Episode
}

const props = defineProps<Props>()

const formattedDate = computed(() => {
  return new Date(props.episode.date).toLocaleDateString('zh-TW', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
})
</script>

<template>
  <article
    :aria-labelledby="`episode-${episode.id}`"
    class="bg-white border border-gray-200 rounded-lg p-4 md:p-6 hover:shadow-lg transition-shadow duration-200"
  >
    <div class="flex flex-col gap-2">
      <div class="flex items-center gap-3">
        <span class="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-1 rounded">
          {{ episode.episodeNumber }}
        </span>
        <time :datetime="episode.date" class="text-sm text-gray-500">
          {{ formattedDate }}
        </time>
      </div>

      <h3 :id="`episode-${episode.id}`" class="text-lg md:text-xl font-bold text-gray-900 leading-tight">
        {{ episode.title }}
      </h3>

      <p class="text-sm md:text-base text-gray-600 leading-relaxed">
        {{ episode.description }}
      </p>
    </div>
  </article>
</template>
