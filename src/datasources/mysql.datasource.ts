import { LifeCycleObserver } from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'mysql',
  connector: 'mysql', // loopback-connector-mysql
  host: process.env.MYSQL_HOST ?? '127.0.0.1',
  port: +(process.env.MYSQL_PORT ?? 3306),
  user: process.env.MYSQL_USER ?? 'dunix',
  password: process.env.MYSQL_PASSWORD ?? 'dunix123',
  database: process.env.MYSQL_DB ?? 'dunix',
  connectionLimit: 10,
  collation: 'utf8mb4_unicode_ci',
};

export class MysqlDataSource extends juggler.DataSource implements LifeCycleObserver {
  static dataSourceName = 'mysql';
  static readonly defaultConfig = config;
  constructor(dsConfig: object = config) {
    super(dsConfig);
  }
}
