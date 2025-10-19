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
