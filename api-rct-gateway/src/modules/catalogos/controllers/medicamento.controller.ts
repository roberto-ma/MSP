import { Controller, Get, Post, Body } from '@nestjs/common';
import { Patch, Param, Version } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Scopes, Unprotected } from 'nest-keycloak-connect';
import { plainToClass } from 'class-transformer';
import { RespuestaKeycloak } from '../../../interfaces/respuesta-keycloak.interface';
import { CurrentUser } from '../../../decorators/current-user.decorator';
import { MedicamentoService } from '../services/medicamento.service';
import { ReadMedicamentoDto } from '../dto/medicamento.dto';

@ApiTags('Medicamento')
@Controller('medicamento')
export class MedicamentoController {
  // constructor(private readonly medicamentoService: MedicamentoService) { }
  // @Version('1')
  // ////@ApiBearerAuth()
  // @Unprotected()
  // @Get('id/:id')
  // async getMedicamentoPorId(@Param('id') id: number) {
  //   const Medicamento = await this.medicamentoService.getMedicamentoPorId(+id);
  //   return plainToClass(ReadMedicamentoDto, Medicamento);
  // }
  // @Version('1')
  // ////@ApiBearerAuth()
  // @Unprotected()
  // @Get('cum/:cum')
  // async getMedicamentosPorCum(@Param('cum') cum: string) {
  //   const medicamento = await this.medicamentoService.getMedicamentosPorCum(cum);
  //   return plainToClass(ReadMedicamentoDto, medicamento);
  // }
  // @Version('1')
  // ////@ApiBearerAuth()
  // @Unprotected()
  // @Get('act/:act')
  // async getMedicamentosPorAct(@Param('act') act: string) {
  //   const medicamento = await this.medicamentoService.getMedicamentosPorAct(act);
  //   return plainToClass(ReadMedicamentoDto, medicamento);
  // }
}
