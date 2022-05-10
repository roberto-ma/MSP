import {
  IsString,
  ValidateNested,
  IsArray,
  IsByteLength,
} from 'class-validator';
import { IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class ValidateRecetaDetalleDto {
  @IsNumber()
  id: number;

  @IsNumber()
  medicamento_id: number;

  @IsNumber()
  cantidad_prescrita: number;

  @IsNumber()
  precio_farmacia: number;
}

export class ValidatePersonaDto {
  @IsString()
  @IsByteLength(0, 17)
  identificacion: string;
}

export class ValidatePacienteDto {
  @ValidateNested()
  @Type(() => ValidatePersonaDto)
  persona: ValidatePersonaDto;
}

export class ValidateRecetaDto {
  @IsString()
  @IsByteLength(0, 50)
  oid: string;

  @IsNumber()
  farmacia_id: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ValidateRecetaDetalleDto)
  recetaDetalle: ValidateRecetaDetalleDto[];
}
