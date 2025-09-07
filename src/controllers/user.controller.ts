import {getModelSchemaRef, post, requestBody, response} from '@loopback/rest';
import {inject} from '@loopback/core';
import {UserService} from '../services/user.service';
import {User} from '../models';
import { CreateUserDto } from '../dto/create-user.dto';

export class UserController {
  constructor(
    @inject('services.UserService') private userService: UserService,
  ) {}

  @post('/auth/register')
  @response(201, {
    description: 'User created',
    // content: {
    //   'application/json': {
    //     schema: getModelSchemaRef(User, {exclude: ['password']}),
    //   },
    // },
  })
  async create(
    @requestBody({
      required: true,
      content: {
        'application/json': {
          schema: getModelSchemaRef(CreateUserDto, {title: 'CreateUserDto'}),
        },
      },
    })
    body: CreateUserDto,
  ) {
    return this.userService.createUser(body);
  }
}
