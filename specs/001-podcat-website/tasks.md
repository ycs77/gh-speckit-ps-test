# Tasks: Podcat 播客網站

**Input**: Design documents from `/specs/001-podcat-website/`
**Prerequisites**: plan.md (✅), spec.md (✅), research.md (✅), data-model.md (✅), contracts/ (✅)

**Tests**: Not requested in specification - manual browser testing will be performed per research.md

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `- [ ] [ID] [P?] [Story?] Description`
- **Checkbox**: All tasks start with `- [ ]` (markdown checkbox)
- **[ID]**: Task ID (T001, T002, T003...)
- **[P]**: Can run in parallel (different files, no dependencies on incomplete tasks)
- **[Story]**: Which user story this task belongs to (US1, US2, US3) - only for user story phases
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [X] T001 Initialize Vite 7 + Vue 3.5 + TypeScript project with package.json at repository root
- [X] T002 Install dependencies: vue@3.5.22, vue-router@4.6.3, vite@7.1.10, @vitejs/plugin-vue@6.0.1, vite-plugin-pages@0.33.1, typescript@5.9.3, tailwindcss@4.1.14, @tailwindcss/vite@4.1.14
- [X] T003 Create project directory structure: src/components/, src/pages/, src/data/, src/types/, src/router/, src/assets/styles/, src/assets/images/, public/
- [X] T004 Configure vite.config.ts with Vue plugin, Tailwind plugin, and vite-plugin-pages for file-based routing
- [X] T005 [P] Configure tailwind.config.ts with custom breakpoints (sm:320px, md:768px, lg:1280px)
- [X] T006 [P] Configure tsconfig.json with ES2020 target, strict mode, and path aliases
- [X] T007 [P] Create src/assets/styles/main.css with Tailwind imports and Traditional Chinese font stack
- [X] T008 [P] Create index.html with `<html lang="zh-Hant">` and viewport meta tag
- [X] T009 [P] Create public/favicon.ico placeholder

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T010 [P] Create Episode TypeScript interface in src/types/Episode.ts (id, title, date, description, episodeNumber)
- [X] T011 [P] Create FAQItem TypeScript interface in src/types/FAQ.ts (id, question, answer, category)
- [X] T012 [P] Create AboutSection TypeScript interface in src/types/About.ts (id, title, content, type)
- [X] T013 Setup Vue Router with file-based routing in src/router/index.ts using vite-plugin-pages
- [X] T014 Create root App.vue component with router-view, skip link, and semantic HTML structure
- [X] T015 Create main.ts entry point with Vue app initialization, router, and main.css import
- [X] T016 [P] Create AppHeader.vue layout component in src/components/layout/ with navigation, logo, and ARIA labels
- [X] T017 [P] Create AppFooter.vue layout component in src/components/layout/ with copyright and links

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - 首次訪客探索播客內容 (Priority: P1) 🎯 MVP

**Goal**: 新訪客來到 Podcat 網站，瀏覽最新集數並了解播客主題

**Independent Test**: 訪客可以進入首頁、瀏覽集數列表、查看集數資訊，並理解播客的主題與定位，完全不需要其他功能即可完成此使用者旅程

### Implementation for User Story 1

- [X] T018 [P] [US1] Create 20 episode data objects in src/data/episodes.ts following Episode interface and episode.schema.json
- [X] T019 [P] [US1] Implement getRecentEpisodes helper function in src/data/episodes.ts to return 3 most recent episodes sorted by date
- [X] T020 [P] [US1] Create EpisodeCard.vue component in src/components/episodes/ with semantic HTML, date formatting, and accessibility attributes
- [X] T021 [P] [US1] Create HeroSection.vue component in src/components/home/ with SVG graphic placeholder, podcast name, and modern design
- [X] T022 [P] [US1] Create EpisodePreview.vue component in src/components/home/ displaying 3 recent episodes using EpisodeCard
- [X] T023 [US1] Create index.vue page in src/pages/ for landing page combining HeroSection and EpisodePreview
- [X] T024 [US1] Create episodes.vue page in src/pages/ for episode list displaying all 20 episodes with EpisodeCard
- [X] T025 [US1] Add responsive Tailwind styles to EpisodeCard.vue for mobile (320px), tablet (768px), desktop (1280px)
- [X] T026 [US1] Add responsive Tailwind styles to HeroSection.vue with vibrant colors and high contrast design
- [X] T027 [US1] Optimize SVG hero graphic manually using SVGOMG and inline in HeroSection.vue
- [X] T028 [US1] Add WCAG 2.1 AA compliance: semantic tags, ARIA attributes, keyboard focus indicators, skip link functionality
- [ ] T029 [US1] Verify color contrast ratios ≥4.5:1 for all text in episode components using browser DevTools
- [ ] T030 [US1] Test responsive layout at breakpoints 320px, 768px, 1280px using Chrome DevTools Device Toolbar
- [ ] T031 [US1] Test keyboard navigation: Tab through all links, verify focus indicators visible
- [ ] T032 [US1] Run Lighthouse accessibility audit for index.vue and episodes.vue pages (target score ≥90)

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently. MVP is ready for deployment.

