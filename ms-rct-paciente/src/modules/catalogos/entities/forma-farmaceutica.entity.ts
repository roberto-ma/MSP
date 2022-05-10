import { Column, Entity, Index, OneToMany } from 'typeorm';
import { Medicamento } from './medicamento.entity';

@Index('PK_FORMA_FARMACEUTICA', ['id'], { unique: true })
@Entity({ name: 'FORMAFARMACEUTICA', schema: 'SOA_CATALOGOS' })
export class FormaFarmaceutica {
  @Column('number', { primary: true, name: 'ID', precision: 5, scale: 0 })
  id: number;

  @Column('varchar2', { name: 'FORMAFARMACEUTICA', length: 100 })
  formaFarmaceutica: string;

  @Column('varchar2', { name: 'DESCRIPCION', length: 50, nullable: true })
  descripcion: string;

  @Column('varchar2', { name: 'CODIGO', length: 50, nullable: true })
  codigo: string;

  @Column('number', { name: 'VERSION' })
  version: number;

  @Column('number', { name: 'ACTIVO' })
  activo: number;

  @OneToMany(() => Medicamento, (medicamento) => medicamento.formaFarmaceutica)
  medicamentos: Medicamento[];
}
