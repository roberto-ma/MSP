import { Injectable, Inject } from '@nestjs/common';
import { ConstantesConfig } from '../../../config/constantes.config';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { manageErrors } from '../../../helper/manageErrors';

@Injectable()
export class ProductoService {
  private readonly msProducto: string;

  constructor(
    @Inject(ConstantesConfig.MS_CATALOGO)
    private readonly clienteMSProducto: ClientProxy,
  ) {
    this.msProducto = ConstantesConfig.MS_CATALOGO;
  }

  async getProductoPorId(id: number) {
    const pattern = {
      role: this.msProducto,
      cmd: this.getProductoPorId.name,
    };
    const payload = id;
    const producto = await firstValueFrom(
      this.clienteMSProducto.send(pattern, payload),
    ).catch((err) => manageErrors(this.msProducto, err));

    return producto;
  }
}
