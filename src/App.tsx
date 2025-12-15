import { useState, useEffect, useRef } from 'react'
import { SoftYellowGlow } from './components/ui/background-components'
import { HoverPreview } from './components/ui/hover-preview'
import { FAQChatbot } from './components/ui/faq-chatbot'
import { HoverGradientNavBar } from './components/ui/hover-gradient-navbar'
import { ConfettiButton } from './components/ui/confetti-button'
import { WishlistCard } from './components/WishlistCard'
import { Button } from './components/ui/button'
import { supabase } from './lib/supabase'
import type { WishlistItem } from './lib/supabase'

function App() {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([])
  const [loading, setLoading] = useState(true)
  const [revealAll, setRevealAll] = useState(() => {
    const saved = localStorage.getItem('revealAll')
    return saved === 'true'
  })
  const [headerBlur, setHeaderBlur] = useState(false)
  const headerRef = useRef<HTMLElement>(null)

  // Blur header when 50% out of viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setHeaderBlur(entry.intersectionRatio < 0.5)
      },
      {
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5],
      }
    )

    if (headerRef.current) {
      observer.observe(headerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Persist revealAll state
  useEffect(() => {
    localStorage.setItem('revealAll', String(revealAll))
  }, [revealAll])


  useEffect(() => {
    fetchWishlistItems()
    
    // Subscribe to real-time changes
    const channel = supabase
      .channel('wishlist_changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'wishlist_items' },
        () => {
          fetchWishlistItems()
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  const fetchWishlistItems = async () => {
    try {
      const { data, error } = await supabase
        .from('wishlist_items')
        .select('*')
        .order('created_at', { ascending: true })

      if (error) throw error
      setWishlistItems(data || [])
    } catch (error) {
      console.error('Error fetching wishlist items:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleReserve = async (id: string, name: string) => {
    // Optimistically update UI first
    setWishlistItems(prev => 
      prev.map(item => 
        item.id === id 
          ? { ...item, reserved_by: name, reserved_at: new Date().toISOString() }
          : item
      )
    )

    const { error } = await supabase
      .from('wishlist_items')
      .update({
        reserved_by: name,
        reserved_at: new Date().toISOString(),
      })
      .eq('id', id)

    if (error) {
      console.error('Error reserving item:', error)
      // Revert on error
      await fetchWishlistItems()
      throw error
    }
  }

  const handleUnreserve = async (id: string) => {
    // Optimistically update UI first
    setWishlistItems(prev => 
      prev.map(item => 
        item.id === id 
          ? { ...item, reserved_by: undefined, reserved_at: undefined }
          : item
      )
    )

    const { error } = await supabase
      .from('wishlist_items')
      .update({
        reserved_by: null,
        reserved_at: null,
      })
      .eq('id', id)

    if (error) {
      console.error('Error unreserving item:', error)
      // Revert on error
      await fetchWishlistItems()
      throw error
    }
  }

  return (
    <SoftYellowGlow>
      <HoverGradientNavBar />
      <ConfettiButton />
      <div className="container mx-auto px-4 py-12">
        <header 
          id="home"
          ref={headerRef}
          className={`min-h-screen flex items-center justify-center mb-12 animate-in fade-in duration-1000 transition-all duration-500 ${headerBlur ? 'blur-md opacity-30' : ''}`}
        >
          <HoverPreview />
        </header>

        {loading ? (
          <div className="text-center text-gray-800 text-xl">
            Loading wishlist...
          </div>
        ) : wishlistItems.length === 0 ? (
          <div className="text-center text-gray-800 text-xl">
            No items in the wishlist yet. Check back soon!
          </div>
        ) : (
          <section id="wishlist">
            <h1 className="text-center font-bold text-gray-800 mb-8" style={{ fontSize: '5rem' }}>
              The Wishlist
            </h1>
            <div className="flex justify-center mb-12">
              <Button
                variant="default"
                size="lg"
                onClick={() => setRevealAll(true)}
                disabled={revealAll}
                className="shadow-lg bg-black text-white hover:opacity-80 transition-opacity duration-200 cursor-pointer px-12 py-6 text-lg"
              >
                {revealAll ? 'All Revealed!' : 'Reveal All!'}
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-32 max-w-7xl mx-auto">
              {wishlistItems.map((item) => (
                <WishlistCard
                  key={item.id}
                  item={item}
                  onReserve={handleReserve}
                  onUnreserve={handleUnreserve}
                  forceReveal={revealAll || !!item.reserved_by}
                />
              ))}
            </div>
          </section>
        )}

        {/* FAQ Chatbot Section */}
        <section id="questions" className="mt-24 mb-12 pb-24">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">If you are still struggling, ask me instead.</h2>
          <FAQChatbot />
        </section>
      </div>
    </SoftYellowGlow>
  )
}

export default App