---

## Phase 4: User Story 2 - 了解播客背景資訊 (Priority: P2)

**Goal**: 訪客想要了解 Podcat 播客的製作團隊、主題定位、製作理念等背景資訊

**Independent Test**: 訪客可以直接進入「關於我們」頁面，閱讀完整的播客介紹、團隊資訊、製作理念，無需依賴其他功能即可完成此使用者旅程

### Implementation for User Story 2

- [X] T033 [P] [US2] Create 4 about section data objects in src/data/about.ts following AboutSection interface and about.schema.json (intro, mission, team, contact)
- [X] T034 [P] [US2] Create AboutSection.vue component in src/components/about/ with semantic HTML and type-based styling
- [X] T035 [US2] Create about.vue page in src/pages/ rendering all 4 AboutSection components
- [X] T036 [US2] Add responsive Tailwind styles to AboutSection.vue for mobile, tablet, desktop breakpoints
- [X] T037 [US2] Add WCAG 2.1 AA compliance: heading hierarchy (h1 → h2), semantic sections, ARIA landmarks
- [ ] T038 [US2] Test keyboard navigation and screen reader compatibility for about.vue page
- [ ] T039 [US2] Run Lighthouse accessibility audit for about.vue page (target score ≥90)

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - 解答常見問題 (Priority: P3)

**Goal**: 訪客有關於播客的疑問（發布頻率、收聽方式、聯絡方式等），希望快速找到答案

**Independent Test**: 訪客可以直接進入 FAQ 頁面，瀏覽常見問題與解答，無需依賴其他功能即可找到所需資訊

### Implementation for User Story 3

- [X] T040 [P] [US3] Create 8-12 FAQ item data objects in src/data/faq.ts following FAQItem interface and faq.schema.json
- [X] T041 [P] [US3] Implement getFAQByCategory helper function in src/data/faq.ts for optional category grouping
- [X] T042 [P] [US3] Create FaqList.vue component in src/components/faq/ displaying static FAQ list (no accordion/collapse)
- [X] T043 [US3] Create faq.vue page in src/pages/ rendering FaqList component
- [X] T044 [US3] Add responsive Tailwind styles to FaqList.vue with clear visual hierarchy and readability
- [X] T045 [US3] Add WCAG 2.1 AA compliance: semantic HTML (dl/dt/dd or article structure), clear question-answer association
- [ ] T046 [US3] Test responsive layout for FAQ items at all breakpoints (320px, 768px, 1280px)
- [ ] T047 [US3] Run Lighthouse accessibility audit for faq.vue page (target score ≥90)

**Checkpoint**: All three user stories should now be independently functional

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [X] T048 [P] Add active route highlighting to AppHeader.vue navigation using `aria-current="page"` and Tailwind styles
- [X] T049 [P] Ensure all navigation links in AppHeader.vue work correctly with file-based routes (/, /episodes, /about, /faq)
- [X] T050 [P] Add hover, focus, and active states to all interactive elements (links, buttons) across all components
- [X] T051 [P] Verify Traditional Chinese typography renders correctly with system font stack across all pages
- [ ] T052 Test all 4 pages in Chrome, Firefox, Safari, Edge (latest 2 versions) for visual consistency
- [ ] T053 Test all 4 pages at edge cases: 319px width, slow 3G network, with screen reader (NVDA or VoiceOver)
- [X] T054 Build production bundle with `vite build` and verify bundle size <50KB gzipped JavaScript
- [ ] T055 Run Lighthouse performance audit on production build (target scores: Performance ≥90, Accessibility ≥90, Best Practices ≥90)
- [ ] T056 Verify First Contentful Paint <1.5s and Time to Interactive <3s on production build
- [X] T057 [P] Create deployment configuration files: public/_redirects for Netlify, vercel.json for Vercel (SPA fallback)
- [ ] T058 Validate all steps in quickstart.md work correctly (clone, install, dev, build, preview)
- [ ] T059 Perform final manual accessibility review: keyboard navigation, screen reader, color contrast, semantic HTML across all pages

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-5)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if multiple developers available)
  - Or sequentially in priority order: P1 (US1) → P2 (US2) → P3 (US3)
