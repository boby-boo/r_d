import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo
} from 'sequelize-typescript';
import { User } from './User.model';

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
    type: DataType.ENUM('todo', 'in_progress', 'done'),
    defaultValue: 'todo',
  })
  status!: 'todo' | 'in_progress' | 'done';

  @Column({
    type: DataType.ENUM('low', 'medium', 'high'),
    defaultValue: 'medium',
  })
  priority!: 'low' | 'medium' | 'high';

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  deadline!: Date;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: true,
  })
  assigneeId?: string;

  @BelongsTo(() => User, { as: 'assignee' })
  assignee?: User;
}
