
import {get, post, param, requestBody} from '@loopback/rest';

export class EscrowController {
  @post('/escrow')
  async create(@requestBody() body: {orderId: string}) {
    return {escrowId: 'ESC_' + Math.random().toString(36).slice(2), orderId: body.orderId, state: 'pending'};
  }

  @get('/escrow/{id}')
  async status(@param.path.string('id') id: string) {
    return {escrowId: id, state: 'in_progress', steps: ['hold','ship','confirm','release']};
  }

  @post('/escrow/{id}/release')
  async release(@param.path.string('id') id: string) {
    return {escrowId: id, released: true};
  }
}
