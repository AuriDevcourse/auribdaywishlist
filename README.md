# 🎂 Birthday Wishlist

A beautiful, modern birthday wishlist application with real-time reservation functionality. Built with React, TypeScript, Vite, Tailwind CSS, shadcn/ui, 21st.dev components, and Supabase.

## ✨ Features

- **Stunning Warp Background**: Animated starfield background from 21st.dev
- **Real-time Updates**: See reservations instantly using Supabase real-time subscriptions
- **Gift Reservations**: Reserve items by entering your name
- **Modern UI**: Beautiful cards with shadcn/ui components
- **Responsive Design**: Works perfectly on all devices
- **Dark Theme**: Eye-friendly dark mode design

## 🚀 Tech Stack

- **Frontend**: React 19 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Backend**: Supabase (PostgreSQL + Real-time)
- **Special Effects**: 21st.dev Warp Background

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd wishlist
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Supabase**
   - Create a new project at [supabase.com](https://supabase.com)
   - Run the SQL schema from `supabase-schema.sql` in your Supabase SQL editor
   - Copy your project URL and anon key

4. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your Supabase credentials:
   ```
   VITE_SUPABASE_URL=your_supabase_url_here
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:5173`

## 🗄️ Database Setup

The application uses a single table `wishlist_items` with the following schema:

- `id`: UUID (Primary Key)
- `title`: Text (Gift name)
- `description`: Text (Gift description)
- `url`: Text (Optional product link)
- `price`: Decimal (Optional price)
- `image_url`: Text (Optional image URL)
- `reserved_by`: Text (Name of person who reserved)
- `reserved_at`: Timestamp (When it was reserved)
- `created_at`: Timestamp (When item was added)

Run the `supabase-schema.sql` file in your Supabase SQL editor to create the table with proper Row Level Security policies.

## 📝 Adding Wishlist Items

You can add items directly in your Supabase dashboard or create an admin interface. Example SQL:

```sql
INSERT INTO wishlist_items (title, description, url, price, image_url)
VALUES (
  'Wireless Headphones',
  'Noise-cancelling over-ear headphones',
  'https://example.com/product',
  299.99,
  'https://example.com/image.jpg'
);
```

## 🎨 Customization

- **Colors**: Edit the warp background colors in `src/App.tsx`
- **Theme**: Modify CSS variables in `src/index.css`
- **Title**: Change the header text in `src/App.tsx`
- **Warp Speed**: Adjust `warpSpeed` prop ("slow" or "fast")

## 🛠️ Build for Production

```bash
npm run build
npm run preview
```

## 📄 License

MIT

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for beautiful components
- [21st.dev](https://21st.dev/) for the amazing warp background
- [Supabase](https://supabase.com/) for the backend infrastructure
