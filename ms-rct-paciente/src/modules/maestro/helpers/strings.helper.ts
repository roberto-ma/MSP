/**
 * @ Author: Anthony Loyaga
 * @ Create Time: 2021-12-22 09:32:53
 * @ Modified by: Gustavo Panchi
 * @ Modified time: 2022-05-03 13:33:45
 */

import { Logger } from '@nestjs/common';
import { Constantes } from '../../../config/constantes';

export function parseName(fullName: string): Array<string> {
  try {
    const fullNameArray = fullName.split(' ');
    const determinativos = Constantes.DETERMINATIVOS_NOMBRES;
    const result = [];
    let nameAux = '';
    fullNameArray.forEach((simpleName) => {
      if (determinativos.includes(simpleName)) {
        nameAux = nameAux + ' ' + simpleName;
      } else {
        if (nameAux != '') {
          result.push(nameAux.trim() + ' ' + simpleName);
          nameAux = '';
        } else {
          result.push(simpleName);
        }
      }
    });
    return result;
  } catch (error) {
    const err = error as Error;
    Logger.warn(err.message, err.name);
    return null;
  }
}

export function capitalize(word: string) {
  return word[0].toUpperCase() + word.slice(1).toLowerCase();
}
