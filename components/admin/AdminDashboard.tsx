'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Settings, 
  LogOut, 
  Database, 
  Users, 
  MessageSquare, 
  FileText, 
  Activity, 
  TrendingUp,
  Palette,
  Layout,
  Globe,
  Mail,
  Navigation,
  Edit3
} from 'lucide-react';
import { signOut } from '@/lib/auth';
import SiteSettingsPanel from './SiteSettingsPanel';
import PageContentPanel from './PageContentPanel';
import TestimonialsPanel from './TestimonialsPanel';
import FormSubmissionsPanel from './FormSubmissionsPanel';
import NavigationPanel from './NavigationPanel';
import ColorThemePanel from './ColorThemePanel';
import DesignTemplatePanel from './DesignTemplatePanel';
import WebsiteTemplatePanel from './WebsiteTemplatePanel';
import EmailSettingsPanel from './EmailSettingsPanel';
import DocumentEditor from './DocumentEditor';
import { useSiteSettings, useTestimonials } from '@/hooks/useFirestore';
import { getFormSubmissions } from '@/lib/firestore';
import { toast } from 'sonner';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [contentTab, setContentTab] = useState('site-settings');
  const [designTab, setDesignTab] = useState('website-template');
  const [isInitializing, setIsInitializing] = useState(false);
  const [selectedBusinessType, setSelectedBusinessType] = useState('gym');
  const [stats, setStats] = useState({
    totalSubmissions: 0,
    newSubmissions: 0,
    totalTestimonials: 0,
    totalPages: 5
  });

  const { settings } = useSiteSettings();
  const { testimonials } = useTestimonials();

  useEffect(() => {
    loadStats();
  }, [testimonials]);

  const loadStats = async () => {
    try {
      const submissions = await getFormSubmissions();
      const newSubmissions = submissions.filter((sub: any) => sub.status === 'new' || !sub.status);
      
      setStats({
        totalSubmissions: submissions.length,
        newSubmissions: newSubmissions.length,
        totalTestimonials: testimonials.length,
        totalPages: 5
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  const handleLogout = async () => {
    toast.loading('Signing out...', { id: 'logout' });
    try {
      const result = await signOut();
      if (result.success) {
        toast.success('Signed out successfully!', { id: 'logout' });
        window.location.href = '/admin/login';
      } else {
        toast.error('Error signing out', { id: 'logout' });
      }
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Error signing out', { id: 'logout' });
      window.location.href = '/admin/login';
    }
  };

  const handleInitializeData = async (businessType: string) => {
    setIsInitializing(true);
    const businessNames = {
      gym: 'Gym/Fitness',
      parlour: 'Beauty Parlour',
      restaurant: 'Restaurant'
    };
    
    toast.loading(`Initializing ${businessNames[businessType as keyof typeof businessNames]} data...`, { id: 'initialize' });
    try {
      let initializeFunction;
      
      switch (businessType) {
        case 'gym':
          const gymModule = await import('@/lib/initializers/initializeGym');
          initializeFunction = gymModule.initializeGymData;
          break;
        case 'parlour':
          const parlourModule = await import('@/lib/initializers/initializeParlour');
          initializeFunction = parlourModule.initializeParlourData;
          break;
        case 'restaurant':
          const restaurantModule = await import('@/lib/initializers/initializeRestaurant');
          initializeFunction = restaurantModule.initializeRestaurantData;
          break;
        default:
          throw new Error('Invalid business type');
      }
      
      await initializeFunction();
      
      toast.success(`${businessNames[businessType as keyof typeof businessNames]} data initialized successfully!`, { id: 'initialize' });
      
      setTimeout(() => {
        console.log('Refreshing page to show new data...');
        window.location.reload();
      }, 2000);
      
    } catch (error) {
      console.error('Initialization error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      toast.error(`Initialization failed: ${errorMessage}`, { id: 'initialize' });
    } finally {
      setIsInitializing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="p-2 theme-bg-gradient rounded-lg">
                <Settings className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold text-gray-900">Admin Panel</span>
                <p className="text-xs text-gray-500">{settings?.siteName || 'Website Management'}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline" 
                size="sm"
                asChild
              >
                <a href="/" target="_blank" className="flex items-center">
                  <Globe className="h-4 w-4 mr-2" />
                  View Site
                </a>
              </Button>
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          {/* Main Tab Navigation - Only 4 tabs */}
          <div className="bg-white rounded-lg border border-gray-200 p-1 overflow-x-auto">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 gap-1 bg-transparent min-w-max">
              <TabsTrigger 
                value="overview" 
                className="flex items-center justify-center space-x-1 md:space-x-2 data-[state=active]:bg-orange-100 data-[state=active]:text-orange-700 px-2 md:px-4 py-2 text-xs md:text-sm whitespace-nowrap"
              >
                <Activity className="h-4 w-4" />
                <span className="hidden sm:inline md:inline">Dashboard</span>
              </TabsTrigger>
              <TabsTrigger 
                value="content" 
                className="flex items-center justify-center space-x-1 md:space-x-2 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700 px-2 md:px-4 py-2 text-xs md:text-sm whitespace-nowrap"
              >
                <FileText className="h-4 w-4" />
                <span className="hidden sm:inline md:inline">Content</span>
              </TabsTrigger>
              <TabsTrigger 
                value="design" 
                className="flex items-center justify-center space-x-1 md:space-x-2 data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700 px-2 md:px-4 py-2 text-xs md:text-sm whitespace-nowrap"
              >
                <Palette className="h-4 w-4" />
                <span className="hidden sm:inline md:inline">Design</span>
              </TabsTrigger>
              <TabsTrigger 
                value="tools" 
                className="flex items-center justify-center space-x-1 md:space-x-2 data-[state=active]:bg-green-100 data-[state=active]:text-green-700 px-2 md:px-4 py-2 text-xs md:text-sm whitespace-nowrap"
              >
                <Edit3 className="h-4 w-4" />
                <span className="hidden sm:inline md:inline">Tools</span>
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Dashboard Overview */}
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Submissions</p>
                      <p className="text-3xl font-bold theme-text-primary">{stats.totalSubmissions}</p>
                    </div>
                    <div className="p-3 theme-bg-primary-light rounded-lg">
                      <MessageSquare className="h-6 w-6 theme-text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">New Submissions</p>
                      <p className="text-3xl font-bold theme-text-primary">{stats.newSubmissions}</p>
                    </div>
                    <div className="p-3 theme-bg-primary-light rounded-lg">
                      <Activity className="h-6 w-6 theme-text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Testimonials</p>
                      <p className="text-3xl font-bold theme-text-primary">{stats.totalTestimonials}</p>
                    </div>
                    <div className="p-3 theme-bg-primary-light rounded-lg">
                      <Users className="h-6 w-6 theme-text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Active Pages</p>
                      <p className="text-3xl font-bold theme-text-primary">{stats.totalPages}</p>
                    </div>
                    <div className="p-3 theme-bg-primary-light rounded-lg">
                      <FileText className="h-6 w-6 theme-text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Business Initialization */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Database className="h-5 w-5" />
                    <span>Initialize Business Data</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Business Type
                    </label>
                    <Select value={selectedBusinessType} onValueChange={setSelectedBusinessType}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gym">🏋️ Gym/Fitness Center</SelectItem>
                        <SelectItem value="parlour">💄 Beauty Parlour/Salon</SelectItem>
                        <SelectItem value="restaurant">🍽️ Restaurant/Cafe</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button 
                    onClick={() => handleInitializeData(selectedBusinessType)}
                    disabled={isInitializing}
                    className="w-full btn-theme-primary"
                  >
                    {isInitializing ? 'Initializing...' : 'Initialize Data'}
                  </Button>
                  
                  <div className="text-xs text-gray-500 bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                    <strong>⚠️ Warning:</strong> This will replace ALL existing content with new business data.
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5" />
                    <span>Quick Actions</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    onClick={() => setActiveTab('content')}
                    className="w-full justify-start"
                    variant="outline"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Edit Website Content
                  </Button>
                  <Button 
                    onClick={() => setActiveTab('design')}
                    className="w-full justify-start"
                    variant="outline"
                  >
                    <Palette className="h-4 w-4 mr-2" />
                    Change Website Design
                  </Button>
                  <Button 
                    onClick={() => setActiveTab('tools')}
                    className="w-full justify-start"
                    variant="outline"
                  >
                    <Edit3 className="h-4 w-4 mr-2" />
                    Document Editor & Tools
                  </Button>
                  <Button 
                    asChild
                    className="w-full justify-start"
                    variant="outline"
                  >
                    <a href="/" target="_blank">
                      <Globe className="h-4 w-4 mr-2" />
                      View Live Website
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* System Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="h-5 w-5" />
                  <span>System Status</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-green-800 font-medium text-sm">Database</span>
                    </div>
                    <span className="text-green-600 text-xs font-semibold">Online</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-blue-800 font-medium text-sm">Content</span>
                    </div>
                    <span className="text-blue-600 text-xs font-semibold">Active</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg border border-purple-200">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span className="text-purple-800 font-medium text-sm">Forms</span>
                    </div>
                    <span className="text-purple-600 text-xs font-semibold">Receiving</span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border border-orange-200">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span className="text-orange-800 font-medium text-sm">Website</span>
                    </div>
                    <span className="text-orange-600 text-xs font-semibold">Live</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Content Management */}
          <TabsContent value="content" className="space-y-6">
            <Tabs value={contentTab} onValueChange={setContentTab} className="space-y-6">
              <div className="bg-white rounded-lg border border-gray-200 p-1 overflow-x-auto">
                <TabsList className="flex w-max min-w-full gap-1 bg-transparent">
                  <TabsTrigger 
                    value="site-settings" 
                    className="flex items-center space-x-1 md:space-x-2 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700 px-2 md:px-4 py-2 text-xs md:text-sm whitespace-nowrap flex-shrink-0"
                  >
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="pages" 
                    className="flex items-center space-x-1 md:space-x-2 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700 px-2 md:px-4 py-2 text-xs md:text-sm whitespace-nowrap flex-shrink-0"
                  >
                    <FileText className="h-4 w-4" />
                    <span>Pages</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="testimonials" 
                    className="flex items-center space-x-1 md:space-x-2 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700 px-2 md:px-4 py-2 text-xs md:text-sm whitespace-nowrap flex-shrink-0"
                  >
                    <Users className="h-4 w-4" />
                    <span>Reviews</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="navigation" 
                    className="flex items-center space-x-1 md:space-x-2 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700 px-2 md:px-4 py-2 text-xs md:text-sm whitespace-nowrap flex-shrink-0"
                  >
                    <Navigation className="h-4 w-4" />
                    <span>Menu</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="submissions" 
                    className="flex items-center space-x-1 md:space-x-2 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700 px-2 md:px-4 py-2 text-xs md:text-sm whitespace-nowrap flex-shrink-0"
                  >
                    <MessageSquare className="h-4 w-4" />
                    <span>Forms</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="email" 
                    className="flex items-center space-x-1 md:space-x-2 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700 px-2 md:px-4 py-2 text-xs md:text-sm whitespace-nowrap flex-shrink-0"
                  >
                    <Mail className="h-4 w-4" />
                    <span>Email</span>
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="site-settings">
                <SiteSettingsPanel />
              </TabsContent>
              <TabsContent value="pages">
                <PageContentPanel />
              </TabsContent>
              <TabsContent value="testimonials">
                <TestimonialsPanel />
              </TabsContent>
              <TabsContent value="navigation">
                <NavigationPanel />
              </TabsContent>
              <TabsContent value="submissions">
                <FormSubmissionsPanel />
              </TabsContent>
              <TabsContent value="email">
                <EmailSettingsPanel />
              </TabsContent>
            </Tabs>
          </TabsContent>

          {/* Design Management */}
          <TabsContent value="design" className="space-y-6">
            <Tabs value={designTab} onValueChange={setDesignTab} className="space-y-6">
              <div className="bg-white rounded-lg border border-gray-200 p-1 overflow-x-auto">
                <TabsList className="flex w-max min-w-full gap-1 bg-transparent">
                  <TabsTrigger 
                    value="website-template" 
                    className="flex items-center space-x-1 md:space-x-2 data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700 px-2 md:px-4 py-2 text-xs md:text-sm whitespace-nowrap flex-shrink-0"
                  >
                    <Layout className="h-4 w-4" />
                    <span>Structure</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="design-template" 
                    className="flex items-center space-x-1 md:space-x-2 data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700 px-2 md:px-4 py-2 text-xs md:text-sm whitespace-nowrap flex-shrink-0"
                  >
                    <Palette className="h-4 w-4" />
                    <span>Styles</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="color-theme" 
                    className="flex items-center space-x-1 md:space-x-2 data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700 px-2 md:px-4 py-2 text-xs md:text-sm whitespace-nowrap flex-shrink-0"
                  >
                    <Palette className="h-4 w-4" />
                    <span>Colors</span>
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="website-template">
                <WebsiteTemplatePanel />
              </TabsContent>
              <TabsContent value="design-template">
                <DesignTemplatePanel />
              </TabsContent>
              <TabsContent value="color-theme">
                <ColorThemePanel />
              </TabsContent>
            </Tabs>
          </TabsContent>

          {/* Tools & Document Editor */}
          <TabsContent value="tools" className="space-y-6">
            <DocumentEditor />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}