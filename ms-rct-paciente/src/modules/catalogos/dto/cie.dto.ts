import { IsNumber, IsOptional } from 'class-validator';
import { IsString, ValidateNested } from 'class-validator';

import { Type } from 'class-transformer';

export class CreateCieDto {
  @IsNumber()
  id: number;

  @IsString()
  codigo_cie: string;

  @IsString()
  cie: string;
}

export class ReadPacienteDto extends CreateCieDto { }
