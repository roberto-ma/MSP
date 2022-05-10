import { Column, Entity, Index, OneToMany } from 'typeorm';
import { Medicamento } from './medicamento.entity';

@Index('OBSERVACION_PK', ['id'], { unique: true })
@Entity({ name: 'OBSERVACIONMEDICAMENTO', schema: 'SOA_CATALOGOS' })
export class Observacion {
  @Column('number', { primary: true, name: 'ID', precision: 5, scale: 0 })
  id: number;

  @Column('varchar2', { name: 'OBSERVACION', length: 2000 })
  observacion: string;

  @OneToMany(() => Medicamento, (medicamento) => medicamento.observacion)
  medicamentos: Medicamento[];
}
