# Implementation Plan: Podcat 播客網站

**Branch**: `001-podcat-website` | **Date**: 2025-10-19 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-podcat-website/spec.md`

## Summary

Build a modern, eye-catching podcast website called "Podcat" with four pages: landing page, episode list (20 static items), about page, and FAQ page. The site must be fully responsive (mobile/tablet/desktop), accessible (WCAG 2.1 AA), and use Traditional Chinese as the primary language. Content is static with no backend, server-side rendering, or external integrations.

**Technical Approach**: Static Vue.js 3.5+ SPA built with Vite 7 and TypeScript, styled with Tailwind CSS 4, compiled to static HTML/CSS/JS for deployment to static hosting.

## Technical Context

**Language/Version**: TypeScript 5.x (latest), compiled to ES2020+ JavaScript
**Primary Dependencies**: Vue.js 3.5+, Vite 7, Tailwind CSS 4, vite-plugin-pages (file-based routing)
**Storage**: Static JSON/TS files for episode data (no database)
**Testing**: Manual browser testing (Chrome, Firefox, Safari, Edge latest 2 versions)
**Target Platform**: Static hosting (GitHub Pages, Netlify, Vercel compatible)
**Project Type**: Web (single-page application, static build output)
**Performance Goals**: Lighthouse scores ≥90 (Performance, Accessibility, Best Practices), First Contentful Paint <1.5s, Time to Interactive <3s
**Constraints**: No SSR, no database, no image optimization libraries, no linters/testing frameworks per constitution, WCAG 2.1 AA compliance, responsive 320px-1280px+
**Scale/Scope**: 4 pages (file-based routing), 20 static episodes, ~10-12 Vue components, <50KB initial JS bundle (gzipped)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### ✅ Principle II: 響應式設計義務 (PASS)
- Spec requires responsive design for mobile (320px-480px), tablet (768px-1024px), desktop (1280px+)
- Tailwind CSS provides mobile-first responsive utilities
- All acceptance scenarios include mobile testing (spec.md:33)

### ✅ Principle III: 無障礙合規 (PASS)
- Spec mandates WCAG 2.1 Level AA compliance (FR-012, FR-016)
- Semantic HTML required (FR-013)
- Keyboard navigation tested (SC-007)
- Screen reader compatibility (edge case line 74)

### ✅ Principle IV: 繁體中文優先 (PASS)
- All content in Traditional Chinese (FR-008)
- `<html lang="zh-Hant">` required (FR-014)
- Constitution requires Traditional Chinese for UI, docs, errors

### ✅ Principle V: 靜態優先架構 (PASS)
- No server-side rendering (user specified "static files only")
- Vite builds to static HTML/CSS/JS
- No database (constitution compliant)
- Deployable to GitHub Pages/Netlify/Vercel

### ⚠️ Principle I: 最小依賴原則 (REQUIRES JUSTIFICATION)
**Violations**:
1. **Vue.js 3.5+** - JavaScript framework with dependency tree
2. **Tailwind CSS 4** - CSS framework requiring build-time processing
3. **TypeScript** - Requires compilation step

**Constitution states**: "僅允許使用最小依賴套件 (minimal dependencies packages)" and allows "簡單的打包工具如 Vite"

**Gate Status**: ⚠️ AMBER - Violations must be justified in Complexity Tracking before proceeding

## Complexity Tracking

*Justification for constitution Principle I violations*

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| **Vue.js 3.5+** | Reactive component model required for 15+ components with shared navigation state, episode data binding, and maintainable template structure. Ensures DRY principle across 4 pages. | **Plain HTML**: 4 separate HTML files would duplicate navigation markup 4×, making updates error-prone. No template reuse for episode cards (20× duplication). **Vanilla JS**: Manual DOM manipulation for reactive navigation state (active page highlighting) and episode rendering increases code complexity and XSS risk without framework sanitization. |
| **Tailwind CSS 4** | Mobile-first responsive design for 3 breakpoints (320px/768px/1280px) with consistent spacing scale. Utility classes enable rapid iteration on "modern design" requirement without writing custom CSS. Constitution allows "CSS 工具：PostCSS (僅用於轉譯)". | **Plain CSS**: Writing custom responsive classes for all components would require >500 lines of media queries. Tailwind compiles to minimal CSS (only used utilities). Maintaining consistent spacing/colors across components harder without design tokens. **CSS frameworks (Bootstrap)**: Heavier dependency tree, not minimal. |
| **TypeScript** | Type safety for episode data structure (title, date, description) prevents runtime errors. Spec has 20 static episodes - type checking ensures data consistency. Modern tooling expectation for Vue.js projects. | **Plain JavaScript**: No compile-time validation of episode data shape. Risk of typos in 20 episode objects causing silent failures. Vue 3 + Vite default to TypeScript; opting out increases configuration complexity. |

**Minimal Dependencies Philosophy Compliance**:
- Vite explicitly allowed by constitution ("簡單的打包工具如 Vite")
- Total production dependencies: **2** (vue, vue-router for SPA routing)
- Total devDependencies: **6** (vite, @vitejs/plugin-vue, tailwindcss, @tailwindcss/vite, vite-plugin-pages, typescript)
- Tailwind CSS 4 has **zero runtime overhead** (CSS-only at build time)
- vite-plugin-pages has **zero runtime overhead** (routes generated at build time)
- TypeScript compiles away (zero runtime dependency)
- **No** image optimization libraries ✅
- **No** testing frameworks ✅
- **No** linters ✅
- **No** database ✅

**Risk Mitigation**:
- Lock dependency versions in `package.json` to prevent supply chain drift
- Yarn 1.22 provides `yarn.lock` for reproducible builds
- All dependencies are industry-standard, widely audited, and stable

**Decision**: Proceed with user-specified stack. Violations justified by maintainability gains, constitution's allowance of Vite, and adherence to "minimal" interpretation (3 runtime deps vs. 20+ in typical Vue projects).

## Project Structure

### Documentation (this feature)

```
specs/001-podcat-website/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
│   ├── episode.schema.json
│   ├── faq.schema.json
│   └── about.schema.json
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```
# Web application (Vue.js SPA with file-based routing)
src/
├── components/          # Reusable Vue components
│   ├── layout/
│   │   ├── AppHeader.vue       # Navigation bar with logo, menu
│   │   └── AppFooter.vue       # Footer with copyright, links
│   ├── home/
│   │   ├── HeroSection.vue     # Landing page hero with custom graphic
│   │   └── EpisodePreview.vue  # Shows 3 most recent episodes
│   ├── episodes/
│   │   └── EpisodeCard.vue     # Episode list item (title, date, description)
│   ├── about/
│   │   └── AboutSection.vue    # About page content sections
│   └── faq/
│       └── FaqList.vue         # Static FAQ list (no accordion)
├── pages/               # Page components (auto-routed by vite-plugin-pages)
│   ├── index.vue        # Landing page → route: /
│   ├── episodes.vue     # Episode list → route: /episodes
│   ├── about.vue        # About page → route: /about
│   └── faq.vue          # FAQ page → route: /faq
├── data/                # Static content
│   ├── episodes.ts      # 20 episode objects (title, date, description)
│   ├── faq.ts           # FAQ questions & answers
│   └── about.ts         # About page content
├── types/               # TypeScript interfaces
│   ├── Episode.ts       # Episode data structure
│   ├── FAQ.ts           # FAQ item structure
│   └── About.ts         # About section structure
├── router/              # Vue Router configuration
│   └── index.ts         # Router setup with auto-imported routes from ~pages
├── assets/              # Static assets
│   ├── images/          # Hero graphics, branding
│   └── styles/          # Global CSS
│       └── main.css     # Tailwind import, custom styles
├── App.vue              # Root component
└── main.ts              # App entry point

public/                  # Static files (copied as-is)
└── favicon.ico

dist/                    # Build output (static HTML/CSS/JS)
└── [generated by Vite]

# Configuration files (repository root)
├── package.json         # Dependencies, scripts
├── yarn.lock            # Dependency lock file
├── vite.config.ts       # Vite build configuration
├── tailwind.config.ts   # Tailwind CSS configuration
├── tsconfig.json        # TypeScript compiler options
└── index.html           # SPA entry HTML
```

