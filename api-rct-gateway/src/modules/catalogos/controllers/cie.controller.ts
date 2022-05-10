import { Controller, Get, Post, Body } from '@nestjs/common';
import { Patch, Param, Version } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Scopes, Unprotected } from 'nest-keycloak-connect';
import { plainToClass } from 'class-transformer';
import { RespuestaKeycloak } from '../../../interfaces/respuesta-keycloak.interface';
import { CurrentUser } from '../../../decorators/current-user.decorator';
import { CieService } from '../services/cie.service';
import { ReadCieDto } from '../dto/cie.dto';

@ApiTags('Cie')
@Controller('cie')
export class CieController {
  constructor(private readonly cieService: CieService) {}

  // @Version('1')
  // ////@ApiBearerAuth()
  // @Unprotected()
  // @Get('id/:id')
  // async getCiePorId(@Param('id') id: number) {
  //   const cie = await this.cieService.getCiePorId(+id);
  //   return plainToClass(ReadCieDto, cie);
  // }

  // @Version('1')
  // ////@ApiBearerAuth()
  // @Unprotected()
  // @Get('codigoCie/:codigoCie')
  // async getPacientePorIdentificacion(@Param('codigoCie') codigoCie: string) {
  //   const cie = await this.cieService.getCiePorCodigo(codigoCie);
  //   return plainToClass(ReadCieDto, cie);
  // }
}
