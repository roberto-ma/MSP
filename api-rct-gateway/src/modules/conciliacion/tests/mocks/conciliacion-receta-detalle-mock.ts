export class ConciliacionDetalleServiceMock {
  async getFacturaDetalleConciliacion(codigoCuadre: string): Promise<any> {
    return Promise.resolve({
      codigoCuadre,
    });
  }
}
