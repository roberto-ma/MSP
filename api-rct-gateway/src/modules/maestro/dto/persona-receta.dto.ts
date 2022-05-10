import { Exclude, Type, Expose } from 'class-transformer';
import { ReadReligionDto } from '../../catalogos/dto/religion.dto';
import { ReadLugarGeograficoDto } from '../../catalogos/dto/lugar-geografico.dto';
import { ReadEtniaDto } from '../../catalogos/dto/etnia.dto';
import { IsByteLength, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePersonaRecetaDto {
  @ApiProperty()
  @IsNumber()
  tipo_identificacion_id: number;

  @ApiProperty()
  @IsString()
  @IsByteLength(0, 17)
  identificacion: string;
}
export class ReadPersonaRecetaDto {
  @Exclude()
  id: number;

  @Expose()
  tipo_identificacion_id: number;

  @Expose()
  identificacion: string;

  @Expose()
  apellidos: string;

  @Expose()
  nombres: string;

  @Exclude()
  sexo: string;

  @Exclude()
  etnia_id: number;

  @Exclude()
  religion_id: number;

  @Exclude()
  lugar_nacimiento_id: number;

  @Exclude()
  discapacitado: string;

  @Exclude()
  porcentaje_discapacidad: number;

  @Exclude()
  fecha_registro: Date;

  @Exclude()
  usuario_modificacion: string;

  @Exclude()
  fecha_modificacion: Date;

  @Exclude()
  vivo: number;

  @Exclude()
  activo: number;

  @Exclude()
  @Type(() => ReadEtniaDto)
  etnia: ReadEtniaDto;

  @Exclude()
  @Type(() => ReadReligionDto)
  religion: ReadReligionDto;

  @Exclude()
  @Type(() => ReadLugarGeograficoDto)
  lugar_nacimiento: ReadLugarGeograficoDto;

  @Exclude()
  pais_id: number;
}
export class ReadPersonaRecetaPacienteDto {
  @Exclude()
  id: number;

  @Exclude()
  tipo_identificacion_id: number;

  @Expose()
  identificacion: string;

  @Expose()
  apellidos: string;

  @Expose()
  nombres: string;

  @Expose()
  sexo: string;

  @Expose()
  etnia_id: number;

  @Exclude()
  religion_id: number;

  @Exclude()
  lugar_nacimiento_id: number;

  @Exclude()
  discapacitado: string;

  @Exclude()
  porcentaje_discapacidad: number;

  @Exclude()
  fecha_registro: Date;

  @Exclude()
  usuario_modificacion: string;

  @Exclude()
  fecha_modificacion: Date;

  @Exclude()
  vivo: number;

  @Exclude()
  activo: number;

  @Exclude()
  @Type(() => ReadEtniaDto)
  etnia: ReadEtniaDto;

  @Exclude()
  @Type(() => ReadReligionDto)
  religion: ReadReligionDto;

  @Exclude()
  @Type(() => ReadLugarGeograficoDto)
  lugar_nacimiento: ReadLugarGeograficoDto;

  @Exclude()
  pais_id: number;

  @Expose()
  fecha_nacimiento: Date;
}
