import React, { useState } from 'react';

const Settings = () => {
  const [emailNotifications, setEmailNotifications] = useState(true);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Admin Settings</h2>
      <div className="space-y-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={emailNotifications}
            onChange={() => setEmailNotifications(!emailNotifications)}
            className="mr-2"
          />
          <label>Email Notifications</label>
        </div>
        <div>
          <label className="block mb-1">System Language</label>
          <select className="p-2 border rounded">
            <option>English</option>
            <option>Hindi</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Settings;
