import { Column, Entity, Index, OneToMany } from 'typeorm';
import { Establecimiento } from './establecimiento.entity';

@Index('PK_TIPOESTABLECIMIENTO', ['id'], { unique: true })
@Entity({ name: 'TIPOESTABLECIMIENTO', schema: 'SOA_CATALOGOS' })
export class TipoEstablecimiento {
  @Column('number', { primary: true, name: 'ID', precision: 2, scale: 0 })
  id: number;

  @Column('varchar2', { name: 'TIPOESTABLECIMIENTO', length: 100 })
  tipoEstablecimiento: string;

  @Column('varchar2', {
    name: 'NIVELESTABLECIMIENTO',
    nullable: true,
    length: 10,
  })
  nivelEstablecimiento?: string | null;

  @OneToMany(
    () => Establecimiento,
    (establecimiento) => establecimiento.tipoEstablecimiento,
  )
  establecimientos: Establecimiento[];

  @Column('number', { name: 'VERSION' })
  version: number;

  @Column('number', { name: 'ACTIVO' })
  activo: number;
}
