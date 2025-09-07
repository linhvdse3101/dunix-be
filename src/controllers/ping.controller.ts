
import {get} from '@loopback/rest';

export class PingController {
  @get('/ping')
  ping() {
    return {ping: 'pong', time: new Date().toISOString()};
  }
}
