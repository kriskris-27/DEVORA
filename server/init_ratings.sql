-- Create a table to store individual ratings to prevent spam
CREATE TABLE IF NOT EXISTS mechanic_ratings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  mechanic_email TEXT NOT NULL,
  device_id TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(mechanic_email, device_id)
);

-- Policy (optional: if you want to allow public inserts via RLS, though we are using a backend route so it might bypass RLS if using service role, but good to have)
-- ALTER TABLE mechanic_ratings ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY "Allow public insert" ON mechanic_ratings FOR INSERT WITH CHECK (true);
