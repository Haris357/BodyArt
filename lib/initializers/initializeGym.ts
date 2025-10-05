import { db } from '../firebase';
import { doc, setDoc, collection, addDoc } from 'firebase/firestore';
import { clearAllData } from '../firestore';
import { toast } from 'sonner';

export const initializeGymData = async () => {
  if (!db) {
    throw new Error('Firestore not configured');
  }

  console.log('🏋️ Initializing Gym/Fitness data...');
  
  // Clear all existing data first
  await clearAllData();

  try {
    // Site Settings
    await setDoc(doc(db, 'siteSettings', 'main'), {
      siteName: 'Body Art Fitness',
      siteTitle: 'Body Art Fitness - Transform Your Body, Transform Your Life',
      siteDescription: 'Join Body Art Fitness and experience world-class training with state-of-the-art equipment and expert trainers. Transform your body, transform your life.',
      footerDescription: 'Where fitness meets artistry. We believe that sculpting your body is an art form, and every member is an artist creating their masterpiece.',
      logoType: 'icon',
      logoIcon: 'Dumbbell',
      logoImageUrl: '',
      address: '123 Fitness Street, Muscle City, MC 12345',
      phone: '+1 (555) 123-4567',
      email: 'info@bodyartfitness.com',
      hours: 'Mon-Fri: 5:00 AM - 11:00 PM\nSat-Sun: 6:00 AM - 10:00 PM',
      instagram: 'https://instagram.com/bodyartfitness',
      mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.123456789!2d-74.0059413!3d40.7127753!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQyJzQ2LjAiTiA3NMKwMDAnMjEuNCJX!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus',
      colorTheme: 'orange-red'
    });

    // Home Page Content
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
        description: 'Where fitness meets artistry. We believe that sculpting your body is an art form, and every member is an artist creating their masterpiece.',
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
      cta: {
        title: 'Ready to Transform Your Life?',
        subtitle: 'Join Body Art Fitness Today',
        description: 'Take the first step towards a healthier, stronger, and more confident you.',
        backgroundImage: 'https://images.pexels.com/photos/1552103/pexels-photo-1552103.jpeg?auto=compress&cs=tinysrgb&w=1920&h=800&fit=crop',
        primaryButtonText: 'Start Your Journey',
        primaryButtonLink: '/join',
        secondaryButtonText: 'Call Now',
        phone: '+1 (555) 123-4567'
      }
    });

    // Contact Page Content
    await setDoc(doc(db, 'pages', 'contact'), {
      hero: {
        title: 'Contact Us',
        subtitle: 'Ready to start your fitness journey? Get in touch with us today!',
        backgroundImage: 'https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg?auto=compress&cs=tinysrgb&w=1920&h=600&fit=crop'
      },
      content: {
        title: 'Get In Touch',
        subtitle: 'We\'re here to help you achieve your fitness goals',
        description: 'Have questions about our programs, facilities, or membership options? Our friendly team is ready to assist you with personalized fitness solutions and answer any questions you may have about starting your fitness journey.'
      }
    });

    // Join Page Content (Membership Page)
    await setDoc(doc(db, 'pages', 'join'), {
      hero: {
        title: 'Join Body Art Fitness',
        subtitle: 'Take the first step towards a healthier, stronger you. Join our fitness family today!',
        backgroundImage: 'https://images.pexels.com/photos/1552103/pexels-photo-1552103.jpeg?auto=compress&cs=tinysrgb&w=1920&h=600&fit=crop'
      },
      form: {
        title: 'Membership Application',
        subtitle: 'Fill out this form and we\'ll contact you to discuss the best membership plan for your goals.',
        description: 'Please provide your details and fitness goals. Our team will call you within 24 hours to schedule a free consultation and tour of our facilities.',
        dropdownLabel: 'Primary Fitness Goal',
        dropdownPlaceholder: 'Select your primary fitness goal',
        dropdownOptions: [
          { label: 'Weight Loss & Fat Burning', value: 'weight-loss' },
          { label: 'Muscle Building & Strength', value: 'muscle-gain' },
          { label: 'General Fitness & Health', value: 'general-fitness' },
          { label: 'Athletic Performance', value: 'athletic-performance' },
          { label: 'Rehabilitation & Recovery', value: 'rehabilitation' },
          { label: 'Endurance & Cardio', value: 'endurance' },
          { label: 'Flexibility & Mobility', value: 'flexibility' },
          { label: 'Body Transformation', value: 'transformation' }
        ]
      },
      benefits: {
        title: 'Why Choose Body Art Fitness',
        benefits: [
          { icon: '🏋️‍♂️', title: 'Professional Equipment', description: 'State-of-the-art fitness equipment from leading brands' },
          { icon: '👨‍🏫', title: 'Expert Trainers', description: 'Certified professionals with years of experience' },
          { icon: '🥗', title: 'Nutrition Guidance', description: 'Comprehensive meal planning and nutritional support' },
          { icon: '🏆', title: 'Proven Results', description: 'Track record of helping members achieve their goals' },
          { icon: '🤝', title: 'Community Support', description: 'Supportive fitness community that motivates each other' },
          { icon: '⏰', title: '24/7 Access', description: 'Round-the-clock access to fit your busy schedule' }
        ]
      }
    });

    // Navigation
    const navItems = [
      { label: 'Home', href: '/', order: 0 },
      { label: 'About Us', href: '/about', order: 1 },
      { label: 'Services', href: '/services', order: 2 },
      { label: 'Why Body Art?', href: '/why', order: 3 },
      { label: 'Contact', href: '/contact', order: 4 },
      { label: 'Join Now', href: '/join', order: 5 }
    ];

    for (const item of navItems) {
      await addDoc(collection(db, 'navigation'), { ...item, visible: true });
    }

    // Services Page Content
    await setDoc(doc(db, 'pages', 'services'), {
      hero: {
        title: 'Our Fitness Packages',
        subtitle: 'Choose the perfect membership plan that fits your fitness goals and lifestyle',
        backgroundImage: 'https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg?auto=compress&cs=tinysrgb&w=1920&h=600&fit=crop'
      },
      packages: {
        title: 'Membership Plans',
        subtitle: 'Flexible options designed to help you achieve your fitness goals',
        packages: [
          {
            name: 'Basic Membership',
            price: '49',
            period: 'month',
            description: 'Perfect for getting started on your fitness journey',
            icon: '🏃‍♂️',
            features: [
              'Access to gym equipment',
              'Locker room facilities',
              'Basic fitness assessment',
              'Mobile app access',
              'Guest passes (2/month)'
            ],
            buttonText: 'Start Basic',
            featured: false,
            badge: ''
          },
          {
            name: 'Premium Membership',
            price: '89',
            period: 'month',
            description: 'Most popular choice with additional benefits',
            icon: '💪',
            features: [
              'Everything in Basic',
              'Unlimited group classes',
              'Personal training session (1/month)',
              'Nutrition consultation',
              'Priority booking',
              'Guest passes (5/month)',
              'Towel service'
            ],
            buttonText: 'Go Premium',
            featured: true,
            badge: 'Most Popular'
          },
          {
            name: 'Elite Membership',
            price: '149',
            period: 'month',
            description: 'Ultimate fitness experience with premium perks',
            icon: '👑',
            features: [
              'Everything in Premium',
              'Unlimited personal training',
              'Advanced body composition analysis',
              'Meal planning service',
              'Recovery & spa access',
              'Unlimited guest passes',
              'Priority equipment access',
              'Exclusive member events'
            ],
            buttonText: 'Join Elite',
            featured: false,
            badge: 'Premium'
          }
        ]
      }
    });

    // Email Settings
    await setDoc(doc(db, 'emailSettings', 'main'), {
      adminEmail: 'admin@bodyartfitness.com',
      contactEmailTemplate: {
        subject: 'Thank you for contacting Body Art Fitness!',
        body: `Dear {{name}},

Thank you for reaching out to Body Art Fitness! We have received your message and will get back to you within 24 hours.

Your Message:
{{message}}

We're excited to help you start your fitness journey and answer any questions you may have about our programs, facilities, or membership options.

Best regards,
Body Art Fitness Team

📍 123 Fitness Street, Muscle City, MC 12345
📞 +1 (555) 123-4567
🌐 www.bodyartfitness.com`
      },
      joinEmailTemplate: {
        subject: 'Welcome to Body Art Fitness! Your application has been received',
        body: `Dear {{name}},

Thank you for your interest in joining Body Art Fitness! We have received your membership application and are excited to help you achieve your fitness goals.

Application Details:
- Fitness Goal: {{goal}}
- Phone: {{phone}}
{{#notes}}
- Additional Notes: {{notes}}
{{/notes}}

Our team will contact you within 24 hours to:
• Schedule your complimentary fitness consultation
• Provide a guided tour of our facilities
• Discuss the best membership plan for your goals
• Answer any questions you may have

Get ready to transform your body and transform your life!

Best regards,
Body Art Fitness Team

📍 123 Fitness Street, Muscle City, MC 12345
📞 +1 (555) 123-4567
🌐 www.bodyartfitness.com`
      },
      adminNotificationTemplate: {
        subject: 'New {{formType}} submission - Body Art Fitness',
        body: `New {{formType}} submission received:

👤 Name: {{name}}
📧 Email: {{email}}
📞 Phone: {{phone}}
{{#goal}}
🎯 Goal: {{goal}}
{{/goal}}
{{#message}}
💬 Message: {{message}}
{{/message}}
{{#notes}}
📝 Notes: {{notes}}
{{/notes}}

⏰ Submitted at: {{timestamp}}

Please follow up with the customer promptly to provide excellent service.

Body Art Fitness Admin Panel`
      }
    });

    // Sample Testimonials
    const testimonials = [
      {
        name: 'Sarah Johnson',
        role: 'Weight Loss Success Story',
        content: 'Body Art Fitness transformed my life! I lost 35 pounds in 6 months and gained so much confidence. The trainers are amazing and the equipment is top-notch.',
        rating: 5,
        image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        order: 0
      },
      {
        name: 'Mike Chen',
        role: 'Personal Training Client',
        content: 'The personal training program is incredible! My trainer helped me build muscle and improve my overall fitness. I\'ve never felt stronger or more energetic.',
        rating: 5,
        image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        order: 1
      },
      {
        name: 'Emily Rodriguez',
        role: 'Group Class Enthusiast',
        content: 'The group classes are so motivating! I look forward to every workout session. The community here is supportive and the instructors are fantastic.',
        rating: 5,
        image: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        order: 2
      },
      {
        name: 'David Thompson',
        role: 'Strength Training Member',
        content: 'Amazing facility with professional-grade equipment. The trainers know their stuff and helped me achieve my strength goals faster than I thought possible.',
        rating: 5,
        image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        order: 3
      },
      {
        name: 'Lisa Park',
        role: 'Nutrition Coaching Client',
        content: 'The nutrition coaching changed everything for me. Not only did I lose weight, but I learned how to maintain a healthy lifestyle. Highly recommend!',
        rating: 5,
        image: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
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
        title: 'Our Story',
        content: 'Founded in 2010, Body Art Fitness has been dedicated to helping people transform their lives through fitness. We believe that every body is a canvas, and fitness is the art of sculpting your masterpiece. Our journey began with a simple mission: to create a space where fitness meets artistry, where every workout is a step towards creating the best version of yourself.',
        image: 'https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
        imagePosition: 'right',
        backgroundColor: 'bg-white',
        pageId: 'about',
        order: 0
      },
      {
        type: 'features',
        title: 'What Makes Us Different',
        features: [
          { icon: '🏆', title: 'Award-Winning Trainers', description: 'Our certified trainers have won multiple fitness industry awards and bring years of expertise to help you achieve your goals' },
          { icon: '🔬', title: 'Science-Based Approach', description: 'Every program is backed by the latest fitness and nutrition research, ensuring you get the most effective workouts' },
          { icon: '🤝', title: 'Community Focus', description: 'Join a supportive community that celebrates every victory, big or small, and motivates each other to reach new heights' },
          { icon: '🎯', title: 'Personalized Programs', description: 'Custom workout and nutrition plans tailored specifically to your goals, fitness level, and lifestyle' },
          { icon: '📱', title: 'Technology Integration', description: 'Advanced fitness tracking, mobile app access, and digital progress monitoring to keep you on track' },
          { icon: '🏥', title: 'Health & Safety First', description: 'Comprehensive health screenings, injury prevention protocols, and medical professional partnerships' }
        ],
        backgroundColor: 'bg-gray-50',
        pageId: 'about',
        order: 1
      },
      {
        type: 'image-text',
        title: 'Our Mission',
        content: 'At Body Art Fitness, we\'re more than just a gym – we\'re your partners in transformation. Our mission is to provide world-class fitness facilities, expert guidance, and unwavering support to help you achieve your health and fitness goals. We believe that fitness is not just about physical transformation, but about building confidence, discipline, and a positive mindset that extends to every area of your life.',
        image: 'https://images.pexels.com/photos/1552106/pexels-photo-1552106.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
        imagePosition: 'left',
        backgroundColor: 'bg-white',
        pageId: 'about',
        order: 2
      },
      {
        type: 'video',
        title: 'Member Success Stories',
        videoLayout: 'single',
        videos: [
          {
            title: 'Transformation Journey',
            url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            description: 'Watch real member transformation stories and testimonials'
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

    // Why Body Art Page Sections
    const whyPageSections = [
      {
        type: 'features',
        title: 'Why Choose Body Art Fitness?',
        features: [
          { icon: '🏋️‍♂️', title: 'Professional Equipment', description: 'Top-of-the-line fitness equipment from leading brands like Technogym, Life Fitness, and Hammer Strength' },
          { icon: '👨‍🏫', title: 'Expert Trainers', description: 'Certified professionals with NASM, ACSM, and specialized certifications in various fitness disciplines' },
          { icon: '🥗', title: 'Nutrition Guidance', description: 'Comprehensive meal planning, macro tracking, and nutritional support from registered dietitians' },
          { icon: '🏆', title: 'Proven Results', description: 'Over 2000 successful transformations with documented before and after results' },
          { icon: '🤝', title: 'Community Support', description: 'Supportive fitness community with group challenges, social events, and accountability partners' },
          { icon: '⏰', title: '24/7 Access', description: 'Round-the-clock access with secure keycard entry to fit your busy schedule' },
          { icon: '🧘‍♀️', title: 'Mind-Body Wellness', description: 'Yoga, meditation, and stress management programs for complete wellness' },
          { icon: '📊', title: 'Progress Tracking', description: 'Advanced body composition analysis, fitness assessments, and digital progress monitoring' },
          { icon: '🏊‍♂️', title: 'Diverse Programs', description: 'Swimming, martial arts, dance fitness, and specialized athletic training programs' }
        ],
        backgroundColor: 'bg-white',
        pageId: 'why',
        order: 0
      },
      {
        type: 'image-text',
        title: 'State-of-the-Art Facilities',
        content: 'Our 15,000 square foot facility features the latest in fitness technology and equipment. From our Olympic-standard weightlifting area to our dedicated functional training zone, every space is designed to help you achieve your fitness goals safely and effectively. We maintain the highest standards of cleanliness and equipment maintenance to ensure your workout experience is always exceptional.',
        image: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
        imagePosition: 'right',
        backgroundColor: 'bg-gray-50',
        pageId: 'why',
        order: 1
      },
      {
        type: 'video',
        title: 'See Our Gym in Action',
        videoLayout: 'horizontal',
        videos: [
          {
            title: 'Virtual Gym Tour',
            url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            description: 'Take a complete tour of our state-of-the-art facility'
          },
          {
            title: 'Training Techniques',
            url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            description: 'Watch our expert trainers demonstrate proper form'
          },
          {
            title: 'Member Success Stories',
            url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            description: 'Hear from members who transformed their lives'
          }
        ],
        backgroundColor: 'bg-white',
        pageId: 'why',
        order: 2
      }
    ];

    for (const section of whyPageSections) {
      await addDoc(collection(db, 'sections'), section);
    }

    console.log('✅ Gym data initialization completed successfully!');
    return { success: true, message: 'Gym data initialized successfully!' };

  } catch (error) {
    console.error('❌ Error initializing gym data:', error);
    throw error;
  }
};