import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import TaskList from '../components/TaskList';
import type { Task } from '../types/task';

const mockTasks: Task[] = [
  {
    id: '1',
    userId: 'user1',
    title: 'Task 1',
    description: 'Description 1',
    completed: false,
    createdAt: '2023-01-01T00:00:00.000Z',
    updatedAt: '2023-01-01T00:00:00.000Z'
  },
  {
    id: '2',
    userId: 'user1',
    title: 'Task 2',
    description: 'Description 2',
    completed: true,
    createdAt: '2023-01-01T00:00:00.000Z',
    updatedAt: '2023-01-01T00:00:00.000Z'
  }
];

describe('TaskList', () => {
  it('renders tasks correctly', () => {
    const mockOnToggle = vi.fn();
    const mockOnDelete = vi.fn();

    render(<TaskList tasks={mockTasks} onToggle={mockOnToggle} onDelete={mockOnDelete} />);

    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.getByText('Description 1')).toBeInTheDocument();
    expect(screen.getByText('Task 2')).toBeInTheDocument();
    expect(screen.getByText('Description 2')).toBeInTheDocument();
  });

  it('shows empty message when no tasks', () => {
    const mockOnToggle = vi.fn();
    const mockOnDelete = vi.fn();

    render(<TaskList tasks={[]} onToggle={mockOnToggle} onDelete={mockOnDelete} />);

    expect(screen.getByText('No hay tareas creadas aún.')).toBeInTheDocument();
  });

  it('renders toggle and delete buttons for each task', () => {
    const mockOnToggle = vi.fn();
    const mockOnDelete = vi.fn();

    render(<TaskList tasks={mockTasks} onToggle={mockOnToggle} onDelete={mockOnDelete} />);

    const toggleButtons = screen.getAllByText(/marcar como/i);
    const deleteButtons = screen.getAllByText('Eliminar');

    expect(toggleButtons).toHaveLength(2);
    expect(deleteButtons).toHaveLength(2);
  });
});