import React from 'react';
import { Button } from '@/components/ui/button';
import { saveAs } from 'file-saver';

const ExportReport = () => {
  const handleExport = () => {
    const reportData = {
      totalStudents: 1247,
      totalApplications: 2145,
      totalInterviews: 89,
      placementRate: '78%',
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], {
      type: 'application/json',
    });
    saveAs(blob, 'placement-report.json');
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Export Placement Report</h2>
      <p className="mb-2">Click below to download the analytics report.</p>
      <Button onClick={handleExport}>Download Report (JSON)</Button>
    </div>
  );
};

export default ExportReport;
