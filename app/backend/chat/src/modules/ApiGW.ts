import { ApiGatewayManagementApiClient, PostToConnectionCommand } from '@aws-sdk/client-apigatewaymanagementapi';
import { TextEncoder } from 'util';

export class ApiGW {
    private apiGW: ApiGatewayManagementApiClient;

    constructor() {
        this.apiGW = new ApiGatewayManagementApiClient({
            endpoint: process.env.APIGW_ENDPOINT,
        });
    }

    async postToConnection(connectionId: string, data: string) {
        const command = new PostToConnectionCommand({
            ConnectionId: connectionId,
            Data: new TextEncoder().encode(data),
        });
        return this.apiGW.send(command);
    }
}
