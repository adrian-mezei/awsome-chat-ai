import { PollyClient, SynthesizeSpeechCommand } from '@aws-sdk/client-polly';
import { PollyRequest } from '../models/PollyRequest';
import { PollyResponse } from '../models/PollyResponse';
import { Readable, Stream } from 'stream';
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

        const pollyResponse = await this.polly.send(params);
        const s3FileUrl = await this.s3.uploadAudio(pollyResponse.AudioStream as any);

        return {
            // audio: await this.audioToBase64String(pollyResponse),
            audioUrl: s3FileUrl,
        };
    }

    private async audioToBase64String(output: SynthesizeSpeechCommandOutput): Promise<string> {
        let audioBuffer: Buffer;
        if (output instanceof Buffer) {
            audioBuffer = output;
        } else if (output instanceof Readable) {
            audioBuffer = await this.streamToBuffer(output);
        } else {
            console.error(output);
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
