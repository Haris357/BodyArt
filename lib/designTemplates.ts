export interface DesignTemplate {
  id: string;
  name: string;
  description: string;
  preview: string;
  category: 'modern' | 'classic' | 'minimal' | 'bold' | 'creative' | 'professional';
  components: {
    hero: HeroDesign;
    sections: SectionDesign;
    cards: CardDesign;
    buttons: ButtonDesign;
    layout: LayoutDesign;
  };
}

export interface HeroDesign {
  style: 'gradient' | 'image-overlay' | 'split' | 'minimal' | 'animated' | 'geometric' | 'floating';
  textAlignment: 'center' | 'left' | 'right';
  backgroundStyle: 'gradient' | 'image' | 'pattern' | 'solid' | 'particles';
  titleStyle: 'gradient-text' | 'solid' | 'outlined' | 'shadow' | 'neon' | 'split-color';
  buttonLayout: 'horizontal' | 'vertical' | 'stacked' | 'floating';
  animation: 'fade-up' | 'slide-in' | 'scale' | 'bounce' | 'typewriter' | 'none';
}

export interface SectionDesign {
  spacing: 'compact' | 'normal' | 'spacious' | 'extra-spacious';
  containerStyle: 'full-width' | 'contained' | 'narrow' | 'ultra-wide';
  backgroundPattern: 'none' | 'dots' | 'grid' | 'waves' | 'geometric' | 'organic';
  sectionDividers: 'none' | 'line' | 'wave' | 'angle' | 'curve' | 'zigzag';
}

export interface CardDesign {
  style: 'elevated' | 'flat' | 'outlined' | 'glass' | 'neumorphism' | 'floating' | 'tilted';
  borderRadius: 'none' | 'small' | 'medium' | 'large' | 'full' | 'organic';
  shadow: 'none' | 'small' | 'medium' | 'large' | 'colored' | 'neon' | 'soft';
  hoverEffect: 'lift' | 'scale' | 'glow' | 'tilt' | 'rotate' | 'flip' | 'none';
}

export interface ButtonDesign {
  style: 'filled' | 'outlined' | 'ghost' | 'gradient' | 'neon' | 'glass' | 'neumorphism';
  size: 'small' | 'medium' | 'large' | 'extra-large';
  borderRadius: 'none' | 'small' | 'medium' | 'large' | 'full' | 'organic';
  animation: 'none' | 'pulse' | 'bounce' | 'shake' | 'glow' | 'ripple';
}

export interface LayoutDesign {
  headerStyle: 'transparent' | 'solid' | 'glass' | 'minimal' | 'floating' | 'sticky';
  footerStyle: 'dark' | 'light' | 'gradient' | 'minimal' | 'floating';
  navigationStyle: 'horizontal' | 'centered' | 'split' | 'sidebar' | 'floating';
  contentFlow: 'standard' | 'zigzag' | 'centered' | 'asymmetric' | 'masonry' | 'timeline';
}

