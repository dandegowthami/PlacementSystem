// 2. MockInterviewPage.tsx
import React, { useState } from 'react';

export const MockInterviewPage: React.FC = () => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleSchedule = () => {
    alert(`Mock interview scheduled on ${date} at ${time}`);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Schedule a Mock Interview</h1>
      <div className="space-y-4 max-w-sm">
        <input
          type="date"
          className="w-full p-2 border rounded"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <input
          type="time"
          className="w-full p-2 border rounded"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
        <button onClick={handleSchedule} className="bg-green-600 text-white px-4 py-2 rounded">
          Schedule Interview
        </button>
      </div>
    </div>
  );
};