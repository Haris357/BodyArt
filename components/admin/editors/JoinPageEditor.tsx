'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Trash2 } from 'lucide-react';
import { getPageContent, updatePageContent } from '@/lib/firestore';
import { toast } from 'sonner';

export default function JoinPageEditor() {
  const [heroData, setHeroData] = useState({
    title: '',
    subtitle: '',
    backgroundImage: ''
  });
  
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    dropdownLabel: '',
    dropdownPlaceholder: '',
    dropdownOptions: [] as any[]
  });

  const [benefitsData, setBenefitsData] = useState({
    title: '',
    benefits: [] as any[]
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadContent = async () => {
      const content = await getPageContent('join');
      if (content?.hero) {
        setHeroData({ ...heroData, ...content.hero });
      }
      if (content?.form) {
        setFormData({ 
          ...formData, 
          ...content.form,
          dropdownOptions: content.form.dropdownOptions || []
        });
      }
      if (content?.benefits) {
        setBenefitsData({ 
          ...benefitsData, 
          ...content.benefits,
          benefits: content.benefits.benefits || []
        });
      }
    };
    loadContent();
  }, []);

  const handleSave = async () => {
    setIsLoading(true);
    toast.loading('Saving join page content...', { id: 'join-page' });
    try {
      await updatePageContent('join', { 
        hero: heroData,
        form: formData,
        benefits: benefitsData
      });
      toast.success('Join page updated successfully!', { id: 'join-page' });
    } catch (error) {
      console.error('Error updating join page:', error);
      toast.error('Error updating join page', { id: 'join-page' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveDropdownOnly = async () => {
    setIsLoading(true);
    toast.loading('Saving dropdown options...', { id: 'dropdown-save' });
    try {
      // Get current page content
      const currentContent = await getPageContent('join');
      
      // Update only the form section with new dropdown options
      await updatePageContent('join', { 
        ...currentContent,
        form: {
          ...currentContent?.form,
          ...formData
        }
      });
      toast.success('Dropdown options saved successfully!', { id: 'dropdown-save' });
    } catch (error) {
      console.error('Error saving dropdown options:', error);
      toast.error('Error saving dropdown options', { id: 'dropdown-save' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveBenefitsOnly = async () => {
    setIsLoading(true);
    toast.loading('Saving benefits...', { id: 'benefits-save' });
    try {
      // Get current page content
      const currentContent = await getPageContent('join');
      
      // Update only the benefits section
      await updatePageContent('join', { 
        ...currentContent,
        benefits: benefitsData
      });
      toast.success('Benefits saved successfully!', { id: 'benefits-save' });
    } catch (error) {
      console.error('Error saving benefits:', error);
      toast.error('Error saving benefits', { id: 'benefits-save' });
    } finally {
      setIsLoading(false);
    }
  };

  const addBenefit = () => {
    setBenefitsData({
      ...benefitsData,
      benefits: [...benefitsData.benefits, { icon: '💪', title: '', description: '' }]
    });
  };

  const updateBenefit = (index: number, field: string, value: string) => {
    const updated = [...benefitsData.benefits];
    updated[index] = { ...updated[index], [field]: value };
    setBenefitsData({ ...benefitsData, benefits: updated });
  };

  const removeBenefit = (index: number) => {
    setBenefitsData({
      ...benefitsData,
      benefits: benefitsData.benefits.filter((_, i) => i !== index)
    });
  };

  const addDropdownOption = () => {
    setFormData({
      ...formData,
      dropdownOptions: [...formData.dropdownOptions, { label: '', value: '' }]
    });
  };

  const updateDropdownOption = (index: number, field: string, value: string) => {
    const updated = [...formData.dropdownOptions];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, dropdownOptions: updated });
  };

  const removeDropdownOption = (index: number) => {
    setFormData({
      ...formData,
      dropdownOptions: formData.dropdownOptions.filter((_, i) => i !== index)
    });
  };

  return (
    <Tabs defaultValue="hero" className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 p-1 overflow-x-auto">
        <TabsList className="flex w-max min-w-full gap-1 bg-transparent">
          <TabsTrigger value="hero" className="flex items-center data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700 px-2 md:px-4 py-2 text-xs md:text-sm whitespace-nowrap flex-shrink-0">Hero Section</TabsTrigger>
          <TabsTrigger value="form" className="flex items-center data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700 px-2 md:px-4 py-2 text-xs md:text-sm whitespace-nowrap flex-shrink-0">Form Section</TabsTrigger>
          <TabsTrigger value="dropdown" className="flex items-center data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700 px-2 md:px-4 py-2 text-xs md:text-sm whitespace-nowrap flex-shrink-0">Dropdown Options</TabsTrigger>
          <TabsTrigger value="benefits" className="flex items-center data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700 px-2 md:px-4 py-2 text-xs md:text-sm whitespace-nowrap flex-shrink-0">Benefits Section</TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="hero">
        <Card>
          <CardHeader>
            <CardTitle>Join Page Hero Section</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hero Title
              </label>
              <Input
                value={heroData.title}
                onChange={(e) => setHeroData({ ...heroData, title: e.target.value })}
                placeholder="Join Body Art Fitness"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hero Subtitle
              </label>
              <Textarea
                value={heroData.subtitle}
                onChange={(e) => setHeroData({ ...heroData, subtitle: e.target.value })}
                rows={2}
                placeholder="Take the first step towards a healthier, stronger you..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Background Image URL
              </label>
              <Input
                value={heroData.backgroundImage}
                onChange={(e) => setHeroData({ ...heroData, backgroundImage: e.target.value })}
                placeholder="https://images.pexels.com/..."
              />
            </div>

            <Button 
              onClick={async () => {
                setIsLoading(true);
                toast.loading('Saving hero section...', { id: 'hero-save' });
                try {
                  const currentContent = await getPageContent('join');
                  await updatePageContent('join', { 
                    ...currentContent,
                    hero: heroData
                  });
                  toast.success('Hero section saved successfully!', { id: 'hero-save' });
                } catch (error) {
                  console.error('Error saving hero section:', error);
                  toast.error('Error saving hero section', { id: 'hero-save' });
                } finally {
                  setIsLoading(false);
                }
              }}
              disabled={isLoading}
              className="btn-theme-primary"
            >
              {isLoading ? 'Saving...' : 'Save Hero Section'}
            </Button>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="form">
        <Card>
          <CardHeader>
            <CardTitle>Membership Form Section</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Form Title
              </label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Membership Application"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Form Subtitle
              </label>
              <Input
                value={formData.subtitle}
                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                placeholder="Fill out this form and we'll contact you..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Form Description
              </label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                placeholder="Additional information about the membership process..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Dropdown Label
              </label>
              <Input
                value={formData.dropdownLabel}
                onChange={(e) => setFormData({ ...formData, dropdownLabel: e.target.value })}
                placeholder="Primary Fitness Goal"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Dropdown Placeholder
              </label>
              <Input
                value={formData.dropdownPlaceholder}
                onChange={(e) => setFormData({ ...formData, dropdownPlaceholder: e.target.value })}
                placeholder="Select your primary fitness goal"
              />
            </div>

            <Button 
              onClick={async () => {
                setIsLoading(true);
                toast.loading('Saving form section...', { id: 'form-save' });
                try {
                  const currentContent = await getPageContent('join');
                  await updatePageContent('join', { 
                    ...currentContent,
                    form: {
                      ...currentContent?.form,
                      title: formData.title,
                      subtitle: formData.subtitle,
                      description: formData.description,
                      dropdownLabel: formData.dropdownLabel,
                      dropdownPlaceholder: formData.dropdownPlaceholder,
                      dropdownOptions: formData.dropdownOptions
                    }
                  });
                  toast.success('Form section saved successfully!', { id: 'form-save' });
                } catch (error) {
                  console.error('Error saving form section:', error);
                  toast.error('Error saving form section', { id: 'form-save' });
                } finally {
                  setIsLoading(false);
                }
              }}
              disabled={isLoading}
              className="btn-theme-primary"
            >
              {isLoading ? 'Saving...' : 'Save Form Section'}
            </Button>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="dropdown">
        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              Dropdown Options
              <Button onClick={addDropdownOption} size="sm" variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Add Option
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              {formData.dropdownOptions.map((option: any, index: number) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Display Label
                      </label>
                      <Input
                        placeholder="Weight Loss & Fat Burning"
                        value={option.label}
                        onChange={(e) => updateDropdownOption(index, 'label', e.target.value)}
                      />
                    </div>
                    <div className="flex space-x-2">
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Value
                        </label>
                        <Input
                          placeholder="weight-loss"
                          value={option.value}
                          onChange={(e) => updateDropdownOption(index, 'value', e.target.value)}
                        />
                      </div>
                      <div className="flex items-end">
                        <Button 
                          onClick={() => removeDropdownOption(index)}
                          size="sm"
                          variant="outline"
                          className="text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {formData.dropdownOptions.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No dropdown options added yet. Click "Add Option" to get started!
              </div>
            )}

            <Button 
              onClick={handleSaveDropdownOnly}
              disabled={isLoading}
              className="btn-theme-primary w-full"
            >
              {isLoading ? 'Saving...' : 'Save Dropdown Options'}
            </Button>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="benefits">
        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              Membership Benefits
              <Button onClick={addBenefit} size="sm" variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Add Benefit
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Benefits Section Title
              </label>
              <Input
                value={benefitsData.title}
                onChange={(e) => setBenefitsData({ ...benefitsData, title: e.target.value })}
                placeholder="Why Choose Us"
              />
            </div>

            <div className="space-y-4">
              {benefitsData.benefits.map((benefit: any, index: number) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Input
                      placeholder="Icon (emoji)"
                      value={benefit.icon}
                      onChange={(e) => updateBenefit(index, 'icon', e.target.value)}
                    />
                    <Input
                      placeholder="Benefit title"
                      value={benefit.title}
                      onChange={(e) => updateBenefit(index, 'title', e.target.value)}
                    />
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Description"
                        value={benefit.description}
                        onChange={(e) => updateBenefit(index, 'description', e.target.value)}
                        className="flex-1"
                      />
                      <Button 
                        onClick={() => removeBenefit(index)}
                        size="sm"
                        variant="outline"
                        className="text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {benefitsData.benefits.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No benefits added yet. Click "Add Benefit" to get started!
              </div>
            )}

            <Button 
              onClick={handleSaveBenefitsOnly}
              disabled={isLoading}
              className="btn-theme-primary w-full"
            >
              {isLoading ? 'Saving...' : 'Save Benefits Section'}
            </Button>
          </CardContent>
        </Card>
      </TabsContent>

      <div className="mt-6">
        <Button 
          onClick={handleSave} 
          disabled={isLoading}
          className="btn-theme-primary"
        >
          {isLoading ? 'Saving...' : 'Save All Sections'}
        </Button>
      </div>
    </Tabs>
  );
}