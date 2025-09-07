
import {post, get, param, requestBody} from '@loopback/rest';
import {repository} from '@loopback/repository';
import {ComplaintRepository} from '../repositories';
import {Complaint} from '../models/complaint.model';

export class ComplaintController {
  constructor(@repository(ComplaintRepository) private complaints: ComplaintRepository) {}

  @post('/complaints')
  async create(@requestBody() body: {orderId: string; message: string; images?: string[]}) {
    const c = await this.complaints.create({orderId: body.orderId, message: body.message, images: body.images, status: 'received'} as Complaint);
    return c;
  }

  @get('/complaints/me')
  async mine() {
    return this.complaints.find();
  }

  @get('/complaints/{id}')
  async detail(@param.path.string('id') id: string) {
    return this.complaints.findById(id);
  }
}
