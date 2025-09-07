// src/models/product.model.ts
import {Entity, model, property} from '@loopback/repository';

@model({name: 'product'})
export class Product extends Entity {
  @property({type: 'string', id: true, defaultFn: 'uuidv4',   mysql: {dataType: 'varchar', dataLength: 100}})
  id?: string;

  @property({type: 'string', required: true})
  title!: string;

  @property({type: 'number', required: true})
  price!: number;

  @property({type: 'string'})
  description?: string;

  @property.array(String, {mysql: {dataType: 'json'}})
  images?: string[];

  @property({type: 'string'}) location?: string;

  // (tuỳ) chủ tin
  @property({type: 'string'}) sellerId?: string;

  @property({type: 'date', defaultFn: 'now'}) createdAt?: string;
  @property({type: 'date', defaultFn: 'now'}) updatedAt?: string;

  constructor(data?: Partial<Product>) { super(data); }
}
