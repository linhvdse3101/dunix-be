import {Entity, model, property} from '@loopback/repository';

@model({
  name: 'users',
  settings: {
    hiddenProperties: ['password'],
    indexes: {
      uniqueEmail: {keys: {email: 1}, options: {unique: true}},
      uniquePhone: {keys: {phone: 1}, options: {unique: true}},
    },
  },
})
export class User extends Entity {
  @property({type: 'string', id: true, defaultFn: 'uuidv4',   mysql: {dataType: 'char', length: 36}})
  id!: string;

  @property({type: 'string', required: true})
  name!: string;

  @property({type: 'string', required: true})
  role!: 'buyer' | 'seller' | 'staff';

  @property({type: 'string', jsonSchema: {format: 'email'}, nullable: true})
  email?: string;

  @property({type: 'string', nullable: true})
  phone?: string;

  @property({type: 'boolean', default: false})
  verified?: boolean;

  // Mật khẩu lưu dạng băm
  @property({type: 'string', mysql: {columnName: 'password_hash'}})
  password?: string;

  @property({type: 'string', nullable: true})
  avatarUrl?: string;

  constructor(data?: Partial<User>) {
    super(data);
  }
}
