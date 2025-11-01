import React, { useState, useEffect } from 'react';
import { Card, Col, Row, Input, Button, Progress, Typography, Form, InputNumber, message } from 'antd';
import { getFinancialGoals, createUpdateGoal } from './httpServices';
import moment from 'moment';

const { Title } = Typography;
const { Item } = Form;

function GoalsTracker() {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    setLoading(true);
    getFinancialGoals(
      (data) => setGoals(data),
      (error) => console.error('Error fetching financial goals:', error),
      moment().subtract(1, 'year').format('YYYY-MM-DD'),
      moment().format('YYYY-MM-DD')
    ).finally(() => setLoading(false));
  };

  const onFinish = async (values) => {
    setLoading(true);
    createUpdateGoal(
      (data) => {
        message.success('Goal updated successfully');
        fetchGoals();
        form.resetFields();
      },
      (error) => {
        console.error('Error creating/updating goal:', error);
        message.error('Failed to update goal');
      },
      values
    ).finally(() => setLoading(false));
  };

  return (
    <div className="p-6">
      <Title level={2} className="text-textBlack dark:text-textWhite">Financial Goals Tracker</Title>

      <Row gutter={[16, 16]} className="mb-4">
        {goals.map((goal) => (
          <Col xs={24} sm={12} md={8} key={goal.id}>
            <Card title={goal.name} className="shadow-md border-0">
              <p className="text-textBlack dark:text-textWhite">Target: {goal.targetAmount}</p>
              <p className="text-textBlack dark:text-textWhite">Current: {goal.currentAmount}</p>
              <Progress percent={(goal.currentAmount / goal.targetAmount) * 100} />
            </Card>
          </Col>
        ))}
      </Row>

      <Row>
        <Col span={24}>
          <Card title="Add/Update Goal" className="shadow-md border-0">
            <Form form={form} layout="vertical" onFinish={onFinish}>
              <Item label="Goal Name" name="name" rules={[{ required: true, message: 'Please enter goal name' }]}>
                <Input />
              </Item>
              <Item label="Target Amount" name="targetAmount" rules={[{ required: true, message: 'Please enter target amount' }]}>
                <InputNumber style={{ width: '100%' }} formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} parser={(value) => value.replace(/\$\s?|(,*)/g, '')} />
              </Item>
              <Item label="Current Amount" name="currentAmount" rules={[{ required: true, message: 'Please enter current amount' }]}>
                <InputNumber style={{ width: '100%' }} formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} parser={(value) => value.replace(/\$\s?|(,*)/g, '')} />
              </Item>
              <Item>
                <Button type="primary" htmlType="submit" loading={loading}>
                  {goals.length > 0 ? 'Update Goal' : 'Add Goal'}
                </Button>
              </Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default GoalsTracker;
