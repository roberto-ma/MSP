import { Column, Entity, Index, OneToMany } from 'typeorm';
import { RecetaP } from '../../recetaImpPaciente/entities/receta.entity';

@Index('PK_CIE', ['id'], { unique: true })
@Entity({ name: 'CIE', schema: 'SOA_CATALOGOS' })
export class Cie {
  @Column('number', { primary: true, name: 'ID', precision: 5, scale: 0 })
  id: number;

  @Column('varchar2', { name: 'CODIGOCIE', length: 6 })
  codigoCie: string;

  @Column('varchar2', { name: 'CIE', length: 250 })
  cie: string;

  @Column('number', { name: 'VERSION' })
  version: number;

  @Column('number', { name: 'ACTIVO' })
  activo: number;

  @OneToMany(() => RecetaP, (recetaP) => recetaP.cie)
  recetaP: RecetaP[];
}
