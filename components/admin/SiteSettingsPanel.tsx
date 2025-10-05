'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getSiteSettings, updateSiteSettings } from '@/lib/firestore';
import { toast } from 'sonner';

export default function SiteSettingsPanel() {
  const [settings, setSettings] = useState({
    siteName: 'Body Art Fitness',
    siteTitle: '',
    siteDescription: '',
    footerDescription: '',
    logoType: 'icon',
    logoIcon: 'Dumbbell',
    logoImageUrl: '',
    address: '',
    phone: '',
    email: '',
    hours: '',
    instagram: '',
    mapEmbed: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadSettings = async () => {
      const data = await getSiteSettings();
      if (data) {
        setSettings({ ...settings, ...data });
      }
    };
    loadSettings();
  }, []);

  const handleSave = async () => {
    setIsLoading(true);
    toast.loading('Saving settings...', { id: 'site-settings' });
    try {
      await updateSiteSettings(settings);
      toast.success('Settings saved successfully!', { id: 'site-settings' });
    } catch (error) {
      toast.error('Error saving settings', { id: 'site-settings' });
    } finally {
      setIsLoading(false);
    }
  };

  const iconOptions = [
    { value: 'Dumbbell', label: '🏋️ Dumbbell (Gym)' },
    { value: 'Sparkles', label: '✨ Sparkles (Beauty)' },
    { value: 'UtensilsCrossed', label: '🍽️ Utensils (Restaurant)' },
    { value: 'Heart', label: '❤️ Heart (Health)' },
    { value: 'Star', label: '⭐ Star (Premium)' },
    { value: 'Crown', label: '👑 Crown (Luxury)' },
    { value: 'Zap', label: '⚡ Zap (Energy)' },
    { value: 'Award', label: '🏆 Award (Excellence)' }
  ];
  return (
    <Card>
      <CardHeader>
        <CardTitle>Site Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Site Name
            </label>
            <Input
              value={settings.siteName}
              onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Site Title (Browser Tab)
            </label>
            <Input
              value={settings.siteTitle || ''}
              onChange={(e) => setSettings({ ...settings, siteTitle: e.target.value })}
              placeholder="Body Art Fitness - Transform Your Body, Transform Your Life"
            />
          </div>
        </div>

        {/* Logo Settings */}
        <div className="space-y-4 p-4 border rounded-lg bg-gray-50">
          <h3 className="font-semibold text-gray-900">Logo Settings</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Logo Type
            </label>
            <Select value={settings.logoType} onValueChange={(value) => setSettings({ ...settings, logoType: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="icon">Icon (Lucide Icons)</SelectItem>
                <SelectItem value="image">Custom Image URL</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {settings.logoType === 'icon' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Icon
              </label>
              <Select value={settings.logoIcon} onValueChange={(value) => setSettings({ ...settings, logoIcon: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {iconOptions.map((icon) => (
                    <SelectItem key={icon.value} value={icon.value}>
                      {icon.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {settings.logoType === 'image' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Logo Image URL
              </label>
              <Input
                value={settings.logoImageUrl || ''}
                onChange={(e) => setSettings({ ...settings, logoImageUrl: e.target.value })}
                placeholder="https://example.com/logo.png"
              />
              <p className="text-xs text-gray-500 mt-1">
                Recommended size: 32x32px or 64x64px for best results
              </p>
            </div>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Site Description (SEO Meta Description)
          </label>
          <Textarea
            value={settings.siteDescription || ''}
            onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
            rows={3}
            placeholder="Join Body Art Fitness and experience world-class training with state-of-the-art equipment and expert trainers."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <Input
              type="email"
              value={settings.email}
              onChange={(e) => setSettings({ ...settings, email: e.target.value })}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone
            </label>
            <Input
              value={settings.phone}
              onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Instagram URL
            </label>
            <Input
              value={settings.instagram}
              onChange={(e) => setSettings({ ...settings, instagram: e.target.value })}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Address
            </label>
            <Input
              value={settings.address}
              onChange={(e) => setSettings({ ...settings, address: e.target.value })}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Footer Description
          </label>
          <Textarea
            value={settings.footerDescription}
            onChange={(e) => setSettings({ ...settings, footerDescription: e.target.value })}
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Operating Hours
          </label>
          <Textarea
            value={settings.hours}
            onChange={(e) => setSettings({ ...settings, hours: e.target.value })}
            rows={3}
            placeholder="Mon-Fri: 5:00 AM - 11:00 PM&#10;Sat-Sun: 6:00 AM - 10:00 PM"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Google Maps Embed URL
          </label>
          <Input
            value={settings.mapEmbed || ''}
            onChange={(e) => setSettings({ ...settings, mapEmbed: e.target.value })}
            placeholder="Paste Google Maps embed iframe src URL here"
          />
          <p className="text-xs text-gray-500 mt-1">
            Go to Google Maps → Search your address → Share → Embed a map → Copy the src URL
          </p>
        </div>

        <Button 
          onClick={handleSave} 
          disabled={isLoading}
          className="btn-theme-primary"
        >
          {isLoading ? 'Saving...' : 'Save Settings'}
        </Button>
      </CardContent>
    </Card>
  );
}