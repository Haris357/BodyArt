import { auth, db } from './firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, collection, addDoc, getDocs, deleteDoc } from 'firebase/firestore';
import { getPageContent, getPageSections, getTestimonials } from './firestore';

export const initializeGymData = async () => {
  try {
    if (!auth || !db) {
      throw new Error('Firebase not properly configured');
    }
    
    console.log('🏋️ Initializing Gym/Fitness data...');
    
    // Clear existing data first
    await clearAllData();
    console.log('Existing data cleared');
    
    // Create admin user
    try {
      await createUserWithEmailAndPassword(
        auth, 
        'admin@bodyartfitness.com', 
        'a1234567'
      );
      console.log('Admin user created successfully');
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        console.log('Admin user already exists');
      } else {
        console.error('Error creating admin user:', error);
        throw error;
      }
    }
    
    // Initialize all data with proper error handling
    await initializeSiteSettings();
    console.log('Site settings initialized');
    
    await initializeNavigation();
    console.log('Navigation initialized');
    
    await initializeTestimonials();
    console.log('Testimonials initialized');
    
    await initializeHomePageContent();
    console.log('Home page content initialized');
    
    await initializeAboutPageSections();
    console.log('About page sections initialized');
    
    await initializeWhyPageSections();
    console.log('Why page sections initialized');
    
    await initializeContactPageContent();
    console.log('Contact page content initialized');
    
    await initializeJoinPageContent();
    console.log('Join page content initialized');
    
    // Verify data was created
    console.log('Verifying data creation...');
    const homeContent = await getPageContent('home');
    const aboutSections = await getPageSections('about');
    const whySections = await getPageSections('why-body-art');
    const testimonials = await getTestimonials();
    
    console.log('Verification - Home content:', homeContent);
    console.log('Verification - About sections:', aboutSections);
    console.log('Verification - Why sections:', whySections);
    console.log('Verification - Testimonials:', testimonials);
    
    console.log('✅ Gym data initialization completed successfully!');
    return { success: true, message: 'Gym data initialized successfully!' };
    
  } catch (error: any) {
    console.error('❌ Error initializing gym data:', error);
    throw new Error(`Initialization failed: ${error.message}`);
  }
};

export const initializeParlourData = async () => {
  try {
    if (!auth || !db) {
      throw new Error('Firebase not properly configured');
    }
    
    console.log('Starting parlour initialization...');
    
    // Clear existing data first
    await clearAllData();
    console.log('Existing data cleared');
    
    // Create admin user
    try {
      await createUserWithEmailAndPassword(
        auth, 
        'admin@beautyparlour.com', 
        'a1234567'
      );
      console.log('Parlour admin user created successfully');
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        console.log('Parlour admin user already exists');
      } else {
        console.error('Error creating parlour admin user:', error);
        throw error;
      }
    }
    
    // Initialize all parlour data
    await initializeParlourSiteSettings();
    console.log('Parlour site settings initialized');
    
    await initializeParlourNavigation();
    console.log('Parlour navigation initialized');
    
    await initializeParlourTestimonials();
    console.log('Parlour testimonials initialized');
    
    await initializeParlourHomePageContent();
    console.log('Parlour home page content initialized');
    
    await initializeParlourAboutPageSections();
    console.log('Parlour about page sections initialized');
    
    await initializeParlourServicesPageSections();
    console.log('Parlour services page sections initialized');
    
    await initializeParlourContactPageContent();
    console.log('Parlour contact page content initialized');
    
    await initializeParlourBookingPageContent();
    console.log('Parlour booking page content initialized');
    
    console.log('All parlour content initialized successfully');
    
  } catch (error: any) {
    console.error('Error initializing parlour data:', error);
    throw new Error(`Parlour initialization failed: ${error.message}`);
  }
};

export const initializeRestaurantData = async () => {
  try {
    if (!auth || !db) {
      throw new Error('Firebase not properly configured');
    }
    
    console.log('Starting restaurant initialization...');
    
    // Clear existing data first
    await clearAllData();
    console.log('Existing data cleared');
    
    // Create admin user
    try {
      await createUserWithEmailAndPassword(
        auth, 
        'admin@restaurant.com', 
        'a1234567'
      );
      console.log('Restaurant admin user created successfully');
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        console.log('Restaurant admin user already exists');
      } else {
        console.error('Error creating restaurant admin user:', error);
        throw error;
      }
    }
    
    // Initialize all restaurant data
    await initializeRestaurantSiteSettings();
    console.log('Restaurant site settings initialized');
    
    await initializeRestaurantNavigation();
    console.log('Restaurant navigation initialized');
    
    await initializeRestaurantTestimonials();
    console.log('Restaurant testimonials initialized');
    
    await initializeRestaurantHomePageContent();
    console.log('Restaurant home page content initialized');
    
    await initializeRestaurantAboutPageSections();
    console.log('Restaurant about page sections initialized');
    
    await initializeRestaurantMenuPageSections();
    console.log('Restaurant menu page sections initialized');
    
    await initializeRestaurantContactPageContent();
    console.log('Restaurant contact page content initialized');
    
    await initializeRestaurantReservationPageContent();
    console.log('Restaurant reservation page content initialized');
    
    console.log('All restaurant content initialized successfully');
    
  } catch (error: any) {
    console.error('Error initializing restaurant data:', error);
    throw new Error(`Restaurant initialization failed: ${error.message}`);
  }
};

const clearAllData = async () => {
  try {
    const collections = ['siteSettings', 'pages', 'sections', 'testimonials', 'navigation'];
    
    for (const collectionName of collections) {
      const querySnapshot = await getDocs(collection(db, collectionName));
      const deletePromises = querySnapshot.docs.map(doc => deleteDoc(doc.ref));
      await Promise.all(deletePromises);
    }
    
    console.log('All existing data cleared successfully');
  } catch (error) {
    console.error('Error clearing data:', error);
    throw error;
  }
};

