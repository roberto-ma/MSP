import { Controller, Get, Post, Body } from '@nestjs/common';
import { Patch, Param, Version } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Scopes, Unprotected } from 'nest-keycloak-connect';
import { plainToClass } from 'class-transformer';
import { RespuestaKeycloak } from '../../../interfaces/respuesta-keycloak.interface';
import { CurrentUser } from '../../../decorators/current-user.decorator';
import { RecetaImpFarmaciaService } from '../../recetaFarmacia/services/recetaImpFarmacia.service';
import { RecetaImpFarmaciaDTo } from '../../recetaFarmacia/dto/recetaImpFarmacia.dto';

@ApiTags('Receta Impresion Farmacia')
@Controller('recetaFarmacia')
export class RecetaImpFarmaciaController {
  constructor(private readonly recetaImpPaciente: RecetaImpFarmaciaService) {}
  @Version('1')
  ////@ApiBearerAuth()
  @Unprotected()
  @Get('NReceta/:NReceta')
  async getRecetaPorN(@Param('NReceta') Id: number) {
    const recetaRImp = await this.recetaImpPaciente.getRecetaPorN(Id);
    return plainToClass(RecetaImpFarmaciaDTo, recetaRImp, {
      excludeExtraneousValues: true,
    });
    //return recetaRImp;
  }
}
