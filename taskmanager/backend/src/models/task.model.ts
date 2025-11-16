import {
  Table,
  Column,
  Model,
  DataType,
} from 'sequelize-typescript';
import { TaskPriority, TaskStatus } from '../types/task.types';

@Table({
  tableName: 'tasks',
  timestamps: true,
})
export class Task extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  declare id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  description!: string;

  @Column({
    type: DataType.ENUM(TaskStatus.TODO, TaskStatus.IN_PROGRESS, TaskStatus.REVIEW, TaskStatus.DONE),
    defaultValue: TaskStatus.TODO,
  })
  status!: typeof TaskStatus.TODO;

  @Column({
    type: DataType.ENUM(TaskPriority.LOW, TaskPriority.MEDIUM, TaskPriority.HIGH),
    defaultValue: TaskPriority.LOW,
  })
  priority!: typeof TaskPriority.LOW;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  deadline!: Date;
}
