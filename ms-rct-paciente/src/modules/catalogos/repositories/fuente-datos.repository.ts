import { EntityRepository, Repository } from 'typeorm';
import { FuenteDatos } from '../entities/fuente-datos.entity';
import { Constantes } from '../../../config/constantes';

@EntityRepository(FuenteDatos)
export class FuenteDatosRepository extends Repository<FuenteDatos> {
  async getFuenteDatosPorId(id: number) {
    return await this.findOne({
      where: {
        id: id,
        activo: Constantes.ESTADO_GENERAL_ACTIVO,
      },
    });
  }

  async getFuenteDatosTodos() {
    return await this.find({});
  }
}
