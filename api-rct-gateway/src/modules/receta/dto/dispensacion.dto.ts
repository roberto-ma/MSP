import { IsByteLength, IsDate, IsNumber, IsString } from 'class-validator';
import { OmitType, PartialType } from '@nestjs/swagger';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import { ReadRecetaDto, ReadRecetaSimpleDto } from './receta.dto';
import { ReadPacienteDto } from '../../maestro/dto/paciente.dto';

export class CreateDispensacionDto {
  @ApiProperty()
  @IsString()
  @IsByteLength(0, 50)
  receta_oid: string;

  @ApiProperty()
  @IsNumber()
  codigo_autorizacion: number;

  @ApiProperty()
  @IsNumber()
  farmacia_id: number;

  @ApiPropertyOptional()
  @IsString()
  @IsByteLength(0, 20)
  numero_orden?: string;

  @ApiProperty()
  @IsDate()
  fecha_dispensacion: Date;

  @ApiProperty()
  @IsString()
  @IsByteLength(0, 17)
  identificacion_dispensador: string;

  @ApiProperty()
  @IsString()
  @IsByteLength(0, 50)
  dispensador: string;

  @ApiPropertyOptional()
  @IsString()
  @IsByteLength(0, 100)
  observacion?: string;

  // @ApiPropertyOptional()
  // @IsNumber()
  // fuente_datos_id?: number;

  @ApiPropertyOptional()
  @IsString()
  @IsByteLength(0, 17)
  identificador_receptor?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsByteLength(0, 100)
  receptor?: string;

  @ApiProperty()
  @IsNumber({ maxDecimalPlaces: 6 })
  valor_total: number;
}

export class UpdateDispensacionDto extends PartialType(CreateDispensacionDto) {}

export class ReadDispensacionDto extends OmitType(CreateDispensacionDto, [
  'codigo_autorizacion',
]) {
  @Expose()
  mensaje_autorizacion: string;

  @Exclude()
  activo: number;

  @Exclude()
  id: number;

  @Exclude()
  fecha_registro: Date;

  @Exclude()
  fuente_datos_id: number;
}

export class ReadDispensacionConRecetaDto extends OmitType(
  CreateDispensacionDto,
  ['codigo_autorizacion'],
) {
  @Expose()
  mensaje_autorizacion: string;

  @Exclude()
  activo: number;

  @Exclude()
  id: number;

  @Exclude()
  fecha_registro: Date;

  @Exclude()
  fuente_datos_id: number;

  @Expose()
  @Type(() => ReadRecetaSimpleDto)
  receta: ReadRecetaSimpleDto;
}

export class ReadDispensacionFarmaciaDto {
  @Exclude()
  mensaje_autorizacion: string;

  @Exclude()
  activo: number;

  @Expose()
  fecha_dispensacion: Date;

  @Exclude()
  fecha_registro: Date;
}
