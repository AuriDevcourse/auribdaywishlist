import { useEffect, useRef, useState } from "react"

interface MousePosition {
  x: number
  y: number
}

interface MouseVector {
  x: number
  y: number
}

export function useMouseVector(containerRef?: React.RefObject<HTMLElement | HTMLDivElement>) {
  const [position, setPosition] = useState<MousePosition>({ x: 0, y: 0 })
  const [vector, setVector] = useState<MouseVector>({ x: 0, y: 0 })
  const previousPosition = useRef<MousePosition>({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const container = containerRef?.current || document.body
      const rect = container.getBoundingClientRect()

      const newPosition = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      }

      const newVector = {
        x: newPosition.x - previousPosition.current.x,
        y: newPosition.y - previousPosition.current.y,
      }

      setPosition(newPosition)
      setVector(newVector)
      previousPosition.current = newPosition
    }

    const target = containerRef?.current || window
    target.addEventListener("mousemove", handleMouseMove as EventListener)

    return () => {
      target.removeEventListener("mousemove", handleMouseMove as EventListener)
    }
  }, [containerRef])

  return { position, vector }
}
