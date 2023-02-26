import { DynamoDB as AWSDynamoDB } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocument, ScanCommandOutput } from '@aws-sdk/lib-dynamodb';

export class DynamoDB {
    private ddb: DynamoDBDocument;
    private tableName;

    constructor() {
        this.ddb = DynamoDBDocument.from(new AWSDynamoDB({}));
        this.tableName = process.env.TABLE_NAME!;
    }

    async put(connectionId: string) {
        const putParams = {
            TableName: this.tableName,
            Item: { connectionId },
        };

        await this.ddb.put(putParams);
    }

    async delete(connectionId: string) {
        const deleteParams = {
            TableName: this.tableName,
            Key: { connectionId },
        };

        await this.ddb.delete(deleteParams);
    }

    async scan() {
        return this.ddb.scan({ TableName: this.tableName });
    }
}
