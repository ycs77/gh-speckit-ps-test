# Quickstart: Podcat 播客網站

**Feature**: Podcat Podcast Website
**Branch**: `001-podcat-website`
**Date**: 2025-10-19

## 前置需求

在開始之前，請確保您的開發環境已安裝以下工具：

- **Node.js**: v22.x (LTS)
- **Yarn**: 1.22.x
- **作業系統**: Windows 10/11, macOS 12+, 或 Linux
- **瀏覽器** (用於測試):
  - Chrome/Edge (最新兩個版本)
  - Firefox (最新兩個版本)
  - Safari (最新兩個版本)

### 檢查版本

```bash
node --version  # 應顯示 v22.x.x
yarn --version  # 應顯示 1.22.x
```

---

## 1. 專案初始化

### 克隆儲存庫

```bash
git clone <repository-url>
cd <repository-name>
git checkout 001-podcat-website
```

### 安裝依賴套件

```bash
yarn install
```

這將安裝以下依賴：

**生產依賴 (2)**:
- `vue` (3.5.22) - Vue.js 框架
- `vue-router` (4.6.3) - Vue 路由管理

**開發依賴 (6)**:
- `vite` (7.1.10) - 建置工具
- `@vitejs/plugin-vue` (6.0.1) - Vue SFC 支援
- `vite-plugin-pages` (0.33.1) - 檔案式路由自動生成
- `typescript` (5.9.3) - TypeScript 編譯器
- `tailwindcss` (4.1.14) - CSS 框架
- `@tailwindcss/vite` (4.1.14) - Tailwind Vite 插件

---

## 2. 專案結構概覽

```
podcat-website/
├── src/
│   ├── components/       # 可重用 Vue 元件
│   ├── pages/            # 頁面元件 (檔案式路由，自動生成路由)
│   │   ├── index.vue     # 首頁 → /
│   │   ├── episodes.vue  # 集數列表 → /episodes
│   │   ├── about.vue     # 關於 → /about
│   │   └── faq.vue       # FAQ → /faq
│   ├── data/             # 靜態資料 (episodes, FAQ, etc.)
│   ├── types/            # TypeScript 介面定義
│   ├── router/           # Vue Router 設定 (使用 vite-plugin-pages)
│   ├── assets/           # 靜態資源 (圖片, CSS)
│   ├── App.vue           # 根元件
│   └── main.ts           # 應用程式入口
├── public/               # 靜態檔案 (favicon, etc.)
├── specs/                # 功能規格文件
├── index.html            # HTML 入口點
├── vite.config.ts        # Vite 設定 (含 vite-plugin-pages)
├── tailwind.config.ts    # Tailwind CSS 設定
├── tsconfig.json         # TypeScript 設定
└── package.json          # 專案元資訊
```

---

## 3. 開發工作流程

### 啟動開發伺服器

```bash
yarn dev
```

- 開發伺服器將在 `http://localhost:5173` 啟動
- 支援 Hot Module Replacement (HMR) - 儲存檔案後自動重新載入
- 在終端機中按 `q` 停止伺服器

### 建置生產版本

```bash
yarn build
```

- 編譯 TypeScript
- 處理 Vue 單檔元件 (SFC)
- 最小化 CSS (Tailwind) 與 JavaScript
- 輸出至 `/dist/` 目錄

### 預覽生產版本

```bash
yarn preview
```

- 在本地伺服器預覽 `/dist/` 目錄內容
- 用於驗證生產建置是否正常運作

---

## 4. 開發指南

### 新增新的集數資料

編輯 `src/data/episodes.ts`:

```typescript
export const episodes: Episode[] = [
  {
    id: 1,
    title: 'TypeScript 的演進：從 JavaScript 到型別安全',
    date: '2025-01-15',
    description: '探討 TypeScript 如何改變前端開發生態...',
    episodeNumber: 'EP01'
  },
  // 新增集數於此
  {
    id: 21,
    title: '新集數標題',
    date: '2025-02-01',
    description: '簡短描述（50-100 字）',
    episodeNumber: 'EP21'
  }
]
```

