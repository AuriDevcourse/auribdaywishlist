'use client'
import React, { useState } from 'react';
import { HelpCircle } from 'lucide-react';

interface ConfettiPiece {
  id: number;
  x: number;
  y: number;
  color: string;
  rotation: number;
  scale: number;
}

const colors = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#95E1D3', '#F38181', '#AA96DA', '#FCBAD3', '#A8D8EA'];

function ConfettiButton(): React.JSX.Element {
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);

  const triggerConfetti = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    const pieces: ConfettiPiece[] = [];
    
    // Create 100 confetti pieces
    for (let i = 0; i < 100; i++) {
      pieces.push({
        id: i,
        x: Math.random() * 100, // percentage across screen
        y: -10, // start above screen
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        scale: Math.random() * 0.5 + 0.5,
      });
    }
    
    setConfetti(pieces);
    
    // Clear confetti after animation
    setTimeout(() => {
      setConfetti([]);
      setIsAnimating(false);
    }, 4000);
  };

  return (
    <>
      {/* Confetti container */}
      {confetti.length > 0 && (
        <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
          {confetti.map((piece) => (
            <div
              key={piece.id}
              className="absolute w-3 h-3 animate-confetti-fall"
              style={{
                left: `${piece.x}%`,
                backgroundColor: piece.color,
                transform: `rotate(${piece.rotation}deg) scale(${piece.scale})`,
                animationDelay: `${Math.random() * 0.5}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      )}
      
      {/* Question mark button */}
      <button
        onClick={triggerConfetti}
        className="fixed right-4 top-1/2 -translate-y-1/2 z-50
        w-12 h-12 rounded-full
        bg-white/90 backdrop-blur-lg
        border border-gray-200/80
        shadow-lg
        flex items-center justify-center
        text-gray-600 hover:text-gray-900
        hover:bg-gray-500/20
        transition-all duration-200
        cursor-pointer"
        title="Click me!"
      >
        <HelpCircle className="w-6 h-6" />
      </button>
    </>
  );
}

export { ConfettiButton };
