import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { ConstantesConfig } from '../../config/constantes.config';
import { CieService } from './services/cie.service';
import { ConcentracionService } from './services/concentracion.service';
import { ContraindicacionService } from './services/contraindicacion.service';
import { DosificacionService } from './services/dosificacion.service';

import { DosisMedidaService } from './services/dosis-medida.service';
import { EspecialidadService } from './services/especialidad.service';
import { EstablecimientoService } from './services/establecimiento.service';
import { EstadoService } from './services/estado.service';
import { EtniaService } from './services/etnia.service';
import { FarmaciaService } from './services/farmacia.service';
import { FormaFarmaceuticaService } from './services/forma-farmaceutica.service';
import { FrecuenciaService } from './services/frecuencia.service';
import { FuenteDatosService } from './services/fuente-datos.service';
import { IndicacionesCnmbService } from './services/indicaciones-cnmb.service';
import { InstitucionService } from './services/institucion.service';
import { InteraccionesService } from './services/interacciones.service';
import { LaboratorioFabricanteService } from './services/laboratorio-fabricante.service';
import { LugarGeograficoService } from './services/lugar-geografico.service';
import { MedicamentoService } from './services/medicamento.service';
import { MedExtService } from './services/med-ext.service';
import { NivelPrescripcionService } from './services/nivel-prescripcion.service';
import { NivelRiesgoService } from './services/nivel-riesgo.service';
import { ObservacionService } from './services/observacion.service';
import { OrganicoService } from './services/organico.service';
import { PresentacionService } from './services/presentacion.service';
import { ProductoService } from './services/producto.service';
import { ReaccionAdversaService } from './services/reaccion-adversa.service';
import { RegistroTerapeuticoService } from './services/registro-terapeutico.service';
import { ReligionService } from './services/religion.service';
import { RolProfesionalService } from './services/rol-profesional.service';
import { ServicioSaludService } from './services/servicio-salud.service';
import { TarifarioService } from './services/tarifario.service';
import { TipoAtencionService } from './services/tipo-atencion.service';
import { TipoEstablecimientoService } from './services/tipo-establecimiento.service';
import { TipoIdentificacionService } from './services/tipo-identificacion.service';
import { TipoLabAnalisisClinicoService } from './services/tipo-lab-analisis-clinico.service';
import { ViaAdministracionService } from './services/via-administracion.service';
import { CadenaFarmaciaService } from './services/cadena-farmacia.service';

@Global()
@Module({
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
    CadenaFarmaciaService,
    CieService,
    ConcentracionService,
    ContraindicacionService,
    DosificacionService,
    DosisMedidaService,
    EspecialidadService,
    EstablecimientoService,
    EstadoService,
    EtniaService,
    FarmaciaService,
    FormaFarmaceuticaService,
    FrecuenciaService,
    FuenteDatosService,
    IndicacionesCnmbService,
    InstitucionService,
    InteraccionesService,
    LaboratorioFabricanteService,
    LugarGeograficoService,
    MedicamentoService,
    MedExtService,
    NivelPrescripcionService,
    NivelRiesgoService,
    ObservacionService,
    OrganicoService,
    PresentacionService,
    ProductoService,
    ReaccionAdversaService,
    RegistroTerapeuticoService,
    ReligionService,
    RolProfesionalService,
    ServicioSaludService,
    TarifarioService,
    TipoAtencionService,
    TipoEstablecimientoService,
    TipoIdentificacionService,
    TipoLabAnalisisClinicoService,
    ViaAdministracionService,
  ],
  exports: [EstablecimientoService, FuenteDatosService, CadenaFarmaciaService],
})
export class CatalogosModule {}
