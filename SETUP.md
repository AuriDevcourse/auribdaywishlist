# 🚀 Quick Setup Guide

## Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Click "New Project"
3. Fill in project details and wait for it to initialize

## Step 2: Set Up Database

1. In your Supabase dashboard, go to **SQL Editor**
2. Click "New Query"
3. Copy and paste the contents of `supabase-schema.sql`
4. Click "Run" to execute the SQL

## Step 3: Add Sample Wishlist Items

Run this SQL in your Supabase SQL Editor to add some sample items:

```sql
INSERT INTO wishlist_items (title, description, url, price, image_url)
VALUES 
  (
    'Wireless Noise-Cancelling Headphones',
    'Premium over-ear headphones with active noise cancellation and 30-hour battery life',
    'https://www.amazon.com/example',
    299.99,
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500'
  ),
  (
    'Mechanical Keyboard',
    'RGB backlit mechanical keyboard with Cherry MX switches',
    'https://www.amazon.com/example',
    149.99,
    'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500'
  ),
  (
    'Smart Watch',
    'Fitness tracker with heart rate monitor and GPS',
    'https://www.amazon.com/example',
    249.99,
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500'
  ),
  (
    'Coffee Maker',
    'Programmable coffee maker with thermal carafe',
    'https://www.amazon.com/example',
    89.99,
    'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500'
  ),
  (
    'Book: The Pragmatic Programmer',
    'Classic programming book for software developers',
    'https://www.amazon.com/example',
    39.99,
    'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500'
  ),
  (
    'Portable Bluetooth Speaker',
    'Waterproof speaker with 360-degree sound',
    'https://www.amazon.com/example',
    79.99,
    'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500'
  );
```

## Step 4: Get Your Supabase Credentials

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy your **Project URL** (looks like: `https://xxxxx.supabase.co`)
3. Copy your **anon/public** key (the long string under "Project API keys")

## Step 5: Configure Environment Variables

1. In your project folder, copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Open `.env` and paste your credentials:
   ```
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

## Step 6: Run the Application

```bash
npm install
npm run dev
```

Open your browser to `http://localhost:5173` (or the port shown in terminal)

## 🎉 You're Done!

You should now see your wishlist with the sample items. Try:
- Entering your name and clicking "Reserve This Gift"
- Opening the app in multiple browser tabs to see real-time updates
- Unreserving items

## 🛠️ Customization Tips

### Change the Title
Edit `src/App.tsx` line 88-90 to change the header text.

### Modify Colors
Edit `src/App.tsx` line 81 to change the warp background colors:
```tsx
colors={['#4F46E5', '#7C3AED', '#EC4899', '#F59E0B', '#10B981']}
```

### Adjust Animation Speed
Change `warpSpeed` in `src/App.tsx` line 82:
```tsx
warpSpeed="fast"  // or "slow"
```

### Add More Items
Use the SQL INSERT statement above as a template, or add items directly in your Supabase dashboard under **Table Editor** → **wishlist_items**.

## 📱 Deployment

### Deploy to Vercel/Netlify
1. Push your code to GitHub
2. Connect your repo to Vercel or Netlify
3. Add environment variables in the deployment settings
4. Deploy!

### Important: Environment Variables
Make sure to add your `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in your deployment platform's environment variable settings.

## 🐛 Troubleshooting

### "No items in the wishlist yet"
- Check that you ran the SQL to insert sample items
- Verify your `.env` file has the correct Supabase credentials
- Check browser console for errors

### Items not updating in real-time
- Make sure you enabled Row Level Security policies (they're in the schema SQL)
- Check that Realtime is enabled in Supabase (Settings → API → Realtime)

### Build errors
- Run `npm install` to ensure all dependencies are installed
- Delete `node_modules` and `package-lock.json`, then run `npm install` again
