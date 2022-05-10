import { Body, Controller } from '@nestjs/common';
import { Get, Param, Patch, Post } from '@nestjs/common';
import { UseInterceptors, Version } from '@nestjs/common';

import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { Roles } from 'nest-keycloak-connect';

import { Constantes } from '../../../config/constantes';
import { EncryptInterceptor } from '../../../interceptors/encrypt.interceptor';
import { InputDto } from '../dto/encrypt.dto';
import { ValidateRecetaDto } from '../dto/receta-validacion.dto';
import { ReadRecetaAutorizadaDto } from '../dto/receta-validacion.dto';

import { ReadRecetaDto } from '../dto/receta.dto';
import { CreateRecetaPrescritaDto } from '../dto/receta.dto';
import { CreateRecetaValidadaDto } from '../dto/receta.dto';

import { ReadRecetaSimpleDto } from '../dto/receta.dto';
import { UpdateAnulacionRecetaDto } from '../dto/receta.dto';
import { RecetaService } from '../services/receta.service';

@ApiTags('Receta')
@Controller('receta')
export class RecetaController {
  constructor(private readonly recetaService: RecetaService) {}

  @Version(Constantes.API_V1)
  @ApiBearerAuth()
  @Roles({
    roles: [
      Constantes.KC_ROLE_ENTIDAD_SALUD,
      Constantes.KC_ROLE_CADENA_FARMACIA,
    ],
  })
  @Get(':oid')
  async getRecetaPorOid(@Param('oid') oid: string) {
    const receta = await this.recetaService.getRecetaPorOid(oid);
    return plainToClass(ReadRecetaDto, receta);
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
  async getRecetaPorOidEncrypt(@Param('oid') oid: string) {
    const receta = await this.recetaService.getRecetaPorOid(oid);
    return plainToClass(ReadRecetaDto, receta);
  }

  @Version(Constantes.API_V1)
  @ApiBearerAuth()
  @Roles({
    roles: [
      Constantes.KC_ROLE_ENTIDAD_SALUD,
      Constantes.KC_ROLE_CADENA_FARMACIA,
    ],
  })
  @Post('prescrita')
  async createRecetaPreescrita(
    @Body() createRecetaPreescritaDto: CreateRecetaPrescritaDto,
  ) {
    const receta = await this.recetaService.createReceta(
      createRecetaPreescritaDto,
    );
    return plainToClass(ReadRecetaSimpleDto, receta);
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
  @Post('prescrita')
  @ApiBody({
    type: InputDto,
    required: true,
    isArray: false,
  })
  async createRecetaPrescritaEncrypt(
    @Body() createRecetaPrescritaDto: CreateRecetaPrescritaDto,
  ) {
    const receta = await this.recetaService.createReceta(
      createRecetaPrescritaDto,
    );
    return plainToClass(ReadRecetaSimpleDto, receta);
  }

  @Version(Constantes.API_V1)
  @ApiBearerAuth()
  @Roles({
    roles: [
      Constantes.KC_ROLE_ENTIDAD_SALUD,
      Constantes.KC_ROLE_CADENA_FARMACIA,
    ],
  })
  @Post('validada')
  async createRecetaValidada(
    @Body() createRecetaValidadaDto: CreateRecetaValidadaDto,
  ) {
    const receta = await this.recetaService.createReceta(
      createRecetaValidadaDto,
    );
    return plainToClass(ReadRecetaSimpleDto, receta);
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
  @Post('validada')
  @ApiBody({
    type: InputDto,
    required: true,
    isArray: false,
  })
  async createRecetaValidadaEncrypt(
    @Body() createRecetaValidadaDto: CreateRecetaValidadaDto,
  ) {
    const receta = await this.recetaService.createReceta(
      createRecetaValidadaDto,
    );
    return plainToClass(ReadRecetaSimpleDto, receta);
  }

  @Version(Constantes.API_V1)
  @ApiBearerAuth()
  @Roles({
    roles: [
      Constantes.KC_ROLE_ENTIDAD_SALUD,
      Constantes.KC_ROLE_CADENA_FARMACIA,
    ],
  })
  @Post('validacion-farmacia')
  async validatePreciosReceta(@Body() validateRecetaDto: ValidateRecetaDto) {
    const receta = await this.recetaService.validatePreciosReceta(
      validateRecetaDto,
    );
    return plainToClass(ReadRecetaAutorizadaDto, receta);
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
  @Post('validacion-farmacia')
  @ApiBody({
    type: InputDto,
    required: true,
    isArray: false,
  })
  async validatePreciosRecetaEncrypt(
    @Body() validateRecetaDto: ValidateRecetaDto,
  ) {
    const receta = await this.recetaService.validatePreciosReceta(
      validateRecetaDto,
    );
    return plainToClass(ReadRecetaAutorizadaDto, receta);
  }

  @Version(Constantes.API_V1)
  @ApiBearerAuth()
  @Roles({
    roles: [
      Constantes.KC_ROLE_ENTIDAD_SALUD,
      Constantes.KC_ROLE_CADENA_FARMACIA,
    ],
  })
  @Patch('anulacion-receta')
  updateAnulacionReceta(
    @Body() updateAnulacionRecetaDto: UpdateAnulacionRecetaDto,
  ) {
    const receta = this.recetaService.updateAnulacionReceta(
      updateAnulacionRecetaDto,
    );
    return plainToClass(ReadRecetaSimpleDto, receta);
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
  @Patch('anulacion-receta')
  updateAnulacionRecetaEncrypt(
    @Body() updateAnulacionRecetaDto: UpdateAnulacionRecetaDto,
  ) {
    const receta = this.recetaService.updateAnulacionReceta(
      updateAnulacionRecetaDto,
    );
    return plainToClass(ReadRecetaSimpleDto, receta);
  }
}
