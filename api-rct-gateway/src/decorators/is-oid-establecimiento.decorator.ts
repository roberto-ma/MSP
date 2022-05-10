import { Injectable } from '@nestjs/common';
import { CreateRecetaPrescritaDto } from '../modules/receta/dto/receta.dto';
import { ValidationOptions, ValidatorConstraint } from 'class-validator';
import { registerDecorator, ValidationArguments } from 'class-validator';
import { ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: 'IsOidReceta', async: true })
@Injectable()
export class IsOidRecetaEstablecimientoEqualRule
  implements ValidatorConstraintInterface
{
  async validate(value: string, args: ValidationArguments) {
    const createRecetaPrescritaDto = args.object as CreateRecetaPrescritaDto;
    const establecimiento_id = createRecetaPrescritaDto.establecimiento_id;
    const arrOid = value.split('.');

    if (parseInt(arrOid[1]) == establecimiento_id) {
      return true;
    } else {
      return false;
    }
  }
  defaultMessage(args: ValidationArguments) {
    const createRecetaPrescritaDto = args.object as CreateRecetaPrescritaDto;
    const establecimiento_id = createRecetaPrescritaDto.establecimiento_id;
    const oid = createRecetaPrescritaDto.oid;
    return `Second segment of OID ${oid} should have establecimiento_id ${establecimiento_id}`;
  }
}

export function IsOidRecetaEstablecimientoEqual(
  validationOptions?: ValidationOptions,
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsOidRecetaEstablecimientoEqual',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: IsOidRecetaEstablecimientoEqualRule,
    });
  };
}
