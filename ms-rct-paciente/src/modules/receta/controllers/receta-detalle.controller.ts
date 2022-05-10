import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RecetaDetalleService } from '../services/receta-detalle.service';
import { CreateRecetaDetalleDto } from '../dto/receta-detalle.dto';
import { UpdateRecetaDetalleDto } from '../dto/receta-detalle.dto';
import { ConstantesConfig } from '../../../config/constantes-config';

@Controller()
export class RecetaDetalleController {
  constructor(private readonly recetaDetalleService: RecetaDetalleService) {}

  // @MessagePattern({
  //   role: ConstantesConfig.MS_RCT_PACIENTE,
  //   cmd: 'createRecetaDetalle',
  // })
  // createRecetaDetalle(
  //   @Payload() createRecetaDetalleDto: CreateRecetaDetalleDto,
  // ) {
  //   return this.recetaDetalleService.createRecetaDetalle(
  //     createRecetaDetalleDto,
  //   );
  // }

  // @MessagePattern({
  //   role: ConstantesConfig.MS_RCT_PACIENTE,
  //   cmd: 'getRecetaDetalles',
  // })
  // getRecetaDetalles() {
  //   return this.recetaDetalleService.getRecetaDetalles();
  // }

  // @MessagePattern({
  //   role: ConstantesConfig.MS_RCT_PACIENTE,
  //   cmd: 'getRecetaDetallePorId',
  // })
  // getRecetaDetallePorId(@Payload() id: number) {
  //   return this.recetaDetalleService.getRecetaDetallePorId(id);
  // }

  // @MessagePattern({
  //   role: ConstantesConfig.MS_RCT_PACIENTE,
  //   cmd: 'updateRecetaDetalle',
  // })
  // updateRecetaDetalle(
  //   @Payload() updateRecetaDetalleDto: UpdateRecetaDetalleDto,
  // ) {
  //   return this.recetaDetalleService.updateRecetaDetalle(
  //     updateRecetaDetalleDto.id,
  //     updateRecetaDetalleDto,
  //   );
  // }
}
