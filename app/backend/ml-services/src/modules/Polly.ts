import { PollyClient, SynthesizeSpeechCommand } from '@aws-sdk/client-polly';
import { PollyRequest } from '../models/PollyRequest';
import { PollyResponse } from '../models/PollyResponse';
import { Readable, Stream, PassThrough } from 'stream';
import { SynthesizeSpeechCommandOutput } from '@aws-sdk/client-polly/dist-types/commands';
import { PutObjectAclCommand } from '@aws-sdk/client-s3/dist-types/commands';
import { S3 } from './S3';

export class Polly {
    private polly: PollyClient;
    private s3: S3;

    constructor() {
        this.polly = new PollyClient({});
        this.s3 = new S3();
    }

    async synthesizeSpeech(request: PollyRequest): Promise<PollyResponse> {
        // Voices: https://docs.aws.amazon.com/polly/latest/dg/voicelist.html
        var params = new SynthesizeSpeechCommand({
            OutputFormat: 'mp3',
            Engine: 'neural',
            Text: request.sourceText,
            VoiceId: 'Aria',
        });

        const audioStream = (await this.polly.send(params)).AudioStream as Stream;
        const streamS3 = audioStream.pipe(new PassThrough());
        const streamBase64 = audioStream.pipe(new PassThrough());

        return {
            audioUrl: await this.s3.uploadAudio(streamS3 as any),
            audio: request.includeBase64 ? await this.streamToBase64String(streamBase64) : undefined,
        };
    }

    private async streamToBase64String(stream: any): Promise<string> {
        let audioBuffer: Buffer;
        if (stream instanceof Buffer) {
            audioBuffer = stream;
        } else if (stream instanceof Readable) {
            audioBuffer = await this.streamToBuffer(stream);
        } else {
            console.error(stream);
            throw new Error('Polly returned undefined or not Buffer or not Readable.');
        }
        return audioBuffer.toString('base64');
    }

    private async streamToBuffer(stream: Stream): Promise<Buffer> {
        return new Promise<Buffer>((resolve, reject) => {
            const _buf = Array<any>();

            stream.on('data', chunk => _buf.push(chunk));
            stream.on('end', () => resolve(Buffer.concat(_buf)));
            stream.on('error', err => reject(`error converting stream - ${err}`));
        });
    }
}
