import { Exclude, Expose } from 'class-transformer';

export class ReadEstablecimientoDto {
  @Exclude()
  id: number;

  @Exclude()
  unicodigo: string;

  @Exclude()
  ruc: string;

  @Exclude()
  nombre_oficial: string;

  @Exclude()
  nombre_comercial: string;

  numero_establecimiento: string;

  @Exclude()
  organico_id: number;

  @Exclude()
  telefono: string;

  @Exclude()
  email: string;

  @Exclude()
  direccion: string;

  @Exclude()
  referencia: string;

  @Exclude()
  lugar_geografico_id: number;

  @Exclude()
  tipo_establecimiento_id: number;

  @Exclude()
  latitud: string;

  @Exclude()
  longitud: string;

  @Exclude()
  activo: string;

  @Exclude()
  institucion_id: number;
}
export class ReadEstablecimientoPacienteDto {
  @Exclude()
  id: number;

  @Exclude()
  unicodigo: string;

  @Expose()
  ruc: string;

  @Expose()
  nombreOficial: string;

  @Expose()
  nombreComercial: string;
  @Exclude()
  numero_establecimiento: string;

  @Exclude()
  organico_id: number;

  @Exclude()
  telefono: string;

  @Exclude()
  email: string;

  @Exclude()
  direccion: string;

  @Exclude()
  referencia: string;

  @Exclude()
  lugar_geografico_id: number;

  @Exclude()
  tipo_establecimiento_id: number;

  @Exclude()
  latitud: string;

  @Exclude()
  longitud: string;

  @Exclude()
  activo: string;

  @Exclude()
  institucion_id: number;
}