const initializeSiteSettings = async () => {
  try {
    await setDoc(doc(db, 'siteSettings', 'main'), {
      siteName: 'Body Art Fitness',
      siteTitle: 'Body Art Fitness - Transform Your Body, Transform Your Life',
      siteDescription: 'Join Body Art Fitness and experience world-class training with state-of-the-art equipment and expert trainers. Professional trainers, state-of-the-art equipment, and a supportive community await you.',
      colorTheme: 'orange-red',
      footerDescription: 'Transform your body and mind with our expert trainers and state-of-the-art equipment. Your fitness journey starts here.',
      address: '123 Fitness Street, Gym City, GC 12345',
      phone: '+1 (555) 123-4567',
      email: 'info@bodyartfitness.com',
      hours: 'Mon-Fri: 5:00 AM - 11:00 PM\nSat-Sun: 6:00 AM - 10:00 PM',
      instagram: 'https://instagram.com/bodyartfitness',
      mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.215936061334!2d-73.98823492404069!3d40.75889037138592!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes%20Square!5e0!3m2!1sen!2sus!4v1703088217885!5m2!1sen!2sus'
    });
  } catch (error) {
    console.error('Error initializing site settings:', error);
    throw error;
  }
};

const initializeNavigation = async () => {
  try {
    const navItems = [
      { label: 'Home', href: '/', order: 1 },
      { label: 'About Us', href: '/about', order: 2 },
      { label: 'Why Body Art?', href: '/why-body-art', order: 3 },
      { label: 'Contact', href: '/contact', order: 4 },
      { label: 'Join Now', href: '/join', order: 5 },
    ];

    for (const item of navItems) {
      await addDoc(collection(db, 'navigation'), item);
    }
  } catch (error) {
    console.error('Error initializing navigation:', error);
    throw error;
  }
};

const initializeTestimonials = async () => {
  try {
    const testimonials = [
      {
        name: 'Sarah Johnson',
        role: 'Fitness Enthusiast',
        content: 'Body Art Fitness completely transformed my approach to health and wellness. The trainers are incredible and the community is so supportive! I\'ve never felt stronger or more confident.',
        rating: 5,
        image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        order: 1
      },
      {
        name: 'Mike Chen',
        role: 'Weight Loss Success Story',
        content: 'Lost 30 pounds in 6 months with their personalized training program. The nutrition coaching was a game-changer. Highly recommended for anyone serious about results!',
        rating: 5,
        image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        order: 2
      },
      {
        name: 'Emily Rodriguez',
        role: 'Strength Training Enthusiast',
        content: 'The equipment is top-notch and the atmosphere is motivating. This is my fitness home! The 24/7 access means I can work out whenever it fits my schedule.',
        rating: 5,
        image: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        order: 3
      },
      {
        name: 'David Thompson',
        role: 'Marathon Runner',
        content: 'The cardio equipment and training programs helped me shave 20 minutes off my marathon time. The trainers really know their stuff!',
        rating: 5,
        image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        order: 4
      },
      {
        name: 'Lisa Park',
        role: 'Yoga Instructor',
        content: 'As a yoga instructor, I appreciate the variety of classes and the quality of instruction. The studio space is beautiful and peaceful.',
        rating: 5,
        image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        order: 5
      },
      {
        name: 'James Wilson',
        role: 'Bodybuilding Competitor',
        content: 'The free weight section is incredible, and the trainers helped me prepare for my first bodybuilding competition. Couldn\'t have done it without this place!',
        rating: 5,
        image: 'https://images.pexels.com/photos/1229356/pexels-photo-1229356.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        order: 6
      }
    ];

    for (const testimonial of testimonials) {
      await addDoc(collection(db, 'testimonials'), testimonial);
    }
  } catch (error) {
    console.error('Error initializing testimonials:', error);
    throw error;
  }
};

