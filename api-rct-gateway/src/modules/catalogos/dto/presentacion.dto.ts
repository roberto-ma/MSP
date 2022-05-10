import { Expose, Exclude } from 'class-transformer';
export class ReadPresentacionDto {
  id: number;

  presentacion: string;
}

export class ReadPresentacionPacienteDto {
  @Exclude()
  id: number;
  @Expose()
  presentacion: string;
  @Exclude()
  version: number;
}
