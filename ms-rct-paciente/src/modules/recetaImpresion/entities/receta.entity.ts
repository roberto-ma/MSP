import { Paciente } from '../../maestro/entities/paciente.entity';
import { ManyToOne, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { OneToMany, BeforeInsert } from 'typeorm';
import { Column, Entity, JoinColumn } from 'typeorm';
import { Constantes } from '../../../config/constantes';
import { TipoAtencion } from '../../catalogos/entities/tipo-atencion.entity';
import {ProfesionalSalud} from '../../maestro/entities/profesional-salud.entity';
import {Establecimiento} from '../../catalogos/entities/establecimiento.entity';
// import { ProfesionalSalud } from './profesionalSalud.entity';
// import { Persona } from '../entities/persona.entity';
// import { Establecimiento } from '../../recetaImpresion/entities/establecimiento.entity';

@Entity({ schema: 'SOA_RECETA', name: 'RECETA' })
export class RecetaA {
  @PrimaryGeneratedColumn('increment', { name: 'ID' })
  id: number;

  @Column({ name: 'NUMERORECETA', type: 'number', nullable: false })
  numero_receta: number;

  @Column({ name: 'OID', type: 'varchar2', nullable: false })
  oid: string;

  @Column({ name: 'ESTABLECIMIENTO_ID', type: 'number', nullable: false })
  establecimiento_id: number;

  @Column({ name: 'ORGANICO_ID', type: 'number', nullable: true })
  organico_id?: number;

  @Column({ name: 'LUGARGEOGRAFICO_ID', type: 'number', nullable: true })
  lugar_geografico_id?: number;

  @Column({ name: 'PACIENTE_ID', type: 'number', nullable: false })
  paciente_id: number;

  @Column({ name: 'ESTADOPACIENTE', type: 'char', nullable: true })
  estado_paciente?: string;

  @Column({ name: 'PRESCRIPTOR_ID', type: 'number', nullable: false })
  prescriptor_id: number;

  @Column({ name: 'FECHARECETA', type: 'timestamp', nullable: false })
  fecha_receta: Date;

  @Column({ name: 'FECHACADUCIDAD', type: 'timestamp', nullable: false })
  fecha_caducidad: Date;

  @Column({ name: 'CIEGENERAL_ID', type: 'number', nullable: false })
  cie_general_id: number;

  @Column({ name: 'SERVICIOSALUD_ID', type: 'number', nullable: false })
  servicio_salud_id: number;

  @Column({ name: 'TIPOATENCION_ID', type: 'number', nullable: false })
  tipo_atencion_id: number;

  @Column({ name: 'VALIDADOR_ID', type: 'number', nullable: true })
  validador_id?: number;

  @Column({ name: 'FECHAVALIDACION', type: 'timestamp', nullable: true })
  fecha_validacion?: Date;

  @Column({ name: 'OBSERVACIONVALIDACION', type: 'varchar2', nullable: true })
  observacion_validacion?: string;

  @Column({ name: 'ESTADORECETA_ID', type: 'number', nullable: false })
  estado_receta_id: number;

  @Column({ name: 'ACOMPANIANTECEDULA', type: 'varchar2', nullable: true })
  acompaniante_cedula?: string;

  @Column({ name: 'ACOMPANIANTE', type: 'varchar2', nullable: true })
  acompaniante?: string;

  @Column({ name: 'PARENTESCO_ID', type: 'number', nullable: true })
  parentesco_id?: number;

  @Column({ name: 'ACOMPANIANTETELEFONO', type: 'varchar2', nullable: true })
  acompaniante_telefono?: string;

  @Column({ name: 'ACOMPANIANTEEMAIL', type: 'varchar2', nullable: true })
  acompaniante_email?: string;

  @Column({ name: 'ACTIVO', type: 'number', nullable: false })
  activo: number;

  @Column({ name: 'FUENTEDATOS_ID', type: 'number', nullable: false })
  fuente_datos_id: number;

  @Column({ name: 'FECHAREGISTRO', type: 'timestamp', nullable: false })
  fecha_registro: Date;

  @Column({ name: 'USUARIOREGISTRO', type: 'varchar2', nullable: false })
  usuario_registro: string;

  @Column({ name: 'CODIGOATENCION', type: 'varchar2', nullable: true })
  codigo_atencion: string;

  @Column({ name: 'BLOQUEOFARMACIA_ID', type: 'number', nullable: true })
  bloqueo_farmacia_id: number;

  @Column({ name: 'BLOQUEOTIEMPO', type: 'timestamp', nullable: true })
  bloqueo_tiempo: Date;

  @Column({ name: 'CODIGOAUTORIZACION', type: 'number', nullable: true })
  codigo_autorizacion?: number;

  @Column({
    name: 'CODIGOAUTORIZACIONTIEMPO',
    type: 'timestamp',
    nullable: true,
  })
  codigo_autorizacion_tiempo?: Date;

  @ManyToOne(() => Paciente, (paciente) => paciente.persona_id, { eager: true })
  @JoinColumn({ name: 'PACIENTE_ID', referencedColumnName: 'persona_id' })
  paciente: Paciente;

  //ReImpresion tipo atencion
  @ManyToOne(() => TipoAtencion, (tipoAtencion) => tipoAtencion.id, {
    eager: true,
  })
  @JoinColumn({ name: 'TIPOATENCION_ID', referencedColumnName: 'id' })
  tipoAtencion: TipoAtencion;

  //Profecional de la salud
  @ManyToOne(() => ProfesionalSalud, (prescriptor) => prescriptor.persona_id, {
    eager: true,
  })
  @JoinColumn([{ name: 'PRESCRIPTOR_ID', referencedColumnName: 'persona_id' }])
  prescriptor: ProfesionalSalud;

  @ManyToOne(() => Establecimiento, (establecimiento) => establecimiento.id, {
    eager: true,
  })
  @JoinColumn([{ name: 'ESTABLECIMIENTO_ID', referencedColumnName: 'id' }])
  establecimiento: Establecimiento;

  @BeforeInsert()
  dataDefault() {
    this.activo = Constantes.ESTADO_GENERAL_ACTIVO;
    this.fecha_registro = new Date();
  }
}
