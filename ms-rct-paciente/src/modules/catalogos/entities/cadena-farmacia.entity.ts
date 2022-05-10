import { Column, Entity } from 'typeorm';
// import { Farmacia } from './farmacia';

@Entity({ name: 'CADENAFARMACIA', schema: 'SOA_SISTEMA' })
export class CadenaFarmacia {
  @Column('number', { primary: true, name: 'ID', precision: 5, scale: 0 })
  id: number;

  @Column('varchar2', { name: 'NOMBRECADENA', length: 200 })
  nombreCadena: string;

  @Column('varchar2', { name: 'LLAVECRIPTOGRAFIA' })
  llaveCriptografia: string;

  @Column('number', { name: 'VERSION' })
  version: number;

  @Column('number', { name: 'ACTIVO', default: () => '1' })
  activo: number;

  @Column('varchar2', { name: 'IPPUBLICA', length: 20 })
  ipPublica: string;

  @Column('varchar2', { name: 'LLAVEANULACION', length: 20 })
  llaveAnulacion: string;

  @Column('varchar2', { name: 'RUCCADENA', length: 20 })
  rucCadena: string;
}
