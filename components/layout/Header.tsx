'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Dumbbell, Sparkles, UtensilsCrossed, Heart, Star, Crown, Zap, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigation, useSiteSettings } from '@/hooks/useFirestore';
import { useTheme } from '@/components/ThemeProvider';
import { toast } from 'sonner';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { navigation } = useNavigation();
  const { settings, loading } = useSiteSettings();
  const { currentWebsite } = useTheme();

  const navItems = navigation;

  const handleNavClick = (href: string, label: string) => {
    setIsMenuOpen(false);
  };

  const getLogoIcon = (iconName: string) => {
    const iconMap = {
      Dumbbell: Dumbbell,
      Sparkles: Sparkles,
      UtensilsCrossed: UtensilsCrossed,
      Heart: Heart,
      Star: Star,
      Crown: Crown,
      Zap: Zap,
      Award: Award
    };
    const IconComponent = iconMap[iconName as keyof typeof iconMap] || Dumbbell;
    return <IconComponent className="h-6 w-6 text-white" />;
  };

  // Show loading state while settings are being fetched
  if (loading) {
    return (
      <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gray-200 rounded-lg animate-pulse" />
              <div className="w-32 h-6 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className={`sticky top-0 z-50 ${
      currentWebsite.structure.navigation === 'floating' ? 'header-floating' :
      currentWebsite.structure.navigation === 'overlay' ? 'header-overlay' :
      'bg-white/95 backdrop-blur-sm border-b border-gray-200'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className={`p-2 rounded-lg ${settings?.logoType === 'image' && settings?.logoImageUrl ? '' : 'theme-bg-gradient'}`}>
              {settings?.logoType === 'image' && settings?.logoImageUrl ? (
                <img 
                  src={settings.logoImageUrl} 
                  alt="Logo" 
                  className="h-6 w-6 object-contain"
                />
              ) : (
                getLogoIcon(settings?.logoIcon || 'Dumbbell')
              )}
            </div>
            <span className="text-xl font-bold text-gray-900">
              {settings?.siteName || 'Loading...'}
            </span>
          </Link>

          {/* Desktop Navigation */}
          {navItems.length > 0 && (
            <nav className="hidden md:flex space-x-8">
              {navItems.filter((item: any) => item.visible !== false).map((item: any) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-gray-700 theme-text-primary-hover font-medium transition-colors duration-200"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          )}

          {/* Mobile menu button */}
          {navItems.length > 0 && (
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && navItems.length > 0 && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              {navItems.filter((item: any) => item.visible !== false).map((item: any) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-gray-700 theme-text-primary-hover font-medium transition-colors duration-200"
                  onClick={() => handleNavClick(item.href, item.label)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}