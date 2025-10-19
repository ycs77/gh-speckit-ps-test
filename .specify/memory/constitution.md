<!--
SYNC IMPACT REPORT
==================
Version Change: N/A → 1.0.0
Modified Principles: N/A (initial ratification)
Added Sections:
  - Core Principles (5 principles)
  - Technical Constraints
  - Development Workflow
  - Governance
Removed Sections: N/A
Templates Requiring Updates:
  ✅ plan-template.md - Constitution Check section present and ready
  ✅ spec-template.md - Aligned with constitution requirements
  ✅ tasks-template.md - Task categorization compatible
  ✅ agent-file-template.md - No updates needed
  ✅ checklist-template.md - No updates needed
Follow-up TODOs: None
-->

# 靜態網站專案憲章
<!-- Static Website Project Constitution -->

## 核心原則
<!-- Core Principles -->

### I. 最小依賴原則

所有功能實作必須遵循最小依賴原則：

- 禁止使用圖像優化函式庫（image optimization libraries）
- 禁止使用伺服器端渲染（server-side rendering/SSR）
- 禁止整合資料庫（database integration）
- 禁止使用程式碼檢查工具（linters）
- 禁止使用測試框架（testing frameworks）
- 僅允許使用純 HTML、CSS、JavaScript 及基本建置工具

**理由**：保持專案輕量化、可維護性高，降低技術債務與相依性風險。每增加一個依賴項都會增加安全漏洞、版本衝突及長期維護成本。

### II. 響應式設計義務（不可協商）

所有使用者介面必須對行動裝置與桌面裝置進行最佳化：

- 必須使用響應式設計技術（RWD - Responsive Web Design）
- 必須支援常見螢幕尺寸：手機（320px-480px）、平板（768px-1024px）、桌面（1280px+）
- 必須使用流式佈局（fluid layouts）、彈性圖片（flexible images）、媒體查詢（media queries）
- 禁止建立僅適用於單一裝置類型的介面

**理由**：現代網站必須服務多種裝置的使用者。響應式設計確保所有使用者都能獲得良好體驗，並減少需要維護多個版本的成本。

### III. 無障礙合規（不可協商）

所有功能必須符合無障礙標準：

- 必須符合 WCAG 2.1 Level AA 標準
- 必須提供適當的語意化 HTML（semantic HTML）
- 必須支援鍵盤導航（keyboard navigation）
- 必須提供充足的色彩對比度（color contrast ratio ≥ 4.5:1 for normal text）
- 必須為非文字內容提供替代文字（alt text for images）
- 必須使用 ARIA 屬性標註互動元件

**理由**：無障礙設計是基本人權，確保所有使用者（包括身心障礙者）都能平等使用網站。此外也符合法規要求並擴大潛在使用者群。

### IV. 繁體中文優先

所有使用者可見內容必須使用繁體中文（Traditional Chinese）：

- 介面文字、標籤、訊息必須使用繁體中文
- 文件（documentation）必須提供繁體中文版本
- 錯誤訊息與提示必須以繁體中文呈現
- HTML lang 屬性必須設定為 `zh-Hant`
- 字型選擇必須適合繁體中文顯示

**理由**：明確的語言策略確保目標使用者能夠理解與使用網站，提升使用體驗與採用率。

### V. 靜態優先架構

專案必須遵循靜態網站架構原則：

- 所有內容必須為預先生成的靜態檔案（HTML/CSS/JS）
- 禁止使用需要伺服器運行時處理的技術
- 允許使用靜態網站生成器（Static Site Generators）如 Eleventy、Hugo
- 允許使用簡單的建置工具進行檔案合併與最小化
- 必須能夠部署至靜態主機服務（GitHub Pages、Netlify、Vercel 等）

**理由**：靜態架構提供最佳的效能、安全性與可維護性。沒有伺服器端處理意味著更少的攻擊面、更快的載入速度、更低的主機成本。

## 技術限制
<!-- Technical Constraints -->

### 禁止使用的技術

以下技術明確禁止使用於本專案：

