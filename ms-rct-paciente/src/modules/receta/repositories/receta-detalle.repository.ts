import { EntityRepository, Repository } from 'typeorm';
import { RecetaDetalle } from '../entities/receta-detalle.entity';

@EntityRepository(RecetaDetalle)
export class RecetaDetalleRepository extends Repository<RecetaDetalle> {
  async getRecetaDetallePorIdER(recetaDetalleId: number) {
    return await this.findOne({
      where: {
        id: recetaDetalleId,
      },
    });
  }
}
