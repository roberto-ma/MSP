import { Column, Entity, Index, OneToMany } from 'typeorm';
import { Medicamento } from './medicamento.entity';

@Index('PK_PRESENTACION', ['id'], { unique: true })
@Entity({ name: 'PRESENTACION', schema: 'SOA_CATALOGOS' })
export class Presentacion {
  @Column('number', { primary: true, name: 'ID', precision: 5, scale: 0 })
  id: number;

  @Column('varchar2', { name: 'PRESENTACION', length: 30 })
  presentacion: string;

  @OneToMany(() => Medicamento, (medicamento) => medicamento.presentacion)
  medicamentos: Medicamento[];

  @Column('number', { name: 'VERSION' })
  version: number;

  @Column('number', { name: 'ACTIVO' })
  activo: number;
}
