import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from 'antd';
import { fetchInvoiceDetails } from './httpServices';

function InvoiceDetails() {
  const { id } = useParams();
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadInvoiceDetails = async () => {
      setLoading(true);
      fetchInvoiceDetails(
        (data) => {
          setInvoice(data);
          setLoading(false);
        },
        (errorMessage) => {
          setError(errorMessage);
          setLoading(false);
        },
        id
      );
    };

    loadInvoiceDetails();
  }, [id]);

  if (loading) {
    return <div className="p-4">Loading invoice details...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>;
  }

  if (!invoice) {
    return <div className="p-4">Invoice not found.</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Invoice Details</h2>
      <p>Invoice Number: {invoice.invoiceNumber}</p>
      <p>Client Name: {invoice.clientName}</p>
      <p>Amount: {invoice.amount}</p>
      <p>Due Date: {invoice.dueDate}</p>
      <p>Status: {invoice.status}</p>
      <Button type="primary">Edit Invoice</Button>
    </div>
  );
}

export default InvoiceDetails;