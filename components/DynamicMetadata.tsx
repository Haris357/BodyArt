'use client';

import { useEffect } from 'react';
import { useSiteSettings } from '@/hooks/useFirestore';

export default function DynamicMetadata() {
  const { settings, loading } = useSiteSettings();

  useEffect(() => {
    if (!loading && settings) {
      // Update document title
      const title = settings.siteTitle || 'Body Art Fitness - Transform Your Body, Transform Your Life';
      document.title = title;

      // Update meta description
      const description = settings.siteDescription || 'Join Body Art Fitness and experience world-class training with state-of-the-art equipment and expert trainers.';
      
      // Remove existing meta description if it exists
      const existingDescription = document.querySelector('meta[name="description"]');
      if (existingDescription) {
        existingDescription.remove();
      }

      // Add new meta description
      const metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      metaDescription.content = description;
      document.head.appendChild(metaDescription);

      // Update Open Graph title
      let ogTitle = document.querySelector('meta[property="og:title"]');
      if (!ogTitle) {
        ogTitle = document.createElement('meta');
        ogTitle.setAttribute('property', 'og:title');
        document.head.appendChild(ogTitle);
      }
      ogTitle.setAttribute('content', title);

      // Update Open Graph description
      let ogDescription = document.querySelector('meta[property="og:description"]');
      if (!ogDescription) {
        ogDescription = document.createElement('meta');
        ogDescription.setAttribute('property', 'og:description');
        document.head.appendChild(ogDescription);
      }
      ogDescription.setAttribute('content', description);

      // Update Twitter Card title
      let twitterTitle = document.querySelector('meta[name="twitter:title"]');
      if (!twitterTitle) {
        twitterTitle = document.createElement('meta');
        twitterTitle.setAttribute('name', 'twitter:title');
        document.head.appendChild(twitterTitle);
      }
      twitterTitle.setAttribute('content', title);

      // Update Twitter Card description
      let twitterDescription = document.querySelector('meta[name="twitter:description"]');
      if (!twitterDescription) {
        twitterDescription = document.createElement('meta');
        twitterDescription.setAttribute('name', 'twitter:description');
        document.head.appendChild(twitterDescription);
      }
      twitterDescription.setAttribute('content', description);
    }
  }, [settings, loading]);

  return null;
}