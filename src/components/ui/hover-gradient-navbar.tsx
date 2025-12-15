'use client'
import React from 'react';
import { Home, Gift, HelpCircle } from 'lucide-react';

interface NavMenuItem {
  icon: React.ReactNode;
  label: string;
  sectionId: string;
}

const menuItems: NavMenuItem[] = [
  { icon: <Home className="h-5 w-5" />, label: "Home", sectionId: "home" },
  { icon: <Gift className="h-5 w-5" />, label: "Wishlist", sectionId: "wishlist" },
  { icon: <HelpCircle className="h-5 w-5" />, label: "Questions", sectionId: "questions" },
];

function HoverGradientNavBar(): React.JSX.Element {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="fixed bottom-0 left-0 w-full md:bottom-4 md:left-1/2 md:-translate-x-1/2 z-50">
      <nav
        className="w-full md:w-fit mx-auto px-2 md:px-4 py-2 md:py-3 rounded-none md:rounded-3xl 
        bg-white/90 backdrop-blur-lg 
        border-t md:border border-gray-200/80 
        shadow-lg md:shadow-xl"
      >
        <ul className="flex items-center justify-around md:justify-center gap-1 md:gap-3">
          {menuItems.map((item) => (
            <li key={item.label} className="flex-1 md:flex-none">
              <button
                onClick={() => scrollToSection(item.sectionId)}
                className="flex flex-col md:flex-row items-center justify-center gap-0.5 md:gap-2 
                px-3 py-2 md:px-4 md:py-2 
                text-gray-600 hover:text-gray-900
                rounded-xl md:rounded-2xl
                hover:bg-gray-500/20
                transition-all duration-200
                text-xs md:text-sm w-full cursor-pointer"
              >
                {item.icon}
                <span className="hidden md:inline font-medium">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export { HoverGradientNavBar };
