import { Column, Entity, Index } from 'typeorm';

@Index('PK_ROLPROFESIONAL', ['id'], { unique: true })
@Entity({ name: 'ROLPROFESIONAL', schema: 'SOA_CATALOGOS' })
export class RolProfesional {
  @Column('number', { primary: true, name: 'ID', precision: 1, scale: 0 })
  id: number;

  @Column('varchar2', { name: 'ROLPROFESIONAL', length: 30 })
  rolProfesional: string;

  @Column('number', { name: 'VERSION' })
  version: number;

  @Column('number', { name: 'ACTIVO' })
  activo: number;
}
