import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cie } from './entities/cie.entity';
import { Concentracion } from './entities/concentracion.entity';
import { Establecimiento } from './entities/establecimiento.entity';
import { Contraindicacion } from './entities/contraindicacion.entity';
import { Dispositivo } from './entities/dispositivo.entity';
import { Dosificacion } from './entities/dosificacion.entity';
import { Especialidad } from './entities/especialidad.entity';
import { Estado } from './entities/estadoreceta.entity';
import { Etnia } from './entities/etnia.entity';
import { Farmacia } from './entities/farmacia.entity';
import { FormaFarmaceutica } from './entities/forma-farmaceutica.entity';
import { Frecuencia } from './entities/frecuencia.entity';
import { FuenteDatos } from './entities/fuente-datos.entity';
import { IndicacionesCnmb } from './entities/indicaciones-cnmb.entity';
import { Institucion } from './entities/institucion.entity';
import { Interacciones } from './entities/interacciones.entity';
import { LaboratorioFabricante } from './entities/laboratorio-fabricante.entity';
import { LugarGeografico } from './entities/lugar-geografico.entity';
import { Medicamento } from './entities/medicamento.entity';
import { NivelPrescripcion } from './entities/nivel-prescripcion.entity';
import { RiesgoMedicamento } from './entities/riesgomedicamento.entity';
import { Observacion } from './entities/observacion.entity';
import { Organico } from './entities/organico.entity';
import { Presentacion } from './entities/presentacion.entity';
import { Producto } from './entities/producto.entity';
import { ReaccionAdversa } from './entities/reaccion-adversa.entity';
import { RegistroTerapeutico } from './entities/registro-terapeutico.entity';
import { Religion } from './entities/religion.entity';
import { RolProfesional } from './entities/rol-profesional.entity';
import { ServicioSalud } from './entities/servicio-salud.entity';
import { TipoAtencion } from './entities/tipo-atencion.entity';
import { TipoEstablecimiento } from './entities/tipo-establecimiento.entity';
import { TipoIdentificacion } from './entities/tipo-identificacion.entity';
import { TipoLabAnalisisClinico } from './entities/tipo-lab-analisis-clinico.entity';
import { ViaAdministracion } from './entities/via-administracion.entity';
import { EstablecimientoService } from './services/establecimiento.service';
import { EstablecimientoRepository } from './repositories/establecimiento.repository';
import { MedicamentoRepository } from './repositories/medicamento.repository';
import { MedicamentoService } from './services/medicamento.service';
import { TarifarioRepository } from './repositories/tarifario.repository';
import { TarifarioService } from './services/tarifario.service';
import { CieService } from './services/cie.service';
import { CieRepository } from './repositories/cie.repository';
import { CieController } from './controller/cie.controller';
import { ConcentracionRepository } from './repositories/concentracion.repository';
import { ConcentracionController } from './controller/concentracion.controller';
import { ConcentracionService } from './services/concentracion.service';
import { ContraindicacionRepository } from './repositories/contraindicacion.repository';
import { DosificacionRepository } from './repositories/dosificacion.repository';
import { EspecialidadRepository } from './repositories/especialidad.repository';
import { EstadoRepository } from './repositories/estado.repository';
import { ContraindicacionService } from './services/contraindicacion.service';
import { DosificacionService } from './services/dosificacion.service';
import { DosisMedidaService } from './services/dosis-medida.service';
import { EspecialidadService } from './services/especialidad.service';
import { DosisMedida } from './entities/dosis-medida.entity';
import { DosisMedidaRepository } from './repositories/dosis-medida.repository';
import { ContraindicacionController } from './controller/contraindicacion.controller';
import { DosificacionController } from './controller/dosificacion.controller';
import { EtniaRepository } from './repositories/etnia.repository';
import { FarmaciaRepository } from './repositories/farmacia.repository';
import { FormaFarmaceuticaRepository } from './repositories/forma-farmaceutica.repository';
import { FrecuenciaRepository } from './repositories/frecuencia.repository';
import { FuenteDatosRepository } from './repositories/fuente-datos.repository';
import { IndicacionesCnmbRepository } from './repositories/indicaciones-cnmb.repository';
import { InstitucionRepository } from './repositories/institucion.repository';
import { InteraccionesRepository } from './repositories/interacciones.repository';
import { LaboratorioFabricanteRepository } from './repositories/laboratorio-fabricante.repository';
import { LugarGeograficoRepository } from './repositories/lugar-geografico.repository';
import { NivelPrescripcionRepository } from './repositories/nivel-prescripcion.repository';
import { RiesgoMedicamentoRepository } from './repositories/riesgomedicamento.repository';
import { ObservacionRepository } from './repositories/observacion.repository';
import { OrganicoRepository } from './repositories/organico.repository';
import { PresentacionRepository } from './repositories/presentacion.repository';
import { ProductoRepository } from './repositories/producto.repository';
import { ReaccionAdversaRepository } from './repositories/reaccion-adversa.repository';
import { RegistroTerapeuticoRepository } from './repositories/registro-terapeutico.repository';
import { ReligionRepository } from './repositories/religion.repository';
import { RolProfesionalRepository } from './repositories/rol-profesional.repository';
import { ServicioSaludRepository } from './repositories/servicio-salud.repository';
import { Tarifario } from './entities/tarifario.entity';
import { TipoAtencionRepository } from './repositories/tipo-atencion.repository';
import { TipoIdentificacionRepository } from './repositories/tipo-identificacion.repository';
import { TipoLabAnalisisClinicoRepository } from './repositories/tipo-lab-analisis-clinico.repository';
import { ViaAdministracionRepository } from './repositories/via-administracion.repository';
import { DosisMedidaController } from './controller/dosis-medida.controller';
import { EspecialidadController } from './controller/especialidad.controller';
import { EstablecimientoController } from './controller/establecimiento.controller';
import { EstadoController } from './controller/estado.controller';
import { EtniaController } from './controller/etnia.controller';
import { FarmaciaController } from './controller/farmacia.controller';
import { FormaFarmaceuticaController } from './controller/forma-farmaceutica.controller';
import { FuenteDatosController } from './controller/fuente-datos.controller';
import { FrecuenciaController } from './controller/frecuencia.controller';
import { IndicacionesCnmbController } from './controller/indicaciones-cnmb.controller';
import { InstitucionController } from './controller/institucion.controller';
import { InteraccionesController } from './controller/interacciones.controller';
import { LaboratorioFabricanteController } from './controller/laboratorio-fabricante.controller';
import { LugarGeograficoController } from './controller/lugar-geografico.controller';
import { MedicamentoController } from './controller/medicamento.controller';
import { NivelPrescripcionController } from './controller/nivel-prescripcion.controller';
import { RiesgoMedicamentoController } from './controller/riesgomedicamento.controller';
import { ObservacionController } from './controller/observacion.controller';
import { OrganicoController } from './controller/organico.controller';
import { PresentacionController } from './controller/presentacion.controller';
import { ProductoController } from './controller/producto.controller';
import { ReaccionAdversaController } from './controller/reaccion-adversa.controller';
import { RegistroTerapeuticoController } from './controller/registro-terapeutico.controller';
import { ReligionController } from './controller/religion.controller';
import { RolProfesionalController } from './controller/rol-profesional.controller';
import { ServicioSaludController } from './controller/servicio-salud.controller';
import { TarifarioController } from './controller/tarifario.controller';
import { TipoAtencionController } from './controller/tipo-atencion.controller';
import { TipoEstablecimientoController } from './controller/tipo-establecimiento.controller';
import { TipoIdentificacionController } from './controller/tipo-identificacion.controller';
import { TipoLabAnalisisClinicoController } from './controller/tipo-lab-analisis-clinico.controller';
import { ViaAdministracionController } from './controller/viaAdministracion.controller';
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
import { NivelPrescripcionService } from './services/nivel-prescripcion.service';
import { RiesgoMedicamentoService } from './services/riesgomedicamento.service';
import { ObservacionService } from './services/observacion.service';
import { OrganicoService } from './services/organico.service';
import { PresentacionService } from './services/presentacion.service';
import { ProductoService } from './services/producto.service';
import { ReaccionAdversaService } from './services/reaccion-adversa.service';
import { RegistroTerapeuticoService } from './services/registro-terapeuttico.service';
import { ReligionService } from './services/religion.service';
import { RolProfesionalService } from './services/rol-profesional.service';
import { ServicioSaludService } from './services/servicio-salud.service';
import { TipoAtencionService } from './services/tipo-atencion.service';
import { TipoEstablecimientoService } from './services/tipo-establecimiento.service';
import { TipoIdentificacionService } from './services/tipo-identificacion.service';
import { TipoLabAnalisisClinicoService } from './services/tipo-lab-analisis-clinico.service';
import { ViaAdministracionService } from './services/via-administracion.service';
import { TipoEstablecimientoRepository } from './repositories/tipo-establecimiento.repository';
import { Parentesco } from './entities/parentesco.entity';
import { CadenaFarmaciaRepository } from './repositories/cadena-farmacia.repository';
import { CadenaFarmaciaService } from './services/cadena-farmacia.service';
import { CadenaFarmaciaController } from './controller/cadena-farmacia.controller';
@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([
      CadenaFarmaciaRepository,
      Cie,
      CieRepository,
      Concentracion,
      ConcentracionRepository,
      Contraindicacion,
      ContraindicacionRepository,
      Dispositivo,
      Dosificacion,
      DosificacionRepository,
      DosisMedida,
      DosisMedidaRepository,
      DosisMedidaRepository,
      Especialidad,
      EspecialidadRepository,
      Establecimiento,
      EstablecimientoRepository,
      Estado,
      EstadoRepository,
      Etnia,
      EtniaRepository,
      Farmacia,
      FarmaciaRepository,
      FormaFarmaceutica,
      FormaFarmaceuticaRepository,
      Frecuencia,
      FrecuenciaRepository,
      FuenteDatos,
      FuenteDatosRepository,
      IndicacionesCnmb,
      IndicacionesCnmbRepository,
      Institucion,
      InstitucionRepository,
      Interacciones,
      InteraccionesRepository,
      LaboratorioFabricante,
      LaboratorioFabricanteRepository,
      LugarGeografico,
      LugarGeograficoRepository,
      Medicamento,
      MedicamentoRepository,
      NivelPrescripcion,
      NivelPrescripcionRepository,
      RiesgoMedicamento,
      RiesgoMedicamentoRepository,
      Observacion,
      ObservacionRepository,
      Organico,
      OrganicoRepository,
      Parentesco,
      Presentacion,
      PresentacionRepository,
      Producto,
      ProductoRepository,
      ReaccionAdversa,
      ReaccionAdversaRepository,
      RegistroTerapeutico,
      RegistroTerapeuticoRepository,
      Religion,
      ReligionRepository,
      RolProfesional,
      RolProfesionalRepository,
      ServicioSalud,
      ServicioSaludRepository,
      Tarifario,
      TarifarioRepository,
      TipoAtencion,
      TipoAtencionRepository,
      TipoEstablecimiento,
      TipoEstablecimientoRepository,
      TipoIdentificacion,
      TipoIdentificacionRepository,
      TipoLabAnalisisClinico,
      TipoLabAnalisisClinicoRepository,
      ViaAdministracion,
      ViaAdministracionRepository,
    ]),
  ],
  controllers: [
    CadenaFarmaciaController,
    CieController,
    ConcentracionController,
    ContraindicacionController,
    DosificacionController,
    DosisMedidaController,
    EspecialidadController,
    EstablecimientoController,
    EstadoController,
    EtniaController,
    FarmaciaController,
    FormaFarmaceuticaController,
    FrecuenciaController,
    FuenteDatosController,
    IndicacionesCnmbController,
    InstitucionController,
    InteraccionesController,
    LaboratorioFabricanteController,
    LugarGeograficoController,
    MedicamentoController,
    NivelPrescripcionController,
    RiesgoMedicamentoController,
    ObservacionController,
    OrganicoController,
    PresentacionController,
    ProductoController,
    ReaccionAdversaController,
    RegistroTerapeuticoController,
    ReligionController,
    RolProfesionalController,
    ServicioSaludController,
    TarifarioController,
    TipoAtencionController,
    TipoEstablecimientoController,
    TipoIdentificacionController,
    TipoLabAnalisisClinicoController,
    ViaAdministracionController,
  ],
  providers: [
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
    NivelPrescripcionService,
    RiesgoMedicamentoService,
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
  exports: [
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
    NivelPrescripcionService,
    RiesgoMedicamentoService,
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
})
export class CatalogosModule {}
