import { EntityRepository, Repository } from 'typeorm';
import { TipoLabAnalisisClinico } from '../entities/tipo-lab-analisis-clinico.entity';
import { Constantes } from '../../../config/constantes';

@EntityRepository(TipoLabAnalisisClinico)
export class TipoLabAnalisisClinicoRepository extends Repository<TipoLabAnalisisClinico> {
  async getTipoLabAnalisisClinicoPorId(id: number) {
    return await this.findOne({
      where: {
        id: id,
        activo: Constantes.ESTADO_GENERAL_ACTIVO,
      },
    });
  }
}
