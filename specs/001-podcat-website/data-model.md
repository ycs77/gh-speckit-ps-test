# Data Model: Podcat 播客網站

**Feature**: Podcat Podcast Website
**Branch**: `001-podcat-website`
**Date**: 2025-10-19

## Overview

This document defines all data entities, their attributes, relationships, and validation rules for the Podcat podcast website. All data is **static** (hardcoded in TypeScript files) with no database or external API dependencies.

---

## Entities

**Note**: Navigation is handled by file-based routing (vite-plugin-pages). Routes are auto-generated from `src/pages/` directory. Navigation links are hardcoded in `AppHeader.vue` component without a separate NavigationItem entity.

### 1. Episode (播客集數)

Represents a single podcast episode with metadata.

**TypeScript Interface**:
```typescript
// src/types/Episode.ts
export interface Episode {
  /** Unique identifier (1-20) */
  id: number

  /** Episode title in Traditional Chinese */
  title: string

  /** Publication date in ISO 8601 format (YYYY-MM-DD) */
  date: string

  /** Brief description (50-100 characters recommended) */
  description: string

  /** Episode number for display (e.g., "EP01", "EP02") */
  episodeNumber: string
}
```

**Validation Rules**:
- `id`: Positive integer, unique within dataset (1-20)
- `title`: Non-empty string, max 100 characters
- `date`: Valid ISO 8601 date string (YYYY-MM-DD), must be parseable by `new Date()`
- `description`: Non-empty string, 50-100 characters recommended for UI consistency
- `episodeNumber`: Format "EP" + zero-padded number (e.g., "EP01", "EP15")

**Data Source**:
```typescript
// src/data/episodes.ts
import type { Episode } from '@/types/Episode'

export const episodes: Episode[] = [
  {
    id: 1,
    title: '第一集：播客的起源',
    date: '2025-01-15',
    description: '探索播客文化的誕生與演變，從早期的技術創新到今日的內容革命。',
    episodeNumber: 'EP01'
  },
  // ... 19 more episodes
]

/** Get the 3 most recent episodes (sorted by date descending) */
export const getRecentEpisodes = (count: number = 3): Episode[] => {
  return [...episodes]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, count)
}
```

**Relationships**:
- No relationships (episodes are independent entities)
- Used by: `HomePage` (3 most recent), `EpisodesPage` (all 20)

**State Transitions**:
- N/A (static data, no state changes)

---

### 2. FAQItem (常見問題項目)

Represents a single FAQ question and answer pair.

**TypeScript Interface**:
```typescript
// src/types/FAQ.ts
export interface FAQItem {
  /** Unique identifier */
  id: number

  /** Question text in Traditional Chinese */
  question: string

  /** Answer text in Traditional Chinese */
  answer: string

  /** Category for grouping (optional) */
  category?: '收聽方式' | '發布頻率' | '聯絡方式' | '訂閱資訊' | '其他'
}
```

**Validation Rules**:
- `id`: Positive integer, unique within dataset (1-12)
- `question`: Non-empty string, max 200 characters
- `answer`: Non-empty string, 50-100 characters recommended
- `category`: Optional enum, used for UI grouping/filtering

**Data Source**:
```typescript
// src/data/faq.ts
import type { FAQItem } from '@/types/FAQ'

export const faqItems: FAQItem[] = [
  {
    id: 1,
    question: '如何收聽 Podcat 播客？',
    answer: '您可以在 Spotify、Apple Podcasts、Google Podcasts 等主流平台搜尋「Podcat」訂閱收聽。',
    category: '收聽方式'
  },
  {
    id: 2,
    question: 'Podcat 多久更新一次？',
    answer: '我們每週發布一集新內容，通常在每週三上午 10:00 更新。',
    category: '發布頻率'
  },
  // ... 6-10 more FAQ items
]

/** Group FAQ items by category */
export const getFAQByCategory = (): Record<string, FAQItem[]> => {
  return faqItems.reduce((acc, item) => {
    const cat = item.category || '其他'
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(item)
    return acc
  }, {} as Record<string, FAQItem[]>)
}
```

**Relationships**:
- No relationships
- Used by: `FaqPage` (displays all items in static list)

**State Transitions**:
- N/A (static data, no expand/collapse interaction per spec)

---

### 3. AboutSection (關於內容區塊)

Represents content sections for the About page.

