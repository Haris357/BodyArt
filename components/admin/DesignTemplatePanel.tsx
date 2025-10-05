'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Palette, Check, Eye, Sparkles, Zap, Circle, Square } from 'lucide-react';
import { getSiteSettings, updateSiteSettings } from '@/lib/firestore';
import { designTemplates, DesignTemplate, getDesignTemplateById, applyDesignTemplate } from '@/lib/designTemplates';
import { toast } from 'sonner';

export default function DesignTemplatePanel() {
  const [currentTemplate, setCurrentTemplate] = useState(designTemplates[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTemplateId, setSelectedTemplateId] = useState(designTemplates[0].id);

  useEffect(() => {
    loadCurrentTemplate();
  }, []);

  const loadCurrentTemplate = async () => {
    try {
      const settings = await getSiteSettings();
      if (settings?.designTemplate) {
        const template = getDesignTemplateById(settings.designTemplate);
        setCurrentTemplate(template);
        setSelectedTemplateId(template.id);
        applyDesignTemplate(template);
      }
    } catch (error) {
      console.error('Error loading design template:', error);
    }
  };

  const handleTemplateChange = async (templateId: string) => {
    setSelectedTemplateId(templateId);
    const template = getDesignTemplateById(templateId);
    setCurrentTemplate(template);
    applyDesignTemplate(template);
    
    setIsLoading(true);
    toast.loading('Saving design template...', { id: 'design-template' });
    
    try {
      const currentSettings = await getSiteSettings() || {};
      await updateSiteSettings({
        ...currentSettings,
        designTemplate: templateId
      });
      
      toast.success('Design template updated successfully!', { id: 'design-template' });
    } catch (error) {
      console.error('Error saving template:', error);
      toast.error('Error saving design template', { id: 'design-template' });
    } finally {
      setIsLoading(false);
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'modern': return <Sparkles className="h-4 w-4" />;
      case 'classic': return <Square className="h-4 w-4" />;
      case 'minimal': return <Circle className="h-4 w-4" />;
      case 'bold': return <Zap className="h-4 w-4" />;
      case 'creative': return <Palette className="h-4 w-4" />;
      case 'professional': return <Square className="h-4 w-4" />;
      default: return <Palette className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'modern': return 'bg-blue-100 text-blue-800';
      case 'classic': return 'bg-purple-100 text-purple-800';
      case 'minimal': return 'bg-gray-100 text-gray-800';
      case 'bold': return 'bg-red-100 text-red-800';
      case 'creative': return 'bg-pink-100 text-pink-800';
      case 'professional': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const TemplatePreview = ({ template }: { template: DesignTemplate }) => (
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
          <div className="flex items-center space-x-2">
            <span className="text-3xl">{template.preview}</span>
            <div>
              <h3 className="font-bold text-gray-900">{template.name}</h3>
              <Badge className={`${getCategoryColor(template.category)} text-xs`}>
                {getCategoryIcon(template.category)}
                <span className="ml-1 capitalize">{template.category}</span>
              </Badge>
            </div>
          </div>
        </div>
        
        <p className="text-sm text-gray-600">{template.description}</p>
        
        {/* Design Preview Elements */}
        <div className="space-y-3">
          {/* Hero Preview */}
          <div className="bg-gray-100 rounded-lg p-3">
            <div className="text-xs text-gray-500 mb-2">Hero Style</div>
            <div className={`h-16 rounded ${
              template.components.hero.style === 'gradient' ? 'bg-gradient-to-r from-blue-400 to-purple-500' :
              template.components.hero.style === 'minimal' ? 'bg-gray-200' :
              template.components.hero.style === 'animated' ? 'bg-gradient-to-r from-red-400 to-orange-500' :
              template.components.hero.style === 'geometric' ? 'bg-gradient-to-br from-pink-400 to-purple-500' :
              template.components.hero.style === 'split' ? 'bg-gradient-to-r from-green-400 to-blue-500' :
              template.components.hero.style === 'floating' ? 'bg-gradient-to-r from-indigo-400 to-cyan-500' :
              'bg-gray-800'
            } flex items-center justify-center`}>
              <div className={`text-white text-xs font-bold ${
                template.components.hero.textAlignment === 'center' ? 'text-center' :
                template.components.hero.textAlignment === 'left' ? 'text-left' : 'text-right'
              }`}>
                Hero Section
              </div>
            </div>
          </div>
          
          {/* Cards Preview */}
          <div className="bg-gray-100 rounded-lg p-3">
            <div className="text-xs text-gray-500 mb-2">Card Style</div>
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3].map((i) => (
                <div 
                  key={i}
                  className={`h-8 bg-white ${
                    template.components.cards.borderRadius === 'none' ? 'rounded-none' :
                    template.components.cards.borderRadius === 'small' ? 'rounded-sm' :
                    template.components.cards.borderRadius === 'large' ? 'rounded-lg' :
                    template.components.cards.borderRadius === 'full' ? 'rounded-full' :
                    template.components.cards.borderRadius === 'organic' ? 'rounded-tl-2xl rounded-br-2xl' :
                    'rounded-md'
                  } ${
                    template.components.cards.shadow === 'none' ? '' :
                    template.components.cards.shadow === 'small' ? 'shadow-sm' :
                    template.components.cards.shadow === 'large' ? 'shadow-lg' :
                    template.components.cards.shadow === 'neon' ? 'shadow-lg shadow-blue-500/25' :
                    template.components.cards.shadow === 'soft' ? 'shadow-xl shadow-gray-300/50' :
                    'shadow-md'
                  } ${
                    template.components.cards.style === 'outlined' ? 'border border-gray-300' :
                    template.components.cards.style === 'glass' ? 'bg-white/80 backdrop-blur-sm' :
                    template.components.cards.style === 'neumorphism' ? 'bg-gray-100 shadow-inner' :
                    template.components.cards.style === 'floating' ? 'bg-white transform rotate-1' :
                    template.components.cards.style === 'tilted' ? 'bg-white transform -rotate-1' :
                    ''
                  }`}
                />
              ))}
            </div>
          </div>
          
          {/* Buttons Preview */}
          <div className="bg-gray-100 rounded-lg p-3">
            <div className="text-xs text-gray-500 mb-2">Button Style</div>
            <div className="flex space-x-2">
              <div 
                className={`px-3 py-1 text-xs text-white ${
                  template.components.buttons.style === 'filled' ? 'bg-blue-500' :
                  template.components.buttons.style === 'gradient' ? 'bg-gradient-to-r from-blue-500 to-purple-500' :
                  template.components.buttons.style === 'outlined' ? 'border border-blue-500 text-blue-500 bg-transparent' :
                  template.components.buttons.style === 'neon' ? 'bg-blue-500 shadow-lg shadow-blue-500/50' :
                  template.components.buttons.style === 'glass' ? 'bg-blue-500/80 backdrop-blur-sm' :
                  template.components.buttons.style === 'neumorphism' ? 'bg-gray-200 text-gray-700 shadow-inner' :
                  'bg-transparent text-blue-500'
                } ${
                  template.components.buttons.borderRadius === 'none' ? 'rounded-none' :
                  template.components.buttons.borderRadius === 'small' ? 'rounded-sm' :
                  template.components.buttons.borderRadius === 'large' ? 'rounded-lg' :
                  template.components.buttons.borderRadius === 'full' ? 'rounded-full' :
                  template.components.buttons.borderRadius === 'organic' ? 'rounded-tl-lg rounded-br-lg' :
                  'rounded-md'
                }`}
              >
                Button
              </div>
            </div>
          </div>
        </div>
        
        {/* Feature Tags */}
        <div className="flex flex-wrap gap-1">
          <Badge variant="outline" className="text-xs">
            {template.components.hero.style}
          </Badge>
          <Badge variant="outline" className="text-xs">
            {template.components.cards.style}
          </Badge>
          <Badge variant="outline" className="text-xs">
            {template.components.sections.spacing}
          </Badge>
        </div>
      </div>
    </div>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Palette className="h-5 w-5" />
          <span>Website Design Templates</span>
        </CardTitle>
        <p className="text-sm text-gray-600">
          Choose a design template that defines the overall look and feel of your website. 
          Each template includes unique styling for hero sections, cards, buttons, and layouts.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {designTemplates.map((template) => (
            <TemplatePreview key={template.id} template={template} />
          ))}
        </div>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-blue-900 mb-2">Template Features:</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Hero section styling and animations</li>
            <li>• Card designs and hover effects</li>
            <li>• Button styles and interactions</li>
            <li>• Section spacing and layouts</li>
            <li>• Header and footer designs</li>
            <li>• Overall visual hierarchy</li>
          </ul>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h4 className="font-semibold text-green-900 mb-2">Current Template:</h4>
          <div className="flex items-center space-x-3">
            <span className="text-2xl">{currentTemplate.preview}</span>
            <div>
              <span className="text-green-800 font-medium">{currentTemplate.name}</span>
              <Badge className={`ml-2 ${getCategoryColor(currentTemplate.category)}`}>
                {getCategoryIcon(currentTemplate.category)}
                <span className="ml-1 capitalize">{currentTemplate.category}</span>
              </Badge>
            </div>
          </div>
          <p className="text-sm text-green-700 mt-2">{currentTemplate.description}</p>
        </div>

        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <h4 className="font-semibold text-orange-900 mb-2">💡 Pro Tip:</h4>
          <p className="text-sm text-orange-800">
            Design templates work with your color themes! Change both the design template and color theme 
            to create unique combinations that perfectly match your brand.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}