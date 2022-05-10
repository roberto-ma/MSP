import { EntityRepository, Repository } from 'typeorm';
import { RegistroTerapeutico } from '../entities/registro-terapeutico.entity';
import { Constantes } from '../../../config/constantes';

@EntityRepository(RegistroTerapeutico)
export class RegistroTerapeuticoRepository extends Repository<RegistroTerapeutico> {
  async getRegistroTerapeuticoPorId(id: number) {
    return await this.findOne({
      where: {
        id: id,
        activo: Constantes.ESTADO_GENERAL_ACTIVO,
      },
    });
  }
}
