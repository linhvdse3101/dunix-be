import {Model, model, property} from '@loopback/repository';

@model()
export class BaseResponse<T = unknown> extends Model {
  @property({type: 'boolean', required: true})
  success: boolean;

  @property({type: 'string'})
  message?: string;

  @property({type: 'object'})
  data?: T;

  constructor(data?: Partial<BaseResponse<T>>) {
    super(data);
    this.success = data?.success ?? false;
  }
}
