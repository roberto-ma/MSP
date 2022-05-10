import { Constantes } from '../../../config/constantes';
import { EntityRepository, Repository } from 'typeorm';
import { Persona } from '../entities/persona.entity';

@EntityRepository(Persona)
export class PersonaRepository extends Repository<Persona> {
  async getPersonaPorIdER(personaId: number) {
    return await this.findOne({
      where: {
        id: personaId,
        activo: Constantes.ESTADO_GENERAL_ACTIVO,
        vivo: Constantes.ESTADO_GENERAL_ACTIVO,
      },
    });
  }

  async getPersonaPorIdentificacionER(personaIdentificacion: string) {
    return await this.findOne({
      where: {
        identificacion: personaIdentificacion,
        vivo: Constantes.ESTADO_GENERAL_ACTIVO,
        activo: Constantes.ESTADO_GENERAL_ACTIVO,
      },
    });
  }
}
