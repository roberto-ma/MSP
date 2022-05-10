import {
  Column,
  Entity,
  Index,
  OneToMany,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { Dispositivo } from './dispositivo.entity';
import { ProfesionalSalud } from '../../maestro/entities/profesional-salud.entity';

@Index('PK_ESPECIALIDAD', ['id'], { unique: true })
@Entity({ name: 'ESPECIALIDAD', schema: 'SOA_CATALOGOS' })
export class Especialidad {
  @Column('number', { primary: true, name: 'ID', precision: 5, scale: 0 })
  id: number;

  @Column('varchar2', { name: 'ESPECIALIDAD', length: 50 })
  especialidad: string;

  @OneToMany(() => Dispositivo, (dispositivo) => dispositivo.especialidad)
  dispositivos: Dispositivo[];

  @Column('number', { name: 'VERSION' })
  version: number;

  @Column('number', { name: 'ACTIVO' })
  activo: number;

  @OneToOne(() => ProfesionalSalud, (prescriptor) => prescriptor.especialidad)
  prescriptor: ProfesionalSalud;
}
