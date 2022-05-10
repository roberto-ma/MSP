import { Controller, Get, Post, Body } from '@nestjs/common';
import { Patch, Param, Version } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Scopes, Unprotected } from 'nest-keycloak-connect';
import { plainToClass } from 'class-transformer';
import { RespuestaKeycloak } from '../../../interfaces/respuesta-keycloak.interface';
import { CurrentUser } from '../../../decorators/current-user.decorator';
import { ReligionService } from '../services/religion.service';
import { ReadReligionDto } from '../dto/religion.dto';

@ApiTags('Religion')
@Controller('religion')
export class ReligionController {
  constructor(private readonly religionService: ReligionService) {}

  // @Version('1')
  // ////@ApiBearerAuth()
  // @Unprotected()
  // @Get('id/:id')
  // async getReligionPorId(@Param('id') id: number) {
  //   const Religion = await this.religionService.getReligionPorId(+id);
  //   return plainToClass(ReadReligionDto, Religion);
  // }

  // @Version('1')
  // ////@ApiBearerAuth()
  // @Unprotected()
  // @Get('codigoPras/:codigoPras')
  // async getReligionPorCodigoPras(@Param('codigoPras') codigoPras: string) {
  //   const religion = await this.religionService.getReligionPorCodigoPras(codigoPras);
  //   return plainToClass(ReadReligionDto, religion);
  // }

  // @Version('1')
  // ////@ApiBearerAuth()
  // @Unprotected()
  // @Get('all')
  // async getReligionTodos() {
  //   const religion = await this.religionService.getReligionTodos();
  //   return plainToClass(ReadReligionDto, religion);
  // }
}
