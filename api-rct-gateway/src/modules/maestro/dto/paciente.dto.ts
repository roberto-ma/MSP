import { IsByteLength, IsString, ValidateNested } from 'class-validator';
import { IsNumber } from 'class-validator';
import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { Expose, Type, Exclude } from 'class-transformer';
import { ReadPersonaDto, CreatePersonaDto } from './persona.dto';

export class CreatePacienteDto {
  // @ApiProperty()
  // @IsNumber()
  //persona_id: number; //Crear Persona primero

  @ApiProperty()
  @IsString()
  @IsByteLength(0, 1000)
  residencia: string;

  @ApiProperty()
  @IsNumber()
  lugar_residencia_id: number;

  @ApiProperty()
  @IsString()
  @IsByteLength(0, 1)
  tipo_telefono: string;

  @ApiProperty()
  @IsString()
  @IsByteLength(0, 15)
  telefono: string;

  @ApiProperty()
  @IsString()
  @IsByteLength(0, 80)
  email: string;

  @ApiProperty()
  @IsString()
  @IsByteLength(0, 100)
  alergia?: string;

  @ApiProperty({ type: CreatePersonaDto })
  @ValidateNested()
  @Type(() => CreatePersonaDto)
  persona: CreatePersonaDto;
}

export class UpdatePacienteDto extends PartialType(CreatePacienteDto) {
  @Exclude()
  persona_id: number;
}

export class ReadPacienteDto extends OmitType(UpdatePacienteDto, ['persona']) {
  @Expose()
  @Type(() => ReadPersonaDto)
  persona: ReadPersonaDto;
}
