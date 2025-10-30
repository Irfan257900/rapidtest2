import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import InvoiceDetails from '../InvoiceDetails';
import { useParams } from 'react-router-dom';
import * as httpServices from '../httpServices';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}));

jest.mock('../httpServices', () => ({
  fetchInvoiceDetails: jest.fn(),
}));

describe('InvoiceDetails Component', () => {
  it('calls fetchInvoiceDetails on mount with the invoice ID from useParams', async () => {
    const mockInvoiceId = '123';
    useParams.mockReturnValue({ id: mockInvoiceId });

    const fetchInvoiceDetailsMock = httpServices.fetchInvoiceDetails;
    fetchInvoiceDetailsMock.mockImplementation((onSuccess) => {
      onSuccess({ invoiceNumber: 'INV-001', clientName: 'Test Client', amount: 100, dueDate: '2024-01-01', status: 'Paid' });
    });

    render(<InvoiceDetails />);

    await waitFor(() => {
      expect(fetchInvoiceDetailsMock).toHaveBeenCalledTimes(1);
      expect(fetchInvoiceDetailsMock).toHaveBeenCalledWith(
        expect.any(Function),
        expect.any(Function),
        mockInvoiceId
      );
    });
  });
});