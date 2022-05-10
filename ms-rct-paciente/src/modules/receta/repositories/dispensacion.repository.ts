import { EntityRepository, Repository } from 'typeorm';
import { Dispensacion } from '../entities/dispensacion.entity';
import { Constantes } from '../../../config/constantes';

@EntityRepository(Dispensacion)
export class DispensacionRepository extends Repository<Dispensacion> {
  async getDispensacionPorIdER(dispensacionId: number) {
    return await this.findOne({
      where: {
        id: dispensacionId,
        activo: Constantes.ESTADO_GENERAL_ACTIVO,
      },
    });
  }

  async getDispensacionPorOidER(recetaOid: string) {
    return await this.findOne({
      where: {
        receta_oid: recetaOid,
        activo: Constantes.ESTADO_GENERAL_ACTIVO,
      },
    });
  }

  async getDispensacionPorOidConRecetaER(recetaOid: string) {
    return await this.createQueryBuilder('dprct')
      .innerJoinAndSelect('dprct.receta', 'rct')
      .innerJoinAndSelect('rct.recetaDetalle', 'rctdt')
      .innerJoinAndSelect('rct.paciente', 'pc')
      .innerJoinAndSelect('pc.persona', 'pr')
      .where('dprct.receta_oid = :recetaOid')
      .setParameter('recetaOid', recetaOid)
      .getOne();
  }
}
