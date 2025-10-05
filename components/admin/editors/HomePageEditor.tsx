'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getPageContent, updatePageContent } from '@/lib/firestore';
import { toast } from 'sonner';

export default function HomePageEditor() {
  const [heroData, setHeroData] = useState({
    title: 'Transform Your Body,',
    subtitle: 'Transform Your Life',
    description: 'Join Body Art Fitness and experience world-class training with state-of-the-art equipment and expert trainers.',
    backgroundImage: 'https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
    primaryButtonText: 'Start Your Journey',
    primaryButtonLink: '/join',
    secondaryButtonText: 'Learn More',
    secondaryButtonLink: '/about'
  });
  
  const [introData, setIntroData] = useState({
    title: 'Welcome to Body Art Fitness',
    description: 'Where fitness meets artistry. We believe that sculpting your body is an art form, and every member is an artist creating their masterpiece.',
    image: 'https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
  });

  const [ctaData, setCtaData] = useState({
    title: 'Ready to Transform Your Life?',
    subtitle: 'Join Body Art Fitness Today',
    description: 'Take the first step towards a healthier, stronger, and more confident you.',
    backgroundImage: 'https://images.pexels.com/photos/1552103/pexels-photo-1552103.jpeg?auto=compress&cs=tinysrgb&w=1920&h=800&fit=crop',
    primaryButtonText: 'Start Your Journey',
    primaryButtonLink: '/join',
    secondaryButtonText: 'Call Now',
    phone: '+1 (555) 123-4567'
  });

  const [servicesData, setServicesData] = useState({
    title: 'Our Premium Services',
    subtitle: 'Comprehensive fitness solutions tailored to your goals',
    services: [
      {
        title: 'Personal Training',
        description: 'One-on-one sessions with certified trainers to maximize your results',
        image: 'https://images.pexels.com/photos/1552106/pexels-photo-1552106.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
        features: ['Customized workout plans', 'Nutrition guidance', 'Progress tracking', 'Flexible scheduling']
      },
      {
        title: 'Group Classes',
        description: 'High-energy group workouts that motivate and inspire',
        image: 'https://images.pexels.com/photos/1431282/pexels-photo-1431282.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
        features: ['HIIT Training', 'Yoga & Pilates', 'Spinning Classes', 'Strength Training']
      },
      {
        title: 'Nutrition Coaching',
        description: 'Expert nutrition guidance to fuel your fitness journey',
        image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
        features: ['Meal planning', 'Supplement advice', 'Body composition analysis', 'Lifestyle coaching']
      }
    ]
  });

  const [featuresData, setFeaturesData] = useState({
    title: 'Why Choose Body Art Fitness?',
    subtitle: 'Experience the difference with our premium facilities and expert guidance',
    features: [
      {
        icon: '🏋️‍♂️',
        title: 'Professional Equipment',
        description: 'Top-of-the-line fitness equipment from leading brands, maintained to perfection',
        image: 'https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'
      },
      {
        icon: '👨‍🏫',
        title: 'Expert Trainers',
        description: 'Certified professionals with years of experience in fitness and nutrition',
        image: 'https://images.pexels.com/photos/1552106/pexels-photo-1552106.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'
      },
      {
        icon: '🥗',
        title: 'Nutrition Guidance',
        description: 'Comprehensive meal planning and nutritional support for optimal results',
        image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'
      }
    ]
  });

  const [statsData, setStatsData] = useState({
    title: 'Proven Results That Speak for Themselves',
    backgroundImage: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=1920&h=600&fit=crop',
    stats: [
      { number: '2000', label: 'Happy Members', suffix: '+' },
      { number: '50', label: 'Expert Trainers', suffix: '+' },
      { number: '15', label: 'Years Experience', suffix: '+' },
      { number: '24', label: 'Hours Access', suffix: '/7' }
    ]
  });

  const [galleryData, setGalleryData] = useState({
    title: 'Our State-of-the-Art Facility',
    subtitle: 'Take a virtual tour of our premium fitness center',
    images: [
      {
        url: 'https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
        alt: 'Main workout floor',
        category: 'Equipment'
      },
      {
        url: 'https://images.pexels.com/photos/1552103/pexels-photo-1552103.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
        alt: 'Cardio section',
        category: 'Cardio'
      },
      {
        url: 'https://images.pexels.com/photos/1552106/pexels-photo-1552106.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
        alt: 'Personal training area',
        category: 'Training'
      }
    ]
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadContent = async () => {
      const content = await getPageContent('home');
      if (content?.hero) {
        setHeroData({ ...heroData, ...content.hero });
      }
      if (content?.intro) {
        setIntroData({ ...introData, ...content.intro });
      }
      if (content?.cta) {
        setCtaData({ ...ctaData, ...content.cta });
      }
      if (content?.services) {
        setServicesData({ ...servicesData, ...content.services });
      }
      if (content?.features) {
        setFeaturesData({ ...featuresData, ...content.features });
      }
      if (content?.stats) {
        setStatsData({ ...statsData, ...content.stats });
      }
      if (content?.gallery) {
        setGalleryData({ ...galleryData, ...content.gallery });
      }
    };
    loadContent();
  }, []);

  const handleSave = async () => {
    setIsLoading(true);
    toast.loading('Saving home page content...', { id: 'home-page' });
    try {
      await updatePageContent('home', { 
        hero: heroData,
        intro: introData,
        cta: ctaData,
        services: servicesData,
        features: featuresData,
        stats: statsData,
        gallery: galleryData
      });
      toast.success('Home page updated successfully!', { id: 'home-page' });
    } catch (error) {
      toast.error('Error updating home page', { id: 'home-page' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Tabs defaultValue="hero" className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 p-1 overflow-x-auto">
        <TabsList className="flex w-max min-w-full gap-1 bg-transparent">
          <TabsTrigger value="hero" className="flex items-center data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700 px-2 md:px-4 py-2 text-xs md:text-sm whitespace-nowrap flex-shrink-0">Hero Section</TabsTrigger>
          <TabsTrigger value="intro" className="flex items-center data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700 px-2 md:px-4 py-2 text-xs md:text-sm whitespace-nowrap flex-shrink-0">Intro Section</TabsTrigger>
          <TabsTrigger value="services" className="flex items-center data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700 px-2 md:px-4 py-2 text-xs md:text-sm whitespace-nowrap flex-shrink-0">Services</TabsTrigger>
          <TabsTrigger value="features" className="flex items-center data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700 px-2 md:px-4 py-2 text-xs md:text-sm whitespace-nowrap flex-shrink-0">Features</TabsTrigger>
          <TabsTrigger value="stats" className="flex items-center data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700 px-2 md:px-4 py-2 text-xs md:text-sm whitespace-nowrap flex-shrink-0">Stats</TabsTrigger>
          <TabsTrigger value="cta" className="flex items-center data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700 px-2 md:px-4 py-2 text-xs md:text-sm whitespace-nowrap flex-shrink-0">Call to Action</TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="hero">
        <Card>
          <CardHeader>
            <CardTitle>Hero Section</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Main Title
                </label>
                <Input
                  value={heroData.title}
                  onChange={(e) => setHeroData({ ...heroData, title: e.target.value })}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subtitle
                </label>
                <Input
                  value={heroData.subtitle}
                  onChange={(e) => setHeroData({ ...heroData, subtitle: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <Textarea
                value={heroData.description}
                onChange={(e) => setHeroData({ ...heroData, description: e.target.value })}
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Background Image URL
              </label>
              <Input
                value={heroData.backgroundImage}
                onChange={(e) => setHeroData({ ...heroData, backgroundImage: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Primary Button Text
                </label>
                <Input
                  value={heroData.primaryButtonText}
                  onChange={(e) => setHeroData({ ...heroData, primaryButtonText: e.target.value })}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Primary Button Link
                </label>
                <Input
                  value={heroData.primaryButtonLink}
                  onChange={(e) => setHeroData({ ...heroData, primaryButtonLink: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Secondary Button Text
                </label>
                <Input
                  value={heroData.secondaryButtonText}
                  onChange={(e) => setHeroData({ ...heroData, secondaryButtonText: e.target.value })}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Secondary Button Link
                </label>
                <Input
                  value={heroData.secondaryButtonLink}
                  onChange={(e) => setHeroData({ ...heroData, secondaryButtonLink: e.target.value })}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="intro">
        <Card>
          <CardHeader>
            <CardTitle>Intro Section</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Section Title
              </label>
              <Input
                value={introData.title}
                onChange={(e) => setIntroData({ ...introData, title: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <Textarea
                value={introData.description}
                onChange={(e) => setIntroData({ ...introData, description: e.target.value })}
                rows={4}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Section Image URL
              </label>
              <Input
                value={introData.image}
                onChange={(e) => setIntroData({ ...introData, image: e.target.value })}
              />
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="services">
        <Card>
          <CardHeader>
            <CardTitle>Services Section</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Section Title
                </label>
                <Input
                  value={servicesData.title}
                  onChange={(e) => setServicesData({ ...servicesData, title: e.target.value })}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Section Subtitle
                </label>
                <Input
                  value={servicesData.subtitle}
                  onChange={(e) => setServicesData({ ...servicesData, subtitle: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-6">
              {servicesData.services.map((service, index) => (
                <div key={index} className="p-6 border rounded-lg space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-semibold text-lg">Service {index + 1}</h4>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        const updated = servicesData.services.filter((_, i) => i !== index);
                        setServicesData({ ...servicesData, services: updated });
                      }}
                      className="text-red-600"
                    >
                      Remove
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Service Title
                      </label>
                      <Input
                        value={service.title}
                        onChange={(e) => {
                          const updated = [...servicesData.services];
                          updated[index] = { ...updated[index], title: e.target.value };
                          setServicesData({ ...servicesData, services: updated });
                        }}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Service Image URL
                      </label>
                      <Input
                        value={service.image}
                        onChange={(e) => {
                          const updated = [...servicesData.services];
                          updated[index] = { ...updated[index], image: e.target.value };
                          setServicesData({ ...servicesData, services: updated });
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Service Description
                    </label>
                    <Textarea
                      value={service.description}
                      onChange={(e) => {
                        const updated = [...servicesData.services];
                        updated[index] = { ...updated[index], description: e.target.value };
                        setServicesData({ ...servicesData, services: updated });
                      }}
                      rows={3}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Service Features (one per line)
                    </label>
                    <Textarea
                      value={service.features.join('\n')}
                      onChange={(e) => {
                        const updated = [...servicesData.services];
                        updated[index] = { ...updated[index], features: e.target.value.split('\n').filter(f => f.trim()) };
                        setServicesData({ ...servicesData, services: updated });
                      }}
                      rows={4}
                      placeholder="Customized workout plans&#10;Nutrition guidance&#10;Progress tracking&#10;Flexible scheduling"
                    />
                  </div>
                </div>
              ))}
            </div>

            <Button 
              onClick={() => {
                setServicesData({
                  ...servicesData,
                  services: [...servicesData.services, {
                    title: 'New Service',
                    description: 'Service description',
                    image: 'https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
                    features: ['Feature 1', 'Feature 2', 'Feature 3']
                  }]
                });
              }}
              variant="outline"
            >
              Add Service
            </Button>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="features">
        <Card>
          <CardHeader>
            <CardTitle>Features Section</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Section Title
                </label>
                <Input
                  value={featuresData.title}
                  onChange={(e) => setFeaturesData({ ...featuresData, title: e.target.value })}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Section Subtitle
                </label>
                <Input
                  value={featuresData.subtitle}
                  onChange={(e) => setFeaturesData({ ...featuresData, subtitle: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-6">
              {featuresData.features.map((feature, index) => (
                <div key={index} className="p-6 border rounded-lg space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-semibold text-lg">Feature {index + 1}</h4>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        const updated = featuresData.features.filter((_, i) => i !== index);
                        setFeaturesData({ ...featuresData, features: updated });
                      }}
                      className="text-red-600"
                    >
                      Remove
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Icon (emoji)
                      </label>
                      <Input
                        value={feature.icon}
                        onChange={(e) => {
                          const updated = [...featuresData.features];
                          updated[index] = { ...updated[index], icon: e.target.value };
                          setFeaturesData({ ...featuresData, features: updated });
                        }}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Feature Title
                      </label>
                      <Input
                        value={feature.title}
                        onChange={(e) => {
                          const updated = [...featuresData.features];
                          updated[index] = { ...updated[index], title: e.target.value };
                          setFeaturesData({ ...featuresData, features: updated });
                        }}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Feature Image URL
                      </label>
                      <Input
                        value={feature.image}
                        onChange={(e) => {
                          const updated = [...featuresData.features];
                          updated[index] = { ...updated[index], image: e.target.value };
                          setFeaturesData({ ...featuresData, features: updated });
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Feature Description
                    </label>
                    <Textarea
                      value={feature.description}
                      onChange={(e) => {
                        const updated = [...featuresData.features];
                        updated[index] = { ...updated[index], description: e.target.value };
                        setFeaturesData({ ...featuresData, features: updated });
                      }}
                      rows={3}
                    />
                  </div>
                </div>
              ))}
            </div>

            <Button 
              onClick={() => {
                setFeaturesData({
                  ...featuresData,
                  features: [...featuresData.features, {
                    icon: '💪',
                    title: 'New Feature',
                    description: 'Feature description',
                    image: 'https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'
                  }]
                });
              }}
              variant="outline"
            >
              Add Feature
            </Button>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="stats">
        <Card>
          <CardHeader>
            <CardTitle>Statistics Section</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Section Title
              </label>
              <Input
                value={statsData.title}
                onChange={(e) => setStatsData({ ...statsData, title: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Background Image URL
              </label>
              <Input
                value={statsData.backgroundImage}
                onChange={(e) => setStatsData({ ...statsData, backgroundImage: e.target.value })}
              />
            </div>

            <div className="space-y-6">
              {statsData.stats.map((stat, index) => (
                <div key={index} className="p-6 border rounded-lg space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-semibold text-lg">Statistic {index + 1}</h4>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        const updated = statsData.stats.filter((_, i) => i !== index);
                        setStatsData({ ...statsData, stats: updated });
                      }}
                      className="text-red-600"
                    >
                      Remove
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Number
                      </label>
                      <Input
                        value={stat.number}
                        onChange={(e) => {
                          const updated = [...statsData.stats];
                          updated[index] = { ...updated[index], number: e.target.value };
                          setStatsData({ ...statsData, stats: updated });
                        }}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Label
                      </label>
                      <Input
                        value={stat.label}
                        onChange={(e) => {
                          const updated = [...statsData.stats];
                          updated[index] = { ...updated[index], label: e.target.value };
                          setStatsData({ ...statsData, stats: updated });
                        }}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Suffix (optional)
                      </label>
                      <Input
                        value={stat.suffix || ''}
                        onChange={(e) => {
                          const updated = [...statsData.stats];
                          updated[index] = { ...updated[index], suffix: e.target.value };
                          setStatsData({ ...statsData, stats: updated });
                        }}
                        placeholder="+ or % or /7"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Button 
              onClick={() => {
                setStatsData({
                  ...statsData,
                  stats: [...statsData.stats, {
                    number: '100',
                    label: 'New Stat',
                    suffix: '+'
                  }]
                });
              }}
              variant="outline"
            >
              Add Statistic
            </Button>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="cta">
        <Card>
          <CardHeader>
            <CardTitle>Call to Action Section</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Main Title
                </label>
                <Input
                  value={ctaData.title}
                  onChange={(e) => setCtaData({ ...ctaData, title: e.target.value })}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subtitle
                </label>
                <Input
                  value={ctaData.subtitle}
                  onChange={(e) => setCtaData({ ...ctaData, subtitle: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <Textarea
                value={ctaData.description}
                onChange={(e) => setCtaData({ ...ctaData, description: e.target.value })}
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Background Image URL
              </label>
              <Input
                value={ctaData.backgroundImage}
                onChange={(e) => setCtaData({ ...ctaData, backgroundImage: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Primary Button Text
                </label>
                <Input
                  value={ctaData.primaryButtonText}
                  onChange={(e) => setCtaData({ ...ctaData, primaryButtonText: e.target.value })}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <Input
                  value={ctaData.phone}
                  onChange={(e) => setCtaData({ ...ctaData, phone: e.target.value })}
                />
              </div>
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
          {isLoading ? 'Saving...' : 'Save All Sections'}
        </Button>
      </div>
    </Tabs>
  );
}