'use client';

import { Button } from '@/components/ui/button';
import { Play, Award, Users, Clock } from 'lucide-react';

interface IntroSectionProps {
  data?: {
    title?: string;
    description?: string;
    image?: string;
    videoUrl?: string;
    highlights?: Array<{
      icon: string;
      title: string;
      description: string;
    }>;
  };
}

export default function IntroSection({ data }: IntroSectionProps) {
  if (!data) {
    return null;
  }

  const content = data;

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Award': return <Award className="h-8 w-8" />;
      case 'Users': return <Users className="h-8 w-8" />;
      case 'Clock': return <Clock className="h-8 w-8" />;
      default: return <Award className="h-8 w-8" />;
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">
              {content.title}
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              {content.description}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg"
                className="btn-theme-primary px-8 py-3 rounded-full"
                asChild
              >
                <a href="/join">Start Your Journey</a>
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="btn-theme-outline px-8 py-3 rounded-full"
              >
                <Play className="mr-2 h-5 w-5" />
                Watch Our Story
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <img 
                src={content.image} 
                alt="Body Art Fitness facility"
                className="intro-image w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-r from-orange-500 to-red-600 rounded-full opacity-20" />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-r from-orange-500 to-red-600 rounded-full opacity-10" />
          </div>
        </div>

        {/* Highlights */}
        {content.highlights && content.highlights.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {content.highlights.map((highlight, index) => (
              <div key={index} className="intro-highlight text-center group">
                <div className="w-20 h-20 theme-bg-gradient rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <div className="text-white">
                    {getIcon(highlight.icon)}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{highlight.title}</h3>
                <p className="text-gray-600 leading-relaxed">{highlight.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}