import { Exclude, Expose, Type } from 'class-transformer';
import { IsByteLength, IsString, ValidateNested } from 'class-validator';
import { ReadLugarGeograficoDto } from '../../catalogos/dto/lugar-geografico.dto';
import { ReadPersonaRecetaDto } from './persona-receta.dto';
import { ReadPersonaRecetaPacienteDto } from './persona-receta.dto';
import { CreatePersonaRecetaDto } from './persona-receta.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePacienteRecetaDto {
  @ApiProperty()
  @IsString()
  @IsByteLength(0, 100)
  alergias: string;

  @ApiProperty({ type: CreatePersonaRecetaDto })
  @ValidateNested()
  @Type(() => CreatePersonaRecetaDto)
  persona: CreatePersonaRecetaDto;
}

export class ReadPacienteRecetaDto {
  @Exclude()
  persona_id: number;

  @Exclude()
  residencia: string;

  @Exclude()
  lugar_residencia_id: number;

  @Exclude()
  tipo_telefono: string;

  @Exclude()
  telefono: string;

  @Exclude()
  email: string;

  @Exclude()
  alergia?: string;

  @Expose()
  @Type(() => ReadPersonaRecetaDto)
  persona: ReadPersonaRecetaDto;

  @Exclude()
  @Type(() => ReadLugarGeograficoDto)
  lugar_residencia: ReadLugarGeograficoDto;
}

export class ReadPacienteRecetaPacienteDto {
  @Exclude()
  persona_id: number;

  @Exclude()
  residencia: string;

  @Exclude()
  lugar_residencia_id: number;

  @Exclude()
  tipo_telefono: string;

  @Exclude()
  telefono: string;

  @Exclude()
  email: string;

  @Expose()
  alergia?: string;

  @Expose()
  @Type(() => ReadPersonaRecetaPacienteDto)
  persona: ReadPersonaRecetaPacienteDto;

  // @Exclude()
  // @Type(() => ReadLugarGeograficoDto)
  // lugar_residencia: ReadLugarGeograficoDto;
}
