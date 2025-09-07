import {injectable, BindingScope} from '@loopback/core';
import * as jwt from 'jsonwebtoken';

export type JwtPayload = {
  sub: string;
  email?: string;
  phone?: string;
  role: 'buyer' | 'seller' | 'staff';
  name?: string;
};

@injectable({scope: BindingScope.SINGLETON})
export class TokenService {
  private secret: string = process.env.JWT_SECRET || 'dev-secret-change-me';
  private expiresIn: string = process.env.JWT_EXPIRES_IN || '7d';

  sign(payload: JwtPayload): string {
    return jwt.sign(payload, this.secret, {
      algorithm: 'HS256',
      expiresIn: this.expiresIn as jwt.SignOptions['expiresIn'], // ép kiểu
    });
  }

  verify<T extends object = any>(token: string): T {
    return jwt.verify(token, this.secret, {
      algorithms: ['HS256'],
    }) as T;
  }
}
