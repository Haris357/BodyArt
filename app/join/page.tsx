'use client';

import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Users, Award, Clock, Star, Heart } from 'lucide-react';
import { useSiteSettings, usePageContent } from '@/hooks/useFirestore';
import { addFormSubmission, getEmailSettings } from '@/lib/firestore';
import { sendFormNotificationEmails } from '@/lib/emailService';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';

export default function Join() {
  const { settings } = useSiteSettings();
  const { content, loading } = usePageContent('join');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    goal: '',
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.goal) {
      toast.error('Please fill in all required fields.');
      return;
    }
    
    setIsSubmitting(true);
    toast.loading('Submitting your application...', { id: 'membership-form' });
    
    try {
      const submissionData = {
        ...formData,
        type: 'membership',
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
      
      setFormData({ name: '', email: '', phone: '', goal: '', notes: '' });
      toast.success('Application submitted successfully! We\'ll contact you soon.', { id: 'membership-form' });
    } catch (error) {
      console.error('Membership form error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      toast.error(`Error submitting application: ${errorMessage}`, { id: 'membership-form' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'CheckCircle': return <CheckCircle className="h-8 w-8" />;
      case 'Users': return <Users className="h-8 w-8" />;
      case 'Award': return <Award className="h-8 w-8" />;
      case 'Clock': return <Clock className="h-8 w-8" />;
      case 'Star': return <Star className="h-8 w-8" />;
      case 'Heart': return <Heart className="h-8 w-8" />;
      default: return <CheckCircle className="h-8 w-8" />;
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
              <Skeleton className="h-12 w-1/2 mx-auto mb-6" />
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
                    {[1, 2, 3, 4, 5, 6].map((i) => (
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

  if (!content) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-16">
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center max-w-md mx-auto p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">No Content Available</h2>
              <p className="text-gray-600 mb-6">
                Please initialize the default data from the admin panel to see the join page content.
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

  // Fallback dropdown options if none configured
  const dropdownOptions = content?.form?.dropdownOptions || [
    { label: 'General Inquiry', value: 'general' },
    { label: 'Membership Information', value: 'membership' },
    { label: 'Personal Training', value: 'personal-training' }
  ];

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
              {content?.hero?.title || 'Join Us'}
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
              {content?.hero?.subtitle || 'Take the first step towards your goals!'}
            </p>
          </div>
        </section>

        {/* Membership Form & Benefits */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Benefits */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-8">
                    {content?.benefits?.title || 'Membership Benefits'}
                  </h2>
                  
                  <div className="space-y-6">
                    {content?.benefits?.benefits?.map((benefit: any, index: number) => (
                      <div key={index} className="flex items-start space-x-4">
                        <div className="p-3 theme-bg-primary-light rounded-lg">
                          <span className="text-2xl">{benefit.icon}</span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{benefit.title}</h3>
                          <p className="text-gray-600">{benefit.description}</p>
                        </div>
                      </div>
                    )) || (
                      // Fallback benefits if none configured
                      <div className="space-y-6">
                        <div className="flex items-start space-x-4">
                          <div className="p-3 theme-bg-primary-light rounded-lg">
                            <CheckCircle className="h-6 w-6 theme-text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">Professional Service</h3>
                            <p className="text-gray-600">Expert guidance and support</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Membership Form */}
              <Card className="card-theme-border">
                <CardHeader>
                  <CardTitle>{content?.form?.title || 'Application Form'}</CardTitle>
                  <p className="text-gray-600">
                    {content?.form?.subtitle || 'Fill out this form and we\'ll contact you soon.'}
                  </p>
                </CardHeader>
                <CardContent>
                  {content?.form?.description && (
                    <p className="text-gray-600 mb-6">
                      {content.form.description}
                    </p>
                  )}
                  
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
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {content?.form?.dropdownLabel || 'Select Option'}
                      </label>
                      <Select value={formData.goal} onValueChange={(value) => setFormData({ ...formData, goal: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder={content?.form?.dropdownPlaceholder || 'Select an option'} />
                        </SelectTrigger>
                        <SelectContent>
                          {dropdownOptions.map((option: any, index: number) => (
                            <SelectItem key={index} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Textarea
                        placeholder="Additional Notes (Optional)"
                        rows={4}
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      />
                    </div>
                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full btn-theme-primary"
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Application'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}