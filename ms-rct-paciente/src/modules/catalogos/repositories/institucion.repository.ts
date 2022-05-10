import { EntityRepository, Repository } from 'typeorm';
import { Institucion } from '../entities/institucion.entity';
import { Constantes } from '../../../config/constantes';

@EntityRepository(Institucion)
export class InstitucionRepository extends Repository<Institucion> {
  async getInstitucionPorId(id: number) {
    return await this.findOne({
      where: {
        id: id,
        activo: Constantes.ESTADO_GENERAL_ACTIVO,
      },
    });
  }
}
