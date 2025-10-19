# Research: Podcat 播客網站

**Feature**: Podcat Podcast Website
**Branch**: `001-podcat-website`
**Date**: 2025-10-19

## Overview

This document consolidates research findings for technical decisions and best practices for building a static Vue.js 3.5+ website with Vite 7, TypeScript, and Tailwind CSS 4. All decisions align with the project constitution's minimal dependency principle and static-first architecture.

---

## R1: Vite 7 + Vue 3.5+ + Tailwind CSS 4 Integration

### Decision
Use **Vite 7 with Vue 3.5+ plugin** and **Tailwind CSS 4 via @tailwindcss/vite** for a unified build pipeline.

### Configuration Pattern
```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss()
  ],
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'vue-vendor': ['vue', 'vue-router']
        }
      }
    }
  }
})
```

```javascript
// tailwind.config.ts
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts}'],
  theme: {
    screens: {
      'sm': '320px',   // Mobile
      'md': '768px',   // Tablet
      'lg': '1280px'   // Desktop
    },
    extend: {}
  }
}
```

### Rationale
- Vite's Vue plugin provides HMR, SFC compilation, and optimal code splitting
- **@tailwindcss/vite** is the official Tailwind CSS 4 Vite plugin (no PostCSS needed)
- Single build command (`vite build`) produces static files in `/dist/`
- Tree-shaking eliminates unused Tailwind utilities (typically <10KB final CSS)
- Tailwind CSS 4 uses native CSS features, eliminating PostCSS dependency

### Alternatives Considered
- **PostCSS + autoprefixer approach**: Legacy Tailwind CSS 3.x pattern, not needed for v4
- **Webpack + Vue CLI**: Slower build times, heavier configuration, not aligned with Vite specification
- **Rollup alone**: No built-in Vue SFC support, requires manual plugin orchestration
- **No build tool**: Cannot use TypeScript, Vue SFCs, or scoped CSS without compilation

### Dependencies Required
```json
{
  "dependencies": {
    "vue": "^3.5.0",
    "vue-router": "^4.4.0"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^5.0.0",
    "@tailwindcss/vite": "^4.0.0",
    "vite": "^7.0.0",
    "typescript": "^5.6.0",
    "tailwindcss": "^4.0.0"
  }
}
```

---

## R2: Tailwind CSS 4 Responsive Breakpoints

### Decision
Map spec requirements to **custom Tailwind breakpoints**: `sm: 320px`, `md: 768px`, `lg: 1280px`.

### Implementation
```typescript
// tailwind.config.ts
export default {
  theme: {
    screens: {
      'sm': '320px',   // Mobile (spec: 320px-480px)
      'md': '768px',   // Tablet (spec: 768px-1024px)
      'lg': '1280px'   // Desktop (spec: 1280px+)
    }
  }
}
```

### Usage Example
```vue
<template>
  <!-- Mobile-first: stack vertically, then horizontal on tablet -->
  <div class="flex flex-col md:flex-row gap-4">
    <nav class="w-full md:w-64">...</nav>
    <main class="flex-1">...</main>
  </div>
</template>
```

### Rationale
- Tailwind default breakpoints (640px, 768px, 1024px, 1280px) don't align with spec's 320px minimum
- Mobile-first approach: base styles for 320px, `md:` prefix for ≥768px, `lg:` for ≥1280px
- Constitution requires 320px-480px (mobile), 768px-1024px (tablet), 1280px+ (desktop)

### Alternatives Considered
- **Tailwind defaults unchanged**: Misses 320px-640px mobile range (spec violation)
- **Custom CSS media queries**: Verbose, defeats Tailwind utility purpose
- **Container queries**: Not universally supported in target browsers (Safari 16+)

---

## R3: Vue Router File-Based Routing

### Decision
Use **vite-plugin-pages** for automatic file-based routing generation from `src/pages/` directory.

### Configuration
```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import Pages from 'vite-plugin-pages'

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    Pages({
      dirs: 'src/pages',
      extensions: ['vue'],
      exclude: ['**/components/**']
    })
  ],
  // ... rest of config
})
```

```typescript
// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import routes from '~pages'

export default createRouter({
  history: createWebHistory('/'),
  routes
})
```

