import { IsByteLength, IsNumber, IsOptional } from 'class-validator';
import { IsString, ValidateNested } from 'class-validator';

import { Type } from 'class-transformer';
import { CreatePersonaDto } from './persona.dto';

export class CreatePacienteDto {
  @IsString()
  @IsByteLength(0, 1000)
  residencia: string;

  @IsNumber()
  lugar_residencia_id: number;

  @IsString()
  @IsByteLength(0, 1)
  tipo_telefono: string;

  @IsString()
  @IsByteLength(0, 15)
  telefono: string;

  @IsString()
  @IsByteLength(0, 80)
  email: string;

  @IsString()
  @IsByteLength(0, 100)
  alergia?: string;

  @ValidateNested()
  @Type(() => CreatePersonaDto)
  persona: CreatePersonaDto;
}

export class UpdatePacienteDto {
  @IsNumber()
  persona_id: number;

  @IsString()
  @IsOptional()
  residencia?: string;

  @IsNumber()
  @IsOptional()
  lugar_residencia_id?: number;

  @IsString()
  @IsOptional()
  tipo_telefono?: string;

  @IsString()
  @IsOptional()
  telefono?: string;

  @IsString()
  @IsOptional()
  email?: string;
}

export class ReadPacienteDto extends CreatePacienteDto {}
