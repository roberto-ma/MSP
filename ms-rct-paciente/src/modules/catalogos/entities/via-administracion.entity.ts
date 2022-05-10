import { Column, Entity, Index, OneToMany } from 'typeorm';
import { Medicamento } from './medicamento.entity';

@Index('PK_VIAADMINISTRACION', ['id'], { unique: true })
@Entity({ name: 'VIAADMINISTRACION', schema: 'SOA_CATALOGOS' })
export class ViaAdministracion {
  @Column('varchar2', { name: 'ABREVIATURA', nullable: true, length: 15 })
  abreviatura: string | null;

  @Column('number', { primary: true, name: 'ID', precision: 5, scale: 0 })
  id: number;

  @Column('varchar2', { name: 'VIAADMINISTRACION', length: 30 })
  viaAdministracion: string;

  @OneToMany(() => Medicamento, (medicamento) => medicamento.viaAdministracion)
  medicamentos: Medicamento[];

  @Column('number', { name: 'VERSION' })
  version: number;

  @Column('number', { name: 'ACTIVO' })
  activo: number;
}
