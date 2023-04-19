import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { User } from './entities/User';
import { addUserEntity1681910262211 } from './migrations/1681910262211-addUserEntity';
import path from 'path';
config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: String(process.env.POSTGRES_USER),
  password: String(process.env.POSTGRES_PASSWORD),
  database: String(process.env.POSTGRES_DB),
  synchronize: false,
  logging: false,
  entities: [User], // через путь не работает
  migrations: [addUserEntity1681910262211], // через путь не работает
  subscribers: [],
});
