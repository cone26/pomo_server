import { DataSourceOptions, getMetadataArgsStorage } from 'typeorm';
import { CustomNamingStrategy } from '@libs/common/database/typeorm/custom-naming-strategy';
import * as process from 'process';

export const defaultTypeOrmOptions: DataSourceOptions = {
  type: 'mysql',
  url: process.env.DATABASE_URL,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER_NAME,
  password: process.env.DB_USER_PW,
  synchronize:
    (process.env.DB_SYNCHRONIZE && JSON.parse(process.env.DB_SYNCHRONIZE)) ||
    false,
  ssl: {
    rejectUnauthorized: true,
  },
  namingStrategy: new CustomNamingStrategy(),
  charset: 'utf8mb4',
  timezone: 'Z',
  extra: {
    connectionLimit:
      process.env.NODE_ENV === 'prod'
        ? Number(process.env.DB_CONNECTION_LIMIT)
        : 10,
  },
  // logging: ['query'],
  migrationsTableName: 'migrations',
  migrationsRun: process.env.NODE_ENV === 'prod' ? false : true,
};
export const commonTypeOrmModuleOptions: DataSourceOptions = {
  ...defaultTypeOrmOptions,
  name: process.env.DB_COMMON_NAME,
  database: process.env.DB_COMMON_NAME,
  entities: ['dist/libs/dao/src/common/**/*.entity.{ts,js}'],
  migrations: ['dist/libs/dao/src/migration/database/common/*.{ts,js}'],
};
