# Dynamic Business Website Builder

A comprehensive, fully dynamic website builder with admin panel built with Next.js 13+, Firebase, and shadcn/ui. Create professional websites for gyms, beauty parlours, restaurants, and more with zero coding required.

## 🚀 Features

### Frontend
- **Dynamic Homepage**: Fully customizable hero sections, services, features, and content blocks
- **Multi-Page Support**: About, Services/Why, Contact, and Booking/Join pages
- **Responsive Design**: Mobile-first approach with smooth animations and micro-interactions
- **Dynamic Color Themes**: 20+ pre-built color themes with real-time preview
- **Professional Components**: Testimonials, stats sections, image galleries, and more

### Admin Panel
- **Secure Authentication**: Firebase Auth with predefined admin credentials
- **Business Templates**: One-click initialization for Gym, Beauty Parlour, or Restaurant
- **Complete Site Management**: Edit site name, contact info, social links, and branding
- **Dynamic Content Editor**: Visual page builder with drag-and-drop section management
- **Form Management**: View and manage contact and membership form submissions
- **Navigation Control**: Customize navigation menu items and structure
- **Color Theme Manager**: Switch between 20+ professional color schemes instantly

### Business Templates

#### 🏋️ Gym/Fitness Center
- Personal training services showcase
- Membership application forms
- Equipment and facility highlights
- Trainer profiles and expertise
- Class schedules and programs

#### 💄 Beauty Parlour/Salon
- Bridal makeup and styling services
- Treatment and service portfolios
- Appointment booking system
- Before/after galleries
- Skincare and beauty packages

#### 🍽️ Restaurant/Cafe
- Menu showcase with categories
- Table reservation system
- Chef specialties and signatures
- Event catering services
- Dining experience highlights

## 🛠️ Tech Stack

- **Frontend**: Next.js 13+ (App Router), TypeScript, React 18
- **UI Framework**: shadcn/ui, TailwindCSS with custom theme system
- **Backend**: Firebase (Firestore, Auth, Storage)
- **Forms**: React Hook Form with Zod validation
- **Icons**: Lucide React
- **Animations**: CSS transitions and transforms
- **Deployment**: Netlify ready

## 📋 Setup Instructions

### 1. Firebase Configuration

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or use existing one
3. Enable Authentication and Firestore Database
4. Enable Email/Password authentication method
5. Create a `.env.local` file with your Firebase configuration:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 2. Default Admin Credentials

- **Email**: admin@bodyartfitness.com
- **Password**: a1234567

### 3. Firebase Security Rules

**CRITICAL**: Update your Firestore security rules in Firebase Console → Firestore Database → Rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read access to public collections
    match /{collection}/{document} {
      allow read: if collection in ['siteSettings', 'pages', 'sections', 'testimonials', 'navigation'];
      allow write: if request.auth != null;
    }
    
    // Form submissions - allow creation by anyone, read/write by authenticated users
    match /formSubmissions/{document} {
      allow create: if true;
      allow read, update: if request.auth != null;
    }
  }
}
```

**Storage Rules** (if using image uploads):
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

### 4. Installation & Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🎨 Admin Panel Features

### Dashboard Overview
- Real-time statistics and metrics
- System status monitoring
- Quick action shortcuts
- Recent activity tracking

### Business Template Initialization
- **One-Click Setup**: Choose from Gym, Beauty Parlour, or Restaurant templates
- **Complete Data**: Includes sample content, navigation, testimonials, and sections
- **Professional Images**: Curated stock photos from Pexels
- **SEO Ready**: Optimized meta titles and descriptions

### Content Management
- **Visual Page Builder**: Add, edit, and reorder sections with drag-and-drop
- **Section Types**: Text, Image+Text, Features Grid, Statistics, Video embeds
- **Rich Content**: Support for HTML formatting and custom styling
- **Media Management**: Easy image URL integration

### Theme Customization
- **20+ Color Themes**: Professional color schemes for any business
- **Real-time Preview**: See changes instantly across the entire site
- **Brand Consistency**: Automatic application to all UI elements
- **Custom Gradients**: Beautiful gradient backgrounds and buttons

## 📁 Project Structure

```
├── app/
│   ├── admin/                    # Admin panel and login
│   ├── about/                    # About page
│   ├── contact/                  # Contact page
│   ├── join/                     # Membership/booking page
│   ├── why/                      # Services/why choose us page
│   ├── layout.tsx                # Root layout with theme provider
│   └── page.tsx                  # Dynamic homepage
├── components/
│   ├── admin/                    # Admin panel components
│   │   ├── AdminDashboard.tsx    # Main admin interface
│   │   ├── ColorThemePanel.tsx   # Theme management
│   │   ├── SiteSettingsPanel.tsx # Site configuration
│   │   └── editors/              # Page content editors
│   ├── layout/                   # Header and Footer
│   ├── sections/                 # Dynamic content sections
│   │   ├── HeroSection.tsx       # Homepage hero
│   │   ├── DynamicSection.tsx    # Flexible content sections
│   │   ├── TestimonialsSection.tsx # Customer testimonials
│   │   └── ...                   # Other section components
│   └── ui/                       # shadcn/ui components
├── hooks/
│   ├── useAuth.ts                # Authentication hook
│   └── useFirestore.ts           # Firestore data hooks
├── lib/
│   ├── firebase.ts               # Firebase configuration
│   ├── auth.ts                   # Authentication functions
│   ├── firestore.ts              # Database operations
│   ├── colorThemes.ts            # Theme definitions
│   └── initializers/             # Business template data
└── styles/
    └── globals.css               # Global styles and theme variables
