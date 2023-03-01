import { ApiGatewayManagementApiClient, PostToConnectionCommand } from '@aws-sdk/client-apigatewaymanagementapi';
import { TextEncoder } from 'util';
import { LexResponse } from '../models/LexResponse';

export class ApiGW {
    private apiGW: ApiGatewayManagementApiClient;

    constructor() {
        this.apiGW = new ApiGatewayManagementApiClient({
            endpoint: process.env.APIGW_ENDPOINT,
        });
    }

    async postToConnection(connectionId: string, data: LexResponse) {
        const command = new PostToConnectionCommand({
            ConnectionId: connectionId,
            Data: new TextEncoder().encode(JSON.stringify(data)),
        });
        return this.apiGW.send(command);
    }
}
