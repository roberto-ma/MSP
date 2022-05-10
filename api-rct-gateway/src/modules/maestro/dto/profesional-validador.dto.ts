import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import { IsByteLength, IsNumber, IsOptional, IsString } from 'class-validator';
import { ReadPersonaDto, ReadPersonaValidadorDto } from './persona.dto';

export class ReadProfesionalSaludValDto {
  @Expose()
  @Type(() => ReadPersonaValidadorDto)
  persona: ReadPersonaValidadorDto;
}
