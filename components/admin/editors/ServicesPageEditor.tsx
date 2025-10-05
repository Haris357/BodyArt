'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Plus, Trash2 } from 'lucide-react';
import { getPageContent, updatePageContent } from '@/lib/firestore';
import { toast } from 'sonner';

export default function ServicesPageEditor() {
  const [heroData, setHeroData] = useState({
    title: '',
    subtitle: '',
    backgroundImage: ''
  });
  
  const [packagesData, setPackagesData] = useState({
    title: '',
    subtitle: '',
    packages: [] as any[]
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadContent = async () => {
      const content = await getPageContent('services');
      if (content?.hero) {
        setHeroData({ ...heroData, ...content.hero });
      }
      if (content?.packages) {
        setPackagesData({ 
          ...packagesData, 
          ...content.packages,
          packages: content.packages.packages || []
        });
      }
    };
    loadContent();
  }, []);

  const handleSave = async () => {
    setIsLoading(true);
    toast.loading('Saving services page content...', { id: 'services-page' });
    try {
      await updatePageContent('services', { 
        hero: heroData,
        packages: packagesData
      });
      toast.success('Services page updated successfully!', { id: 'services-page' });
    } catch (error) {
      console.error('Error updating services page:', error);
      toast.error('Error updating services page', { id: 'services-page' });
    } finally {
      setIsLoading(false);
    }
  };

  const addPackage = () => {
    setPackagesData({
      ...packagesData,
      packages: [...packagesData.packages, {
        name: 'New Package',
        price: '99',
        period: 'month',
        description: 'Package description',
        icon: '💪',
        features: ['Feature 1', 'Feature 2', 'Feature 3'],
        buttonText: 'Get Started',
        featured: false,
        badge: 'Popular'
      }]
    });
  };

  const updatePackage = (index: number, field: string, value: any) => {
    const updated = [...packagesData.packages];
    updated[index] = { ...updated[index], [field]: value };
    setPackagesData({ ...packagesData, packages: updated });
  };

  const removePackage = (index: number) => {
    setPackagesData({
      ...packagesData,
      packages: packagesData.packages.filter((_, i) => i !== index)
    });
  };

  const addFeatureToPackage = (packageIndex: number) => {
    const updated = [...packagesData.packages];
    updated[packageIndex] = {
      ...updated[packageIndex],
      features: [...updated[packageIndex].features, 'New Feature']
    };
    setPackagesData({ ...packagesData, packages: updated });
  };

  const updatePackageFeature = (packageIndex: number, featureIndex: number, value: string) => {
    const updated = [...packagesData.packages];
    updated[packageIndex].features[featureIndex] = value;
    setPackagesData({ ...packagesData, packages: updated });
  };

  const removePackageFeature = (packageIndex: number, featureIndex: number) => {
    const updated = [...packagesData.packages];
    updated[packageIndex].features = updated[packageIndex].features.filter((_: any, i: number) => i !== featureIndex);
    setPackagesData({ ...packagesData, packages: updated });
  };

  return (
    <Tabs defaultValue="hero" className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 p-1 overflow-x-auto">
        <TabsList className="flex w-max min-w-full gap-1 bg-transparent">
          <TabsTrigger value="hero" className="flex items-center data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700 px-2 md:px-4 py-2 text-xs md:text-sm whitespace-nowrap flex-shrink-0">Hero Section</TabsTrigger>
          <TabsTrigger value="packages" className="flex items-center data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700 px-2 md:px-4 py-2 text-xs md:text-sm whitespace-nowrap flex-shrink-0">Pricing Packages</TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="hero">
        <Card>
          <CardHeader>
            <CardTitle>Services Page Hero Section</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hero Title
              </label>
              <Input
                value={heroData.title}
                onChange={(e) => setHeroData({ ...heroData, title: e.target.value })}
                placeholder="Our Services & Packages"
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
                placeholder="Choose the perfect package for your needs..."
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
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="packages">
        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              Pricing Packages
              <Button onClick={addPackage} size="sm" variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Add Package
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Section Title
                </label>
                <Input
                  value={packagesData.title}
                  onChange={(e) => setPackagesData({ ...packagesData, title: e.target.value })}
                  placeholder="Our Pricing Plans"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Section Subtitle
                </label>
                <Input
                  value={packagesData.subtitle}
                  onChange={(e) => setPackagesData({ ...packagesData, subtitle: e.target.value })}
                  placeholder="Choose the perfect plan for your goals"
                />
              </div>
            </div>

            <div className="space-y-8">
              {packagesData.packages.map((pkg: any, index: number) => (
                <div key={index} className="p-6 border-2 rounded-lg space-y-6">
                  <div className="flex justify-between items-center">
                    <h4 className="font-semibold text-lg">Package {index + 1}</h4>
                    <Button 
                      onClick={() => removePackage(index)}
                      size="sm"
                      variant="outline"
                      className="text-red-600"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Remove Package
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Package Name
                      </label>
                      <Input
                        value={pkg.name}
                        onChange={(e) => updatePackage(index, 'name', e.target.value)}
                        placeholder="Basic Plan"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Price
                      </label>
                      <Input
                        value={pkg.price}
                        onChange={(e) => updatePackage(index, 'price', e.target.value)}
                        placeholder="99"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Period
                      </label>
                      <Input
                        value={pkg.period}
                        onChange={(e) => updatePackage(index, 'period', e.target.value)}
                        placeholder="month"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Icon (emoji)
                      </label>
                      <Input
                        value={pkg.icon}
                        onChange={(e) => updatePackage(index, 'icon', e.target.value)}
                        placeholder="💪"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Button Text
                      </label>
                      <Input
                        value={pkg.buttonText}
                        onChange={(e) => updatePackage(index, 'buttonText', e.target.value)}
                        placeholder="Get Started"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <Textarea
                      value={pkg.description}
                      onChange={(e) => updatePackage(index, 'description', e.target.value)}
                      rows={2}
                      placeholder="Perfect for beginners..."
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={pkg.featured}
                        onCheckedChange={(checked) => updatePackage(index, 'featured', checked)}
                      />
                      <label className="text-sm font-medium text-gray-700">
                        Featured Package
                      </label>
                    </div>
                    
                    {pkg.featured && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Badge Text
                        </label>
                        <Input
                          value={pkg.badge}
                          onChange={(e) => updatePackage(index, 'badge', e.target.value)}
                          placeholder="Most Popular"
                        />
                      </div>
                    )}
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Package Features
                      </label>
                      <Button 
                        onClick={() => addFeatureToPackage(index)}
                        size="sm" 
                        variant="outline"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Feature
                      </Button>
                    </div>
                    
                    <div className="space-y-2">
                      {pkg.features.map((feature: string, featureIndex: number) => (
                        <div key={featureIndex} className="flex space-x-2">
                          <Input
                            value={feature}
                            onChange={(e) => updatePackageFeature(index, featureIndex, e.target.value)}
                            placeholder="Package feature"
                            className="flex-1"
                          />
                          <Button 
                            onClick={() => removePackageFeature(index, featureIndex)}
                            size="sm"
                            variant="outline"
                            className="text-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {packagesData.packages.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No packages added yet. Click "Add Package" to get started!
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>

      <div className="mt-6">
        <Button 
          onClick={handleSave} 
          disabled={isLoading}
          className="btn-theme-primary"
        >
          {isLoading ? 'Saving...' : 'Save Services Page'}
        </Button>
      </div>
    </Tabs>
  );
}