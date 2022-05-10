import { Column, Entity, Index, OneToMany } from 'typeorm';
import { Medicamento } from './medicamento.entity';

@Index('PK_CNMB', ['id'], { unique: true })
@Entity({ name: 'INDICACIONESCNMB', schema: 'SOA_CATALOGOS' })
export class IndicacionesCnmb {
  @Column('number', { primary: true, name: 'ID', precision: 5, scale: 0 })
  id: number;

  @Column('varchar2', { name: 'INDICACIONCNMB', length: 2000 })
  indicacionCnmb: string;

  @Column('number', { name: 'VERSION' })
  version: number;

  @Column('number', { name: 'ACTIVO' })
  activo: number;

  @OneToMany(() => Medicamento, (medicamento) => medicamento.indicacionesCnmb)
  medicamentos: Medicamento[];
}
