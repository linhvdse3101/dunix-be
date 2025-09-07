import {inject} from '@loopback/core';
import {DefaultCrudRepository, juggler} from '@loopback/repository';
import {Product} from '../models/product.model';

export class ProductRepository extends DefaultCrudRepository<Product, typeof Product.prototype.id> {
  constructor(@inject('datasources.mysql') dataSource: juggler.DataSource) { super(Product, dataSource); }
}