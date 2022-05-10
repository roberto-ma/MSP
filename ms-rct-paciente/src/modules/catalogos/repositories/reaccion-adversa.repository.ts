import { EntityRepository, Repository } from 'typeorm';
import { ReaccionAdversa } from '../entities/reaccion-adversa.entity';
import { Constantes } from '../../../config/constantes';

@EntityRepository(ReaccionAdversa)
export class ReaccionAdversaRepository extends Repository<ReaccionAdversa> {
  async getReaccionAdversaPorId(id: number) {
    return await this.findOne({
      where: {
        id: id,
        activo: Constantes.ESTADO_GENERAL_ACTIVO,
      },
    });
  }
}
