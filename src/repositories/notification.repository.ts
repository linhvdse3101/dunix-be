import {inject} from '@loopback/core';
import {DefaultCrudRepository, juggler} from '@loopback/repository';
import {Notification} from '../models/notification.model';

export class NotificationRepository extends DefaultCrudRepository<Notification, typeof Notification.prototype.id> {
  constructor(@inject('datasources.mysql') dataSource: juggler.DataSource) { super(Notification, dataSource); }
}