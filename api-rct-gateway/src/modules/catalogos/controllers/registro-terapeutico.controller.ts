import { Controller, Get, Post, Body } from '@nestjs/common';
import { Patch, Param, Version } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Scopes, Unprotected } from 'nest-keycloak-connect';
import { plainToClass } from 'class-transformer';
import { RespuestaKeycloak } from '../../../interfaces/respuesta-keycloak.interface';
import { CurrentUser } from '../../../decorators/current-user.decorator';
import { RegistroTerapeuticoService } from '../services/registro-terapeutico.service';
import { ReadRegistroTerapeuticoDto } from '../dto/registro-terapeutico.dto';

@ApiTags('RegistroTerapeutico')
@Controller('registro-terapeutico')
export class RegistroTerapeuticoController {
  constructor(
    private readonly registroTerapeuticoService: RegistroTerapeuticoService,
  ) {}

  // @Version('1')
  // ////@ApiBearerAuth()
  // @Unprotected()
  // @Get('id/:id')
  // async getRegistroTerapeuticoPorId(@Param('id') id: number) {
  //   const registroTerapeutico = await this.registroTerapeuticoService.getRegistroTerapeuticoPorId(+id);
  //   return plainToClass(ReadRegistroTerapeuticoDto, registroTerapeutico);
  // }
}
