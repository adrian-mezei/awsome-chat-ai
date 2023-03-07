export interface SentimentModel {
  sentiment: 'NEUTRAL' | 'MIXED' | 'POSITIVE' | 'NEGATIVE',
  sentimentScore: {
    positive: number
    negative: number
    neutral: number
    mixed: number
  }
}
