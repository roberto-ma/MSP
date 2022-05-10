import { Column, Entity, Index, OneToMany, OneToOne } from 'typeorm';
import { Farmacia } from './farmacia.entity';
import { RecetaP } from '../../recetaImpPaciente/entities/receta.entity';

@Index('PK_LUGARGEOGRAFICO', ['id'], { unique: true })
@Entity({ name: 'LUGARGEOGRAFICO', schema: 'SOA_CATALOGOS' })
export class LugarGeografico {
  @Column('number', { primary: true, name: 'ID', precision: 5, scale: 0 })
  id: number;

  @Column('char', { name: 'CODIGOPARROQUIA', length: 2 })
  codigoParroquia: string;

  @Column('varchar2', { name: 'PARROQUIA', length: 100 })
  parroquia: string;

  @Column('char', { name: 'CODIGOCANTON', length: 2 })
  codigoCanton: string;

  @Column('varchar2', { name: 'CANTON', length: 50 })
  canton: string;

  @Column('char', { name: 'CODIGOPROVINCIA', length: 2 })
  codigoProvincia: string;

  @Column('varchar2', { name: 'PROVINCIA', length: 30 })
  provincia: string;

  @OneToMany(() => Farmacia, (farmacia) => farmacia.lugarGeografico)
  farmacias: Farmacia[];

  @Column('char', { name: 'CODIGOPRAS', length: 6, nullable: true })
  codigopras: string;

  @Column('number', { name: 'VERSION' })
  version: number;

  @Column('number', { name: 'ACTIVO' })
  activo: number;

  // @OneToOne(() => RecetaP, (receta) => receta.lugar_geografico_id)
  // receta: RecetaP[];
}
