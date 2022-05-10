import { Injectable } from '@nestjs/common';
import { registerDecorator, ValidationArguments } from 'class-validator';
import { ValidationOptions, ValidatorConstraint } from 'class-validator';
import { ValidatorConstraintInterface } from 'class-validator';

import { CreateRecetaPrescritaDto } from '../modules/receta/dto/receta.dto';

@ValidatorConstraint({ name: 'IsOidReceta', async: true })
@Injectable()
export class IsOidRecetaRecetaEqualRule
  implements ValidatorConstraintInterface
{
  async validate(value: string, args: ValidationArguments) {
    const createRecetaPrescritaDto = args.object as CreateRecetaPrescritaDto;
    const numero_receta = createRecetaPrescritaDto.numero_receta;
    const arrOid = value.split('.');

    if (parseInt(arrOid[2]) == numero_receta) {
      return true;
    } else {
      return false;
    }
  }
  defaultMessage(args: ValidationArguments) {
    const createRecetaPrescritaDto = args.object as CreateRecetaPrescritaDto;
    const numero_receta = createRecetaPrescritaDto.numero_receta;
    const oid = createRecetaPrescritaDto.oid;
    return `Third segment of OID ${oid} should have numero_receta ${numero_receta}`;
  }
}

export function IsOidRecetaRecetaEqual(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsOidRecetaRecetaEqual',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: IsOidRecetaRecetaEqualRule,
    });
  };
}