### 修改 FAQ 內容

編輯 `src/data/faq.ts`:

```typescript
export const faqItems: FAQItem[] = [
  {
    id: 1,
    question: '您的問題？',
    answer: '您的解答',
    category: '收聽方式'
  }
]
```

### 更新關於頁面內容

編輯 `src/data/about.ts`:

```typescript
export const aboutSections: AboutSection[] = [
  {
    id: 'intro',
    title: '關於 Podcat',
    content: '您的內容...',
    type: 'intro'
  }
]
```

### 新增頁面 (檔案式路由)

使用 vite-plugin-pages，新增頁面非常簡單：

1. 在 `src/pages/` 建立 `.vue` 檔案
2. 檔案名稱自動對應到路由路徑

**範例**:
```vue
<!-- src/pages/contact.vue → 自動產生路由 /contact -->
<script setup lang="ts">
import { ref } from 'vue'

const message = ref('聯絡我們')
</script>

<template>
  <div>
    <h1>{{ message }}</h1>
  </div>
</template>
```

無需手動更新 `router/index.ts`！

### 建立新元件 (可重用元件)

1. 在 `src/components/` 下建立 `.vue` 檔案
2. 使用 Composition API 與 `<script setup>`:

```vue
<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  title: string
}

const props = defineProps<Props>()
</script>

<template>
  <div>{{ title }}</div>
</template>

<style scoped>
/* 使用 Tailwind 類別或自訂 CSS */
</style>
```

---

## 5. 樣式開發

### Tailwind CSS 使用

Tailwind CSS 4 已透過 `@tailwindcss/vite` 整合。

**主樣式檔** (`src/assets/styles/main.css`):
```css
@import "tailwindcss";

@layer base {
  html {
    font-family: -apple-system, "Microsoft JhengHei", "PingFang TC", sans-serif;
  }
}
```

**在元件中使用**:
```vue
<template>
  <div class="flex flex-col md:flex-row gap-4 p-6 bg-white">
    <h1 class="text-2xl font-bold text-gray-900">標題</h1>
  </div>
</template>
```

### 響應式斷點

| 斷點 | 最小寬度 | 目標裝置 |
|------|----------|----------|
| `sm:` | 320px | 手機 |
| `md:` | 768px | 平板 |
| `lg:` | 1280px | 桌面 |

**範例**:
```html
<div class="text-sm md:text-base lg:text-lg">
  響應式文字大小
</div>
```

---

## 6. 測試流程

由於專案憲章禁止使用測試框架，請使用**手動測試**：

### 瀏覽器測試

1. **啟動開發伺服器**: `yarn dev`
2. **測試瀏覽器**:
   - Chrome: 開啟 `http://localhost:5173`
   - Firefox: 開啟相同 URL
   - Safari (macOS): 開啟相同 URL
   - Edge: 開啟相同 URL

### 響應式測試

1. 開啟 Chrome DevTools (F12)
2. 點擊 Device Toolbar (Ctrl+Shift+M / Cmd+Shift+M)
3. 測試以下寬度:
   - 320px (小型手機)
   - 375px (iPhone)
   - 768px (平板)
   - 1280px (桌面)
   - 1920px (大螢幕)

### 無障礙測試

**Lighthouse 檢測**:
1. 開啟 Chrome DevTools
2. 前往 Lighthouse 分頁
3. 選擇 Desktop 或 Mobile
4. 勾選 Accessibility
5. Generate report
6. **目標分數**: ≥90

**鍵盤導航**:
1. 使用 Tab 鍵瀏覽所有互動元素
2. 確認 focus 指示器可見
3. 使用 Enter 鍵啟動連結/按鈕

**螢幕閱讀器** (選用):
- Windows: NVDA (免費下載)
- macOS: VoiceOver (內建，Cmd+F5 啟動)

---

## 7. 建置與部署

### 建置靜態檔案

```bash
yarn build
```

產出: `/dist/` 目錄包含所有靜態檔案

### 部署至 GitHub Pages

