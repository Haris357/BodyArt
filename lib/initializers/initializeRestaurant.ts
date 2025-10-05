import { db } from '../firebase';
import { doc, setDoc, collection, addDoc } from 'firebase/firestore';
import { clearAllData } from '../firestore';
import { toast } from 'sonner';

export const initializeRestaurantData = async () => {
  if (!db) {
    throw new Error('Firestore not configured');
  }

  console.log('🍽️ Initializing Restaurant data...');
  
  // Clear all existing data first
  await clearAllData();

  try {
    // Site Settings
    await setDoc(doc(db, 'siteSettings', 'main'), {
      siteName: 'Savory Delights Restaurant',
      siteTitle: 'Savory Delights - Fine Dining Experience',
      siteDescription: 'Experience exceptional cuisine at Savory Delights Restaurant. Fresh ingredients, expert chefs, and unforgettable dining experiences await you.',
      footerDescription: 'Savory Delights offers an exceptional dining experience with carefully crafted dishes, premium ingredients, and warm hospitality that makes every meal memorable.',
      logoType: 'icon',
      logoIcon: 'UtensilsCrossed',
      logoImageUrl: '',
      address: '789 Culinary Avenue, Food District, FD 13579',
      phone: '+1 (555) 345-6789',
      email: 'info@savorydelights.com',
      hours: 'Mon-Thu: 11:00 AM - 10:00 PM\nFri-Sat: 11:00 AM - 11:00 PM\nSun: 12:00 PM - 9:00 PM',
      instagram: 'https://instagram.com/savorydelights',
      mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.123456789!2d-74.0059413!3d40.7127753!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQyJzQ2LjAiTiA3NMKwMDAnMjEuNCJX!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus',
      colorTheme: 'red-rose'
    });

    // Home Page Content
    await setDoc(doc(db, 'pages', 'home'), {
      hero: {
        title: 'Exceptional Cuisine,',
        subtitle: 'Unforgettable Experience',
        description: 'Discover culinary excellence at Savory Delights. Fresh ingredients, expert chefs, and warm hospitality create the perfect dining experience.',
        backgroundImage: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
        primaryButtonText: 'Reserve Table',
        primaryButtonLink: '/join',
        secondaryButtonText: 'View Menu',
        secondaryButtonLink: '/about'
      },
      intro: {
        title: 'Welcome to Savory Delights',
        description: 'Where culinary artistry meets exceptional service. Our passionate chefs create memorable dining experiences using the finest ingredients and time-honored techniques.',
        image: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
      },
      services: {
        title: 'Our Culinary Offerings',
        subtitle: 'Exceptional dining experiences crafted with passion and expertise',
        services: [
          {
            title: 'Fine Dining',
            description: 'Exquisite multi-course meals in an elegant atmosphere',
            image: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
            features: ['Chef\'s Tasting Menu', 'Wine Pairing', 'Premium Ingredients', 'Elegant Presentation']
          },
          {
            title: 'Private Events',
            description: 'Customized dining experiences for special occasions',
            image: 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
            features: ['Private Dining Rooms', 'Custom Menus', 'Event Planning', 'Professional Service']
          },
          {
            title: 'Catering Services',
            description: 'Bring our exceptional cuisine to your location',
            image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
            features: ['Corporate Catering', 'Wedding Catering', 'Party Platters', 'Full-Service Setup']
          }
        ]
      },
      features: {
        title: 'Why Choose Savory Delights?',
        subtitle: 'Experience the difference of true culinary excellence',
        features: [
          {
            icon: '👨‍🍳',
            title: 'Master Chefs',
            description: 'Award-winning chefs with international culinary training and expertise',
            image: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'
          },
          {
            icon: '🥘',
            title: 'Fresh Ingredients',
            description: 'Locally sourced, premium ingredients delivered fresh daily for optimal flavor',
            image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'
          },
          {
            icon: '🍷',
            title: 'Curated Wine Selection',
            description: 'Extensive wine collection carefully selected to complement our cuisine perfectly',
            image: 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'
          }
        ]
      },
      stats: {
        title: 'A Legacy of Culinary Excellence',
        backgroundImage: 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=1920&h=600&fit=crop',
        stats: [
          { number: '10000', label: 'Satisfied Diners', suffix: '+' },
          { number: '25', label: 'Expert Chefs', suffix: '+' },
          { number: '12', label: 'Years Excellence', suffix: '+' },
          { number: '200', label: 'Menu Items', suffix: '+' }
        ]
      },
      cta: {
        title: 'Ready for an Unforgettable Meal?',
        subtitle: 'Reserve Your Table Today',
        description: 'Join us for an exceptional dining experience. Book your table now and taste the difference.',
        backgroundImage: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=1920&h=800&fit=crop',
        primaryButtonText: 'Reserve Now',
        primaryButtonLink: '/join',
        secondaryButtonText: 'Call Restaurant',
        phone: '+1 (555) 345-6789'
      }
    });

    // Contact Page Content
    await setDoc(doc(db, 'pages', 'contact'), {
      hero: {
        title: 'Contact Us',
        subtitle: 'Ready to experience exceptional dining? Get in touch to make a reservation!',
        backgroundImage: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=1920&h=600&fit=crop'
      },
      content: {
        title: 'Get In Touch',
        subtitle: 'We\'re here to make your dining experience perfect',
        description: 'Have questions about our menu, want to make a reservation, or planning a special event? Our team is ready to help you create the perfect dining experience. We also offer private dining consultations and custom menu planning for special occasions.'
      }
    });

    // Join Page Content (Reservation Page)
    await setDoc(doc(db, 'pages', 'join'), {
      hero: {
        title: 'Reserve Your Table',
        subtitle: 'Book your dining experience at Savory Delights...',
        backgroundImage: 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=1920&h=600&fit=crop'
      },
      form: {
        title: 'Table Reservation',
        subtitle: 'Fill out this form and we\'ll confirm your reservation...',
        description: 'Please provide your details and preferred dining time. We\'ll contact you within 2 hours to confirm your reservation and discuss any special requirements.',
        dropdownLabel: 'Dining Preference',
        dropdownPlaceholder: 'Select your dining preference',
        dropdownOptions: [
          { label: 'Romantic Dinner for Two', value: 'romantic-dinner' },
          { label: 'Family Dining', value: 'family-dining' },
          { label: 'Business Lunch', value: 'business-lunch' },
          { label: 'Group Celebration', value: 'group-celebration' },
          { label: 'Private Dining Room', value: 'private-dining' },
          { label: 'Chef\'s Tasting Menu', value: 'tasting-menu' },
          { label: 'Wine Pairing Dinner', value: 'wine-pairing' },
          { label: 'Special Occasion', value: 'special-occasion' },
          { label: 'Corporate Event', value: 'corporate-event' },
          { label: 'Casual Dining', value: 'casual-dining' }
        ]
      },
      benefits: {
        title: 'Dining Experience Benefits',
        benefits: [
          { icon: '👨‍🍳', title: 'Expert Chefs', description: 'Award-winning culinary team with international training' },
          { icon: '🌱', title: 'Fresh Ingredients', description: 'Locally sourced, premium ingredients delivered daily' },
          { icon: '🍷', title: 'Wine Expertise', description: 'Sommelier-selected wines to complement your meal' },
          { icon: '🎭', title: 'Elegant Atmosphere', description: 'Sophisticated ambiance perfect for any occasion' },
          { icon: '🍽️', title: 'Exceptional Service', description: 'Professional staff trained in fine dining service' },
          { icon: '🎉', title: 'Special Events', description: 'Custom menus and arrangements for celebrations' }
        ]
      }
    });

    // Navigation
    const navItems = [
      { label: 'Home', href: '/', order: 0 },
      { label: 'About Us', href: '/about', order: 1 },
      { label: 'Services', href: '/services', order: 2 },
      { label: 'Menu', href: '/why', order: 3 },
      { label: 'Contact', href: '/contact', order: 4 },
      { label: 'Reserve Table', href: '/join', order: 5 }
    ];

    for (const item of navItems) {
      await addDoc(collection(db, 'navigation'), { ...item, visible: true });
    }

    // Services Page Content
    await setDoc(doc(db, 'pages', 'services'), {
      hero: {
        title: 'Dining Packages & Catering',
        subtitle: 'Exceptional dining experiences and catering services for every occasion',
        backgroundImage: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=1920&h=600&fit=crop'
      },
      packages: {
        title: 'Dining Packages',
        subtitle: 'Curated dining experiences for every taste and occasion',
        packages: [
          {
            name: 'Casual Dining',
            price: '35',
            period: 'person',
            description: 'Perfect for everyday dining and casual meals',
            icon: '🍽️',
            features: [
              'Appetizer selection',
              'Main course',
              'Dessert',
              'Complimentary bread',
              'Coffee or tea'
            ],
            buttonText: 'Reserve Now',
            featured: false,
            badge: ''
          },
          {
            name: 'Chef\'s Tasting Menu',
            price: '89',
            period: 'person',
            description: 'Multi-course culinary journey with wine pairing',
            icon: '👨‍🍳',
            features: [
              '7-course tasting menu',
              'Wine pairing',
              'Amuse-bouche',
              'Palate cleansers',
              'Chef\'s special dessert',
              'Premium ingredients',
              'Personalized service',
              'Dietary accommodations'
            ],
            buttonText: 'Book Tasting',
            featured: true,
            badge: 'Chef\'s Choice'
          },
          {
            name: 'Private Event Catering',
            price: '150',
            period: 'person',
            description: 'Full-service catering for special events',
            icon: '🎉',
            features: [
              'Custom menu planning',
              'Professional service staff',
              'Complete setup & cleanup',
              'Linens & tableware',
              'Floral arrangements',
              'Event coordination',
              'Dietary accommodations',
              'Photography support'
            ],
            buttonText: 'Plan Event',
            featured: false,
            badge: 'Premium'
          }
        ]
      }
    });

    // Email Settings
    await setDoc(doc(db, 'emailSettings', 'main'), {
      adminEmail: 'admin@savorydelights.com',
      contactEmailTemplate: {
        subject: 'Thank you for contacting Savory Delights!',
        body: `Dear {{name}},

Thank you for reaching out to Savory Delights Restaurant! We have received your message and will get back to you within 2 hours.

Your Message:
{{message}}

We're excited to help you plan your dining experience and answer any questions about our menu, reservations, or private events.

Best regards,
Savory Delights Team

📍 789 Culinary Avenue, Food District, FD 13579
📞 +1 (555) 345-6789
🌐 www.savorydelights.com`
      },
      joinEmailTemplate: {
        subject: 'Table Reservation Confirmed - Savory Delights',
        body: `Dear {{name}},

Thank you for choosing Savory Delights Restaurant! We have received your reservation request and are excited to provide you with an exceptional dining experience.

Reservation Details:
- Dining Preference: {{goal}}
- Phone: {{phone}}
{{#notes}}
- Special Requests: {{notes}}
{{/notes}}

Our team will contact you within 2 hours to:
• Confirm your reservation time
• Discuss any dietary requirements
• Arrange special accommodations if needed
• Provide parking and arrival information

We look forward to serving you!

Best regards,
Savory Delights Team

📍 789 Culinary Avenue, Food District, FD 13579
📞 +1 (555) 345-6789
🌐 www.savorydelights.com`
      },
      adminNotificationTemplate: {
        subject: 'New {{formType}} reservation - Savory Delights',
        body: `New {{formType}} reservation received:

👤 Name: {{name}}
📧 Email: {{email}}
📞 Phone: {{phone}}
{{#goal}}
🍽️ Dining Type: {{goal}}
{{/goal}}
{{#message}}
💬 Message: {{message}}
{{/message}}
{{#notes}}
📝 Special Requests: {{notes}}
{{/notes}}

⏰ Submitted at: {{timestamp}}

Please contact the guest promptly to confirm the reservation and discuss any special requirements.

Savory Delights Admin Panel`
      }
    });

    // Sample Testimonials
    const testimonials = [
      {
        name: 'James Wilson',
        role: 'Food Critic',
        content: 'Savory Delights offers an exceptional dining experience. The attention to detail and flavor profiles are outstanding! Every dish tells a story.',
        rating: 5,
        image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        order: 0
      },
      {
        name: 'Maria Garcia',
        role: 'Regular Customer',
        content: 'This is our go-to restaurant for special occasions. The food is always perfect and the service is impeccable. The wine selection is extraordinary.',
        rating: 5,
        image: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        order: 1
      },
      {
        name: 'David Kim',
        role: 'Event Host',
        content: 'They catered our corporate event and it was phenomenal! Every guest was impressed with the quality and presentation. Highly professional team.',
        rating: 5,
        image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        order: 2
      },
      {
        name: 'Sophie Laurent',
        role: 'Anniversary Dinner',
        content: 'Celebrated our 10th anniversary here and it was magical. The chef\'s special menu was incredible and the ambiance was perfect for our special night.',
        rating: 5,
        image: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        order: 3
      },
      {
        name: 'Robert Chen',
        role: 'Wine Enthusiast',
        content: 'The wine selection here is outstanding! The sommelier helped us choose the perfect pairing for our meal. Truly a world-class dining experience.',
        rating: 5,
        image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
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
        title: 'Our Culinary Journey',
        content: 'Established in 2012, Savory Delights has been serving exceptional cuisine with a commitment to quality and innovation. Our chefs combine traditional techniques with modern creativity to create unforgettable dining experiences. We source our ingredients from local farms and trusted suppliers to ensure every dish meets our exacting standards.',
        image: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
        imagePosition: 'right',
        backgroundColor: 'bg-white',
        pageId: 'about',
        order: 0
      },
      {
        type: 'features',
        title: 'Our Commitment',
        features: [
          { icon: '🌱', title: 'Farm to Table', description: 'Fresh, locally sourced ingredients delivered daily from trusted local farms and suppliers' },
          { icon: '👨‍🍳', title: 'Expert Chefs', description: 'Award-winning culinary team with international experience and Michelin-star training' },
          { icon: '🍷', title: 'Wine Excellence', description: 'Carefully curated wine selection from renowned vineyards around the world' },
          { icon: '🎯', title: 'Attention to Detail', description: 'Meticulous preparation and presentation of every dish with artistic flair' },
          { icon: '🌍', title: 'Sustainable Practices', description: 'Environmentally conscious sourcing and waste reduction initiatives' },
          { icon: '🎭', title: 'Memorable Experiences', description: 'Creating lasting memories through exceptional food and outstanding service' }
        ],
        backgroundColor: 'bg-gray-50',
        pageId: 'about',
        order: 1
      },
      {
        type: 'image-text',
        title: 'Our Philosophy',
        content: 'Food is more than sustenance – it\'s an art form, a cultural expression, and a way to bring people together. At Savory Delights, we believe in creating dishes that not only satisfy your palate but also tell a story. Each recipe is carefully crafted to balance flavors, textures, and visual appeal, resulting in a dining experience that engages all your senses.',
        image: 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
        imagePosition: 'left',
        backgroundColor: 'bg-white',
        pageId: 'about',
        order: 2
      },
      {
        type: 'video',
        title: 'Dining Experience',
        videoLayout: 'vertical',
        videos: [
          {
            title: 'Restaurant Ambiance',
            url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            description: 'Experience the elegant atmosphere of our dining room'
          },
          {
            title: 'Customer Reviews',
            url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            description: 'Hear what our guests say about their dining experience'
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

    // Menu Page (Why Page)
    const menuPageSections = [
      {
        type: 'features',
        title: 'Our Signature Menu',
        features: [
          { icon: '🥩', title: 'Premium Steaks', description: 'Aged beef cuts grilled to perfection with signature seasonings and house-made sauces' },
          { icon: '🦞', title: 'Fresh Seafood', description: 'Daily catch prepared with Mediterranean and Asian influences, sourced from sustainable fisheries' },
          { icon: '🍝', title: 'Artisan Pasta', description: 'House-made pasta with authentic Italian sauces and fresh herbs from our garden' },
          { icon: '🥗', title: 'Garden Fresh Salads', description: 'Organic vegetables and greens with house-made dressings and seasonal ingredients' },
          { icon: '🍰', title: 'Decadent Desserts', description: 'Handcrafted desserts made fresh daily by our award-winning pastry chef' },
          { icon: '🍷', title: 'Wine Selection', description: 'Extensive wine list featuring local and international vintages with expert pairing recommendations' },
          { icon: '🍲', title: 'Seasonal Specials', description: 'Rotating seasonal menu featuring the best ingredients each season has to offer' },
          { icon: '🧀', title: 'Artisan Cheese Board', description: 'Curated selection of international cheeses with accompaniments and wine pairings' },
          { icon: '🍤', title: 'Appetizer Selection', description: 'Creative small plates and appetizers perfect for sharing or starting your meal' }
        ],
        backgroundColor: 'bg-white',
        pageId: 'why',
        order: 0
      },
      {
        type: 'image-text',
        title: 'Chef\'s Special Creations',
        content: 'Our head chef brings over 20 years of international culinary experience to create unique dishes that blend traditional techniques with modern innovation. Each dish on our menu is carefully crafted to provide a perfect balance of flavors, textures, and visual appeal. We take pride in our signature creations that have become favorites among our regular guests.',
        image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
        imagePosition: 'right',
        backgroundColor: 'bg-gray-50',
        pageId: 'why',
        order: 1
      },
      {
        type: 'video',
        title: 'Culinary Excellence in Action',
        videoLayout: 'grid-3',
        videos: [
          {
            title: 'Chef\'s Kitchen Tour',
            url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            description: 'Go behind the scenes in our professional kitchen'
          },
          {
            title: 'Signature Dish Preparation',
            url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            description: 'Watch our chef prepare our most popular dishes'
          },
          {
            title: 'Wine Pairing Guide',
            url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            description: 'Learn about our wine selection and pairing expertise'
          }
        ],
        backgroundColor: 'bg-white',
        pageId: 'why',
        order: 2
      }
    ];

    for (const section of menuPageSections) {
      await addDoc(collection(db, 'sections'), section);
    }

    console.log('✅ Restaurant data initialization completed successfully!');
    return { success: true, message: 'Restaurant data initialized successfully!' };

  } catch (error) {
    console.error('❌ Error initializing restaurant data:', error);
    throw error;
  }
};