import { Type } from 'class-transformer';
import { ReadLugarGeograficoDto } from './lugar-geografico.dto';

export class ReadFarmaciaDto {
  id: number;

  farmacia: string;

  unidad: string;

  ruc: string;

  direccion: string;

  activo: string;

  @Type(() => ReadLugarGeograficoDto)
  lugarGeografico: ReadLugarGeograficoDto;
}
