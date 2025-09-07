import {inject} from '@loopback/core';
import {post, requestBody, response, getModelSchemaRef} from '@loopback/rest';
import {OtpService} from '../services/otp.service';
import { BaseResponse } from '../dto/base-response.model';
import { RequestOtpDto, VerifyOtpDto } from '../dto/otp.dto';

export class OtpController {
  constructor(@inject('services.OtpService') private otpService: OtpService) {}

  @post('/auth/otp/request')
  @response(200, {'application/json': {schema: getModelSchemaRef(BaseResponse)}})
  async request(
    @requestBody({'application/json': {schema: getModelSchemaRef(RequestOtpDto)}}) body: RequestOtpDto,
  ) {
    const {phone, purpose, channel='sms'} = body;
    const data = await this.otpService.requestOtp(phone, purpose, "sms");
    return new BaseResponse({success: true, message: 'Đã gửi OTP', data});
  }

  @post('/auth/otp/verify')
  @response(200, {'application/json': {schema: getModelSchemaRef(BaseResponse)}})
  async verify(
    @requestBody({'application/json': {schema: getModelSchemaRef(VerifyOtpDto)}}) body: VerifyOtpDto,
  ) {
    const data = await this.otpService.verifyOtp(body.phone, body.code, 'login');
    return new BaseResponse({success: true, message: 'Xác thực thành công', data});
  }
}
