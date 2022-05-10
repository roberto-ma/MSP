import { EntityRepository, Repository } from 'typeorm';
import { Cie } from '../entities/cie.entity';
import { Constantes } from '../../../config/constantes';

@EntityRepository(Cie)
export class CieRepository extends Repository<Cie> {
  async getCiePorId(cieId: number) {
    return await this.findOne({
      where: {
        id: cieId,
        activo: Constantes.ESTADO_GENERAL_ACTIVO,
      },
    });
  }

  async getCiePorCodigo(codigoCie: string) {
    return await this.findOne({
      where: {
        codigoCie: codigoCie,
        activo: Constantes.ESTADO_GENERAL_ACTIVO,
      },
    });
  }
}
