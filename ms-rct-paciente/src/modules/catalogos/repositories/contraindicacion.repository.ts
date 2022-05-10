import { EntityRepository, Repository } from 'typeorm';
import { Cie } from '../entities/cie.entity';
import { Contraindicacion } from '../entities/contraindicacion.entity';
import { Constantes } from '../../../config/constantes';

@EntityRepository(Contraindicacion)
export class ContraindicacionRepository extends Repository<Contraindicacion> {
  async getContraindicacionPorId(id: number) {
    return await this.findOne({
      where: {
        id: id,
        activo: Constantes.ESTADO_GENERAL_ACTIVO,
      },
    });
  }

  async getContraindicacionTodos() {
    return await this.find({});
  }
}
