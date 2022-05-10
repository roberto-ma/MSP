import { Exclude, Type, Expose } from 'class-transformer';
import { ReadLugarGeograficoDto } from '../../catalogos/dto/lugar-geografico.dto';
import { ReadEtniaDto } from '../../catalogos/dto/etnia.dto';
import { IsByteLength, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ReadPersonaRecetaFarmaciaDto {
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
}
