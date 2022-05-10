import { Column, Entity, Index } from 'typeorm';

@Index('PK_ETNIA', ['id'], { unique: true })
@Entity({ name: 'ETNIA', schema: 'SOA_CATALOGOS' })
export class Etnia {
  @Column('number', { primary: true, name: 'ID', precision: 2, scale: 0 })
  id: number;

  @Column('varchar2', { name: 'ETNIA', length: 30 })
  etnia: string;

  @Column('number', {
    name: 'CODIGOPRAS',
    precision: 3,
    scale: 0,
    nullable: true,
  })
  codigoPras: number;

  @Column('number', { name: 'VERSION' })
  version: number;

  @Column('number', { name: 'ACTIVO' })
  activo: number;
}
