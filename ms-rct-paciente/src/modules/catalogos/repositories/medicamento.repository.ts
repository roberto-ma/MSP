import { EntityRepository, Repository } from 'typeorm';
import { Medicamento } from '../entities/medicamento.entity';
import { Constantes } from '../../../config/constantes';

@EntityRepository(Medicamento)
export class MedicamentoRepository extends Repository<Medicamento> {
  async getMedicamentoPorId(productoId: number) {
    return await this.findOne({
      where: {
        productoId: productoId,
        activo: Constantes.ESTADO_GENERAL_ACTIVO,
      },
    });
  }

  async getMedicamentosPorCum(cum: string) {
    return await this.find({
      where: {
        cum: cum,
        activo: Constantes.ESTADO_GENERAL_ACTIVO,
      },
    });
  }

  async getMedicamentosPorAct(act: string) {
    return await this.find({
      where: {
        act: act,
        activo: Constantes.ESTADO_GENERAL_ACTIVO,
      },
    });
  }
}
