import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class InputDto {
  @ApiProperty()
  @IsString()
  data: string;
}
export class InputEntidadSaludDto {
  @ApiProperty()
  @IsNumber()
  fuentedatos: number;

  @ApiProperty()
  @IsString()
  data: string;
}

export class InputFarmaciaDto {
  @ApiProperty()
  @IsNumber()
  cadenafarmacia: number;

  @ApiProperty()
  @IsString()
  data: string;
}

export class InputDecrypt {
  @ApiProperty()
  @IsString()
  data: string;
}
