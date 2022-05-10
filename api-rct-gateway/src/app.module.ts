import { APP_FILTER } from '@nestjs/core';
// import { AllExceptionsFilter } from './filters/exception.filter';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';

/* Acceso y autorización */
import { APP_GUARD } from '@nestjs/core';
import { RoleGuard, AuthGuard } from 'nest-keycloak-connect';
import { KeycloakConnectModule, ResourceGuard } from 'nest-keycloak-connect';
import { KeycloakMultiTenantService } from 'nest-keycloak-connect/services/keycloak-multitenant.service';

/* Configuración */
import graphqlConfig from './config/gql.config';
import keycloakConfig from './config/keycloak.config';

/* Controladores */
import { AppService } from './app.service';

/* Módulos */
import { HttpExceptionFilter } from './filters/exception.filter';
import { PacienteModule } from './modules/maestro/paciente.module';
import { ConciliacionModule } from './modules/conciliacion/conciliacion.module';
import { ConstantesConfig } from './config/constantes.config';
import { RecetaModule } from './modules/receta/receta.module';
import { AuthModule } from './modules/auth/auth.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { CatalogosModule } from './modules/catalogos/catalogos.module';
import { RecetaImpModule } from './modules/recetaImpresion/recetaImpresion.module';
import { RecetaImpPacienteModule } from './modules/recetaImpPaciente/recetaImpPaciente.Module';
import { RIFarmaciaModule } from './modules/recetaFarmacia/recetaImpFarmacia.Module';

@Module({
  imports: [
    KeycloakConnectModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) =>
        config.get(ConstantesConfig.KEYCLOAK_CONFIG),
    }),
    ThrottlerModule.forRoot({
      ttl: ConstantesConfig.LOGIN_TTL,
      limit: ConstantesConfig.LOGIN_PETICIONES,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [graphqlConfig, keycloakConfig],
      envFilePath: '.env',
    }),
    CatalogosModule,
    PacienteModule,
    ConciliacionModule,
    RecetaModule,
    AuthModule,
    RecetaImpModule,
    RecetaImpPacienteModule,
    RIFarmaciaModule,
  ],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    KeycloakMultiTenantService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ResourceGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
})
export class AppModule {}
