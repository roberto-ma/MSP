import {
  Controller,
  ParseArrayPipe,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { Body } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { Version } from '@nestjs/common';
import { Roles } from 'nest-keycloak-connect';
import { ConciliacionMspService } from '../services/conciliacion-msp.service';
import { CreateConciliacionMspDto } from '../dto/conciliacion-msp.dto';
import { Constantes } from '../../../config/constantes';
import { InputDto } from '../../receta/dto/encrypt.dto';
import { EncryptInterceptor } from '../../../interceptors/encrypt.interceptor';

@ApiTags('Conciliacion Receta')
@Controller('conciliacion')
export class ConciliacionMspController {
  constructor(
    private readonly conciliacionMspService: ConciliacionMspService,
  ) {}

  @Version(Constantes.API_V1)
  @ApiBearerAuth()
  @Roles({
    roles: [
      Constantes.KC_ROLE_ENTIDAD_SALUD,
      Constantes.KC_ROLE_CADENA_FARMACIA,
    ],
  })
  @Post('conciliar')
  @ApiBody({
    type: CreateConciliacionMspDto,
    description: 'ConciliacionRecetaDto',
    required: true,
    isArray: true,
  })
  async createConciliacion(
    @Body(
      new ParseArrayPipe({
        items: CreateConciliacionMspDto,
      }),
    )
    createConciliacionMspDtos: CreateConciliacionMspDto[],
  ) {
    createConciliacionMspDtos.map(async (itemConciliacion) => {
      const fecha = new Date(itemConciliacion.fechaConciliacion);
      fecha.setMinutes(fecha.getMinutes() + fecha.getTimezoneOffset());
      return (itemConciliacion.fechaConciliacion = fecha.toISOString());
    });

    const conciliacion = await this.conciliacionMspService.createConciliacion(
      createConciliacionMspDtos,
    );
    return conciliacion;
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
  @Post('conciliar')
  @ApiBody({
    type: InputDto,
    required: true,
    isArray: false,
  })
  async createConciliacionEncrypt(
    @Body(
      new ParseArrayPipe({
        items: CreateConciliacionMspDto,
      }),
    )
    createConciliacionMspDtos: CreateConciliacionMspDto[],
  ) {
    createConciliacionMspDtos.map(async (itemConciliacion) => {
      const fecha = new Date(itemConciliacion.fechaConciliacion);
      fecha.setMinutes(fecha.getMinutes() + fecha.getTimezoneOffset());
      return (itemConciliacion.fechaConciliacion = fecha.toISOString());
    });

    const conciliacion = await this.conciliacionMspService.createConciliacion(
      createConciliacionMspDtos,
    );
    return conciliacion;
  }
}
