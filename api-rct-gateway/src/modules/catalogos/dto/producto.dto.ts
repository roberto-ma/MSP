import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import { IsByteLength, IsNumber, IsOptional, IsString } from 'class-validator';

export class ReadProductoDto {
  id: number;
  nombreGenerico: string;
  nombreComercial: string;
  precio: number;
  fecPrecio: number;
  activo: number;
}

export class ReadProductoPacienteDto {
  @Exclude()
  id: number;
  @Expose()
  nombreGenerico: string;
  @Expose()
  nombreComercial: string;
  @Exclude()
  precio: number;
  @Exclude()
  fecPrecio: number;
  @Exclude()
  activo: number;
  @Exclude()
  version: number;
}
