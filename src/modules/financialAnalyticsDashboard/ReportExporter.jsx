import React from 'react';
import { Button } from 'antd';

function ReportExporter({ onExport }) {
  return (
    <div>
      <Button type="default" onClick={() => onExport('CSV')}>Export as CSV</Button>
      <Button type="default" onClick={() => onExport('PDF')}>Export as PDF</Button>
      <Button type="default" onClick={() => onExport('Excel')}>Export as Excel</Button>
    </div>
  );
}

export default ReportExporter;
