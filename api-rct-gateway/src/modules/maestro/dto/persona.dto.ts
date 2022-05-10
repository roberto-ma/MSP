import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDate } from 'class-validator';
import { IsByteLength, IsNumber } from 'class-validator';
import { PartialType } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';

export class CreatePersonaDto {
  @ApiProperty()
  @IsNumber()
  tipo_identificacion_id: number;

  @ApiProperty()
  @IsString()
  @IsByteLength(0, 17)
  identificacion: string;

  @ApiProperty()
  @IsString()
  @IsByteLength(0, 40)
  apellidos: string;

  @ApiProperty()
  @IsString()
  @IsByteLength(0, 40)
  nombres: string;

  @ApiProperty()
  @IsString()
  @IsByteLength(0, 1)
  sexo: string;

  @ApiProperty()
  @IsNumber()
  etnia_id: number;

  @ApiProperty()
  @IsNumber()
  religion_id: number;

  @ApiProperty()
  @IsNumber()
  lugar_nacimiento_id: number;

  @ApiProperty()
  @IsString()
  @IsByteLength(0, 1)
  discapacitado: string;

  @ApiProperty()
  @IsNumber()
  porcentaje_discapacidad: number;

  @ApiProperty()
  @IsNumber()
  pais_id: number;

  @ApiProperty({ example: '1994-09-20' })
  @IsDate()
  @Type(() => Date)
  fecha_nacimiento: Date;
}

export class UpdatePersonaDto extends PartialType(CreatePersonaDto) {
  @Exclude()
  @ApiProperty()
  @IsNumber()
  id: number;
}

export class ReadPersonaDto extends UpdatePersonaDto {
  @Exclude()
  usuario_modificacion: string;

  @Exclude()
  fecha_modificacion: Date;

  @Exclude()
  fecha_registro: Date;

  @Expose()
  vivo: number;

  @Exclude()
  activo: number;
}

export class ReadPersonaPacienteDto extends UpdatePersonaDto {
  @Exclude()
  usuario_modificacion: string;

  @Exclude()
  fecha_modificacion: Date;
  @Expose()
  nombres: string;
  @Expose()
  apellidos: string;

  @Expose()
  identificacion: string;

  @Exclude()
  vivo: number;

  @Exclude()
  activo: number;
}

export class ReadPersonaValidadorDto extends UpdatePersonaDto {
  @Exclude()
  usuario_modificacion: string;

  @Exclude()
  fecha_modificacion: Date;
  @Expose()
  nombres: string;
  @Expose()
  apellidos: string;

  @Expose()
  identificacion: string;

  @Exclude()
  vivo: number;

  @Exclude()
  activo: number;
}
