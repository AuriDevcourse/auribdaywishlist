-- Delete all sample items (First Item through Eighth Item)

DELETE FROM wishlist_items
WHERE title IN (
  'First Item',
  'Second Item',
  'Third Item',
  'Fourth Item',
  'Fifth Item',
  'Sixth Item',
  'Seventh Item',
  'Eighth Item'
);