### File-Based Route Mapping
```
src/pages/
├── index.vue        → /
├── episodes.vue     → /episodes
├── about.vue        → /about
└── faq.vue          → /faq
```

### Static Host Configuration
**GitHub Pages** (`public/404.html` redirect):
```html
<!DOCTYPE html>
<html>
<head>
  <script>
    sessionStorage.redirect = location.href;
  </script>
  <meta http-equiv="refresh" content="0;URL='/'" />
</head>
</html>
```

**Netlify** (`public/_redirects`):
```
/*    /index.html   200
```

**Vercel** (`vercel.json`):
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

### Rationale
- **Convention over configuration**: Routes auto-generated from file structure, no manual route definitions
- **Type safety**: `vite-plugin-pages` generates TypeScript route types
- **Developer experience**: Adding new page = create file in `src/pages/`, no router updates needed
- **Maintainability**: File structure directly maps to URL structure (easy to navigate)
- **Zero configuration**: Minimal setup, follows Next.js/Nuxt.js patterns

### Alternatives Considered
- **Manual route configuration**: Requires updating `router/index.ts` for every new page, error-prone
- **Hash mode**: No configuration needed, but URLs less shareable and not SEO-friendly
- **No router**: Separate HTML files (violates DRY, duplicates navigation across 4 pages)

---

## R4: WCAG 2.1 AA Compliance in Vue.js

### Decision
Use **semantic HTML5 elements** + **ARIA attributes** in Vue components, following Vue.js accessibility best practices.

### Patterns

**Navigation (AppHeader.vue)**:
```vue
<template>
  <header>
    <nav aria-label="主要導覽">
      <ul role="list">
        <li v-for="item in navItems" :key="item.path">
          <router-link
            :to="item.path"
            :aria-current="$route.path === item.path ? 'page' : undefined"
          >
            {{ item.label }}
          </router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>
```

**Episode List (EpisodeCard.vue)**:
```vue
<template>
  <article aria-labelledby="`episode-${episode.id}`">
    <h3 :id="`episode-${episode.id}`">{{ episode.title }}</h3>
    <time :datetime="episode.date">{{ formatDate(episode.date) }}</time>
    <p>{{ episode.description }}</p>
  </article>
</template>
```

**Skip Link (App.vue)**:
```vue
<template>
  <a href="#main-content" class="skip-link">跳至主要內容</a>
  <AppHeader />
  <main id="main-content" tabindex="-1">
    <router-view />
  </main>
</template>

<style>
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: #000;
  color: #fff;
  padding: 8px;
  z-index: 100;
}
.skip-link:focus {
  top: 0;
}
</style>
```

### WCAG 2.1 AA Checklist
- ✅ **1.4.3 Contrast (Minimum)**: Text contrast ≥4.5:1 (Tailwind utilities: `text-gray-900 bg-white`)
- ✅ **2.1.1 Keyboard**: All interactive elements focusable via Tab (native `<a>`, `<button>`)
- ✅ **2.4.1 Bypass Blocks**: Skip link to main content
- ✅ **3.1.1 Language of Page**: `<html lang="zh-Hant">` in `index.html`
- ✅ **4.1.2 Name, Role, Value**: Semantic HTML (`<nav>`, `<article>`, `<time>`)

### Rationale
- Vue.js doesn't hinder accessibility if semantic HTML is used
- `aria-current="page"` indicates active navigation item for screen readers
- `<time datetime>` provides machine-readable dates
- Skip link allows keyboard users to bypass navigation

### Alternatives Considered
- **ARIA-heavy approach**: Overusing ARIA when semantic HTML suffices (anti-pattern)
- **Accessibility library**: Vue A11y utils add dependencies (violates minimal principle)

---

## R5: Traditional Chinese Typography

### Decision
Use **system font stack** for Traditional Chinese with fallback to sans-serif.

### Configuration
```css
/* src/assets/styles/main.css */
@import "tailwindcss";

@layer base {
  html {
    font-family:
      -apple-system,
      BlinkMacSystemFont,
      "Segoe UI",
      "Microsoft JhengHei",  /* Windows Traditional Chinese */
      "PingFang TC",          /* macOS/iOS Traditional Chinese */
      "Noto Sans TC",         /* Android Traditional Chinese */
      sans-serif;
  }
}
```

