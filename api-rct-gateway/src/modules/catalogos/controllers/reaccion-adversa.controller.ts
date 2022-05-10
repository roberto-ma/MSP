import { Controller, Get, Post, Body } from '@nestjs/common';
import { Patch, Param, Version } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Scopes, Unprotected } from 'nest-keycloak-connect';
import { plainToClass } from 'class-transformer';
import { RespuestaKeycloak } from '../../../interfaces/respuesta-keycloak.interface';
import { CurrentUser } from '../../../decorators/current-user.decorator';
import { ReaccionAdversaService } from '../services/reaccion-adversa.service';
import { ReadReaccionAdversaDto } from '../dto/reaccion-adversa.dto';

@ApiTags('ReaccionAdversa')
@Controller('reaccion-adversa')
export class ReaccionAdversaController {
  constructor(
    private readonly reaccionAdversaService: ReaccionAdversaService,
  ) {}

  // @Version('1')
  // ////@ApiBearerAuth()
  // @Unprotected()
  // @Get('id/:id')
  // async getReaccionAdversaPorId(@Param('id') id: number) {
  //   const reaccionAdversa = await this.reaccionAdversaService.getReaccionAdversaPorId(+id);
  //   return plainToClass(ReadReaccionAdversaDto, reaccionAdversa);
  // }
}
