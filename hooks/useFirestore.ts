'use client';

import { useState, useEffect } from 'react';
import { 
  getSiteSettings, 
  getPageContent, 
  getPageSections, 
  getTestimonials,
  getNavigation 
} from '@/lib/firestore';
import { toast } from 'sonner';

export const useSiteSettings = () => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await getSiteSettings();
        setSettings(data);
      } catch (error) {
        console.error('Error fetching site settings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  return { settings, loading, refetch: () => window.location.reload() };
};

export const usePageContent = (pageId: string) => {
  const [content, setContent] = useState(null);
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const [pageData, sectionsData] = await Promise.all([
          getPageContent(pageId),
          getPageSections(pageId)
        ]);
        setContent(pageData);
        setSections(sectionsData);
        setError(null);
      } catch (error) {
        console.error('Error fetching page content:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [pageId]);

  return { content, sections, loading, error, refetch: () => window.location.reload() };
};

export const useTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const data = await getTestimonials();
        setTestimonials(data);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  return { testimonials, loading };
};

export const useNavigation = () => {
  const [navigation, setNavigation] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNavigation = async () => {
      try {
        const data = await getNavigation();
        setNavigation(data);
      } catch (error) {
        console.error('Error fetching navigation:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNavigation();
  }, []);

  return { navigation, loading };
};