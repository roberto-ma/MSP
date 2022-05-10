/**
 * @ Author: Roberto Maldonado
 * @ Create Time: 2022-05-03 16:50:00
 * @ Description:
 */

import { EntityRepository, Repository } from 'typeorm';
import { RecetaA } from '../entities/receta.entity';
import { Constantes } from '../../../config/constantes';

@EntityRepository(RecetaA)
export class RecetaReImpRepository extends Repository<RecetaA> {
  async getRecetaActivaTodos(Identificador: number) {
    const BusquedaR = await this.createQueryBuilder('re')
      .select([
        're.numero_receta',
        're.fecha_receta',
        'p.residencia',
        'pe.nombres',
        'pe.apellidos',
        'pe.identificacion',
        'ti.tipoAtencion',
        'ps.especialidad_id',
        'es.especialidad',
        'nper.nombres',
        'nper.apellidos',
        'est.nombreOficial',
      ])
      .innerJoin('re.paciente', 'p')
      .innerJoin('p.persona', 'pe')
      .innerJoin('re.tipoAtencion', 'ti')
      .innerJoin('re.prescriptor', 'ps') //
      .innerJoin('ps.especialidad', 'es')
      .innerJoin('ps.persona', 'nper')
      .innerJoin('re.establecimiento', 'est')
      .where('pe.IDENTIFICACION = :id')
      .andWhere('re.activo= :activo')
      .setParameter('id', Identificador)
      .setParameter('activo', Constantes.ESTADO_GENERAL_ACTIVO)
      .getMany();
    //console.log(a[0]);
    return BusquedaR;
  }
}
