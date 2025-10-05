'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, ExternalLink, CheckCircle } from 'lucide-react';

export default function FirebaseSetup() {
  const [step, setStep] = useState(1);

  const steps = [
    {
      title: "Create Firebase Project",
      description: "Go to Firebase Console and create a new project",
      action: "Open Firebase Console",
      link: "https://console.firebase.google.com/"
    },
    {
      title: "Get Configuration",
      description: "Add a web app and copy the configuration object",
      action: "View Instructions",
      link: "#"
    },
    {
      title: "Enable Services",
      description: "Enable Authentication and Firestore Database",
      action: "Setup Guide",
      link: "#"
    },
    {
      title: "Update Environment",
      description: "Add your Firebase config to .env.local file",
      action: "Complete Setup",
      link: "#"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <AlertTriangle className="h-12 w-12 theme-text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            Firebase Setup Required
          </CardTitle>
          <p className="text-gray-600">
            Complete these steps to activate your admin panel and forms
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {steps.map((stepItem, index) => (
            <div 
              key={index}
              className={`p-4 rounded-lg border-2 transition-all ${
                step > index + 1 
                  ? 'border-green-200 bg-green-50' 
                  : step === index + 1 
                    ? 'theme-border-primary theme-bg-primary-light' 
                    : 'border-gray-200 bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    step > index + 1 
                      ? 'bg-green-500 text-white' 
                      : step === index + 1 
                        ? 'theme-bg-primary text-white' 
                        : 'bg-gray-300 text-gray-600'
                  }`}>
                    {step > index + 1 ? <CheckCircle className="h-4 w-4" /> : index + 1}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{stepItem.title}</h3>
                    <p className="text-sm text-gray-600">{stepItem.description}</p>
                  </div>
                </div>
                <Button
                  variant={step === index + 1 ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    if (stepItem.link.startsWith('http')) {
                      window.open(stepItem.link, '_blank');
                    }
                    if (step === index + 1) {
                      setStep(step + 1);
                    }
                  }}
                  className={step === index + 1 ? "btn-theme-primary" : ""}
                >
                  {stepItem.action}
                  {stepItem.link.startsWith('http') && <ExternalLink className="h-4 w-4 ml-2" />}
                </Button>
              </div>
            </div>
          ))}

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 mb-2">Quick Setup Instructions:</h4>
            <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
              <li>Create Firebase project at console.firebase.google.com</li>
              <li>Add web app and copy the config object</li>
              <li>Enable Email/Password Authentication</li>
              <li>Create Firestore Database in <strong>test mode</strong></li>
              <li>Update .env.local with your Firebase config</li>
              <li>Restart the development server</li>
            </ol>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h4 className="font-semibold text-red-900 mb-2">⚠️ Important: Firestore Security Rules</h4>
            <p className="text-sm text-red-800 mb-3">
              After creating your Firestore database, you MUST update the security rules:
            </p>
            <div className="bg-gray-900 text-green-400 p-3 rounded text-xs font-mono overflow-x-auto">
              <pre>{`rules_version = '2';
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
    
    // Email settings - only authenticated users
    match /emailSettings/{document} {
      allow read, write: if request.auth != null;
    }
  }
}`}</pre>
            </div>
            <p className="text-sm text-red-800 mt-2">
              Go to Firebase Console → Firestore Database → Rules → Paste the above rules → Publish
            </p>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-semibold text-yellow-900 mb-2">Default Admin Credentials:</h4>
            <p className="text-sm text-yellow-800">
              <strong>Email:</strong> admin@bodyartfitness.com<br />
              <strong>Password:</strong> a1234567
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}