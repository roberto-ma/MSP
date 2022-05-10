import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { LugarGeografico } from './lugar-geografico.entity';

@Index('PK_FARMACIA', ['id'], { unique: true })
@Entity({ name: 'FARMACIA', schema: 'SOA_SISTEMA' })
export class Farmacia {
  @Column('number', { primary: true, name: 'ID', precision: 5, scale: 0 })
  id: number;

  @Column('varchar2', { name: 'FARMACIA', length: 100 })
  farmacia: string;

  @Column('varchar2', { name: 'RUC', length: 13 })
  ruc: string;

  @Column('varchar2', { name: 'DIRECCION', length: 100 })
  direccion: string;

  @Column('number', { name: 'VERSION' })
  version: number;

  @Column('number', { name: 'ACTIVO' })
  activo: number;

  @Column('timestamp', { name: 'FECHAREGISTRO', scale: 6 })
  fechaRegistro: Date;

  @Column('varchar2', { name: 'USUARIOREGISTRO', length: 25 })
  usuarioRegistro: string;

  @Column('timestamp', { name: 'FECHAMODIFICACION', scale: 6, nullable: true })
  fechaModificacion?: Date;

  @Column('varchar2', {
    name: 'USUARIOMODIFICACION',
    length: 25,
    nullable: true,
  })
  usuarioModificacion?: string;

  @ManyToOne(
    () => LugarGeografico,
    (lugarGeografico) => lugarGeografico.farmacias,
  )
  @JoinColumn([{ name: 'LUGARGEOGRAFICO_ID', referencedColumnName: 'id' }])
  lugarGeografico: LugarGeografico;

  @Column('number', { name: 'CADENAFARMACIA_ID', nullable: true })
  cadenafarmaciaId?: number;
}
