import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { RecetaDetalleService } from '../services/receta-detalle.service';

@ApiTags('RecetaDetalle')
@Controller('receta-detalle')
export class RecetaDetalleController {
  constructor(private readonly recetaDetalleService: RecetaDetalleService) {}

  // @Version('1')
  // //@ApiBearerAuth()
  // @Unprotected()
  // @Post()
  // createRecetaDetalle(@Body() createRecetaDetalleDto: CreateRecetaDetalleDto) {
  //   const recetaDetalle = this.recetaDetalleService.createRecetaDetalle(
  //     createRecetaDetalleDto,
  //   );
  //   return plainToClass(ReadRecetaDetalleSimpleDto, recetaDetalle);
  // }

  // @Version('1')
  // //@ApiBearerAuth()
  // @Unprotected()
  // @Get('/all')
  // async getRecetaDetalles() {
  //   const recetaDetalles = await this.recetaDetalleService.getRecetaDetalles();
  //   return recetaDetalles.map((recetaDetalle) =>
  //     plainToClass(ReadRecetaDetalleSimpleDto, recetaDetalle),
  //   );
  // }

  // @Version('1')
  // //@ApiBearerAuth()
  // @Unprotected()
  // @Get(':id')
  // async getRecetaDetallePorId(@Param('id') id: string) {
  //   const recetaDetalle = await this.recetaDetalleService.getRecetaDetallePorId(
  //     +id,
  //   );
  //   return recetaDetalle;
  //   //return plainToClass(ReadRecetaDetalleSimpleDto, recetaDetalle);
  // }

  // @Version('1')
  // //@ApiBearerAuth()
  // @Unprotected()
  // @Patch()
  // updateRecetaDetalle(
  //   @Body() updateRecetaDetalleDto: UpdateRecetaDetalleDto,
  //   @CurrentUser() usuarioAutenticado: RespuestaKeycloak,
  // ) {
  //   const recetaDetalle = this.recetaDetalleService.updateRecetaDetalle(
  //     updateRecetaDetalleDto,
  //   );
  //   return plainToClass(ReadRecetaDetalleSimpleDto, recetaDetalle);
  // }
}
