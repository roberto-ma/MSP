import { EntityRepository, Repository } from 'typeorm';
import { ServicioSalud } from '../entities/servicio-salud.entity';
import { Constantes } from '../../../config/constantes';

@EntityRepository(ServicioSalud)
export class ServicioSaludRepository extends Repository<ServicioSalud> {
  async getServicioSaludPorId(id: number) {
    return await this.findOne({
      where: {
        id: id,
        activo: Constantes.ESTADO_GENERAL_ACTIVO,
      },
    });
  }
}
