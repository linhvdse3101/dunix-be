
import {Entity, model, property} from '@loopback/repository';

@model({name: 'complaint'})
export class Complaint extends Entity {
  @property({type: 'string', id: true, defaultFn: 'uuidv4'}) 
  id?: string;  @property({type: 'string'}) orderId!: string;
  @property({type: 'string'}) message?: string;
  @property({type: 'array', itemType: 'string'}) images?: string[];
  @property({type: 'string'}) status?: string;
  constructor(data?: Partial<Complaint>) { super(data); }
}
