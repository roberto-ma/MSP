/**
 * @ Author: Anthony Loyaga
 * @ Create Time: 2022-02-15 11:16:07
 * @ Modified by: Gustavo Panchi
 * @ Modified time: 2022-05-03 13:32:27
 * @ Description:
 */
import { Injectable, Logger } from '@nestjs/common';
import { Constantes } from '../../../config/constantes';

import { PersonaService } from '../services/persona.service';
import { RegistroCivilSoapService } from './registro-civil-soap.service';
import { parseName } from './strings.helper';

@Injectable()
export class PersonaSoapService {
  constructor(
    private readonly personaService: PersonaService,
    private readonly registroCivilSoap: RegistroCivilSoapService,
  ) {}
  async getPersonaFromRegistroCivil(cedula: string) {
    try {
      const responseSoap = await this.registroCivilSoap.soapBusquedaPorNui(
        cedula,
      );

      const persona = await this.personaService.create();

      if (responseSoap.CodigoMensaje == '000') {
        const ciudadano = responseSoap.Ciudadano;

        persona.identificacion = cedula;
        const nombreParsed = parseName(ciudadano.Nombre as string);
        const fechaNacimiento = ciudadano.FechaNacimiento as string;

        const sexo = ciudadano.Sexo as string;
        const estadopersona = ciudadano.CondicionCedulado as string;

        if (nombreParsed != null && nombreParsed.length == 3) {
          persona.apellidos =
            (nombreParsed[0] ? nombreParsed[0] : null) +
            (nombreParsed[1] ? ' ' + nombreParsed[1] : null);

          persona.nombres = nombreParsed[2] ? nombreParsed[2] : null;
        }
        if (
          nombreParsed != null &&
          (nombreParsed.length >= 5 || nombreParsed.length <= 3)
        ) {
          persona.nombres = ciudadano.Nombre;
        }
        if (nombreParsed != null && nombreParsed.length == 4) {
          persona.apellidos =
            (nombreParsed[0] ? nombreParsed[0] : null) +
            (nombreParsed[1] ? ' ' + nombreParsed[1] : null);

          persona.nombres =
            (nombreParsed[2] ? nombreParsed[2] : null) +
            (nombreParsed[3] ? ' ' + nombreParsed[3] : null);
        }

        persona.fecha_nacimiento = fechaNacimiento
          ? await this.parseFechaNacimiento(fechaNacimiento)
          : null;

        persona.sexo =
          sexo != null
            ? sexo == Constantes.CT_SEXO_HOMBRE_REGISTRO_CIVIL
              ? Constantes.CT_SEXO_HOMBRE_ID_RECETA
              : Constantes.CT_SEXO_MUJER_ID_RECETA
            : null;

        persona.vivo =
          estadopersona != null
            ? estadopersona != Constantes.CT_CONDICION_PERSONA_FALLECIDO
              ? Constantes.ESTADO_GENERAL_ACTIVO
              : Constantes.ESTADO_GENERAL_INACTIVO
            : null;

        return persona;
      }
      return null;
    } catch (error) {
      const errorCode = 'WSDL Registro Civil - Sin Respuesta';
      Logger.error(errorCode, error.message, error.name);
      return null;
    }
  }

  async parseFechaNacimiento(fechaNacimiento: string) {
    const fechaNacimientoArray = fechaNacimiento.split('/');
    const dateFechaNaciemiento = new Date(
      fechaNacimientoArray[2] +
        '-' +
        fechaNacimientoArray[1] +
        '-' +
        fechaNacimientoArray[0],
    );
    return dateFechaNaciemiento;
  }
}
