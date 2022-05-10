import { ApiProperty, OmitType } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  ValidateNested,
  IsByteLength,
} from 'class-validator';
import { CreatePersonaRecetaDto } from './persona-receta.dto';
import { Type } from 'class-transformer';
export class CreateProfesionalSaludRecetaDto {
  @ApiProperty()
  @IsString()
  @IsByteLength(0, 17)
  codigo_acess: string;

  @ApiProperty()
  @IsNumber()
  psicotropico: number;

  @ApiProperty({ type: CreatePersonaRecetaDto })
  @ValidateNested()
  @Type(() => CreatePersonaRecetaDto)
  persona: CreatePersonaRecetaDto;
}

export class CreateProfesionalSaludValidadorRecetaDto extends OmitType(
  CreateProfesionalSaludRecetaDto,
  ['codigo_acess', 'psicotropico'],
) {}
