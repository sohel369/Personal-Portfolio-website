# Vercel Deployment Setup Guide

This guide explains how to configure environment variables in Vercel to fix the AI chat and contact form issues.

## Issues Fixed

✅ **AI Chat**: Now automatically uses a fallback chatbot when `OPENAI_API_KEY` is missing
✅ **Contact Form**: Now gracefully handles missing SMTP credentials and saves to database when available

## Required Environment Variables

### For AI Chat (Optional - Fallback works without it)

If you want to use OpenAI's GPT-3.5 for better responses:

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add the following variable:
   - **Name**: `OPENAI_API_KEY`
   - **Value**: Your OpenAI API key (starts with `sk-`)
   - **Environment**: Production, Preview, Development (select all)

**Note**: If you don't set this, the chat will automatically use a rule-based fallback chatbot that works without any API keys.

### For Contact Form Email Notifications

To enable email notifications when someone submits the contact form:

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add the following variables:

#### Gmail Setup (Recommended)

- **Name**: `SMTP_HOST`
  - **Value**: `smtp.gmail.com`
  - **Environment**: Production, Preview, Development

- **Name**: `SMTP_PORT`
  - **Value**: `587`
  - **Environment**: Production, Preview, Development

- **Name**: `SMTP_USER`
  - **Value**: Your Gmail address (e.g., `your-email@gmail.com`)
  - **Environment**: Production, Preview, Development

- **Name**: `SMTP_PASS`
  - **Value**: Your Gmail App Password (see instructions below)
  - **Environment**: Production, Preview, Development

- **Name**: `FROM_EMAIL`
  - **Value**: Your Gmail address (e.g., `your-email@gmail.com`)
  - **Environment**: Production, Preview, Development

- **Name**: `TO_EMAIL`
  - **Value**: Email address where you want to receive contact form submissions
  - **Environment**: Production, Preview, Development

#### How to Create a Gmail App Password

1. Go to your Google Account settings: https://myaccount.google.com/
2. Click on **Security** in the left sidebar
3. Under "Signing in to Google", enable **2-Step Verification** (if not already enabled)
4. After enabling 2-Step Verification, go back to Security
5. Under "Signing in to Google", click **App passwords**
6. Select **Mail** as the app and **Other (Custom name)** as the device
7. Enter "Portfolio Contact Form" as the name
8. Click **Generate**
9. Copy the 16-character password (it will look like: `abcd efgh ijkl mnop`)
10. Use this password (without spaces) as your `SMTP_PASS` value

**Important**: 
- You cannot use your regular Gmail password
- You must use an App Password
- The App Password is 16 characters (remove spaces when entering)

### For Supabase Database (Optional but Recommended)

If you want to save contact form submissions to a database:

- **Name**: `NEXT_PUBLIC_SUPABASE_URL`
  - **Value**: Your Supabase project URL
  - **Environment**: Production, Preview, Development

- **Name**: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - **Value**: Your Supabase anon/public key
  - **Environment**: Production, Preview, Development

- **Name**: `SUPABASE_SERVICE_ROLE_KEY`
  - **Value**: Your Supabase service role key (keep this secret!)
  - **Environment**: Production, Preview, Development

## After Adding Environment Variables

1. **Redeploy your application** in Vercel:
   - Go to **Deployments** tab
   - Click the three dots (⋯) on the latest deployment
   - Select **Redeploy**
   - Or push a new commit to trigger a new deployment

2. **Verify the setup**:
   - Test the AI chat widget (should work even without OpenAI API key)
   - Submit a test message through the contact form
   - Check your email inbox for the notification (if SMTP is configured)
   - Check your Supabase database (if configured)

## Current Behavior

### AI Chat
- ✅ Works without any configuration (uses fallback chatbot)
- ✅ Automatically uses OpenAI if `OPENAI_API_KEY` is set
- ✅ Falls back gracefully if OpenAI API fails

### Contact Form
- ✅ Works without SMTP configuration (saves to database if Supabase is configured)
- ✅ Sends email notifications if SMTP is configured
- ✅ Shows helpful error messages if configuration is missing
- ✅ Saves to database even if email fails

## Troubleshooting

### Chat shows "Error: Please check your .env.local file"
- This should no longer appear. The chat now automatically uses the fallback.
- If you still see errors, check Vercel logs for more details.

### Contact form shows "Network error"
- Check your internet connection
- Verify the API route is accessible: `/api/contact`
- Check Vercel function logs for errors
- Ensure environment variables are set correctly

### Email not sending
- Verify `SMTP_USER` and `SMTP_PASS` are set correctly
- Make sure you're using a Gmail App Password, not your regular password
- Check that 2-Step Verification is enabled on your Google account
- Verify `TO_EMAIL` is set correctly
- Check Vercel function logs for SMTP errors

### Messages not saving to database
- Verify Supabase environment variables are set
- Check that the `contact_messages` table exists in Supabase
- Verify the table schema matches what the API expects
- Check Vercel function logs for database errors

## Support

If you continue to experience issues:
1. Check Vercel function logs: **Deployments** → Click on deployment → **Functions** tab
2. Check browser console for client-side errors
3. Verify all environment variables are set in Vercel (not just in `.env.local`)
4. Ensure you've redeployed after adding environment variables

