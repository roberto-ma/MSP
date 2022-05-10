import { Exclude, Expose } from 'class-transformer';

export class ReadOrganicoDto {
  @Exclude()
  id: number;

  @Exclude()
  codigoDistrito: string;

  @Exclude()
  distrito: string;

  @Expose()
  codigoZona: string;

  @Exclude()
  codigoCircuito: string;

  @Exclude()
  circuito: string;

  @Exclude()
  version: number;

  @Exclude()
  activo: number;
}
