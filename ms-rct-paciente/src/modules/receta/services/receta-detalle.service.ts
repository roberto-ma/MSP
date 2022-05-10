import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RpcException } from '@nestjs/microservices';
import { RecetaDetalleRepository } from '../repositories/receta-detalle.repository';

@Injectable()
export class RecetaDetalleService {
  constructor(
    @InjectRepository(RecetaDetalleRepository)
    private readonly recetaDetalleRepository: RecetaDetalleRepository,
  ) {}

  // async createRecetaDetalle(createRecetaDetalleDto: CreateRecetaDetalleDto) {
  //   const recetaDetalle = this.recetaDetalleRepository.create(
  //     createRecetaDetalleDto,
  //   );
  //   return await this.recetaDetalleRepository
  //     .save(recetaDetalle)
  //     .catch((error) => {
  //       throw new RpcException({
  //         statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
  //         message: error.message,
  //       });
  //     });
  // }

  // async getRecetaDetalles() {
  //   return await this.recetaDetalleRepository.find().catch((error) => {
  //     throw new RpcException({
  //       statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
  //       message: error.message,
  //     });
  //   });
  // }

  async getRecetaDetallePorId(id: number) {
    const recetaDetalle = await this.recetaDetalleRepository
      .getRecetaDetallePorIdER(id)
      .catch((error) => {
        throw new RpcException({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message,
        });
      });
    if (!recetaDetalle)
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Detalle de receta '${id}' no encontrado`,
      });
    return recetaDetalle;
  }

  // async updateRecetaDetalle(
  //   id: number,
  //   updateRecetaDetalleDto: UpdateRecetaDetalleDto,
  // ) {
  //   const recetaDetalle = await this.getRecetaDetallePorId(id);
  //   //recetaDetalle.usuario_modificacion = usernameUsuarioAutenticado;
  //   const recetaDetalleEditada = Object.assign(
  //     recetaDetalle,
  //     updateRecetaDetalleDto,
  //   );
  //   return await this.recetaDetalleRepository
  //     .save(recetaDetalleEditada)
  //     .catch((error) => {
  //       throw new RpcException({
  //         statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
  //         message: error.message,
  //       });
  //     });
  // }
}
