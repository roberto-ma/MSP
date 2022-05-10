import { ApiProperty, ApiPropertyOptional, OmitType } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import { IsArray, IsByteLength, IsDate, IsNumber } from 'class-validator';
import { IsOptional, IsString, ValidateNested } from 'class-validator';

import { IsOidRecetaFormato } from '../../../decorators/is-oid-format.decorator';
import { IsUniqueMedicamentos } from '../../../decorators/is-unique-medicamentos.decorator';
import { ReadOrganicoDto } from '../../../modules/catalogos/dto/organico.dto';
import { ReadServicioSaludDto } from '../../../modules/catalogos/dto/servicio-salud.dto';
import { ReadTipoAtencionDto } from '../../../modules/catalogos/dto/tipo-atencion.dto';
import { ReadCieDto } from '../../catalogos/dto/cie.dto';
import { ReadEstablecimientoDto } from '../../catalogos/dto/establecimiento.dto';
import { ReadEstadoDto } from '../../catalogos/dto/estado.dto';
import { ReadFuenteDatosDto } from '../../catalogos/dto/fuente-datos.dto';
import { ReadLugarGeograficoDto } from '../../catalogos/dto/lugar-geografico.dto';
import { ReadParentescoDto } from '../../catalogos/dto/parentesco.dto';
import { CreatePacienteRecetaDto } from '../../maestro/dto/paciente-receta.dto';
import { ReadPacienteRecetaDto } from '../../maestro/dto/paciente-receta.dto';
import { CreateProfesionalSaludValidadorRecetaDto } from '../../maestro/dto/profesional-salud-receta.dto';
import { CreateProfesionalSaludRecetaDto } from '../../maestro/dto/profesional-salud-receta.dto';
import { ReadProfesionalSaludDto } from '../../maestro/dto/profesional-salud.dto';
import { CreateRecetaDetalleDto } from './receta-detalle.dto';
import { ReadRecetaDetalleSimpleDto } from './receta-detalle.dto';
import { ReadRecetaDetalleDto } from './receta-detalle.dto';
import { IsOidRecetaEstablecimientoEqual } from '../../../decorators/is-oid-establecimiento.decorator';
import { IsOidRecetaRecetaEqual } from '../../../decorators/is-oid-receta.decorator';

export class CreateRecetaPrescritaDto {
  @ApiProperty()
  @IsNumber()
  numero_receta: number;

  @ApiProperty()
  @IsNumber()
  establecimiento_id: number;

  @ApiProperty()
  @IsString()
  @IsByteLength(0, 17)
  @IsOidRecetaFormato()
  @IsOidRecetaRecetaEqual()
  @IsOidRecetaEstablecimientoEqual()
  oid: string;

  @ApiProperty({ type: CreatePacienteRecetaDto })
  @ValidateNested()
  @Type(() => CreatePacienteRecetaDto)
  paciente: CreatePacienteRecetaDto;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @IsByteLength(0, 1)
  estado_paciente?: string;

  @ApiProperty({ type: CreateProfesionalSaludRecetaDto })
  @ValidateNested()
  @Type(() => CreateProfesionalSaludRecetaDto)
  prescriptor: CreateProfesionalSaludRecetaDto;

  @ApiProperty()
  @IsDate()
  fecha_receta: Date;

  @ApiProperty()
  @IsDate()
  fecha_caducidad: Date;

  @ApiProperty()
  @IsNumber()
  cie_general_id: number;

  @ApiProperty()
  @IsNumber()
  servicio_salud_id: number;

  @ApiProperty()
  @IsNumber()
  tipo_atencion_id: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @IsByteLength(0, 17)
  acompaniante_cedula?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @IsByteLength(0, 100)
  acompaniante?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  parentesco_id?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @IsByteLength(0, 15)
  acompaniante_telefono?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @IsByteLength(0, 80)
  acompaniante_email?: string;

  @ApiProperty()
  @IsNumber()
  fuente_datos_id: number;

  @ApiProperty()
  @IsString()
  @IsByteLength(0, 25)
  usuario_registro: string;

  @ApiProperty()
  @IsString()
  @IsByteLength(0, 20)
  codigo_atencion: string;

