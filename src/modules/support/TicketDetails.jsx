import React, { useState, useEffect } from 'react';
import { Button, Input, message } from 'antd';
import { List } from '../../core/grid.component/index.js';
import { getTicketDetails, addReply, changeStatus } from './httpServices';

const { TextArea } = Input;

function TicketDetails({ ticketId }) {
  const [ticket, setTicket] = useState(null);
  const [comments, setComments] = useState([]);
  const [replyText, setReplyText] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTicketDetails = async () => {
      setLoading(true);
      getTicketDetails(
        (data) => {
          setTicket(data);
          setComments(data.comments || []);
        },
        (errorMessage) => {
          message.error(`Failed to fetch ticket details: ${errorMessage}`);
        },
        ticketId
      );
      setLoading(false);
    };

    fetchTicketDetails();
  }, [ticketId]);

  const handleAddReply = () => {
    addReply(
      () => {
        message.success('Reply added successfully!');
        setReplyText('');
        // Refresh ticket details to show new comment
        getTicketDetails(
          (data) => {
            setTicket(data);
            setComments(data.comments || []);
          },
          (errorMessage) => {
            message.error(`Failed to fetch ticket details: ${errorMessage}`);
          },
          ticketId
        );
      },
      (errorMessage) => {
        message.error(`Failed to add reply: ${errorMessage}`);
      },
      ticketId,
      replyText
    );
  };

  const handleChangeStatus = (newStatus) => {
    changeStatus(
      () => {
        message.success(`Status changed to ${newStatus} successfully!`);
        // Refresh ticket details to show new status
        getTicketDetails(
          (data) => {
            setTicket(data);
          },
          (errorMessage) => {
            message.error(`Failed to fetch ticket details: ${errorMessage}`);
          },
          ticketId
        );
      },
      (errorMessage) => {
        message.error(`Failed to change status: ${errorMessage}`);
      },
      ticketId,
      newStatus
    );
  };

  const commentColumns = [
    {
      title: 'Comment',
      field: 'text',
    },
    {
      title: 'Author',
      field: 'author',
    },
    {
      title: 'Date',
      field: 'date',
    },
  ];

  if (loading) {
    return <div className="p-4">Loading ticket details...</div>;
  }

  if (!ticket) {
    return <div className="p-4">Ticket not found.</div>;
  }

  return (
    <div className="p-4">
      <h1>Ticket Details</h1>
      <p><strong>Subject:</strong> {ticket.subject}</p>
      <p><strong>Status:</strong> {ticket.status}</p>
      <p><strong>Priority:</strong> {ticket.priority}</p>

      <h2>Comments</h2>
      <List data={comments} columns={commentColumns} />

      <h2>Add Reply</h2>
      <TextArea
        rows={4}
        value={replyText}
        onChange={(e) => setReplyText(e.target.value)}
      />
      <Button type="primary" onClick={handleAddReply}>
        Reply
      </Button>

      <h2>Change Status</h2>
      <Button onClick={() => handleChangeStatus('Open')}>Open</Button>
      <Button onClick={() => handleChangeStatus('In Progress')}>In Progress</Button>
      <Button onClick={() => handleChangeStatus('Resolved')}>Resolved</Button>
    </div>
  );
}

export default TicketDetails;