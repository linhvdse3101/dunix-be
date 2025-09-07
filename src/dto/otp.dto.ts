import {Model, model, property} from '@loopback/repository';

@model()
export class RequestOtpDto extends Model {
  @property({ type: 'string' }) phone!: string;
  @property({ type: 'string' }) email?: string; // thêm dòng này
  @property({ type: 'string', required: true })
  purpose!: 'login' | 'register';
  @property({ type: 'string', jsonSchema: { enum: ['sms', 'email'] }, default: 'sms' })
  channel: 'sms' | 'email' = 'sms';
}

@model()
export class VerifyOtpDto extends Model {
  @property({type: 'string', required: true}) phone!: string;
  @property({type: 'string', required: true}) code!: string; // 6 chữ số
}
