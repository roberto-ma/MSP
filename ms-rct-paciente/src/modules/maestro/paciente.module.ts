import { Module } from '@nestjs/common';
import { PacienteService } from './services/paciente.service';
import { PacienteController } from './controllers/paciente.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PacienteRepository } from './repositories/paciente.repository';
import { PersonaController } from './controllers/persona.controller';
import { PersonaService } from './services/persona.service';
import { PersonaRepository } from './repositories/persona.repository';
import { ProfesionalSaludRepository } from './repositories/profesional-salud.repository';
import { ProfesionalSaludController } from './controllers/profesional-salud.controller';
import { ProfesionalSaludService } from './services/profesional-salud.service';
import { ProfsaludEstablecimientoRepository } from './repositories/profsalud-establecimiento.repository';
import { ProfsaludEstablecimientoService } from './services/profsalud-establecimiento.service';
import { PersonaSoapService } from './helpers/persona.soap.service';
import { SoapService } from './helpers/soap.service';
import { RegistroCivilSoapService } from './helpers/registro-civil-soap.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PacienteRepository,
      PersonaRepository,
      ProfesionalSaludRepository,
      ProfsaludEstablecimientoRepository,
    ]),
  ],
  controllers: [
    PacienteController,
    PersonaController,
    ProfesionalSaludController,
  ],
  providers: [
    PacienteService,
    PersonaService,
    ProfesionalSaludService,
    ProfsaludEstablecimientoService,
    PersonaSoapService,
    SoapService,
    RegistroCivilSoapService,
  ],
  exports: [
    PacienteService,
    PersonaService,
    ProfesionalSaludService,
    ProfsaludEstablecimientoService,
  ],
})
export class PacienteModule {}
