import { LexRequest } from '../models/LexRequest';
import { LexResponse } from '../models/LexResponse';
import { ApiGW } from './ApiGW';
import { Lex } from './Lex';
import { DynamoDB } from './DynamoDB';
import { v4 as uuidv4 } from 'uuid';

export class Handler {
    private ddb: DynamoDB;
    private apiGW: ApiGW;
    private lex: Lex;

    constructor() {
        this.ddb = new DynamoDB();
        this.apiGW = new ApiGW();
        this.lex = new Lex();
    }

    async connect(connectionId: string) {
        await this.ddb.put(connectionId);
    }

    async disconnect(connectionId: string) {
        await this.ddb.delete(connectionId);
    }

    async default(connectionId: string, parsedBody: LexRequest) {
        const lexSessionId = parsedBody.lexSessionId ?? uuidv4();

        const lexResponse = await this.lex.recognizeTextCommand(lexSessionId, parsedBody.message);
        const message = lexResponse.messages?.map(x => x.content).join('/n/n') ?? '?';

        const reply: LexResponse = {
            message,
            senderName: 'Lex',
            lexSessionId,
        };

        try {
            await this.apiGW.postToConnection(connectionId, reply);
        } catch (e) {
            if ((e as any).statusCode === 410) {
                console.log(`Found stale connection, deleting ${connectionId}`);
                await this.ddb.delete(connectionId);
            } else {
                throw e;
            }
        }
    }
}
