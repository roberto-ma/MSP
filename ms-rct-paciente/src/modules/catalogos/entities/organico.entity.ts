import { Column, Entity, Index, OneToMany } from 'typeorm';
import { Establecimiento } from './establecimiento.entity';

@Index('PK_ORGANICO', ['id'], { unique: true })
@Entity({ name: 'ORGANICO', schema: 'SOA_CATALOGOS' })
export class Organico {
  @Column('number', { primary: true, name: 'ID', precision: 5, scale: 0 })
  id: number;
  @Column('char', { name: 'CODIGOCIRCUITO', length: 10 })
  codigoCircuito: string;

  @Column('varchar2', { name: 'CIRCUITO', length: 200 })
  circuito: string;

  @Column('char', { name: 'CODIGODISTRITO', length: 6 })
  codigoDistrito: string;

  @Column('varchar2', { name: 'DISTRITO', length: 300 })
  distrito: string;

  @Column('char', { name: 'CODIGOZONA', length: 3 })
  codigoZona: string;

  @Column('number', { name: 'VERSION' })
  version: number;

  @Column('number', { name: 'ACTIVO' })
  activo: number;

  @OneToMany(
    () => Establecimiento,
    (establecimiento) => establecimiento.organico,
  )
  establecimientos: Establecimiento[];
}
