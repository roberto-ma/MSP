import { Expose, Exclude } from 'class-transformer';

export class ReadEstadoDto {
  @Exclude()
  id: number;

  @Expose()
  estado: string;
}
