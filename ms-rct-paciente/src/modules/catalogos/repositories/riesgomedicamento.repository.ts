import { EntityRepository, Repository } from 'typeorm';
import { RiesgoMedicamento } from '../entities/riesgomedicamento.entity';
import { Constantes } from '../../../config/constantes';

@EntityRepository(RiesgoMedicamento)
export class RiesgoMedicamentoRepository extends Repository<RiesgoMedicamento> {
  async getRiesgoMedicamentoPorId(id: number) {
    return await this.findOne({
      where: {
        id: id,
        activo: Constantes.ESTADO_GENERAL_ACTIVO,
      },
    });
  }

  async getRiesgoMedicamentoTodos() {
    return await this.find({});
  }
}
