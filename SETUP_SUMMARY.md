# Contact Form Setup - Quick Summary

## 🎯 What You Need

Your contact form needs **at least one** of these configured:
1. **SMTP (Gmail)** - Sends you email notifications ✅ Recommended
2. **Supabase** - Saves messages to database ✅ Recommended
3. **Both** - Best solution! ✅✅

---

## 📧 Option 1: Gmail SMTP (5 minutes)

### Quick Steps:
1. **Create Gmail App Password**
   - Go to: https://myaccount.google.com/security
   - Enable 2-Step Verification
   - Create App Password → Copy the 16-character code

2. **Add to Vercel** (Settings → Environment Variables):
   ```
   SMTP_HOST = smtp.gmail.com
   SMTP_PORT = 587
   SMTP_USER = your-email@gmail.com
   SMTP_PASS = your-16-char-app-password
   FROM_EMAIL = your-email@gmail.com
   TO_EMAIL = where-to-receive-emails@gmail.com
   ```

3. **Redeploy** in Vercel

✅ **Result**: You'll get email notifications when someone submits the form

---

## 🗄️ Option 2: Supabase Database (10 minutes)

### Quick Steps:
1. **Create Supabase Project**
   - Go to: https://supabase.com/
   - Create free account → New project

2. **Create Table** (SQL Editor → Run this):
   ```sql
   CREATE TABLE contact_messages (
     id BIGSERIAL PRIMARY KEY,
     name TEXT NOT NULL,
     email TEXT NOT NULL,
     phone TEXT,
     subject TEXT NOT NULL,
     message TEXT NOT NULL,
     created_at TIMESTAMPTZ DEFAULT NOW()
   );
   ```

3. **Get Credentials** (Settings → API):
   - Copy Project URL
   - Copy anon public key
   - Copy service_role key

4. **Add to Vercel** (Settings → Environment Variables):
   ```
   NEXT_PUBLIC_SUPABASE_URL = https://xxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY = your-anon-key
   SUPABASE_SERVICE_ROLE_KEY = your-service-role-key
   ```

5. **Redeploy** in Vercel

✅ **Result**: Messages saved to database (view in Supabase dashboard)

---

## 🚀 Option 3: Both (Best!)

Follow both Option 1 and Option 2 above.

✅ **Result**: 
- Email notifications immediately
- All messages saved in database
- Best of both worlds!

---

## ⚠️ Important Notes

1. **You MUST redeploy** after adding environment variables
2. **Gmail App Password** is NOT your regular password
3. **Variable names are case-sensitive** - copy exactly as shown
4. **Select all environments** (Production, Preview, Development) when adding variables

---

## 📖 Full Instructions

See `QUICK_SETUP_GUIDE.md` for detailed step-by-step instructions with screenshots guidance.

---

## 🆘 Still Need Help?

1. Check Vercel logs: Deployments → Functions tab
2. Verify all variables are set correctly
3. Make sure you redeployed after adding variables
4. Test with a simple form submission

