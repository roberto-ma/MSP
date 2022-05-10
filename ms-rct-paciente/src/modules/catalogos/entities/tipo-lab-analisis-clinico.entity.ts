import { Column, Entity, Index, OneToMany } from 'typeorm';
import { Dispositivo } from './dispositivo.entity';

@Index('PK_TIPOLABANALISISCLINICO', ['id'], { unique: true })
@Entity({ name: 'TIPOLABANALISISCLINICO', schema: 'SOA_CATALOGOS' })
export class TipoLabAnalisisClinico {
  @Column('number', { primary: true, name: 'ID', precision: 5, scale: 0 })
  id: number;

  @Column('varchar2', { name: 'TIPOLABANALISISCLINICO', length: 30 })
  tipoLabAnalisisClinico: string;

  @OneToMany(() => Dispositivo, (dispositivo) => dispositivo.labAnalisisClinico)
  dispositivos: Dispositivo[];

  @Column('number', { name: 'VERSION' })
  version: number;

  @Column('number', { name: 'ACTIVO' })
  activo: number;
}
