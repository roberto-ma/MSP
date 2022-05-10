import { Column, Entity, Index } from 'typeorm';

@Index('PK_TARIFARIO', ['id'], { unique: true })
@Entity({ name: 'TARIFARIO', schema: 'SOA_CATALOGOS' })
export class Tarifario {
  @Column('number', { primary: true, name: 'ID', precision: 4, scale: 0 })
  id: number;

  @Column('number', { name: 'PRODUCTO_ID', precision: 6, scale: 0 })
  productoId: number;

  @Column('date', { name: 'FECHADESDE' })
  fechaDesde: Date;

  @Column('date', { name: 'FECHAHASTA' })
  fechaHasta: Date;

  @Column('number', { name: 'PRECIOUNITARIO', precision: 10, scale: 2 })
  precioUnitario: number;

  @Column('timestamp', { name: 'FECHAREGISTRO', scale: 6 })
  fechaRegistro: Date;

  @Column('varchar2', { name: 'USUARIOREGISTRO', length: 25 })
  usuarioRegistro: string;

  @Column('number', { name: 'VERSION' })
  version: number;

  @Column('number', { name: 'ACTIVO' })
  activo: number;
}
