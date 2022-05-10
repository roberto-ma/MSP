import { Expose, Exclude, Type } from 'class-transformer';

export class ReadCieDto {
  id: number;

  codigoCie: string;

  cie: string;
}

export class ReadCiePacienteDto {
  @Exclude()
  id: number;
  @Expose()
  codigoCie: string;
  @Exclude()
  cie: string;
}
