import { Sequelize } from 'sequelize-typescript';
import { config } from 'dotenv';
import { User } from './User.model';
import { Task } from './Task.model';

config();

export const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  logging: false,
  models: [User, Task],
});
