import { Column, Entity, Index } from 'typeorm';

@Index('PK_DOSIS', ['id'], { unique: true })
@Entity({ name: 'DOSISMEDIDA', schema: 'SOA_CATALOGOS' })
export class DosisMedida {
  @Column('number', { primary: true, name: 'ID', precision: 2, scale: 0 })
  id: number;

  @Column('varchar2', { name: 'DOSISMEDIDA', length: 20 })
  dosisMedida: string;

  @Column('varchar2', { name: 'UNIDAD', length: 10 })
  unidad: string;

  @Column('number', { name: 'VERSION' })
  version: number;

  @Column('number', { name: 'ACTIVO' })
  activo: number;
}
