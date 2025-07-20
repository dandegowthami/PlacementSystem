import React from 'react';

const mockDrives = [
  { company: 'TechCorp Solutions', role: 'Data Analyst', status: 'Active' },
  { company: 'DataFlow Inc', role: 'Backend Developer', status: 'Active' },
  { company: 'CloudTech Systems', role: 'DevOps Engineer', status: 'Completed' },
];

const ManageDrives = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage All Drives</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Company</th>
            <th className="p-2 border">Role</th>
            <th className="p-2 border">Status</th>
          </tr>
        </thead>
        <tbody>
          {mockDrives.map((drive, index) => (
            <tr key={index}>
              <td className="p-2 border">{drive.company}</td>
              <td className="p-2 border">{drive.role}</td>
              <td className="p-2 border">{drive.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageDrives;
