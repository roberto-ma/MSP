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
import { ReadPacienteRecetaFarmaciaDto } from '../../maestro/dto/paciente-receta-farmacia.dto';
import { ReadProfesionalSaludDto } from '../../maestro/dto/profesional-salud.dto';
import { ReadTipoAtencionDto } from '../../catalogos/dto/tipo-atencion.dto';
import { ReadCieDto } from '../../catalogos/dto/cie.dto';
import { ReadProfesionalSaludValDto } from '../../maestro/dto/profesional-validador.dto';
import {
  ReadRecetaDetalleDto,
  ReadRecetaDetallePacienteDto,
} from '../../receta/dto/receta-detalle.dto';

export class RecetaImpFarmaciaDTo {
  @IsNumber()
  @Expose()
  numero_receta: number;
  @IsNumber()
  @Expose()
  codigo_autorizacion: number;

  @IsDate()
  @Expose()
  fecha_receta: Date;

  @Expose()
  @Type(() => ReadPacienteRecetaFarmaciaDto)
  paciente: ReadPacienteRecetaFarmaciaDto;

  @Expose()
  @Type(() => ReadProfesionalSaludValDto)
  validador: ReadProfesionalSaludValDto;
  @Expose()
  @Type(() => ReadRecetaDetallePacienteDto)
  recetaDetalle: ReadRecetaDetallePacienteDto;
}
