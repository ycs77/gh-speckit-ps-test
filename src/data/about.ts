import type { AboutSection } from '@/types/About'

export const aboutSections: AboutSection[] = [
  {
    id: 'intro',
    title: '關於 Podcat',
    content: 'Podcat 是一個專注於科技、設計與創新思維的播客節目。我們致力於為聽眾帶來深度對話、前沿洞察與啟發性內容，探索科技如何改變我們的生活與工作方式。',
    type: 'intro'
  },
  {
    id: 'mission',
    title: '我們的使命',
    content: '透過高品質的音訊內容，連結全球華語聽眾與科技趨勢，激發創意思考，推動知識共享。我們相信，每一次對話都能啟發新的想法，每一個故事都值得被傾聽。',
    type: 'mission'
  },
  {
    id: 'team',
    title: '製作團隊',
    content: '由一群熱愛科技與內容創作的專業人士組成，包括資深工程師、設計師與媒體製作人。我們來自不同的背景，卻擁有共同的願景：打造最優質的華語科技播客。',
    type: 'team'
  },
  {
    id: 'contact',
    title: '聯絡我們',
    content: '如有合作邀約、訪談建議或任何問題，歡迎來信至：hello@podcat.example.com。我們期待與您交流，一起探索科技的無限可能。',
    type: 'contact'
  }
]
