import type { ReactNode } from 'react'
import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

interface FlipCardProps {
  front: ReactNode
  back: ReactNode
  className?: string
  gradientColors?: [string, string, string]
  onFlipComplete?: () => void
  forceFlip?: boolean
}

export function FlipCard({ front, back, className, gradientColors = ["#FFB3BA", "#BAFFC9", "#BAE1FF"], onFlipComplete, forceFlip = false }: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  // Handle forceFlip from parent
  useEffect(() => {
    if (forceFlip && !isFlipped) {
      setIsFlipped(true)
      setTimeout(() => {
        onFlipComplete?.()
      }, 600)
    }
  }, [forceFlip, isFlipped, onFlipComplete])

  const handleFlip = () => {
    if (!isFlipped) {
      setIsFlipped(true)
      // Call onFlipComplete after flip animation (600ms)
      setTimeout(() => {
        onFlipComplete?.()
      }, 600)
    }
  }

  return (
    <div 
      className={cn("flip-card w-full h-[500px]", className)}
    >
      <div className={cn("flip-card-inner w-full h-full", isFlipped && "flipped")}>
        {/* Back side - shows first */}
        <div className="flip-card-back" onClick={handleFlip}>
          <div className="flip-card-back-border">
            <div className="flip-card-back-content">
              {back}
            </div>
          </div>
        </div>
        
        {/* Front side - shows after flip */}
        <div className="flip-card-front">
          {front}
        </div>
      </div>
      
      <style>{`
        .flip-card {
          perspective: 1000px;
          -webkit-perspective: 1000px;
        }
        
        .flip-card:not(.flip-card-inner.flipped) {
          cursor: pointer;
        }
        
        .flip-card-inner {
          position: relative;
          transform-style: preserve-3d;
          -webkit-transform-style: preserve-3d;
          transition: transform 0.6s;
          -webkit-transition: -webkit-transform 0.6s;
        }
        
        .flip-card-inner.flipped {
          transform: rotateY(180deg);
          -webkit-transform: rotateY(180deg);
        }
        
        .flip-card-front,
        .flip-card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          -moz-backface-visibility: hidden;
          border-radius: 12px;
          overflow: hidden;
          transform: translateZ(0);
          -webkit-transform: translateZ(0);
        }
        
        .flip-card-front {
          pointer-events: auto;
        }
        
        .flip-card-inner.flipped .flip-card-front {
          pointer-events: auto;
        }
        
        .flip-card-inner:not(.flipped) .flip-card-front {
          pointer-events: none;
        }
        
        .flip-card-back {
          display: flex;
          justify-content: center;
          align-items: center;
          background: white;
          transform: rotateY(0deg) translateZ(0);
          -webkit-transform: rotateY(0deg) translateZ(0);
        }
        
        .flip-card-back-border {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
        }
        
        .flip-card-back-border::before {
          content: '';
          position: absolute;
          width: 160px;
          height: 160%;
          background: linear-gradient(90deg, transparent, ${gradientColors[0]}, ${gradientColors[1]}, ${gradientColors[2]}, ${gradientColors[1]}, transparent);
          animation: rotation 5s infinite linear;
        }
        
        @keyframes rotation {
          0% {
            transform: rotateZ(0deg);
          }
          100% {
            transform: rotateZ(360deg);
          }
        }
        
        .flip-card-back-content {
          position: relative;
          width: 99%;
          height: 99%;
          background: white;
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 20px;
          z-index: 1;
        }
        
        .flip-card-front {
          transform: rotateY(180deg) translateZ(0);
          -webkit-transform: rotateY(180deg) translateZ(0);
          background: white;
        }
      `}</style>
    </div>
  )
}
