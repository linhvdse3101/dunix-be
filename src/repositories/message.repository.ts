
import {inject} from '@loopback/core';
import {DefaultCrudRepository, juggler} from '@loopback/repository';
import {Message} from '../models/chat.model';

export class MessageRepository extends DefaultCrudRepository<Message, typeof Message.prototype.id> {
  constructor(@inject('datasources.mysql') dataSource: juggler.DataSource) { super(Message, dataSource); }
}
