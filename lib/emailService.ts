// Email service for sending notifications
// Note: This is a client-side implementation for demonstration
// In production, you would use a server-side email service like SendGrid, Mailgun, or AWS SES

export interface EmailTemplate {
  subject: string;
  body: string;
}

export interface EmailData {
  name: string;
  email: string;
  phone?: string;
  message?: string;
  goal?: string;
  notes?: string;
  formType: 'contact' | 'membership';
  siteName: string;
  timestamp: string;
}

export const processEmailTemplate = (template: EmailTemplate, data: EmailData): EmailTemplate => {
  let processedSubject = template.subject;
  let processedBody = template.body;

  // Replace all variables in subject and body
  const variables = {
    '{{name}}': data.name,
    '{{email}}': data.email,
    '{{phone}}': data.phone || 'Not provided',
    '{{message}}': data.message || 'Not provided',
    '{{goal}}': data.goal || 'Not specified',
    '{{notes}}': data.notes || 'None',
    '{{formType}}': data.formType,
    '{{siteName}}': data.siteName,
    '{{timestamp}}': data.timestamp
  };

  // Replace variables in subject
  Object.entries(variables).forEach(([key, value]) => {
    processedSubject = processedSubject.replace(new RegExp(key, 'g'), value);
  });

  // Replace variables in body
  Object.entries(variables).forEach(([key, value]) => {
    processedBody = processedBody.replace(new RegExp(key, 'g'), value);
  });

  // Handle conditional sections ({{#variable}} content {{/variable}})
  processedBody = processedBody.replace(/\{\{#(\w+)\}\}(.*?)\{\{\/\1\}\}/gs, (match, variable, content) => {
    const value = variables[`{{${variable}}}`];
    return (value && value !== 'Not provided' && value !== 'None' && value !== 'Not specified') ? content : '';
  });

  return {
    subject: processedSubject,
    body: processedBody
  };
};

export const sendEmail = async (to: string, template: EmailTemplate, data: EmailData) => {
  // Process the template with dynamic data
  const processedTemplate = processEmailTemplate(template, data);
  
  console.log('📧 Email would be sent to:', to);
  console.log('📧 Subject:', processedTemplate.subject);
  console.log('📧 Body:', processedTemplate.body);
  
  // In a real implementation, you would integrate with an email service here
  // For now, we'll simulate the email sending
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('✅ Email sent successfully (simulated)');
      resolve({ success: true });
    }, 1000);
  });
};

export const sendFormNotificationEmails = async (formData: any, emailSettings: any, siteName: string) => {
  if (!emailSettings) {
    console.warn('No email settings configured');
    return;
  }

  const emailData: EmailData = {
    name: formData.name,
    email: formData.email,
    phone: formData.phone,
    message: formData.message,
    goal: formData.goal,
    notes: formData.notes,
    formType: formData.type,
    siteName: siteName,
    timestamp: new Date().toLocaleString()
  };

  try {
    // Send confirmation email to user
    const userTemplate = formData.type === 'contact' 
      ? emailSettings.contactEmailTemplate 
      : emailSettings.joinEmailTemplate;
    
    await sendEmail(formData.email, userTemplate, emailData);
    
    // Send notification email to admin
    if (emailSettings.adminEmail) {
      await sendEmail(emailSettings.adminEmail, emailSettings.adminNotificationTemplate, emailData);
    }
    
    console.log('✅ All notification emails sent successfully');
  } catch (error) {
    console.error('❌ Error sending emails:', error);
    throw error;
  }
};