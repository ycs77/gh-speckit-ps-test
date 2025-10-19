<template>
  <footer class="bg-gray-900 text-gray-300 mt-auto">
    <div class="container mx-auto px-4 py-8">
      <div class="flex flex-col md:flex-row items-center justify-between gap-4">
        <p class="text-sm">
          © {{ currentYear }} Podcat 播客. 版權所有.
        </p>
        <nav aria-label="頁尾導覽">
          <ul role="list" class="flex gap-6">
            <li>
              <router-link
                to="/about"
                class="text-sm hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-gray-900 rounded px-2 py-1 transition-colors"
              >
                關於我們
              </router-link>
            </li>
            <li>
              <router-link
                to="/faq"
                class="text-sm hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-gray-900 rounded px-2 py-1 transition-colors"
              >
                常見問題
              </router-link>
            </li>
            <li>
              <a
                href="mailto:hello@podcat.example.com"
                class="text-sm hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-gray-900 rounded px-2 py-1 transition-colors"
              >
                聯絡我們
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())
</script>
