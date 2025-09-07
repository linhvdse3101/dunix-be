
import {Entity, model, property} from '@loopback/repository';

@model({name: 'order'})
export class Order extends Entity {
  @property({type: 'string', id: true, defaultFn: 'uuidv4'}) 
  id?: string;  @property({type: 'array', itemType: 'object'}) lines!: {id: string; qty: number; price: number}[];
  @property({type: 'number'}) total!: number;
  @property({type: 'string'}) buyerId?: string;
  @property({type: 'string'}) escrowId?: string;
  @property({type: 'string'}) status?: string;
  constructor(data?: Partial<Order>) { super(data); }
}
