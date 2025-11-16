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

-- Policy: Allow public inserts (for the API)
CREATE POLICY "Allow public inserts" ON contact_messages
  FOR INSERT
  WITH CHECK (true);

-- Policy: Allow service role full access (for admin access)
CREATE POLICY "Allow service role full access" ON contact_messages
  FOR ALL
  USING (auth.role() = 'service_role');

