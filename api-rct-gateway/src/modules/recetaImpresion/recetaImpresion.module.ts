import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { RecetaReImpresionService } from './services/receta.reimpresion.service';
import { ConstantesConfig } from '../../config/constantes.config';
import { RecetaReImpController } from './controllers/receta.reimpresion.controller';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

@Module({
  controllers: [RecetaReImpController],
  providers: [
    {
      provide: ConstantesConfig.MS_CATALOGO,
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
    RecetaReImpresionService,
  ],
})
export class RecetaImpModule {}
