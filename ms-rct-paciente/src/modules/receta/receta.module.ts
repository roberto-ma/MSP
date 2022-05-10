import { Module } from '@nestjs/common';
import { RecetaService } from './services/receta.service';
import { RecetaController } from './controllers/receta.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecetaRepository } from './repositories/receta.repository';
import { RecetaDetalleRepository } from './repositories/receta-detalle.repository';
import { RecetaDetalleController } from './controllers/receta-detalle.controller';
import { RecetaDetalleService } from './services/receta-detalle.service';
import { DispensacionRepository } from './repositories/dispensacion.repository';
import { DispensacionController } from './controllers/dispensacion.controller';
import { DispensacionService } from './services/dispensacion.service';
import { PacienteModule } from '../maestro/paciente.module';
import { CatalogosModule } from '../catalogos/catalogos.module';
import { RecetaPreparacionService } from './helpers/receta-preparacion.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RecetaRepository,
      RecetaDetalleRepository,
      DispensacionRepository,
    ]),
    PacienteModule,
    CatalogosModule,
  ],
  controllers: [
    RecetaController,
    RecetaDetalleController,
    DispensacionController,
  ],
  providers: [
    RecetaService,
    RecetaDetalleService,
    DispensacionService,
    RecetaPreparacionService,
  ],
})
export class RecetaModule {}
