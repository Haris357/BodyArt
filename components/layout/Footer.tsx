'use client';

import Link from 'next/link';
import { Dumbbell, Instagram, Phone, Mail, MapPin } from 'lucide-react';
import { useSiteSettings } from '@/hooks/useFirestore';

export default function Footer() {
  const { settings } = useSiteSettings();

  if (!settings) {
    return null;
  }
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="p-2 theme-bg-gradient rounded-lg">
                <Dumbbell className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold">
                {settings.siteName}
              </span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              {settings.footerDescription}
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3">
              {settings.address && (
                <div className="flex items-center space-x-3">
                  <MapPin className="h-4 w-4 theme-text-primary" />
                  <span className="text-gray-300">{settings.address}</span>
                </div>
              )}
              {settings.phone && (
                <div className="flex items-center space-x-3">
                  <Phone className="h-4 w-4 theme-text-primary" />
                  <span className="text-gray-300">{settings.phone}</span>
                </div>
              )}
              {settings.email && (
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 theme-text-primary" />
                  <span className="text-gray-300">{settings.email}</span>
                </div>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <div className="space-y-3">
              <Link href="/about" className="block text-gray-300 theme-text-primary-hover transition-colors">
                About Us
              </Link>
              <Link href="/why" className="block text-gray-300 theme-text-primary-hover transition-colors">
                Why Us?
              </Link>
              <Link href="/contact" className="block text-gray-300 theme-text-primary-hover transition-colors">
                Contact
              </Link>
              <Link href="/join" className="block text-gray-300 theme-text-primary-hover transition-colors">
                Join Now
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2025 {settings.siteName}. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            {settings.instagram && (
              <a 
                href={settings.instagram} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-orange-500 transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}