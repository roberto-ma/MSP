import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { RecetaImpPacienteService } from './service/recetaImpPaciente.service';
import { ConstantesConfig } from '../../config/constantes.config';
import { RecetaImpPacienteController } from './controllers/recetaImpPaciente.controller';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

@Module({
  controllers: [RecetaImpPacienteController],
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
    RecetaImpPacienteService,
  ],
})
export class RecetaImpPacienteModule {}
