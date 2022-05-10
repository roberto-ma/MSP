import { IsByteLength, IsString, IsNumber } from 'class-validator';

export class CreatePersonaRecetaDto {
  @IsNumber()
  tipo_identificacion_id: number;

  @IsString()
  @IsByteLength(0, 17)
  identificacion: string;
}
