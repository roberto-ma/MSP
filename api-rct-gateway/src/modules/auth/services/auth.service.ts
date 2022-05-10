import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AuthDto, refreshTokenDto } from '../dto/auth.dto';
import { lastValueFrom, map } from 'rxjs';
import * as qs from 'qs';
import { manageErrors } from '../../../helper/manageErrors';
import { ConstantesConfig } from '../../../config/constantes.config';

@Injectable()
export class AuthService {
  constructor(private httpService: HttpService) {}

  async authenticateUser(authDto: AuthDto) {
    const requestUrl =
      process.env.KC_AUTHSERVERURL + process.env.KC_ENDPOINT_TOKEN;

    const data = qs.stringify({
      username: authDto.usuario,
      password: authDto.contraseña,
      client_id: process.env.KC_CLIENTID,
      client_secret: process.env.KC_SECRET,
      grant_type: 'password',
    });

    const responseData = await lastValueFrom(
      this.httpService
        .post(requestUrl, data, {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        })
        .pipe(map((resp) => resp.data)),
    ).catch((err) =>
      manageErrors(ConstantesConfig.API_GATEWAY, {
        error: {
          statusCode: err?.response?.status,
          message: err.response?.data?.error_description,
        },
      }),
    );
    return responseData;
  }

  async refreshToken(refreshTokenDto: refreshTokenDto) {
    const requestUrl =
      process.env.KC_AUTHSERVERURL + process.env.KC_ENDPOINT_TOKEN;

    const data = qs.stringify({
      refresh_token: refreshTokenDto.refresh_token,
      client_id: process.env.KC_CLIENTID,
      client_secret: process.env.KC_SECRET,
      grant_type: 'refresh_token',
    });

    const responseData = await lastValueFrom(
      this.httpService
        .post(requestUrl, data, {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        })
        .pipe(map((resp) => resp.data)),
    ).catch((err) =>
      manageErrors(ConstantesConfig.API_GATEWAY, {
        error: {
          statusCode: err?.response?.status,
          message: err.response?.data?.error_description,
        },
      }),
    );
    return responseData;
  }
}
