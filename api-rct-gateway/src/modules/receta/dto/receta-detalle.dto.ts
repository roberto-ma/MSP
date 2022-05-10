import { ApiProperty, ApiPropertyOptional, OmitType } from '@nestjs/swagger';
import { IsByteLength, IsPositive } from 'class-validator';
import { IsNumber, IsString, IsOptional } from 'class-validator';
import {
  ReadMedicamentoDto,
  ReadMedicamentoPacienteDto,
} from '../../catalogos/dto/medicamento.dto';
import { ReadCieDto } from '../../catalogos/dto/cie.dto';
import { ReadDosisDto } from '../../catalogos/dto/dosis.dto';
import { ReadFrecuenciaDto } from '../../catalogos/dto/frecuencia.dto';
import {
  ReadDispensacionDto,
  ReadDispensacionFarmaciaDto,
} from './dispensacion.dto';
import { Exclude, Type, Expose } from 'class-transformer';
import { ReadProductoDto } from '../../catalogos/dto/producto.dto';

export class CreateRecetaDetalleDto {
  @ApiProperty()
  @IsNumber()
  medicamento_id: number;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  cantidad_prescrita: number;

  @ApiProperty()
  @IsNumber()
  dispensacion_externa: number;

  @ApiProperty()
  @IsNumber()
  cie_id: number;

  @ApiProperty()
  @IsNumber()
  dosis_id: number;

  @ApiProperty()
  @IsNumber()
  frecuencia_id: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @IsByteLength(0, 30)
  otra_frecuencia?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @IsByteLength(0, 100)
  indicaciones?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @IsPositive()
  dosis_cantidad?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  duracion_tratamiento?: number;
}

export class UpdateRecetaDetalleDto {}

export class ReadRecetaDetalleSimpleDto {
  @Exclude()
  id: number;

  @Exclude()
  receta_id: number;

  @Expose()
  medicamento_id: number;

  @Exclude()
  @Type(() => ReadMedicamentoDto)
  medicamento: ReadMedicamentoDto;

  @Expose()
  cantidad_prescrita: number;

  @Exclude()
  cantidad_validada: number;

  @Exclude()
  dispensacion_externa: number;

  @Exclude()
  cie_id: number;

  @Exclude()
  @Type(() => ReadCieDto)
  cie: ReadCieDto;

  @Exclude()
  dosis_id: number;

  @Exclude()
  @Type(() => ReadDosisDto)
  dosis: ReadDosisDto;

  @Exclude()
  frecuencia_id: number;

  @Exclude()
  @Type(() => ReadFrecuenciaDto)
  frecuencia: ReadFrecuenciaDto;

  @Exclude()
  otra_frecuencia: string;

  @Exclude()
  indicaciones: string;

  @Exclude()
  tarifario_id: number;

  @Exclude()
  precio_tarifario: number;

  @Exclude()
  dispensacion_id: number;

  @Exclude()
  @Type(() => ReadDispensacionDto)
  dispensacion: ReadDispensacionDto;

  @Exclude()
  precio_farmacia: number;

  @Exclude()
  dosis_cantidad?: number;

  @Exclude()
  duracion_tratamiento?: number;
}

export class ReadRecetaDetalleDto extends OmitType(ReadRecetaDetalleSimpleDto, [
  'id',
]) {
  @Expose()
  id: number;
}

export class ReadRecetaDetallePacienteDto {
  @Exclude()
  id: number;

  @Exclude()
  receta_id: number;

  @Exclude()
  medicamento_id: number;

  @Expose()
  @Type(() => ReadMedicamentoPacienteDto)
  medicamento: ReadMedicamentoPacienteDto;

  @Expose()
  cantidad_prescrita: number;

  @Exclude()
  cantidad_validada: number;

  @Exclude()
  dispensacion_externa: number;

  @Exclude()
  cie_id: number;

  @Exclude()
  @Type(() => ReadCieDto)
  cie: ReadCieDto;

  @Exclude()
  dosis_id: number;

  @Expose()
  @Type(() => ReadDosisDto)
  dosis: ReadDosisDto;

  @Exclude()
  frecuencia_id: number;

  @Exclude()
  @Type(() => ReadFrecuenciaDto)
  frecuencia: ReadFrecuenciaDto;

  @Exclude()
  otra_frecuencia: string;

  @Expose()
  indicaciones: string;

  @Exclude()
  tarifario_id: number;

  @Expose()
  precio_tarifario: number;

  @Exclude()
  dispensacion_id: number;

  @Expose()
  @Type(() => ReadDispensacionFarmaciaDto)
  dispensacion: ReadDispensacionFarmaciaDto;

  @Exclude()
  precio_farmacia: number;

  @Expose()
  duracion_tratamiento: number;
}