export const designTemplates: DesignTemplate[] = [
  {
    id: 'modern-gradient',
    name: 'Modern Gradient',
    description: 'Contemporary design with smooth gradients and glass effects',
    preview: '🎨',
    category: 'modern',
    components: {
      hero: {
        style: 'gradient',
        textAlignment: 'center',
        backgroundStyle: 'gradient',
        titleStyle: 'gradient-text',
        buttonLayout: 'horizontal',
        animation: 'fade-up'
      },
      sections: {
        spacing: 'normal',
        containerStyle: 'contained',
        backgroundPattern: 'none',
        sectionDividers: 'wave'
      },
      cards: {
        style: 'glass',
        borderRadius: 'large',
        shadow: 'medium',
        hoverEffect: 'lift'
      },
      buttons: {
        style: 'gradient',
        size: 'medium',
        borderRadius: 'full',
        animation: 'none'
      },
      layout: {
        headerStyle: 'glass',
        footerStyle: 'gradient',
        navigationStyle: 'centered',
        contentFlow: 'standard'
      }
    }
  },
  {
    id: 'classic-elegant',
    name: 'Classic Elegant',
    description: 'Timeless design with sophisticated typography and refined aesthetics',
    preview: '🏛️',
    category: 'classic',
    components: {
      hero: {
        style: 'image-overlay',
        textAlignment: 'center',
        backgroundStyle: 'image',
        titleStyle: 'solid',
        buttonLayout: 'horizontal',
        animation: 'slide-in'
      },
      sections: {
        spacing: 'spacious',
        containerStyle: 'narrow',
        backgroundPattern: 'none',
        sectionDividers: 'line'
      },
      cards: {
        style: 'outlined',
        borderRadius: 'small',
        shadow: 'small',
        hoverEffect: 'scale'
      },
      buttons: {
        style: 'outlined',
        size: 'large',
        borderRadius: 'small',
        animation: 'none'
      },
      layout: {
        headerStyle: 'solid',
        footerStyle: 'dark',
        navigationStyle: 'horizontal',
        contentFlow: 'standard'
      }
    }
  },
  {
    id: 'minimal-clean',
    name: 'Minimal Clean',
    description: 'Ultra-clean design focusing on content and whitespace',
    preview: '⚪',
    category: 'minimal',
    components: {
      hero: {
        style: 'minimal',
        textAlignment: 'left',
        backgroundStyle: 'solid',
        titleStyle: 'solid',
        buttonLayout: 'vertical',
        animation: 'none'
      },
      sections: {
        spacing: 'spacious',
        containerStyle: 'narrow',
        backgroundPattern: 'none',
        sectionDividers: 'none'
      },
      cards: {
        style: 'flat',
        borderRadius: 'none',
        shadow: 'none',
        hoverEffect: 'none'
      },
      buttons: {
        style: 'filled',
        size: 'medium',
        borderRadius: 'none',
        animation: 'none'
      },
      layout: {
        headerStyle: 'minimal',
        footerStyle: 'minimal',
        navigationStyle: 'horizontal',
        contentFlow: 'centered'
      }
    }
  },
  {
    id: 'bold-dynamic',
    name: 'Bold & Dynamic',
    description: 'High-energy design with strong visuals and 3D effects',
    preview: '⚡',
    category: 'bold',
    components: {
      hero: {
        style: 'animated',
        textAlignment: 'center',
        backgroundStyle: 'particles',
        titleStyle: 'neon',
        buttonLayout: 'stacked',
        animation: 'bounce'
      },
      sections: {
        spacing: 'compact',
        containerStyle: 'full-width',
        backgroundPattern: 'geometric',
        sectionDividers: 'angle'
      },
      cards: {
        style: 'floating',
        borderRadius: 'large',
        shadow: 'colored',
        hoverEffect: 'tilt'
      },
      buttons: {
        style: 'neon',
        size: 'large',
        borderRadius: 'medium',
        animation: 'pulse'
      },
      layout: {
        headerStyle: 'floating',
        footerStyle: 'gradient',
        navigationStyle: 'floating',
        contentFlow: 'zigzag'
      }
    }
  },
  {
    id: 'creative-artistic',
    name: 'Creative Artistic',
    description: 'Unique artistic design with organic shapes and creative layouts',
    preview: '🎭',
    category: 'creative',
    components: {
      hero: {
        style: 'geometric',
        textAlignment: 'left',
        backgroundStyle: 'pattern',
        titleStyle: 'split-color',
        buttonLayout: 'floating',
        animation: 'typewriter'
      },
      sections: {
        spacing: 'normal',
        containerStyle: 'contained',
        backgroundPattern: 'organic',
        sectionDividers: 'curve'
      },
      cards: {
        style: 'tilted',
        borderRadius: 'organic',
        shadow: 'soft',
        hoverEffect: 'rotate'
      },
      buttons: {
        style: 'glass',
        size: 'medium',
        borderRadius: 'organic',
        animation: 'ripple'
      },
      layout: {
        headerStyle: 'transparent',
        footerStyle: 'floating',
        navigationStyle: 'sidebar',
        contentFlow: 'masonry'
      }
    }
  },
  {
    id: 'professional-corporate',
    name: 'Professional Corporate',
    description: 'Sophisticated business design with clean lines and professional aesthetics',
    preview: '💼',
    category: 'professional',
    components: {
      hero: {
        style: 'split',
        textAlignment: 'left',
        backgroundStyle: 'solid',
        titleStyle: 'solid',
        buttonLayout: 'horizontal',
        animation: 'slide-in'
      },
      sections: {
        spacing: 'normal',
        containerStyle: 'contained',
        backgroundPattern: 'grid',
        sectionDividers: 'line'
      },
      cards: {
        style: 'elevated',
        borderRadius: 'small',
        shadow: 'medium',
        hoverEffect: 'lift'
      },
      buttons: {
        style: 'filled',
        size: 'medium',
        borderRadius: 'small',
        animation: 'none'
      },
      layout: {
        headerStyle: 'solid',
        footerStyle: 'dark',
        navigationStyle: 'horizontal',
        contentFlow: 'standard'
      }
    }
  },
  {
    id: 'futuristic-neon',
    name: 'Futuristic Neon',
    description: 'Cutting-edge design with neon effects and cyberpunk aesthetics',
    preview: '🌟',
    category: 'bold',
    components: {
      hero: {
        style: 'floating',
        textAlignment: 'center',
        backgroundStyle: 'particles',
        titleStyle: 'neon',
        buttonLayout: 'floating',
        animation: 'scale'
      },
      sections: {
        spacing: 'compact',
        containerStyle: 'ultra-wide',
        backgroundPattern: 'geometric',
        sectionDividers: 'zigzag'
      },
      cards: {
        style: 'neon',
        borderRadius: 'medium',
        shadow: 'neon',
        hoverEffect: 'glow'
      },
      buttons: {
        style: 'neon',
        size: 'large',
        borderRadius: 'full',
        animation: 'glow'
      },
      layout: {
        headerStyle: 'floating',
        footerStyle: 'gradient',
        navigationStyle: 'floating',
        contentFlow: 'asymmetric'
      }
    }
  },
  {
    id: 'organic-nature',
    name: 'Organic Nature',
    description: 'Natural, flowing design inspired by organic shapes and earth tones',
    preview: '🌿',
    category: 'creative',
    components: {
      hero: {
        style: 'geometric',
        textAlignment: 'center',
        backgroundStyle: 'pattern',
        titleStyle: 'solid',
        buttonLayout: 'horizontal',
        animation: 'fade-up'
      },
      sections: {
        spacing: 'spacious',
        containerStyle: 'contained',
        backgroundPattern: 'organic',
        sectionDividers: 'curve'
      },
      cards: {
        style: 'neumorphism',
        borderRadius: 'organic',
        shadow: 'soft',
        hoverEffect: 'lift'
      },
      buttons: {
        style: 'neumorphism',
        size: 'medium',
        borderRadius: 'organic',
        animation: 'none'
      },
      layout: {
        headerStyle: 'transparent',
        footerStyle: 'light',
        navigationStyle: 'centered',
        contentFlow: 'timeline'
      }
    }
  }
];

export const getDesignTemplateById = (id: string): DesignTemplate => {
  return designTemplates.find(template => template.id === id) || designTemplates[0];
};

export const applyDesignTemplate = (template: DesignTemplate) => {
  const root = document.documentElement;
  
  // Apply design template CSS variables
  root.style.setProperty('--design-hero-style', template.components.hero.style);
  root.style.setProperty('--design-card-style', template.components.cards.style);
  root.style.setProperty('--design-button-style', template.components.buttons.style);
  root.style.setProperty('--design-spacing', template.components.sections.spacing);
  root.style.setProperty('--design-border-radius', template.components.cards.borderRadius);
  
  // Remove existing template classes
  document.body.className = document.body.className.replace(/design-template-[\w-]+/g, '');
  
  // Add new template class
  document.body.classList.add(`design-template-${template.id}`);
};