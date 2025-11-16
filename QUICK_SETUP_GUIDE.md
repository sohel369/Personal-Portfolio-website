# Quick Setup Guide - Contact Form Configuration

You need to configure **either SMTP (for email)** **OR Supabase (for database storage)** to make your contact form work.

## Option 1: Configure Gmail SMTP (Recommended - Easiest)

This will send you an email notification when someone submits the contact form.

### Step 1: Create a Gmail App Password

1. Go to https://myaccount.google.com/
2. Click **Security** in the left sidebar
3. Under "Signing in to Google", enable **2-Step Verification** (if not already enabled)
   - You'll need to verify your phone number
4. After enabling 2-Step Verification, go back to **Security**
5. Under "Signing in to Google", click **App passwords**
6. You may need to sign in again
7. Select:
   - **App**: Mail
   - **Device**: Other (Custom name)
   - Enter: `Portfolio Contact Form`
8. Click **Generate**
9. **Copy the 16-character password** (it looks like: `abcd efgh ijkl mnop`)
   - ⚠️ **Important**: Copy it now - you won't be able to see it again!

### Step 2: Add Environment Variables in Vercel

1. Go to your Vercel project: https://vercel.com/dashboard
2. Click on your project
3. Go to **Settings** → **Environment Variables**
4. Click **Add New** and add these variables one by one:

#### Variable 1: SMTP_HOST
- **Name**: `SMTP_HOST`
- **Value**: `smtp.gmail.com`
- **Environment**: Select all (Production, Preview, Development)
- Click **Save**

#### Variable 2: SMTP_PORT
- **Name**: `SMTP_PORT`
- **Value**: `587`
- **Environment**: Select all
- Click **Save**

#### Variable 3: SMTP_USER
- **Name**: `SMTP_USER`
- **Value**: Your Gmail address (e.g., `yourname@gmail.com`)
- **Environment**: Select all
- Click **Save**

#### Variable 4: SMTP_PASS
- **Name**: `SMTP_PASS`
- **Value**: The 16-character App Password you copied (remove spaces if any)
- **Environment**: Select all
- Click **Save**

#### Variable 5: FROM_EMAIL
- **Name**: `FROM_EMAIL`
- **Value**: Your Gmail address (same as SMTP_USER)
- **Environment**: Select all
- Click **Save**

#### Variable 6: TO_EMAIL
- **Name**: `TO_EMAIL`
- **Value**: The email address where you want to receive contact form submissions (can be same as your Gmail)
- **Environment**: Select all
- Click **Save**

### Step 3: Redeploy

1. Go to **Deployments** tab in Vercel
2. Click the **three dots (⋯)** on the latest deployment
3. Click **Redeploy**
4. Wait for deployment to complete

### Step 4: Test

1. Go to your website
2. Fill out the contact form
3. Submit it
4. Check your email inbox (the TO_EMAIL address) for the notification

---

## Option 2: Configure Supabase (For Database Storage)

This will save contact form submissions to a database. You can view them later in Supabase.

### Step 1: Create a Supabase Account

1. Go to https://supabase.com/
2. Sign up for a free account
3. Create a new project
4. Wait for the project to finish setting up (takes 1-2 minutes)

### Step 2: Create the Contact Messages Table

1. In your Supabase project, go to **SQL Editor**
2. Click **New query**
3. Copy and paste this SQL:

```sql
CREATE TABLE IF NOT EXISTS contact_messages (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (optional but recommended)
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows inserts (for the API)
CREATE POLICY "Allow public inserts" ON contact_messages
  FOR INSERT
  WITH CHECK (true);

-- Create a policy that allows service role to read all (for admin access)
CREATE POLICY "Allow service role full access" ON contact_messages
  FOR ALL
  USING (auth.role() = 'service_role');
```

4. Click **Run** (or press Ctrl+Enter)
5. You should see "Success. No rows returned"

### Step 3: Get Your Supabase Credentials

1. In Supabase, go to **Settings** → **API**
2. You'll see:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon public** key (a long string)
   - **service_role** key (another long string - keep this secret!)

### Step 4: Add Environment Variables in Vercel

1. Go to your Vercel project: https://vercel.com/dashboard
2. Click on your project
3. Go to **Settings** → **Environment Variables**
4. Click **Add New** and add these variables:

#### Variable 1: NEXT_PUBLIC_SUPABASE_URL
- **Name**: `NEXT_PUBLIC_SUPABASE_URL`
- **Value**: Your Project URL from Supabase
- **Environment**: Select all
- Click **Save**

#### Variable 2: NEXT_PUBLIC_SUPABASE_ANON_KEY
- **Name**: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **Value**: Your anon public key from Supabase
- **Environment**: Select all
- Click **Save**

#### Variable 3: SUPABASE_SERVICE_ROLE_KEY
- **Name**: `SUPABASE_SERVICE_ROLE_KEY`
- **Value**: Your service_role key from Supabase
- **Environment**: Select all
- Click **Save**

### Step 5: Redeploy

1. Go to **Deployments** tab in Vercel
2. Click the **three dots (⋯)** on the latest deployment
3. Click **Redeploy**
4. Wait for deployment to complete

### Step 6: Test

1. Go to your website
2. Fill out the contact form
3. Submit it
4. Go back to Supabase → **Table Editor** → `contact_messages`
5. You should see your test submission!

---

## Option 3: Configure Both (Best Solution)

Configure **both SMTP and Supabase** for the best experience:
- You'll get email notifications immediately
- All submissions are saved in the database for backup
- You can view all messages in Supabase dashboard

Just follow both Option 1 and Option 2 above!

---

## Troubleshooting

### "Invalid login" or "Authentication failed"
- Make sure you're using an **App Password**, not your regular Gmail password
- Verify 2-Step Verification is enabled on your Google account
- Check that the App Password doesn't have spaces

### "Contact form is not fully configured"
- Make sure you've added **all** the required environment variables
- Verify you've **redeployed** after adding the variables
- Check that variable names are exactly as shown (case-sensitive)

### Variables not working after adding them
- **You must redeploy** after adding environment variables
- Go to Deployments → Click three dots → Redeploy

### Still having issues?
1. Check Vercel logs: **Deployments** → Click deployment → **Functions** tab
2. Look for error messages in the logs
3. Verify all environment variables are set correctly

---

## Quick Checklist

### For SMTP (Gmail):
- [ ] 2-Step Verification enabled on Google account
- [ ] App Password created
- [ ] SMTP_HOST = `smtp.gmail.com`
- [ ] SMTP_PORT = `587`
- [ ] SMTP_USER = your Gmail address
- [ ] SMTP_PASS = your App Password (16 characters)
- [ ] FROM_EMAIL = your Gmail address
- [ ] TO_EMAIL = where you want to receive emails
- [ ] Redeployed after adding variables

### For Supabase:
- [ ] Supabase project created
- [ ] `contact_messages` table created
- [ ] NEXT_PUBLIC_SUPABASE_URL set
- [ ] NEXT_PUBLIC_SUPABASE_ANON_KEY set
- [ ] SUPABASE_SERVICE_ROLE_KEY set
- [ ] Redeployed after adding variables

