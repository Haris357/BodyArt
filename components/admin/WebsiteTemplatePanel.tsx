'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Layout, Check, Monitor, Smartphone, Tablet } from 'lucide-react';
import { getSiteSettings, updateSiteSettings } from '@/lib/firestore';
import { websiteTemplates, WebsiteTemplate, getWebsiteTemplateById, applyWebsiteTemplate } from '@/lib/websiteTemplates';
import { toast } from 'sonner';

export default function WebsiteTemplatePanel() {
  const [currentTemplate, setCurrentTemplate] = useState(websiteTemplates[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTemplateId, setSelectedTemplateId] = useState(websiteTemplates[0].id);

  useEffect(() => {
    loadCurrentTemplate();
  }, []);

  const loadCurrentTemplate = async () => {
    try {
      const settings = await getSiteSettings();
      if (settings?.websiteTemplate) {
        const template = getWebsiteTemplateById(settings.websiteTemplate);
        setCurrentTemplate(template);
        setSelectedTemplateId(template.id);
        applyWebsiteTemplate(template);
      }
    } catch (error) {
      console.error('Error loading website template:', error);
    }
  };

  const handleTemplateChange = async (templateId: string) => {
    setSelectedTemplateId(templateId);
    const template = getWebsiteTemplateById(templateId);
    setCurrentTemplate(template);
    applyWebsiteTemplate(template);
    
    setIsLoading(true);
    toast.loading('Applying website template...', { id: 'website-template' });
    
    try {
      const currentSettings = await getSiteSettings() || {};
      await updateSiteSettings({
        ...currentSettings,
        websiteTemplate: templateId
      });
      
      toast.success('Website template applied successfully!', { id: 'website-template' });
    } catch (error) {
      console.error('Error saving template:', error);
      toast.error('Error applying website template', { id: 'website-template' });
    } finally {
      setIsLoading(false);
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'business': return 'bg-blue-100 text-blue-800';
      case 'creative': return 'bg-purple-100 text-purple-800';
      case 'modern': return 'bg-green-100 text-green-800';
      case 'classic': return 'bg-amber-100 text-amber-800';
      case 'minimal': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const TemplatePreview = ({ template }: { template: WebsiteTemplate }) => (
    <div 
      className={`relative p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
        selectedTemplateId === template.id 
          ? 'border-orange-400 shadow-lg ring-2 ring-orange-100' 
          : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
      }`}
      onClick={() => handleTemplateChange(template.id)}
    >
      {selectedTemplateId === template.id && (
        <div className="absolute top-3 right-3 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
          <Check className="h-4 w-4 text-white" />
        </div>
      )}
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-3xl">{template.preview}</span>
            <div>
              <h3 className="font-bold text-gray-900">{template.name}</h3>
              <Badge className={`${getCategoryColor(template.category)} text-xs`}>
                <span className="capitalize">{template.category}</span>
              </Badge>
            </div>
          </div>
        </div>
        
        <p className="text-sm text-gray-600">{template.description}</p>
        
        {/* Structure Preview */}
        <div className="space-y-3">
          {/* Layout Preview */}
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-xs text-gray-500 mb-2">Layout Structure</div>
            <div className={`grid gap-1 ${
              template.structure.layout === 'standard' ? 'grid-cols-1' :
              template.structure.layout === 'sidebar' ? 'grid-cols-4' :
              template.structure.layout === 'split' ? 'grid-cols-2' :
              template.structure.layout === 'magazine' ? 'grid-cols-3' :
              'grid-cols-1'
            }`}>
              {template.structure.layout === 'sidebar' ? (
                <>
                  <div className="bg-gray-300 h-12 rounded-sm"></div>
                  <div className="col-span-3 bg-gray-200 h-12 rounded-sm"></div>
                </>
              ) : template.structure.layout === 'split' ? (
                <>
                  <div className="bg-gray-300 h-12 rounded-sm"></div>
                  <div className="bg-gray-200 h-12 rounded-sm"></div>
                </>
              ) : template.structure.layout === 'magazine' ? (
                <>
                  <div className="bg-gray-300 h-8 rounded-sm"></div>
                  <div className="bg-gray-200 h-8 rounded-sm"></div>
                  <div className="bg-gray-300 h-8 rounded-sm"></div>
                </>
              ) : (
                <div className="bg-gray-200 h-12 rounded-sm"></div>
              )}
            </div>
          </div>
          
          {/* Navigation Preview */}
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-xs text-gray-500 mb-2">Navigation: {template.structure.navigation}</div>
            <div className={`${
              template.structure.navigation === 'top' ? 'flex space-x-1' :
              template.structure.navigation === 'side' ? 'flex flex-col space-y-1' :
              template.structure.navigation === 'floating' ? 'flex space-x-1 justify-center' :
              template.structure.navigation === 'bottom' ? 'flex space-x-1 justify-center' :
              'flex space-x-1'
            }`}>
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className={`bg-gray-300 ${
                  template.structure.navigation === 'side' ? 'h-2 w-8' : 'h-2 w-6'
                } rounded-sm`}></div>
              ))}
            </div>
          </div>
          
          {/* Hero Style Preview */}
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-xs text-gray-500 mb-2">Hero: {template.structure.heroStyle}</div>
            <div className={`${
              template.structure.heroStyle === 'fullscreen' ? 'h-16 bg-gradient-to-r from-blue-400 to-purple-500' :
              template.structure.heroStyle === 'split' ? 'grid grid-cols-2 gap-1 h-12' :
              template.structure.heroStyle === 'minimal' ? 'h-8 bg-gray-200' :
              template.structure.heroStyle === 'video' ? 'h-16 bg-gray-800' :
              template.structure.heroStyle === 'parallax' ? 'h-16 bg-gradient-to-br from-green-400 to-blue-500' :
              'h-12 bg-gray-300'
            } rounded-sm`}>
              {template.structure.heroStyle === 'split' && (
                <>
                  <div className="bg-gray-300 rounded-sm"></div>
                  <div className="bg-gray-200 rounded-sm"></div>
                </>
              )}
            </div>
          </div>
        </div>
        
        {/* Feature Tags */}
        <div className="flex flex-wrap gap-1">
          <Badge variant="outline" className="text-xs">
            {template.structure.layout}
          </Badge>
          <Badge variant="outline" className="text-xs">
            {template.structure.heroStyle}
          </Badge>
          <Badge variant="outline" className="text-xs">
            {template.pages.home.gridStyle}
          </Badge>
        </div>
      </div>
    </div>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Layout className="h-5 w-5" />
          <span>Website Structure Templates</span>
        </CardTitle>
        <p className="text-sm text-gray-600">
          Choose a complete website structure template that changes the layout and organization 
          of all your pages. Each template provides a unique user experience and visual flow.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {websiteTemplates.map((template) => (
            <TemplatePreview key={template.id} template={template} />
          ))}
        </div>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-blue-900 mb-2">Template Features:</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Complete page structure redesign</li>
            <li>• Different navigation styles and positions</li>
            <li>• Unique hero section layouts</li>
            <li>• Various content organization methods</li>
            <li>• Different form and interaction styles</li>
            <li>• Responsive design for all devices</li>
          </ul>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h4 className="font-semibold text-green-900 mb-2">Current Template:</h4>
          <div className="flex items-center space-x-3">
            <span className="text-2xl">{currentTemplate.preview}</span>
            <div>
              <span className="text-green-800 font-medium">{currentTemplate.name}</span>
              <Badge className={`ml-2 ${getCategoryColor(currentTemplate.category)}`}>
                <span className="capitalize">{currentTemplate.category}</span>
              </Badge>
            </div>
          </div>
          <p className="text-sm text-green-700 mt-2">{currentTemplate.description}</p>
        </div>

        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <h4 className="font-semibold text-purple-900 mb-2">🎨 Combine with Design Themes:</h4>
          <p className="text-sm text-purple-800">
            Website templates control the structure and layout, while design themes control colors and styling. 
            Combine different templates with different themes for unlimited customization possibilities!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-50 rounded-lg p-4">
          <div className="text-center">
            <Monitor className="h-8 w-8 mx-auto mb-2 text-gray-600" />
            <div className="text-sm font-medium text-gray-900">Desktop</div>
            <div className="text-xs text-gray-600">Optimized layouts</div>
          </div>
          <div className="text-center">
            <Tablet className="h-8 w-8 mx-auto mb-2 text-gray-600" />
            <div className="text-sm font-medium text-gray-900">Tablet</div>
            <div className="text-xs text-gray-600">Responsive design</div>
          </div>
          <div className="text-center">
            <Smartphone className="h-8 w-8 mx-auto mb-2 text-gray-600" />
            <div className="text-sm font-medium text-gray-900">Mobile</div>
            <div className="text-xs text-gray-600">Touch-friendly</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}