import React from 'react';
import { render, screen } from '@testing-library/react';
import TicketQueue from '../TicketQueue';
import { List } from '../../core/grid.component/index.js';

jest.mock('../../core/grid.component/index.js', () => ({
  List: jest.fn(() => <div data-testid="mocked-list">Mocked List Component</div>),
}));

describe('TicketQueue Component', () => {
  it('renders the TicketQueue component', () => {
    render(<TicketQueue />);
    expect(screen.getByText('Ticket Queue')).toBeInTheDocument();
  });

  it('renders the custom List component with correct props', () => {
    render(<TicketQueue />);
    expect(screen.getByTestId('mocked-list')).toBeInTheDocument();

    const expectedColumns = [
      {
        title: 'Ticket ID',
        field: 'ticketId',
      },
      {
        title: 'Subject',
        field: 'subject',
      },
      {
        title: 'Status',
        field: 'status',
      },
      {
        title: 'Priority',
        field: 'priority',
      },
      {
        title: 'Last Updated Date',
        field: 'lastUpdatedDate',
      },
    ];

    expect(List).toHaveBeenCalledWith(
      expect.objectContaining({
        url: 'support/ticketQueue',
        columns: expectedColumns,
      }),
      expect.anything()
    );
  });
});