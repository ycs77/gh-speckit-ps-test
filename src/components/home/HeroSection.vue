<template>
  <section class="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white py-12 md:py-20 lg:py-24">
    <div class="container mx-auto px-4">
      <div class="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
        <div class="flex-1 text-center lg:text-left">
          <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
            探索科技、設計與創新
          </h2>
          <p class="text-lg md:text-xl text-indigo-100 mb-6 leading-relaxed">
            Podcat 播客為您帶來深度對話、前沿洞察與啟發性內容，連結全球華語聽眾與科技趨勢。
          </p>
          <router-link
            to="/episodes"
            class="inline-block bg-white text-indigo-600 font-semibold px-6 py-3 rounded-lg hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600 transition-colors"
          >
            瀏覽所有集數
          </router-link>
        </div>

        <div class="flex-1 flex justify-center">
          <svg
            viewBox="0 0 400 300"
            class="w-full max-w-md"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <circle cx="200" cy="150" r="80" fill="#fff" opacity="0.2"/>
            <circle cx="200" cy="150" r="60" fill="#fff" opacity="0.3"/>
            <circle cx="200" cy="150" r="40" fill="#fff" opacity="0.5"/>
            <path d="M 160 150 L 160 130 Q 160 110 180 110 L 220 110 Q 240 110 240 130 L 240 170 Q 240 190 220 190 L 180 190 Q 160 190 160 170 Z" fill="#fff"/>
            <circle cx="175" cy="140" r="5" fill="#4F46E5"/>
            <circle cx="200" cy="140" r="5" fill="#4F46E5"/>
            <circle cx="225" cy="140" r="5" fill="#4F46E5"/>
            <path d="M 185 165 Q 200 175 215 165" stroke="#4F46E5" stroke-width="3" fill="none" stroke-linecap="round"/>
          </svg>
        </div>
      </div>
    </div>
  </section>
</template>
