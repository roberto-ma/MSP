import { Column, Entity, Index } from 'typeorm';
import { JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { Especialidad } from './especialidad.entity';
import { RiesgoMedicamento } from './riesgomedicamento.entity';
import { Producto } from './producto.entity';
import { TipoLabAnalisisClinico } from './tipo-lab-analisis-clinico.entity';

@Index('PK_DISPOSITIVO', ['productoId'], { unique: true })
@Entity({ name: 'DISPOSITIVO', schema: 'SOA_CATALOGOS' })
export class Dispositivo {
  @Column('number', {
    primary: true,
    name: 'PRODUCTO_ID',
    precision: 5,
    scale: 0,
  })
  productoId: number;

  @Column('varchar2', { name: 'CUDIM', length: 10 })
  cudim: string;

  @Column('varchar2', { name: 'ESPECIFICACIONTECNICA', length: 150 })
  especificacionTecnica: string;

  @ManyToOne(() => Especialidad, (especialidad) => especialidad.dispositivos)
  @JoinColumn([{ name: 'ESPECIALIDAD_ID', referencedColumnName: 'id' }])
  especialidad: Especialidad;

  @ManyToOne(
    () => RiesgoMedicamento,
    (riesgoMedicamento) => riesgoMedicamento.dispositivos,
  )
  @JoinColumn([{ name: 'NIVELRIESGO_ID', referencedColumnName: 'id' }])
  riesgoMedicamento: RiesgoMedicamento;

  @OneToOne(() => Producto, (producto) => producto.dispositivo)
  @JoinColumn([{ name: 'PRODUCTO_ID', referencedColumnName: 'id' }])
  producto: Producto;

  @Column('number', { name: 'VERSION' })
  version: number;

  @Column('number', { name: 'ACTIVO' })
  activo: number;

  @ManyToOne(
    () => TipoLabAnalisisClinico,
    (tipoLabAnalisisClinico) => tipoLabAnalisisClinico.dispositivos,
  )
  @JoinColumn([{ name: 'LABANALISISCLINICO_ID', referencedColumnName: 'id' }])
  labAnalisisClinico: TipoLabAnalisisClinico;
}
