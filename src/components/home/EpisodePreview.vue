<script setup lang="ts">
import { computed } from 'vue'
import EpisodeCard from '@/components/episodes/EpisodeCard.vue'
import { getRecentEpisodes } from '@/data/episodes'

const recentEpisodes = computed(() => getRecentEpisodes(3))
</script>

<template>
  <section class="py-12 md:py-16 bg-gray-50">
    <div class="container mx-auto px-4">
      <div class="flex flex-col md:flex-row items-center justify-between mb-8">
        <h2 class="text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-0">
          最新集數
        </h2>
        <router-link
          to="/episodes"
          class="text-indigo-600 hover:text-indigo-700 font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded px-3 py-2 transition-colors"
        >
          查看所有集數 →
        </router-link>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <EpisodeCard
          v-for="episode in recentEpisodes"
          :key="episode.id"
          :episode="episode"
        />
      </div>
    </div>
  </section>
</template>
