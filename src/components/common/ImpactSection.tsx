'use client';

import { DollarSign, Smile, Award } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface CounterProps {
  target: number;
  duration?: number;
}

function Counter({ target, duration = 2000 }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let start = 0;
          const end = target;
          
          if (end === 0) {
              setCount(0);
              return;
          }

          const stepTime = Math.abs(Math.floor(duration / end));

          const timer = setInterval(() => {
            start += 1;
            if(start > end) {
                setCount(end);
                clearInterval(timer);
            } else {
                setCount(start);
            }
          }, stepTime);
          
          return () => {
              clearInterval(timer);
          }
        }
      },
      { threshold: 0.5 }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [target, duration]);

  return <h3 ref={ref} className="text-4xl font-bold">{count.toLocaleString()}</h3>;
}

const TikTokIcon = ({className}: {className?: string}) => (
    <svg 
        className={cn("h-12 w-12 text-white", className)}
        fill="currentColor"
        viewBox="0 0 24 24" 
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.74-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"></path>
    </svg>
);


const ImpactStat = ({ icon, target, label, isAward = false }: { icon: React.ReactNode, target?: number, label: string, isAward?: boolean }) => (
    <div className="flex flex-col items-center text-center p-4">
        <div className="mb-4">{icon}</div>
        {isAward ? 
            <h3 className="text-4xl font-bold">Coming Soon</h3> : 
            target && <Counter target={target} />
        }
        <p className="mt-2 text-lg">{label}</p>
    </div>
);


export default function ImpactSection() {
  const impactStats = [
    { icon: <TikTokIcon />, target: 22500, label: "Daily Average Reach" },
    { icon: <DollarSign className="h-12 w-12 text-white" />, target: 22865, label: "Subscribers" },
    { icon: <Smile className="h-12 w-12 text-white" />, target: 28255, label: "Benefitted Customers" },
    { icon: <Award className="h-12 w-12 text-white" />, label: "Awards", isAward: true },
  ];

  return (
    <section className="relative w-full bg-primary/80 py-16 text-primary-foreground">
        <div className="absolute inset-0 bg-secondary/20 backdrop-blur-sm"></div>
        <div className="relative z-10 container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold font-headline">Our Impact</h2>
            <p className="mt-2 text-lg">Become part of our movement</p>
            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                {impactStats.map((stat, index) => (
                    <ImpactStat key={index} {...stat} />
                ))}
            </div>
            <div className="mt-12 max-w-4xl mx-auto space-y-4">
                 <p>This commitment has earned us recognition in the industry, including features in local and international media outlets and commendations for our excellence in service delivery.</p>
                 <p>Alpha Electricals & Plumbing Ltd is an online and physical hub dedicated to providing high-quality electrical, plumbing, lighting, and home improvement solutions across Kenya. We've enhanced our ability to serve diverse customer needs across the country.</p>
            </div>
        </div>
    </section>
  );
}
