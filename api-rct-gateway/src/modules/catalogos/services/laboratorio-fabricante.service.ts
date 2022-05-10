import { Injectable, Inject } from '@nestjs/common';
import { ConstantesConfig } from '../../../config/constantes.config';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { manageErrors } from '../../../helper/manageErrors';

@Injectable()
export class LaboratorioFabricanteService {
  private readonly msLaboratorioFabricante: string;

  constructor(
    @Inject(ConstantesConfig.MS_CATALOGO)
    private readonly clienteMSLaboratorioFabricante: ClientProxy,
  ) {
    this.msLaboratorioFabricante = ConstantesConfig.MS_CATALOGO;
  }

  async getLaboratorioFabricantePorId(id: number) {
    const pattern = {
      role: this.msLaboratorioFabricante,
      cmd: this.getLaboratorioFabricantePorId.name,
    };
    const payload = id;
    const LaboratorioFabricante = await firstValueFrom(
      this.clienteMSLaboratorioFabricante.send(pattern, payload),
    ).catch((err) => manageErrors(this.msLaboratorioFabricante, err));

    return LaboratorioFabricante;
  }
}
