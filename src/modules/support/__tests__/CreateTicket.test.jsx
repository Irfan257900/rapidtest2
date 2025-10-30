import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CreateTicket from '../CreateTicket';
import { message } from 'antd';
import * as httpServices from '../httpServices';

// Mock the message and httpServices modules
jest.mock('antd', () => ({
  ...jest.requireActual('antd'),
  message: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

jest.mock('../httpServices', () => ({
  createTicket: jest.fn(),
  uploadFileWithProgress: jest.fn(),
}));

describe('CreateTicket Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the CreateTicket component', () => {
    render(<CreateTicket />);
    expect(screen.getByText('Create New Ticket')).toBeInTheDocument();
  });

  it('submits the form and creates a ticket without a file', async () => {
    render(<CreateTicket />);

    const subjectInput = screen.getByLabelText('Subject');
    const descriptionInput = screen.getByLabelText('Description');
    const prioritySelect = screen.getByLabelText('Priority');
    const categorySelect = screen.getByLabelText('Category');
    const submitButton = screen.getByText('Submit');

    fireEvent.change(subjectInput, { target: { value: 'Test Subject' } });
    fireEvent.change(descriptionInput, { target: { value: 'Test Description' } });
    fireEvent.change(prioritySelect, { target: { value: 'Medium' } });
    fireEvent.change(categorySelect, { target: { value: 'Hardware' } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(httpServices.createTicket).toHaveBeenCalledTimes(1);
      expect(httpServices.createTicket).toHaveBeenCalledWith(
        expect.any(Function),
        expect.any(Function),
        expect.objectContaining({
          subject: 'Test Subject',
          description: 'Test Description',
          priority: 'Medium',
          category: 'Hardware',
        })
      );
      expect(message.success).toHaveBeenCalledWith('Ticket created successfully!');
    });
  });

  it('submits the form and creates a ticket with a file', async () => {
    render(<CreateTicket />);

    const subjectInput = screen.getByLabelText('Subject');
    const descriptionInput = screen.getByLabelText('Description');
    const prioritySelect = screen.getByLabelText('Priority');
    const categorySelect = screen.getByLabelText('Category');
    const submitButton = screen.getByText('Submit');
    const fileInput = screen.getByText('Select File');

    fireEvent.change(subjectInput, { target: { value: 'Test Subject' } });
    fireEvent.change(descriptionInput, { target: { value: 'Test Description' } });
    fireEvent.change(prioritySelect, { target: { value: 'Medium' } });
    fireEvent.change(categorySelect, { target: { value: 'Hardware' } });

    const file = new File(['(binary data)'], 'test-file.txt', { type: 'text/plain' });
    
    // Mock the file input change event
    const uploadButton = screen.getByRole('button', { name: /select file/i });
    fireEvent.click(uploadButton);

    // Mock the file upload
    const mockFileList = {
        0: file,
        length: 1,
        item: (index) => (index === 0 ? file : null),
    };

    Object.defineProperty(fileInput, 'files', {
        value: mockFileList,
        writable: true,
    });

    fireEvent.change(fileInput, { target: { files: mockFileList } });

    // Mock the uploadFileWithProgress function
    httpServices.uploadFileWithProgress.mockImplementation(
        (onSuccess) => {
            onSuccess({ url: 'http://example.com/test-file.txt' });
        }
    );

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(httpServices.uploadFileWithProgress).toHaveBeenCalledTimes(1);
      expect(httpServices.createTicket).toHaveBeenCalledTimes(1);
      expect(httpServices.createTicket).toHaveBeenCalledWith(
        expect.any(Function),
        expect.any(Function),
        expect.objectContaining({
          subject: 'Test Subject',
          description: 'Test Description',
          priority: 'Medium',
          category: 'Hardware',
          attachment: 'http://example.com/test-file.txt',
        })
      );
      expect(message.success).toHaveBeenCalledWith('Ticket created successfully!');
    });
  });

  it('displays an error message if file upload fails', async () => {
    render(<CreateTicket />);

    const subjectInput = screen.getByLabelText('Subject');
    const descriptionInput = screen.getByLabelText('Description');
    const prioritySelect = screen.getByLabelText('Priority');
    const categorySelect = screen.getByLabelText('Category');
    const submitButton = screen.getByText('Submit');
    const fileInput = screen.getByText('Select File');

    fireEvent.change(subjectInput, { target: { value: 'Test Subject' } });
    fireEvent.change(descriptionInput, { target: { value: 'Test Description' } });
    fireEvent.change(prioritySelect, { target: { value: 'Medium' } });
    fireEvent.change(categorySelect, { target: { value: 'Hardware' } });

    const file = new File(['(binary data)'], 'test-file.txt', { type: 'text/plain' });
    
    // Mock the file input change event
    const uploadButton = screen.getByRole('button', { name: /select file/i });
    fireEvent.click(uploadButton);

    // Mock the file upload
    const mockFileList = {
        0: file,
        length: 1,
        item: (index) => (index === 0 ? file : null),
    };

    Object.defineProperty(fileInput, 'files', {
        value: mockFileList,
        writable: true,
    });

    fireEvent.change(fileInput, { target: { files: mockFileList } });

    // Mock the uploadFileWithProgress function
    httpServices.uploadFileWithProgress.mockImplementation(
        (onSuccess, onError) => {
            onError('File upload failed');
        }
    );

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(httpServices.uploadFileWithProgress).toHaveBeenCalledTimes(1);
      expect(message.error).toHaveBeenCalledWith('File upload failed: File upload failed');
    });
  });

  it('displays an error message if ticket creation fails', async () => {
    render(<CreateTicket />);

    const subjectInput = screen.getByLabelText('Subject');
    const descriptionInput = screen.getByLabelText('Description');
    const prioritySelect = screen.getByLabelText('Priority');
    const categorySelect = screen.getByLabelText('Category');
    const submitButton = screen.getByText('Submit');

    fireEvent.change(subjectInput, { target: { value: 'Test Subject' } });
    fireEvent.change(descriptionInput, { target: { value: 'Test Description' } });
    fireEvent.change(prioritySelect, { target: { value: 'Medium' } });
    fireEvent.change(categorySelect, { target: { value: 'Hardware' } });

    httpServices.createTicket.mockImplementation(
        (onSuccess, onError) => {
            onError('Ticket creation failed');
        }
    );

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(httpServices.createTicket).toHaveBeenCalledTimes(1);
      expect(message.error).toHaveBeenCalledWith('Failed to create ticket: Ticket creation failed');
    });
  });
});