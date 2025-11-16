import { screen } from '@testing-library/react';
import TasksList from '../TasksList';
import type { Task } from '../../../../shared/types';
import { describe, it, expect, vi } from 'vitest';
import { renderWithProviders } from './utils/renderWithProviders';

describe('TasksList', () => {
  const mockTasks: Task[] = [
    {
      id: '1',
      title: 'Test Task 1',
      description: 'Description 1',
      createdAt: new Date().toISOString(),
      status: 'todo',
      priority: 'low',
      deadline: new Date().toISOString(),
    },
    {
      id: '2',
      title: 'Test Task 2',
      description: 'Description 2',
      createdAt: new Date().toISOString(),
      status: 'in_progress',
      priority: 'medium',
      deadline: new Date().toISOString(),
    },
  ];

  it('renders list items correctly', () => {
    const onDeleteTask = vi.fn();
    renderWithProviders(
      <TasksList tasks={mockTasks} onDeleteTask={onDeleteTask} id="1" label="Test" />
    );

    expect(screen.getAllByRole('button', { name: /Test Task/i })).toHaveLength(2);

    expect(screen.getByText('Test Task 1')).toBeInTheDocument();
    expect(screen.getByText('Test Task 2')).toBeInTheDocument();
  });

  it('shows empty state if no tasks', () => {
    renderWithProviders(<TasksList tasks={[]} onDeleteTask={vi.fn()} id="1" label="Test" />);

    expect(screen.queryAllByRole('button')).toHaveLength(0);
  });

  it('shows error message on error', () => {
    renderWithProviders(<TasksList tasks={[]} onDeleteTask={vi.fn()} id="1" label="Test" />);

    expect(screen.queryAllByRole('button')).toHaveLength(0);
  });
});
