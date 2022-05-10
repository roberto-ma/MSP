import { Column, Entity, Index, OneToMany } from 'typeorm';
import { Medicamento } from './medicamento.entity';

@Index('PK_NIVELPRESCRIPCION', ['id'], { unique: true })
@Entity({ name: 'NIVELPRESCRIPCION', schema: 'SOA_CATALOGOS' })
export class NivelPrescripcion {
  @Column('number', { primary: true, name: 'ID', precision: 5, scale: 0 })
  id: number;

  @Column('varchar2', { name: 'NIVELPRESCRIPCION', length: 30 })
  nivelPrescripcion: string;

  @Column('number', { name: 'VERSION' })
  version: number;

  @Column('number', { name: 'ACTIVO' })
  activo: number;

  @Column('varchar2', { name: 'DESCRIPCION', nullable: true, length: 500 })
  descripcion: string | null;

  @OneToMany(() => Medicamento, (medicamento) => medicamento.nivelPrescripcion)
  medicamentos: Medicamento[];
}
