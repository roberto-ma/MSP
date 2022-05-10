import { EntityRepository, Repository } from 'typeorm';
import { Producto } from '../entities/producto.entity';
import { Constantes } from '../../../config/constantes';

@EntityRepository(Producto)
export class ProductoRepository extends Repository<Producto> {
  async getProductoPorId(id: number) {
    return await this.findOne({
      where: {
        id: id,
        activo: Constantes.ESTADO_GENERAL_ACTIVO,
      },
    });
  }
}
