import {
  IsByteLength,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreatePersonaDto } from './persona.dto';
import { IsArray } from 'class-validator';

export class CreateProfesionalSaludDto {
  // @IsNumber()
  // persona_id: number;

  @IsString()
  @IsByteLength(0, 17)
  codigo_acess: string;

  @IsNumber()
  especialidad_id: number;

  @IsNumber()
  rol_profesional_id: number;

  @IsOptional()
  @IsNumber()
  establecimiento_id: number;

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  establecimientos_itinerantes?: number[];

  @IsNumber()
  itinerante: number;

  @IsNumber()
  psicotropico: number;

  @ValidateNested()
  @Type(() => CreatePersonaDto)
  persona: CreatePersonaDto;
}

export class UpdateProfesionalSaludDto {
  @IsNumber()
  persona_id: number;

  @IsOptional()
  @IsString()
  @IsByteLength(0, 17)
  codigo_acess?: string;

  @IsOptional()
  @IsNumber()
  especialidad_id?: number;

  @IsOptional()
  @IsNumber()
  rol_profesional_id?: number;

  @IsOptional()
  @IsNumber()
  establecimiento_id?: number;

  @IsOptional()
  @IsNumber()
  itinerante?: number;

  @IsOptional()
  @IsNumber()
  psicotropico?: number;
}
