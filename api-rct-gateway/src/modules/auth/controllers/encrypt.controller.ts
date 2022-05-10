import {
  BadRequestException,
  Body,
  Controller,
  Param,
  Post,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AES, enc } from 'crypto-ts';
import { Unprotected } from 'nest-keycloak-connect';
import { CadenaFarmaciaService } from 'src/modules/catalogos/services/cadena-farmacia.service';
import { FuenteDatosService } from 'src/modules/catalogos/services/fuente-datos.service';

import { InputDecrypt } from '../../receta/dto/encrypt.dto';

@ApiTags('Encrypt')
@Controller('seguridad')
export class EncryptController {
  constructor(
    private readonly fuenteDatosService: FuenteDatosService,
    private readonly cadenaFarmaciaService: CadenaFarmaciaService,
  ) {}
  // @Post('encrypt/receta-prescrita')
  // @Unprotected()
  // encryptRecetaPrescrita(@Body() dataAEncriptar: CreateRecetaPrescritaDto) {
  //   const encrypted = AES.encrypt(
  //     JSON.stringify(dataAEncriptar),
  //     'ask132asd45asd',
  //   ).toString();
  //   return { data: encrypted };
  // }

  // @Post('encrypt/receta-validada')
  // @Unprotected()
  // CreateRecetaValidadaDto(@Body() data: CreateRecetaValidadaDto) {
  //   const encrypted = AES.encrypt(
  //     JSON.stringify(data),
  //     'ask132asd45asd',
  //   ).toString();
  //   return { data: encrypted };
  // }

  // @Unprotected()
  // @Post('encrypt/validacion-farmacia')
  // async validatePreciosReceta(@Body() data: ValidateRecetaDto) {
  //   const encrypted = AES.encrypt(
  //     JSON.stringify(data),
  //     'ask132asd45asd',
  //   ).toString();
  //   return { data: encrypted };
  // }

  // @Unprotected()
  // @Post('encrypt/anulacion-receta')
  // updateAnulacionReceta(@Body() data: UpdateAnulacionRecetaDto) {
  //   const encrypted = AES.encrypt(
  //     JSON.stringify(data),
  //     'ask132asd45asd',
  //   ).toString();
  //   return { data: encrypted };
  // }

  // @Unprotected()
  // @Post('encrypt/dispensacion')
  // async createDispensacion(@Body() data: CreateDispensacionDto) {
  //   const encrypted = AES.encrypt(
  //     JSON.stringify(data),
  //     'ask132asd45asd',
  //   ).toString();
  //   return { data: encrypted };
  // }

  // @Unprotected()
  // @Post('encrypt/paciente')
  // async createPaciente(@Body() data: CreatePacienteDto) {
  //   const encrypted = AES.encrypt(
  //     JSON.stringify(data),
  //     'ask132asd45asd',
  //   ).toString();
  //   return { data: encrypted };
  // }

  // @Unprotected()
  // @Post('encrypt/profesional-salud')
  // async createProfesionalSalud(@Body() data: CreateProfesionalSaludDto) {
  //   const encrypted = AES.encrypt(
  //     JSON.stringify(data),
  //     'ask132asd45asd',
  //   ).toString();
  //   return { data: encrypted };
  // }

  @Unprotected()
  @Post('encrypt/farmacia/:cadenafarmacia')
  @ApiBody({
    description:
      'EndPoint de pruebas, reemplazar "string" por objeto json a encriptar',
    required: true,
    isArray: false,
  })
  async encryptFarmacia(
    @Body() data: any,
    @Param('cadenafarmacia') cadenafarmacia: number,
  ) {
    const cadenaFarmacia =
      await this.cadenaFarmaciaService.getCadenaFarmaciaPorId(cadenafarmacia);
    const key = cadenaFarmacia.llaveCriptografia;
    const encrypted = AES.encrypt(JSON.stringify(data), key).toString();
    return { data: encrypted };
  }

  @Unprotected()
  @Post('encrypt/entidad-salud/:fuentedatos')
  @ApiBody({
    description:
      'EndPoint de pruebas, reemplazar "string" por objeto json a encriptar',
    required: true,
    isArray: false,
  })
  async encryptEntidad(
    @Body() data: any,
    @Param('fuentedatos') fuentedatos: number,
  ) {
    const fuenteDatos = await this.fuenteDatosService.getFuenteDatosPorId(
      fuentedatos,
    );
    const key = fuenteDatos.llaveCriptografia;
    const encrypted = AES.encrypt(JSON.stringify(data), key).toString();
    return { data: encrypted };
  }

  @Post('decrypt/farmacia/:cadenafarmacia')
  @Unprotected()
  @ApiBody({
    description:
      'EndPoint de pruebas, reemplazar "string" por datos encriptados',
    type: InputDecrypt,
    required: true,
    isArray: false,
  })
  async decryptFarmacia(
    @Body() dataEncriptada: InputDecrypt,
    @Param('cadenafarmacia') cadenafarmacia: number,
  ) {
    try {
      const cadenaFarmacia =
        await this.cadenaFarmaciaService.getCadenaFarmaciaPorId(cadenafarmacia);
      const key = cadenaFarmacia.llaveCriptografia;
      const data = JSON.parse(
        AES.decrypt(dataEncriptada.data, key).toString(enc.Utf8),
      );
      return data;
    } catch (error) {
      throw new BadRequestException(`Error en el proceso de desencriptación`);
    }
  }

  @Post('decrypt/entidad-salud/:fuentedatos')
  @Unprotected()
  @ApiBody({
    description:
      'EndPoint de pruebas, reemplazar "string" por datos encriptados',
    type: InputDecrypt,
    required: true,
    isArray: false,
  })
  async decryptEntidad(
    @Body() dataEncriptada: InputDecrypt,
    @Param('fuentedatos') fuentedatos: number,
  ) {
    try {
      const fuenteDatos = await this.fuenteDatosService.getFuenteDatosPorId(
        fuentedatos,
      );
      const key = fuenteDatos.llaveCriptografia;
      const data = JSON.parse(
        AES.decrypt(dataEncriptada.data, key).toString(enc.Utf8),
      );
      return data;
    } catch (error) {
      throw new BadRequestException(`Error en el proceso de desencriptación`);
    }
  }
}
