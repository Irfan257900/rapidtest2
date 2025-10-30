import React from 'react';
import { Form, InputNumber, Select, DatePicker, Button, message } from 'antd';
import { useTranslation } from 'react-i18next';
import {
  requiredValidator,
  numberValidator,
  dateValidator,
} from '../../core/shared/validations.js';
import { createScheduledPayment, fetchPayees } from './httpServices';

const { Option } = Select;

function CreateSchedule() {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [payees, setPayees] = React.useState([]);

  React.useEffect(() => {
    fetchPayees(
      (data) => setPayees(data),
      (error) => message.error(t(error))
    );
  }, [t]);

  const onFinish = (values) => {
    createScheduledPayment(
      () => {
        message.success(t('Scheduled payment created successfully'));
        form.resetFields();
      },
      (error) => message.error(t(error)),
      values
    );
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">{t('Create Scheduled Payment')}</h2>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="payeeId"
          label={t('Payee')}
          rules={[requiredValidator()]}
        >
          <Select placeholder={t('Select a payee')}>
            {payees.map((payee) => (
              <Option key={payee.id} value={payee.id}>
                {payee.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="amount"
          label={t('Amount')}
          rules={[requiredValidator(), numberValidator('Amount')]}
        >
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          name="currency"
          label={t('Currency')}
          rules={[requiredValidator()]}
        >
          <Select placeholder={t('Select currency')}>
            <Option value="USD">USD</Option>
            <Option value="EUR">EUR</Option>
            <Option value="GBP">GBP</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="startDate"
          label={t('Start Date')}
          rules={[requiredValidator(), dateValidator('Start Date', [])]}
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item name="frequency" label={t('Frequency')} rules={[requiredValidator()]}>
          <Select placeholder={t('Select frequency')}>
            <Option value="daily">{t('Daily')}</Option>
            <Option value="weekly">{t('Weekly')}</Option>
            <Option value="monthly">{t('Monthly')}</Option>
            <Option value="annually">{t('Annually')}</Option>
          </Select>
        </Form.Item>

        <Form.Item name="endCondition" label={t('End Condition')}>
          <Select placeholder={t('Select end condition')}>
            <Option value="never">{t('Never')}</Option>
            <Option value="onDate">{t('On Date')}</Option>
            <Option value="afterOccurrences">{t('After Occurrences')}</Option>
          </Select>
        </Form.Item>

        {form.getFieldValue('endCondition') === 'onDate' && (
          <Form.Item name="endDate" label={t('End Date')} rules={[requiredValidator(), dateValidator('End Date', [])]}>
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
        )}

        {form.getFieldValue('endCondition') === 'afterOccurrences' && (
          <Form.Item
            name="occurrences"
            label={t('Occurrences')}
            rules={[requiredValidator(), numberValidator('Occurrences')]}
          >
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
        )}

        <Form.Item>
          <Button type="primary" htmlType="submit">
            {t('Create Schedule')}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default CreateSchedule;
