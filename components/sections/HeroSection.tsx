'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, Play } from 'lucide-react';

interface HeroSectionProps {
  data?: {
    title?: string;
    subtitle?: string;
    description?: string;
    backgroundImage?: string;
    primaryButtonText?: string;
    primaryButtonLink?: string;
    secondaryButtonText?: string;
    secondaryButtonLink?: string;
  };
}

export default function HeroSection({ data }: HeroSectionProps) {
  if (!data) {
    return null;
  }

  const content = data;

  return (
    <section 
      className="hero-section relative min-h-screen flex items-center justify-center overflow-hidden text-white"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${content.backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="hero-title text-5xl md:text-7xl font-bold mb-6 leading-tight animate-fade-up">
            <span className="hero-title-primary">
              {content.title}
            </span>
            <br />
            <span className="text-white">{content.subtitle}</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-gray-200 leading-relaxed max-w-3xl mx-auto animate-slide-in">
            {content.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-scale-in">
            <Button 
              size="lg" 
              className="btn-primary px-8 py-4 text-lg font-semibold transition-all duration-300"
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
              className="btn-secondary px-8 py-4 text-lg font-semibold transition-all duration-300"
              asChild
            >
              <a href={content.secondaryButtonLink}>
                <Play className="mr-2 h-5 w-5" />
                {content.secondaryButtonText}
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll indicator - only show on standard layouts */}
      <div className="scroll-indicator absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}