import {inject} from '@loopback/core';
import {DefaultCrudRepository, juggler} from '@loopback/repository';
import {Order} from '../models/order.model';

export class OrderRepository extends DefaultCrudRepository<Order, typeof Order.prototype.id> {
  constructor(@inject('datasources.mysql') dataSource: juggler.DataSource) { super(Order, dataSource); }
}