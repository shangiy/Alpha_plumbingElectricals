
'use client';

import { Mail, Clock } from 'lucide-react';
import { AnimatedPlaceholder } from './AnimatedPlaceholder';

export default function TopBanner() {
  const offerTexts = [
    "OFFERS! OFFERS!",
    "Mazingira Day OFFERS!",
    "Feel welcomed to shop with us",
  ];

  return (
    <div className="bg-[#2b235f] text-white py-2 px-4 text-xs md:text-sm">
      <div className="container mx-auto flex justify-between items-center h-6">
        <div className="hidden md:flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>Mon - Sat: 8:00 AM – 6:00 PM</span>
        </div>

        <div className="flex-1 text-center font-bold">
            <AnimatedPlaceholder placeholders={offerTexts} className="text-white text-sm md:text-base justify-center" />
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
