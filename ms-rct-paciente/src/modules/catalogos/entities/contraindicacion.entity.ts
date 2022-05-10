import { Column, Entity, Index, OneToMany } from 'typeorm';
import { Medicamento } from './medicamento.entity';

@Index('PK_CONTRAINDICACION', ['id'], { unique: true })
@Entity({ name: 'CONTRAINDICACION', schema: 'SOA_CATALOGOS' })
export class Contraindicacion {
  @Column('number', { primary: true, name: 'ID', precision: 5, scale: 0 })
  id: number;

  @Column('varchar2', { name: 'CONTRAINDICACION', length: 2000 })
  contraindicacion: string;

  @Column('number', { name: 'VERSION' })
  version: number;

  @Column('number', { name: 'ACTIVO' })
  activo: number;

  @OneToMany(() => Medicamento, (medicamento) => medicamento.contraindicacion)
  medicamentos: Medicamento[];
}
