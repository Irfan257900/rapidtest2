import React from 'react';
import { List } from '../../core/grid.component/index.js';

function InvoiceList() {
  const columns = [
    { field: 'invoiceNumber', title: 'Invoice Number', filterType: 'text' },
    { field: 'clientName', title: 'Client Name', filterType: 'text' },
    { field: 'amount', title: 'Amount', filterType: 'numeric' },
    { field: 'dueDate', title: 'Due Date', filterType: 'date' },
    { field: 'status', title: 'Status', filterType: 'text' },
  ];

  return (
    <div className="p-4">
      <List url="invoices" columns={columns} />
    </div>
  );
}

export default InvoiceList;