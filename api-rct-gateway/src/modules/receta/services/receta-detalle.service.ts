import { Injectable, Inject } from '@nestjs/common';
import { ConstantesConfig } from '../../../config/constantes.config';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class RecetaDetalleService {
  private readonly msRecetaDetalle: string;
  constructor(
    @Inject(ConstantesConfig.MS_RCT_PACIENTE)
    private readonly clienteMSPaciente: ClientProxy,
  ) {
    this.msRecetaDetalle = ConstantesConfig.MS_RCT_PACIENTE;
  }

  // async createRecetaDetalle(createRecetaDetalleDto: CreateRecetaDetalleDto) {
  //   const pattern = {
  //     role: this.msRecetaDetalle,
  //     cmd: this.createRecetaDetalle.name,
  //   };
  //   const payload = createRecetaDetalleDto;
  //   const recetaDetalle = await firstValueFrom(
  //     this.clienteMSPaciente.send(pattern, payload),
  //   ).catch((err) => manageErrors(this.msRecetaDetalle, err));
  //   return recetaDetalle;
  // }

  // async getRecetaDetalles() {
  //   const pattern = {
  //     role: this.msRecetaDetalle,
  //     cmd: this.getRecetaDetalles.name,
  //   };
  //   const payload = 1;
  //   const recetaDetalles = await firstValueFrom(
  //     this.clienteMSPaciente.send(pattern, payload),
  //   ).catch((err) => manageErrors(this.msRecetaDetalle, err));
  //   return recetaDetalles;
  // }

  // async getRecetaDetallePorId(id: number) {
  //   const pattern = {
  //     role: this.msRecetaDetalle,
  //     cmd: this.getRecetaDetallePorId.name,
  //   };
  //   const payload = id;
  //   const recetaDetalle = await firstValueFrom(
  //     this.clienteMSPaciente.send(pattern, payload),
  //   ).catch((err) => manageErrors(this.msRecetaDetalle, err));

  //   return recetaDetalle;
  // }

  // async updateRecetaDetalle(updatePersonaDto: UpdateRecetaDetalleDto) {
  //   const pattern = {
  //     role: this.msRecetaDetalle,
  //     cmd: this.updateRecetaDetalle.name,
  //   };
  //   const payload = updatePersonaDto;
  //   const recetaDetalle = await firstValueFrom(
  //     this.clienteMSPaciente.send(pattern, payload),
  //   ).catch((err) => manageErrors(this.msRecetaDetalle, err));
  //   return recetaDetalle;
  // }
}
