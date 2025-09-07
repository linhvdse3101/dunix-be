import {Model, model, property} from '@loopback/repository';

@model()
export class LoginDto extends Model {
  @property({type: 'string', jsonSchema: {format: 'email'}})
  email?: string;

  @property({type: 'string'})
  phone?: string;

  @property({type: 'string', required: true, jsonSchema: {minLength: 6}})
  password!: string;
}
