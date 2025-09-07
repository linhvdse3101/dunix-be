
export type Role = 'buyer' | 'seller';

export interface UserDTO {
  id: string;
  name: string;
  role: Role;
  verified?: boolean;
  email?: string;
  phone?: string;
  avatarUrl?: string;
}

export interface ProductDTO {
  id: string;
  title: string;
  price: number;
  images?: string[];
  location?: string;
  condition?: string;
  description?: string;
  sellerId?: string;
  attributes?: Record<string, any>;
}

export interface OrderLineDTO { id: string; qty: number; price: number; }
export interface OrderDTO {
  id: string;
  total: number;
  lines: OrderLineDTO[];
  escrowId?: string;
  status?: string;
}

export interface NotificationDTO {
  id: string;
  title: string;
  body: string;
  createdAt: string;
}

export interface ChatRoomDTO {
  id: string;
  title: string;
  unread?: number;
  updatedAt?: string;
}

export interface MessageDTO {
  id: string;
  roomId: string;
  text: string;
  createdAt?: string;
}
