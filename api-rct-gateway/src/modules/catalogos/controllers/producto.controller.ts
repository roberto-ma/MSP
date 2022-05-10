import { Controller, Get, Post, Body } from '@nestjs/common';
import { Patch, Param, Version } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Scopes, Unprotected } from 'nest-keycloak-connect';
import { plainToClass } from 'class-transformer';
import { RespuestaKeycloak } from '../../../interfaces/respuesta-keycloak.interface';
import { CurrentUser } from '../../../decorators/current-user.decorator';
import { ProductoService } from '../services/producto.service';
import { ReadProductoDto } from '../dto/producto.dto';

@ApiTags('Producto')
@Controller('producto')
export class ProductoController {
  // constructor(private readonly productoService: ProductoService) { }
  // @Version('1')
  // ////@ApiBearerAuth()
  // @Unprotected()
  // @Get('id/:id')
  // async getProductoPorId(@Param('id') id: number) {
  //   const producto = await this.productoService.getProductoPorId(+id);
  //   return plainToClass(ReadProductoDto, producto);
  // }
}
