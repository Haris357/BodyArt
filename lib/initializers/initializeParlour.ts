import { db } from '../firebase';
import { doc, setDoc, collection, addDoc } from 'firebase/firestore';
import { clearAllData } from '../firestore';

export const initializeParlourData = async () => {
  if (!db) {
    throw new Error('Firestore not configured');
  }

  console.log('💄 Initializing Beauty Parlour data...');
  
  // Clear all existing data first
  await clearAllData();

  try {
    // Site Settings
    await setDoc(doc(db, 'siteSettings', 'main'), {
      siteName: 'Elegance Beauty Parlour',
      siteTitle: 'Elegance Beauty Parlour - Where Beauty Meets Perfection',
      siteDescription: 'Transform your look with our premium beauty services. Expert makeup artists, skincare specialists, and hair stylists at Elegance Beauty Parlour.',
      footerDescription: 'Your beauty is our passion. We provide premium beauty services with the latest techniques and highest quality products to make you look and feel your absolute best.',
      logoType: 'icon',
      logoIcon: 'Sparkles',
      logoImageUrl: '',
      address: '456 Beauty Boulevard, Glamour District, GD 67890',
      phone: '+1 (555) 234-5678',
      email: 'info@elegancebeauty.com',
      hours: 'Mon-Fri: 9:00 AM - 8:00 PM\nSat-Sun: 10:00 AM - 6:00 PM',
      instagram: 'https://instagram.com/elegancebeauty',
      mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.123456789!2d-74.0059413!3d40.7127753!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQyJzQ2LjAiTiA3NMKwMDAnMjEuNCJX!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus',
      colorTheme: 'purple-pink'
    });

    // Home Page Content
    await setDoc(doc(db, 'pages', 'home'), {
      hero: {
        title: 'Discover Your',
        subtitle: 'Natural Beauty',
        description: 'Experience luxury beauty treatments with our expert stylists and premium products. Your beauty transformation starts here.',
        backgroundImage: 'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
        primaryButtonText: 'Book Appointment',
        primaryButtonLink: '/join',
        secondaryButtonText: 'View Services',
        secondaryButtonLink: '/about'
      },
      intro: {
        title: 'Welcome to Elegance Beauty Parlour',
        description: 'Where beauty meets perfection. Our team of expert beauticians and stylists are dedicated to enhancing your natural beauty with the latest techniques and premium products.',
        image: 'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
      },
      services: {
        title: 'Our Premium Beauty Services',
        subtitle: 'Professional beauty treatments tailored to enhance your natural glow',
        services: [
          {
            title: 'Bridal Makeup',
            description: 'Complete bridal beauty packages for your special day',
            image: 'https://images.pexels.com/photos/1721558/pexels-photo-1721558.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
            features: ['HD Bridal Makeup', 'Hair Styling', 'Pre-wedding Skincare', 'Trial Sessions']
          },
          {
            title: 'Skincare Treatments',
            description: 'Advanced skincare solutions for glowing, healthy skin',
            image: 'https://images.pexels.com/photos/3985360/pexels-photo-3985360.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
            features: ['Facial Treatments', 'Anti-aging Therapy', 'Acne Treatment', 'Skin Brightening']
          },
          {
            title: 'Hair & Spa Services',
            description: 'Complete hair care and relaxing spa treatments',
            image: 'https://images.pexels.com/photos/3993212/pexels-photo-3993212.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
            features: ['Hair Cutting & Styling', 'Hair Coloring', 'Spa Treatments', 'Massage Therapy']
          }
        ]
      },
      features: {
        title: 'Why Choose Elegance Beauty?',
        subtitle: 'Experience luxury beauty services with professional expertise',
        features: [
          {
            icon: '💄',
            title: 'Expert Beauticians',
            description: 'Certified beauty professionals with years of experience in latest beauty trends',
            image: 'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'
          },
          {
            icon: '✨',
            title: 'Premium Products',
            description: 'We use only the finest, internationally acclaimed beauty products and cosmetics',
            image: 'https://images.pexels.com/photos/3985360/pexels-photo-3985360.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'
          },
          {
            icon: '🌸',
            title: 'Luxury Experience',
            description: 'Relax in our elegant, comfortable environment designed for your ultimate comfort',
            image: 'https://images.pexels.com/photos/3993212/pexels-photo-3993212.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'
          }
        ]
      },
      stats: {
        title: 'Trusted by Beauty Enthusiasts',
        backgroundImage: 'https://images.pexels.com/photos/3985360/pexels-photo-3985360.jpeg?auto=compress&cs=tinysrgb&w=1920&h=600&fit=crop',
        stats: [
          { number: '5000', label: 'Happy Clients', suffix: '+' },
          { number: '15', label: 'Beauty Experts', suffix: '+' },
          { number: '8', label: 'Years Experience', suffix: '+' },
          { number: '100', label: 'Services Offered', suffix: '+' }
        ]
      },
      cta: {
        title: 'Ready for Your Beauty Transformation?',
        subtitle: 'Book Your Appointment Today',
        description: 'Experience the luxury of professional beauty services. Let our experts enhance your natural beauty.',
        backgroundImage: 'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=1920&h=800&fit=crop',
        primaryButtonText: 'Book Now',
        primaryButtonLink: '/join',
        secondaryButtonText: 'Call Us',
        phone: '+1 (555) 234-5678'
      }
    });

    // Contact Page Content
    await setDoc(doc(db, 'pages', 'contact'), {
      hero: {
        title: 'Contact Us',
        subtitle: 'Ready to enhance your beauty? Get in touch with our expert team today!',
        backgroundImage: 'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=1920&h=600&fit=crop'
      },
      content: {
        title: 'Get In Touch',
        subtitle: 'We\'re here to help you look and feel your best',
        description: 'Have questions about our beauty services or want to book an appointment? Our friendly team is ready to assist you with all your beauty needs. From bridal makeup consultations to skincare advice, we\'re here to help you achieve your beauty goals.'
      }
    });

    // Join Page Content (Booking Page)
    await setDoc(doc(db, 'pages', 'join'), {
      hero: {
        title: 'Book Your Beauty Appointment',
        subtitle: 'Take the first step towards your beauty transformation...',
        backgroundImage: 'https://images.pexels.com/photos/3985360/pexels-photo-3985360.jpeg?auto=compress&cs=tinysrgb&w=1920&h=600&fit=crop'
      },
      form: {
        title: 'Appointment Booking',
        subtitle: 'Fill out this form and we\'ll contact you to confirm your appointment...',
        description: 'Please provide your details and preferred service. Our team will call you within 24 hours to confirm your appointment and discuss your beauty goals.',
        dropdownLabel: 'Service Type',
        dropdownPlaceholder: 'Select the service you\'re interested in',
        dropdownOptions: [
          { label: 'Bridal Makeup Package', value: 'bridal-makeup' },
          { label: 'Party Makeup', value: 'party-makeup' },
          { label: 'Facial Treatment', value: 'facial-treatment' },
          { label: 'Hair Styling & Cut', value: 'hair-styling' },
          { label: 'Hair Coloring', value: 'hair-coloring' },
          { label: 'Spa Treatment', value: 'spa-treatment' },
          { label: 'Nail Art & Manicure', value: 'nail-art' },
          { label: 'Eyebrow & Lash Services', value: 'eyebrow-lash' },
          { label: 'Skincare Consultation', value: 'skincare-consultation' },
          { label: 'Full Beauty Package', value: 'full-package' }
        ]
      },
      benefits: {
        title: 'Why Book With Us',
        benefits: [
          { icon: '💄', title: 'Expert Beauticians', description: 'Certified professionals with years of experience' },
          { icon: '✨', title: 'Premium Products', description: 'Only the finest international beauty brands' },
          { icon: '🌸', title: 'Luxury Experience', description: 'Comfortable, elegant environment for relaxation' },
          { icon: '🎨', title: 'Personalized Service', description: 'Customized treatments for your unique needs' },
          { icon: '📅', title: 'Flexible Scheduling', description: 'Convenient appointment times to fit your schedule' },
          { icon: '💎', title: 'Premium Quality', description: 'High-end products and latest beauty techniques' }
        ]
      }
    });

    // Navigation
    const navItems = [
      { label: 'Home', href: '/', order: 0 },
      { label: 'About Us', href: '/about', order: 1 },
      { label: 'Services', href: '/services', order: 2 },
      { label: 'Treatments', href: '/why', order: 3 },
      { label: 'Contact', href: '/contact', order: 4 },
      { label: 'Book Now', href: '/join', order: 5 }
    ];

    for (const item of navItems) {
      await addDoc(collection(db, 'navigation'), { ...item, visible: true });
    }

    // Services Page Content
    await setDoc(doc(db, 'pages', 'services'), {
      hero: {
        title: 'Beauty Packages & Services',
        subtitle: 'Discover our range of premium beauty treatments and packages',
        backgroundImage: 'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=1920&h=600&fit=crop'
      },
      packages: {
        title: 'Beauty Packages',
        subtitle: 'Professional beauty services tailored to your needs',
        packages: [
          {
            name: 'Essential Beauty',
            price: '79',
            period: 'session',
            description: 'Perfect for everyday beauty needs',
            icon: '💄',
            features: [
              'Basic facial treatment',
              'Eyebrow shaping',
              'Basic makeup application',
              'Hair wash & blow dry',
              'Nail care'
            ],
            buttonText: 'Book Essential',
            featured: false,
            badge: ''
          },
          {
            name: 'Bridal Package',
            price: '299',
            period: 'package',
            description: 'Complete bridal beauty transformation',
            icon: '👰',
            features: [
              'Pre-bridal consultation',
              'Trial makeup session',
              'Bridal makeup & hair',
              'Pre-wedding skincare',
              'Nail art & manicure',
              'Saree draping',
              'Touch-up kit',
              'Photography support'
            ],
            buttonText: 'Book Bridal',
            featured: true,
            badge: 'Most Popular'
          },
          {
            name: 'Luxury Spa',
            price: '199',
            period: 'session',
            description: 'Ultimate relaxation and beauty experience',
            icon: '🌸',
            features: [
              'Full body spa treatment',
              'Advanced facial therapy',
              'Hair spa & treatment',
              'Aromatherapy massage',
              'Premium product application',
              'Relaxation lounge access',
              'Complimentary refreshments'
            ],
            buttonText: 'Book Luxury',
            featured: false,
            badge: 'Premium'
          }
        ]
      }
    });

    // Email Settings
    await setDoc(doc(db, 'emailSettings', 'main'), {
      adminEmail: 'admin@elegancebeauty.com',
      contactEmailTemplate: {
        subject: 'Thank you for contacting Elegance Beauty Parlour!',
        body: `Dear {{name}},

Thank you for reaching out to Elegance Beauty Parlour! We have received your message and will get back to you within 24 hours.

Your Message:
{{message}}

We're excited to help you enhance your natural beauty and answer any questions about our services, treatments, or booking process.

Best regards,
Elegance Beauty Team

📍 456 Beauty Boulevard, Glamour District, GD 67890
📞 +1 (555) 234-5678
🌐 www.elegancebeauty.com`
      },
      joinEmailTemplate: {
        subject: 'Welcome to Elegance Beauty! Your appointment request received',
        body: `Dear {{name}},

Thank you for choosing Elegance Beauty Parlour! We have received your appointment request and are excited to help you look and feel your absolute best.

Appointment Details:
- Service Type: {{goal}}
- Phone: {{phone}}
{{#notes}}
- Special Requests: {{notes}}
{{/notes}}

Our team will contact you within 2 hours to:
• Confirm your appointment time
• Discuss your beauty goals and preferences
• Provide pre-appointment care instructions
• Answer any questions about our services

We look forward to pampering you!

Best regards,
Elegance Beauty Team

📍 456 Beauty Boulevard, Glamour District, GD 67890
📞 +1 (555) 234-5678
🌐 www.elegancebeauty.com`
      },
      adminNotificationTemplate: {
        subject: 'New {{formType}} appointment - Elegance Beauty',
        body: `New {{formType}} appointment request received:

👤 Name: {{name}}
📧 Email: {{email}}
📞 Phone: {{phone}}
{{#goal}}
💄 Service: {{goal}}
{{/goal}}
{{#message}}
💬 Message: {{message}}
{{/message}}
{{#notes}}
📝 Special Requests: {{notes}}
{{/notes}}

⏰ Submitted at: {{timestamp}}

Please contact the client promptly to confirm the appointment and discuss their beauty needs.

Elegance Beauty Admin Panel`
      }
    });

    // Sample Testimonials
    const testimonials = [
      {
        name: 'Priya Sharma',
        role: 'Bridal Client',
        content: 'My bridal makeup was absolutely stunning! The team made me feel like a princess on my wedding day. Every detail was perfect and the makeup lasted all day.',
        rating: 5,
        image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        order: 0
      },
      {
        name: 'Anita Patel',
        role: 'Skincare Client',
        content: 'The facial treatments here are amazing! My skin has never looked better. The staff is knowledgeable and the products they use are top quality.',
        rating: 5,
        image: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        order: 1
      },
      {
        name: 'Kavya Reddy',
        role: 'Hair Styling Client',
        content: 'Love my new hairstyle! The stylists here really understand what works best for each person. They listened to my needs and delivered exactly what I wanted.',
        rating: 5,
        image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        order: 2
      },
      {
        name: 'Meera Singh',
        role: 'Regular Client',
        content: 'I\'ve been coming here for 2 years and the service is consistently excellent. The atmosphere is relaxing and the results are always beyond my expectations.',
        rating: 5,
        image: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        order: 3
      },
      {
        name: 'Riya Gupta',
        role: 'Party Makeup Client',
        content: 'The party makeup service is fantastic! I always get compliments when I get my makeup done here. The artists are truly talented.',
        rating: 5,
        image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        order: 4
      }
    ];

    for (const testimonial of testimonials) {
      await addDoc(collection(db, 'testimonials'), testimonial);
    }

    // About Page Sections
    const aboutSections = [
      {
        type: 'image-text',
        title: 'Our Beauty Philosophy',
        content: 'At Elegance Beauty Parlour, we believe that true beauty comes from confidence. Our mission is to enhance your natural features and help you feel your absolute best. With over 8 years of experience, we have perfected the art of beauty transformation using the latest techniques and premium products from around the world.',
        image: 'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
        imagePosition: 'right',
        backgroundColor: 'bg-white',
        pageId: 'about',
        order: 0
      },
      {
        type: 'features',
        title: 'Our Expertise',
        features: [
          { icon: '👰', title: 'Bridal Specialists', description: 'Expert bridal makeup and styling for your perfect day with trial sessions and consultation' },
          { icon: '🧴', title: 'Premium Products', description: 'We use only the finest international beauty brands like MAC, Urban Decay, and Bobbi Brown' },
          { icon: '🎨', title: 'Artistic Vision', description: 'Our team combines technical skill with artistic creativity to create stunning looks' },
          { icon: '🌟', title: 'Latest Techniques', description: 'Continuously updated with the latest beauty trends and advanced treatment methods' },
          { icon: '💆‍♀️', title: 'Relaxing Environment', description: 'Luxurious, comfortable space designed for your ultimate relaxation and pampering' },
          { icon: '📋', title: 'Personalized Consultation', description: 'Detailed skin analysis and personalized beauty recommendations for every client' }
        ],
        backgroundColor: 'bg-gray-50',
        pageId: 'about',
        order: 1
      },
      {
        type: 'image-text',
        title: 'Our Commitment to Excellence',
        content: 'Every service at Elegance Beauty Parlour is delivered with meticulous attention to detail and a commitment to excellence. We understand that beauty is personal, and we take the time to understand your unique style, preferences, and goals. Our team stays updated with the latest beauty trends and techniques to ensure you receive the most current and effective treatments available.',
        image: 'https://images.pexels.com/photos/3985360/pexels-photo-3985360.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
        imagePosition: 'left',
        backgroundColor: 'bg-white',
        pageId: 'about',
        order: 2
      },
      {
        type: 'video',
        title: 'Behind the Scenes',
        videoLayout: 'horizontal',
        videos: [
          {
            title: 'Our Beauty Process',
            url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            description: 'See how we create stunning beauty transformations'
          },
          {
            title: 'Client Testimonials',
            url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            description: 'Hear from our satisfied clients about their experience'
          }
        ],
        backgroundColor: 'bg-gray-50',
        pageId: 'about',
        order: 3
      }
    ];

    for (const section of aboutSections) {
      await addDoc(collection(db, 'sections'), section);
    }

    // Services Page (Why Page)
    const servicesPageSections = [
      {
        type: 'features',
        title: 'Our Beauty Services',
        features: [
          { icon: '💄', title: 'Makeup Services', description: 'Professional makeup for all occasions - bridal, party, photoshoot, and everyday looks' },
          { icon: '🧖‍♀️', title: 'Hair Styling', description: 'Complete hair care - cutting, styling, coloring, treatments, and special occasion updos' },
          { icon: '🌸', title: 'Skincare Treatments', description: 'Advanced facial treatments, chemical peels, and customized skincare solutions' },
          { icon: '💆‍♀️', title: 'Spa Treatments', description: 'Relaxing spa services including massages, body treatments, and aromatherapy' },
          { icon: '💅', title: 'Nail Art & Care', description: 'Beautiful nail designs, gel manicures, pedicures, and nail health treatments' },
          { icon: '👁️', title: 'Eye Treatments', description: 'Eyebrow shaping, threading, eyelash extensions, and professional eye makeup' },
          { icon: '🧴', title: 'Hair Treatments', description: 'Deep conditioning, keratin treatments, scalp therapy, and hair restoration services' },
          { icon: '🌺', title: 'Bridal Packages', description: 'Complete bridal beauty packages including trials, pre-wedding treatments, and day-of services' },
          { icon: '✨', title: 'Anti-Aging Services', description: 'Advanced anti-aging treatments, botox alternatives, and skin rejuvenation therapies' }
        ],
        backgroundColor: 'bg-white',
        pageId: 'why',
        order: 0
      },
      {
        type: 'image-text',
        title: 'Premium Beauty Products',
        content: 'We exclusively use premium, internationally recognized beauty brands to ensure the highest quality results. Our product selection includes MAC Cosmetics, Urban Decay, Bobbi Brown, Clinique, and other luxury brands. We believe that using the best products is essential for achieving stunning, long-lasting results that exceed your expectations.',
        image: 'https://images.pexels.com/photos/3993212/pexels-photo-3993212.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
        imagePosition: 'right',
        backgroundColor: 'bg-gray-50',
        pageId: 'why',
        order: 1
      },
      {
        type: 'video',
        title: 'Beauty Transformation Videos',
        videoLayout: 'vertical',
        videos: [
          {
            title: 'Bridal Makeup Tutorial',
            url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            description: 'Step-by-step bridal makeup process'
          },
          {
            title: 'Skincare Routine',
            url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            description: 'Professional skincare treatment demonstration'
          },
          {
            title: 'Hair Styling Techniques',
            url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            description: 'Latest hair styling trends and techniques'
          },
          {
            title: 'Client Testimonials',
            url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            description: 'Real client experiences and transformations'
          }
        ],
        backgroundColor: 'bg-white',
        pageId: 'why',
        order: 2
      }
    ];

    for (const section of servicesPageSections) {
      await addDoc(collection(db, 'sections'), section);
    }

    // Contact Page Content
    await setDoc(doc(db, 'pages', 'contact'), {
      hero: {
        title: 'Contact Us',
        subtitle: 'Ready to enhance your beauty? Get in touch with our expert team today!',
        backgroundImage: 'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=1920&h=600&fit=crop'
      },
      content: {
        title: 'Get In Touch',
        subtitle: 'We\'re here to help you look and feel your best',
        description: 'Have questions about our beauty services or want to book an appointment? Our friendly team is ready to assist you with all your beauty needs. We offer free consultations to help you choose the perfect services for your unique style and preferences.'
      }
    });

    // Join Page Content (Booking Page)
    await setDoc(doc(db, 'pages', 'join'), {
      hero: {
        title: 'Book Your Beauty Appointment',
        subtitle: 'Take the first step towards your beauty transformation...',
        backgroundImage: 'https://images.pexels.com/photos/3985360/pexels-photo-3985360.jpeg?auto=compress&cs=tinysrgb&w=1920&h=600&fit=crop'
      },
      form: {
        title: 'Appointment Booking',
        subtitle: 'Fill out this form and we\'ll contact you to confirm your appointment...',
        description: 'Please provide your details and preferred service. Our team will call you within 24 hours to confirm your appointment and discuss your beauty goals.',
        dropdownLabel: 'Service Type',
        dropdownPlaceholder: 'Select the service you\'re interested in',
        dropdownOptions: [
          { label: 'Bridal Makeup Package', value: 'bridal-makeup' },
          { label: 'Party Makeup', value: 'party-makeup' },
          { label: 'Facial Treatment', value: 'facial-treatment' },
          { label: 'Hair Styling & Cut', value: 'hair-styling' },
          { label: 'Hair Coloring', value: 'hair-coloring' },
          { label: 'Spa Treatment', value: 'spa-treatment' },
          { label: 'Nail Art & Manicure', value: 'nail-art' },
          { label: 'Eyebrow & Lash Services', value: 'eyebrow-lash' },
          { label: 'Skincare Consultation', value: 'skincare-consultation' },
          { label: 'Full Beauty Package', value: 'full-package' },
          { label: 'Anti-Aging Treatment', value: 'anti-aging' },
          { label: 'Hair Treatment & Therapy', value: 'hair-treatment' }
        ]
      },
      benefits: {
        title: 'Why Book With Us',
        benefits: [
          { icon: '💄', title: 'Expert Beauticians', description: 'Certified professionals with years of experience' },
          { icon: '✨', title: 'Premium Products', description: 'Only the finest international beauty brands' },
          { icon: '🌸', title: 'Luxury Experience', description: 'Comfortable, elegant environment for relaxation' },
          { icon: '🎨', title: 'Personalized Service', description: 'Customized treatments for your unique needs' },
          { icon: '📅', title: 'Flexible Scheduling', description: 'Convenient appointment times to fit your schedule' },
          { icon: '💎', title: 'Premium Quality', description: 'High-end products and latest beauty techniques' }
        ]
      }
    });

    console.log('✅ Beauty Parlour data initialization completed successfully!');
    return { success: true, message: 'Beauty Parlour data initialized successfully!' };

  } catch (error) {
    console.error('❌ Error initializing parlour data:', error);
    throw error;
  }
};