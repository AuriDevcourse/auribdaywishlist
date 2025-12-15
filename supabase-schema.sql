-- Create wishlist_items table
CREATE TABLE IF NOT EXISTS wishlist_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  url TEXT,
  price DECIMAL(10, 2),
  image_url TEXT,
  reserved_by TEXT,
  reserved_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE wishlist_items ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to read wishlist items
CREATE POLICY "Allow public read access" ON wishlist_items
  FOR SELECT
  USING (true);

-- Create policy to allow anyone to update wishlist items (for reservations)
CREATE POLICY "Allow public update access" ON wishlist_items
  FOR UPDATE
  USING (true);

-- Create policy to allow anyone to insert wishlist items
CREATE POLICY "Allow public insert access" ON wishlist_items
  FOR INSERT
  WITH CHECK (true);

-- Create policy to allow anyone to delete wishlist items
CREATE POLICY "Allow public delete access" ON wishlist_items
  FOR DELETE
  USING (true);

-- Create index on reserved_by for faster queries
CREATE INDEX IF NOT EXISTS idx_wishlist_items_reserved_by ON wishlist_items(reserved_by);
