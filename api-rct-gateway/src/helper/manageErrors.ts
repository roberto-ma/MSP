import {
  BadRequestException,
  ConflictException,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Constantes } from './../config/constantes';

export function manageErrors(nombreMS: string, err: any) {
  const error = err?.error;

  // Error: 500. InternalServerErrorException (Por defecto)
  if (!error)
    throw new InternalServerErrorException(
      `${nombreMS}: ${Constantes.ERROR_COMUNICACION_MICROSERVICIO}`,
    );

  if (
    !error ||
    !error?.statusCode ||
    error?.statusCode == HttpStatus.INTERNAL_SERVER_ERROR
  )
    throw new InternalServerErrorException(`${nombreMS}: ${error?.message}`);

  // Error: 402. NotFoundException
  if (error?.statusCode == HttpStatus.NOT_FOUND)
    throw new NotFoundException(`${nombreMS}: ${error.message}`);

  // Error: 409. ConflictException
  if (error?.statusCode == HttpStatus.CONFLICT)
    throw new ConflictException(`${nombreMS}: ${error.message}`);

  // Error: 400. BadRequestException
  if (error?.statusCode == HttpStatus.BAD_REQUEST)
    throw new BadRequestException(`${nombreMS}: ${error.message}`);

  // Error: 401. UnauthorizedException
  if (error?.statusCode == HttpStatus.UNAUTHORIZED)
    throw new UnauthorizedException(`${nombreMS}: ${error.message}`);
}
