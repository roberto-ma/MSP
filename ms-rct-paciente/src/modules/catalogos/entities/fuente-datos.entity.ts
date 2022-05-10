import { Column, Entity, Index } from 'typeorm';

@Index('PK_FUENTE_DATOS', ['id'], { unique: true })
@Entity({ name: 'FUENTEDATOS', schema: 'SOA_SISTEMA' })
export class FuenteDatos {
  @Column('number', { primary: true, name: 'ID', precision: 2, scale: 0 })
  id: number;

  @Column('varchar2', { name: 'FUENTEDATOS', length: 30 })
  fuenteDatos: string;

  @Column('number', { name: 'VERSION' })
  version: number;

  @Column('number', { name: 'ACTIVO' })
  activo: number;

  @Column('varchar2', { name: 'NOMBRESISTEMA', length: 50 })
  nombreSistema?: string;

  @Column('varchar2', { name: 'IPPUBLICA', length: 20 })
  ipPublica?: string;

  @Column('number', { name: 'ESTABLECIMIENTO_ID' })
  establecimientoId?: number;

  @Column('varchar2', { name: 'LLAVECRIPTOGRAFIA' })
  llaveCriptografia?: string;

  @Column('varchar2', { name: 'LLAVEANULACION', length: 20 })
  llaveAnulacion?: string;
}
