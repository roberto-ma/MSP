import { Injectable } from '@nestjs/common';
import { registerDecorator } from 'class-validator';
import { ValidationOptions, ValidatorConstraint } from 'class-validator';
import { ValidatorConstraintInterface } from 'class-validator';

import { Constantes } from '../config/constantes';

@ValidatorConstraint({ name: 'IsOidReceta', async: true })
@Injectable()
export class IsOidRecetaFormatoRule implements ValidatorConstraintInterface {
  async validate(value: string) {
    const arrOid = value.split('.');
    if (
      (arrOid?.length == Constantes.OID_RECETA_ARRAY_LENGTH,
      arrOid[0] == Constantes.OID_RECETA_MSP &&
        arrOid[0].length == Constantes.OID_RECETA_LENGTH_SEGMENTO1 &&
        arrOid[1].length == Constantes.OID_RECETA_LENGTH_SEGMENTO2 &&
        arrOid[2].length == Constantes.OID_RECETA_LENGTH_SEGMENTO3)
    ) {
      return true;
    } else {
      return false;
    }
  }
  defaultMessage() {
    return `OID format should be 'x.xxxxxx.xxxxxxxx', length: 1-6-8`;
  }
}

export function IsOidRecetaFormato(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsOidRecetaFormato',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: IsOidRecetaFormatoRule,
    });
  };
}
