import React, { useState, useEffect } from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';

const SettingsPage: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [interviewReminders, setInterviewReminders] = useState(true);
  const [loading, setLoading] = useState(false);

  // Load from localStorage
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode');
    const savedEmailNotifications = localStorage.getItem('emailNotifications');
    const savedInterviewReminders = localStorage.getItem('interviewReminders');

    if (savedDarkMode !== null) setDarkMode(savedDarkMode === 'true');
    if (savedEmailNotifications !== null) setEmailNotifications(savedEmailNotifications === 'true');
    if (savedInterviewReminders !== null) setInterviewReminders(savedInterviewReminders === 'true');
  }, []);

  const handleSave = () => {
    setLoading(true);

    // Save to localStorage
    localStorage.setItem('darkMode', darkMode.toString());
    localStorage.setItem('emailNotifications', emailNotifications.toString());
    localStorage.setItem('interviewReminders', interviewReminders.toString());

    setTimeout(() => {
      setLoading(false);
      toast.success('Settings saved successfully');
    }, 800); // Simulated save delay
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>

      <Card className="max-w-xl">
        <CardContent className="py-6 space-y-6">
          <div className="flex items-center justify-between">
            <Label htmlFor="dark-mode">Dark Mode</Label>
            <Switch
              id="dark-mode"
              checked={darkMode}
              onCheckedChange={setDarkMode}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="email-notify">Email Notifications</Label>
            <Switch
              id="email-notify"
              checked={emailNotifications}
              onCheckedChange={setEmailNotifications}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="interview-reminder">Mock Interview Reminders</Label>
            <Switch
              id="interview-reminder"
              checked={interviewReminders}
              onCheckedChange={setInterviewReminders}
            />
          </div>

          <Button onClick={handleSave} disabled={loading}>
            {loading ? 'Saving...' : 'Save Settings'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsPage;
