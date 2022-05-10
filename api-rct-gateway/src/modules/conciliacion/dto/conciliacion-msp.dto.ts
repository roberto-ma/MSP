import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsString,
  IsPositive,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateConciliacionMspDto {
  @ApiProperty()
  @IsString()
  zona: string;

  @ApiProperty()
  @IsString()
  ruc: string;

  @ApiProperty()
  @IsNumber()
  idEstablecimiento: number;

  @ApiProperty()
  @IsString()
  codigoCuadre: string;

  @ApiProperty({ example: '2022-03-29' })
  @Matches('\\d{4}-\\d{2}-\\d{2}')
  @MinLength(10)
  @MaxLength(10)
  fechaConciliacion: string;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  totalOrdenes: number;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  totalItems: number;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  totalValor: number;

  @ApiProperty()
  @IsNumber()
  codigoVerificacion: number;
}
