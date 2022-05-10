import { Column, Entity, Index, BeforeInsert } from 'typeorm';
import { Constantes } from '../../../config/constantes';

@Index('PROFSALUD_ESTABLECIMIENTO_PK', ['personaId', 'establecimientoId'], {
  unique: true,
})
@Entity({ schema: 'SOA_INDICE_MAESTRO', name: 'PROFSALUDESTABLECIMIENTO' })
export class ProfsaludEstablecimiento {
  @Column('number', { name: 'ACTIVO', precision: 1, scale: 0 })
  activo: number;

  @Column('number', { primary: true, name: 'ESTABLECIMIENTO_ID' })
  establecimientoId: number;

  @Column('number', { primary: true, name: 'PERSONA_ID' })
  personaId: number;

  @BeforeInsert()
  setCreateDefault() {
    this.activo = Constantes.ESTADO_GENERAL_ACTIVO;
  }
}
