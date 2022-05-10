import { PartialType } from '@nestjs/mapped-types';
import { IsByteLength, IsNumber, IsString, IsOptional } from 'class-validator';

export class CreateRecetaDetalleDto {
  @IsNumber()
  medicamento_id: number;

  @IsNumber()
  cantidad_prescrita: number;

  @IsNumber()
  cie_id: number;

  @IsNumber()
  dosis_id: number;

  @IsNumber()
  frecuencia_id: number;

  @IsOptional()
  @IsString()
  @IsByteLength(0, 30)
  otra_frecuencia?: string;

  @IsOptional()
  @IsString()
  @IsByteLength(0, 100)
  indicaciones?: string;

  @IsOptional()
  @IsNumber()
  dosis_cantidad?: number;

  @IsOptional()
  @IsNumber()
  duracion_tratamiento?: number;
}

export class UpdateRecetaDetalleDto extends PartialType(
  CreateRecetaDetalleDto,
) {
  @IsNumber()
  id: number;
}
