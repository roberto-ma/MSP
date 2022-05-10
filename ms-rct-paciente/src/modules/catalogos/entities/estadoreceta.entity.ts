import { Column, Entity, Index } from 'typeorm';

@Index('PK_ESTADO', ['id'], { unique: true })
@Entity({ name: 'ESTADORECETA', schema: 'SOA_CATALOGOS' })
export class Estado {
  @Column('number', { primary: true, name: 'ID', precision: 1, scale: 0 })
  id: number;

  @Column('varchar2', { name: 'ESTADO', length: 15 })
  estado: string;

  @Column('number', { name: 'VERSION' })
  version: number;

  @Column('number', { name: 'ACTIVO' })
  activo: number;
}
