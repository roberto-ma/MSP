import { Expose, Exclude, Type } from 'class-transformer';

export class ReadTipoAtencionDto {
  id: number;

  tipoAtencion: string;
}

export class ReadTipoAtencionPacienteDto {
  @Exclude()
  id: number;
  @Expose()
  tipoAtencion: string;
}