const initializeHomePageContent = async () => {
  try {
    await setDoc(doc(db, 'pages', 'home'), {
      hero: {
        title: 'Transform Your Body,',
        subtitle: 'Transform Your Life',
        description: 'Join Body Art Fitness and experience world-class training with state-of-the-art equipment and expert trainers.',
        backgroundImage: 'https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
        primaryButtonText: 'Start Your Journey',
        primaryButtonLink: '/join',
        secondaryButtonText: 'Learn More',
        secondaryButtonLink: '/about'
      },
      intro: {
        title: 'Welcome to Body Art Fitness',
        description: 'Where fitness meets artistry. We believe that sculpting your body is an art form, and every member is an artist creating their masterpiece. Our state-of-the-art facility, expert trainers, and supportive community provide the perfect canvas for your transformation.',
        image: 'https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
      },
      services: {
        title: 'Our Premium Services',
        subtitle: 'Comprehensive fitness solutions tailored to your goals',
        services: [
          {
            title: 'Personal Training',
            description: 'One-on-one sessions with certified trainers to maximize your results',
            image: 'https://images.pexels.com/photos/1552106/pexels-photo-1552106.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
            features: ['Customized workout plans', 'Nutrition guidance', 'Progress tracking', 'Flexible scheduling']
          },
          {
            title: 'Group Classes',
            description: 'High-energy group workouts that motivate and inspire',
            image: 'https://images.pexels.com/photos/1431282/pexels-photo-1431282.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
            features: ['HIIT Training', 'Yoga & Pilates', 'Spinning Classes', 'Strength Training']
          },
          {
            title: 'Nutrition Coaching',
            description: 'Expert nutrition guidance to fuel your fitness journey',
            image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
            features: ['Meal planning', 'Supplement advice', 'Body composition analysis', 'Lifestyle coaching']
          }
        ]
      },
      features: {
        title: 'Why Choose Body Art Fitness?',
        subtitle: 'Experience the difference with our premium facilities and expert guidance',
        features: [
          {
            icon: '🏋️‍♂️',
            title: 'Professional Equipment',
            description: 'Top-of-the-line fitness equipment from leading brands, maintained to perfection',
            image: 'https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'
          },
          {
            icon: '👨‍🏫',
            title: 'Expert Trainers',
            description: 'Certified professionals with years of experience in fitness and nutrition',
            image: 'https://images.pexels.com/photos/1552106/pexels-photo-1552106.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'
          },
          {
            icon: '🥗',
            title: 'Nutrition Guidance',
            description: 'Comprehensive meal planning and nutritional support for optimal results',
            image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'
          },
          {
            icon: '🏃‍♀️',
            title: 'Group Classes',
            description: 'Energizing group workouts including HIIT, Yoga, Spinning, and more',
            image: 'https://images.pexels.com/photos/1431282/pexels-photo-1431282.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'
          },
          {
            icon: '🕐',
            title: '24/7 Access',
            description: 'Round-the-clock access to facilities for ultimate flexibility',
            image: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'
          },
          {
            icon: '🎯',
            title: 'Goal Achievement',
            description: 'Personalized programs designed to help you reach your specific fitness goals',
            image: 'https://images.pexels.com/photos/1552103/pexels-photo-1552103.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'
          }
        ]
      },
      stats: {
        title: 'Proven Results That Speak for Themselves',
        backgroundImage: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=1920&h=600&fit=crop',
        stats: [
          { number: '2000', label: 'Happy Members', suffix: '+' },
          { number: '50', label: 'Expert Trainers', suffix: '+' },
          { number: '15', label: 'Years Experience', suffix: '+' },
          { number: '24', label: 'Hours Access', suffix: '/7' }
        ]
      },
      gallery: {
        title: 'Our State-of-the-Art Facility',
        subtitle: 'Take a virtual tour of our premium fitness center',
        images: [
          {
            url: 'https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
            alt: 'Main workout floor',
            category: 'Equipment'
          },
          {
            url: 'https://images.pexels.com/photos/1552103/pexels-photo-1552103.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
            alt: 'Cardio section',
            category: 'Cardio'
          },
          {
            url: 'https://images.pexels.com/photos/1552106/pexels-photo-1552106.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
            alt: 'Personal training area',
            category: 'Training'
          },
          {
            url: 'https://images.pexels.com/photos/1431282/pexels-photo-1431282.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
            alt: 'Group class studio',
            category: 'Classes'
          },
          {
            url: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
            alt: 'Free weights section',
            category: 'Equipment'
          },
          {
            url: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
            alt: 'Locker rooms',
            category: 'Facilities'
          }
        ]
      },
      cta: {
        title: 'Ready to Transform Your Life?',
        subtitle: 'Join Body Art Fitness Today',
        description: 'Take the first step towards a healthier, stronger, and more confident you. Our expert team is ready to guide you on your fitness journey.',
        backgroundImage: 'https://images.pexels.com/photos/1552103/pexels-photo-1552103.jpeg?auto=compress&cs=tinysrgb&w=1920&h=800&fit=crop',
        primaryButtonText: 'Start Your Journey',
        primaryButtonLink: '/join',
        secondaryButtonText: 'Call Now',
        phone: '+1 (555) 123-4567'
      }
    });
  } catch (error) {
    console.error('Error initializing home page content:', error);
    throw error;
  }
};

const initializeAboutPageSections = async () => {
  try {
    console.log('Starting About page sections initialization...');
    const aboutSections = [
      {
        pageId: 'about',
        type: 'image-text',
        title: 'About Body Art Fitness',
        content: 'Founded in 2010, Body Art Fitness has grown from a small neighborhood gym into a premier fitness destination. We are more than just a gym - we are a community dedicated to helping you achieve your fitness goals through personalized training, state-of-the-art equipment, and unwavering support. Our journey began with a simple belief: fitness is an art form, and every body tells a unique story.',
        image: 'https://images.pexels.com/photos/1552103/pexels-photo-1552103.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
        imagePosition: 'right',
        backgroundColor: 'bg-white',
        order: 1
      },
      {
        pageId: 'about',
        type: 'text',
        title: 'Our Mission',
        content: 'To empower individuals to transform their lives through fitness, providing expert guidance, cutting-edge facilities, and a supportive community that celebrates every victory along the journey. We believe that everyone deserves access to professional fitness guidance and a welcoming environment where they can pursue their health goals with confidence and determination.',
        backgroundColor: 'bg-gray-50',
        order: 2
      },
      {
        pageId: 'about',
        type: 'features',
        title: 'Our Core Values',
        features: [
          {
            icon: '🎯',
            title: 'Excellence',
            description: 'We strive for excellence in everything we do, from our equipment to our training programs.'
          },
          {
            icon: '👥',
            title: 'Community',
            description: 'Building a supportive community where everyone feels welcome and motivated.'
          },
          {
            icon: '💪',
            title: 'Transformation',
            description: 'Helping our members achieve lasting physical and mental transformations.'
          },
          {
            icon: '🏆',
            title: 'Results',
            description: 'Delivering proven results through science-based training methods.'
          }
        ],
        backgroundColor: 'bg-white',
        order: 3
      },
      {
        pageId: 'about',
        type: 'image-text',
        title: 'Our Expert Team',
        content: 'Our team of certified trainers brings decades of combined experience to help you achieve results you never thought possible. Each trainer specializes in different areas including strength training, weight loss, sports performance, and rehabilitation. We believe in continuous education and staying current with the latest fitness science.',
        image: 'https://images.pexels.com/photos/1431282/pexels-photo-1431282.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
        imagePosition: 'left',
        backgroundColor: 'bg-gray-50',
        order: 4
      },
      {
        pageId: 'about',
        type: 'stats',
        title: 'Our Impact',
        stats: [
          { number: '2000', label: 'Lives Transformed', suffix: '+' },
          { number: '50', label: 'Expert Trainers', suffix: '+' },
          { number: '15', label: 'Years of Excellence', suffix: '+' },
          { number: '98', label: 'Member Satisfaction', suffix: '%' }
        ],
        backgroundColor: 'bg-gray-900 text-white',
        order: 5
      },
      {
        pageId: 'about',
        type: 'text',
        title: 'Join Our Fitness Family',
        content: 'Ready to start your transformation journey? We invite you to experience the Body Art Fitness difference. Schedule a tour of our facility, meet our trainers, and discover how we can help you achieve your fitness goals. Your journey to a healthier, stronger you starts here.',
        backgroundColor: 'bg-white',
        order: 6
      }
    ];

    console.log(`Creating ${aboutSections.length} About page sections...`);
    for (let i = 0; i < aboutSections.length; i++) {
      const section = aboutSections[i];
      console.log(`Creating About section ${i + 1}:`, section.title);
      const docRef = await addDoc(collection(db, 'sections'), section);
      console.log(`About section ${i + 1} created with ID:`, docRef.id);
    }
    console.log('All About page sections created successfully');
  } catch (error) {
    console.error('Error initializing about page sections:', error);
    throw error;
  }
};

