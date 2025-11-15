# SMTP Troubleshooting Guide

## Error: "Failed to connect to email server"

This error occurs when the contact form cannot connect to your email server. Follow these steps to fix it:

## Step 1: Check Your .env.local File

Open `.env.local` and verify your SMTP settings:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-actual-email@gmail.com
SMTP_PASS=your-16-character-app-password
FROM_EMAIL=your-actual-email@gmail.com
TO_EMAIL=sohel0130844@gmail.com
```

**Important:** Replace the placeholder values with your actual credentials!

## Step 2: Set Up Gmail App Password

If you're using Gmail, you **MUST** use an App Password, not your regular password.

### How to Create a Gmail App Password:

1. **Enable 2-Step Verification** (if not already enabled):
   - Go to https://myaccount.google.com/security
   - Under "Signing in to Google", click **2-Step Verification**
   - Follow the steps to enable it

2. **Create App Password**:
   - Go back to https://myaccount.google.com/security
   - Under "Signing in to Google", click **App passwords**
   - Select **Mail** as the app
   - Select **Other (Custom name)** as the device
   - Enter "Portfolio Contact Form" as the name
   - Click **Generate**
   - **Copy the 16-character password** (it looks like: `abcd efgh ijkl mnop`)
   - Remove spaces and use it as `SMTP_PASS` in `.env.local`

3. **Update .env.local**:
   ```env
   SMTP_USER=youremail@gmail.com
   SMTP_PASS=abcdefghijklmnop  # Your 16-character app password (no spaces)
   ```

## Step 3: Restart Your Dev Server

After updating `.env.local`, **restart your Next.js server**:

```bash
# Stop the server (Ctrl+C)
# Then start it again
npm run dev
```

## Step 4: Test the Connection

Try submitting the contact form again. If it still fails, check the terminal/console for detailed error messages.

## Common Error Codes and Solutions

### EAUTH (Authentication Failed)
- **Problem**: Wrong username or password
- **Solution**: 
  - Verify you're using an App Password (not regular password)
  - Check that SMTP_USER is your full email address
  - Make sure there are no extra spaces in SMTP_PASS

### ECONNECTION / ETIMEDOUT
- **Problem**: Cannot connect to SMTP server
- **Solution**:
  - Check your internet connection
  - Verify SMTP_HOST is correct (smtp.gmail.com for Gmail)
  - Check if port 587 is blocked by firewall
  - Try port 465 with secure: true

### EENVELOPE
- **Problem**: Invalid email address
- **Solution**:
  - Check TO_EMAIL and FROM_EMAIL are valid email addresses
  - Make sure FROM_EMAIL matches SMTP_USER

## Alternative: Use Different Email Provider

### Outlook/Hotmail
```env
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_USER=your-email@outlook.com
SMTP_PASS=your-password
FROM_EMAIL=your-email@outlook.com
TO_EMAIL=sohel0130844@gmail.com
```

### Yahoo
```env
SMTP_HOST=smtp.mail.yahoo.com
SMTP_PORT=587
SMTP_USER=your-email@yahoo.com
SMTP_PASS=your-app-password
FROM_EMAIL=your-email@yahoo.com
TO_EMAIL=sohel0130844@gmail.com
```

## Testing SMTP Settings

You can test your SMTP connection by checking the server logs when you submit the form. Look for:
- ✅ "SMTP connection verified successfully" = Good!
- ❌ "SMTP verification failed" = Check error details

## Still Having Issues?

1. **Check server logs**: Look at the terminal where `npm run dev` is running
2. **Verify environment variables**: Make sure `.env.local` is in the project root
3. **Check file encoding**: Ensure `.env.local` is saved as UTF-8
4. **No quotes needed**: Don't wrap values in quotes in `.env.local`
5. **Restart server**: Always restart after changing `.env.local`

## Example .env.local (Gmail)

```env
# OpenAI API
OPENAI_API_KEY=sk-proj-your-key-here

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# SMTP Configuration (Gmail)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=youremail@gmail.com
SMTP_PASS=abcdefghijklmnop
FROM_EMAIL=youremail@gmail.com
TO_EMAIL=sohel0130844@gmail.com
```

**Remember**: 
- Use App Password for Gmail (not regular password)
- No spaces in the App Password
- Restart server after changing .env.local
- Check terminal for detailed error messages

