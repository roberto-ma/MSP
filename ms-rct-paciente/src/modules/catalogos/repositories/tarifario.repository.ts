import { EntityRepository, Repository } from 'typeorm';
import { Tarifario } from '../entities/tarifario.entity';
import { Constantes } from '../../../config/constantes';

@EntityRepository(Tarifario)
export class TarifarioRepository extends Repository<Tarifario> {
  async getTarifarioPorProductId(productoId: number) {
    return await this.findOne({
      where: {
        productoId: productoId,
        activo: Constantes.ESTADO_GENERAL_ACTIVO,
      },
    });
  }
}
