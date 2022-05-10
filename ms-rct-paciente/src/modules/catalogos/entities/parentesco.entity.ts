import { Column, Entity, Index } from 'typeorm';

@Index('PK_PARENTEZCO', ['id'], { unique: true })
@Entity({ name: 'PARENTESCO', schema: 'SOA_CATALOGOS' })
export class Parentesco {
  @Column('number', { primary: true, name: 'ID', precision: 2, scale: 0 })
  id: number;

  @Column('varchar2', { name: 'PARENTESCO', length: 30 })
  parentesco: string;

  @Column('number', { name: 'VERSION' })
  version: number;

  @Column('number', { name: 'ACTIVO' })
  activo: number;
}
