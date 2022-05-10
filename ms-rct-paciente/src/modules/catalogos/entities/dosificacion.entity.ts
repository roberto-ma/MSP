import { Column, Entity, Index, OneToMany } from 'typeorm';
import { Medicamento } from './medicamento.entity';

@Index('PK_DOSIFICACION', ['id'], { unique: true })
@Entity({ name: 'DOSIFICACION', schema: 'SOA_CATALOGOS' })
export class Dosificacion {
  @Column('number', { primary: true, name: 'ID', precision: 5, scale: 0 })
  id: number;

  @Column('varchar2', { name: 'DOSIFICACION', length: 2000 })
  dosificacion: string;

  @Column('varchar2', { name: 'DOSIFICACION2', length: 2000, nullable: true })
  dosificacion2?: string;

  @OneToMany(() => Medicamento, (medicamento) => medicamento.dosificacion)
  medicamentos: Medicamento[];

  @Column('number', { name: 'VERSION' })
  version: number;

  @Column('number', { name: 'ACTIVO' })
  activo: number;
}
