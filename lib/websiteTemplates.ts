export interface WebsiteTemplate {
  id: string;
  name: string;
  description: string;
  preview: string;
  category: 'business' | 'creative' | 'modern' | 'classic' | 'minimal';
  structure: {
    layout: 'standard' | 'sidebar' | 'split' | 'fullscreen' | 'magazine' | 'portfolio';
    navigation: 'top' | 'side' | 'floating' | 'bottom' | 'overlay';
    heroStyle: 'fullscreen' | 'split' | 'minimal' | 'carousel' | 'video' | 'parallax';
    contentFlow: 'linear' | 'grid' | 'masonry' | 'timeline' | 'tabs' | 'accordion';
    sectionLayout: 'stacked' | 'alternating' | 'centered' | 'wide' | 'boxed';
  };
  pages: {
    home: HomePageStructure;
    about: AboutPageStructure;
    services: ServicesPageStructure;
    contact: ContactPageStructure;
    join: JoinPageStructure;
  };
}

export interface HomePageStructure {
  layout: 'hero-services-features-cta' | 'hero-intro-stats-testimonials' | 'split-hero-grid' | 'fullscreen-sections' | 'magazine-style';
  heroPosition: 'top' | 'center' | 'split' | 'background';
  sectionsOrder: string[];
  gridStyle: 'cards' | 'tiles' | 'masonry' | 'timeline' | 'carousel';
}

export interface AboutPageStructure {
  layout: 'story-team-values' | 'timeline-journey' | 'split-content' | 'tabbed-sections' | 'accordion-style';
  contentStyle: 'narrative' | 'highlights' | 'timeline' | 'grid' | 'carousel';
}

export interface ServicesPageStructure {
  layout: 'grid-packages' | 'comparison-table' | 'carousel-services' | 'timeline-process' | 'tabbed-categories';
  displayStyle: 'cards' | 'table' | 'list' | 'tiles' | 'carousel';
}

export interface ContactPageStructure {
  layout: 'form-info-map' | 'split-form' | 'centered-form' | 'sidebar-form' | 'floating-form';
  formPosition: 'left' | 'right' | 'center' | 'overlay' | 'bottom';
}

export interface JoinPageStructure {
  layout: 'form-benefits' | 'wizard-steps' | 'split-screen' | 'floating-form' | 'tabbed-process';
  formStyle: 'single-page' | 'multi-step' | 'wizard' | 'modal' | 'sidebar';
}

