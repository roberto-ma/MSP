import { EntityRepository, Repository } from 'typeorm';
import { Constantes } from '../../../config/constantes';
import { ProfsaludEstablecimiento } from '../entities/profsalud-establecimiento.entity';

@EntityRepository(ProfsaludEstablecimiento)
export class ProfsaludEstablecimientoRepository extends Repository<ProfsaludEstablecimiento> {
  async getProfsaludEstablecimientoPorProfesionalIdER(
    profesionalSaludId: number,
  ) {
    return await this.find({
      where: {
        personaId: profesionalSaludId,
        activo: Constantes.ESTADO_GENERAL_ACTIVO,
      },
    });
  }
}
