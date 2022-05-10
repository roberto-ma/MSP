import { Type } from 'class-transformer';
import { IsNumber, IsString, IsDate, IsByteLength } from 'class-validator';
import { IsOptional, IsArray, ValidateNested } from 'class-validator';
import { CreateRecetaDetalleDto } from './receta-detalle.dto';
import { CreatePacienteRecetaDto } from '../../maestro/dto/paciente-receta.dto';
import {
  CreateProfesionalSaludRecetaDto,
  CreateProfesionalSaludValidadorRecetaDto,
} from '../../maestro/dto/profesional-salud-receta.dto';

export class CreateRecetaDto {
  @IsNumber()
  numero_receta: number;

  @IsString()
  @IsByteLength(0, 50)
  oid: string;

  @IsNumber()
  establecimiento_id: number;

  @ValidateNested()
  @Type(() => CreatePacienteRecetaDto)
  paciente: CreatePacienteRecetaDto;

  @IsOptional()
  @IsString()
  @IsByteLength(0, 1)
  estado_paciente?: string;

  @ValidateNested()
  @Type(() => CreateProfesionalSaludRecetaDto)
  prescriptor: CreateProfesionalSaludRecetaDto;

  @IsDate()
  fecha_receta: Date;

  @IsDate()
  fecha_caducidad: Date;

  @IsNumber()
  cie_general_id: number;

  @IsNumber()
  servicio_salud_id: number;

  @IsNumber()
  tipo_atencion_id: number;

  @IsOptional()
  @IsString()
  @IsByteLength(0, 17)
  acompaniante_cedula?: string;

  @IsOptional()
  @IsString()
  @IsByteLength(0, 100)
  acompaniante?: string;

  @IsOptional()
  @IsNumber()
  parentesco_id?: number;

  @IsOptional()
  @IsString()
  @IsByteLength(0, 15)
  acompaniante_telefono?: string;

  @IsOptional()
  @IsString()
  @IsByteLength(0, 80)
  acompaniante_email?: string;

  @IsNumber()
  fuente_datos_id: number;

  @IsString()
  @IsByteLength(0, 25)
  usuario_registro: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateRecetaDetalleDto)
  recetaDetalle: CreateRecetaDetalleDto[];

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateProfesionalSaludValidadorRecetaDto)
  validador: CreateProfesionalSaludValidadorRecetaDto;

  @IsOptional()
  @IsDate()
  fecha_validacion: Date;

  @IsOptional()
  @IsString()
  observacion_validacion: string;
}

export class UpdateAnulacionRecetaDto {
  @IsString()
  @IsByteLength(0, 50)
  oid: string;

  @IsNumber()
  establecimiento_id: number;

  // @IsString()
  // @IsByteLength(0, 50)
  // llave_anulacion: string;
}
