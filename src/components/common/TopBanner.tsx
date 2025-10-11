
import { Mail, Clock } from 'lucide-react';

export default function TopBanner() {
  return (
    <div className="bg-[#2b235f] text-white py-2 px-4 text-xs md:text-sm">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>Mon - Sat: 8:00 AM – 6:00 PM</span>
        </div>
        <div className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            <a href="mailto:Alphaltd21@gmail.com" className="hover:underline">
                Alphaltd21@gmail.com
            </a>
        </div>
      </div>
    </div>
  );
}
