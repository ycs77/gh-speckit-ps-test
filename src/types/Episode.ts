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
