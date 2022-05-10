/**
 * @ Author: Anthony Loyaga
 * @ Create Time: 2021-12-22 09:32:53
 * @ Modified by: Gustavo Panchi
 * @ Modified time: 2022-04-29 09:36:58
 */

import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SoapService } from './soap.service';

@Injectable()
export class RegistroCivilSoapService {
  constructor(
    private readonly soapService: SoapService,
    private config: ConfigService,
  ) {}

  async soapBusquedaPorNui(cedula: string) {
    try {
      const url = this.config.get<string>('WSRC_URL');
      const soapHeader = {
        usr: this.config.get<string>('WSRC_USER'),
        pass: this.config.get<string>('WSRC_PASS'),
      };
      const args = { NUI: cedula };
      const clientRC = await this.soapService.createSoapClient(url, soapHeader);
      const personaPorNUI = await clientRC.BusquedaPorNuiAsync(args, {
        timeout: this.config.get<number>('WSRC_TIMEOUT'),
      });
      return personaPorNUI[0]['return'];
    } catch (error) {
      const errorCode = 'WSDL Registro Civil ';
      throw new InternalServerErrorException(
        error.code ? errorCode + error.code : errorCode,
        error.message ? error.message : 'timeout exceeded',
      );
    }
  }
}
