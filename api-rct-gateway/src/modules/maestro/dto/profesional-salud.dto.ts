import { ApiProperty, ApiPropertyOptional, OmitType } from '@nestjs/swagger';
import { Exclude, Type, Expose } from 'class-transformer';
import {
  IsArray,
  IsByteLength,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import {
  ReadPersonaDto,
  CreatePersonaDto,
  ReadPersonaPacienteDto,
} from './persona.dto';
import {
  ReadEspecialidadDto,
  ReadEspecialidadPacienteDto,
} from '../../catalogos/dto/especialidad.dto';
import { ReadRolProfesionalDto } from '../../catalogos/dto/rol-profesional.dto';
import { ReadEstablecimientoDto } from '../../catalogos/dto/establecimiento.dto';

export class CreateProfesionalSaludDto {
  // @ApiProperty()
  // @IsNumber()
  // persona_id: number;

  @ApiProperty()
  @IsString()
  @IsByteLength(0, 17)
  codigo_acess: string;

  @ApiProperty()
  @IsNumber()
  especialidad_id: number;

  @ApiProperty()
  @IsNumber()
  rol_profesional_id: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  establecimiento_id?: number;

  @ApiPropertyOptional({ example: [0] })
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  establecimientos_itinerantes?: number[];

  @ApiProperty()
  @IsNumber()
  itinerante: number;

  @ApiProperty()
  @IsNumber()
  psicotropico: number;

  @ApiProperty({ type: CreatePersonaDto })
  @ValidateNested()
  @Type(() => CreatePersonaDto)
  persona: CreatePersonaDto;
}

export class UpdateProfesionalSaludDto {
  @ApiProperty()
  @IsNumber()
  persona_id: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  codigo_acess?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  especialidad_id?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  rol_profesional_id?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  establecimiento_id?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  itinerante?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  psicotropico?: number;
}

export class ReadProfesionalSaludDto extends OmitType(
  CreateProfesionalSaludDto,
  ['persona'],
) {
  @Exclude()
  persona_id: number;

  @Exclude()
  activo: number;

  @Type(() => ReadPersonaDto)
  persona: ReadPersonaDto;

  @Type(() => ReadEspecialidadDto)
  especialidad: ReadEspecialidadDto;

  @Type(() => ReadRolProfesionalDto)
  rol_profesional: ReadRolProfesionalDto;

  @Type(() => ReadEstablecimientoDto)
  establecimiento: ReadEstablecimientoDto;
}
export class ReadProfesionalSaludPacienteDto extends OmitType(
  CreateProfesionalSaludDto,
  ['persona'],
) {
  @Exclude()
  persona_id: number;

  @Expose()
  activo: number;
  @Expose()
  @Type(() => ReadPersonaPacienteDto)
  persona: ReadPersonaPacienteDto;
  @Expose()
  @Type(() => ReadEspecialidadPacienteDto)
  especialidad: ReadEspecialidadPacienteDto;
}
