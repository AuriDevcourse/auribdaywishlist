-- Template for adding a new wishlist item
-- Copy this, fill in your details, and run in Supabase SQL Editor

INSERT INTO wishlist_items (title, description, url, price, image_url)
VALUES (
  'Item Title Here',                    -- The name of the gift
  'Detailed description of the item',   -- What it is and why you want it
  'https://example.com/product-link',   -- Optional: link to the product
  99.99,                                -- Optional: price (or NULL)
  'https://example.com/image.jpg'       -- Optional: image URL (or NULL)
);

-- Examples of free image sources:
-- - Unsplash: https://unsplash.com
-- - Pexels: https://pexels.com
-- - Product images from Amazon, etc.

-- Example with no price or image:
-- INSERT INTO wishlist_items (title, description, url)
-- VALUES (
--   'Concert Tickets',
--   'Tickets to see my favorite band live',
--   'https://ticketmaster.com/example'
-- );

-- Example with everything:
-- INSERT INTO wishlist_items (title, description, url, price, image_url)
-- VALUES (
--   'Gaming Mouse',
--   'Wireless gaming mouse with RGB lighting and programmable buttons',
--   'https://www.amazon.com/example',
--   79.99,
--   'https://images.unsplash.com/photo-1527814050087-3793815479db?w=500'
-- );
