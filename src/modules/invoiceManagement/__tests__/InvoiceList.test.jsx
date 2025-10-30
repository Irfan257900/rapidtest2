import React from 'react';
import { render, screen } from '@testing-library/react';
import InvoiceList from '../InvoiceList';
import { List } from '../../../core/grid.component/index.js';

jest.mock('../../../core/grid.component/index.js', () => ({
  List: jest.fn(() => <div data-testid="mock-list">Mock List Component</div>),
}));

describe('InvoiceList Component', () => {
  it('renders the custom List component with correct props', () => {
    render(<InvoiceList />);

    expect(List).toHaveBeenCalledTimes(1);
    expect(List).toHaveBeenCalledWith(expect.objectContaining({
      url: 'invoices',
      columns: expect.any(Array),
    }));

    const mockListElement = screen.getByTestId('mock-list');
    expect(mockListElement).toBeInTheDocument();
  });
});