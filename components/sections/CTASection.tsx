'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, Phone } from 'lucide-react';
import { toast } from 'sonner';

interface CTASectionProps {
  data?: {
    title?: string;
    subtitle?: string;
    description?: string;
    backgroundImage?: string;
    primaryButtonText?: string;
    primaryButtonLink?: string;
    secondaryButtonText?: string;
    phone?: string;
  };
}

export default function CTASection({ data }: CTASectionProps) {
  if (!data) {
    return null;
  }

  const content = data;

  return (
    <section 
      className="py-20 relative overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${content.backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <h2 className="text-4xl md:text-6xl font-bold mb-4">
          <span className="theme-text-primary">
            {content.title}
          </span>
        </h2>
        
        <h3 className="text-2xl md:text-3xl font-semibold mb-6 text-gray-200">
          {content.subtitle}
        </h3>
        
        <p className="text-xl mb-10 text-gray-300 leading-relaxed max-w-2xl mx-auto">
          {content.description}
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Button 
            size="lg" 
            className="btn-theme-primary text-white px-10 py-4 text-lg font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
            asChild
          >
            <a href={content.primaryButtonLink}>
              {content.primaryButtonText}
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
          
          <Button 
            variant="outline" 
            size="lg"
            className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-10 py-4 text-lg font-semibold rounded-full transition-all duration-300 shadow-lg"
            asChild
          >
            <a href={`tel:${content.phone}`}>
              <Phone className="mr-2 h-5 w-5" />
              {content.secondaryButtonText}
            </a>
          </Button>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-20 h-20 theme-bg-gradient rounded-full opacity-20 animate-pulse" />
        <div className="absolute bottom-10 right-10 w-32 h-32 theme-bg-gradient rounded-full opacity-10 animate-pulse" />
        <div className="absolute top-1/2 left-5 w-16 h-16 theme-bg-gradient rounded-full opacity-15 animate-bounce" />
      </div>
    </section>
  );
}