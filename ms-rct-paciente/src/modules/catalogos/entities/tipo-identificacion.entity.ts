import { Column, Entity, Index } from 'typeorm';

@Index('PK_TIPOIDENTIFICACION', ['id'], { unique: true })
@Entity({ name: 'TIPOIDENTIFICACION', schema: 'SOA_CATALOGOS' })
export class TipoIdentificacion {
  @Column('number', { primary: true, name: 'ID', precision: 1, scale: 0 })
  id: number;

  @Column('varchar2', { name: 'TIPOIDENTIFICACION', length: 20 })
  tipoIdentificacion: string;

  @Column('number', {
    name: 'CODIGOPRAS',
    precision: 1,
    scale: 0,
    nullable: true,
  })
  codigoPras: number;

  @Column('number', { name: 'VERSION' })
  version: number;

  @Column('number', { name: 'ACTIVO' })
  activo: number;
}