- **Polish (Phase 6)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - Independent of US1
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - Independent of US1 and US2

### Within Each User Story

- Data files (episodes.ts, about.ts, faq.ts) before components that consume them
- Reusable components (EpisodeCard, AboutSection, FaqList) before page components
- Page components before styling and accessibility tasks
- Implementation complete before testing tasks
- Story complete before moving to next priority

### Parallel Opportunities

**Phase 1 (Setup)**:
- T005, T006, T007, T008, T009 can all run in parallel (different files)

**Phase 2 (Foundational)**:
- T010, T011, T012 can run in parallel (different TypeScript interfaces)
- T016, T017 can run in parallel (different layout components)

**User Story 1**:
- T018, T019 can run in parallel (same file but independent functions)
- T020, T021, T022 can run in parallel (different components)

**User Story 2**:
- T033, T034 can run in parallel (data and component are independent)

**User Story 3**:
- T040, T041, T042 can run in parallel (data, helper, component are independent initially)

**Phase 6 (Polish)**:
- T048, T049, T050, T051 can run in parallel (different concerns)
- T057 can run in parallel with testing tasks

**Cross-Story Parallelism**:
- Once Phase 2 completes, US1, US2, and US3 can all be implemented in parallel by different developers

---

## Parallel Example: User Story 1

```bash
# Launch data and component creation together:
Task: "Create 20 episode data objects in src/data/episodes.ts"
Task: "Create EpisodeCard.vue component in src/components/episodes/"
Task: "Create HeroSection.vue component in src/components/home/"
Task: "Create EpisodePreview.vue component in src/components/home/"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup → Project structure ready
2. Complete Phase 2: Foundational → Shared infrastructure ready (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1 → Landing page + episode list functional
4. **STOP and VALIDATE**: Test User Story 1 independently with manual browser testing
5. Deploy MVP to staging/production if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready (T001-T017)
2. Add User Story 1 (T018-T032) → Test independently → Deploy/Demo (MVP! 🎯)
3. Add User Story 2 (T033-T039) → Test independently → Deploy/Demo
4. Add User Story 3 (T040-T047) → Test independently → Deploy/Demo
5. Add Polish (T048-T059) → Final testing → Production deployment
6. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. **Team completes Setup + Foundational together** (T001-T017)
2. **Once Foundational is done**:
   - Developer A: User Story 1 (T018-T032) - Landing page + episodes
   - Developer B: User Story 2 (T033-T039) - About page
   - Developer C: User Story 3 (T040-T047) - FAQ page
3. Stories complete and integrate independently via file-based routing
4. Team converges for Polish phase (T048-T059)

---

## Task Summary

**Total Tasks**: 59

**Phase Breakdown**:
- Phase 1 (Setup): 9 tasks
- Phase 2 (Foundational): 8 tasks
- Phase 3 (User Story 1 - P1 MVP): 15 tasks
- Phase 4 (User Story 2 - P2): 7 tasks
- Phase 5 (User Story 3 - P3): 8 tasks
- Phase 6 (Polish): 12 tasks

**Parallel Opportunities**: 24 tasks marked with [P] can run in parallel within their phases

**Independent Test Criteria**:
- US1: Landing page loads, shows 3 recent episodes, episode list shows all 20, responsive at all breakpoints
- US2: About page loads, shows 4 content sections (intro, mission, team, contact), readable and responsive
- US3: FAQ page loads, shows 8-12 Q&A items, all visible without interaction, responsive

**Suggested MVP Scope**: Complete through Phase 3 (User Story 1) for initial deployment - provides core value of browsing podcast content

---

## Notes

- All tasks follow strict checklist format: `- [ ] [ID] [P?] [Story?] Description with file path`
- [P] tasks = different files, no dependencies on incomplete work
- [Story] label (US1, US2, US3) maps task to specific user story for traceability
- Each user story is independently completable and testable
- No automated tests requested - manual testing per research.md workflow
- Commit after each logical task or small group of related tasks
- Stop at any checkpoint to validate story independently
- File-based routing via vite-plugin-pages eliminates manual route configuration
- Constitution compliance: 2 runtime deps, 6 dev deps, no testing frameworks, static-first architecture
