import {Model, model, property} from '@loopback/repository';

@model()
export class CreateUserDto extends Model {
  @property({type: 'string', required: true, jsonSchema: {minLength: 2}})
  name!: string;

  @property({type: 'string', required: true, jsonSchema: {enum: ['buyer','seller']}})
  role!: 'buyer' | 'seller';

  @property({type: 'string', jsonSchema: {format: 'email'}})
  email?: string;

  @property({type: 'string'})
  phone?: string;

  @property({type: 'string', required: true, jsonSchema: {minLength: 6}})
  password!: string;
}
