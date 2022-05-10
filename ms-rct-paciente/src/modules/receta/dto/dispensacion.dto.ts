import { PartialType } from '@nestjs/mapped-types';
import { IsByteLength, IsDate, IsNumber, IsString } from 'class-validator';
export class CreateDispensacionDto {
  @IsString()
  @IsByteLength(0, 50)
  receta_oid: string;

  @IsNumber()
  codigo_autorizacion: number;

  @IsNumber()
  farmacia_id: number;

  @IsString()
  @IsByteLength(0, 20)
  numero_orden?: string;

  @IsDate()
  fecha_dispensacion: Date;

  @IsString()
  @IsByteLength(0, 17)
  identificacion_dispensador: string;

  @IsString()
  @IsByteLength(0, 50)
  dispensador: string;

  @IsString()
  @IsByteLength(0, 100)
  observacion?: string;

  // @IsNumber()
  // fuente_datos_id?: number;

  @IsString()
  @IsByteLength(0, 17)
  identificador_receptor?: string;

  @IsString()
  @IsByteLength(0, 100)
  receptor?: string;

  @IsNumber()
  valor_total: number;
}

export class UpdateDispensacionDto extends PartialType(CreateDispensacionDto) {
  @IsNumber()
  id: number;
}
