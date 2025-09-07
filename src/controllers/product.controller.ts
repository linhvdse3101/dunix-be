import {get, post, patch, del, param, requestBody, response} from '@loopback/rest';
import {repository, Where} from '@loopback/repository';
import {ProductRepository} from '../repositories';
import {Product} from '../models/product.model';
import {HttpErrors} from '@loopback/rest';
import { authenticate } from '@loopback/authentication';
import { inject } from '@loopback/core';
import { SecurityBindings, UserProfile } from '@loopback/security';

const toProductDTO = (p: Product) => ({
  id: p.id, title: p.title, price: p.price,
  description: p.description,
  images: p.images ?? [],
  location: p.location ?? null,
  createdAt: p.createdAt,
});

export class ProductController {
  constructor(@repository(ProductRepository) private products: ProductRepository) {}

  @get('/products')
  async list(
    @param.query.string('q') q?: string,
    @param.query.number('min') min?: number,
    @param.query.number('max') max?: number,
    @param.query.string('location') location?: string,
    @param.query.number('limit') limit: number = 30,
    @param.query.number('offset') offset: number = 0,
  ) {
    const where: Where<Product> = {};
    // có thể thêm filter theo q/min/max bằng DB sau, tạm thời filter memory
    const all = await this.products.find({
      order: ['createdAt DESC'],
      limit, offset,
    });

    const filtered = all.filter(p => {
      if (q && !p.title?.toLowerCase().includes(q.toLowerCase())) return false;
      if (min != null && (p.price ?? 0) < min) return false;
      if (max != null && (p.price ?? 0) > max) return false;
      if (location && p.location !== location) return false;
      return true;
    });

    return filtered.map(toProductDTO);
  }

  @get('/products/{id}')
  async detail(@param.path.string('id') id: string) {
    const p = await this.products.findById(id);
    return toProductDTO(p);
  }

  @post('/products')
  @response(201, {description: 'Created'})
  async create(@requestBody() body: Partial<Product>) {
    if (!body?.title) throw new HttpErrors.BadRequest('Thiếu title');
    if (body?.price == null || isNaN(Number(body.price))) {
      throw new HttpErrors.BadRequest('price phải là số');
    }

    const payload: Product = {
      title: String(body.title).trim(),
      price: Number(body.price),
      description: body.description?.toString(),
      images: Array.isArray(body.images) ? body.images.map(String) : [],
      location: body.location?.toString(),
      // (tuỳ) lấy sellerId từ token
      sellerId: body?.sellerId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    } as Product;

    const created = await this.products.create(payload);
    return toProductDTO(created);
  }

  @patch('/products/{id}')
  async update(
    @param.path.string('id') id: string,
    @requestBody() body: Partial<Product>,
  ) {
    const patch: Partial<Product> = {};
    if (body.title != null) patch.title = String(body.title).trim();
    if (body.price != null) {
      const n = Number(body.price);
      if (isNaN(n)) throw new HttpErrors.BadRequest('price phải là số');
      patch.price = n;
    }
    if (body.description != null) patch.description = body.description?.toString();
    if (body.images != null) {
      if (!Array.isArray(body.images)) throw new HttpErrors.BadRequest('images phải là mảng string');
      patch.images = body.images.map(String);
    }
    if (body.location != null) patch.location = body.location?.toString();

    patch.updatedAt = new Date().toISOString();

    await this.products.updateById(id, patch);
    const fresh = await this.products.findById(id);
    return toProductDTO(fresh);
  }

  @del('/products/{id}')
  async remove(@param.path.string('id') id: string) {
    await this.products.deleteById(id);
    return {ok: true};
  }



@get('/me/products')
@authenticate('jwt')
async myProducts(@inject(SecurityBindings.USER) me: UserProfile) {
  const items = await this.products.find({
    where: {sellerId: me['id']},
    order: ['createdAt DESC'],
  });
  return items.map(toProductDTO);
}
}
