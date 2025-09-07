import {injectable, BindingScope} from '@loopback/core';
import {repository, Where} from '@loopback/repository';
import {UserRepository} from '../repositories';
import {User} from '../models';
import bcrypt from 'bcryptjs';
import {TokenService, JwtPayload} from './token.service';
import { CreateUserDto } from '../dto/create-user.dto';

export type LoginResult = { token: string; user: User };

@injectable({scope: BindingScope.SINGLETON})
export class UserService {
  constructor(
    @repository(UserRepository) private userRepo: UserRepository,
    private tokenService: TokenService = new TokenService(),
  ) {}

  async createUser(dto: CreateUserDto): Promise<Omit<User, 'password'>> {
    if (!dto.email && !dto.phone) {
      const err: any = new Error('Cần email hoặc số điện thoại');
      err.statusCode = 422;
      throw err;
    }

    if (dto.email) {
      const existed = await this.userRepo.findOne({where: {email: dto.email}});
      if (existed) {
        const e: any = new Error('Email đã tồn tại');
        e.statusCode = 422; throw e;
      }
    }
    if (dto.phone) {
      const existed = await this.userRepo.findOne({where: {phone: dto.phone}});
      if (existed) {
        const e: any = new Error('Số điện thoại đã tồn tại');
        e.statusCode = 422; throw e;
      }
    }

    const hash = await bcrypt.hash(dto.password, 10);
    const created = await this.userRepo.create({
      name: dto.name,
      role: dto.role,
      email: dto.email,
      phone: dto.phone,
      verified: false,
      password: hash,
    });

    const {password, ...safe} = created.toJSON() as any;
    return safe;
  }

  async login(payload: {email?: string; phone?: string; password: string;}): Promise<LoginResult> {
    if (!payload.email && !payload.phone) {
      const err: any = new Error('Cần email hoặc số điện thoại');
      err.statusCode = 400; throw err;
    }

    const where: Where<User> = payload.email ? {email: payload.email} : {phone: payload.phone};
    const user = await this.userRepo.findOne({where});
    if (!user || !user.password) {
      const err: any = new Error('Tài khoản không tồn tại');
      err.statusCode = 401; throw err;
    }

    const ok = await bcrypt.compare(payload.password, user.password);
    if (!ok) {
      const err: any = new Error('Email/SĐT hoặc mật khẩu không đúng');
      err.statusCode = 401; throw err;
    }

    const jwtPayload: JwtPayload = {
      sub: user.id!,
      email: user.email,
      phone: user.phone,
      role: user.role,
      name: user.name,
    };
    const token = this.tokenService.sign(jwtPayload);

    const {password, ...safe} = user.toJSON() as any;
    return {token, user: safe};
  }
}
