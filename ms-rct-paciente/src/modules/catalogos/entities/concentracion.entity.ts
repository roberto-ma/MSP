import { Column, Entity, Index, OneToMany } from 'typeorm';
import { Medicamento } from './medicamento.entity';

@Index('PK_CONCENTRACION', ['id'], { unique: true })
@Entity({ name: 'CONCENTRACION', schema: 'SOA_CATALOGOS' })
export class Concentracion {
  @Column('number', { primary: true, name: 'ID', precision: 5, scale: 0 })
  id: number;

  @Column('varchar2', { name: 'CONCENTRACION', length: 30 })
  concentracion: string;

  @OneToMany(() => Medicamento, (medicamento) => medicamento.concentracion)
  medicamentos: Medicamento[];

  @Column('number', { name: 'VERSION' })
  version: number;

  @Column('number', { name: 'ACTIVO' })
  activo: number;
}
