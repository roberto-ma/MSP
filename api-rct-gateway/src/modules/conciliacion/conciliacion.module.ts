import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { ConstantesConfig } from '../../config/constantes.config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

import { ConciliacionMspController } from './controllers/conciliacion-msp.controller';
import { ConciliacionMspService } from './services/conciliacion-msp.service';

import { ConciliacionRecetaController } from './controllers/conciliacion-receta.controller';
import { ConciliacionRecetaService } from './services/conciliacion-receta.service';

import { ConciliacionDetalleController } from './controllers/conciliacion-detalle.controller';
import { ConciliacionDetalleService } from './services/conciliacion-detalle.service';
import { RecetaModule } from '../receta/receta.module';

@Module({
  imports: [RecetaModule],
  controllers: [
    ConciliacionMspController,
    ConciliacionRecetaController,
    ConciliacionDetalleController,
  ],
  providers: [
    {
      provide: ConstantesConfig.MS_RCT_CONCILIACION,
      useFactory: (config: ConfigService) => {
        return ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            host: config.get<string>('MS_RCT_CONCILIACION_HOST'),
            port: config.get<number>('MS_RCT_CONCILIACION_PORT'),
          },
        });
      },
      inject: [ConfigService],
    },
    ConciliacionMspService,
    ConciliacionRecetaService,
    ConciliacionDetalleService,
  ],
})
export class ConciliacionModule {}
