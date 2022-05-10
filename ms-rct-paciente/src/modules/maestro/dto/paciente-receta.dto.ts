import { Type } from 'class-transformer';
import { IsByteLength, IsString, ValidateNested } from 'class-validator';
import { CreatePersonaRecetaDto } from './persona-receta.dto';

export class CreatePacienteRecetaDto {
  @IsString()
  @IsByteLength(0, 100)
  alergias: string;

  @ValidateNested()
  @Type(() => CreatePersonaRecetaDto)
  persona: CreatePersonaRecetaDto;
}
