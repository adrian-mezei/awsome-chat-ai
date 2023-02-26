export interface ComprehendResponse {
    sentiment?: 'POSITIVE' | 'NEGATIVE' | 'NEUTRAL' | 'MIXED';
    sentimentScore: {
        positive?: number;
        negative?: number;
        neutral?: number;
        mixed?: number;
    };
    dominantLanguage?: string;
    dominantLanguageScore?: number;
}
