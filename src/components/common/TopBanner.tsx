
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
      "bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500",
      "animate-gradient-x bg-[400%_400%]"
      )}
    >
      <div className="container mx-auto flex justify-between items-center h-6 overflow-hidden">
        <div className="hidden md:flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>Mon - Sat: 8:00 AM – 6:00 PM</span>
        </div>

        <div className="flex-1 font-bold text-center w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-200px),transparent_100%)]">
            <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_svg]:max-w-none animate-scroll">
                {duplicatedOffers.map((text, index) => (
                    <li key={index} className="whitespace-nowrap text-sm md:text-base">
                        {text}
                    </li>
                ))}
            </ul>
        </div>

        <div className="hidden md:flex items-center gap-2 justify-end">
            <Mail className="h-4 w-4" />
            <a href="mailto:Alphaltd21@gmail.com" className="hover:underline">
                Alphaltd21@gmail.com
            </a>
        </div>
      </div>
    </div>
  );
}
