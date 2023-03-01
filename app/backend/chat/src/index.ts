import { Handler } from './modules/Handler';

export const handler = async (event: any, context: any): Promise<any> => {
    console.log(event);

    const cid = event.requestContext.connectionId;
    const handler = new Handler();

    try {
        switch (event.requestContext.routeKey) {
            case '$connect':
                await handler.connect(cid);
                break;
            case '$disconnect':
                await handler.disconnect(cid);
                break;
            default:
                await handler.default(cid, JSON.parse(event.body));
                break;
        }

        return { statusCode: 200, body: 'Data sent.' };
    } catch (e) {
        console.log(e);
        return { statusCode: 500, body: 'Operation failed.' };
    }
};
