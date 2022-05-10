import { Controller, Get, Post, Body } from '@nestjs/common';
import { Patch, Param, Version } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Scopes, Unprotected } from 'nest-keycloak-connect';
import { plainToClass } from 'class-transformer';
import { RespuestaKeycloak } from '../../../interfaces/respuesta-keycloak.interface';
import { CurrentUser } from '../../../decorators/current-user.decorator';

import { RecetaImpPacienteService } from '../service/recetaImpPaciente.service';
import { RecetaImpPacienteDTo } from '../dto/recetaImpPaciente.dto';

@ApiTags('Receta Impresión Paciente')
@Controller('receta')
export class RecetaImpPacienteController {
  constructor(private readonly recetaImpPaciente: RecetaImpPacienteService) {}
  @Version('1')
  ////@ApiBearerAuth()
  @Unprotected()
  @Get('NReceta/:NReceta')
  async getRecetaPorN(@Param('NReceta') Id: number) {
    const recetaRImp = await this.recetaImpPaciente.getRecetaPorN(Id);
    return plainToClass(RecetaImpPacienteDTo, recetaRImp, {
      excludeExtraneousValues: true,
    });
    //return recetaRImp;
  }
}
