'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Mail, Send } from 'lucide-react';
import { getEmailSettings, updateEmailSettings } from '@/lib/firestore';
import { toast } from 'sonner';

export default function EmailSettingsPanel() {
  const [emailSettings, setEmailSettings] = useState({
    adminEmail: '',
    contactEmailTemplate: {
      subject: 'Thank you for contacting us!',
      body: `Dear {{name}},

Thank you for reaching out to us! We have received your message and will get back to you within 24 hours.

Your Message:
{{message}}

Best regards,
{{siteName}} Team`
    },
    joinEmailTemplate: {
      subject: 'Welcome! Your application has been received',
      body: `Dear {{name}},

Thank you for your interest in joining {{siteName}}! We have received your application and are excited to help you achieve your goals.

Application Details:
- Goal: {{goal}}
- Phone: {{phone}}
{{#notes}}
- Additional Notes: {{notes}}
{{/notes}}

Our team will contact you within 24 hours to discuss the next steps and schedule your consultation.

Best regards,
{{siteName}} Team`
    },
    adminNotificationTemplate: {
      subject: 'New {{formType}} submission received',
      body: `New {{formType}} submission received:

Name: {{name}}
Email: {{email}}
Phone: {{phone}}
{{#goal}}
Goal: {{goal}}
{{/goal}}
{{#message}}
Message: {{message}}
{{/message}}
{{#notes}}
Notes: {{notes}}
{{/notes}}

Submitted at: {{timestamp}}

Please follow up with the customer promptly.`
    }
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadEmailSettings = async () => {
      const data = await getEmailSettings();
      if (data) {
        setEmailSettings({ ...emailSettings, ...data });
      }
    };
    loadEmailSettings();
  }, []);

  const handleSave = async () => {
    if (!emailSettings.adminEmail) {
      toast.error('Please enter an admin email address.');
      return;
    }
    
    setIsLoading(true);
    toast.loading('Saving email settings...', { id: 'email-settings' });
    try {
      await updateEmailSettings(emailSettings);
      toast.success('Email settings saved successfully!', { id: 'email-settings' });
    } catch (error) {
      console.error('Error saving email settings:', error);
      toast.error('Error saving email settings', { id: 'email-settings' });
    } finally {
      setIsLoading(false);
    }
  };

  const updateTemplate = (templateType: string, field: string, value: string) => {
    setEmailSettings({
      ...emailSettings,
      [templateType]: {
        ...emailSettings[templateType as keyof typeof emailSettings],
        [field]: value
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Mail className="h-5 w-5" />
          <span>Email Settings & Templates</span>
        </CardTitle>
        <p className="text-sm text-gray-600">
          Configure email templates and admin notification settings. Use {'{'}{'{'} variableName {'}'}{'}'}  for dynamic content.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Admin Email Address
          </label>
          <Input
            type="email"
            value={emailSettings.adminEmail}
            onChange={(e) => setEmailSettings({ ...emailSettings, adminEmail: e.target.value })}
            placeholder="admin@yoursite.com"
          />
          <p className="text-xs text-gray-500 mt-1">
            This email will receive notifications for all form submissions
          </p>
        </div>

        <Tabs defaultValue="contact" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="contact">Contact Email</TabsTrigger>
            <TabsTrigger value="join">Join Email</TabsTrigger>
            <TabsTrigger value="admin">Admin Notification</TabsTrigger>
          </TabsList>

          <TabsContent value="contact">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Contact Form Email Template</CardTitle>
                <p className="text-sm text-gray-600">
                  Email sent to users when they submit the contact form
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Subject
                  </label>
                  <Input
                    value={emailSettings.contactEmailTemplate.subject}
                    onChange={(e) => updateTemplate('contactEmailTemplate', 'subject', e.target.value)}
                    placeholder="Thank you for contacting us!"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Body
                  </label>
                  <Textarea
                    value={emailSettings.contactEmailTemplate.body}
                    onChange={(e) => updateTemplate('contactEmailTemplate', 'body', e.target.value)}
                    rows={8}
                    placeholder="Email template content..."
                  />
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <h4 className="font-semibold text-blue-900 mb-2">Available Variables:</h4>
                  <div className="text-sm text-blue-800 grid grid-cols-2 gap-2">
                    <code>{'{'}{'{'} name {'}'}{'}'}</code>
                    <code>{'{'}{'{'} email {'}'}{'}'}</code>
                    <code>{'{'}{'{'} phone {'}'}{'}'}</code>
                    <code>{'{'}{'{'} message {'}'}{'}'}</code>
                    <code>{'{'}{'{'} siteName {'}'}{'}'}</code>
                    <code>{'{'}{'{'} timestamp {'}'}{'}'}</code>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="join">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Join/Membership Email Template</CardTitle>
                <p className="text-sm text-gray-600">
                  Email sent to users when they submit membership/booking forms
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Subject
                  </label>
                  <Input
                    value={emailSettings.joinEmailTemplate.subject}
                    onChange={(e) => updateTemplate('joinEmailTemplate', 'subject', e.target.value)}
                    placeholder="Welcome! Your application has been received"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Body
                  </label>
                  <Textarea
                    value={emailSettings.joinEmailTemplate.body}
                    onChange={(e) => updateTemplate('joinEmailTemplate', 'body', e.target.value)}
                    rows={10}
                    placeholder="Email template content..."
                  />
                </div>
                
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <h4 className="font-semibold text-green-900 mb-2">Available Variables:</h4>
                  <div className="text-sm text-green-800 grid grid-cols-2 gap-2">
                    <code>{'{'}{'{'} name {'}'}{'}'}</code>
                    <code>{'{'}{'{'} email {'}'}{'}'}</code>
                    <code>{'{'}{'{'} phone {'}'}{'}'}</code>
                    <code>{'{'}{'{'} goal {'}'}{'}'}</code>
                    <code>{'{'}{'{'} notes {'}'}{'}'}</code>
                    <code>{'{'}{'{'} siteName {'}'}{'}'}</code>
                    <code>{'{'}{'{'} timestamp {'}'}{'}'}</code>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="admin">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Admin Notification Template</CardTitle>
                <p className="text-sm text-gray-600">
                  Email sent to admin when new form submissions are received
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Subject
                  </label>
                  <Input
                    value={emailSettings.adminNotificationTemplate.subject}
                    onChange={(e) => updateTemplate('adminNotificationTemplate', 'subject', e.target.value)}
                    placeholder="New {{formType}} submission received"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Body
                  </label>
                  <Textarea
                    value={emailSettings.adminNotificationTemplate.body}
                    onChange={(e) => updateTemplate('adminNotificationTemplate', 'body', e.target.value)}
                    rows={8}
                    placeholder="Email template content..."
                  />
                </div>
                
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                  <h4 className="font-semibold text-purple-900 mb-2">Available Variables:</h4>
                  <div className="text-sm text-purple-800 grid grid-cols-2 gap-2">
                    <code>{'{'}{'{'} formType {'}'}{'}'}</code>
                    <code>{'{'}{'{'} name {'}'}{'}'}</code>
                    <code>{'{'}{'{'} email {'}'}{'}'}</code>
                    <code>{'{'}{'{'} phone {'}'}{'}'}</code>
                    <code>{'{'}{'{'} goal {'}'}{'}'}</code>
                    <code>{'{'}{'{'} message {'}'}{'}'}</code>
                    <code>{'{'}{'{'} notes {'}'}{'}'}</code>
                    <code>{'{'}{'{'} timestamp {'}'}{'}'}</code>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Button 
          onClick={handleSave} 
          disabled={isLoading}
          className="btn-theme-primary w-full"
        >
          <Send className="h-4 w-4 mr-2" />
          {isLoading ? 'Saving...' : 'Save Email Settings'}
        </Button>
      </CardContent>
    </Card>
  );
}