import { Exclude, Expose } from 'class-transformer';
export class ReadLugarGeograficoDto {
  id: number;

  codigoParroquia: string;

  parroquia: string;

  codigoCanton: string;

  canton: string;

  codigoProvincia: string;

  provincia: string;
}
export class ReadLugarGeograficoPacienteDto {
  @Expose()
  id: number;
  @Exclude()
  codigoParroquia: string;
  @Exclude()
  parroquia: string;
  @Exclude()
  codigoCanton: string;
  @Expose()
  canton: string;
  @Exclude()
  codigoProvincia: string;
  @Exclude()
  provincia: string;
}
