import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConstantesConfig } from '../../config/constantes.config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

import { RecetaImpFarmaciaService } from '../../modules/recetaFarmacia/services/recetaImpFarmacia.service';
import { RecetaImpFarmaciaController } from '../../modules/recetaFarmacia/controllers/recetaImpFarmacia.controller';

@Module({
  controllers: [RecetaImpFarmaciaController],
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
    RecetaImpFarmaciaService,
  ],
})
export class RIFarmaciaModule {}
