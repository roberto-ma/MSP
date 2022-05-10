import { Column, Entity, Index, OneToMany } from 'typeorm';
import { Establecimiento } from './establecimiento.entity';

@Index('PK_INSTITUCION', ['id'], { unique: true })
@Entity({ name: 'INSTITUCION', schema: 'SOA_CATALOGOS' })
export class Institucion {
  @Column('number', { primary: true, name: 'ID', precision: 2, scale: 0 })
  id: number;

  @Column('varchar2', { name: 'INSTITUCION', length: 10 })
  institucion: string;

  @Column('number', { name: 'VERSION' })
  version: number;

  @Column('number', { name: 'ACTIVO' })
  activo: number;

  @OneToMany(
    () => Establecimiento,
    (establecimiento) => establecimiento.institucion,
  )
  establecimientos: Establecimiento[];
}
