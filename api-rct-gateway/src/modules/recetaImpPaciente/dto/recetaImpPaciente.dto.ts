import { Expose, Exclude, Type } from 'class-transformer';

import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  ValidateNested,
  IsDate,
  IsByteLength,
} from 'class-validator';
import { IsArray, IsNumber } from 'class-validator';

import {
  ReadProfesionalSaludDto,
  ReadProfesionalSaludPacienteDto,
} from '../../maestro/dto/profesional-salud.dto';
import {
  ReadTipoAtencionDto,
  ReadTipoAtencionPacienteDto,
} from '../../catalogos/dto/tipo-atencion.dto';
import { ReadCieDto, ReadCiePacienteDto } from '../../catalogos/dto/cie.dto';
//import { ReadProfesionalSaludValDto } from '../../maestro/dto/profesional-validador.dto';
import {
  ReadRecetaDetalleDto,
  ReadRecetaDetallePacienteDto,
} from '../../receta/dto/receta-detalle.dto';
import { ReadEstablecimientoPacienteDto } from '../../catalogos/dto/establecimiento.dto';
import { ReadLugarGeograficoPacienteDto } from '../../catalogos/dto/lugar-geografico.dto';
import { ReadPacienteRecetaPacienteDto } from '../../maestro/dto/paciente-receta.dto';
import { ReadProfesionalSaludValDto } from '../../maestro/dto/profesional-validador.dto';

export class RecetaImpPacienteDTo {
  @IsNumber()
  @Expose()
  numero_receta: number;

  @IsDate()
  @Expose()
  fecha_receta: Date;

  @IsDate()
  @Expose()
  fecha_caducidad: Date;

  @Expose()
  @Type(() => ReadEstablecimientoPacienteDto)
  establecimiento: ReadEstablecimientoPacienteDto;

  @Expose()
  @Type(() => ReadLugarGeograficoPacienteDto)
  lugarGeografico: ReadLugarGeograficoPacienteDto;

  @Expose()
  @Type(() => ReadPacienteRecetaPacienteDto)
  paciente: ReadPacienteRecetaPacienteDto;

  @Expose()
  @Type(() => ReadProfesionalSaludPacienteDto)
  prescriptor: ReadProfesionalSaludPacienteDto;

  @Expose()
  @Type(() => ReadTipoAtencionPacienteDto)
  tipoAtencion: ReadTipoAtencionPacienteDto;

  @Expose()
  @Type(() => ReadCiePacienteDto)
  cie: ReadCiePacienteDto;

  @Expose()
  @Type(() => ReadProfesionalSaludValDto)
  validador: ReadProfesionalSaludValDto;

  @Expose()
  @Type(() => ReadRecetaDetallePacienteDto)
  recetaDetalle: ReadRecetaDetallePacienteDto;

  @IsString()
  @Expose()
  signos_alarma?: string;
  @IsString()
  @Expose()
  recomendacionno_farma?: string;
}
