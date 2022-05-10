/**
 * @ Author: Anthony Loyaga
 * @ Create Time: 2022-02-16 15:02:00
 * @ Modified by: Anthony Loyaga
 * @ Modified time: 2022-04-04 10:48:23
 * @ Description:
 */

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import databaseConfig from './config/database.config';
import { APP_FILTER } from '@nestjs/core';
import { RPCExceptionFilterLogger } from './filters/rpc-exception.filter';
import { ConstantesConfig } from './config/constantes-config';
import { PacienteModule } from './modules/maestro/paciente.module';
import { RecetaModule } from './modules/receta/receta.module';
import { CatalogosModule } from './modules/catalogos/catalogos.module';
import { RecetaImpresionModule } from './modules/recetaImpresion/recetaImpresion.module';
import { RecetaImpPacienteModule } from './modules/recetaImpPaciente/recetaImpPaciente.module';
import { RecetaImpFarmaciaModule } from './modules/recetaFarmacia/recetaImpFarmacia.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) =>
        config.get(ConstantesConfig.TYPEORM_CONFIG),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
      envFilePath: '.env',
    }),
    CatalogosModule,
    RecetaImpresionModule,
    PacienteModule,
    RecetaModule,
    RecetaImpPacienteModule,
    RecetaImpFarmaciaModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: RPCExceptionFilterLogger,
    },
  ],
})
export class AppModule {}
