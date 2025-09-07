// src/controllers/upload.controller.ts
import {post, requestBody} from '@loopback/rest';
import {authenticate} from '@loopback/authentication';
import {inject} from '@loopback/core';
import {SecurityBindings, UserProfile} from '@loopback/security';
import {S3Service} from '../services/s3.service';

export class UploadController {
  constructor(@inject('services.S3Service') private s3: S3Service) {}

  @authenticate('jwt')
  @post('/uploads/presign')
  async presignOne(
    @requestBody() body: {contentType: string; prefix?: string},
    @inject(SecurityBindings.USER) me: UserProfile,
  ) {
    const r = await this.s3.createPresignedPutUrl({
      contentType: body.contentType,
      userId: me.id as string,
      prefix: body.prefix ?? 'products',
    });
    return {success: true, data: r};
  }

  @authenticate('jwt')
  @post('/uploads/presign-batch')
  async presignBatch(
    @requestBody() body: {contentTypes: string[]; prefix?: string},
    @inject(SecurityBindings.USER) me: UserProfile,
  ) {
    const r = await this.s3.createPresignedBatch(
      body.contentTypes,
      me.id as string,
      body.prefix ?? 'products',
    );
    return {success: true, data: r}; // [{uploadUrl,key,publicUrl}, ...]
  }
}