export const websiteTemplates: WebsiteTemplate[] = [
  {
    id: 'modern-business',
    name: 'Modern Business',
    description: 'Clean, professional layout perfect for service businesses',
    preview: '🏢',
    category: 'business',
    structure: {
      layout: 'standard',
      navigation: 'top',
      heroStyle: 'fullscreen',
      contentFlow: 'linear',
      sectionLayout: 'stacked'
    },
    pages: {
      home: {
        layout: 'hero-services-features-cta',
        heroPosition: 'top',
        sectionsOrder: ['hero', 'intro', 'services', 'features', 'stats', 'testimonials', 'cta'],
        gridStyle: 'cards'
      },
      about: {
        layout: 'story-team-values',
        contentStyle: 'narrative'
      },
      services: {
        layout: 'grid-packages',
        displayStyle: 'cards'
      },
      contact: {
        layout: 'form-info-map',
        formPosition: 'right'
      },
      join: {
        layout: 'form-benefits',
        formStyle: 'single-page'
      }
    }
  },
  {
    id: 'creative-portfolio',
    name: 'Creative Portfolio',
    description: 'Artistic layout with unique sections and creative elements',
    preview: '🎨',
    category: 'creative',
    structure: {
      layout: 'magazine',
      navigation: 'floating',
      heroStyle: 'split',
      contentFlow: 'masonry',
      sectionLayout: 'alternating'
    },
    pages: {
      home: {
        layout: 'split-hero-grid',
        heroPosition: 'split',
        sectionsOrder: ['hero', 'features', 'services', 'testimonials', 'stats', 'cta'],
        gridStyle: 'masonry'
      },
      about: {
        layout: 'timeline-journey',
        contentStyle: 'timeline'
      },
      services: {
        layout: 'carousel-services',
        displayStyle: 'carousel'
      },
      contact: {
        layout: 'floating-form',
        formPosition: 'overlay'
      },
      join: {
        layout: 'wizard-steps',
        formStyle: 'wizard'
      }
    }
  },
  {
    id: 'minimal-zen',
    name: 'Minimal Zen',
    description: 'Ultra-clean, content-focused design with maximum whitespace',
    preview: '⚪',
    category: 'minimal',
    structure: {
      layout: 'standard',
      navigation: 'top',
      heroStyle: 'minimal',
      contentFlow: 'linear',
      sectionLayout: 'centered'
    },
    pages: {
      home: {
        layout: 'hero-intro-stats-testimonials',
        heroPosition: 'center',
        sectionsOrder: ['hero', 'intro', 'features', 'testimonials', 'cta'],
        gridStyle: 'tiles'
      },
      about: {
        layout: 'split-content',
        contentStyle: 'highlights'
      },
      services: {
        layout: 'comparison-table',
        displayStyle: 'table'
      },
      contact: {
        layout: 'centered-form',
        formPosition: 'center'
      },
      join: {
        layout: 'split-screen',
        formStyle: 'single-page'
      }
    }
  },
  {
    id: 'dynamic-interactive',
    name: 'Dynamic Interactive',
    description: 'Interactive elements with tabs, accordions, and dynamic content',
    preview: '⚡',
    category: 'modern',
    structure: {
      layout: 'fullscreen',
      navigation: 'side',
      heroStyle: 'video',
      contentFlow: 'tabs',
      sectionLayout: 'boxed'
    },
    pages: {
      home: {
        layout: 'fullscreen-sections',
        heroPosition: 'background',
        sectionsOrder: ['hero', 'services', 'features', 'stats', 'testimonials', 'cta'],
        gridStyle: 'timeline'
      },
      about: {
        layout: 'tabbed-sections',
        contentStyle: 'grid'
      },
      services: {
        layout: 'tabbed-categories',
        displayStyle: 'tiles'
      },
      contact: {
        layout: 'sidebar-form',
        formPosition: 'left'
      },
      join: {
        layout: 'tabbed-process',
        formStyle: 'multi-step'
      }
    }
  },
  {
    id: 'magazine-editorial',
    name: 'Magazine Editorial',
    description: 'Editorial-style layout with rich typography and visual hierarchy',
    preview: '📰',
    category: 'creative',
    structure: {
      layout: 'magazine',
      navigation: 'overlay',
      heroStyle: 'parallax',
      contentFlow: 'grid',
      sectionLayout: 'wide'
    },
    pages: {
      home: {
        layout: 'magazine-style',
        heroPosition: 'top',
        sectionsOrder: ['hero', 'features', 'services', 'stats', 'testimonials', 'cta'],
        gridStyle: 'masonry'
      },
      about: {
        layout: 'story-team-values',
        contentStyle: 'narrative'
      },
      services: {
        layout: 'timeline-process',
        displayStyle: 'list'
      },
      contact: {
        layout: 'split-form',
        formPosition: 'right'
      },
      join: {
        layout: 'floating-form',
        formStyle: 'modal'
      }
    }
  }
];

export const getWebsiteTemplateById = (id: string): WebsiteTemplate => {
  return websiteTemplates.find(template => template.id === id) || websiteTemplates[0];
};

export const applyWebsiteTemplate = (template: WebsiteTemplate) => {
  const root = document.documentElement;
  
  // Apply website template CSS variables
  root.style.setProperty('--website-layout', template.structure.layout);
  root.style.setProperty('--website-navigation', template.structure.navigation);
  root.style.setProperty('--website-hero-style', template.structure.heroStyle);
  root.style.setProperty('--website-content-flow', template.structure.contentFlow);
  root.style.setProperty('--website-section-layout', template.structure.sectionLayout);
  
  // Remove existing template classes
  document.body.className = document.body.className.replace(/website-template-[\w-]+/g, '');
  
  // Add new template class
  document.body.classList.add(`website-template-${template.id}`);
  
  console.log(`Applied website template: ${template.name}`);
};