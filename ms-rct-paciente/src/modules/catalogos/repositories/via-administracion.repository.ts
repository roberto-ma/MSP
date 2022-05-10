import { EntityRepository, Repository } from 'typeorm';
import { ViaAdministracion } from '../entities/via-administracion.entity';
import { Constantes } from '../../../config/constantes';

@EntityRepository(ViaAdministracion)
export class ViaAdministracionRepository extends Repository<ViaAdministracion> {
  async getViaAdministracionPorId(id: number) {
    return await this.findOne({
      where: {
        id: id,
        activo: Constantes.ESTADO_GENERAL_ACTIVO,
      },
    });
  }

  async getViaAdministracionTodos() {
    return await this.find({});
  }
}
