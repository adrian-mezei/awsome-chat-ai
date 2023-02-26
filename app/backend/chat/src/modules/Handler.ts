import { ApiGW } from './ApiGW';
import { DynamoDB } from './DynamoDB';

export class Handler {
    private ddb: DynamoDB;
    private apiGW: ApiGW;

    constructor() {
        this.ddb = new DynamoDB();
        this.apiGW = new ApiGW();
    }

    async connect(connectionId: string) {
        await this.ddb.put(connectionId);
    }

    async disconnect(connectionId: string) {
        await this.ddb.delete(connectionId);
    }

    async default(connectionId: string, parsedBody: { message: string; senderName: string; senderGravatar: string }) {
        let connectionData = await this.ddb.scan();

        try {
            await this.apiGW.postToConnection(connectionId, 'Thank you :)');
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