```bash
# 建置專案
yarn build

# 部署至 gh-pages 分支 (需先安裝 gh-pages)
# yarn add -D gh-pages
# npx gh-pages -d dist
```

### 部署至 Netlify

1. 登入 Netlify
2. 選擇 "Add new site" → "Import an existing project"
3. 連結 Git 儲存庫
4. 設定:
   - **Build command**: `yarn build`
   - **Publish directory**: `dist`
5. 部署

### 部署至 Vercel

```bash
# 安裝 Vercel CLI
npm i -g vercel

# 部署
vercel
```

或使用 Vercel 網頁介面連結 Git 儲存庫。

---

## 8. 疑難排解

### 問題: `yarn dev` 啟動失敗

**解決方案**:
```bash
# 刪除 node_modules 與 yarn.lock
rm -rf node_modules yarn.lock

# 重新安裝
yarn install
```

### 問題: TypeScript 編譯錯誤

**解決方案**:
- 檢查 `src/types/` 中的介面定義
- 確保所有資料符合型別定義
- 執行 `yarn build` 查看詳細錯誤訊息

### 問題: Tailwind 樣式未生效

**解決方案**:
- 確認 `src/assets/styles/main.css` 已在 `main.ts` 中匯入
- 檢查 `tailwind.config.ts` 的 `content` 設定包含所有 `.vue` 檔案
- 重新啟動開發伺服器

### 問題: Vue Router 404 錯誤 (部署後)

**解決方案**:
- 確認靜態主機已設定 SPA fallback
- Netlify: 新增 `public/_redirects` 檔案: `/* /index.html 200`
- Vercel: 新增 `vercel.json` 檔案 (參見 R3 in research.md)

### 問題: vite-plugin-pages 路由未生成

**解決方案**:
```bash
# 重新啟動開發伺服器
# vite-plugin-pages 在啟動時掃描 src/pages/
yarn dev
```

確認 `vite.config.ts` 包含:
```typescript
import Pages from 'vite-plugin-pages'

export default defineConfig({
  plugins: [vue(), tailwindcss(), Pages()]
})
```

---

## 9. 開發規範

### Git 提交訊息格式

遵循專案憲章，使用繁體中文：

```
類型: 簡要說明

詳細描述（選用）
```

**類型**:
- `新增`: 新功能
- `修改`: 變更現有功能
- `修復`: 錯誤修正
- `文件`: 文件更新
- `樣式`: 樣式調整

**範例**:
```
新增: 集數卡片元件與響應式樣式

- 建立 EpisodeCard.vue 元件
- 新增 Tailwind 響應式斷點
- 測試於 320px、768px、1280px 裝置
```

### 程式碼風格

- **縮排**: 2 空格
- **引號**: 單引號 (TypeScript/JavaScript)
- **分號**: 不使用 (Vue/Vite 預設)
- **元件命名**: PascalCase (e.g., `EpisodeCard.vue`)
- **檔案命名**: kebab-case for data files (e.g., `episodes.ts`)

---

## 10. 快速指令參考

| 指令 | 說明 |
|------|------|
| `yarn install` | 安裝所有依賴套件 |
| `yarn dev` | 啟動開發伺服器 (port 5173) |
| `yarn build` | 建置生產版本至 `/dist/` |
| `yarn preview` | 預覽生產建置 |
| `yarn type-check` | 執行 TypeScript 型別檢查 (若有設定) |

---

## 11. 相關文件

- [Feature Specification](./spec.md) - 功能需求規格
- [Implementation Plan](./plan.md) - 實作計畫
- [Research](./research.md) - 技術研究與決策
- [Data Model](./data-model.md) - 資料模型定義
- [Contracts](./contracts/) - JSON Schema 定義

---

## 12. 取得協助

**技術問題**:
- 查閱 `specs/001-podcat-website/research.md` 研究文件
- 參考 Vue.js 官方文件: https://vuejs.org
- 參考 Tailwind CSS 官方文件: https://tailwindcss.com

**專案相關**:
- 提交 Issue 至儲存庫
- 聯絡專案維護者

---

**最後更新**: 2025-10-19
**文件版本**: 1.0.0
