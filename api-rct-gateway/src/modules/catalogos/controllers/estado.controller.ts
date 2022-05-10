import { Controller, Get, Post, Body } from '@nestjs/common';
import { Patch, Param, Version } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Scopes, Unprotected } from 'nest-keycloak-connect';
import { plainToClass } from 'class-transformer';
import { RespuestaKeycloak } from '../../../interfaces/respuesta-keycloak.interface';
import { CurrentUser } from '../../../decorators/current-user.decorator';
import { EstadoService } from '../services/estado.service';
import { ReadEstadoDto } from '../dto/estado.dto';

@ApiTags('Estado')
@Controller('estado')
export class EstadoController {
  constructor(private readonly estadoService: EstadoService) {}

  // @Version('1')
  // ////@ApiBearerAuth()
  // @Unprotected()
  // @Get('id/:id')
  // async getEstadoPorId(@Param('id') id: number) {
  //   const estado = await this.estadoService.getEstadoPorId(+id);
  //   return plainToClass(ReadEstadoDto, estado);
  // }

  // @Version('1')
  // ////@ApiBearerAuth()
  // @Unprotected()
  // @Get('all')
  // async getEstadoTodos() {
  //   const estado = await this.estadoService.getEstadoTodos();
  //   return plainToClass(ReadEstadoDto, estado);
  // }
}
