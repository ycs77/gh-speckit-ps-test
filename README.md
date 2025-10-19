# Podcat 播客網站

現代化的播客展示網站，採用 Vue 3、Vite 7 和 Tailwind CSS 4 打造，呈現簡潔、科技感的設計風格。

## 專案簡介

Podcat 是一個靜態播客網站，旨在提供優質的使用者體驗來展示播客內容。網站採用響應式設計，在手機、平板、桌面裝置上都能完美顯示，並符合 WCAG 2.1 Level AA 無障礙標準。

### 主要功能

- **首頁**: 展示播客品牌視覺、最新 3 集預覽
- **集數列表**: 顯示 20 個播客集數的完整列表，包含標題、日期、描述
- **關於頁面**: 介紹播客背景、製作團隊、主題定位
- **FAQ 頁面**: 提供常見問題解答（收聽方式、發布頻率、聯絡資訊等）

## 技術堆疊

- **前端框架**: Vue.js 3.5+
- **建置工具**: Vite 7
- **樣式框架**: Tailwind CSS 4
- **路由管理**: Vue Router 4.6+ with vite-plugin-pages
- **語言**: TypeScript 5.x

## 專案結構

```
podcat-website/
├── public/              # 靜態資源
├── src/
│   ├── assets/          # 圖片、樣式等資源
│   ├── components/      # Vue 元件
│   ├── data/            # 靜態數據（集數、FAQ 等）
│   ├── pages/           # 頁面元件（自動路由）
│   ├── router/          # 路由配置
│   ├── types/           # TypeScript 型別定義
│   ├── App.vue          # 根元件
│   └── main.ts          # 應用程式入口
├── specs/               # 功能規格與文件
├── index.html           # HTML 入口
├── vite.config.ts       # Vite 配置
├── tsconfig.json        # TypeScript 配置
└── package.json         # 專案依賴

```

## 開始使用

### 環境需求

- Node.js 18+ 或更新版本
- Yarn 或 npm

### 安裝

```bash
# 克隆專案
git clone <repository-url>
cd gh-speckit-ps-test

# 安裝依賴
yarn install
# 或
npm install
```

### 開發

```bash
# 啟動開發伺服器
yarn dev
# 或
npm run dev
```

開發伺服器將在 `http://localhost:5173` 啟動

### 建置

```bash
# 建置生產版本
yarn build
# 或
npm run build
```

建置檔案將輸出至 `dist/` 目錄

### 預覽

```bash
# 預覽生產版本
yarn preview
# 或
npm run preview
```

## 設計特色

- **現代化設計**: 簡潔排版、充足留白、大膽字體運用
- **活力配色**: 高對比度、科技感的鮮明色彩方案
- **響應式佈局**: 支援手機（320px+）、平板（768px+）、桌面（1280px+）
- **無障礙優先**: 符合 WCAG 2.1 AA 標準、鍵盤導航支援、螢幕閱讀器友善
- **效能優化**: Lighthouse 分數目標：Performance、Accessibility、Best Practices ≥ 90

## 瀏覽器支援

支援以下瀏覽器的最新兩個版本：

- Chrome
- Firefox
- Safari
- Edge

## 規格文件

完整的功能規格與開發計畫請參閱 `specs/001-podcat-website/` 目錄：

- [spec.md](specs/001-podcat-website/spec.md) - 功能規格
- [plan.md](specs/001-podcat-website/plan.md) - 開發計畫
- [tasks.md](specs/001-podcat-website/tasks.md) - 任務清單

## 開發指南

詳細的開發規範與專案配置請參閱 [CLAUDE.md](CLAUDE.md)

## License

Private project
