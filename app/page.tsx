'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import HeroSection from '@/components/sections/HeroSection';
import IntroSection from '@/components/sections/IntroSection';
import ServicesSection from '@/components/sections/ServicesSection';
import FeaturesGrid from '@/components/sections/FeaturesGrid';
import StatsSection from '@/components/sections/StatsSection';
import GallerySection from '@/components/sections/GallerySection';
import DynamicSection from '@/components/sections/DynamicSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import CTASection from '@/components/sections/CTASection';
import { ArrowRight, Play } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { usePageContent } from '@/hooks/useFirestore';
import { useTheme } from '@/components/ThemeProvider';

export default function Home() {
  const { content, sections, loading, error } = usePageContent('home');
  const { currentWebsite } = useTheme();

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-16">
          {/* Hero Skeleton */}
          <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="max-w-4xl mx-auto px-4 text-center">
              <Skeleton className="h-16 w-3/4 mx-auto mb-6" />
              <Skeleton className="h-8 w-1/2 mx-auto mb-8" />
              <div className="flex justify-center gap-4">
                <Skeleton className="h-12 w-32" />
                <Skeleton className="h-12 w-32" />
              </div>
            </div>
          </div>
          
          {/* Content Skeletons */}
          <div className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4">
              <Skeleton className="h-12 w-1/3 mx-auto mb-8" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="space-y-4">
                    <Skeleton className="h-48 w-full" />
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full" />
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
                There was an error loading the page content. Please check your Firebase configuration.
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
                Please initialize the default data from the admin panel to see the website content.
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

  // Render based on website template structure
  const renderStandardLayout = () => (
    <>
      {content?.hero && <HeroSection data={content.hero} />}
      {content?.intro && <IntroSection data={content.intro} />}
      {content?.services && <ServicesSection data={content.services} />}
      {content?.features && <FeaturesGrid data={content.features} />}
      {content?.stats && <StatsSection data={content.stats} />}
      {sections && sections.length > 0 && sections.map((section: any) => (
        <DynamicSection key={section.id} section={section} />
      ))}
      <TestimonialsSection />
      {content?.gallery && <GallerySection data={content.gallery} />}
      {content?.cta && <CTASection data={content.cta} />}
    </>
  );

  const renderSplitHeroLayout = () => (
    <>
      <div className="hero-split-container grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        <div className="hero-content-side flex items-center justify-center p-8 lg:p-16">
          <div className="max-w-lg">
            <h1 className="hero-title text-4xl lg:text-6xl font-bold mb-6 leading-tight">
              <span className="hero-title-primary">{content?.hero?.title}</span>
              <br />
              <span className="text-gray-900">{content?.hero?.subtitle}</span>
            </h1>
            <p className="hero-description text-lg text-gray-600 mb-8 leading-relaxed">
              {content?.hero?.description}
            </p>
            <div className="hero-buttons space-y-4">
              <Button className="btn-primary w-full" asChild>
                <a href={content?.hero?.primaryButtonLink}>
                  {content?.hero?.primaryButtonText}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <Button variant="outline" className="btn-secondary w-full" asChild>
                <a href={content?.hero?.secondaryButtonLink}>
                  {content?.hero?.secondaryButtonText}
                </a>
              </Button>
            </div>
          </div>
        </div>
        <div 
          className="hero-image-side"
          style={{
            backgroundImage: `url(${content?.hero?.backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
      </div>
      
      {/* Rest of content in masonry grid */}
      <div className="masonry-container p-8">
        <div className="masonry-grid">
          {content?.intro && (
            <div className="masonry-item">
              <IntroSection data={content.intro} />
            </div>
          )}
          {content?.services && (
            <div className="masonry-item">
              <ServicesSection data={content.services} />
            </div>
          )}
          {content?.features && (
            <div className="masonry-item">
              <FeaturesGrid data={content.features} />
            </div>
          )}
          <div className="masonry-item">
            <TestimonialsSection />
          </div>
          {content?.stats && (
            <div className="masonry-item">
              <StatsSection data={content.stats} />
            </div>
          )}
          {sections && sections.length > 0 && sections.map((section: any) => (
            <div key={section.id} className="masonry-item">
              <DynamicSection section={section} />
            </div>
          ))}
          {content?.cta && (
            <div className="masonry-item">
              <CTASection data={content.cta} />
            </div>
          )}
        </div>
      </div>
    </>
  );

  const renderFullscreenLayout = () => (
    <>
      {/* Sidebar Navigation for Dynamic Interactive */}
      {currentWebsite.structure.navigation === 'side' && (
        <nav className="sidebar-nav">
          <a href="#hero" className="nav-dot"></a>
          <a href="#services" className="nav-dot"></a>
          <a href="#features" className="nav-dot"></a>
          <a href="#testimonials" className="nav-dot"></a>
          <a href="#cta" className="nav-dot"></a>
        </nav>
      )}
      
      <div className={currentWebsite.structure.navigation === 'side' ? 'main-content' : ''}>
        {content?.hero && (
          <section id="hero" className="fullscreen-section">
            <HeroSection data={content.hero} />
          </section>
        )}
        
        <div className="tabbed-content-container">
          {content?.services && (
            <section id="services" className="fullscreen-section">
              <div className="tabbed-content">
                <ServicesSection data={content.services} />
              </div>
            </section>
          )}
          
          {content?.features && (
            <section id="features" className="fullscreen-section">
              <div className="tabbed-content">
                <FeaturesGrid data={content.features} />
              </div>
            </section>
          )}
          
          <section id="testimonials" className="fullscreen-section">
            <div className="tabbed-content">
              <TestimonialsSection />
            </div>
          </section>
          
          {content?.stats && (
            <section id="stats" className="fullscreen-section">
              <StatsSection data={content.stats} />
            </section>
          )}
          
          {sections && sections.length > 0 && sections.map((section: any) => (
            <section key={section.id} className="fullscreen-section">
              <div className="tabbed-content">
                <DynamicSection section={section} />
              </div>
            </section>
          ))}
          
          {content?.cta && (
            <section id="cta" className="fullscreen-section">
              <CTASection data={content.cta} />
            </section>
          )}
        </div>
      </div>
    </>
  );

  const renderMagazineLayout = () => (
    <>
      {/* Overlay Navigation for Magazine */}
      {currentWebsite.structure.navigation === 'overlay' && (
        <nav className="overlay-nav">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-white">
              <a href="/" className="text-2xl font-bold hover:text-orange-400 transition-colors">Home</a>
              <a href="/about" className="text-2xl font-bold hover:text-orange-400 transition-colors">About</a>
              <a href="/services" className="text-2xl font-bold hover:text-orange-400 transition-colors">Services</a>
              <a href="/why" className="text-2xl font-bold hover:text-orange-400 transition-colors">Why Us</a>
              <a href="/contact" className="text-2xl font-bold hover:text-orange-400 transition-colors">Contact</a>
              <a href="/join" className="text-2xl font-bold hover:text-orange-400 transition-colors">Join</a>
            </div>
          </div>
        </nav>
      )}
      
      {content?.hero && <HeroSection data={content.hero} />}
      
      <div className="magazine-content">
        <div className="masonry-grid">
          {content?.intro && (
            <div className="masonry-item">
              <IntroSection data={content.intro} />
            </div>
          )}
          {content?.services && (
            <div className="masonry-item">
              <ServicesSection data={content.services} />
            </div>
          )}
          {content?.features && (
            <div className="masonry-item">
              <FeaturesGrid data={content.features} />
            </div>
          )}
          <div className="masonry-item">
            <TestimonialsSection />
          </div>
          {content?.stats && (
            <div className="masonry-item">
              <StatsSection data={content.stats} />
            </div>
          )}
          {sections && sections.length > 0 && sections.map((section: any) => (
            <div key={section.id} className="masonry-item">
              <DynamicSection section={section} />
            </div>
          ))}
          {content?.cta && (
            <div className="masonry-item">
              <CTASection data={content.cta} />
            </div>
          )}
        </div>
      </div>
    </>
  );

  const renderMinimalLayout = () => (
    <>
      {content?.hero && (
        <section className="minimal-hero bg-white text-gray-900 min-h-screen flex items-center">
          <div className="max-w-4xl mx-auto px-4">
            <h1 className="hero-title text-6xl md:text-8xl font-light mb-8 leading-none">
              <span className="hero-title-primary">{content.hero.title}</span>
              <br />
              <span className="text-gray-600">{content.hero.subtitle}</span>
            </h1>
            <p className="hero-description text-xl text-gray-600 mb-12 max-w-2xl">
              {content.hero.description}
            </p>
            <div className="hero-buttons space-y-4">
              <Button className="btn-primary" asChild>
                <a href={content.hero.primaryButtonLink}>
                  {content.hero.primaryButtonText}
                </a>
              </Button>
            </div>
          </div>
        </section>
      )}
      
      <div className="minimal-content">
        {content?.intro && <IntroSection data={content.intro} />}
        {content?.services && <ServicesSection data={content.services} />}
        {content?.features && <FeaturesGrid data={content.features} />}
        <TestimonialsSection />
        {content?.stats && <StatsSection data={content.stats} />}
        {sections && sections.length > 0 && sections.map((section: any) => (
          <DynamicSection key={section.id} section={section} />
        ))}
        {content?.cta && <CTASection data={content.cta} />}
      </div>
    </>
  );

  // Choose layout based on website template
  const renderLayout = () => {
    switch (currentWebsite.pages.home.layout) {
      case 'split-hero-grid':
        return renderSplitHeroLayout();
      case 'fullscreen-sections':
        return renderFullscreenLayout();
      case 'magazine-style':
        return renderMagazineLayout();
      case 'hero-intro-stats-testimonials':
        return renderMinimalLayout();
      default:
        return renderStandardLayout();
    }
  };

  return (
    <div className={`min-h-screen website-template-${currentWebsite.id}`}>
      <Header />
      <main className={currentWebsite.structure.navigation === 'side' ? '' : 'pt-16'}>
        {renderLayout()}
      </main>
      <Footer />
    </div>
  );
}