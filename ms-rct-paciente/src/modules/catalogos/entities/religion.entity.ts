import { Column, Entity, Index } from 'typeorm';

@Index('PK_RELIGION', ['id'], { unique: true })
@Entity({ name: 'RELIGION', schema: 'SOA_CATALOGOS' })
export class Religion {
  @Column('number', { primary: true, name: 'ID', precision: 2, scale: 0 })
  id: number;

  @Column('varchar2', { name: 'RELIGION', length: 30 })
  religion: string;

  @Column('number', {
    name: 'CODIGOPRAS',
    precision: 4,
    scale: 0,
    nullable: true,
  })
  codigoPras: number;

  @Column('number', { name: 'VERSION' })
  version: number;

  @Column('number', { name: 'ACTIVO' })
  activo: number;
}
