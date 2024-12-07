import { CustomInputEmail } from '@/components/inputemail/inputemail';
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

describe('CustomInputEmail Component', () => {
  const mockOnChangeEmail = vi.fn();
  const mockOnRemoveRow = vi.fn();

  const defaultProps = {
    id: 'test-id',
    email: 'test@example.com',
    placeholder: 'Enter your email',
    validEmail: true,
    onChangeEmail: mockOnChangeEmail,
    onRemoveRow: mockOnRemoveRow,
  };

  it('should render the input with the correct value and placeholder', () => {
    render(<CustomInputEmail {...defaultProps} />);

    const inputElement = screen.getByPlaceholderText('Enter your email');
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveValue('test@example.com');
  });

  it('should call onChangeEmail with correct arguments when the input value changes', () => {
    render(<CustomInputEmail {...defaultProps} />);

    const inputElement = screen.getByPlaceholderText('Enter your email');
    fireEvent.change(inputElement, { target: { value: 'new@example.com' } });

    expect(mockOnChangeEmail).toHaveBeenCalledWith('test-id', 'new@example.com');
  });

  it('should render an error message if validEmail is false', () => {
    render(<CustomInputEmail {...defaultProps} validEmail={false} />);

    const errorMessage = screen.getByText('El email no tiene una estructura válida');
    expect(errorMessage).toBeInTheDocument();
  });

  it('should not render an error message if validEmail is true', () => {
    render(<CustomInputEmail {...defaultProps} validEmail={true} />);

    const errorMessage = screen.queryByText('El email no tiene una estructura válida');
    expect(errorMessage).not.toBeInTheDocument();
  });

  it('should call onRemoveRow with the correct id when the remove icon is clicked', () => {
    render(<CustomInputEmail {...defaultProps} />);

    const removeIcon = screen.getByRole('button'); 
    fireEvent.click(removeIcon);

    expect(mockOnRemoveRow).toHaveBeenCalledWith('test-id');
  });

  it('should render the delete icon', () => {
    render(<CustomInputEmail {...defaultProps} />);

    const deleteIcon = screen.getByRole('button'); 
    expect(deleteIcon).toBeInTheDocument();
  });
});