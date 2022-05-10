import { Expose, Exclude } from 'class-transformer';

export class ReadFormaFarmaceuticaDto {
  id: number;

  formaFarmaceutica: string;
}

export class ReadFormaFarmaceuticaPacienteDto {
  @Exclude()
  id: number;

  @Expose()
  formaFarmaceutica: string;

  @Exclude()
  version: number;
}
