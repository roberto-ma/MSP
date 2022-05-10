import { Exclude, Expose, Type } from 'class-transformer';
import { IsByteLength, IsString, ValidateNested } from 'class-validator';
import { ReadLugarGeograficoDto } from '../../catalogos/dto/lugar-geografico.dto';
import { ReadPersonaRecetaFarmaciaDto } from './persona-receta-farmacia.dto';
import { CreatePersonaRecetaDto } from './persona-receta.dto';
import { ApiProperty } from '@nestjs/swagger';

export class ReadPacienteRecetaFarmaciaDto {
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
  @Type(() => ReadPersonaRecetaFarmaciaDto)
  persona: ReadPersonaRecetaFarmaciaDto;
}
