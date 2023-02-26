import { Upload } from '@aws-sdk/lib-storage';
import { AbortMultipartUploadCommand, CompleteMultipartUploadCommandOutput, S3Client } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';

export class S3 {
    private bucket: string;

    constructor() {
        this.bucket = process.env.S3_BUCKET!;
    }

    async uploadAudio(data: string | ReadableStream<any> | Blob | Uint8Array | Buffer | undefined): Promise<string> {
        const parallelUploads3 = new Upload({
            client: new S3Client({}),
            params: {
                Bucket: this.bucket,
                Key: `audio/${uuidv4()}.mp3`,
                Body: data,
                ContentType: 'audio/mpeg',
            },
        });

        const result = await parallelUploads3.done();
        return (result as CompleteMultipartUploadCommandOutput).Location!;
    }
}
