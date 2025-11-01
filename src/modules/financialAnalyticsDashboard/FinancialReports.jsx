import React, { useState } from 'react';
import { Card, Col, Row, Select, Button, DatePicker, Typography } from 'antd';
import { generateReport, exportData } from './httpServices';
import moment from 'moment';

const { Option } = Select;
const { RangePicker } = DatePicker;
const { Title } = Typography;

function FinancialReports() {
  const [reportType, setReportType] = useState('expenseCategorization');
  const [dateRange, setDateRange] = useState([moment().subtract(30, 'days'), moment()]);
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleReportTypeChange = (value) => {
    setReportType(value);
  };

  const handleDateRangeChange = (dates) => {
    setDateRange(dates);
  };

  const handleGenerateReport = async () => {
    setLoading(true);
    const startDate = dateRange[0].format('YYYY-MM-DD');
    const endDate = dateRange[1].format('YYYY-MM-DD');

    generateReport(
      (data) => setReportData(data),
      (error) => console.error('Error generating report:', error),
      reportType,
      startDate,
      endDate
    ).finally(() => setLoading(false));
  };

  const handleExportData = async (format) => {
    const startDate = dateRange[0].format('YYYY-MM-DD');
    const endDate = dateRange[1].format('YYYY-MM-DD');

    exportData(
      () => console.log(`Data exported in ${format} format`),
      (error) => console.error('Error exporting data:', error),
      reportType,
      format,
      startDate,
      endDate
    );
  };

  return (
    <div className="p-6">
      <Title level={2} className="text-textBlack dark:text-textWhite">Financial Reports</Title>

      <Row gutter={[16, 16]} className="mb-4">
        <Col span={24}>
          <Card className="shadow-md border-0">
            <Row gutter={[16, 16]} align="middle">
              <Col>
                <Select defaultValue="expenseCategorization" style={{ width: 200 }} onChange={handleReportTypeChange}>
                  <Option value="expenseCategorization">Expense Categorization</Option>
                  <Option value="incomeAnalysis">Income Analysis</Option>
                  <Option value="savingsGoals">Savings Goals Tracking</Option>
                  <Option value="budgetVsActual">Budget vs Actual Spending</Option>
                </Select>
              </Col>
              <Col>
                <RangePicker onChange={handleDateRangeChange} value={dateRange} />
              </Col>
              <Col>
                <Button type="primary" onClick={handleGenerateReport} loading={loading}>
                  Generate Report
                </Button>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      {reportData && (
        <Row gutter={[16, 16]} className="mb-4">
          <Col span={24}>
            <Card title="Report Data" className="shadow-md border-0">
              <pre className="text-textBlack dark:text-textWhite">{JSON.stringify(reportData, null, 2)}</pre>
            </Card>
          </Col>
        </Row>
      )}

      <Row gutter={[16, 16]}>
        <Col>
          <Button type="default" onClick={() => handleExportData('CSV')}>Export as CSV</Button>
        </Col>
        <Col>
          <Button type="default" onClick={() => handleExportData('PDF')}>Export as PDF</Button>
        </Col>
        <Col>
          <Button type="default" onClick={() => handleExportData('Excel')}>Export as Excel</Button>
        </Col>
      </Row>
    </div>
  );
}

export default FinancialReports;
