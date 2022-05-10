import { Controller, Get, Post, Body } from '@nestjs/common';
import { Patch, Param, Version } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Scopes, Unprotected } from 'nest-keycloak-connect';
import { plainToClass } from 'class-transformer';
import { RespuestaKeycloak } from '../../../interfaces/respuesta-keycloak.interface';
import { CurrentUser } from '../../../decorators/current-user.decorator';
import { InstitucionService } from '../services/institucion.service';
import { ReadInstitucionDto } from '../dto/institucion.dto';

@ApiTags('Institucion')
@Controller('institucion')
export class InstitucionController {
  // constructor(private readonly institucionService: InstitucionService) { }
  // @Version('1')
  // ////@ApiBearerAuth()
  // @Unprotected()
  // @Get('id/:id')
  // async getInstitucionPorId(@Param('id') id: number) {
  //   const Institucion = await this.institucionService.getInstitucionPorId(+id);
  //   return plainToClass(ReadInstitucionDto, Institucion);
  // }
}
