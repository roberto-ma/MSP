import { Column, Entity, Index, OneToMany } from 'typeorm';
import { Medicamento } from './medicamento.entity';

@Index('PK_INTERACCIONES', ['id'], { unique: true })
@Entity({ name: 'INTERACCION', schema: 'SOA_CATALOGOS' })
export class Interacciones {
  @Column('number', { primary: true, name: 'ID', precision: 5, scale: 0 })
  id: number;

  @Column('varchar2', { name: 'INTERACCION1', length: 4000 })
  interaccion1: string;

  @Column('varchar2', { name: 'INTERACCION2', length: 4000, nullable: true })
  interaccion2: string;

  @Column('number', { name: 'VERSION' })
  version: number;

  @Column('number', { name: 'ACTIVO' })
  activo: number;

  @OneToMany(() => Medicamento, (medicamento) => medicamento.interacciones)
  medicamentos: Medicamento[];
}
