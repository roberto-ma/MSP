import { Column, Entity, Index, OneToMany } from 'typeorm';
import { Medicamento } from './medicamento.entity';

@Index('PK_REACCIONADVERSA', ['id'], { unique: true })
@Entity({ name: 'REACCIONADVERSA', schema: 'SOA_CATALOGOS' })
export class ReaccionAdversa {
  @Column('number', { primary: true, name: 'ID', precision: 5, scale: 0 })
  id: number;

  @Column('varchar2', { name: 'REACCIONADVERSA', length: 2000 })
  reaccionAdversa: string;

  @OneToMany(() => Medicamento, (medicamento) => medicamento.reaccionAdversa)
  medicamentos: Medicamento[];

  @Column('number', { name: 'VERSION' })
  version: number;

  @Column('number', { name: 'ACTIVO' })
  activo: number;
}
