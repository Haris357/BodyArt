'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getNavigation, updateNavigation } from '@/lib/firestore';
import { toast } from 'sonner';

export default function NavigationPanel() {
  const [navItems, setNavItems] = useState([
    { label: 'Home', href: '/', visible: true },
    { label: 'About Us', href: '/about', visible: true },
    { label: 'Services', href: '/services', visible: true },
    { label: 'Why Us?', href: '/why', visible: true },
    { label: 'Contact', href: '/contact', visible: true },
    { label: 'Join Now', href: '/join', visible: true },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadNavigation();
  }, []);

  const loadNavigation = async () => {
    const data = await getNavigation();
    if (data.length > 0) {
      setNavItems(data);
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    toast.loading('Updating navigation...', { id: 'navigation' });
    try {
      await updateNavigation(navItems);
      toast.success('Navigation updated successfully!', { id: 'navigation' });
    } catch (error) {
      toast.error('Error updating navigation', { id: 'navigation' });
    } finally {
      setIsLoading(false);
    }
  };

  const updateNavItem = (index: number, field: string, value: string) => {
    const updated = [...navItems];
    if (field === 'visible') {
      updated[index] = { ...updated[index], [field]: value === 'true' };
    } else {
      updated[index] = { ...updated[index], [field]: value };
    }
    setNavItems(updated);
  };

  const toggleNavVisibility = (index: number, visible: boolean) => {
    const updated = [...navItems];
    updated[index] = { ...updated[index], visible };
    setNavItems(updated);
  };

  const addNavItem = () => {
    setNavItems([...navItems, { label: 'New Page', href: '/new-page', visible: true }]);
  };

  const removeNavItem = (index: number) => {
    setNavItems(navItems.filter((_, i) => i !== index));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Navigation Management</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          {navItems.map((item, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border rounded-lg">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Label
                </label>
                <Input
                  value={item.label}
                  onChange={(e) => updateNavItem(index, 'label', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Link
                </label>
                <Input
                  value={item.href}
                  onChange={(e) => updateNavItem(index, 'href', e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Visibility
                  </label>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={item.visible !== false}
                      onCheckedChange={(checked) => toggleNavVisibility(index, checked)}
                    />
                    <span className="text-sm text-gray-600">
                      {item.visible !== false ? 'Visible' : 'Hidden'}
                    </span>
                  </div>
                </div>
                <div className="flex items-end">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => removeNavItem(index)}
                    className="text-red-600 hover:text-red-700"
                  >
                    Remove
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex space-x-4">
          <Button 
            onClick={addNavItem}
            variant="outline"
          >
            Add Navigation Item
          </Button>
          <Button 
            onClick={handleSave} 
            disabled={isLoading}
            className="btn-theme-primary"
          >
            {isLoading ? 'Saving...' : 'Save Navigation'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}