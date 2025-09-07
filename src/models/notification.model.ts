
import {Entity, model, property} from '@loopback/repository';

@model({name: 'notification'})
export class Notification extends Entity {
  @property({type: 'string', id: true, defaultFn: 'uuidv4'}) 
  id?: string;  @property({type: 'string'}) title!: string;
  @property({type: 'string'}) body?: string;
  @property({type: 'date'}) createdAt!: string;
  constructor(data?: Partial<Notification>) { super(data); }
}