const initializeWhyPageSections = async () => {
  try {
    console.log('Starting Why page sections initialization...');
    const whySections = [
      {
        pageId: 'why-body-art',
        type: 'image-text',
        title: 'Why Choose Body Art Fitness?',
        content: 'Discover what makes us different from other gyms and why thousands of members trust us with their fitness journey. We\'re not just about equipment and workouts - we\'re about creating lasting transformations that go beyond the physical. Our holistic approach combines cutting-edge fitness science with personalized attention.',
        image: 'https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
        imagePosition: 'right',
        backgroundColor: 'bg-white',
        order: 1
      },
      {
        pageId: 'why-body-art',
        type: 'features',
        title: 'What Sets Us Apart',
        features: [
          {
            icon: '🏋️',
            title: 'Elite Certified Trainers',
            description: 'Our expert trainers hold multiple certifications and have years of experience in helping people achieve their goals safely and effectively.'
          },
          {
            icon: '⚡',
            title: 'Premium Equipment',
            description: 'State-of-the-art fitness equipment from top brands, maintained to the highest standards for your safety and optimal results.'
          },
          {
            icon: '👥',
            title: 'Supportive Community',
            description: 'Join a vibrant community of like-minded individuals who will motivate, inspire, and celebrate your success every step of the way.'
          },
          {
            icon: '📱',
            title: 'Diverse Programs',
            description: 'From strength training to cardio, yoga to HIIT, nutrition coaching to rehabilitation - we offer comprehensive programs for every goal.'
          },
          {
            icon: '🕐',
            title: '24/7 Access',
            description: 'Work out on your schedule with round-the-clock access to our facilities. Premium members enjoy complete flexibility.'
          },
          {
            icon: '🎯',
            title: 'Results-Driven',
            description: 'Our scientifically-proven methods and personalized approach ensure you see real, lasting results that transform your life.'
          }
        ],
        backgroundColor: 'bg-gray-50',
        order: 2
      },
      {
        pageId: 'why-body-art',
        type: 'text',
        title: 'State-of-the-Art Facility',
        content: 'Our 15,000 square foot facility features the latest in fitness technology, from advanced cardio machines with personal entertainment systems to a complete free weight section with Olympic platforms. Every piece of equipment is carefully selected and maintained to provide you with the best possible workout experience. Our facility includes specialized areas for functional training, group classes, and recovery.',
        backgroundColor: 'bg-white',
        order: 3
      },
      {
        pageId: 'why-body-art',
        type: 'stats',
        title: 'Our Proven Track Record',
        stats: [
          { number: '98', label: 'Member Retention Rate', suffix: '%' },
          { number: '1500', label: 'Success Stories', suffix: '+' },
          { number: '24', label: 'Hours Open Daily', suffix: '/7' },
          { number: '15', label: 'Specialized Programs', suffix: '+' }
        ],
        backgroundColor: 'bg-gradient-to-r from-orange-500 to-red-600 text-white',
        order: 4
      },
      {
        pageId: 'why-body-art',
        type: 'image-text',
        title: 'Personalized Approach',
        content: 'We understand that every fitness journey is unique. That\'s why we take a personalized approach to help you reach your specific goals. Whether you\'re a beginner taking your first steps or an athlete looking to enhance performance, our trainers will create a customized plan that evolves with your progress.',
        image: 'https://images.pexels.com/photos/1552106/pexels-photo-1552106.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
        imagePosition: 'left',
        backgroundColor: 'bg-gray-50',
        order: 5
      }
    ];

    console.log(`Creating ${whySections.length} Why page sections...`);
    for (let i = 0; i < whySections.length; i++) {
      const section = whySections[i];
      console.log(`Creating Why section ${i + 1}:`, section.title);
      const docRef = await addDoc(collection(db, 'sections'), section);
      console.log(`Why section ${i + 1} created with ID:`, docRef.id);
    }
    console.log('All Why page sections created successfully');
  } catch (error) {
    console.error('Error initializing why page sections:', error);
    throw error;
  }
};

const initializeContactPageContent = async () => {
  try {
    await setDoc(doc(db, 'pages', 'contact'), {
      hero: {
        title: 'Contact Us',
        subtitle: 'Ready to start your fitness journey? Get in touch with us today!',
        backgroundImage: 'https://images.pexels.com/photos/1552106/pexels-photo-1552106.jpeg?auto=compress&cs=tinysrgb&w=1920&h=600&fit=crop'
      },
      content: {
        title: 'Get In Touch',
        subtitle: 'We\'re here to help you achieve your fitness goals',
        description: 'Have questions about our programs, facilities, or membership options? Our friendly team is ready to assist you. Reach out to us using any of the methods below, and we\'ll get back to you as soon as possible.'
      }
    });
  } catch (error) {
    console.error('Error initializing contact page content:', error);
    throw error;
  }
};

const initializeJoinPageContent = async () => {
  try {
    await setDoc(doc(db, 'pages', 'join'), {
      hero: {
        title: 'Join Body Art Fitness',
        subtitle: 'Take the first step towards a healthier, stronger you. Join our fitness family today!',
        backgroundImage: 'https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg?auto=compress&cs=tinysrgb&w=1920&h=800&fit=crop'
      },
      form: {
        title: 'Membership Application',
        subtitle: 'Fill out this form and we\'ll contact you to discuss the best membership plan for your goals.',
        description: 'Our team will review your application and contact you within 24 hours to schedule a consultation.'
      },
      benefits: {
        title: 'Membership Benefits',
        benefits: [
          {
            icon: '🏋️',
            title: 'Personal Training',
            description: 'One-on-one sessions with certified trainers'
          },
          {
            icon: '📅',
            title: 'Flexible Schedule',
            description: '24/7 access for premium members'
          },
          {
            icon: '👥',
            title: 'Group Classes',
            description: 'Yoga, HIIT, Spinning, and more'
          },
          {
            icon: '🥗',
            title: 'Nutrition Coaching',
            description: 'Expert guidance for optimal results'
          },
          {
            icon: '🏃‍♀️',
            title: 'Cardio Equipment',
            description: 'State-of-the-art cardio machines'
          },
          {
            icon: '💪',
            title: 'Strength Training',
            description: 'Complete free weight and machine areas'
          }
        ]
      }
    });
  } catch (error) {
    console.error('Error initializing join page content:', error);
    throw error;
  }
};

