import { Controller, Get, Post, Body } from '@nestjs/common';
import { Patch, Param, Version } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Scopes, Unprotected } from 'nest-keycloak-connect';
import { plainToClass } from 'class-transformer';
import { RespuestaKeycloak } from '../../../interfaces/respuesta-keycloak.interface';
import { CurrentUser } from '../../../decorators/current-user.decorator';
import { DosisMedidaService } from '../services/dosis-medida.service';
import { ReadDosisMedidaDto } from '../dto/dosis-medida.dto';

@ApiTags('DosisMedida')
@Controller('dosis-medida')
export class DosisMedidaController {
  constructor(private readonly DosisMedidaService: DosisMedidaService) {}

  // @Version('1')
  // ////@ApiBearerAuth()
  // @Unprotected()
  // @Get('id/:id')
  // async getDosisMedidaPorId(@Param('id') id: number) {
  //   const DosisMedida = await this.DosisMedidaService.getDosisMedidaPorId(+id);
  //   return plainToClass(ReadDosisMedidaDto, DosisMedida);
  // }

  // @Version('1')
  // ////@ApiBearerAuth()
  // @Unprotected()
  // @Get('all')
  // async getDosisMedidaTodos() {
  //   const DosisMedida = await this.DosisMedidaService.getDosisMedidaTodos();
  //   return plainToClass(ReadDosisMedidaDto, DosisMedida);
  // }
}