### Rationale
- **No web fonts needed**: System fonts provide excellent CJK rendering
- **Performance**: Zero network requests for fonts (faster load)
- **Consistency**: Users see fonts they're familiar with on their OS
- **Microsoft JhengHei**: Default Windows Traditional Chinese font
- **PingFang TC**: macOS/iOS default (better kerning than Heiti TC)
- **Noto Sans TC**: Android fallback
- **Tailwind CSS 4**: Uses `@import "tailwindcss"` instead of separate directives

### Alternatives Considered
- **Google Fonts (Noto Sans TC)**: Adds external dependency, 300KB+ download, slower FCP
- **Custom web fonts**: Violates "no image optimization" spirit (font subsetting prohibited)
- **English fonts only**: Poor CJK character rendering (gibberish or missing glyphs)

---

## R6: Accessibility Testing Without Automation

### Decision
Manual testing workflow using **browser DevTools** + **keyboard navigation** + **screen reader spot-checks**.

### Testing Workflow

**Step 1: Browser DevTools (all browsers)**
- **Chrome**: Lighthouse audit (Accessibility score target: ≥90)
  - Run: DevTools → Lighthouse → Desktop/Mobile → Generate report
  - Check: Contrast ratios, ARIA attributes, semantic HTML
- **Firefox**: Accessibility Inspector
  - View: DevTools → Accessibility → Check for contrast, keyboard, roles
- **Safari**: Audit tab
  - Check: VoiceOver compatibility issues

**Step 2: Keyboard Navigation (all pages)**
- Tab through all interactive elements (links, buttons)
- Verify visible focus indicators (Tailwind: `focus:ring-2 focus:ring-blue-500`)
- Ensure logical tab order (DOM order = visual order)
- Test Enter/Space on buttons, Enter on links

**Step 3: Screen Reader Spot-Checks**
- **Windows**: NVDA (free, open-source)
  - Navigate by headings (H key)
  - Navigate by landmarks (D key)
  - Verify episode list reads title, date, description
- **macOS**: VoiceOver (built-in)
  - Cmd+F5 to enable
  - VO+Right Arrow to navigate

**Step 4: Responsive Testing**
- Chrome DevTools → Device Toolbar
- Test breakpoints: 320px, 768px, 1280px, 1920px
- Verify no horizontal scrollbars, touch targets ≥44×44px

### Checklist (per component)
```markdown
- [ ] Lighthouse Accessibility ≥90
- [ ] All interactive elements keyboard-accessible
- [ ] Focus indicators visible (not `outline: none`)
- [ ] Heading hierarchy logical (h1 → h2 → h3, no skips)
- [ ] Images have alt text (decorative: `alt=""`)
- [ ] Color contrast ≥4.5:1 (text), ≥3:1 (UI components)
- [ ] Screen reader announces page title on route change
- [ ] Forms (if any) have associated labels
```

### Rationale
- Constitution prohibits testing frameworks; manual testing is required
- Lighthouse provides automated checks within browser (not a separate framework)
- Keyboard + screen reader covers 80% of accessibility issues
- Real device testing supplements emulation

### Alternatives Considered
- **Automated tools (axe, WAVE)**: Separate tools/libraries violate testing framework ban
- **No testing**: Unacceptable - WCAG 2.1 AA is non-negotiable per constitution

---

## R7: Static Asset Optimization

### Decision
Use **SVG for hero graphic** and **manual image optimization** (no build-time libraries).

### Workflow

