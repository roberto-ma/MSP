import { Expose, Exclude } from 'class-transformer';
export class ReadViaAdministracionDto {
  id: number;

  viaAdministracion: string;

  abreviatura: string;
}

export class ReadViaAdministracionPacienteDto {
  @Exclude()
  id: number;
  @Expose()
  viaAdministracion: string;
  @Exclude()
  abreviatura: string;
  @Exclude()
  version: number;
}
