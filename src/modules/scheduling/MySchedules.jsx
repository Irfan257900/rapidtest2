import React from 'react';
import { List } from '../../core/grid.component/index.js';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

function MySchedules() {
  const { t } = useTranslation();

  const columns = [
    {
      title: t('Payee Name'),
      field: 'payeeName',
    },
    {
      title: t('Amount & Currency'),
      field: 'amount',
      customCell: (props) => (
        <td>{props.dataItem.amount} {props.dataItem.currency}</td>
      ),
    },
    {
      title: t('Frequency'),
      field: 'frequency',
    },
    {
      title: t('Next Payment Date'),
      field: 'nextPaymentDate',
    },
    {
      title: t('Status'),
      field: 'status',
    },
    {
      title: t('End Date/Condition'),
      field: 'endDate',
    },
    {
      title: t('Actions'),
      field: 'id',
      customCell: (props) => (
        <td>
          <Link to={`/scheduling/${props.dataItem.id}`}>
            {t('View Details/Manage')}
          </Link>
        </td>
      ),
    },
  ];

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">{t('My Scheduled Payments')}</h2>
      <List url="scheduling/payments/my" columns={columns} />
    </div>
  );
}

export default MySchedules;
