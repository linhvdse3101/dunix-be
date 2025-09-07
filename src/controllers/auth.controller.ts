import {inject} from '@loopback/core';
import {authenticate} from '@loopback/authentication';
import {get, post, requestBody, response, getModelSchemaRef} from '@loopback/rest';
import {SecurityBindings, UserProfile} from '@loopback/security';
import {UserService} from '../services/user.service';
import { BaseResponse } from '../dto/base-response.model';
import { LoginDto } from '../dto/login.dto';

export class AuthController {
  constructor(@inject('services.UserService') private userService: UserService) {}

  @post('/auth/login')
  @response(200, {
    description: 'Login success',
    content: {'application/json': {schema: getModelSchemaRef(BaseResponse)}},
  })
  async login(
    @requestBody({
      required: true,
      content: {'application/json': {schema: getModelSchemaRef(LoginDto)}},
    })
    body: LoginDto,
  ) {
    const result = await this.userService.login(body);
    return new BaseResponse({success: true, message: 'Đăng nhập thành công', data: result});
  }

  @authenticate('jwt')
  @get('/auth/profile')
  @response(200, {
    description: 'Current profile',
    content: {'application/json': {schema: getModelSchemaRef(BaseResponse)}},
  })
  async profile(@inject(SecurityBindings.USER) user: UserProfile) {
    return new BaseResponse({success: true, data: user});
  }
}
