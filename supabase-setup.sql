-- Create contact_messages table in Supabase
-- Run this SQL in your Supabase SQL Editor

CREATE TABLE IF NOT EXISTS contact_messages (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create an index on created_at for faster queries
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON contact_messages(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Policy: Allow service role to insert (for API routes)
CREATE POLICY "Allow service role to insert contact messages"
  ON contact_messages
  FOR INSERT
  TO service_role
  WITH CHECK (true);

-- Policy: Allow service role to read (for admin API routes)
CREATE POLICY "Allow service role to read contact messages"
  ON contact_messages
  FOR SELECT
  TO service_role
  USING (true);

-- Optional: Allow anonymous users to insert (if you want direct client-side inserts)
-- CREATE POLICY "Allow anonymous to insert contact messages"
--   ON contact_messages
--   FOR INSERT
--   TO anon
--   WITH CHECK (true);

