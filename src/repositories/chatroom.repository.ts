
import {inject} from '@loopback/core';
import {DefaultCrudRepository, juggler} from '@loopback/repository';
import {ChatRoom} from '../models/chat.model';

export class ChatRoomRepository extends DefaultCrudRepository<ChatRoom, typeof ChatRoom.prototype.id> {
  constructor(@inject('datasources.mysql') dataSource: juggler.DataSource) { super(ChatRoom, dataSource); }
}
