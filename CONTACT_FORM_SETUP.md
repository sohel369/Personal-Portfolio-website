# Contact Form Setup Guide

This guide explains how to set up the contact form with email sending and database logging.

## Features

✅ Responsive contact form with validation  
✅ Email sending via Nodemailer (SMTP)  
✅ Database logging to Supabase  
✅ Form validation (client & server-side)  
✅ Error and success messages  
✅ Mobile-friendly design  

## Setup Instructions

### 1. Environment Variables

Update your `.env.local` file with the following SMTP configuration:

```env
# SMTP Configuration for Contact Form Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password-here
FROM_EMAIL=your-email@gmail.com
TO_EMAIL=sohel0130844@gmail.com
```

### 2. Gmail App Password Setup

If you're using Gmail, you need to create an App Password:

1. Go to your Google Account: https://myaccount.google.com/
2. Click **Security** in the left sidebar
3. Under "Signing in to Google", enable **2-Step Verification** (if not already enabled)
4. After enabling 2-Step Verification, go back to Security
5. Under "Signing in to Google", click **App passwords**
6. Select **Mail** and **Other (Custom name)**
7. Enter "Portfolio Contact Form" as the name
8. Click **Generate**
9. Copy the 16-character password (no spaces)
10. Use this password as `SMTP_PASS` in your `.env.local`

**Important:** Use the App Password, NOT your regular Gmail password!

### 3. Other Email Providers

#### Outlook/Hotmail
```env
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_USER=your-email@outlook.com
SMTP_PASS=your-password
```

#### Yahoo
```env
SMTP_HOST=smtp.mail.yahoo.com
SMTP_PORT=587
SMTP_USER=your-email@yahoo.com
SMTP_PASS=your-app-password
```

#### Custom SMTP Server
```env
SMTP_HOST=your-smtp-server.com
SMTP_PORT=587
SMTP_USER=your-username
SMTP_PASS=your-password
```

### 4. Supabase Database Setup

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Run the SQL from `supabase-setup.sql`:

```sql
CREATE TABLE IF NOT EXISTS contact_messages (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at 
ON contact_messages(created_at DESC);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow service role to insert contact messages"
  ON contact_messages
  FOR INSERT
  TO service_role
  WITH CHECK (true);

CREATE POLICY "Allow service role to read contact messages"
  ON contact_messages
  FOR SELECT
  TO service_role
  USING (true);
```

### 5. Test the Contact Form

1. Restart your Next.js dev server:
   ```bash
   npm run dev
   ```

2. Navigate to `http://localhost:3000/#contact`

3. Fill out the form and submit

4. Check:
   - ✅ Email arrives at `sohel0130844@gmail.com`
   - ✅ Message appears in Supabase `contact_messages` table
   - ✅ Success message displays in the form

## API Route: `/api/contact`

### Request
```json
POST /api/contact
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",  // optional
  "subject": "Project Inquiry",  // optional
  "message": "Hello, I'm interested in your services..."
}
```

### Response (Success)
```json
{
  "success": true,
  "message": "Message sent successfully! We'll get back to you soon.",
  "emailId": "message-id-from-email-service",
  "dbId": 123
}
```

### Response (Error)
```json
{
  "error": "Error message",
  "details": "Detailed error description"
}
```

## Form Fields

- **Name** (required): Full name of the sender
- **Email** (required): Valid email address
- **Phone** (optional): Phone number
- **Subject** (optional): Message subject
- **Message** (required): Message content

## Troubleshooting

### Email not sending?

1. **Check SMTP credentials** in `.env.local`
2. **Verify App Password** (for Gmail) - make sure you're using App Password, not regular password
3. **Check firewall/network** - ensure port 587 is not blocked
4. **Check server logs** - look for error messages in terminal
5. **Test SMTP connection** - the API route verifies SMTP connection on startup

### Database not saving?

1. **Check Supabase credentials** in `.env.local`
2. **Verify table exists** - run the SQL setup script
3. **Check RLS policies** - ensure service role has insert permissions
4. **Note:** Email will still send even if database save fails (non-critical)

### Form validation errors?

- Ensure all required fields are filled
- Check email format is valid
- Check browser console for JavaScript errors

## Security Notes

- ✅ Environment variables are never exposed to the client
- ✅ Server-side validation prevents malicious input
- ✅ Email addresses are validated
- ✅ SMTP credentials are secure
- ✅ Database uses Row Level Security (RLS)

## Files Structure

```
pages/
  api/
    contact.js          # API route for handling form submissions
components/
  Contact.js            # Contact form component
lib/
  supabase.js           # Supabase client configuration
.env.local              # Environment variables (not in git)
supabase-setup.sql      # Database setup script
```

## Support

If you encounter issues:
1. Check the terminal/console for error messages
2. Verify all environment variables are set correctly
3. Test SMTP connection separately
4. Check Supabase dashboard for database errors

