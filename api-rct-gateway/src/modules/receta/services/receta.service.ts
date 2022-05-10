import { Injectable, Inject } from '@nestjs/common';
import { UpdateAnulacionRecetaDto } from '../dto/receta.dto';
import { ConstantesConfig } from '../../../config/constantes.config';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { manageErrors } from '../../../helper/manageErrors';
import { ValidateRecetaDto } from '../dto/receta-validacion.dto';
import { FuenteDatosService } from '../../catalogos/services/fuente-datos.service';

@Injectable()
export class RecetaService {
  private readonly msRctPaciente = ConstantesConfig.MS_RCT_PACIENTE;
  constructor(
    @Inject(ConstantesConfig.MS_RCT_PACIENTE)
    private readonly clienteMSPaciente: ClientProxy,
    private readonly fuenteDatosService: FuenteDatosService,
  ) {}

  async createReceta(createRecetaDto) {
    const pattern = { role: this.msRctPaciente, cmd: this.createReceta.name };
    const payload = createRecetaDto;
    const receta = await firstValueFrom(
      this.clienteMSPaciente.send(pattern, payload),
    ).catch((err) => manageErrors(this.msRctPaciente, err));
    return receta;
  }

  // async getRecetas() {
  //   const pattern = { role: this.msRctPaciente, cmd: this.getRecetas.name };
  //   const payload = 1;
  //   const recetas = await firstValueFrom(
  //     this.clienteMSPaciente.send(pattern, payload),
  //   ).catch((err) => manageErrors(this.msRctPaciente, err));
  //   return recetas;
  // }

  async getRecetaPorId(id: number) {
    const pattern = { role: this.msRctPaciente, cmd: this.getRecetaPorId.name };
    const payload = id;
    const receta = await firstValueFrom(
      this.clienteMSPaciente.send(pattern, payload),
    ).catch((err) => manageErrors(this.msRctPaciente, err));
    return receta;
  }

  async getRecetaPorOid(oid: string) {
    const pattern = {
      role: this.msRctPaciente,
      cmd: this.getRecetaPorOid.name,
    };
    const payload = oid;
    const receta = await firstValueFrom(
      this.clienteMSPaciente.send(pattern, payload),
    ).catch((err) => manageErrors(this.msRctPaciente, err));
    // const fuenteDatos = await this.fuenteDatosService.getFuenteDatosPorId(
    //   receta.fuente_datos_id,
    // );
    // receta.llaveCriptografia = fuenteDatos.llaveCriptografia;
    return receta;
  }

  async validatePreciosReceta(validateRecetaDto: ValidateRecetaDto) {
    const pattern = {
      role: this.msRctPaciente,
      cmd: this.validatePreciosReceta.name,
    };
    const payload = validateRecetaDto;
    const receta = await firstValueFrom(
      this.clienteMSPaciente.send(pattern, payload),
    ).catch((err) => manageErrors(this.msRctPaciente, err));
    return receta;
  }

  async updateAnulacionReceta(
    updateAnulacionRecetaDto: UpdateAnulacionRecetaDto,
  ) {
    const pattern = {
      role: this.msRctPaciente,
      cmd: this.updateAnulacionReceta.name,
    };
    const payload = updateAnulacionRecetaDto;
    const receta = await firstValueFrom(
      this.clienteMSPaciente.send(pattern, payload),
    ).catch((err) => manageErrors(this.msRctPaciente, err));
    return receta;
  }

  async getRecetaPorOidParaConciliacion(oid: string) {
    const pattern = {
      role: this.msRctPaciente,
      cmd: this.getRecetaPorOidParaConciliacion.name,
    };
    const payload = oid;
    const receta = await firstValueFrom(
      this.clienteMSPaciente.send(pattern, payload),
    ).catch(() => {
      return null;
    });
    return receta;
  }
}
