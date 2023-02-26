import { TranslateClient, TranslateTextCommand } from '@aws-sdk/client-translate';
import { TranslateRequest } from '../models/TranslateRequest';
import { TranslateResponse } from '../models/TranslateResponse';

export class Translate {
    private translate: TranslateClient;

    constructor() {
        this.translate = new TranslateClient({});
    }

    async translateText(request: TranslateRequest): Promise<TranslateResponse> {
        const command = new TranslateTextCommand({
            SourceLanguageCode: request.sourceLanguage,
            Text: request.sourceText,
            TargetLanguageCode: request.targetLanguage,
        });
        const response = await this.translate.send(command);

        if (!response.TranslatedText) {
            throw new Error('Translation returned undefined text.');
        }

        return { text: response.TranslatedText };
    }
}