- **圖像處理**：Sharp、ImageMagick、Pillow、任何自動化圖像優化函式庫
- **後端框架**：Express、Django、Rails、任何需要伺服器運行的框架
- **資料庫**：PostgreSQL、MySQL、MongoDB、任何資料庫系統
- **程式碼品質工具**：ESLint、Prettier、Stylelint、任何 linters 或 formatters
- **測試框架**：Jest、Mocha、Pytest、任何自動化測試框架
- **渲染技術**：SSR、SSG with server components、任何需要 Node.js 運行時的渲染

### 允許使用的技術

以下技術允許使用：

- **核心技術**：HTML5、CSS3、原生 JavaScript（ES6+）
- **建置工具**（最小化）：簡單的打包工具如 Vite、Parcel（僅用於開發環境）
- **CSS 工具**：PostCSS（僅用於轉譯）、CSS 變數、CSS Grid、Flexbox
- **靜態生成器**：Eleventy、Hugo、Jekyll（若需要模板功能）
- **版本控制**：Git
- **部署目標**：任何靜態主機服務

### 技術決策流程

當需要引入新技術時：

1. 驗證該技術是否符合「最小依賴原則」
2. 確認該技術不在禁止清單中
3. 評估是否有無依賴的替代方案
4. 記錄選擇理由於專案文件

## 開發工作流程
<!-- Development Workflow -->

### 品質保證

由於禁止使用自動化測試框架與 linters：

- **手動測試必要性**：每個功能必須在多種瀏覽器與裝置上手動測試
- **測試範圍**：Chrome、Firefox、Safari、Edge 的最新兩個版本
- **裝置測試**：實際行動裝置（iOS/Android）+ 桌面瀏覽器響應模式
- **無障礙測試**：使用瀏覽器開發工具的無障礙檢查功能、鍵盤導航測試
- **程式碼審查**：必須進行同儕審查（peer review）以確保程式碼品質

### 文件要求

所有功能必須包含：

- **README.md**：專案說明（繁體中文）
- **內聯註解**：複雜邏輯必須有繁體中文註解
- **設定說明**：建置與部署步驟（繁體中文）

### 提交規範

- 提交訊息必須使用繁體中文
- 格式：`類型: 簡要說明` （例：`新增: 響應式導覽選單`）
- 類型包括：新增、修改、修復、文件、樣式

### 響應式開發檢查清單

每個 UI 功能完成時必須驗證：

- [ ] 在 320px 寬度下可用（最小手機）
- [ ] 在 768px 寬度下可用（平板）
- [ ] 在 1280px 以上寬度下可用（桌面）
- [ ] 觸控與滑鼠互動都可正常運作
- [ ] 不會出現水平捲軸（除非刻意設計）

### 無障礙開發檢查清單

每個功能完成時必須驗證：

- [ ] 使用語意化 HTML 標籤
- [ ] 所有互動元件可用鍵盤操作
- [ ] 色彩對比度符合 WCAG AA 標準
- [ ] 圖片有適當的 alt 文字
- [ ] 表單欄位有對應的 label
- [ ] 使用螢幕閱讀器測試過（推薦：NVDA 或 VoiceOver）

## 治理規則
<!-- Governance -->

### 憲章優先性

本憲章優於所有其他開發實踐與指引：

- 任何與憲章衝突的程式碼變更必須被拒絕
- 例外情況必須記錄並獲得專案負責人批准
- 憲章修訂需要明確的理由與共識

### 修訂程序

修改本憲章須遵循以下程序：

1. 提出修訂建議並說明理由
2. 評估對現有專案的影響
3. 更新版本號：
   - **主版本（MAJOR）**：移除或重新定義核心原則
   - **次版本（MINOR）**：新增原則或重大擴充
   - **修訂版本（PATCH）**：澄清說明、修正錯字、非語意修改
4. 更新相依範本與文件
5. 記錄修訂於 Sync Impact Report

### 合規審查

所有拉取請求（Pull Requests）與程式碼審查必須：

- 驗證是否符合五大核心原則
- 檢查是否引入禁止的依賴項
- 確認響應式設計與無障礙性
- 驗證所有使用者可見文字為繁體中文

### 複雜度管理

若需引入額外複雜度（例如建置工具）：

- 必須記錄於 `plan.md` 的「Complexity Tracking」區段
- 必須說明為何需要以及為何更簡單的方案不可行
- 必須評估對「最小依賴原則」的影響

**版本**: 1.0.0 | **核准日期**: 2025-10-19 | **最後修訂**: 2025-10-19
