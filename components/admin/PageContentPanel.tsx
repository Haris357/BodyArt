'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import HomePageEditor from './editors/HomePageEditor';
import AboutPageEditor from './editors/AboutPageEditor';
import WhyPageEditor from './editors/WhyPageEditor';
import ContactPageEditor from './editors/ContactPageEditor';
import JoinPageEditor from './editors/JoinPageEditor';
import ServicesPageEditor from './editors/ServicesPageEditor';
import { useNavigation } from '@/hooks/useFirestore';

export default function PageContentPanel() {
  const { navigation, loading } = useNavigation();
  const [activeTab, setActiveTab] = useState('home');

  // Map navigation items to page editors
  const getPageEditor = (href: string) => {
    switch (href) {
      case '/':
        return { component: <HomePageEditor />, id: 'home', label: 'Home Page' };
      case '/about':
        return { component: <AboutPageEditor />, id: 'about', label: 'About Page' };
      case '/why':
        return { component: <WhyPageEditor />, id: 'why', label: getPageLabel(href, navigation) };
      case '/contact':
        return { component: <ContactPageEditor />, id: 'contact', label: 'Contact Page' };
      case '/join':
        return { component: <JoinPageEditor />, id: 'join', label: getPageLabel(href, navigation) };
      case '/services':
        return { component: <ServicesPageEditor />, id: 'services', label: 'Services Page' };
      default:
        return null;
    }
  };

  // Get dynamic page label based on navigation
  const getPageLabel = (href: string, navItems: any[]) => {
    const navItem = navItems.find((item: any) => item.href === href);
    if (navItem) {
      return `${navItem.label} Page`;
    }
    // Fallback labels
    if (href === '/why') return 'Services/Why Page';
    if (href === '/join') return 'Join/Booking Page';
    if (href === '/services') return 'Services/Packages Page';
    return 'Page';
  };

  // Get available page editors based on navigation
  const availablePages = navigation
    .map((nav: any) => getPageEditor(nav.href))
    .filter(Boolean);

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 theme-loader mx-auto mb-4"></div>
        <p className="text-gray-600">Loading navigation...</p>
      </div>
    );
  }

  if (availablePages.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600 mb-4">No pages available for editing.</p>
        <p className="text-sm text-gray-500">Initialize business data first to create pages.</p>
      </div>
    );
  }

  // Determine grid layout based on number of pages
  const getTabsLayout = (count: number) => {
    if (count <= 3) return 'grid-cols-3';
    if (count <= 4) return 'grid-cols-4';
    return 'grid-cols-5';
  };

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 p-1 overflow-x-auto">
        <TabsList className="flex w-max min-w-full gap-1 bg-transparent">
          {availablePages.map((page: any) => (
            <TabsTrigger 
              key={page.id} 
              value={page.id} 
              className="flex items-center space-x-1 md:space-x-2 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700 px-2 md:px-4 py-2 text-xs md:text-sm whitespace-nowrap flex-shrink-0"
            >
              {page.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      {availablePages.map((page: any) => (
        <TabsContent key={page.id} value={page.id}>
          {page.component}
        </TabsContent>
      ))}
    </Tabs>
  );
}