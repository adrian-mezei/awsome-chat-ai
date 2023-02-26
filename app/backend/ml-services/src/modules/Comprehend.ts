export class Comprehend {
    constructor() {}

    async handle(event: any) {
        return { statusCode: 200, body: 'Hello from Comprehend.' };
    }
}
