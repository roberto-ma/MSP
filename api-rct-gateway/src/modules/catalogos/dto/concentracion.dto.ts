import { Expose, Exclude } from 'class-transformer';
export class ReadConcentracionDto {
  id: number;

  concentracion: string;
}

export class ReadConcentracionPacienteDto {
  @Exclude()
  id: number;

  @Expose()
  concentracion: string;

  @Exclude()
  version: number;
}
