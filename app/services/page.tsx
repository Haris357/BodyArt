'use client';

import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Star, ArrowRight } from 'lucide-react';
import { usePageContent } from '@/hooks/useFirestore';
import { Skeleton } from '@/components/ui/skeleton';
import DynamicSection from '@/components/sections/DynamicSection';

export default function Services() {
  const { content, sections, loading, error } = usePageContent('services');

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-16">
          {/* Hero Skeleton */}
          <div className="py-16 bg-gray-100">
            <div className="max-w-7xl mx-auto px-4 text-center">
              <Skeleton className="h-12 w-1/2 mx-auto mb-6" />
              <Skeleton className="h-6 w-2/3 mx-auto" />
            </div>
          </div>
          
          {/* Packages Skeleton */}
          <div className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4">
              <Skeleton className="h-8 w-1/3 mx-auto mb-12" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="space-y-4">
                    <Skeleton className="h-64 w-full rounded-lg" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-16">
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center max-w-md mx-auto p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Content</h2>
              <p className="text-gray-600 mb-6">
                There was an error loading the services page content.
              </p>
              <a 
                href="/admin" 
                className="btn-theme-primary px-6 py-3 rounded-lg transition-colors"
              >
                Go to Admin Panel
              </a>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!content) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-16">
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center max-w-md mx-auto p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">No Content Available</h2>
              <p className="text-gray-600 mb-6">
                Please initialize the default data from the admin panel to see the services page content.
              </p>
              <a 
                href="/admin" 
                className="btn-theme-primary px-6 py-3 rounded-lg transition-colors"
              >
                Go to Admin Panel
              </a>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-16">
        {/* Hero Section */}
        {content?.hero && (
          <section 
            className="py-16 text-white relative"
            style={{
              backgroundImage: content.hero.backgroundImage 
                ? `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${content.hero.backgroundImage})`
                : 'var(--theme-gradient)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                {content.hero.title}
              </h1>
              <p className="text-xl md:text-2xl max-w-3xl mx-auto">
                {content.hero.subtitle}
              </p>
            </div>
          </section>
        )}

        {/* Pricing Packages */}
        {content?.packages && content.packages.packages && content.packages.packages.length > 0 && (
          <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  {content.packages.title}
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  {content.packages.subtitle}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {content.packages.packages.map((pkg: any, index: number) => (
                  <Card key={index} className={`relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${
                    pkg.featured ? 'ring-2 ring-orange-500 scale-105' : 'hover:shadow-lg'
                  }`}>
                    {pkg.featured && (
                      <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-orange-500 to-red-600 text-white text-center py-2 text-sm font-semibold">
                        {pkg.badge || 'Most Popular'}
                      </div>
                    )}
                    
                    <CardHeader className={`text-center ${pkg.featured ? 'pt-12' : 'pt-6'}`}>
                      <div className="w-16 h-16 theme-bg-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl text-white">{pkg.icon}</span>
                      </div>
                      <CardTitle className="text-2xl font-bold text-gray-900">{pkg.name}</CardTitle>
                      <div className="text-4xl font-bold theme-text-primary mt-4">
                        ${pkg.price}
                        <span className="text-lg text-gray-500 font-normal">/{pkg.period}</span>
                      </div>
                      <p className="text-gray-600 mt-2">{pkg.description}</p>
                    </CardHeader>
                    
                    <CardContent className="px-6 pb-6">
                      <ul className="space-y-3 mb-8">
                        {pkg.features.map((feature: string, idx: number) => (
                          <li key={idx} className="flex items-center text-gray-700">
                            <Check className="h-5 w-5 theme-text-primary mr-3 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <Button 
                        className={`w-full ${pkg.featured ? 'btn-theme-primary' : 'btn-theme-outline'}`}
                        asChild
                      >
                        <a href="/join">
                          {pkg.buttonText || 'Get Started'}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Dynamic Sections */}
        {sections && sections.length > 0 && sections.map((section: any) => (
          <DynamicSection key={section.id} section={section} />
        ))}
      </main>

      <Footer />
    </div>
  );
}