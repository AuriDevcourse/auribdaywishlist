-- Fix image paths to point to public folder instead of src/assets
UPDATE wishlist_items
SET image_url = REPLACE(image_url, '/src/assets/', '/')
WHERE image_url LIKE '/src/assets/%';
