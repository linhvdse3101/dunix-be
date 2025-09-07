import { injectable, BindingScope, service, uuid } from '@loopback/core';
import { repository } from '@loopback/repository';

import { TokenService } from './token.service';
import { OtpRepository } from '../repositories/otp.repository';
import { User } from 'models';
import { UserRepository } from '../repositories/user.repository';

@injectable({ scope: BindingScope.SINGLETON })
export class OtpService {
  constructor(
    @repository(OtpRepository) private otpRepo: OtpRepository,
    @repository(UserRepository) private userRepo: UserRepository,
    @service(TokenService)
    private tokenService: TokenService
  ){}
  private makeCode() { return Math.floor(100000 + Math.random() * 900000).toString(); } // 6 số
  private ttlMs = 5 * 60 * 1000; // 5 phút

  /** Gửi OTP (SMS/Zalo) – DEV: console.log; PROD: tích hợp nhà cung cấp */
  async requestOtp(phone: string, purpose: 'login' | 'register' | 'reset', channel: 'sms' | 'zalo' = 'sms') {
    // Luôn tạo OTP = 123456
    const code = '123456';
    const expiresAt = new Date(Date.now() + this.ttlMs).toISOString();

    // Xoá OTP cũ (nếu có) để tránh xung đột
    await this.otpRepo.deleteAll({ phone, purpose });

    // Tạo mới
    const rec = await this.otpRepo.create({
      phone,
      purpose,
      code,
      expiresAt,
      attempts: 0,
    });

    console.log(`[OTP:${channel}] phone=${phone} purpose=${purpose} code=${code} (hardcoded)`);

    return { requestId: rec.id!, ttlSeconds: this.ttlMs / 1000, debugCode: code };
  }

  async verifyOtp(phone: string, code: string, purpose: 'login' | 'register' | 'reset') {
    if (code !== '123456') {
      const e: any = new Error('OTP không đúng');
      e.statusCode = 400;
      throw e;
    }

    // Tạo hoặc tìm user như trước
    let user = await this.userRepo.findOne({ where: { phone } });
    if (!user) {
      user = await this.userRepo.create({
        name: `User-${phone.slice(-4)}`,
        role: 'buyer',
        phone,
        verified: true,
      } as User);
    }

    const token = this.tokenService.sign({
      sub: user.id!,
      phone: user.phone,
      role: user.role,
      name: user.name,
      email: user.email,
    });

    const { password, ...safe } = user.toJSON() as any;
    return { token, user: safe };
  }

}