// PARLOUR INITIALIZATION FUNCTIONS
const initializeParlourSiteSettings = async () => {
  try {
    await setDoc(doc(db, 'siteSettings', 'main'), {
      siteName: 'Elegance Beauty Parlour',
      siteTitle: 'Elegance Beauty Parlour - Your Beauty Transformation Destination',
      siteDescription: 'Experience luxury beauty treatments at Elegance Beauty Parlour. Professional makeup, skincare, hair styling, and spa services in a relaxing environment.',
      colorTheme: 'purple-pink',
      footerDescription: 'Transform your beauty with our expert stylists and premium treatments. Your journey to elegance starts here.',
      address: '456 Beauty Avenue, Style City, SC 67890',
      phone: '+1 (555) 234-5678',
      email: 'info@eleganceparlour.com',
      hours: 'Mon-Sat: 9:00 AM - 8:00 PM\nSun: 10:00 AM - 6:00 PM',
      instagram: 'https://instagram.com/eleganceparlour',
      mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.215936061334!2d-73.98823492404069!3d40.75889037138592!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes%20Square!5e0!3m2!1sen!2sus!4v1703088217885!5m2!1sen!2sus'
    });
  } catch (error) {
    console.error('Error initializing parlour site settings:', error);
    throw error;
  }
};

const initializeParlourNavigation = async () => {
  try {
    const navItems = [
      { label: 'Home', href: '/', order: 1 },
      { label: 'About Us', href: '/about', order: 2 },
      { label: 'Services', href: '/why-body-art', order: 3 },
      { label: 'Contact', href: '/contact', order: 4 },
      { label: 'Book Now', href: '/join', order: 5 },
    ];

    for (const item of navItems) {
      await addDoc(collection(db, 'navigation'), item);
    }
  } catch (error) {
    console.error('Error initializing parlour navigation:', error);
    throw error;
  }
};

const initializeParlourTestimonials = async () => {
  try {
    const testimonials = [
      {
        name: 'Priya Sharma',
        role: 'Bridal Client',
        content: 'Elegance Beauty Parlour made my wedding day absolutely perfect! The bridal makeup was flawless and lasted the entire day. The team is so professional and talented.',
        rating: 5,
        image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        order: 1
      },
      {
        name: 'Anita Patel',
        role: 'Regular Client',
        content: 'I\'ve been coming here for 2 years and they never disappoint. The facial treatments are amazing and my skin has never looked better!',
        rating: 5,
        image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        order: 2
      },
      {
        name: 'Meera Singh',
        role: 'Hair Styling Client',
        content: 'The hair stylists here are artists! They completely transformed my look and I receive compliments everywhere I go.',
        rating: 5,
        image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        order: 3
      },
      {
        name: 'Kavya Reddy',
        role: 'Spa Client',
        content: 'The spa treatments are so relaxing and rejuvenating. This is my go-to place for self-care and pampering.',
        rating: 5,
        image: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        order: 4
      }
    ];

    for (const testimonial of testimonials) {
      await addDoc(collection(db, 'testimonials'), testimonial);
    }
  } catch (error) {
    console.error('Error initializing parlour testimonials:', error);
    throw error;
  }
};

const initializeParlourHomePageContent = async () => {
  try {
    await setDoc(doc(db, 'pages', 'home'), {
      hero: {
        title: 'Elegance Beauty',
        subtitle: 'Parlour',
        description: 'Experience luxury beauty treatments with our expert stylists and premium services in a relaxing, elegant environment.',
        backgroundImage: 'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
        primaryButtonText: 'Book Appointment',
        primaryButtonLink: '/join',
        secondaryButtonText: 'View Services',
        secondaryButtonLink: '/why-body-art'
      },
      intro: {
        title: 'Welcome to Elegance Beauty Parlour',
        description: 'Where beauty meets artistry. We believe that every woman deserves to feel beautiful and confident. Our expert team of stylists and beauticians provide personalized treatments using premium products and the latest techniques.',
        image: 'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
      },
      services: {
        title: 'Our Premium Beauty Services',
        subtitle: 'Comprehensive beauty solutions for every occasion',
        services: [
          {
            title: 'Bridal Makeup',
            description: 'Complete bridal packages including makeup, hair styling, and pre-wedding treatments',
            image: 'https://images.pexels.com/photos/1721558/pexels-photo-1721558.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
            features: ['HD Bridal Makeup', 'Hair Styling', 'Pre-wedding Skincare', 'Trial Sessions']
          },
          {
            title: 'Skincare & Facials',
            description: 'Professional facial treatments for glowing, healthy skin',
            image: 'https://images.pexels.com/photos/3985360/pexels-photo-3985360.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
            features: ['Deep Cleansing Facials', 'Anti-aging Treatments', 'Acne Treatment', 'Skin Analysis']
          },
          {
            title: 'Hair Styling',
            description: 'Expert hair cutting, coloring, and styling services',
            image: 'https://images.pexels.com/photos/3993212/pexels-photo-3993212.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
            features: ['Hair Cutting & Styling', 'Hair Coloring', 'Hair Treatments', 'Keratin Therapy']
          }
        ]
      },
      features: {
        title: 'Why Choose Elegance Beauty Parlour?',
        subtitle: 'Experience the difference with our premium beauty services',
        features: [
          {
            icon: '💄',
            title: 'Expert Beauticians',
            description: 'Certified beauty professionals with years of experience in makeup and skincare',
            image: 'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'
          },
          {
            icon: '✨',
            title: 'Premium Products',
            description: 'High-quality cosmetics and skincare products from leading international brands',
            image: 'https://images.pexels.com/photos/3985360/pexels-photo-3985360.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'
          },
          {
            icon: '🏛️',
            title: 'Luxurious Ambiance',
            description: 'Elegant, relaxing environment designed for your comfort and peace of mind',
            image: 'https://images.pexels.com/photos/3993212/pexels-photo-3993212.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'
          }
        ]
      },
      stats: {
        title: 'Trusted by Thousands of Beautiful Women',
        backgroundImage: 'https://images.pexels.com/photos/3985360/pexels-photo-3985360.jpeg?auto=compress&cs=tinysrgb&w=1920&h=600&fit=crop',
        stats: [
          { number: '5000', label: 'Happy Clients', suffix: '+' },
          { number: '15', label: 'Expert Beauticians', suffix: '+' },
          { number: '8', label: 'Years of Excellence', suffix: '+' },
          { number: '50', label: 'Beauty Services', suffix: '+' }
        ]
      },
      cta: {
        title: 'Ready to Look Your Best?',
        subtitle: 'Book Your Appointment Today',
        description: 'Transform your look with our expert beauty treatments. Our team is ready to help you achieve your beauty goals.',
        backgroundImage: 'https://images.pexels.com/photos/1721558/pexels-photo-1721558.jpeg?auto=compress&cs=tinysrgb&w=1920&h=800&fit=crop',
        primaryButtonText: 'Book Now',
        primaryButtonLink: '/join',
        secondaryButtonText: 'Call Now',
        phone: '+1 (555) 234-5678'
      }
    });
  } catch (error) {
    console.error('Error initializing parlour home page content:', error);
    throw error;
  }
};

