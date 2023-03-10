import { Comprehend } from './modules/Comprehend';
import { Polly } from './modules/Polly';
import { Translate } from './modules/Translate';

const comprehend = new Comprehend();
const translate = new Translate();
const polly = new Polly();

export const handler = async (event: any, context: any): Promise<any> => {
    console.log(event);
    if (event.body.length > 200) return { statusCode: 400, body: 'Request body too large.' };

    try {
        let responseBody;
        switch (event.requestContext.resourcePath) {
            case '/comprehend':
                responseBody = await comprehend.detectSentiment(JSON.parse(event.body));
                break;
            case '/translate':
                responseBody = await translate.translateText(JSON.parse(event.body));
                break;
            case '/polly':
                responseBody = await polly.synthesizeSpeech(JSON.parse(event.body));
                break;
            default:
                return { statusCode: 400, body: 'Unknown path.' };
        }
        return { statusCode: 200, body: JSON.stringify(responseBody), headers: { 'content-type': 'application/json' } };
    } catch (e) {
        console.log(e);
        return { statusCode: 500, body: 'Operation failed.' };
    }
};
