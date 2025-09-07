
import {get} from '@loopback/rest';
import {repository} from '@loopback/repository';
import {NotificationRepository} from '../repositories';
import {toNotificationDTO} from '../mappers';

export class NotificationController {
  constructor(@repository(NotificationRepository) private notis: NotificationRepository) {}

  @get('/notifications')
  async list() {
    const list = await this.notis.find({order: ['createdAt DESC']});
    return list.map(toNotificationDTO);
  }
}
