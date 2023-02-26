export interface TranslateRequest {
    sourceLanguage: 'auto' | 'en' | 'hu';
    sourceText: string;
    targetLanguage: 'hu' | 'en' | 'es';
}
