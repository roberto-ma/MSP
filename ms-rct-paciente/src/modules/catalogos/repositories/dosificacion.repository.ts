import { EntityRepository, Repository } from 'typeorm';
import { Cie } from '../entities/cie.entity';
import { Dosificacion } from '../entities/dosificacion.entity';
import { Constantes } from '../../../config/constantes';

@EntityRepository(Dosificacion)
export class DosificacionRepository extends Repository<Dosificacion> {
  async getDosificacionPorId(id: number) {
    return await this.findOne({
      where: {
        id: id,
        activo: Constantes.ESTADO_GENERAL_ACTIVO,
      },
    });
  }
}
