import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskForm from '../components/TaskForm';

describe('TaskForm', () => {
  it('renders form inputs', () => {
    const mockOnCreate = vi.fn();
    render(<TaskForm onCreate={mockOnCreate} />);

    expect(screen.getByLabelText(/título/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/descripción/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /agregar tarea/i })).toBeInTheDocument();
  });

  it('calls onCreate with correct values when form is submitted', async () => {
    const mockOnCreate = vi.fn();
    render(<TaskForm onCreate={mockOnCreate} />);

    const titleInput = screen.getByLabelText(/título/i);
    const descriptionInput = screen.getByLabelText(/descripción/i);
    const submitButton = screen.getByRole('button', { name: /agregar tarea/i });

    fireEvent.change(titleInput, { target: { value: 'Test Task' } });
    fireEvent.change(descriptionInput, { target: { value: 'Test Description' } });
    fireEvent.click(submitButton);

    expect(mockOnCreate).toHaveBeenCalledWith('Test Task', 'Test Description');
  });

  it('clears form after submission', () => {
    const mockOnCreate = vi.fn();
    render(<TaskForm onCreate={mockOnCreate} />);

    const titleInput = screen.getByLabelText(/título/i);
    const descriptionInput = screen.getByLabelText(/descripción/i);
    const submitButton = screen.getByRole('button', { name: /agregar tarea/i });

    fireEvent.change(titleInput, { target: { value: 'Test Task' } });
    fireEvent.change(descriptionInput, { target: { value: 'Test Description' } });
    fireEvent.click(submitButton);

    expect(titleInput).toHaveValue('');
    expect(descriptionInput).toHaveValue('');
  });
});