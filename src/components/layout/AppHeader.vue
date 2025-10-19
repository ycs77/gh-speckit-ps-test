<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <header class="bg-white shadow-sm sticky top-0 z-50">
    <div class="container mx-auto px-4 py-4 md:py-6">
      <nav aria-label="主要導覽" class="flex flex-col md:flex-row items-center justify-between gap-4">
        <div class="flex items-center gap-3">
          <svg class="w-8 h-8" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <circle cx="50" cy="50" r="45" fill="#4F46E5"/>
            <text x="50" y="70" font-family="sans-serif" font-size="60" font-weight="bold" fill="white" text-anchor="middle">P</text>
          </svg>
          <h1 class="text-xl md:text-2xl font-bold text-gray-900">Podcat 播客</h1>
        </div>

        <ul role="list" class="flex gap-6 md:gap-8">
          <li>
            <router-link
              to="/"
              class="text-gray-700 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded px-2 py-1 transition-colors"
              :aria-current="route.path === '/' ? 'page' : undefined"
              :class="{ 'text-indigo-600 font-semibold': route.path === '/' }"
            >
              首頁
            </router-link>
          </li>
          <li>
            <router-link
              to="/episodes"
              class="text-gray-700 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded px-2 py-1 transition-colors"
              :aria-current="route.path === '/episodes' ? 'page' : undefined"
              :class="{ 'text-indigo-600 font-semibold': route.path === '/episodes' }"
            >
              集數列表
            </router-link>
          </li>
          <li>
            <router-link
              to="/about"
              class="text-gray-700 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded px-2 py-1 transition-colors"
              :aria-current="route.path === '/about' ? 'page' : undefined"
              :class="{ 'text-indigo-600 font-semibold': route.path === '/about' }"
            >
              關於我們
            </router-link>
          </li>
          <li>
            <router-link
              to="/faq"
              class="text-gray-700 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded px-2 py-1 transition-colors"
              :aria-current="route.path === '/faq' ? 'page' : undefined"
              :class="{ 'text-indigo-600 font-semibold': route.path === '/faq' }"
            >
              常見問題
            </router-link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>
