'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface DynamicSectionProps {
  section: {
    id: string;
    type: 'text' | 'image-text' | 'features' | 'stats' | 'video' | 'testimonials';
    title?: string;
    content?: string;
    image?: string;
    imagePosition?: 'left' | 'right';
    features?: Array<{ icon?: string; title: string; description: string; }>;
    stats?: Array<{ number: string; label: string; }>;
    videoUrl?: string;
    backgroundColor?: string;
  };
}

export default function DynamicSection({ section }: DynamicSectionProps) {
  console.log('DynamicSection received:', section);
  
  const bgClass = section.backgroundColor || 'bg-white';

  // Helper function to get video layout classes
  const getVideoLayoutClass = (layout: string) => {
    switch (layout) {
      case 'single':
        return 'max-w-4xl mx-auto';
      case 'grid-2':
        return 'grid grid-cols-1 md:grid-cols-2 gap-8';
      case 'grid-3':
        return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6';
      case 'horizontal':
        return 'space-y-8';
      case 'vertical':
        return 'grid grid-cols-1 gap-6 max-w-2xl mx-auto';
      default:
        return 'max-w-4xl mx-auto';
    }
  };

  // Add missing addVideo function
  const addVideo = () => {
    // This function would be used in the editor context
    console.log('Add video function called');
  };

  const updateVideo = (index: number, field: string, value: string) => {
    // This function would be used in the editor context
    console.log('Update video function called', index, field, value);
  };

  const removeVideo = (index: number) => {
    // This function would be used in the editor context
    console.log('Remove video function called', index);
  };

  switch (section.type) {
    case 'text':
      return (
        <section className={`py-16 ${bgClass}`}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {section.title && (
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                {section.title}
              </h2>
            )}
            {section.content && (
              <div 
                className="text-lg text-gray-600 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: section.content }}
              />
            )}
          </div>
        </section>
      );

    case 'image-text':
      return (
        <section className={`py-16 ${bgClass}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
              section.imagePosition === 'right' ? 'lg:grid-cols-2' : 'lg:grid-cols-2'
            }`}>
              <div className={section.imagePosition === 'right' ? 'order-1' : 'order-2 lg:order-1'}>
                {section.title && (
                  <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                    {section.title}
                  </h2>
                )}
                {section.content && (
                  <div 
                    className="text-lg text-gray-600 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: section.content }}
                  />
                )}
              </div>
              <div className={section.imagePosition === 'right' ? 'order-2' : 'order-1 lg:order-2'}>
                {section.image && (
                  <img 
                    src={section.image} 
                    alt={section.title || ''} 
                    className="w-full h-96 object-cover rounded-lg shadow-lg"
                  />
                )}
              </div>
            </div>
          </div>
        </section>
      );

    case 'features':
      return (
        <section className={`py-16 ${bgClass}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {section.title && (
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
                {section.title}
              </h2>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {section.features?.map((feature, index) => (
                <Card key={index} className="feature-card hover:shadow-lg transition-shadow duration-300 border-gray-200 hover:border-gray-300 bg-white">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 theme-bg-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl text-white">{feature.icon || '💪'}</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-gray-900">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      );

    case 'stats':
      return (
        <section className={`py-16 ${bgClass}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {section.title && (
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
                {section.title}
              </h2>
            )}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {section.stats?.map((stat, index) => (
                <div key={index} className="stats-item p-6">
                  <div className="text-4xl md:text-5xl font-bold theme-text-primary mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case 'video':
      return (
        <section className={`py-16 ${bgClass}`}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {section.title && (
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
                {section.title}
              </h2>
            )}
            {section.videos && section.videos.length > 0 && (
              <div className={`${getVideoLayoutClass(section.videoLayout || 'single')}`}>
                {section.videos.map((video: any, index: number) => (
                  <div key={index} className="group">
                    <div className="aspect-video rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <iframe
                        src={video.url}
                        title={video.title || `Video ${index + 1}`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                      />
                    </div>
                    {video.title && (
                      <h3 className="text-lg font-semibold text-gray-900 mt-4 text-center group-hover:theme-text-primary transition-colors">
                        {video.title}
                      </h3>
                    )}
                    {video.description && (
                      <p className="text-gray-600 text-center mt-2">
                        {video.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      );

    case 'testimonials':
      return (
        <section className={`py-16 ${bgClass}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {section.title && (
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
                {section.title}
              </h2>
            )}
            <div className="text-center py-8">
              <p className="text-gray-600">Testimonials will be displayed here from the testimonials database.</p>
            </div>
          </div>
        </section>
      );

    default:
      return null;
  }
}