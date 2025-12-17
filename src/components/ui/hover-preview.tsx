"use client"

import type React from "react"
import { useState, useCallback, useRef, useEffect } from "react"
import { AnimatedTooltip } from "./animated-tooltip"

const attendees = [
  {
    id: 1,
    name: "Aiza Watzlawek",
    designation: "Host",
    image: "/aiza.jpg",
  },
  {
    id: 2,
    name: "Auri Baciauskas",
    designation: "Main Guy",
    image: "/auri.jpg",
  },
  {
    id: 3,
    name: "Elisabeth Kungla",
    designation: "Guest",
    image: "/elisabeth.jpg",
  },
  {
    id: 4,
    name: "Ioana Janina",
    designation: "Guest",
    image: "/ionna.jpg",
  },
  {
    id: 5,
    name: "Alex Damache",
    designation: "Guest",
    image: "/alexd.jpg",
  },
  {
    id: 6,
    name: "Valentin Isc",
    designation: "Guest",
    image: "/valentin.jpg",
  },
  {
    id: 7,
    name: "Ștefan Cioroiu",
    designation: "Guest",
    image: "/sefan.jpg",
  },
  {
    id: 8,
    name: "Mari Krupa",
    designation: "Guest",
    image: "/mari.jpg",
  },
  {
    id: 9,
    name: "Bence Henz",
    designation: "Guest",
    image: "/bence.jpg",
  },
  {
    id: 10,
    name: "Pierre Albert Lafargue",
    designation: "Guest",
    image: "/pierre.jpg",
  },
  {
    id: 11,
    name: "Andrew Wize",
    designation: "Guest",
    image: "/andrei.jpg",
  },
  {
    id: 12,
    name: "Eividas Mačiulis",
    designation: "Guest",
    image: "/eividas.jpg",
  },
]

const previewData = {
  birthday: {
    image: "/birthday1.jpeg",
    title: "Birthday",
    subtitle: "Celebrating another year",
  },
  get: {
    image: "/get1.jpeg",
    title: "Get",
    subtitle: "The perfect gift",
  },
  inspiration: {
    image: "/inspiration1.jpeg",
    title: "Inspiration",
    subtitle: "Find your ideas here",
  },
  twentynine: {
    image: "/291.jpeg",
    title: "29",
    subtitle: "Years of adventures",
  },
}

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;700&family=Syne:wght@400;700;800&display=swap');

  .hover-preview-container {
    font-family: 'Space Grotesk', sans-serif;
    position: relative;
  }

  .text-block {
    font-size: clamp(2.1rem, 5.6vw, 3.5rem);
    line-height: 1.6;
    color: #666;
    font-weight: 400;
    letter-spacing: -0.02em;
    text-align: left;
  }

  .text-block p {
    margin-bottom: 0.8em;
  }
  
  .text-block .title-line {
    font-size: clamp(3rem, 8vw, 5rem);
    color: #333;
    font-weight: 400;
  }

  .hover-link {
    color: #333;
    font-weight: 700;
    font-family: 'Syne', sans-serif;
    cursor: pointer;
    position: relative;
    display: inline-block;
    transition: color 0.3s ease;
  }

  .hover-link::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(90deg, #ff6b6b, #feca57, #48dbfb);
    transition: width 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  .hover-link:hover::after {
    width: 100%;
  }

  .preview-card {
    position: fixed;
    pointer-events: none;
    z-index: 1000;
    opacity: 0;
    transform: translateY(10px) scale(0.95);
    transition: opacity 0.25s ease, transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
    will-change: transform, opacity;
  }

  .preview-card.visible {
    opacity: 1;
    transform: translateY(0) scale(1);
  }

  .preview-card-inner {
    background: rgba(255, 255, 255, 0.95);
    border-radius: 16px;
    padding: 8px;
    box-shadow: 
      0 25px 50px -12px rgba(0, 0, 0, 0.3),
      0 0 0 1px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    backdrop-filter: blur(10px);
  }

  .preview-card img {
    width: 280px;
    height: auto;
    border-radius: 10px;
    display: block;
  }

  .preview-card-title {
    padding: 12px 8px 8px;
    font-size: 0.85rem;
    color: #333;
    font-weight: 600;
    font-family: 'Syne', sans-serif;
  }

  .preview-card-subtitle {
    padding: 0 8px 8px;
    font-size: 0.75rem;
    color: #666;
  }
`

const HoverLink = ({
  previewKey,
  children,
  onHoverStart,
  onHoverMove,
  onHoverEnd,
}: {
  previewKey: string
  children: React.ReactNode
  onHoverStart: (key: string, e: React.MouseEvent) => void
  onHoverMove: (e: React.MouseEvent) => void
  onHoverEnd: () => void
}) => {
  return (
    <span
      className="hover-link"
      onMouseEnter={(e) => onHoverStart(previewKey, e)}
      onMouseMove={onHoverMove}
      onMouseLeave={onHoverEnd}
    >
      {children}
    </span>
  )
}

const PreviewCard = ({
  data,
  position,
  isVisible,
  cardRef,
}: {
  data: (typeof previewData)[keyof typeof previewData] | null
  position: { x: number; y: number }
  isVisible: boolean
  cardRef: React.RefObject<HTMLDivElement | null>
}) => {
  if (!data) return null

  return (
    <div
      ref={cardRef}
      className={`preview-card ${isVisible ? "visible" : ""}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      <div className="preview-card-inner">
        <img
          src={data.image || "/placeholder.svg"}
          alt={data.title || ""}
        />
        <div className="preview-card-title">{data.title}</div>
        <div className="preview-card-subtitle">{data.subtitle}</div>
      </div>
    </div>
  )
}

