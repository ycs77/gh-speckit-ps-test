<script setup lang="ts">
import { episodes } from '@/data/episodes'
import EpisodeCard from '@/components/episodes/EpisodeCard.vue'
</script>

<template>
  <div class="py-12 md:py-16 bg-gray-50 min-h-screen">
    <div class="container mx-auto px-4">
      <header class="mb-8">
        <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          所有集數
        </h1>
        <p class="text-lg text-gray-600">
          探索 Podcat 播客的所有精彩內容
        </p>
      </header>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <EpisodeCard
          v-for="episode in episodes"
          :key="episode.id"
          :episode="episode"
        />
      </div>
    </div>
  </div>
</template>
