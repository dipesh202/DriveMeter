// Email Service for DriveMeter
// This service handles sending emails including welcome messages for new users

class EmailService {
  constructor() {
    this.API_KEY = process.env.REACT_APP_EMAIL_API_KEY;
    this.FROM_EMAIL = process.env.REACT_APP_FROM_EMAIL || 'noreply@drivemeter.com';
    this.FROM_NAME = process.env.REACT_APP_FROM_NAME || 'DriveMeter Team';
    this.USE_REAL_EMAIL = process.env.REACT_APP_USE_REAL_EMAIL === 'true';
  }

  // Welcome email template
  getWelcomeEmailTemplate(data) {
    const { userName, userEmail, registrationDate } = data;
    
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to DriveMeter</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #1976d2, #42a5f5); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
          .logo { font-size: 28px; font-weight: bold; margin-bottom: 10px; }
          .welcome-text { font-size: 18px; margin-bottom: 20px; }
          .features { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .feature-item { margin: 15px 0; padding: 10px; border-left: 4px solid #1976d2; }
          .cta-button { display: inline-block; background: #1976d2; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          .footer { text-align: center; color: #666; font-size: 14px; margin-top: 30px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">🚗 DriveMeter</div>
            <div class="welcome-text">Welcome to the Future of Vehicle Management!</div>
          </div>
          
          <div class="content">
            <h2>Hello ${userName}! 👋</h2>
            
            <p>Welcome to DriveMeter! We're thrilled to have you join our community of smart vehicle owners.</p>
            
            <p>Your account has been successfully created on ${new Date(registrationDate).toLocaleDateString('en-IN', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}.</p>
            
            <div class="features">
              <h3>🌟 What you can do with DriveMeter:</h3>
              
              <div class="feature-item">
                <strong>🔍 Vehicle Information Lookup</strong><br>
                Get complete vehicle details by just entering the registration number
              </div>
              
              <div class="feature-item">
                <strong>🏛️ Government Services Integration</strong><br>
                Access RTO services, RC verification, and challan checking in one place
              </div>
              
              <div class="feature-item">
                <strong>🤖 AI-Powered Recommendations</strong><br>
                Get personalized suggestions for accessories, insurance, and services
              </div>
              
              <div class="feature-item">
                <strong>📊 Personal Dashboard</strong><br>
                Track your vehicles, service reminders, and expenses
              </div>
              
              <div class="feature-item">
                <strong>🛡️ Insurance Services</strong><br>
                Compare and renew insurance policies with ease
              </div>
              
              <div class="feature-item">
                <strong>🚙 Vehicle Marketplace</strong><br>
                Browse new vehicles or sell your current one with AI valuation
              </div>
            </div>
            
            <div style="text-align: center;">
              <a href="${window.location.origin}/dashboard" class="cta-button">
                Get Started Now →
              </a>
            </div>
            
            <p><strong>Need Help?</strong></p>
            <p>Our support team is here to help you get the most out of DriveMeter:</p>
            <ul>
              <li>📧 Email: support@drivemeter.com</li>
              <li>📱 WhatsApp: +91 98765 43210</li>
              <li>🌐 Help Center: <a href="${window.location.origin}/help">drivemeter.com/help</a></li>
            </ul>
            
            <p>Thank you for choosing DriveMeter. We're excited to help you manage your vehicles smarter!</p>
            
            <p>Best regards,<br>
            <strong>The DriveMeter Team</strong></p>
          </div>
          
          <div class="footer">
            <p>© 2024 DriveMeter. All rights reserved.</p>
            <p>This email was sent to ${userEmail}. If you didn't create an account, please ignore this email.</p>
            <p><a href="${window.location.origin}/unsubscribe">Unsubscribe</a> | <a href="${window.location.origin}/privacy">Privacy Policy</a></p>
          </div>
        </div>
      </body>
      </html>
    `;

    const textContent = `
Welcome to DriveMeter!

Hello ${userName}!

Welcome to DriveMeter! We're thrilled to have you join our community of smart vehicle owners.

Your account has been successfully created on ${new Date(registrationDate).toLocaleDateString('en-IN')}.

What you can do with DriveMeter:

🔍 Vehicle Information Lookup
Get complete vehicle details by just entering the registration number

🏛️ Government Services Integration
Access RTO services, RC verification, and challan checking in one place

🤖 AI-Powered Recommendations
Get personalized suggestions for accessories, insurance, and services

📊 Personal Dashboard
Track your vehicles, service reminders, and expenses

🛡️ Insurance Services
Compare and renew insurance policies with ease

🚙 Vehicle Marketplace
Browse new vehicles or sell your current one with AI valuation

Get started: ${window.location.origin}/dashboard

Need Help?
📧 Email: support@drivemeter.com
📱 WhatsApp: +91 98765 43210
🌐 Help Center: drivemeter.com/help

Thank you for choosing DriveMeter. We're excited to help you manage your vehicles smarter!

Best regards,
The DriveMeter Team

---
© 2024 DriveMeter. All rights reserved.
This email was sent to ${userEmail}. If you didn't create an account, please ignore this email.
    `;

    return {
      subject: `Welcome to DriveMeter, ${userName}! 🚗`,
      htmlContent,
      textContent
    };
  }

  // Send welcome email
  async sendWelcomeEmail(userData) {
    try {
      if (!this.USE_REAL_EMAIL) {
        // Simulate email sending for development
        console.log('📧 Welcome Email Simulation');
        console.log('To:', userData.userEmail);
        console.log('Subject: Welcome to DriveMeter!');
        console.log('Content: Welcome email would be sent to', userData.userName);
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        return {
          success: true,
          message: 'Welcome email sent successfully (simulated)'
        };
      }

      // Real email sending implementation
      const template = this.getWelcomeEmailTemplate(userData);
      
      // Using SendGrid API (you can replace with your preferred email service)
      const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          personalizations: [{
            to: [{ email: userData.userEmail, name: userData.userName }],
            subject: template.subject
          }],
          from: {
            email: this.FROM_EMAIL,
            name: this.FROM_NAME
          },
          content: [
            {
              type: 'text/plain',
              value: template.textContent
            },
            {
              type: 'text/html',
              value: template.htmlContent
            }
          ],
          categories: ['welcome', 'user-onboarding'],
          custom_args: {
            user_id: userData.userEmail,
            email_type: 'welcome'
          }
        })
      });

      if (response.ok) {
        return {
          success: true,
          message: 'Welcome email sent successfully'
        };
      } else {
        const errorData = await response.json();
        console.error('Email sending failed:', errorData);
        return {
          success: false,
          message: 'Failed to send welcome email'
        };
      }
    } catch (error) {
      console.error('Error sending welcome email:', error);
      return {
        success: false,
        message: 'Error occurred while sending welcome email'
      };
    }
  }

  // Send general notification email
  async sendNotificationEmail(to, subject, content, isHtml = false) {
    try {
      if (!this.USE_REAL_EMAIL) {
        console.log('📧 Notification Email Simulation');
        console.log('To:', to);
        console.log('Subject:', subject);
        console.log('Content:', content.substring(0, 100) + '...');
        
        await new Promise(resolve => setTimeout(resolve, 500));
        
        return {
          success: true,
          message: 'Notification email sent successfully (simulated)'
        };
      }

      // Real email implementation for notifications
      const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          personalizations: [{
            to: [{ email: to }],
            subject: subject
          }],
          from: {
            email: this.FROM_EMAIL,
            name: this.FROM_NAME
          },
          content: [{
            type: isHtml ? 'text/html' : 'text/plain',
            value: content
          }],
          categories: ['notification']
        })
      });

      if (response.ok) {
        return {
          success: true,
          message: 'Notification email sent successfully'
        };
      } else {
        return {
          success: false,
          message: 'Failed to send notification email'
        };
      }
    } catch (error) {
      console.error('Error sending notification email:', error);
      return {
        success: false,
        message: 'Error occurred while sending notification email'
      };
    }
  }
}

export const emailService = new EmailService();
