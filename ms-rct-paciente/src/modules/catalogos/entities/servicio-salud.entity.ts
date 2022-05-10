import { Column, Entity, Index } from 'typeorm';

@Index('PK_SERVICIOSALUD', ['id'], { unique: true })
@Entity({ name: 'SERVICIOSALUD', schema: 'SOA_CATALOGOS' })
export class ServicioSalud {
  @Column('number', { primary: true, name: 'ID', precision: 3, scale: 0 })
  id: number;

  @Column('varchar2', { name: 'SERVICIOSALUD', length: 30 })
  servicioSalud: string;

  @Column('number', { name: 'VERSION' })
  version: number;

  @Column('number', { name: 'ACTIVO' })
  activo: number;
}
