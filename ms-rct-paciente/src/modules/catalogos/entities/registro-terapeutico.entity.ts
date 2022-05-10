import { Column, Entity, Index, OneToMany } from 'typeorm';
import { Medicamento } from './medicamento.entity';

@Index('PK_REGISTROTERAPEUTICO', ['id'], { unique: true })
@Entity({ name: 'REGISTROTERAPEUTICO', schema: 'SOA_CATALOGOS' })
export class RegistroTerapeutico {
  @Column('number', { primary: true, name: 'ID', precision: 5, scale: 0 })
  id: number;

  @Column('varchar2', { name: 'REGISTROTERAPEUTICO', length: 2000 })
  registroTerapeutico: string;

  @OneToMany(
    () => Medicamento,
    (medicamento) => medicamento.registroTerapeutico,
  )
  medicamentos: Medicamento[];

  @Column('number', { name: 'VERSION' })
  version: number;

  @Column('number', { name: 'ACTIVO' })
  activo: number;
}
