import { ComprehendClient, DetectDominantLanguageCommand, DetectSentimentCommand } from '@aws-sdk/client-comprehend';
import { ComprehendRequest } from '../models/ComprehendRequest';
import { ComprehendResponse } from '../models/ComprehendResponse';

export class Comprehend {
    private comprehend: ComprehendClient;

    constructor() {
        this.comprehend = new ComprehendClient({});
    }

    async detectSentiment(request: ComprehendRequest): Promise<ComprehendResponse> {
        const dominantLanguage = await this.detectDominantLanguage(request.sourceText);

        if (!dominantLanguage || !dominantLanguage.LanguageCode || !dominantLanguage.Score) {
            throw new Error('Comprehend returned undefined dominant language data.');
        }

        const command = new DetectSentimentCommand({
            Text: request.sourceText,
            LanguageCode: dominantLanguage?.LanguageCode,
        });
        const result = await this.comprehend.send(command);

        if (
            !result.Sentiment ||
            !result.SentimentScore ||
            !result.SentimentScore.Positive ||
            !result.SentimentScore.Negative ||
            !result.SentimentScore.Neutral ||
            !result.SentimentScore.Mixed
        ) {
            throw new Error('Comprehend returned undefined sentiment data.');
        }

        return {
            sentiment: result.Sentiment as any,
            sentimentScore: {
                positive: result.SentimentScore.Positive,
                negative: result.SentimentScore.Negative,
                neutral: result.SentimentScore.Neutral,
                mixed: result.SentimentScore.Mixed,
            },
            dominantLanguage: dominantLanguage.LanguageCode,
            dominantLanguageScore: dominantLanguage.Score,
        };
    }

    async detectDominantLanguage(text: string) {
        const command = new DetectDominantLanguageCommand({ Text: text });
        const result = await this.comprehend.send(command);

        return result.Languages ? result.Languages[0] : undefined;
    }
}
