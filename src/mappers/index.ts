
import {User} from '../models/user.model';
import {Product} from '../models/product.model';
import {Order} from '../models/order.model';
import {Notification} from '../models/notification.model';
import {ChatRoom, Message} from '../models/chat.model';
import {UserDTO, ProductDTO, OrderDTO, NotificationDTO, ChatRoomDTO, MessageDTO} from '../dto';

export const toUserDTO = (u: User): UserDTO => ({
  id: String(u.id),
  name: u.name,
  role: u.role as any,
  verified: u.verified,
  email: u.email,
  phone: u.phone,
  avatarUrl: u.avatarUrl,
});

export const toProductDTO = (p: Product): ProductDTO => ({
  id: String(p.id),
  title: p.title,
  price: p.price,
  images: p.images,
  location: p.location,
  // condition: p?.condition,
  description: p.description,
  sellerId: p.sellerId,
  attributes: (p as any).attributes,
});

export const toOrderDTO = (o: Order): OrderDTO => ({
  id: String(o.id),
  total: o.total,
  lines: (o.lines || []).map(l => ({ id: l.id, qty: l.qty, price: l.price })),
  escrowId: o.escrowId,
  status: o.status,
});

export const toNotificationDTO = (n: Notification): NotificationDTO => ({
  id: String(n.id),
  title: n.title,
  body: n.body ?? '',
  createdAt: n.createdAt,
});

export const toChatRoomDTO = (r: ChatRoom): ChatRoomDTO => ({
  id: String(r.id),
  title: r.title,
  unread: r.unread,
  updatedAt: r.updatedAt,
});

export const toMessageDTO = (m: Message): MessageDTO => ({
  id: String(m.id),
  roomId: m.roomId,
  text: m.text ?? '',
  createdAt: m.createdAt,
});