const initializeParlourAboutPageSections = async () => {
  try {
    const aboutSections = [
      {
        pageId: 'about',
        type: 'image-text',
        title: 'About Elegance Beauty Parlour',
        content: 'Founded in 2016, Elegance Beauty Parlour has become the premier destination for beauty and wellness in the city. We specialize in bridal makeup, skincare treatments, hair styling, and spa services. Our mission is to enhance your natural beauty and boost your confidence through personalized beauty solutions.',
        image: 'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
        imagePosition: 'right',
        backgroundColor: 'bg-white',
        order: 1
      },
      {
        pageId: 'about',
        type: 'features',
        title: 'Our Expertise',
        features: [
          {
            icon: '👰',
            title: 'Bridal Specialists',
            description: 'Expert bridal makeup and styling for your special day'
          },
          {
            icon: '🌟',
            title: 'Skincare Experts',
            description: 'Advanced facial treatments and skincare solutions'
          },
          {
            icon: '💇‍♀️',
            title: 'Hair Stylists',
            description: 'Professional hair cutting, coloring, and styling'
          },
          {
            icon: '🧖‍♀️',
            title: 'Spa Treatments',
            description: 'Relaxing spa services for complete wellness'
          }
        ],
        backgroundColor: 'bg-gray-50',
        order: 2
      }
    ];

    for (const section of aboutSections) {
      await addDoc(collection(db, 'sections'), section);
    }
  } catch (error) {
    console.error('Error initializing parlour about page sections:', error);
    throw error;
  }
};

const initializeParlourServicesPageSections = async () => {
  try {
    const servicesSections = [
      {
        pageId: 'why-body-art',
        type: 'text',
        title: 'Our Beauty Services',
        content: 'Discover our comprehensive range of beauty treatments designed to enhance your natural beauty and boost your confidence.',
        backgroundColor: 'bg-white',
        order: 1
      },
      {
        pageId: 'why-body-art',
        type: 'features',
        title: 'Complete Beauty Solutions',
        features: [
          {
            icon: '💄',
            title: 'Makeup Services',
            description: 'Professional makeup for all occasions including bridal, party, and everyday looks'
          },
          {
            icon: '🧴',
            title: 'Skincare Treatments',
            description: 'Facials, peels, and advanced skincare treatments for healthy, glowing skin'
          },
          {
            icon: '💇‍♀️',
            title: 'Hair Services',
            description: 'Hair cutting, styling, coloring, and treatments by expert stylists'
          },
          {
            icon: '💅',
            title: 'Nail Care',
            description: 'Manicures, pedicures, and nail art services'
          },
          {
            icon: '🧖‍♀️',
            title: 'Spa & Wellness',
            description: 'Relaxing spa treatments and wellness therapies'
          },
          {
            icon: '👰',
            title: 'Bridal Packages',
            description: 'Complete bridal beauty packages for your special day'
          }
        ],
        backgroundColor: 'bg-gray-50',
        order: 2
      }
    ];

    for (const section of servicesSections) {
      await addDoc(collection(db, 'sections'), section);
    }
  } catch (error) {
    console.error('Error initializing parlour services page sections:', error);
    throw error;
  }
};

const initializeParlourContactPageContent = async () => {
  try {
    await setDoc(doc(db, 'pages', 'contact'), {
      hero: {
        title: 'Contact Us',
        subtitle: 'Ready to enhance your beauty? Get in touch with us today!',
        backgroundImage: 'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=1920&h=600&fit=crop'
      },
      content: {
        title: 'Get In Touch',
        subtitle: 'We\'re here to help you look and feel your best',
        description: 'Have questions about our beauty services or want to book an appointment? Our friendly team is ready to assist you with all your beauty needs.'
      }
    });
  } catch (error) {
    console.error('Error initializing parlour contact page content:', error);
    throw error;
  }
};

const initializeParlourBookingPageContent = async () => {
  try {
    await setDoc(doc(db, 'pages', 'join'), {
      hero: {
        title: 'Book Your Appointment',
        subtitle: 'Experience luxury beauty treatments at Elegance Beauty Parlour',
        backgroundImage: 'https://images.pexels.com/photos/1721558/pexels-photo-1721558.jpeg?auto=compress&cs=tinysrgb&w=1920&h=800&fit=crop'
      },
      form: {
        title: 'Appointment Booking',
        subtitle: 'Fill out this form and we\'ll contact you to confirm your appointment.',
        description: 'Our team will review your booking request and contact you within 2 hours to confirm your appointment time.'
      },
      benefits: {
        title: 'Why Choose Us',
        benefits: [
          {
            icon: '💄',
            title: 'Expert Makeup Artists',
            description: 'Professional makeup for all occasions'
          },
          {
            icon: '🌟',
            title: 'Premium Products',
            description: 'High-quality international beauty brands'
          },
          {
            icon: '🏛️',
            title: 'Luxurious Environment',
            description: 'Elegant and relaxing parlour ambiance'
          },
          {
            icon: '👰',
            title: 'Bridal Specialists',
            description: 'Complete bridal beauty packages'
          }
        ]
      }
    });
  } catch (error) {
    console.error('Error initializing parlour booking page content:', error);
    throw error;
  }
};