**Structure Decision**: Single web application (Vue.js SPA). File-based routing via vite-plugin-pages auto-generates routes from `/src/pages/`. Components separated by purpose (pages vs. reusable components). Static data in `/src/data/` as TypeScript modules for type safety. Vite builds to `/dist/` for deployment.

**Rationale**:
- **File-based routing**: 4 files in `pages/` auto-generate 4 routes (convention over configuration)
- **Component separation**: `components/` for reusable UI, `pages/` for route-level components
- **Navigation**: No manual NavigationItem data needed - navigation links hardcoded in AppHeader.vue with route paths
- Episode data (20 items) centralized in `episodes.ts` for single source of truth
- TypeScript `types/` folder ensures data contract compliance
- Tailwind in `assets/styles/main.css` for global config
- `/public/` for favicon, any static assets not processed by Vite

---

## Phase 0: Research & Decisions ✅

**Status**: Complete (see [research.md](./research.md))

**Key Decisions**:
1. **Build Integration**: Vite 7 + @vitejs/plugin-vue + @tailwindcss/vite (no PostCSS/autoprefixer needed)
2. **Responsive Breakpoints**: Custom Tailwind config with sm:320px, md:768px, lg:1280px
3. **Routing**: **vite-plugin-pages** for file-based routing (auto-generate routes from `src/pages/`)
4. **Accessibility**: Semantic HTML + ARIA patterns, manual testing with Lighthouse + keyboard + screen reader
5. **Typography**: System font stack (Microsoft JhengHei, PingFang TC, Noto Sans TC)
6. **Testing**: Manual browser/responsive/accessibility testing (no test frameworks per constitution)
7. **Assets**: SVG hero graphic with manual SVGOMG optimization
8. **Vue API**: Composition API with `<script setup>` for all components

