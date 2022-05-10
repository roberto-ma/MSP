import { Column, Entity, PrimaryColumn } from 'typeorm';
import { JoinColumn, OneToOne, OneToMany } from 'typeorm';
import { Persona } from './persona.entity';
import { RecetaA } from '../../recetaImpresion/entities/receta.entity';
import { RecetaP } from '../../recetaImpPaciente/entities/receta.entity';
import { Especialidad } from '../../catalogos/entities/especialidad.entity';

@Entity({ schema: 'SOA_INDICE_MAESTRO', name: 'PROFESIONALSALUD' })
export class ProfesionalSalud {
  @PrimaryColumn({ name: 'PERSONA_ID', type: 'number', nullable: false })
  persona_id: number;

  @Column({ name: 'CODIGOACESS', type: 'varchar2', nullable: false })
  codigo_acess: string;

  @Column({ name: 'ESPECIALIDAD_ID', type: 'number', nullable: false })
  especialidad_id: number;

  @Column({ name: 'ROLPROFESIONAL_ID', type: 'number', nullable: false })
  rol_profesional_id: number;

  @Column({ name: 'ESTABLECIMIENTO_ID', type: 'number', nullable: false })
  establecimiento_id: number;

  establecimientos_itinerantes?: number[];

  @Column({ name: 'ITINERANTE', type: 'number', nullable: false })
  itinerante: number;

  @Column({ name: 'PSICOTROPICO', type: 'number', nullable: false })
  psicotropico: number;

  @Column({ name: 'ACTIVO', type: 'number', nullable: false })
  activo: number;

  @OneToOne(() => Persona, (persona) => persona.paciente, { eager: true })
  @JoinColumn([{ name: 'PERSONA_ID', referencedColumnName: 'id' }])
  persona: Persona;

  @OneToMany(() => RecetaA, (recetaA) => recetaA.prescriptor)
  recetaA: RecetaA;

  @OneToMany(() => RecetaP, (recetaP) => recetaP.prescriptor)
  recetaP: RecetaP;

  // @OneToMany(() => Especialidad, (especialidad) => especialidad.prescriptor)
  // especialidad: Especialidad;

  @OneToOne(() => Especialidad, (especialidad) => especialidad.id, {
    eager: true,
  })
  @JoinColumn([{ name: 'ESPECIALIDAD_ID', referencedColumnName: 'id' }])
  especialidad: Especialidad;
}
