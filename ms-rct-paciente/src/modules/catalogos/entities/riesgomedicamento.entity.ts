import { Column, Entity, Index, OneToMany } from 'typeorm';
import { Dispositivo } from './dispositivo.entity';

@Index('PK_NIVEL_RIESGO', ['id'], { unique: true })
@Entity({ name: 'RIESGOMEDICAMENTO', schema: 'SOA_CATALOGOS' })
export class RiesgoMedicamento {
  @Column('number', { primary: true, name: 'ID', precision: 5, scale: 0 })
  id: number;

  @Column('varchar2', { name: 'NIVELRIESGO', length: 30 })
  riesgoMedicamento: string;

  @Column('number', { name: 'VERSION' })
  version: number;

  @Column('number', { name: 'ACTIVO' })
  activo: number;

  @OneToMany(() => Dispositivo, (dispositivo) => dispositivo.riesgoMedicamento)
  dispositivos: Dispositivo[];
}
