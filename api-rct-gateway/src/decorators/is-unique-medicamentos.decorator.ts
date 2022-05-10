import { Injectable } from '@nestjs/common';
import { ValidationOptions, ValidatorConstraint } from 'class-validator';
import { registerDecorator, ValidationArguments } from 'class-validator';
import { ValidatorConstraintInterface } from 'class-validator';
import { CreateRecetaDetalleDto } from '../modules/receta/dto/receta-detalle.dto';

@ValidatorConstraint({ name: 'IsUniqueMedicamentos', async: true })
@Injectable()
export class IsUniqueMedicamentosRule implements ValidatorConstraintInterface {
  async validate(value: CreateRecetaDetalleDto[]) {
    const unicos = [
      ...new Set(value.map((item) => item.medicamento_id)),
    ] as number[];
    if (unicos.length == value.length) return true;
    return false;
  }
  defaultMessage(args: ValidationArguments) {
    return `recetaDetalle should have unique medicamento_id`;
  }
}

export function IsUniqueMedicamentos(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsUniqueMedicamentos',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: IsUniqueMedicamentosRule,
    });
  };
}
