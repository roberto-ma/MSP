import { Controller, Get, Post, Body } from '@nestjs/common';
import { Patch, Param, Version } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Scopes, Unprotected } from 'nest-keycloak-connect';
import { plainToClass } from 'class-transformer';
import { RespuestaKeycloak } from '../../../interfaces/respuesta-keycloak.interface';
import { CurrentUser } from '../../../decorators/current-user.decorator';
import { PresentacionService } from '../services/presentacion.service';
import { ReadPresentacionDto } from '../dto/presentacion.dto';

@ApiTags('Presentacion')
@Controller('presentacion')
export class PresentacionController {
  // constructor(private readonly PresentacionService: PresentacionService) { }
  // @Version('1')
  // ////@ApiBearerAuth()
  // @Unprotected()
  // @Get('id/:id')
  // async getPresentacionPorId(@Param('id') id: number) {
  //   const presentacion = await this.PresentacionService.getPresentacionPorId(+id);
  //   return plainToClass(ReadPresentacionDto, presentacion);
  // }
}