```

## 🗄️ Database Collections

- **siteSettings**: Global site configuration and branding
- **pages**: Page-specific content (hero sections, forms, etc.)
- **sections**: Dynamic content sections for all pages
- **testimonials**: Customer testimonials and reviews
- **navigation**: Navigation menu items and structure
- **formSubmissions**: Contact and membership form submissions

## 🎯 Key Features

### Dynamic Content System
- **Flexible Sections**: Add any type of content section to any page
- **Visual Editor**: No coding required - edit content through intuitive forms
- **Reorderable**: Drag and drop sections to change page layout
- **Responsive**: All content automatically adapts to mobile devices

### Professional Design
- **Modern UI**: Clean, professional design suitable for any business
- **Smooth Animations**: Subtle hover effects and transitions
- **Typography**: Carefully chosen fonts and spacing for readability
- **Color Psychology**: Themes designed to match business types

### Form Management
- **Smart Forms**: Contact and membership forms with validation
- **Status Tracking**: Mark submissions as contacted, completed, etc.
- **Email Integration**: Forms capture all necessary contact information
- **Spam Protection**: Built-in form validation and security

### SEO Optimization
- **Dynamic Meta Tags**: Automatic title and description generation
- **Structured Data**: Proper HTML structure for search engines
- **Performance**: Optimized images and fast loading times
- **Mobile-First**: Responsive design for better mobile rankings

## 🚀 Getting Started

1. **Clone and Install**
   ```bash
   git clone <repository-url>
   cd dynamic-business-website
   npm install
   ```

2. **Configure Firebase**
   - Create Firebase project
   - Add configuration to `.env.local`
   - Set up security rules

3. **Initialize Business Data**
   - Navigate to `/admin`
   - Login with default credentials
   - Choose business template and initialize

4. **Customize Your Site**
   - Update site settings and branding
   - Choose color theme
   - Edit page content
   - Add testimonials

5. **Deploy**
   ```bash
   npm run build
   # Deploy to your preferred hosting platform
   ```

## 🎨 Customization

### Adding New Business Templates
1. Create initializer in `lib/initializers/`
2. Define site settings, pages, sections, and navigation
3. Add to business type selector in admin panel

### Creating Custom Sections
1. Add section type to `DynamicSection.tsx`
2. Create editor component in `components/admin/editors/`
3. Update section management forms

### Theme Development
1. Define color scheme in `lib/colorThemes.ts`
2. Add CSS variables to `globals.css`
3. Test across all components

## 📱 Mobile Responsiveness

- **Breakpoint System**: Tailored for mobile, tablet, and desktop
- **Touch-Friendly**: Large buttons and easy navigation
- **Performance**: Optimized images and lazy loading
- **Accessibility**: WCAG compliant design patterns

## 🔒 Security Features

- **Firebase Auth**: Secure authentication system
- **Row Level Security**: Firestore security rules
- **Form Validation**: Client and server-side validation
- **XSS Protection**: Sanitized content rendering

## 📈 Performance

- **Next.js 13+**: Latest performance optimizations
- **Image Optimization**: Automatic image compression
- **Code Splitting**: Lazy loading of components
- **Caching**: Efficient data fetching and caching

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

- **Documentation**: Check this README and inline code comments
- **Issues**: Report bugs via GitHub Issues
- **Firebase Setup**: Follow the detailed setup instructions above
- **Admin Access**: Use default credentials or create custom admin user

---

**Built with ❤️ using Next.js, Firebase, and shadcn/ui**