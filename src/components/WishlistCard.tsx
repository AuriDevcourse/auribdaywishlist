import { useState } from 'react'
import React from 'react'
import { Card } from './ui/card'
import { Button } from './ui/button'
import { FlipCard } from './ui/flip-card'
import { ExternalLink, Check, Hand } from 'lucide-react'
import type { WishlistItem } from '@/lib/supabase'

interface WishlistCardProps {
  item: WishlistItem
  onReserve: (id: string, name: string) => Promise<void>
  onUnreserve: (id: string) => Promise<void>
  forceReveal?: boolean
}

export function WishlistCard({ item, onReserve, onUnreserve, forceReveal = false }: WishlistCardProps) {
  const [showButtons, setShowButtons] = useState(false)

  // Different gradient colors for each card based on item id
  const gradientColors: [string, string, string] = React.useMemo(() => {
    const colorSets: [string, string, string][] = [
      ["#FFB3BA", "#BAFFC9", "#BAE1FF"], // Pink, Mint, Blue
      ["#FFDFBA", "#FFFFBA", "#BAFFC9"], // Peach, Yellow, Mint
      ["#E0BBE4", "#FFDFD3", "#FEC8D8"], // Purple, Peach, Pink
      ["#D4F1F4", "#FFE5D9", "#F7D9C4"], // Cyan, Cream, Tan
      ["#C9E4DE", "#F7E7CE", "#FFC8DD"], // Sage, Cream, Pink
    ];
    // Use item id to consistently pick a color set
    const index = parseInt(item.id.split('-')[0], 16) % colorSets.length;
    return colorSets[index];
  }, [item.id]);

  const handleReserve = async () => {
    // Immediate UI update - no name prompt
    try {
      await onReserve(item.id, 'Anonymous')
    } catch (error) {
      console.error('Error reserving item:', error)
      alert('Failed to reserve item. Please try again.')
    }
  }

  const handleUnreserve = async () => {
    try {
      await onUnreserve(item.id)
    } catch (error) {
      console.error('Error unreserving item:', error)
      alert('Failed to unreserve item. Please try again.')
    }
  }

  const handleFlipComplete = () => {
    console.log('Card flipped!')
    // Show buttons 1.5 seconds after reveal
    setTimeout(() => {
      console.log('Showing buttons now')
      setShowButtons(true)
    }, 1500)
  }

  return (
    <div className="relative">
      <Card className={`overflow-hidden transition-all hover:shadow-lg ${item.reserved_by ? 'opacity-75' : ''}`}>
        {/* Buttons that appear 1.5 seconds after reveal with blur-to-clear animation */}
        {showButtons && (
          <div className="absolute -bottom-14 left-0 right-0 z-50 flex gap-3 justify-center px-4 mt-[5px] animate-button-reveal">
            {item.url && (
              <Button
                asChild
                variant="outline"
                size="lg"
                className="shadow-lg border-2 border-black text-black hover:bg-black hover:text-white"
              >
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Link
                  <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </Button>
            )}
            {item.reserved_by ? (
              <Button
                variant="default"
                size="lg"
                onClick={handleUnreserve}
                className="shadow-lg bg-black text-white hover:opacity-80 transition-opacity duration-200 cursor-pointer"
              >
                Unreserve
              </Button>
            ) : (
              <Button
                variant="default"
                size="lg"
                onClick={handleReserve}
                className="shadow-lg bg-black text-white hover:opacity-80 transition-opacity duration-200 cursor-pointer"
              >
                Reserve
                <span className="text-xl ml-2">+</span>
              </Button>
            )}
          </div>
        )}

        <FlipCard
          gradientColors={gradientColors}
          onFlipComplete={handleFlipComplete}
          forceFlip={forceReveal}
          back={
            <div className="text-center p-8">
              <Hand className="w-16 h-16 mx-auto mb-4 text-gray-700 animate-pulse" />
              <p className="text-2xl font-bold text-gray-800 mb-2">Tap to Reveal</p>
            </div>
          }
          front={
            <div className="w-full h-full bg-white p-4 flex flex-col">
              {item.image_url && (
                <div className="relative w-full overflow-hidden rounded-lg bg-muted mb-4 flex-1">
                  <img
                    src={item.image_url}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  {item.reserved_by && (
                    <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      Reserved
                    </div>
                  )}
                </div>
              )}
              <h3 className={`font-bold text-gray-900 leading-tight ${item.title.length > 30 ? 'text-base' : item.title.length > 20 ? 'text-lg' : 'text-xl'}`}>{item.title}</h3>
            </div>
          }
        />
      </Card>
    </div>
  )
}
