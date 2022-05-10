import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { IndicacionesCnmb } from './indicaciones-cnmb.entity';
import { Concentracion } from './concentracion.entity';
import { Contraindicacion } from './contraindicacion.entity';
import { Dosificacion } from './dosificacion.entity';
import { FormaFarmaceutica } from './forma-farmaceutica.entity';
import { Interacciones } from './interacciones.entity';
import { LaboratorioFabricante } from './laboratorio-fabricante.entity';
import { NivelPrescripcion } from './nivel-prescripcion.entity';
import { Observacion } from './observacion.entity';
import { Presentacion } from './presentacion.entity';
import { Producto } from './producto.entity';
import { ReaccionAdversa } from './reaccion-adversa.entity';
import { RegistroTerapeutico } from './registro-terapeutico.entity';
import { ViaAdministracion } from './via-administracion.entity';
import { RecetaDetalle } from '../../receta/entities/receta-detalle.entity';

@Index('PK_MEDICAMENTO', ['productoId'], { unique: true })
@Entity({ name: 'MEDICAMENTO', schema: 'SOA_CATALOGOS' })
export class Medicamento {
  @Column('number', {
    primary: true,
    name: 'PRODUCTO_ID',
    precision: 6,
    scale: 0,
  })
  productoId: number;

  @Column('varchar2', { name: 'CUM', length: 15 })
  cum: string;

  @Column('varchar2', { name: 'ATC', length: 10 })
  atc: string;

  @ManyToOne(
    () => FormaFarmaceutica,
    (formaFarmaceutica) => formaFarmaceutica.medicamentos,
    {
      eager: true,
    },
  )
  @JoinColumn([{ name: 'FORMAFARMACEUTICA_ID', referencedColumnName: 'id' }])
  formaFarmaceutica: FormaFarmaceutica;

  @ManyToOne(
    () => Concentracion,
    (concentracion) => concentracion.medicamentos,
    { nullable: true, eager: true },
  )
  @JoinColumn([{ name: 'CONCENTRACION_ID', referencedColumnName: 'id' }])
  concentracion?: Concentracion;

  @ManyToOne(() => Presentacion, (presentacion) => presentacion.medicamentos, {
    nullable: true,
    eager: true,
  })
  @JoinColumn([{ name: 'PRESENTACION_ID', referencedColumnName: 'id' }])
  presentacion: Presentacion;

  @ManyToOne(
    () => NivelPrescripcion,
    (nivelPrescripcion) => nivelPrescripcion.medicamentos,
    { nullable: true },
  )
  @JoinColumn([{ name: 'NIVELPRESCRIPCION_ID', referencedColumnName: 'id' }])
  nivelPrescripcion?: NivelPrescripcion;

  @Column('char', { name: 'NIVELATENCION1', length: 1, nullable: true })
  nivelAtencion_1?: string;

  @Column('char', { name: 'NIVELATENCION2', length: 1, nullable: true })
  nivelAtencion_2?: string;

  @Column('char', { name: 'NIVELATENCION3', length: 1, nullable: true })
  nivelAtencion_3?: string;

  @ManyToOne(
    () => IndicacionesCnmb,
    (indicacionesCnmb) => indicacionesCnmb.medicamentos,
    { nullable: true },
  )
  @JoinColumn([{ name: 'INDICACIONESCNMB_ID', referencedColumnName: 'id' }])
  indicacionesCnmb?: IndicacionesCnmb;

  @Column({ name: 'VIAADMINISTRACION_ID', type: 'number', nullable: true })
  viaAdministracionId: number;

  @ManyToOne(
    () => RegistroTerapeutico,
    (registroTerapeutico) => registroTerapeutico.medicamentos,
    { nullable: true },
  )
  @JoinColumn([{ name: 'REGISTROTERAPEUTICO_ID', referencedColumnName: 'id' }])
  registroTerapeutico?: RegistroTerapeutico;

  @ManyToOne(() => Dosificacion, (dosificacion) => dosificacion.medicamentos, {
    nullable: true,
  })
  @JoinColumn([{ name: 'DOSIFICACION_ID', referencedColumnName: 'id' }])
  dosificacion?: Dosificacion;

  @Column('char', { name: 'PSICOTROPICOESTUPEFACIENTE', length: 1 })
  psicotropicoEstupefaciente: string;

  @Column('char', { name: 'ANTIMICROBIANO', length: 1 })
  antimicrobiano: string;

  @Column('char', { name: 'DISPENSACIONEXTERNA', length: 1 })
  dispensacionExterna: string;

  @ManyToOne(
    () => LaboratorioFabricante,
    (laboratorioFabricante) => laboratorioFabricante.medicamentos,
    { nullable: true },
  )
  @JoinColumn([
    { name: 'LABORATORIOFABRICANTE_ID', referencedColumnName: 'id' },
  ])
  laboratorioFabricante?: LaboratorioFabricante;

  @ManyToOne(
    () => ReaccionAdversa,
    (reaccionAdversa) => reaccionAdversa.medicamentos,
    { nullable: true },
  )
  @JoinColumn([{ name: 'REACCIONADVERSA_ID', referencedColumnName: 'id' }])
  reaccionAdversa?: ReaccionAdversa;

  @ManyToOne(
    () => Contraindicacion,
    (contraindicacion) => contraindicacion.medicamentos,
    { nullable: true },
  )
  @JoinColumn([{ name: 'CONTRAINDICACION_ID', referencedColumnName: 'id' }])
  contraindicacion?: Contraindicacion;

  @ManyToOne(
    () => Interacciones,
    (interacciones) => interacciones.medicamentos,
    { nullable: true },
  )
  @JoinColumn([{ name: 'INTERACCION_ID', referencedColumnName: 'id' }])
  interacciones?: Interacciones;

  @ManyToOne(() => Observacion, (observacion) => observacion.medicamentos, {
    nullable: true,
  })
  @JoinColumn([{ name: 'OBSERVACION_ID', referencedColumnName: 'id' }])
  observacion?: Observacion;

  @Column('char', { name: 'FISCALIZACION', length: 1, nullable: true })
  fiscalizacion: string;

  @Column('number', { name: 'VERSION' })
  version: number;

  @Column('number', { name: 'ACTIVO' })
  activo: number;

  // Producto

  @OneToOne(() => Producto, (productoM) => productoM.medicamento, {
    eager: true,
  })
  @JoinColumn([{ name: 'PRODUCTO_ID', referencedColumnName: 'id' }])
  productoM: Producto;

  //Detalle
  @OneToOne(() => RecetaDetalle, (recetadetalle) => recetadetalle.medicamento)
  recetadetalle: RecetaDetalle[];

  // via Administracion
  @ManyToOne(
    () => ViaAdministracion,
    (viaAdministracion) => viaAdministracion.medicamentos,
    { eager: true },
  )
  @JoinColumn([{ name: 'VIAADMINISTRACION_ID', referencedColumnName: 'id' }])
  viaAdministracion?: ViaAdministracion;
}
