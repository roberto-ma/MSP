import { Injectable, Inject } from '@nestjs/common';
import { ConstantesConfig } from '../../../config/constantes.config';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { manageErrors } from '../../../helper/manageErrors';
import { CreateConciliacionMspDto } from '../dto/conciliacion-msp.dto';

@Injectable()
export class ConciliacionMspService {
  private readonly msRctConciliacion = ConstantesConfig.MS_RCT_CONCILIACION;
  constructor(
    @Inject(ConstantesConfig.MS_RCT_CONCILIACION)
    private readonly clienteMSConciliacion: ClientProxy,
  ) {}

  async createConciliacion(
    createConciliacionMspDto: CreateConciliacionMspDto[],
  ) {
    const pattern = {
      role: this.msRctConciliacion,
      cmd: this.createConciliacion.name,
    };
    const payload = createConciliacionMspDto;
    const conciliacion = await firstValueFrom(
      this.clienteMSConciliacion.send(pattern, payload),
    ).catch((err) => manageErrors(this.msRctConciliacion, err));
    return conciliacion;
  }
}
