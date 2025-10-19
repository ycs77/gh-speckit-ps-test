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
