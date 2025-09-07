import {inject} from '@loopback/core';
import {DefaultCrudRepository, juggler} from '@loopback/repository';
import { Otp } from '../models/otp.model';

export class OtpRepository extends DefaultCrudRepository<Otp, typeof Otp.prototype.id> {
  constructor(@inject('datasources.mysql') dataSource: juggler.DataSource) {
    super(Otp, dataSource);
  }
}
