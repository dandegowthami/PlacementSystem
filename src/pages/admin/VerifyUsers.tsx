import React, { useState } from 'react';

const dummyUsers = [
  { id: 1, name: 'Gowthami', email: 'student@example.com', verified: false },
  { id: 2, name: 'Rahul', email: 'rahul@example.com', verified: true },
];

const VerifyUsers = () => {
  const [users, setUsers] = useState(dummyUsers);

  const toggleVerification = (id) => {
    setUsers(prev =>
      prev.map(user =>
        user.id === id ? { ...user, verified: !user.verified } : user
      )
    );
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Verify Users</h2>
      {users.map(user => (
        <div key={user.id} className="border p-2 mb-2 flex justify-between">
          <div>
            <p><strong>{user.name}</strong></p>
            <p>{user.email}</p>
          </div>
          <button
            className={`px-4 py-1 rounded ${
              user.verified ? 'bg-green-500' : 'bg-red-500'
            } text-white`}
            onClick={() => toggleVerification(user.id)}
          >
            {user.verified ? 'Verified' : 'Verify'}
          </button>
        </div>
      ))}
    </div>
  );
};

export default VerifyUsers;
