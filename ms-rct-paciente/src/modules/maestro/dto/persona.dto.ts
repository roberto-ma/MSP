import { IsString, IsDate } from 'class-validator';
import { IsByteLength, IsNumber } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreatePersonaDto {
  @IsNumber()
  tipo_identificacion_id: number;

  @IsString()
  @IsByteLength(0, 17)
  identificacion: string;

  @IsString()
  @IsByteLength(0, 40)
  apellidos: string;

  @IsString()
  @IsByteLength(0, 40)
  nombres: string;

  @IsString()
  @IsByteLength(0, 1)
  sexo: string;

  @IsNumber()
  etnia_id: number;

  @IsNumber()
  religion_id: number;

  @IsNumber()
  lugar_nacimiento_id: number;

  @IsString()
  @IsByteLength(0, 1)
  discapacitado: string;

  @IsNumber()
  porcentaje_discapacidad: number;

  @IsNumber()
  pais_id: number;

  @IsDate()
  fecha_nacimiento: Date;
}

export class UpdatePersonaDto extends PartialType(CreatePersonaDto) {
  @IsNumber()
  id: number;
}
