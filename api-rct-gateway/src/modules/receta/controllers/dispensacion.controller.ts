import { UseInterceptors, Get, Param } from '@nestjs/common';
import { Controller, Post, Body } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiBody } from '@nestjs/swagger';
import { Version } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Roles } from 'nest-keycloak-connect';

import { DispensacionService } from '../services/dispensacion.service';
import { ReadDispensacionConRecetaDto } from '../dto/dispensacion.dto';
import { CreateDispensacionDto } from '../dto/dispensacion.dto';
import { ReadDispensacionDto } from '../dto/dispensacion.dto';
import { Constantes } from '../../../config/constantes';
import { InputDto } from '../dto/encrypt.dto';
import { EncryptInterceptor } from '../../../interceptors/encrypt.interceptor';
import { DispensacionInterceptor } from '../../../interceptors/dispensacion.interceptor';

@ApiTags('Dispensacion')
@Controller('dispensacion')
export class DispensacionController {
  constructor(private readonly dispensacionService: DispensacionService) {}

  @Version(Constantes.API_V1)
  @ApiBearerAuth()
  @UseInterceptors(DispensacionInterceptor)
  @Roles({
    roles: [
      Constantes.KC_ROLE_ENTIDAD_SALUD,
      Constantes.KC_ROLE_CADENA_FARMACIA,
    ],
  })
  @Get(':oid')
  async getDispensacionPorOid(@Param('oid') oid: string) {
    const dispensacion =
      await this.dispensacionService.getDispensacionPorOidConReceta(oid);
    return plainToClass(ReadDispensacionConRecetaDto, dispensacion);
  }

  @Version(Constantes.API_V2)
  @UseInterceptors(EncryptInterceptor)
  @ApiBearerAuth()
  @Roles({
    roles: [
      Constantes.KC_ROLE_ENTIDAD_SALUD,
      Constantes.KC_ROLE_CADENA_FARMACIA,
    ],
  })
  @Get(':oid')
  async getDispensacionPorOidEncrypt(@Param('oid') oid: string) {
    const receta =
      await this.dispensacionService.getDispensacionPorOidConReceta(oid);
    return plainToClass(ReadDispensacionConRecetaDto, receta);
  }

  @Version(Constantes.API_V1)
  @ApiBearerAuth()
  @Roles({
    roles: [
      Constantes.KC_ROLE_ENTIDAD_SALUD,
      Constantes.KC_ROLE_CADENA_FARMACIA,
    ],
  })
  @Post()
  async createDispensacion(
    @Body() createDispensacionDto: CreateDispensacionDto,
  ) {
    const dispensacion = await this.dispensacionService.createDispensacion(
      createDispensacionDto,
    );
    const readDispensacionDto = plainToClass(ReadDispensacionDto, dispensacion);
    readDispensacionDto.mensaje_autorizacion = Constantes.DISPENSACION_CORRECTA;
    return readDispensacionDto;
  }

  @Version(Constantes.API_V2)
  @UseInterceptors(EncryptInterceptor)
  @ApiBearerAuth()
  @Roles({
    roles: [
      Constantes.KC_ROLE_ENTIDAD_SALUD,
      Constantes.KC_ROLE_CADENA_FARMACIA,
    ],
  })
  @ApiBody({
    type: InputDto,
    required: true,
    isArray: false,
  })
  @Post()
  async createDispensacionEncrypt(
    @Body() createDispensacionDto: CreateDispensacionDto,
  ) {
    const dispensacion = this.dispensacionService.createDispensacion(
      createDispensacionDto,
    );
    const readDispensacionDto = plainToClass(ReadDispensacionDto, dispensacion);
    readDispensacionDto.mensaje_autorizacion = Constantes.DISPENSACION_CORRECTA;
    return readDispensacionDto;
  }
}