  @ApiProperty({ type: [CreateRecetaDetalleDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @IsUniqueMedicamentos()
  @Type(() => CreateRecetaDetalleDto)
  recetaDetalle: CreateRecetaDetalleDto[];
}

export class CreateRecetaValidadaDto extends CreateRecetaPrescritaDto {
  @ApiProperty({ type: CreateProfesionalSaludValidadorRecetaDto })
  @ValidateNested()
  @Type(() => CreateProfesionalSaludValidadorRecetaDto)
  validador: CreateProfesionalSaludValidadorRecetaDto;

  @ApiProperty()
  @IsDate()
  fecha_validacion: Date;

  @ApiProperty()
  @IsString()
  observacion_validacion: string;
}

export class UpdateAnulacionRecetaDto {
  @ApiProperty()
  @IsString()
  @IsByteLength(0, 50)
  oid: string;

  @ApiProperty()
  @IsNumber()
  establecimiento_id: number;

  // @ApiProperty()
  // @IsString()
  // @IsByteLength(0, 50)
  // llave_anulacion: string;
}

export class ReadRecetaSimpleDto {
  @Exclude()
  id: number;

  @Exclude()
  numero_receta: number;

  @Expose()
  oid: string;

  @Expose()
  establecimiento_id: number;

  @Exclude()
  @Type(() => ReadEstablecimientoDto)
  establecimiento: ReadEstablecimientoDto;

  @Exclude()
  organico_id?: number;

  @Exclude()
  @Type(() => ReadOrganicoDto)
  organico: ReadOrganicoDto;

  @Exclude()
  lugar_geografico_id?: number;

  @Exclude()
  @Type(() => ReadLugarGeograficoDto)
  lugar_geografico: ReadLugarGeograficoDto;

  @Exclude()
  paciente_id: number;

  @Type(() => ReadPacienteRecetaDto)
  paciente: ReadPacienteRecetaDto;

  @Exclude()
  estado_paciente: string;

  @Exclude()
  prescriptor_id: number;

  @Exclude()
  @Type(() => ReadProfesionalSaludDto)
  prescriptor: ReadProfesionalSaludDto;

  @Expose()
  fecha_receta: Date;

  @Expose()
  fecha_caducidad: Date;

  @Exclude()
  cie_general_id: number;

  @Exclude()
  @Type(() => ReadCieDto)
  cie_general: ReadCieDto;

  @Exclude()
  servicio_salud_id: number;

  @Exclude()
  @Type(() => ReadServicioSaludDto)
  servicio_salud: ReadServicioSaludDto;

  @Exclude()
  tipo_atencion_id: number;

  @Exclude()
  @Type(() => ReadTipoAtencionDto)
  tipo_atencion: ReadTipoAtencionDto;

  @Exclude()
  validador_id?: number;

  @Exclude()
  fecha_validacion?: Date;

  @Exclude()
  observacion_validacion?: string;

  @Exclude()
  estado_receta_id: number;

  @Expose()
  @Type(() => ReadEstadoDto)
  estado_receta: ReadEstadoDto;

  @Expose()
  acompaniante_cedula?: string;

  @Expose()
  acompaniante?: string;

  @Exclude()
  parentesco_id?: number;

  @Exclude()
  @Type(() => ReadParentescoDto)
  parentesco: ReadParentescoDto;

  @Exclude()
  acompaniante_telefono?: string;

  @Exclude()
  acompaniante_email?: string;

  @Exclude()
  activo: number;

  @Exclude()
  fuente_datos_id: number;

  @Exclude()
  @Type(() => ReadFuenteDatosDto)
  fuente_datos: ReadFuenteDatosDto;

  @Exclude()
  fecha_registro: Date;

  @Exclude()
  usuario_registro: string;

  @Exclude()
  codigo_autorizacion?: number;

  @Exclude()
  codigo_autorizacion_tiempo?: Date;

  @Exclude()
  codigo_atencion: string;

  @Exclude()
  bloqueo_farmacia_id: number;

  @Exclude()
  bloqueo_tiempo: Date;

  @Expose()
  @Type(() => ReadRecetaDetalleSimpleDto)
  recetaDetalle: ReadRecetaDetalleSimpleDto[];
}

export class ReadRecetaDto extends OmitType(ReadRecetaSimpleDto, [
  'recetaDetalle',
  'organico',
]) {
  @Expose()
  @Type(() => ReadRecetaDetalleDto)
  recetaDetalle: ReadRecetaDetalleDto[];

  @Expose()
  @Type(() => ReadOrganicoDto)
  organico: ReadOrganicoDto;
}
