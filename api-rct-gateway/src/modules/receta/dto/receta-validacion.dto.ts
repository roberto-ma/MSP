import {
  IsString,
  ValidateNested,
  IsArray,
  IsByteLength,
} from 'class-validator';
import { IsNumber } from 'class-validator';
import { Exclude, Expose, Type } from 'class-transformer';
import { ApiProperty, OmitType } from '@nestjs/swagger';
import { ReadRecetaDto, ReadRecetaSimpleDto } from './receta.dto';
import { ReadRecetaDetalleSimpleDto } from './receta-detalle.dto';
import { ReadOrganicoDto } from '../../catalogos/dto/organico.dto';

export class ValidateRecetaDetalleDto {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsNumber()
  medicamento_id: number;

  @ApiProperty()
  @IsNumber()
  cantidad_prescrita: number;

  @ApiProperty()
  @IsNumber({ maxDecimalPlaces: 6 })
  precio_farmacia: number;
}

export class ValidatePersonaDto {
  @ApiProperty()
  @IsString()
  @IsByteLength(0, 17)
  identificacion: string;
}

export class ValidatePacienteDto {
  @ApiProperty({ type: ValidatePersonaDto })
  @ValidateNested()
  @Type(() => ValidatePersonaDto)
  persona: ValidatePersonaDto;
}

export class ValidateRecetaDto {
  @ApiProperty()
  @IsString()
  @IsByteLength(0, 50)
  oid: string;

  @ApiProperty()
  @IsNumber()
  farmacia_id: number;

  @ApiProperty({ type: [ValidateRecetaDetalleDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ValidateRecetaDetalleDto)
  recetaDetalle: ValidateRecetaDetalleDto[];
}

export class ReadRecetaDetalleValidadaDto extends OmitType(
  ReadRecetaDetalleSimpleDto,
  [
    'medicamento_id',
    'cantidad_prescrita',
    'precio_farmacia',
    'precio_tarifario',
  ],
) {
  @Expose()
  medicamento_id: number;

  @Expose()
  cantidad_prescrita: number;

  @Expose()
  precio_farmacia: number;

  @Expose()
  precio_tarifario: number;
}

export class ReadRecetaAutorizadaDto extends OmitType(ReadRecetaSimpleDto, [
  'organico_id',
  'fecha_caducidad',
  'fecha_receta',
  'paciente',
  'recetaDetalle',
  'codigo_autorizacion',
  'organico',
  'establecimiento_id',
]) {
  @Expose()
  @Type(() => ReadOrganicoDto)
  organico: ReadOrganicoDto;

  @Expose()
  establecimiento_id: number;

  @Expose()
  fecha_caducidad: Date;

  @Expose()
  fecha_receta: Date;

  @Exclude()
  paciente: any;

  @Expose()
  codigo_autorizacion: number;

  @Exclude()
  farmacia_id: number;

  @Expose()
  @Type(() => ReadRecetaDetalleValidadaDto)
  recetaDetalle: ReadRecetaDetalleValidadaDto[];
}
