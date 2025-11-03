import { Sequelize } from 'sequelize-typescript';
import { User } from './User.model';
import { Task } from './Task.model';

export const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'workmac',
  password: '123456',
  database: 'task_manager',
  logging: false,
  models: [User, Task],
});
