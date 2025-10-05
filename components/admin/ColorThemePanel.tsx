'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Palette, Check } from 'lucide-react';
import { getSiteSettings, updateSiteSettings } from '@/lib/firestore';
import { predefinedThemes, ColorTheme } from '@/lib/colorThemes';
import { useTheme } from '@/components/ThemeProvider';
import { toast } from 'sonner';

export default function ColorThemePanel() {
  const { currentTheme, setTheme, themes } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedThemeId, setSelectedThemeId] = useState(currentTheme.id);

  useEffect(() => {
    setSelectedThemeId(currentTheme.id);
  }, [currentTheme]);

  const handleThemeChange = async (themeId: string) => {
    setSelectedThemeId(themeId);
    setTheme(themeId);
    
    setIsLoading(true);
    toast.loading('Saving color theme...', { id: 'color-theme' });
    
    try {
      // Get current settings
      const currentSettings = await getSiteSettings() || {};
      
      // Update with new theme
      await updateSiteSettings({
        ...currentSettings,
        colorTheme: themeId
      });
      
      toast.success('Color theme updated successfully!', { id: 'color-theme' });
    } catch (error) {
      console.error('Error saving theme:', error);
      toast.error('Error saving color theme', { id: 'color-theme' });
    } finally {
      setIsLoading(false);
    }
  };

  const ThemePreview = ({ theme }: { theme: ColorTheme }) => (
    <div 
      className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
        selectedThemeId === theme.id 
          ? 'border-gray-400 shadow-lg' 
          : 'border-gray-200 hover:border-gray-300'
      }`}
      onClick={() => handleThemeChange(theme.id)}
    >
      {selectedThemeId === theme.id && (
        <div className="absolute top-2 right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
          <Check className="h-4 w-4 text-white" />
        </div>
      )}
      
      <div className="space-y-3">
        <h3 className="font-semibold text-gray-900">{theme.name}</h3>
        
        {/* Color Swatches */}
        <div className="flex space-x-2">
          <div 
            className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
            style={{ backgroundColor: theme.primary }}
          />
          <div 
            className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
            style={{ backgroundColor: theme.primaryHover }}
          />
          <div 
            className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
            style={{ backgroundColor: theme.primaryDark }}
          />
        </div>
        
        {/* Gradient Preview */}
        <div 
          className="h-6 rounded-md"
          style={{ background: theme.gradient }}
        />
        
        {/* Button Preview */}
        <div className="space-y-2">
          <div 
            className="px-3 py-1 rounded text-white text-sm font-medium text-center"
            style={{ background: theme.gradient }}
          >
            Primary Button
          </div>
          <div 
            className="px-3 py-1 rounded text-sm font-medium text-center border-2"
            style={{ 
              borderColor: theme.primary,
              color: theme.primary,
              backgroundColor: 'transparent'
            }}
          >
            Outline Button
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Palette className="h-5 w-5" />
          <span>Website Color Theme</span>
        </CardTitle>
        <p className="text-sm text-gray-600">
          Choose a color theme for your website. The background will always remain white, 
          but all accent colors, buttons, and highlights will use your selected theme.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {themes.map((theme) => (
            <ThemePreview key={theme.id} theme={theme} />
          ))}
        </div>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-blue-900 mb-2">Theme Preview Areas:</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Navigation and logo colors</li>
            <li>• All buttons and call-to-action elements</li>
            <li>• Section highlights and accents</li>
            <li>• Icons and decorative elements</li>
            <li>• Hover states and transitions</li>
            <li>• Form elements and interactive components</li>
          </ul>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h4 className="font-semibold text-green-900 mb-2">Current Theme:</h4>
          <div className="flex items-center space-x-3">
            <div 
              className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
              style={{ backgroundColor: currentTheme.primary }}
            />
            <span className="text-green-800 font-medium">{currentTheme.name}</span>
            <Badge variant="outline" className="text-green-700 border-green-300">
              Active
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}