**TypeScript Interface**:
```typescript
// src/types/About.ts
export interface AboutSection {
  /** Section identifier */
  id: string

  /** Section heading in Traditional Chinese */
  title: string

  /** Section content (markdown or plain text) */
  content: string

  /** Section type for styling */
  type: 'intro' | 'team' | 'mission' | 'contact'
}
```

**Validation Rules**:
- `id`: Unique string identifier (kebab-case)
- `title`: Non-empty string, max 50 characters
- `content`: Non-empty string, 100-500 characters recommended
- `type`: Enum for semantic grouping and styling

**Data Source**:
```typescript
// src/data/about.ts
import type { AboutSection } from '@/types/About'

export const aboutSections: AboutSection[] = [
  {
    id: 'intro',
    title: '關於 Podcat',
    content: 'Podcat 是一個專注於科技、設計與創新思維的播客節目。我們致力於為聽眾帶來深度對話、前沿洞察與啟發性內容。',
    type: 'intro'
  },
  {
    id: 'mission',
    title: '我們的使命',
    content: '透過高品質的音訊內容，連結全球華語聽眾與科技趨勢，激發創意思考，推動知識共享。',
    type: 'mission'
  },
  {
    id: 'team',
    title: '製作團隊',
    content: '由一群熱愛科技與內容創作的專業人士組成，包括資深工程師、設計師與媒體製作人。',
    type: 'team'
  },
  {
    id: 'contact',
    title: '聯絡我們',
    content: '如有合作邀約或任何問題，歡迎來信至：hello@podcat.example.com',
    type: 'contact'
  }
]
```

**Relationships**:
- No relationships
- Used by: `AboutPage` component

**State Transitions**:
- N/A (static data)

---

## Data Flow Diagram

```
┌─────────────────────────────────────────┐
│         Static Data Sources             │
│  (src/data/*.ts - TypeScript modules)   │
└─────────────────────────────────────────┘
              │
              │ import
              ▼
┌─────────────────────────────────────────┐
│         Page Components                 │
│  - HomePage                             │
│  - EpisodesPage                         │
│  - AboutPage                            │
│  - FaqPage                              │
└─────────────────────────────────────────┘
              │
              │ props
              ▼
┌─────────────────────────────────────────┐
│      Presentational Components          │
│  - EpisodeCard                          │
│  - FaqList                              │
│  - AboutSection                         │
└─────────────────────────────────────────┘
```

**Data Flow**:
1. Static data defined in `/src/data/*.ts` files
2. Page components import data modules
3. Data passed as props to presentational components
4. No mutations (read-only, immutable data)

---

## Type Safety

All data files include TypeScript type annotations:

```typescript
// Example: src/data/episodes.ts
import type { Episode } from '@/types/Episode'

// Type ensures all objects match Episode interface
export const episodes: Episode[] = [
  // Compile-time validation of structure
]
```

**Benefits**:
- Compile-time validation of data structure
- IntelliSense autocomplete in VS Code
- Prevents typos in property names
- Enforces required fields

---

## Data Constraints Summary

| Entity | Count | Validation | Sorting |
|--------|-------|------------|---------|
| **Episode** | Exactly 20 | Date format, description length | Date descending (newest first) |
| **FAQItem** | 8-12 | Question/answer non-empty | Display order (manual) |
| **AboutSection** | 4 | Content length 100-500 chars | Display order (manual) |

---

## Error Handling

Since all data is static and validated at compile-time:

**Development**:
- TypeScript compiler catches type errors
- Missing required fields → build error
- Invalid date format → runtime error (caught early in dev)

**Production**:
- No dynamic data fetching → no network errors
- No user input → no validation needed at runtime
- Data is immutable → no state management errors

**Edge Cases**:
- **Missing episode description**: UI should handle gracefully (show placeholder or hide field)
- **Invalid date string**: Format in try-catch block, fallback to "日期未知"
- **Empty arrays**: Components should show "無內容" message

---

## Future Extensibility

While current spec requires static data, the type system allows future enhancements:

**Possible Extensions** (not in scope):
- Add `audioUrl` field to `Episode` for embedded player
- Add `tags` array to `Episode` for filtering
- Add `author` field to `Episode` for multi-host podcasts
- Replace static arrays with API fetching (JSON endpoint)

**Migration Path**:
- Types remain unchanged
- Replace `import { episodes } from '@/data/episodes'` with `const episodes = await fetchEpisodes()`
- Components remain unchanged (props interface identical)

---

**Status**: ✅ Data model complete
**Next Step**: Generate contract schemas (Phase 1)
