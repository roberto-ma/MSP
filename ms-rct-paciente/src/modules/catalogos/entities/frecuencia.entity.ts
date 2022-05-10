import { Column, Entity, Index } from 'typeorm';

@Index('PK_FRECUENCIA', ['id'], { unique: true })
@Entity({ name: 'FRECUENCIA', schema: 'SOA_CATALOGOS' })
export class Frecuencia {
  @Column('number', { primary: true, name: 'ID', precision: 2, scale: 0 })
  id: number;

  @Column('varchar2', { name: 'FRECUENCIA', length: 30 })
  frecuencia: string;

  @Column('varchar2', { name: 'NUMEROVECES', nullable: true, length: 15 })
  numeroVeces: string | null;

  @Column('number', { name: 'VERSION' })
  version: number;

  @Column('number', { name: 'ACTIVO' })
  activo: number;
}
