import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { RecetaService } from './services/receta.service';
import { ConstantesConfig } from '../../config/constantes.config';
import { RecetaController } from './controllers/receta.controller';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { RecetaDetalleService } from './services/receta-detalle.service';
import { RecetaDetalleController } from './controllers/receta-detalle.controller';
import { DispensacionService } from './services/dispensacion.service';
import { DispensacionController } from './controllers/dispensacion.controller';

@Module({
  controllers: [
    RecetaController,
    RecetaDetalleController,
    DispensacionController,
  ],
  providers: [
    {
      provide: ConstantesConfig.MS_RCT_PACIENTE,
      useFactory: (config: ConfigService) => {
        return ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            host: config.get<string>('MS_RCT_PACIENTE_HOST'),
            port: config.get<number>('MS_RCT_PACIENTE_PORT'),
          },
        });
      },
      inject: [ConfigService],
    },
    RecetaService,
    RecetaDetalleService,
    DispensacionService,
  ],
  exports: [DispensacionService, RecetaService, DispensacionService],
})
export class RecetaModule {}