**Hero Graphic**:
- Format: SVG (vector, scales infinitely, tiny file size)
- Creation: Design in Figma/Illustrator → Export as optimized SVG
- Manual optimization: Remove unnecessary metadata via SVGOMG web tool (https://jakearchibald.github.io/svgomg/)
- Placement: Inline in `HeroSection.vue` or `src/assets/images/hero.svg`

**Favicon**:
- Format: ICO (legacy) + SVG (modern)
- Generate: Use favicon generator (https://realfavicongenerator.net/)
- Placement: `public/favicon.ico` + `public/favicon.svg`

**Other Graphics** (if needed):
- Photos: WebP with PNG fallback (manual conversion via online tools)
- Icons: Inline SVG or SVG sprite sheet

### Implementation
```vue
<!-- HeroSection.vue -->
<template>
  <section class="hero">
    <!-- Inline SVG for best performance -->
    <svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
      <!-- SVG content -->
    </svg>
  </section>
</template>
```

### Rationale
- **No image optimization libraries**: Constitution explicitly prohibits (Sharp, ImageMagick, etc.)
- **SVG advantages**: Scalable, accessible (can add `<title>` for screen readers), tiny size
- **Manual workflow**: Web-based tools (SVGOMG, Squoosh) don't require dependencies
- **Inline SVG**: Eliminates HTTP request, allows CSS styling

### Alternatives Considered
- **Sharp/ImageMagick**: Violates constitution
- **Raster images (PNG/JPG)**: Require responsive variants (1x, 2x, 3x) - manual workflow tedious
- **Icon fonts**: Accessibility issues (screen readers may not announce), CSS-only icons preferred

---

## R8: Vue 3 Composition API vs. Options API

### Decision
Use **Composition API** with `<script setup>` for all components.

### Pattern
```vue
<!-- EpisodeCard.vue -->
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
  <article>
    <h3>{{ episode.title }}</h3>
    <time :datetime="episode.date">{{ formattedDate }}</time>
    <p>{{ episode.description }}</p>
  </article>
</template>
```

### Rationale
- **Composition API** is the recommended approach for Vue 3.5+ (official docs default)
- **`<script setup>`**: Less boilerplate, better TypeScript inference, automatic component registration
- **Reusability**: Easier to extract logic into composables (e.g., `useDateFormat`) if needed
- **Tree-shaking**: Unused Composition API imports are eliminated by bundler

### Alternatives Considered
- **Options API**: More verbose, weaker TypeScript support, legacy pattern
- **Mixed approach**: Inconsistent codebase, increases cognitive load

### Project-Wide Convention
- All components use `<script setup lang="ts">`
- Reactive state: `ref()` for primitives, `reactive()` for objects
- Computed values: `computed()`
- Lifecycle hooks: `onMounted()`, `onUnmounted()`
- Props: `defineProps<PropsInterface>()`
- Emits: `defineEmits<EmitsInterface>()`

---

## Summary Table

| Research Area | Decision | Key Rationale |
|---------------|----------|---------------|
| **R1: Build Integration** | Vite 7 + Vue plugin + @tailwindcss/vite | Unified pipeline, Tailwind CSS 4 native support, no PostCSS needed |
| **R2: Responsive Breakpoints** | Custom Tailwind: `sm:320px`, `md:768px`, `lg:1280px` | Aligns with spec requirements (320px minimum) |
| **R3: Routing** | vite-plugin-pages file-based routing | Convention over configuration, auto-generated routes |
| **R4: Accessibility** | Semantic HTML + ARIA + skip links | WCAG 2.1 AA compliance without libraries |
| **R5: Typography** | System font stack (JhengHei, PingFang TC) | Zero dependencies, optimal CJK rendering |
| **R6: Testing** | Manual (DevTools, keyboard, screen reader) | Constitution prohibits test frameworks |
| **R7: Assets** | SVG hero graphic + manual optimization | No image processing libraries allowed |
| **R8: Vue API** | Composition API with `<script setup>` | Modern best practice, better TypeScript |

---

## Dependencies Locked

```json
{
  "dependencies": {
    "vue": "3.5.13",
    "vue-router": "4.4.5"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "5.2.1",
    "@tailwindcss/vite": "4.0.0",
    "vite": "7.0.5",
    "vite-plugin-pages": "0.32.3",
    "typescript": "5.6.3",
    "tailwindcss": "4.0.0"
  }
}
```

**Total runtime dependencies**: 2 (vue, vue-router)
**Total devDependencies**: 6 (build-time only)

**New dependency justification**:
- **vite-plugin-pages**: File-based routing eliminates manual route configuration, reduces boilerplate, improves maintainability. Zero runtime overhead (build-time only).

This aligns with the constitution's minimal dependency principle while leveraging convention-over-configuration patterns.

---

**Status**: ✅ Research complete
**Next Phase**: Generate `data-model.md` and contracts (Phase 1)
