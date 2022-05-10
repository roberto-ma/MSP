import { Controller, Get, Post, Body } from '@nestjs/common';
import { Patch, Param, Version } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Scopes, Unprotected } from 'nest-keycloak-connect';
import { plainToClass } from 'class-transformer';
import { RespuestaKeycloak } from '../../../interfaces/respuesta-keycloak.interface';
import { CurrentUser } from '../../../decorators/current-user.decorator';
import { TarifarioService } from '../services/tarifario.service';
import { ReadTarifarioDto } from '../dto/tarifario.dto';

@ApiTags('Tarifario')
@Controller('tarifario')
export class TarifarioController {
  // constructor(private readonly tarifarioService: TarifarioService) { }
  // @Version('1')
  // ////@ApiBearerAuth()
  // @Unprotected()
  // @Get('productoId/:productoId')
  // async getTarifarioPorId(@Param('productoId') productoId: number) {
  //   const Tarifario = await this.tarifarioService.getTarifarioPorProductId(+productoId);
  //   return plainToClass(ReadTarifarioDto, Tarifario);
  // }
}
