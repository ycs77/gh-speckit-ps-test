import type { Episode } from '@/types/Episode'

export const episodes: Episode[] = [
  {
    id: 1,
    title: 'TypeScript 的演進：從 JavaScript 到型別安全',
    date: '2025-01-15',
    description: '探討 TypeScript 如何改變前端開發生態，為何型別系統能提升程式碼品質與開發效率。',
    episodeNumber: 'EP01'
  },
  {
    id: 2,
    title: 'Vue 3 Composition API 深度解析',
    date: '2025-01-22',
    description: '深入了解 Vue 3 的 Composition API，如何讓元件邏輯更易於重用與維護。',
    episodeNumber: 'EP02'
  },
  {
    id: 3,
    title: '無障礙網頁設計：WCAG 2.1 實戰指南',
    date: '2025-01-29',
    description: '學習如何實作 WCAG 2.1 AA 標準，讓更多使用者都能順暢使用你的網站。',
    episodeNumber: 'EP03'
  },
  {
    id: 4,
    title: 'Tailwind CSS 4：現代化的 CSS 工作流程',
    date: '2025-02-05',
    description: '探索 Tailwind CSS 4 的新特性，如何透過 Utility-First 提升開發速度。',
    episodeNumber: 'EP04'
  },
  {
    id: 5,
    title: 'Vite 7：次世代前端建置工具',
    date: '2025-02-12',
    description: 'Vite 7 如何利用 Native ESM 與 esbuild，為開發者帶來極速的建置體驗。',
    episodeNumber: 'EP05'
  },
  {
    id: 6,
    title: '響應式設計的最佳實踐',
    date: '2025-02-19',
    description: '從手機到桌面，如何設計在各種裝置上都能完美呈現的使用者介面。',
    episodeNumber: 'EP06'
  },
  {
    id: 7,
    title: 'Web Performance 優化策略',
    date: '2025-02-26',
    description: '深入探討 First Contentful Paint、Time to Interactive 等指標的優化技巧。',
    episodeNumber: 'EP07'
  },
  {
    id: 8,
    title: 'Component-Based 架構設計哲學',
    date: '2025-03-05',
    description: '探討如何將使用者介面拆分為可重用、易維護的元件，建立可擴展的系統。',
    episodeNumber: 'EP08'
  },
  {
    id: 9,
    title: 'Git 工作流程與團隊協作',
    date: '2025-03-12',
    description: '學習 Git Flow、GitHub Flow 等協作模式，提升團隊開發效率。',
    episodeNumber: 'EP09'
  },
  {
    id: 10,
    title: 'Progressive Web Apps 實戰',
    date: '2025-03-19',
    description: 'PWA 如何讓網頁應用具備原生 App 的體驗，離線功能與推播通知的實作。',
    episodeNumber: 'EP10'
  },
  {
    id: 11,
    title: '前端測試策略：單元測試到端對端測試',
    date: '2025-03-26',
    description: '建立完整的測試金字塔，確保程式碼品質與重構的信心。',
    episodeNumber: 'EP11'
  },
  {
    id: 12,
    title: 'CSS Grid 與 Flexbox：現代佈局技術',
    date: '2025-04-02',
    description: '掌握 CSS Grid 與 Flexbox，輕鬆實現複雜的網頁佈局設計。',
    episodeNumber: 'EP12'
  },
  {
    id: 13,
    title: 'JavaScript 模組系統：ESM vs CommonJS',
    date: '2025-04-09',
    description: '理解 JavaScript 模組化的演進，以及 ESM 如何成為現代標準。',
    episodeNumber: 'EP13'
  },
  {
    id: 14,
    title: '設計系統建構指南',
    date: '2025-04-16',
    description: '如何從零開始建立一致性的設計系統，包含元件庫、設計原則與文件。',
    episodeNumber: 'EP14'
  },
  {
    id: 15,
    title: 'API 設計原則：RESTful 與 GraphQL',
    date: '2025-04-23',
    description: '比較 RESTful API 與 GraphQL 的優劣，選擇適合專案的 API 設計模式。',
    episodeNumber: 'EP15'
  },
  {
    id: 16,
    title: '前端安全性：XSS 與 CSRF 防護',
    date: '2025-04-30',
    description: '了解常見的前端安全漏洞，學習如何保護使用者資料與應用程式安全。',
    episodeNumber: 'EP16'
  },
  {
    id: 17,
    title: 'Node.js 與全端開發',
    date: '2025-05-07',
    description: '探索 Node.js 如何讓 JavaScript 開發者跨足後端，建立全端應用程式。',
    episodeNumber: 'EP17'
  },
  {
    id: 18,
    title: 'Docker 容器化部署實戰',
    date: '2025-05-14',
    description: '學習如何使用 Docker 將應用程式容器化，實現一致的開發與生產環境。',
    episodeNumber: 'EP18'
  },
  {
    id: 19,
    title: 'CI/CD 自動化流程建置',
    date: '2025-05-21',
    description: '建立持續整合與持續部署流程，加速軟體交付週期。',
    episodeNumber: 'EP19'
  },
  {
    id: 20,
    title: '開源專案貢獻指南',
    date: '2025-05-28',
    description: '如何參與開源社群，從第一個 Pull Request 開始為開源專案做出貢獻。',
    episodeNumber: 'EP20'
  }
]

/** Get the most recent episodes (sorted by date descending) */
export const getRecentEpisodes = (count: number = 3): Episode[] => {
  return [...episodes]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, count)
}
