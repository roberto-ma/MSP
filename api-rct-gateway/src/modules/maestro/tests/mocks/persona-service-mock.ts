import { plainToClass } from 'class-transformer';
import { ReadPersonaDto } from '../../dto/persona.dto';
import { DataTest } from './data-test';

export class PersonaServiceMock {
  async getPersonaPorIdentificacion(identificacion: string) {
    const data = DataTest.DATA_PERSONA;
    const data_persona = plainToClass(ReadPersonaDto, data);
    return Promise.resolve(data_persona);
  }
}
