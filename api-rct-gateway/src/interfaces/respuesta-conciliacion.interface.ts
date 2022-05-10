export interface ResponseConciliacion {
  codigo: string;
  mensaje: string;
  detalle?: string;
  listaErrores?: Array<ListaNovedades>;
}
export interface ListaNovedades {
  codigoCuadre: string;
  fecha: Date;
  mensaje: string;
  zona?: string;
}
