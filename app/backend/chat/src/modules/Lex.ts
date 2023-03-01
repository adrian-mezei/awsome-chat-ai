import { LexRuntimeV2Client, RecognizeTextCommand } from '@aws-sdk/client-lex-runtime-v2';

export class Lex {
    private lex: LexRuntimeV2Client;
    private botId: string;
    private botAliasId: string;
    private localeId: string;

    constructor() {
        this.lex = new LexRuntimeV2Client({});
        this.botId = process.env.LEX_BOT_ID!;
        this.botAliasId = process.env.LEX_BOT_ALIAS_ID!;
        this.localeId = process.env.LEX_LOCALE_ID!;
    }

    async recognizeTextCommand(sessionId: string, text: string) {
        const command = new RecognizeTextCommand({
            botId: this.botId,
            botAliasId: this.botAliasId,
            localeId: this.localeId,
            sessionId: sessionId,
            text: text,
        });
        return this.lex.send(command);
    }
}
