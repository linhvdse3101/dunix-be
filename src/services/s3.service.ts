// src/services/s3.service.ts
import {injectable, BindingScope} from '@loopback/core';
import {S3Client, PutObjectCommand} from '@aws-sdk/client-s3';
import {getSignedUrl} from '@aws-sdk/s3-request-presigner';
import {v4 as uuid} from 'uuid';

@injectable({scope: BindingScope.TRANSIENT})
export class S3Service {
  
  private s3 = new S3Client({
    region: process.env.AWS_REGION!,

  });

  
  constructor() {
    const region = process.env.AWS_REGION || 'ap-southeast-1';
    const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
    const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

    if (!region || !accessKeyId || !secretAccessKey) {
      throw new Error('AWS config missing: check AWS_REGION, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY');
    }

      this.s3 = new S3Client({
      region,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });
  
  }

  async createPresignedPutUrl(opts: {
    contentType: string;
    userId?: string;
    prefix?: string; // ví dụ: 'products'
    expiresInSec?: number; // mặc định 300
  }) {
    const bucket = process.env.S3_BUCKET!;
    const prefix = opts.prefix ?? 'uploads';
    const day = new Date().toISOString().slice(0, 10);
    const ext = this.extFromContentType(opts.contentType);
    const key = `${prefix}/${opts.userId ?? 'anon'}/${day}/${uuid()}.${ext}`;

    const cmd = new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      ContentType: opts.contentType,
    });

    const uploadUrl = await getSignedUrl(this.s3, cmd, {
      expiresIn: opts.expiresInSec ?? 300,
    });

    const publicBase = process.env.S3_PUBLIC_BASE!; // vd https://bucket.s3.ap-southeast-1.amazonaws.com
    const publicUrl = `${publicBase}/${key}`;

    return {uploadUrl, key, publicUrl};
  }

  async createPresignedBatch(contentTypes: string[], userId?: string, prefix?: string) {
    return Promise.all(
      contentTypes.map(ct =>
        this.createPresignedPutUrl({contentType: ct, userId, prefix}),
      ),
    );
  }

  private extFromContentType(ct: string) {
    const c = ct.toLowerCase();
    if (c.includes('jpeg') || c.includes('jpg')) return 'jpg';
    if (c.includes('png')) return 'png';
    if (c.includes('webp')) return 'webp';
    if (c.includes('heic')) return 'heic';
    return 'bin';
  }
}
