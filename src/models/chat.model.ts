import {Entity, model, property} from '@loopback/repository';

@model({name: 'chat_rooms'})                // khuyến nghị đặt tên table rõ ràng
export class ChatRoom extends Entity {
  @property({type: 'string', id: true, defaultFn: 'uuidv4'}) // 👈 tự sinh ID
  id?: string;

  @property({type: 'string', required: true})
  title!: string;

  @property({type: 'number', default: 0})
  unread?: number;

  @property({type: 'date'})
  updatedAt?: string;

  constructor(data?: Partial<ChatRoom>) { super(data); }
}

@model({name: 'messages'})
export class Message extends Entity {
  @property({type: 'string', id: true, defaultFn: 'uuidv4'}) // 👈 tự sinh ID
  id?: string;

  @property({type: 'string', required: true})
  roomId!: string;

  @property({type: 'string', required: true})
  text!: string;

  @property({type: 'date', default: () => new Date().toISOString()})
  createdAt?: string;

  constructor(data?: Partial<Message>) { super(data); }
}
