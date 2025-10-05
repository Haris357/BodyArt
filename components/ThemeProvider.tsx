'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { ColorTheme, getThemeById, applyThemeToDocument, predefinedThemes } from '@/lib/colorThemes';
import { DesignTemplate, getDesignTemplateById, applyDesignTemplate, designTemplates } from '@/lib/designTemplates';
import { WebsiteTemplate, getWebsiteTemplateById, applyWebsiteTemplate, websiteTemplates } from '@/lib/websiteTemplates';
import { getSiteSettings } from '@/lib/firestore';

interface ThemeContextType {
  currentTheme: ColorTheme;
  currentDesign: DesignTemplate;
  currentWebsite: WebsiteTemplate;
  setTheme: (themeId: string) => void;
  setDesign: (designId: string) => void;
  setWebsite: (websiteId: string) => void;
  themes: ColorTheme[];
  designs: DesignTemplate[];
  websites: WebsiteTemplate[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<ColorTheme>(predefinedThemes[0]);
  const [currentDesign, setCurrentDesign] = useState<DesignTemplate>(designTemplates[0]);
  const [currentWebsite, setCurrentWebsite] = useState<WebsiteTemplate>(websiteTemplates[0]);

  useEffect(() => {
    // Load theme, design, and website template from site settings
    const loadSettings = async () => {
      try {
        const settings = await getSiteSettings();
        
        // Load color theme
        if (settings?.colorTheme) {
          const theme = getThemeById(settings.colorTheme);
          setCurrentTheme(theme);
          applyThemeToDocument(theme);
        } else {
          applyThemeToDocument(currentTheme);
        }
        
        // Load design template
        if (settings?.designTemplate) {
          const design = getDesignTemplateById(settings.designTemplate);
          setCurrentDesign(design);
          applyDesignTemplate(design);
        } else {
          applyDesignTemplate(currentDesign);
        }

        // Load website template
        if (settings?.websiteTemplate) {
          const website = getWebsiteTemplateById(settings.websiteTemplate);
          setCurrentWebsite(website);
          applyWebsiteTemplate(website);
        } else {
          applyWebsiteTemplate(currentWebsite);
        }
      } catch (error) {
        console.error('Error loading settings:', error);
        // Apply defaults on error
        applyThemeToDocument(currentTheme);
        applyDesignTemplate(currentDesign);
        applyWebsiteTemplate(currentWebsite);
      }
    };

    loadSettings();
  }, []);

  const setTheme = (themeId: string) => {
    const theme = getThemeById(themeId);
    setCurrentTheme(theme);
    applyThemeToDocument(theme);
  };
  
  const setDesign = (designId: string) => {
    const design = getDesignTemplateById(designId);
    setCurrentDesign(design);
    applyDesignTemplate(design);
  };

  const setWebsite = (websiteId: string) => {
    const website = getWebsiteTemplateById(websiteId);
    setCurrentWebsite(website);
    applyWebsiteTemplate(website);
  };

  return (
    <ThemeContext.Provider value={{ 
      currentTheme, 
      currentDesign, 
      currentWebsite,
      setTheme, 
      setDesign, 
      setWebsite,
      themes: predefinedThemes,
      designs: designTemplates,
      websites: websiteTemplates
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};