export function HoverPreview() {
  const [activePreview, setActivePreview] = useState<(typeof previewData)[keyof typeof previewData] | null>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  // Preload all images on mount
  useEffect(() => {
    Object.entries(previewData).forEach(([, data]) => {
      const img = new Image()
      img.src = data.image
    })
  }, [])

  const updatePosition = useCallback((e: React.MouseEvent | MouseEvent) => {
    const cardWidth = 300
    const cardHeight = 250
    const offsetY = 20

    let x = e.clientX - cardWidth / 2
    let y = e.clientY - cardHeight - offsetY

    if (x + cardWidth > window.innerWidth - 20) {
      x = window.innerWidth - cardWidth - 20
    }
    if (x < 20) {
      x = 20
    }

    if (y < 20) {
      y = e.clientY + offsetY
    }

    setPosition({ x, y })
  }, [])

  const handleHoverStart = useCallback(
    (key: string, e: React.MouseEvent) => {
      setActivePreview(previewData[key as keyof typeof previewData])
      setIsVisible(true)
      updatePosition(e)
    },
    [updatePosition],
  )

  const handleHoverMove = useCallback(
    (e: React.MouseEvent) => {
      if (isVisible) {
        updatePosition(e)
      }
    },
    [isVisible, updatePosition],
  )

  const handleHoverEnd = useCallback(() => {
    setIsVisible(false)
  }, [])

  return (
    <>
      <style>{styles}</style>
      <div className="hover-preview-container">
        <div className="text-block">
          <p className="title-line">
            Auri's{" "}
            <HoverLink
              previewKey="birthday"
              onHoverStart={handleHoverStart}
              onHoverMove={handleHoverMove}
              onHoverEnd={handleHoverEnd}
            >
              Birthday
            </HoverLink>{" "}
            Wishlist
          </p>
          <p>
            Don't know what to{" "}
            <HoverLink
              previewKey="get"
              onHoverStart={handleHoverStart}
              onHoverMove={handleHoverMove}
              onHoverEnd={handleHoverEnd}
            >
              get
            </HoverLink>
            ? Maybe that is the{" "}
            <HoverLink
              previewKey="inspiration"
              onHoverStart={handleHoverStart}
              onHoverMove={handleHoverMove}
              onHoverEnd={handleHoverEnd}
            >
              inspiration
            </HoverLink>{" "}
            you need.
          </p>
          <p>
            I am{" "}
            <HoverLink
              previewKey="twentynine"
              onHoverStart={handleHoverStart}
              onHoverMove={handleHoverMove}
              onHoverEnd={handleHoverEnd}
            >
              29
            </HoverLink>
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-6">
            <div className="flex items-center gap-4">
              <span className="text-2xl font-bold text-gray-800">Attendees</span>
              <span className="h-8 w-px bg-gray-400"></span>
            </div>
            <div className="max-w-[360px] sm:max-w-none">
              <AnimatedTooltip items={attendees} />
            </div>
          </div>
        </div>

        <PreviewCard data={activePreview} position={position} isVisible={isVisible} cardRef={cardRef} />
      </div>
    </>
  )
}
