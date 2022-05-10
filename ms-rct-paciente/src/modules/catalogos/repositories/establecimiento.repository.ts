import { EntityRepository, Repository } from 'typeorm';
import { Establecimiento } from '../entities/establecimiento.entity';
import { Constantes } from '../../../config/constantes';

@EntityRepository(Establecimiento)
export class EstablecimientoRepository extends Repository<Establecimiento> {
  async getEstablecimientoPorId(establecimientoId: number) {
    return await this.findOne({
      where: {
        id: establecimientoId,
        activo: Constantes.ESTADO_GENERAL_ACTIVO,
      },
    });
  }

  async getEstablecimientoPorUniCodigo(unicodigo: string) {
    return await this.findOne({
      where: {
        unicodigo: unicodigo,
        activo: Constantes.ESTADO_GENERAL_ACTIVO,
      },
    });
  }

  async getEstablecimientoPorRuc(ruc: string) {
    return await this.findOne({
      where: {
        ruc: ruc,
        activo: Constantes.ESTADO_GENERAL_ACTIVO,
      },
    });
  }
}
