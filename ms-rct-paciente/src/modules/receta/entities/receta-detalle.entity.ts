import {
  ManyToOne,
  JoinColumn,
  BeforeInsert,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Receta } from './receta.entity';
import { RecetaP } from '../../recetaImpPaciente/entities/receta.entity';
import { Medicamento } from '../../catalogos/entities/medicamento.entity';
import { Dispensacion } from '../../receta/entities/dispensacion.entity';

@Entity({ schema: 'SOA_RECETA', name: 'RECETADETALLE' })
export class RecetaDetalle {
  @PrimaryGeneratedColumn('increment', { name: 'ID' })
  id: number;

  @Column({ name: 'RECETA_ID', type: 'number', nullable: true })
  receta_id: number;

  @ManyToOne(() => RecetaP, (recetaP) => recetaP.id)
  @JoinColumn({ name: 'RECETA_ID', referencedColumnName: 'id' })
  recetaP: RecetaP;

  @ManyToOne(() => Receta, (receta) => receta.recetaDetalle)
  @JoinColumn({ name: 'RECETA_ID', referencedColumnName: 'id' })
  receta: Receta;

  @Column({ name: 'MEDICAMENTO_ID', type: 'number', nullable: false })
  medicamento_id: number;

  @Column({ name: 'CANTIDADPRESCRITA', type: 'number', nullable: true })
  cantidad_prescrita: number;

  @Column({ name: 'CANTIDADVALIDADA', type: 'number', nullable: true })
  cantidad_validada: number;

  @Column({ name: 'DISPENSACIONEXTERNA', type: 'number', nullable: true })
  dispensacion_externa: number;

  @Column({ name: 'CIE_ID', type: 'number', nullable: true })
  cie_id: number;

  @Column({ name: 'DOSISMEDIDA_ID', type: 'number', nullable: true })
  dosis_id: number;

  @Column({ name: 'FRECUENCIA_ID', type: 'number', nullable: true })
  frecuencia_id: number;

  @Column({ name: 'OTRAFRECUENCIA', type: 'varchar2', nullable: true })
  otra_frecuencia: string;

  @Column({ name: 'INDICACIONES', type: 'varchar2', nullable: true })
  indicaciones?: string;

  @Column({ name: 'TARIFARIO_ID', type: 'number', nullable: true })
  tarifario_id?: number;

  @Column({ name: 'PRECIOTARIFARIO', type: 'number', nullable: true })
  precio_tarifario?: number;

  @Column({ name: 'DISPENSACION_ID', type: 'number', nullable: true })
  dispensacion_id?: number;

  @Column({ name: 'PRECIOFARMACIA', type: 'number', nullable: true })
  precio_farmacia?: number;

  @Column({ name: 'DOSISCANTIDAD', type: 'number', nullable: true })
  dosis_cantidad?: number;

  @Column({ name: 'DURACIONTRATAMIENTO', type: 'number', nullable: true })
  duracion_tratamiento?: number;
  // Detalle
  @OneToOne(() => Medicamento, (medicamento) => medicamento.recetadetalle, {
    eager: true,
  })
  @JoinColumn([{ name: 'MEDICAMENTO_ID', referencedColumnName: 'productoId' }])
  medicamento: Medicamento;

  // dispensacion

  @BeforeInsert()
  dataDefault() {
    this.cantidad_validada = this.cantidad_prescrita;
  }

  @OneToOne(
    () => Dispensacion,
    (dispensacion) => dispensacion.recetaDetalleDis,
    {
      eager: true,
    },
  )
  @JoinColumn([{ name: 'DISPENSACION_ID', referencedColumnName: 'id' }])
  dispensacion: Dispensacion;
}
