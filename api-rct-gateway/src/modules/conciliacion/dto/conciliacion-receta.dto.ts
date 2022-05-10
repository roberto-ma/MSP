import { IsPositive, IsString } from 'class-validator';
import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateConciliacionRecetaDto {
  @ApiProperty()
  @IsString()
  codigoUnico: string;

  @ApiProperty()
  @IsString()
  codDispensacion: string;

  @ApiProperty()
  @IsString()
  codigoCuadre: string;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  totalItems: number;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  valorOrden: number;
}

export class UpdateConciliacionRecetaDto {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsString()
  codigoUnico: string;

  @ApiProperty()
  @IsString()
  codDispensacion: string;

  @ApiProperty()
  @IsString()
  codigoCuadre: string;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  totalItems: number;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  valorOrden: number;
}
