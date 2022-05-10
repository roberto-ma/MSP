import {
  IsString,
  IsNumber,
  ValidateNested,
  IsByteLength,
} from 'class-validator';
import { CreatePersonaRecetaDto } from './persona-receta.dto';
import { Type } from 'class-transformer';
import { OmitType } from '@nestjs/mapped-types';
export class CreateProfesionalSaludRecetaDto {
  @IsString()
  @IsByteLength(0, 17)
  codigo_acess: string;

  @IsNumber()
  psicotropico: number;

  @ValidateNested()
  @Type(() => CreatePersonaRecetaDto)
  persona: CreatePersonaRecetaDto;
}

export class CreateProfesionalSaludValidadorRecetaDto extends OmitType(
  CreateProfesionalSaludRecetaDto,
  ['codigo_acess', 'psicotropico'],
) {}
