
'use client';

import { Mail, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function TopBanner() {
  const offerTexts = [
    "OFFERS! OFFERS! Mazingira Day OFFERS!",
    "Feel welcomed to shop with us @ best prices",
  ];

  // Duplicate the array to ensure seamless looping
  const duplicatedOffers = [...offerTexts, ...offerTexts];

  return (
    <div className={cn(
      "text-white py-2 px-4 text-xs md:text-sm",
      "bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 bg-[length:200%_200%] animate-gradient-x"
      )}
    >
      <div className="container mx-auto flex justify-between items-center h-6 overflow-hidden">
        <div className="hidden md:flex items-center gap-2 flex-shrink-0">
            <Clock className="h-4 w-4" />
            <span>Mon - Sat: 8:00 AM – 6:00 PM</span>
        </div>

        <div className="flex-1 font-bold text-center w-full inline-flex flex-nowrap overflow-hidden">
            <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_svg]:max-w-none animate-scroll">
                {duplicatedOffers.map((text, index) => (
                    <li key={index} className="whitespace-nowrap text-sm md:text-base">
                        {text}
                    </li>
                ))}
            </ul>
        </div>

        <div className="hidden md:flex items-center gap-2 justify-end flex-shrink-0">
            <Mail className="h-4 w-4" />
            <a href="mailto:Alphaltd21@gmail.com" className="hover:underline">
                Alphaltd21@gmail.com
            </a>
        </div>
      </div>
    </div>
  );
}
