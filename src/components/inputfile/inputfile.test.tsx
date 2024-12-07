import { CustomFileInput } from "@/components/inputfile/inputfile";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

describe('CustomFileInput', () => {
  const handleFileChange = vi.fn();

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should render the component correctly', () => {
    render(
      <CustomFileInput
        title="Upload File"
        fileName="example.txt"
        accept=".txt"
        disabled={false}
        handleFileChange={handleFileChange}
      />
    );

    expect(screen.getByText('Upload File')).toBeInTheDocument();

    expect(screen.getByText('example.txt')).toBeInTheDocument();

    const fileInput = screen.getByLabelText('Upload File') as HTMLInputElement;
    expect(fileInput).toBeInTheDocument();
    expect(fileInput).toHaveAttribute('accept', '.txt');
    expect(fileInput).not.toBeDisabled();
  });

  it('should add the correct class when disabled', () => {
    render(
      <CustomFileInput
        title="Upload File"
        fileName="example.txt"
        accept=".txt"
        disabled={true}
        handleFileChange={handleFileChange}
      />
    );

    const label = screen.getByText('Upload File').closest('label');
    expect(label).toHaveClass('custom-file-input__disabled');
  });

  it('should not show file name if empty', () => {
    render(
      <CustomFileInput
        title="Upload File"
        fileName=""
        accept=".txt"
        disabled={false}
        handleFileChange={handleFileChange}
      />
    );

    expect(screen.queryByText('example.txt')).not.toBeInTheDocument();
  });

  it('should call handleFileChange when a file is selected', () => {
    render(
      <CustomFileInput
        title="Upload File"
        fileName="example.txt"
        accept=".txt"
        disabled={false}
        handleFileChange={handleFileChange}
      />
    );

    const fileInput = screen.getByLabelText('Upload File') as HTMLInputElement;
    fireEvent.change(fileInput, {
      target: { files: [new File(['dummy content'], 'test.txt', { type: 'text/plain' })] },
    });

    expect(handleFileChange).toHaveBeenCalled();
  });

  it('should disable the file input when disabled prop is true', () => {
    render(
      <CustomFileInput
        title="Upload File"
        fileName="example.txt"
        accept=".txt"
        disabled={true}
        handleFileChange={handleFileChange}
      />
    );

    const fileInput = screen.getByLabelText('Upload File') as HTMLInputElement;
    expect(fileInput).toBeDisabled();
  });
});
