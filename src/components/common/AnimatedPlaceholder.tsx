'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedPlaceholderProps {
  placeholders: string[];
  className?: string;
}

export function AnimatedPlaceholder({ placeholders, className }: AnimatedPlaceholderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % placeholders.length);
    }, 3000); // change every 3 seconds
    return () => clearInterval(interval);
  }, [placeholders.length]);

  return (
    <div className={cn("pointer-events-none relative h-6 overflow-y-hidden text-base text-gray-500", className)}>
      <div
        className="transition-transform duration-500 ease-in-out h-full"
        style={{ transform: `translateY(-${currentIndex * 100}%)` }}
      >
        {placeholders.map((text) => (
          <div key={text} className="flex h-6 items-center">
            <span>{text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