// RESTAURANT INITIALIZATION FUNCTIONS
const initializeRestaurantSiteSettings = async () => {
  try {
    await setDoc(doc(db, 'siteSettings', 'main'), {
      siteName: 'Savory Delights Restaurant',
      siteTitle: 'Savory Delights Restaurant - Fine Dining Experience',
      siteDescription: 'Experience exceptional cuisine at Savory Delights Restaurant. Fresh ingredients, expert chefs, and an elegant dining atmosphere for memorable meals.',
      colorTheme: 'red-rose',
      footerDescription: 'Indulge in culinary excellence with our expertly crafted dishes and warm hospitality. Your dining experience awaits.',
      address: '789 Culinary Street, Food City, FC 13579',
      phone: '+1 (555) 345-6789',
      email: 'info@savorydelights.com',
      hours: 'Mon-Thu: 11:00 AM - 10:00 PM\nFri-Sat: 11:00 AM - 11:00 PM\nSun: 12:00 PM - 9:00 PM',
      instagram: 'https://instagram.com/savorydelights',
      mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.215936061334!2d-73.98823492404069!3d40.75889037138592!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes%20Square!5e0!3m2!1sen!2sus!4v1703088217885!5m2!1sen!2sus'
    });
  } catch (error) {
    console.error('Error initializing restaurant site settings:', error);
    throw error;
  }
};

const initializeRestaurantNavigation = async () => {
  try {
    const navItems = [
      { label: 'Home', href: '/', order: 1 },
      { label: 'About Us', href: '/about', order: 2 },
      { label: 'Menu', href: '/why-body-art', order: 3 },
      { label: 'Contact', href: '/contact', order: 4 },
      { label: 'Reserve Table', href: '/join', order: 5 },
    ];

    for (const item of navItems) {
      await addDoc(collection(db, 'navigation'), item);
    }
  } catch (error) {
    console.error('Error initializing restaurant navigation:', error);
    throw error;
  }
};

const initializeRestaurantTestimonials = async () => {
  try {
    const testimonials = [
      {
        name: 'Robert Johnson',
        role: 'Food Enthusiast',
        content: 'Absolutely incredible dining experience! The flavors were outstanding and the service was impeccable. This is now our go-to restaurant for special occasions.',
        rating: 5,
        image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        order: 1
      },
      {
        name: 'Maria Garcia',
        role: 'Regular Customer',
        content: 'The ambiance is perfect for romantic dinners and the food quality is consistently excellent. The chef really knows how to create magic with ingredients!',
        rating: 5,
        image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        order: 2
      },
      {
        name: 'David Chen',
        role: 'Business Client',
        content: 'Perfect venue for business dinners. The private dining area is elegant and the service is professional. Highly recommended for corporate events.',
        rating: 5,
        image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        order: 3
      },
      {
        name: 'Sarah Williams',
        role: 'Anniversary Celebration',
        content: 'Celebrated our 10th anniversary here and it was magical! The staff went above and beyond to make our evening special. The dessert was heavenly!',
        rating: 5,
        image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        order: 4
      }
    ];

    for (const testimonial of testimonials) {
      await addDoc(collection(db, 'testimonials'), testimonial);
    }
  } catch (error) {
    console.error('Error initializing restaurant testimonials:', error);
    throw error;
  }
};

const initializeRestaurantHomePageContent = async () => {
  try {
    await setDoc(doc(db, 'pages', 'home'), {
      hero: {
        title: 'Savory Delights',
        subtitle: 'Restaurant',
        description: 'Experience exceptional cuisine crafted with passion, fresh ingredients, and culinary expertise in an elegant dining atmosphere.',
        backgroundImage: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
        primaryButtonText: 'Reserve Table',
        primaryButtonLink: '/join',
        secondaryButtonText: 'View Menu',
        secondaryButtonLink: '/why-body-art'
      },
      intro: {
        title: 'Welcome to Savory Delights',
        description: 'Where culinary artistry meets exceptional hospitality. Our passionate chefs create memorable dining experiences using the finest ingredients and innovative techniques. Every dish tells a story of flavor, tradition, and creativity.',
        image: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
      },
      services: {
        title: 'Our Dining Experiences',
        subtitle: 'Exceptional cuisine for every occasion',
        services: [
          {
            title: 'Fine Dining',
            description: 'Elegant multi-course meals crafted by our expert chefs',
            image: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
            features: ['Chef\'s Tasting Menu', 'Wine Pairing', 'Premium Ingredients', 'Elegant Presentation']
          },
          {
            title: 'Private Events',
            description: 'Exclusive dining experiences for special celebrations',
            image: 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
            features: ['Private Dining Rooms', 'Custom Menus', 'Event Planning', 'Professional Service']
          },
          {
            title: 'Catering Services',
            description: 'Bring our exceptional cuisine to your special events',
            image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
            features: ['Corporate Catering', 'Wedding Catering', 'Party Platters', 'Full-Service Setup']
          }
        ]
      },
      features: {
        title: 'Why Choose Savory Delights?',
        subtitle: 'Experience the difference in every bite',
        features: [
          {
            icon: '👨‍🍳',
            title: 'Expert Chefs',
            description: 'Award-winning chefs with international culinary experience',
            image: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'
          },
          {
            icon: '🥗',
            title: 'Fresh Ingredients',
            description: 'Locally sourced, premium ingredients delivered daily',
            image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'
          },
          {
            icon: '🍷',
            title: 'Fine Wine Selection',
            description: 'Curated wine collection from renowned vineyards worldwide',
            image: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'
          }
        ]
      },
      stats: {
        title: 'A Legacy of Culinary Excellence',
        backgroundImage: 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=1920&h=600&fit=crop',
        stats: [
          { number: '10000', label: 'Happy Diners', suffix: '+' },
          { number: '25', label: 'Expert Chefs', suffix: '+' },
          { number: '12', label: 'Years of Excellence', suffix: '+' },
          { number: '200', label: 'Signature Dishes', suffix: '+' }
        ]
      },
      cta: {
        title: 'Ready for an Unforgettable Meal?',
        subtitle: 'Reserve Your Table Today',
        description: 'Join us for an exceptional dining experience that will delight your senses and create lasting memories.',
        backgroundImage: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=1920&h=800&fit=crop',
        primaryButtonText: 'Reserve Now',
        primaryButtonLink: '/join',
        secondaryButtonText: 'Call Now',
        phone: '+1 (555) 345-6789'
      }
    });
  } catch (error) {
    console.error('Error initializing restaurant home page content:', error);
    throw error;
  }
};

