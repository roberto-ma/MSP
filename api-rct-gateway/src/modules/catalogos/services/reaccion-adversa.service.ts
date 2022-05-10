import { Injectable, Inject } from '@nestjs/common';
import { ConstantesConfig } from '../../../config/constantes.config';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { manageErrors } from '../../../helper/manageErrors';

@Injectable()
export class ReaccionAdversaService {
  private readonly msReaccionAdversa: string;

  constructor(
    @Inject(ConstantesConfig.MS_CATALOGO)
    private readonly clienteMSReaccionAdversa: ClientProxy,
  ) {
    this.msReaccionAdversa = ConstantesConfig.MS_CATALOGO;
  }

  async getReaccionAdversaPorId(id: number) {
    const pattern = {
      role: this.msReaccionAdversa,
      cmd: this.getReaccionAdversaPorId.name,
    };
    const payload = id;
    const reaccionAdversa = await firstValueFrom(
      this.clienteMSReaccionAdversa.send(pattern, payload),
    ).catch((err) => manageErrors(this.msReaccionAdversa, err));

    return reaccionAdversa;
  }
}
