-- Delete all existing items
DELETE FROM wishlist_items;

-- Insert only the 2 items with your custom images
INSERT INTO wishlist_items (title, description, url, image_url) VALUES
('First Item', 'This is the first wishlist item', 'https://www.google.com', '/src/assets/1stitem.jpg'),
('Second Item', 'This is the second wishlist item', 'https://www.google.com', '/src/assets/2nditem.jpg');
