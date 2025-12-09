import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';

// Digital Ocean Spaces Configuration
const SPACES_ENDPOINT = process.env.DO_SPACES_ENDPOINT || 'https://nyc3.digitaloceanspaces.com';
const SPACES_REGION = process.env.DO_SPACES_REGION || 'nyc3';
const SPACES_BUCKET = process.env.DO_SPACES_BUCKET || 'tutaller-assets';

export const s3Client = new S3Client({
    endpoint: SPACES_ENDPOINT,
    region: SPACES_REGION,
    credentials: {
        accessKeyId: process.env.DO_SPACES_KEY || 'mock_key',
        secretAccessKey: process.env.DO_SPACES_SECRET || 'mock_secret',
    },
});

export async function uploadFile(
    file: Buffer | Uint8Array | Blob | string,
    key: string,
    contentType: string = 'image/jpeg'
) {
    if (!process.env.DO_SPACES_KEY) {
        console.log('[MOCK] Uploading file to storage:', key);
        return `https://${SPACES_BUCKET}.${SPACES_REGION}.digitaloceanspaces.com/${key}`;
    }

    const command = new PutObjectCommand({
        Bucket: SPACES_BUCKET,
        Key: key,
        Body: file,
        ACL: 'public-read',
        ContentType: contentType,
    });

    try {
        await s3Client.send(command);
        return `https://${SPACES_BUCKET}.${SPACES_REGION}.digitaloceanspaces.com/${key}`;
    } catch (error) {
        console.error('Error uploading file:', error);
        throw new Error('Failed to upload file');
    }
}

export async function deleteFile(key: string) {
    if (!process.env.DO_SPACES_KEY) {
        console.log('[MOCK] Deleting file from storage:', key);
        return true;
    }

    const command = new DeleteObjectCommand({
        Bucket: SPACES_BUCKET,
        Key: key,
    });

    try {
        await s3Client.send(command);
        return true;
    } catch (error) {
        console.error('Error deleting file:', error);
        throw new Error('Failed to delete file');
    }
}
