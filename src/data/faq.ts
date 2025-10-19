import type { FAQItem } from '@/types/FAQ'

export const faqItems: FAQItem[] = [
  {
    id: 1,
    question: '如何收聽 Podcat 播客？',
    answer: '您可以在 Spotify、Apple Podcasts、Google Podcasts 等主流平台搜尋「Podcat」訂閱收聽。我們的內容在各大播客平台同步更新。',
    category: '收聽方式'
  },
  {
    id: 2,
    question: 'Podcat 多久更新一次？',
    answer: '我們每週發布一集新內容，通常在每週三上午 10:00 更新。特別企劃或訪談集數可能會有額外發布。',
    category: '發布頻率'
  },
  {
    id: 3,
    question: '如何聯絡 Podcat 團隊？',
    answer: '如有合作邀約或任何問題，歡迎來信至 hello@podcat.example.com。我們會盡快回覆您的訊息。',
    category: '聯絡方式'
  },
  {
    id: 4,
    question: '可以推薦集數主題或來賓嗎？',
    answer: '當然可以！我們非常歡迎聽眾的建議。請透過電子郵件或社群媒體與我們分享您的想法。',
    category: '其他'
  },
  {
    id: 5,
    question: 'Podcat 有 RSS 訂閱嗎？',
    answer: '是的，我們提供 RSS feed 訂閱。您可以在各大播客平台找到我們的 RSS 連結，或直接聯絡我們取得。',
    category: '訂閱資訊'
  },
  {
    id: 6,
    question: '播客內容有逐字稿嗎？',
    answer: '部分集數提供逐字稿，您可以在該集數的說明欄位找到連結。我們正在努力為更多集數提供逐字稿服務。',
    category: '其他'
  },
  {
    id: 7,
    question: '可以轉載或引用 Podcat 的內容嗎？',
    answer: '歡迎分享與引用！請註明出處並附上原集數連結。如需商業用途，請先與我們聯絡取得授權。',
    category: '其他'
  },
  {
    id: 8,
    question: '如何支持 Podcat 播客？',
    answer: '您可以透過訂閱、評分、分享給朋友來支持我們。您的每一次收聽與反饋都是我們持續創作的動力！',
    category: '其他'
  },
  {
    id: 9,
    question: 'Podcat 有社群媒體嗎？',
    answer: '我們在 Facebook、Instagram、Twitter 都有官方帳號。搜尋「Podcat 播客」即可找到我們，歡迎追蹤互動！',
    category: '其他'
  },
  {
    id: 10,
    question: '播客支援哪些語言？',
    answer: 'Podcat 目前以繁體中文為主要語言，部分集數可能包含英文內容。我們致力於為華語聽眾提供優質內容。',
    category: '其他'
  }
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
