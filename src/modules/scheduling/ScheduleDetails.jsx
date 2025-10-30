import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, message, Modal } from 'antd';
import { useTranslation } from 'react-i18next';
import { fetchScheduledPaymentDetails, updateScheduledPaymentStatus } from './httpServices';

function ScheduleDetails() {
  const { scheduleId } = useParams();
  const { t } = useTranslation();
  const [schedule, setSchedule] = useState(null);
  const [loading, setLoading] = useState(true);
  const [confirmCancelVisible, setConfirmCancelVisible] = useState(false);

  useEffect(() => {
    fetchScheduledPaymentDetails(
      (data) => {
        setSchedule(data);
        setLoading(false);
      },
      (error) => {
        message.error(t(error));
        setLoading(false);
      },
      scheduleId
    );
  }, [scheduleId, t]);

  const handleStatusUpdate = (status) => {
    updateScheduledPaymentStatus(
      () => {
        message.success(t(`Schedule ${status} successfully`));
        setSchedule({ ...schedule, status });
      },
      (error) => message.error(t(error)),
      scheduleId,
      { status }
    );
  };

  const showCancelConfirmation = () => {
    setConfirmCancelVisible(true);
  };

  const handleCancel = () => {
    handleStatusUpdate('cancelled');
    setConfirmCancelVisible(false);
  };

  const handleCancelModalCancel = () => {
    setConfirmCancelVisible(false);
  };

  if (loading) {
    return <div className="p-4">{t('Loading...')}</div>;
  }

  if (!schedule) {
    return <div className="p-4">{t('Schedule not found')}</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">{t('Schedule Details')}</h2>
      <p>{t('Payee')}: {schedule.payeeName}</p>
      <p>{t('Amount')}: {schedule.amount} {schedule.currency}</p>
      <p>{t('Frequency')}: {schedule.frequency}</p>
      <p>{t('Start Date')}: {schedule.startDate}</p>
      <p>{t('End Date/Condition')}: {schedule.endDate || t('Never')}</p>
      <p>{t('Status')}: {schedule.status}</p>

      <div className="mt-4">
        {schedule.status === 'active' && (
          <Button onClick={() => handleStatusUpdate('paused')}>
            {t('Pause')}
          </Button>
        )}
        {schedule.status === 'paused' && (
          <Button onClick={() => handleStatusUpdate('active')}>
            {t('Resume')}
          </Button>
        )}
        <Button type="primary" danger onClick={showCancelConfirmation}>
          {t('Cancel')}
        </Button>
      </div>

      <Modal
        title={t('Confirm Cancellation')}
        visible={confirmCancelVisible}
        onOk={handleCancel}
        onCancel={handleCancelModalCancel}
      >
        <p>{t('Are you sure you want to cancel this schedule?')}</p>
      </Modal>
    </div>
  );
}

export default ScheduleDetails;
