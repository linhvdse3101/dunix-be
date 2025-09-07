
import {get, post, param, requestBody} from '@loopback/rest';
import {repository} from '@loopback/repository';
import {OrderRepository, ProductRepository} from '../repositories';
import {Order} from '../models/order.model';
import {toOrderDTO} from '../mappers';

export class OrderController {
  constructor(
    @repository(OrderRepository) private orders: OrderRepository,
    @repository(ProductRepository) private products: ProductRepository,
  ) {}

  @post('/orders/checkout')
  async checkout(@requestBody() body: {lines: {id: string; qty: number}[], buyerId?: string}) {
    const lines: {id: string; qty: number; price: number}[] = [];
    let total = 0;
    for (const l of body.lines || []) {
      const p = await this.products.findById(l.id);
      const price = p.price || 0;
      total += price * l.qty;
      lines.push({id: l.id, qty: l.qty, price});
    }
    const order = await this.orders.create({
      lines, total, buyerId: body.buyerId, escrowId: 'ESC_' + Math.random().toString(36).slice(2), status: 'pending'
    } as Order);
    return toOrderDTO(order);
  }

  @get('/orders/me')
  async listMine() {
    const list = await this.orders.find({order: ['id DESC']});
    return list.map(toOrderDTO);
  }

  @get('/orders/{id}')
  async track(@param.path.string('id') id: string) {
    const o = await this.orders.findById(id);
    return toOrderDTO(o);
  }
}
