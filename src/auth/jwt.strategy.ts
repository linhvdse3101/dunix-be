import {AuthenticationStrategy} from '@loopback/authentication';
import {injectable} from '@loopback/core';
import {Request} from '@loopback/rest';
import {securityId, UserProfile} from '@loopback/security';
import {TokenService, JwtPayload} from '../services/token.service';

@injectable()
export class JwtStrategy implements AuthenticationStrategy {
  name = 'jwt';

  constructor(private tokenService: TokenService = new TokenService()) {}

  async authenticate(request: Request): Promise<UserProfile | undefined> {
    const header = request.headers.authorization;
    if (!header || !header.startsWith('Bearer ')) return undefined;

    const token = header.substring(7);
    const payload = this.tokenService.verify<JwtPayload>(token);

    const userProfile: UserProfile = {
      [securityId]: payload.sub,
      id: payload.sub,
      name: payload.name,
      email: payload.email,
      role: payload.role,
    } as any;

    return userProfile;
  }
}
