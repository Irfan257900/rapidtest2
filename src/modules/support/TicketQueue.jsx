import React from 'react';
import { List } from '../../core/grid.component/index.js';

function TicketQueue() {
  const columns = [
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

  return (
    <div className="p-4">
      <h1>Ticket Queue</h1>
      <List url="support/ticketQueue" columns={columns} />
    </div>
  );
}

export default TicketQueue;