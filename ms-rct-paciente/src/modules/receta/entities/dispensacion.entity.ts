import { Constantes } from '../../../config/constantes';
import {
  BeforeInsert,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Receta } from './receta.entity';
import { RecetaDetalle } from '../../receta/entities/receta-detalle.entity';
@Entity({ schema: 'SOA_RECETA', name: 'DISPENSACION' })
export class Dispensacion {
  @PrimaryGeneratedColumn('increment', { name: 'ID' })
  id: number;

  @Column('number', { name: 'FARMACIA_ID', nullable: false })
  farmacia_id: number;

  @Column('varchar2', { name: 'NUMEROFACTURA', nullable: true })
  numero_orden?: string;

  @Column('timestamp', { name: 'FECHADISPENSACION', nullable: false })
  fecha_dispensacion: Date;

  @Column('char', { name: 'IDENTIFICACIONDISPENSADOR', nullable: false })
  identificacion_dispensador: string;

  @Column('varchar2', { name: 'DISPENSADOR', nullable: false })
  dispensador: string;

  @Column('varchar2', { name: 'OBSERVACION', nullable: true })
  observacion?: string;

  @Column('number', { name: 'ACTIVO', nullable: false })
  activo: number;

  @Column('number', { name: 'FUENTEDATOS_ID', nullable: true })
  fuente_datos_id?: number;

  @Column('timestamp', { name: 'FECHAREGISTRO', nullable: false })
  fecha_registro: Date;

  @Column('varchar2', { name: 'IDENTIFICADORRECEPTOR', nullable: true })
  identificador_receptor?: string;

  @Column('varchar2', { name: 'RECEPTOR', nullable: true })
  receptor?: string;

  @Column('number', { name: 'VALORTOTAL', nullable: false })
  valor_total: number;

  @Column('varchar2', { name: 'RECETAOID', nullable: false })
  receta_oid: string;

  @Column('number', { name: 'CANTIDADITEMS', nullable: false })
  cantidad_items: number;

  @OneToOne(() => Receta, (receta) => receta.oid)
  @JoinColumn([{ name: 'RECETAOID', referencedColumnName: 'oid' }])
  receta: Receta;
  //  Dispensacion

  @OneToOne(
    () => RecetaDetalle,
    (recetaDetalleDis) => recetaDetalleDis.dispensacion,
  )
  recetaDetalleDis: RecetaDetalle;

  @BeforeInsert()
  dataDefault() {
    this.activo = Constantes.ESTADO_GENERAL_ACTIVO;
    this.fecha_registro = new Date();
  }
}
