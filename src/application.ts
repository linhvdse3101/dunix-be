import {AuthenticationComponent, registerAuthenticationStrategy} from '@loopback/authentication';
import {MySequence} from './sequence';
import {JwtStrategy} from './auth/jwt.strategy';
import {UserService} from './services/user.service';
import {TokenService} from './services/token.service';
import { BootMixin } from '@loopback/boot';
import { ApplicationConfig } from '@loopback/core';
import { RepositoryMixin } from '@loopback/repository';
import { RestApplication } from '@loopback/rest';
import { ServiceMixin } from '@loopback/service-proxy';
import { OtpService } from './services/otp.service';
import { S3Service } from 'services/s3.service';

export class DunixBeApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super({
      ...options,
      rest: {
        host: '0.0.0.0',
        port: +(process.env.PORT ?? 3000),
        cors: {
          origin: '*',
          methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
          allowedHeaders: '*',
          exposedHeaders: '*',
          credentials: true,
          maxAge: 86400,
        },
      },
    });
    this.sequence(MySequence);

    // Auth
    this.component(AuthenticationComponent);
    registerAuthenticationStrategy(this, JwtStrategy);

    // Binds
    this.bind('services.UserService').toClass(UserService);
    this.bind('services.TokenService').toClass(TokenService);
    this.bind('services.OtpService').toClass(OtpService);
    // this.bind('services.S3Service').toClass(S3Service);

    this.projectRoot = __dirname;
    this.bootOptions = {
      controllers: {
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };
  }
}
