'use client';

import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Phone, Mail, Clock, Instagram } from 'lucide-react';
import { useSiteSettings, usePageContent } from '@/hooks/useFirestore';
import { addFormSubmission, getEmailSettings } from '@/lib/firestore';
import { sendFormNotificationEmails } from '@/lib/emailService';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';

export default function Contact() {
  const { settings } = useSiteSettings();
  const { content, loading } = usePageContent('contact');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all required fields.');
      return;
    }
    
    setIsSubmitting(true);
    toast.loading('Sending your message...', { id: 'contact-form' });
    
    try {
      const submissionData = {
        ...formData,
        type: 'contact',
        createdAt: new Date()
      };
      
      await addFormSubmission(submissionData);
      
      // Send email notifications
      try {
        const emailSettings = await getEmailSettings();
        if (emailSettings) {
          await sendFormNotificationEmails(submissionData, emailSettings, settings?.siteName || 'Our Business');
          console.log('📧 Email notifications sent');
        }
      } catch (emailError) {
        console.warn('Email notification failed:', emailError);
        // Don't fail the form submission if email fails
      }
      
      setFormData({ name: '', email: '', phone: '', message: '' });
      toast.success('Message sent successfully! We\'ll get back to you soon.', { id: 'contact-form' });
    } catch (error) {
      console.error('Contact form error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      toast.error(`Error sending message: ${errorMessage}`, { id: 'contact-form' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-16">
          {/* Hero Skeleton */}
          <div className="py-16 bg-gray-100">
            <div className="max-w-7xl mx-auto px-4 text-center">
              <Skeleton className="h-12 w-1/3 mx-auto mb-6" />
              <Skeleton className="h-6 w-2/3 mx-auto" />
            </div>
          </div>
          
          {/* Content Skeleton */}
          <div className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <Skeleton className="h-8 w-1/2" />
                  <Skeleton className="h-4 w-full" />
                  <div className="space-y-4">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="flex space-x-4">
                        <Skeleton className="h-12 w-12 rounded-lg" />
                        <div className="space-y-2 flex-1">
                          <Skeleton className="h-4 w-1/3" />
                          <Skeleton className="h-3 w-2/3" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  <Skeleton className="h-8 w-1/3" />
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-24 w-full" />
                  <Skeleton className="h-12 w-full" />
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!content && !settings) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-16">
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center max-w-md mx-auto p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">No Content Available</h2>
              <p className="text-gray-600 mb-6">
                Please initialize the default data from the admin panel to see the contact page content.
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
        <section 
          className="py-16 text-white relative"
          style={{
            backgroundImage: content?.hero?.backgroundImage 
              ? `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${content.hero.backgroundImage})`
              : 'var(--theme-gradient)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {content?.hero?.title || 'Contact Us'}
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
              {content?.hero?.subtitle || 'Ready to start your fitness journey? Get in touch with us today!'}
            </p>
          </div>
        </section>

        {/* Contact Information & Form */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-8">
                    {content?.content?.title || 'Get In Touch'}
                  </h2>
                  {content?.content?.description && (
                    <p className="text-lg text-gray-600 mb-8">
                      {content.content.description}
                    </p>
                  )}
                  
                  <div className="space-y-6">
                    {settings?.address && (
                      <div className="flex items-start space-x-4">
                        <div className="p-3 theme-bg-primary-light rounded-lg">
                          <MapPin className="h-6 w-6 theme-text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">Address</h3>
                          <p className="text-gray-600">{settings.address}</p>
                        </div>
                      </div>
                    )}

                    {settings?.phone && (
                      <div className="flex items-start space-x-4">
                        <div className="p-3 theme-bg-primary-light rounded-lg">
                          <Phone className="h-6 w-6 theme-text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">Phone</h3>
                          <p className="text-gray-600">{settings.phone}</p>
                        </div>
                      </div>
                    )}

                    {settings?.email && (
                      <div className="flex items-start space-x-4">
                        <div className="p-3 theme-bg-primary-light rounded-lg">
                          <Mail className="h-6 w-6 theme-text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">Email</h3>
                          <p className="text-gray-600">{settings.email}</p>
                        </div>
                      </div>
                    )}

                    {settings?.hours && (
                      <div className="flex items-start space-x-4">
                        <div className="p-3 theme-bg-primary-light rounded-lg">
                          <Clock className="h-6 w-6 theme-text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">Hours</h3>
                          <p className="text-gray-600 whitespace-pre-line">{settings.hours}</p>
                        </div>
                      </div>
                    )}

                    {settings?.instagram && (
                      <div className="flex items-start space-x-4">
                        <div className="p-3 theme-bg-primary-light rounded-lg">
                          <Instagram className="h-6 w-6 theme-text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">Follow Us</h3>
                          <a 
                            href={settings.instagram} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="theme-text-primary theme-text-primary-hover"
                          >
                            @bodyartfitness
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <Card className="border-gray-200">
                <CardHeader>
                  <CardTitle>Send us a Message</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <Input
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Input
                        type="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Input
                        type="tel"
                        placeholder="Your Phone Number"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                    <div>
                      <Textarea
                        placeholder="Your Message"
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required
                      />
                    </div>
                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full btn-theme-primary"
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Map Section */}
        {settings?.mapEmbed && (
          <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Find Us</h2>
              <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
                <iframe
                  src={settings.mapEmbed}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}