import { Exclude, Type, Expose } from 'class-transformer';
import {
  ReadProductoDto,
  ReadProductoPacienteDto,
} from '../../catalogos/dto/producto.dto';
export class ReadMedicamentoDto {
  productoId: number;
  cum: string;
  atc: string;
  nivelAtencion_1: string;
  nivelAtencion_2: string;
  nivelAtencion_3: string;
  psicotropicoEstupefaciente: string;
  antimicrobiano: string;
  dispensacionExterna: string;
  fiscalizacion: string;
}
import {
  ReadFormaFarmaceuticaDto,
  ReadFormaFarmaceuticaPacienteDto,
} from '../../catalogos/dto/forma-farmaceutica.dto';
import {
  ReadPresentacionDto,
  ReadPresentacionPacienteDto,
} from '../../catalogos/dto/presentacion.dto';
import {
  ReadConcentracionDto,
  ReadConcentracionPacienteDto,
} from '../../catalogos/dto/concentracion.dto';
import {
  ReadViaAdministracionDto,
  ReadViaAdministracionPacienteDto,
} from '../../catalogos/dto/via-administracion.dto';
export class ReadMedicamentoPacienteDto {
  @Expose()
  @Type(() => ReadProductoPacienteDto)
  productoM: ReadProductoPacienteDto;
  @Exclude()
  productoId: number;
  @Exclude()
  cum: string;
  @Exclude()
  atc: string;
  @Expose()
  nivelAtencion_1: string;
  @Exclude()
  nivelAtencion_2: string;
  @Exclude()
  nivelAtencion_3: string;
  @Exclude()
  psicotropicoEstupefaciente: string;
  @Expose()
  antimicrobiano: string;
  @Exclude()
  dispensacionExterna: string;
  @Exclude()
  fiscalizacion: string;
  @Exclude()
  version: number;
  @Expose()
  @Type(() => ReadFormaFarmaceuticaPacienteDto)
  formaFarmaceutica: ReadFormaFarmaceuticaPacienteDto;
  @Expose()
  @Type(() => ReadPresentacionPacienteDto)
  presentacion: ReadPresentacionPacienteDto;
  @Expose()
  @Type(() => ReadConcentracionPacienteDto)
  concentracion: ReadConcentracionPacienteDto;
  @Expose()
  @Type(() => ReadViaAdministracionPacienteDto)
  viaAdministracion: ReadViaAdministracionPacienteDto;
}
