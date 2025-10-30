import React from 'react';
import { render, screen } from '@testing-library/react';
import MyTickets from '../MyTickets';
import { List } from '../../core/grid.component/index.js';

jest.mock('../../core/grid.component/index.js', () => ({
  List: jest.fn(() => <div data-testid="mocked-list">Mocked List Component</div>),
}));

describe('MyTickets Component', () => {
  it('renders the MyTickets component', () => {
    render(<MyTickets />);
    expect(screen.getByText('My Tickets')).toBeInTheDocument();
  });

  it('renders the custom List component with correct props', () => {
    render(<MyTickets />);
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
        url: 'support/myTickets',
        columns: expectedColumns,
      }),
      expect.anything()
    );
  });
});