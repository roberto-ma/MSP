import { Injectable, Inject } from '@nestjs/common';
import { ConstantesConfig } from '../../../config/constantes.config';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { manageErrors } from '../../../helper/manageErrors';

@Injectable()
export class RolProfesionalService {
  private readonly msRolProfesional: string;

  constructor(
    @Inject(ConstantesConfig.MS_CATALOGO)
    private readonly clienteMSRolProfesional: ClientProxy,
  ) {
    this.msRolProfesional = ConstantesConfig.MS_CATALOGO;
  }

  async getRolProfesionalPorId(id: number) {
    const pattern = {
      role: this.msRolProfesional,
      cmd: this.getRolProfesionalPorId.name,
    };
    const payload = id;
    const rolProfesional = await firstValueFrom(
      this.clienteMSRolProfesional.send(pattern, payload),
    ).catch((err) => manageErrors(this.msRolProfesional, err));

    return rolProfesional;
  }

  async getRolProfesionalTodos() {
    const pattern = {
      role: this.msRolProfesional,
      cmd: this.getRolProfesionalTodos.name,
    };
    const payload = {};
    const rolProfesional = await firstValueFrom(
      this.clienteMSRolProfesional.send(pattern, payload),
    ).catch((err) => manageErrors(this.msRolProfesional, err));
    return rolProfesional;
  }
}
