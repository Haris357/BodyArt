'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getPageContent, updatePageContent } from '@/lib/firestore';
import { toast } from 'sonner';

export default function ContactPageEditor() {
  const [heroData, setHeroData] = useState({
    title: '',
    subtitle: '',
    backgroundImage: ''
  });
  
  const [contentData, setContentData] = useState({
    title: '',
    subtitle: '',
    description: ''
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadContent = async () => {
      const content = await getPageContent('contact');
      if (content?.hero) {
        setHeroData({ ...heroData, ...content.hero });
      }
      if (content?.content) {
        setContentData({ ...contentData, ...content.content });
      }
    };
    loadContent();
  }, []);

  const handleSave = async () => {
    setIsLoading(true);
    toast.loading('Saving contact page content...', { id: 'contact-page' });
    try {
      await updatePageContent('contact', { 
        hero: heroData,
        content: contentData
      });
      toast.success('Contact page updated successfully!', { id: 'contact-page' });
    } catch (error) {
      toast.error('Error updating contact page', { id: 'contact-page' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Tabs defaultValue="hero" className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 p-1 overflow-x-auto">
        <TabsList className="flex w-max min-w-full gap-1 bg-transparent">
          <TabsTrigger value="hero" className="flex items-center data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700 px-2 md:px-4 py-2 text-xs md:text-sm whitespace-nowrap flex-shrink-0">Hero Section</TabsTrigger>
          <TabsTrigger value="content" className="flex items-center data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700 px-2 md:px-4 py-2 text-xs md:text-sm whitespace-nowrap flex-shrink-0">Content Section</TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="hero">
        <Card>
          <CardHeader>
            <CardTitle>Contact Page Hero Section</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hero Title
              </label>
              <Input
                value={heroData.title}
                onChange={(e) => setHeroData({ ...heroData, title: e.target.value })}
                placeholder="Contact Us"
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
                placeholder="Ready to start your fitness journey? Get in touch with us today!"
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

      <TabsContent value="content">
        <Card>
          <CardHeader>
            <CardTitle>Contact Information Section</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Section Title
              </label>
              <Input
                value={contentData.title}
                onChange={(e) => setContentData({ ...contentData, title: e.target.value })}
                placeholder="Get In Touch"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Section Subtitle
              </label>
              <Input
                value={contentData.subtitle}
                onChange={(e) => setContentData({ ...contentData, subtitle: e.target.value })}
                placeholder="We're here to help you achieve your fitness goals"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <Textarea
                value={contentData.description}
                onChange={(e) => setContentData({ ...contentData, description: e.target.value })}
                rows={4}
                placeholder="Have questions about our programs, facilities, or membership options? Our friendly team is ready to assist you..."
              />
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <div className="mt-6">
        <Button 
          onClick={handleSave} 
          disabled={isLoading}
          className="btn-theme-primary"
        >
          {isLoading ? 'Saving...' : 'Save Contact Page'}
        </Button>
      </div>
    </Tabs>
  );
}