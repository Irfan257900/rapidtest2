import React from 'react';
import { DatePicker, Select } from 'antd';

const { RangePicker } = DatePicker;
const { Option } = Select;

function AnalyticsFilters({ onDateRangeChange, onFilterChange }) {
  return (
    <div className="flex space-x-4">
      <RangePicker onChange={onDateRangeChange} />
      <Select defaultValue="all" style={{ width: 120 }} onChange={onFilterChange}>
        <Option value="all">All Transactions</Option>
        <Option value="income">Income</Option>
        <Option value="expenses">Expenses</Option>
      </Select>
    </div>
  );
}

export default AnalyticsFilters;
