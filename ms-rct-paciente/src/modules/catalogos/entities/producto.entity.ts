import { Column, Entity, Index, OneToOne, JoinColumn } from 'typeorm';
import { Dispositivo } from './dispositivo.entity';
import { Medicamento } from './medicamento.entity';

@Index('PK_PRODUCTO', ['id'], { unique: true })
@Entity({ name: 'PRODUCTO', schema: 'SOA_CATALOGOS' })
export class Producto {
  @Column('number', { primary: true, name: 'ID', precision: 6, scale: 0 })
  id: number;

  @Column('varchar2', { name: 'NOMBREGENERICO', length: 100 })
  nombreGenerico: string;

  @Column('varchar2', { name: 'NOMBRECOMERCIAL', length: 100 })
  nombreComercial: string;

  @Column('number', { name: 'PRECIO', precision: 10, scale: 4 })
  precio: number;

  @Column('number', { name: 'FEEPRECIO', precision: 8, scale: 4 })
  fecPrecio: number;

  @Column('number', { name: 'VERSION' })
  version: number;

  @Column('number', { name: 'EXTERNO' })
  externo: number;

  @Column('number', { name: 'ACTIVO' })
  activo: number;

  @OneToOne(() => Dispositivo, (dispositivo) => dispositivo.producto)
  dispositivo: Dispositivo;

  @OneToOne(() => Medicamento, (medicamento) => medicamento.productoM)
   medicamento: Medicamento;
}
