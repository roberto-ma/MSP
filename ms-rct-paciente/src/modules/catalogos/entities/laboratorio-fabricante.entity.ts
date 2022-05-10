import { Column, Entity, Index, OneToMany } from 'typeorm';
import { Medicamento } from './medicamento.entity';

@Index('PK_LABORATORIOFABRICANTE', ['id'], { unique: true })
@Entity({ name: 'LABORATORIOFABRICANTE', schema: 'SOA_SISTEMA' })
export class LaboratorioFabricante {
  @Column('number', { primary: true, name: 'ID', precision: 5, scale: 0 })
  id: number;

  @Column('varchar2', { name: 'LABORATORIOFABRICANTE', length: 100 })
  laboratorioFabricante: string;

  @Column('number', { name: 'VERSION' })
  version: number;

  @Column('number', { name: 'ACTIVO' })
  activo: number;

  @OneToMany(
    () => Medicamento,
    (medicamento) => medicamento.laboratorioFabricante,
  )
  medicamentos: Medicamento[];
}
