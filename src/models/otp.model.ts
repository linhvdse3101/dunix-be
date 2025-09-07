import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    mysql: {schema: 'dunix', table: 'otps'},
    indexes: {
      byPhonePurpose: {
        keys: {phone: 1, purpose: 1}, unique: false,
      },
    },
  },
})
export class Otp extends Entity {
  @property({type: 'string', id: true, defaultFn: 'uuidv4',   mysql: {dataType: 'varchar', dataLength: 100}})
  id?: string;

  @property({
    type: 'string',
    required: true,
    mysql: {columnName: 'phone', dataType: 'varchar', dataLength: 32, nullable: 'N'},
  })
  phone?: string;

  @property({
    type: 'string',
    required: true,
    mysql: {columnName: 'purpose', dataType: 'varchar', dataLength: 32, nullable: 'N'},
  })
  purpose?: string;

  @property({
    type: 'string',
    required: true,
    mysql: {columnName: 'code', dataType: 'char', dataLength: 6, nullable: 'N'},
  })
  code?: string;

  @property({
    type: 'date',
    required: true,
    mysql: {columnName: 'expiresAt', dataType: 'datetime', nullable: 'N'},
  })
  expiresAt!: Date;

  @property({
    type: 'number',
    required: false,
    default: 0,
    mysql: {columnName: 'attempts', dataType: 'tinyint', unsigned: true, nullable: 'Y'},
  })
  attempts?: number;

  @property({
    type: 'date',
    default: () => new Date(),
    mysql: {columnName: 'createdAt', dataType: 'datetime', nullable: 'Y'},
  })
  createdAt?: Date;

  constructor(data?: Partial<Otp>) { super(data); }

}
