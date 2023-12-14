import { DataSourceOptions } from 'typeorm';

export const commonTypeOrmModuleOptions: DataSourceOptions = {
  type: 'mysql',
  host: process.env.DB_COMMON_HOST,
  port: Number(process.env.DB_COMMON_PORT),
  username: process.env.DB_COMMON_USER,
  password: process.env.DB_COMMON_PW,
  database: process.env.DB_COMMON_NAME,
};
