import { useState, useEffect, useRef } from 'react'
import { SoftYellowGlow } from './components/ui/background-components'
import { HoverPreview } from './components/ui/hover-preview'
import { FAQChatbot } from './components/ui/faq-chatbot'
import { HoverGradientNavBar } from './components/ui/hover-gradient-navbar'
import { ConfettiButton } from './components/ui/confetti-button'
import { SpreadsheetEmbed } from './components/SpreadsheetEmbed'

function App() {
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

        <section id="wishlist">
          <h1 className="text-center font-bold text-gray-800 mb-8 text-4xl md:text-7xl lg:text-8xl">
            The Wishlist
          </h1>
          <div className="max-w-7xl mx-auto">
            <SpreadsheetEmbed 
              spreadsheetId="1iUPBGMFfcsPoD353LlLfvxJ0ax3vs9n5KEEo2RDINMg"
              className="mb-12"
            />
          </div>
        </section>

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
