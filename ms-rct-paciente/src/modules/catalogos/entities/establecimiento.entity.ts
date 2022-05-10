import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Institucion } from './institucion.entity';
import { Organico } from './organico.entity';
import { TipoEstablecimiento } from './tipo-establecimiento.entity';
import { RecetaA } from '../../recetaImpresion/entities/receta.entity';

@Index('PK_ESTABLECIMIENTO', ['id'], { unique: true })
@Entity({ name: 'ESTABLECIMIENTO', schema: 'SOA_SISTEMA' })
export class Establecimiento {
  @Column('number', { primary: true, name: 'ID', precision: 5, scale: 0 })
  id: number;

  @Column('char', { name: 'UNICODIGO', length: 6 })
  unicodigo: string;

  @Column('varchar2', { name: 'RUC', length: 13 })
  ruc: string;

  @Column('varchar2', { name: 'NOMBREOFICIAL', length: 100 })
  nombreOficial: string;

  @Column('varchar2', { name: 'NOMBRECOMERCIAL', length: 100, nullable: true })
  nombreComercial?: string;

  @Column('varchar2', { name: 'NUMEROESTABLECIMIENTO', length: 5 })
  numeroEstablecimiento: string;

  @Column('number', { name: 'ORGANICO_ID' })
  organico_id: number;

  @Column('varchar2', { name: 'TELEFONO', length: 15, nullable: true })
  telefono?: string;

  @Column('varchar2', { name: 'EMAIL', length: 80, nullable: true })
  email?: string;

  @Column('varchar2', { name: 'DIRECCION', length: 100 })
  direccion: string;

  @Column('varchar2', { name: 'REFERENCIA', length: 100, nullable: true })
  referencia?: string;

  @Column('number', { name: 'LUGARGEOGRAFICO_ID', precision: 5, scale: 0 })
  lugar_geografico_id: number;

  @Column('varchar2', { name: 'LATITUD', length: 20 })
  latitud: string;

  @Column('varchar2', { name: 'LONGITUD', length: 20 })
  longitud: string;

  @Column('char', { name: 'ACTIVO', length: 1 })
  activo: string;

  @Column('number', { name: 'VERSION' })
  version: number;

  @Column('varchar2', { name: 'SISTEMA', length: 25, nullable: true })
  sistema?: string;

  @ManyToOne(() => Institucion, (institucion) => institucion.establecimientos)
  @JoinColumn([{ name: 'INSTITUCION_ID', referencedColumnName: 'id' }])
  institucion: Institucion;

  @ManyToOne(() => Organico, (organico) => organico.establecimientos)
  @JoinColumn([{ name: 'ORGANICO_ID', referencedColumnName: 'id' }])
  organico: Organico;

  @ManyToOne(
    () => TipoEstablecimiento,
    (tipoEstablecimiento) => tipoEstablecimiento.establecimientos,
  )
  @JoinColumn([{ name: 'TIPOESTABLECIMIENTO_ID', referencedColumnName: 'id' }])
  tipoEstablecimiento: TipoEstablecimiento;

  @OneToMany(() => RecetaA, (RecetaA) => RecetaA.establecimiento_id)
  RecetaA: RecetaA[];
}
