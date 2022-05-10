/**
 * @ Author: Anthony Loyaga
 * @ Create Time: 2022-02-16 15:02:00
 * @ Modified by: Diego Orellana
 * @ Modified time: 2022-02-16 15:25:53
 * @ Description:
 */

import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

function typeormModuleOptions(): TypeOrmModuleOptions {
  return {
    type: 'oracle',
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    database: process.env.DATABASE_NAME,
    serviceName: process.env.DATABASE_NAME,
    entities: [__dirname + '../**/**/*entity{.ts,.js}'],
    autoLoadEntities: true,
    synchronize: false,
    logger: 'file',
    logging: ['query', 'error'],
  };
}

export default registerAs('database', () => ({
  config: typeormModuleOptions(),
}));
