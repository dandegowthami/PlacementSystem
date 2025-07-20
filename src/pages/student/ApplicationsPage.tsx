import React from 'react';

export const ApplicationsPage: React.FC = () => {
  const applications = [
    { company: 'Google', status: 'Selected' },
    { company: 'Amazon', status: 'Pending' },
    { company: 'TCS', status: 'Rejected' },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Applications</h1>
      <table className="table-auto w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Company</th>
            <th className="p-2 border">Status</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app, i) => (
            <tr key={i}>
              <td className="p-2 border">{app.company}</td>
              <td className="p-2 border">{app.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
