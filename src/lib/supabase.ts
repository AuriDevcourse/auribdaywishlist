import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type WishlistItem = {
  id: string
  title: string
  description: string
  url?: string
  price?: number
  image_url?: string
  reserved_by?: string
  reserved_at?: string
  created_at: string
}
