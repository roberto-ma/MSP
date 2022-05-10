import { Module } from '@nestjs/common';
import { PacienteService } from './services/paciente.service';
import { PacienteController } from './controllers/paciente.controller';
import { ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { ConstantesConfig } from '../../config/constantes.config';
import { PersonaService } from './services/persona.service';
import { PersonaController } from './controllers/persona.controller';
import { ProfesionalSaludController } from './controllers/profesional-salud.controller';
import { ProfesionalSaludService } from './services/profesional-salud.service';

@Module({
  controllers: [
    PacienteController,
    PersonaController,
    ProfesionalSaludController,
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
    PacienteService,
    PersonaService,
    ProfesionalSaludService,
  ],
})
export class PacienteModule {}
