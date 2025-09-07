import {inject} from '@loopback/core';
import {DefaultCrudRepository, juggler} from '@loopback/repository';
import {Complaint} from '../models/complaint.model';

export class ComplaintRepository extends DefaultCrudRepository<Complaint, typeof Complaint.prototype.id> {
  constructor(@inject('datasources.mysql') dataSource: juggler.DataSource) { super(Complaint, dataSource); }
}