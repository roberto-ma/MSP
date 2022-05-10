import { EntityRepository, Repository } from 'typeorm';
import { LugarGeografico } from '../entities/lugar-geografico.entity';
import { Constantes } from '../../../config/constantes';

@EntityRepository(LugarGeografico)
export class LugarGeograficoRepository extends Repository<LugarGeografico> {
  async getLugarGeograficoPorId(id: number) {
    return await this.findOne({
      where: {
        id: id,
        activo: Constantes.ESTADO_GENERAL_ACTIVO,
      },
    });
  }

  async getLugarGeograficoPorCodigoPras(codigoPras: string) {
    return await this.findOne({
      where: {
        codigoPras: codigoPras,
        activo: Constantes.ESTADO_GENERAL_ACTIVO,
      },
    });
  }
}
