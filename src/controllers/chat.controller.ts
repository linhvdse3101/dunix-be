
import {get, post, param, requestBody} from '@loopback/rest';
import {repository} from '@loopback/repository';
import {ChatRoomRepository, MessageRepository} from '../repositories';
import {toChatRoomDTO, toMessageDTO} from '../mappers';

export class ChatController {
  constructor(
    @repository(ChatRoomRepository) private rooms: ChatRoomRepository,
    @repository(MessageRepository) private messages: MessageRepository,
  ) {}

  @get('/chat/rooms')
  async roomsList() {
    const list = await this.rooms.find({order: ['updatedAt DESC']});
    return list.map(toChatRoomDTO);
  }

  @get('/chat/rooms/{roomId}/messages')
  async roomMessages(@param.path.string('roomId') roomId: string) {
    const msgs = await this.messages.find({where: {roomId}, order: ['createdAt ASC']});
    return msgs.map(toMessageDTO);
  }

  @post('/chat/rooms/{roomId}/messages')
  async send(@param.path.string('roomId') roomId: string, @requestBody() body: {text: string}) {
    const m = await this.messages.create({roomId, text: body.text} as any);
    await this.rooms.updateById(roomId, {updatedAt: new Date().toISOString(), unread: 0});
    return toMessageDTO(m);
  }
}
