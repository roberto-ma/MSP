import { Column, Entity, Index, OneToMany } from 'typeorm';
import { RecetaA } from '../../recetaImpresion/entities/receta.entity';
import { RecetaP } from '../../recetaImpPaciente/entities/receta.entity';

@Index('PK_TIPOATENCION', ['id'], { unique: true })
@Entity({ name: 'TIPOATENCION', schema: 'SOA_CATALOGOS' })
export class TipoAtencion {
  @Column('number', { primary: true, name: 'ID', precision: 2, scale: 0 })
  id: number;

  @Column('varchar2', { name: 'TIPOATENCION', length: 50 })
  tipoAtencion: string;

  @Column('number', { name: 'VERSION' })
  version: number;

  @Column('number', { name: 'ACTIVO' })
  activo: number;

  @OneToMany(() => RecetaA, (recetaA) => recetaA.tipoAtencion)
  recetaA: RecetaA[];

  @OneToMany(() => RecetaP, (recetaP) => recetaP.tipoAtencion)
  recetaP: RecetaP[];
}
