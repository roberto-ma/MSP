import { Controller, Get, Post, Body } from '@nestjs/common';
import { Patch, Param, Version } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Scopes, Unprotected } from 'nest-keycloak-connect';
import { plainToClass } from 'class-transformer';
import { RespuestaKeycloak } from '../../../interfaces/respuesta-keycloak.interface';
import { CurrentUser } from '../../../decorators/current-user.decorator';
import { RolProfesionalService } from '../services/rol-profesional.service';
import { ReadRolProfesionalDto } from '../dto/rol-profesional.dto';

@ApiTags('RolProfesional')
@Controller('rol-profesional')
export class RolProfesionalController {
  constructor(private readonly rolProfesionalService: RolProfesionalService) {}

  // @Version('1')
  // ////@ApiBearerAuth()
  // @Unprotected()
  // @Get('id/:id')
  // async getRolProfesionalPorId(@Param('id') id: number) {
  //   const rolProfesional = await this.rolProfesionalService.getRolProfesionalPorId(+id);
  //   return plainToClass(ReadRolProfesionalDto, rolProfesional);
  // }

  // @Version('1')
  // ////@ApiBearerAuth()
  // @Unprotected()
  // @Get('all')
  // async getRolProfesionalTodos() {
  //   const rolProfesional = await this.rolProfesionalService.getRolProfesionalTodos();
  //   return plainToClass(ReadRolProfesionalDto, rolProfesional);
  // }
}
