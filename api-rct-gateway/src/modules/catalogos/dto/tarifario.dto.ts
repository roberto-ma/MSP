export class ReadTarifarioDto {
  id: number;
  productoId: number;
  fechaDesde: Date;
  fechaHasta: Date;
  precioUnitario: number;
  fechaRegistro: Date;
  usuarioRegistro: string;
}
