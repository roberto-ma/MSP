import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RecetaService } from '../services/receta.service';
import { UpdateAnulacionRecetaDto, CreateRecetaDto } from '../dto/receta.dto';
import { ConstantesConfig } from '../../../config/constantes-config';
import { plainToClass } from 'class-transformer';
import { ValidateRecetaDto } from '../dto/receta-validacion.dto';

@Controller()
export class RecetaController {
  constructor(private readonly recetaService: RecetaService) {}

  @MessagePattern({
    role: ConstantesConfig.MS_RCT_PACIENTE,
    cmd: 'createReceta',
  })
  createReceta(@Payload() createRecetaDto: CreateRecetaDto) {
    return this.recetaService.createReceta(createRecetaDto);
  }

  // @MessagePattern({ role: ConstantesConfig.MS_RCT_PACIENTE, cmd: 'getRecetas' })
  // getRecetas() {
  //   return this.recetaService.getRecetas();
  // }

  @MessagePattern({
    role: ConstantesConfig.MS_RCT_PACIENTE,
    cmd: 'getRecetaPorId',
  })
  getRecetaPorId(@Payload() id: number) {
    return this.recetaService.getRecetaPorId(id);
  }

  @MessagePattern({
    role: ConstantesConfig.MS_RCT_PACIENTE,
    cmd: 'getRecetaPorOid',
  })
  getRecetaPorOid(@Payload() oid: string) {
    return this.recetaService.getRecetaPorOidConVerificacionEstado(oid);
  }

  @MessagePattern({
    role: ConstantesConfig.MS_RCT_PACIENTE,
    cmd: 'getRecetaPorOidParaConciliacion',
  })
  getRecetaPorOidParaConciliacion(@Payload() oid: string) {
    return this.recetaService.getRecetaPorOid(oid);
  }

  @MessagePattern({
    role: ConstantesConfig.MS_RCT_PACIENTE,
    cmd: 'validatePreciosReceta',
  })
  validatePreciosReceta(@Payload() validateRecetaDto: ValidateRecetaDto) {
    const recetaValidar = plainToClass(ValidateRecetaDto, validateRecetaDto);
    return this.recetaService.validatePreciosReceta(recetaValidar);
  }

  @MessagePattern({
    role: ConstantesConfig.MS_RCT_PACIENTE,
    cmd: 'updateAnulacionReceta',
  })
  updateAnulacionReceta(
    @Payload() updateAnulacionRecetaDto: UpdateAnulacionRecetaDto,
  ) {
    return this.recetaService.updateAnulacionReceta(updateAnulacionRecetaDto);
  }
}