**Dependencies Finalized**:
- Runtime: vue (3.5.22), vue-router (4.6.3)
- Dev: vite (7.1.10), @vitejs/plugin-vue (6.0.1), vite-plugin-pages (0.33.1), typescript (5.9.3), tailwindcss (4.1.14), @tailwindcss/vite (4.1.14)

---

## Phase 1: Design Artifacts ✅

**Status**: Complete

**Generated Files**:
- ✅ [data-model.md](./data-model.md) - **3 entities** defined (Episode, FAQItem, AboutSection) - NavigationItem removed due to file-based routing
- ✅ [contracts/episode.schema.json](./contracts/episode.schema.json) - Episode JSON Schema with programming language examples
- ✅ [contracts/faq.schema.json](./contracts/faq.schema.json) - FAQ item JSON Schema
- ✅ [contracts/about.schema.json](./contracts/about.schema.json) - About section JSON Schema
- ✅ [quickstart.md](./quickstart.md) - Complete setup & development guide with file-based routing instructions

**Entity Summary**:
- **Episode**: 20 items, fields: id, title, date, description, episodeNumber
- **FAQItem**: 8-12 items, fields: id, question, answer, category (optional)
- **AboutSection**: 4 items, fields: id, title, content, type

**Navigation**: Handled by vite-plugin-pages file-based routing. Routes auto-generated from `src/pages/` directory (index.vue → /, episodes.vue → /episodes, etc.). No NavigationItem entity needed.

**Agent Context Updated**:
- ✅ CLAUDE.md created with TypeScript, Vue.js 3.5+, Vite 7, Tailwind CSS 4 context

---

## Constitution Re-Check (Post-Design) ✅

**Status**: All principles PASS

- ✅ **Principle I (最小依賴)**: 2 runtime deps, 6 dev deps (added vite-plugin-pages for file-based routing) - justified
- ✅ **Principle II (響應式設計)**: Custom Tailwind breakpoints (320px/768px/1280px) configured
- ✅ **Principle III (無障礙合規)**: WCAG 2.1 AA patterns documented in research.md
- ✅ **Principle IV (繁體中文優先)**: All data models use Traditional Chinese, system fonts configured
- ✅ **Principle V (靜態優先架構)**: Static TypeScript data files, no database/SSR, Vite static build

**New dependency added**: vite-plugin-pages (0.33.1) - build-time only, zero runtime overhead, enables convention-over-configuration routing.

---

## Phase 2: Task Breakdown

**Status**: NOT generated by this command - run `/speckit.tasks` after reviewing this plan

**Expected Task Categories**:
1. **Project Scaffolding** - Initialize Vite + Vue + TypeScript + Tailwind + vite-plugin-pages
2. **Configuration** - Set up vite.config.ts (with Pages plugin), tailwind.config.ts, tsconfig.json, router/index.ts
3. **Type Definitions** - Create TypeScript interfaces in src/types/ (Episode, FAQ, About)
4. **Static Data** - Create 20 episodes, 8-12 FAQs, 4 about sections in src/data/
5. **Layout Components** - AppHeader (navigation with hardcoded links), AppFooter, skip link
6. **Page Components** - src/pages/index.vue, episodes.vue, about.vue, faq.vue (file-based routing)
7. **Feature Components** - HeroSection, EpisodePreview, EpisodeCard, FaqList, AboutSection
8. **Styling** - Tailwind configuration, system font stack, responsive breakpoints
9. **Accessibility** - Semantic HTML, ARIA attributes, skip links, keyboard navigation
10. **Manual Testing** - Browser compatibility, responsive (320px/768px/1280px), Lighthouse ≥90
11. **Build Optimization** - Bundle analysis, ensure <50KB gzipped JS
12. **Deployment Setup** - Static host fallback configuration (Netlify/_redirects, Vercel/vercel.json)

---

**Phase Summary**:
- ✅ Phase 0 (Research): Complete - 8 technical decisions documented
- ✅ Phase 1 (Design): Complete - 3 entities, 3 schemas, quickstart guide, file-based routing architecture
- ⏳ Phase 2 (Tasks): Ready to generate via `/speckit.tasks`

**Next Command**: `/speckit.tasks`