const initializeRestaurantAboutPageSections = async () => {
  try {
    const aboutSections = [
      {
        pageId: 'about',
        type: 'image-text',
        title: 'About Savory Delights Restaurant',
        content: 'Established in 2012, Savory Delights Restaurant has been serving exceptional cuisine with a commitment to quality, creativity, and hospitality. Our award-winning chefs combine traditional techniques with modern innovation to create unforgettable dining experiences.',
        image: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
        imagePosition: 'right',
        backgroundColor: 'bg-white',
        order: 1
      },
      {
        pageId: 'about',
        type: 'features',
        title: 'Our Culinary Philosophy',
        features: [
          {
            icon: '🌱',
            title: 'Farm to Table',
            description: 'Fresh, locally sourced ingredients delivered daily'
          },
          {
            icon: '👨‍🍳',
            title: 'Culinary Artistry',
            description: 'Expert chefs creating innovative and delicious dishes'
          },
          {
            icon: '🍷',
            title: 'Perfect Pairings',
            description: 'Curated wine selection to complement every meal'
          },
          {
            icon: '🏆',
            title: 'Award Winning',
            description: 'Recognized for excellence in cuisine and service'
          }
        ],
        backgroundColor: 'bg-gray-50',
        order: 2
      }
    ];

    for (const section of aboutSections) {
      await addDoc(collection(db, 'sections'), section);
    }
  } catch (error) {
    console.error('Error initializing restaurant about page sections:', error);
    throw error;
  }
};

const initializeRestaurantMenuPageSections = async () => {
  try {
    const menuSections = [
      {
        pageId: 'why-body-art',
        type: 'text',
        title: 'Our Exquisite Menu',
        content: 'Discover our carefully crafted menu featuring seasonal specialties, signature dishes, and culinary innovations that celebrate the art of fine dining.',
        backgroundColor: 'bg-white',
        order: 1
      },
      {
        pageId: 'why-body-art',
        type: 'features',
        title: 'Menu Highlights',
        features: [
          {
            icon: '🥩',
            title: 'Premium Steaks',
            description: 'Aged beef cuts grilled to perfection with signature seasonings'
          },
          {
            icon: '🦞',
            title: 'Fresh Seafood',
            description: 'Daily catch prepared with Mediterranean and Asian influences'
          },
          {
            icon: '🥗',
            title: 'Garden Fresh Salads',
            description: 'Organic vegetables and greens with house-made dressings'
          },
          {
            icon: '🍝',
            title: 'Artisan Pasta',
            description: 'Handmade pasta with traditional and contemporary sauces'
          },
          {
            icon: '🍰',
            title: 'Decadent Desserts',
            description: 'House-made desserts crafted by our pastry chef'
          },
          {
            icon: '🍷',
            title: 'Wine Collection',
            description: 'Extensive wine list featuring local and international selections'
          }
        ],
        backgroundColor: 'bg-gray-50',
        order: 2
      }
    ];

    for (const section of menuSections) {
      await addDoc(collection(db, 'sections'), section);
    }
  } catch (error) {
    console.error('Error initializing restaurant menu page sections:', error);
    throw error;
  }
};

const initializeRestaurantContactPageContent = async () => {
  try {
    await setDoc(doc(db, 'pages', 'contact'), {
      hero: {
        title: 'Contact Us',
        subtitle: 'Ready for an exceptional dining experience? Get in touch with us today!',
        backgroundImage: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=1920&h=600&fit=crop'
      },
      content: {
        title: 'Get In Touch',
        subtitle: 'We\'re here to make your dining experience memorable',
        description: 'Have questions about our menu, want to make a reservation, or planning a special event? Our friendly team is ready to assist you with all your dining needs.'
      }
    });
  } catch (error) {
    console.error('Error initializing restaurant contact page content:', error);
    throw error;
  }
};

const initializeRestaurantReservationPageContent = async () => {
  try {
    await setDoc(doc(db, 'pages', 'join'), {
      hero: {
        title: 'Reserve Your Table',
        subtitle: 'Experience exceptional dining at Savory Delights Restaurant',
        backgroundImage: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=1920&h=800&fit=crop'
      },
      form: {
        title: 'Table Reservation',
        subtitle: 'Fill out this form and we\'ll contact you to confirm your reservation.',
        description: 'Our team will review your reservation request and contact you within 1 hour to confirm your table and any special arrangements.'
      },
      benefits: {
        title: 'Dining Experience',
        benefits: [
          {
            icon: '👨‍🍳',
            title: 'Expert Chefs',
            description: 'Award-winning culinary team'
          },
          {
            icon: '🌱',
            title: 'Fresh Ingredients',
            description: 'Locally sourced, premium quality'
          },
          {
            icon: '🏛️',
            title: 'Elegant Ambiance',
            description: 'Sophisticated dining atmosphere'
          },
          {
            icon: '🍷',
            title: 'Wine Selection',
            description: 'Curated wine collection'
          },
          {
            icon: '🎉',
            title: 'Private Events',
            description: 'Special occasion dining'
          },
          {
            icon: '⭐',
            title: 'Premium Service',
            description: 'Exceptional hospitality'
          }
        ]
      }
    });
  } catch (error) {
    console.error('Error initializing restaurant reservation page content:', error);
    throw error;
  }
};