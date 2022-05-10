import { Column, Entity, PrimaryColumn } from 'typeorm';
import { OneToOne, JoinColumn } from 'typeorm';
import { Persona } from './persona.entity';

@Entity({ schema: 'SOA_INDICE_MAESTRO', name: 'PACIENTE' })
export class Paciente {
  @PrimaryColumn({ name: 'PERSONA_ID', type: 'number', nullable: false })
  persona_id: number;

  @Column({ name: 'RESIDENCIA', type: 'varchar2', nullable: false })
  residencia: string;

  @Column({ name: 'LUGARRESIDENCIA_ID', type: 'number', nullable: false })
  lugar_residencia_id: number;

  @Column({ name: 'TIPOTELEFONO', type: 'char', nullable: true })
  tipo_telefono?: string;

  @Column({ name: 'TELEFONO', type: 'varchar2', nullable: true })
  telefono?: string;

  @Column({ name: 'EMAIL', type: 'varchar2', nullable: true })
  email?: string;

  @Column({ name: 'ALERGIA', type: 'varchar2', nullable: true })
  alergia?: string;

  @OneToOne(() => Persona, (persona) => persona.paciente, { eager: true })
  @JoinColumn([{ name: 'PERSONA_ID', referencedColumnName: 'id' }])
  persona: Persona;
}
