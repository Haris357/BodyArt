'use client';

import { Card, CardContent } from '@/components/ui/card';

interface FeaturesGridProps {
  data?: {
    title?: string;
    subtitle?: string;
    features?: Array<{
      icon: string;
      title: string;
      description: string;
      image?: string;
    }>;
  };
}

export default function FeaturesGrid({ data }: FeaturesGridProps) {
  if (!data || !data.features || data.features.length === 0) {
    return null;
  }

  const content = data;

  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {content.title}
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {content.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.features.map((feature, index) => (
            <Card key={index} className="feature-card group overflow-hidden">
              <div className="relative">
                {feature.image && (
                  <img 
                    src={feature.image} 
                    alt={feature.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
                <div className="absolute top-4 left-4">
                  <div className="w-12 h-12 theme-bg-gradient rounded-full flex items-center justify-center">
                    <span className="text-2xl">{feature.icon}</span>
                  </div>
                </div>
              </div>
              
              <CardContent className="feature-card-content p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:theme-text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}