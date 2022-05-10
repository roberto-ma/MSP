import { EntityRepository, Repository } from 'typeorm';
import { Interacciones } from '../entities/interacciones.entity';
import { Constantes } from '../../../config/constantes';

@EntityRepository(Interacciones)
export class InteraccionesRepository extends Repository<Interacciones> {
  async getInteraccionesPorId(id: number) {
    return await this.findOne({
      where: {
        id: id,
        activo: Constantes.ESTADO_GENERAL_ACTIVO,
      },
    });
  }
}
