/**
 * @ Author: Anthony Loyaga
 * @ Create Time: 2021-12-22 09:32:53
 * @ Modified by: Anthony Loyaga
 * @ Modified time: 2021-12-23 12:20:02
 */

import { Injectable } from '@nestjs/common';
import { Client, createClientAsync } from 'soap';

@Injectable()
export class SoapService {
  async createSoapClient(
    url: string,
    soapHeader: { usr: string; pass: string },
  ): Promise<Client> {
    const client = await createClientAsync(url);
    client.addSoapHeader(soapHeader);
    return client;
  }
}
