import { DataSourceOptions } from "typeorm/data-source/DataSourceOptions";
const envFound = require('dotenv').config()
if (!envFound) {
  // This error should crash whole process
  throw new Error("Couldn't find .env file");
} 
console.log(process.env.DB_NAME)
export const dataSourceOptions = {
  type: 'postgres',
  database: process.env.DB_NAME || "postgres",
  entities: [__dirname + '/../**/entities/*.entity.{js,ts}'],
  host: process.env.DB_HOST || 'localhost',
  port: 5432,
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || 'root',
  logging: true,
  synchronize: false,
  migrationsRun: false,
  connectTimeoutMS: 2000,
  maxQueryExecutionTime: 10000,
  options: {
    camelCaseColumns: false
  },
  //migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
} as DataSourceOptions;
