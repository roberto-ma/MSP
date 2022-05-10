import { BeforeInsert, BeforeUpdate, Column, Entity } from 'typeorm';
import { PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { Constantes } from '../../../config/constantes';
import { Paciente } from './paciente.entity';
import { ProfesionalSalud } from './profesional-salud.entity';

@Entity({ schema: 'SOA_INDICE_MAESTRO', name: 'PERSONA' })
export class Persona {
  @PrimaryGeneratedColumn('increment', { name: 'ID' })
  id: number;

  @Column({ name: 'TIPOIDENTIFICACION_ID', type: 'number', nullable: false })
  tipo_identificacion_id: number;

  @Column({ name: 'IDENTIFICACION', type: 'varchar2', nullable: false })
  identificacion: string;

  @Column({ name: 'APELLIDOS', type: 'varchar2', nullable: false })
  apellidos: string;

  @Column({ name: 'NOMBRES', type: 'varchar2', nullable: false })
  nombres: string;

  @Column({ name: 'SEXO', type: 'char', nullable: false })
  sexo: string;

  @Column({ name: 'ETNIA_ID', type: 'number', nullable: false })
  etnia_id: number;

  @Column({ name: 'RELIGION_ID', type: 'number', nullable: false })
  religion_id: number;

  @Column({ name: 'LUGARNACIMIENTO_ID', type: 'number', nullable: false })
  lugar_nacimiento_id: number;

  @Column({ name: 'DISCAPACITADO', type: 'char', nullable: false })
  discapacitado: string;

  @Column({ name: 'PORCENTAJEDISCAPACIDAD', type: 'number', nullable: false })
  porcentaje_discapacidad: number;

  @Column({ name: 'VIVO', type: 'number', nullable: false })
  vivo: number;

  @Column({ name: 'ACTIVO', type: 'number', nullable: false })
  activo: number;

  @Column({ name: 'FECHAREGISTRO', type: 'timestamp', nullable: false })
  fecha_registro: Date;

  @Column({ name: 'USUARIOMODIFICACION', type: 'varchar2', nullable: true })
  usuario_modificacion?: string;

  @Column({ name: 'FECHAMODIFICACION', type: 'timestamp', nullable: true })
  fecha_modificacion?: Date;

  @Column({ name: 'PAIS_ID', type: 'number', nullable: true })
  pais_id?: number;

  @Column({ name: 'FECHANACIMIENTO', type: 'date', nullable: true })
  fecha_nacimiento: Date;

  @OneToOne(() => Paciente, (paciente) => paciente.persona)
  paciente?: Paciente;

  @OneToOne(
    () => ProfesionalSalud,
    (profesionalSalud) => profesionalSalud.persona,
  )
  profesionalSalud?: ProfesionalSalud;

  @BeforeInsert()
  setCreateDefault() {
    this.fecha_registro = new Date();
    this.activo = Constantes.ACTIVO;
    this.vivo = Constantes.ACTIVO;
  }

  @BeforeUpdate()
  setUpdatDefault() {
    this.fecha_modificacion = new Date();
  }
}
