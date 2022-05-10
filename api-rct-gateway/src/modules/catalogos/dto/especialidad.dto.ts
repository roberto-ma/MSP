import { Exclude, Type, Expose } from 'class-transformer';

export class ReadEspecialidadDto {
  id: number;

  especialidad: string;
}

export class ReadEspecialidadPacienteDto {
  @Exclude()
  id: number;
  @Expose()
  especialidad: string;
}
