import React, { useState, useEffect } from 'react';
import { Card, Col, Row, DatePicker, Select, Typography, Statistic, Divider, Space } from 'antd';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, ResponsiveContainer } from 'recharts';
import { getAnalyticsOverview, getTransactionData, getSpendingCategories, getIncomeVsExpenses, getFinancialGoals } from './httpServices';
import moment from 'moment';

const { RangePicker } = DatePicker;
const { Option } = Select;
const { Title } = Typography;

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#954583'];

function AnalyticsOverview() {
  const [overviewData, setOverviewData] = useState(null);
  const [transactionData, setTransactionData] = useState([]);
  const [spendingCategories, setSpendingCategories] = useState([]);
  const [incomeVsExpenses, setIncomeVsExpenses] = useState([]);
  const [financialGoals, setFinancialGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState([moment().subtract(30, 'days'), moment()]);
  const [selectedDateRange, setSelectedDateRange] = useState('30 days');

  useEffect(() => {
    fetchData();
  }, [dateRange]);

  const fetchData = async () => {
    setLoading(true);
    const startDate = dateRange[0].format('YYYY-MM-DD');
    const endDate = dateRange[1].format('YYYY-MM-DD');

    try {
      await Promise.all([
        getAnalyticsOverview(
          (data) => setOverviewData(data),
          (error) => console.error('Error fetching overview data:', error),
          startDate,
          endDate
        ),
        getTransactionData(
          (data) => setTransactionData(data),
          (error) => console.error('Error fetching transaction data:', error),
          startDate,
          endDate
        ),
        getSpendingCategories(
          (data) => setSpendingCategories(data),
          (error) => console.error('Error fetching spending categories:', error),
          startDate,
          endDate
        ),
        getIncomeVsExpenses(
          (data) => setIncomeVsExpenses(data),
          (error) => console.error('Error fetching income vs expenses:', error),
          startDate,
          endDate
        ),
        getFinancialGoals(
          (data) => setFinancialGoals(data),
          (error) => console.error('Error fetching financial goals:', error),
          startDate,
          endDate
        ),
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleDateRangeChange = (dates, dateStrings) => {
    if (dates) {
      setDateRange(dates);
      setSelectedDateRange(`${dateStrings[0]} - ${dateStrings[1]}`);
    } else {
      setDateRange([moment().subtract(30, 'days'), moment()]);
      setSelectedDateRange('30 days');
    }
  };

  const handlePresetDateRange = (value) => {
    let startDate = moment();
    switch (value) {
      case '7 days':
        startDate = moment().subtract(7, 'days');
        break;
      case '30 days':
        startDate = moment().subtract(30, 'days');
        break;
      case '3 months':
        startDate = moment().subtract(3, 'months');
        break;
      case '6 months':
        startDate = moment().subtract(6, 'months');
        break;
      case '1 year':
        startDate = moment().subtract(1, 'year');
        break;
      default:
        startDate = moment().subtract(30, 'days');
    }
    setDateRange([startDate, moment()]);
    setSelectedDateRange(value);
  };

  return (
    <div className="p-6">
      <Title level={2} className="text-textBlack dark:text-textWhite">Financial Analytics Dashboard</Title>

      <Row gutter={[16, 16]} className="mb-4">
        <Col xs={24} sm={24} md={12} lg={8}>
          <Card className="shadow-md border-0">
            <Statistic
              title="Total Balance"
              value={overviewData?.totalBalance || 0}
              precision={2}
              prefix="$"
              suffix="USD"
              className="text-textBlack dark:text-textWhite"
            />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={12} lg={8}>
          <Card className="shadow-md border-0">
            <Statistic
              title="Savings Rate"
              value={overviewData?.savingsRate || 0}
              precision={2}
              suffix="%"
              className="text-textBlack dark:text-textWhite"
            />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={12} lg={8}>
          <Card className="shadow-md border-0">
            <Statistic
              title="Monthly Average Spending"
              value={overviewData?.monthlyAverageSpending || 0}
              precision={2}
              prefix="$"
              suffix="USD"
              className="text-textBlack dark:text-textWhite"
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} className="mb-4">
        <Col span={24}>
          <Space>
            <RangePicker onChange={handleDateRangeChange} value={dateRange} />
            <Select defaultValue="30 days" onChange={handlePresetDateRange} className="w-40">
              <Option value="7 days">Last 7 Days</Option>
              <Option value="30 days">Last 30 Days</Option>
              <Option value="3 months">Last 3 Months</Option>
              <Option value="6 months">Last 6 Months</Option>
              <Option value="1 year">Last 1 Year</Option>
            </Select>
          </Space>
        </Col>
      </Row>

      <Row gutter={[16, 16]} className="mb-4">
        <Col xs={24} sm={24} md={12}>
          <Card title="Spending by Categories" className="shadow-md border-0">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={spendingCategories}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  label
                >
                  {spendingCategories.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col xs={24} sm={24} md={12}>
          <Card title="Income vs Expenses" className="shadow-md border-0">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={incomeVsExpenses}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="income" fill="#82ca9d" />
                <Bar dataKey="expenses" fill="#D32F2F" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} className="mb-4">
        <Col span={24}>
          <Card title="Recent Transactions" className="shadow-md border-0">
            {transactionData.map((transaction) => (
              <div key={transaction.id} className="flex justify-between items-center py-2 border-b border-borderHr dark:border-sidebarBr">
                <div className="text-textBlack dark:text-textWhite">{transaction.description}</div>
                <div className={`text-${transaction.type === 'income' ? 'textGreen' : 'textRed'}`}>
                  {transaction.amount}
                </div>
              </div>
            ))}
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default AnalyticsOverview;
