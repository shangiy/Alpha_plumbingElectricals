'use client';

import { Users, Database, Award, LayoutGrid } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

// Counter component for animating numbers
interface CounterProps {
  target: number;
  duration?: number;
}

function Counter({ target, duration = 6000 }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let startTime: number | null = null;
          const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const percentage = Math.min(progress / duration, 1);
            const currentCount = Math.floor(target * percentage);
            setCount(currentCount);

            if (progress < duration) {
              requestAnimationFrame(animate);
            } else {
              setCount(target);
            }
          };
          requestAnimationFrame(animate);
          observer.unobserve(entries[0].target);
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

  return <h3 ref={ref} className="text-4xl lg:text-5xl font-bold text-white">{count.toLocaleString()}</h3>;
}

// Individual stat box component
const ImpactStat = ({ icon, target, label }: { icon: React.ReactNode, target: number, label: string }) => (
  <div className="relative h-full text-center text-white border-2 border-green-400/50 rounded-lg">
    {/* Icon with background matching the section overlay to "erase" the border */}
    <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gray-900/70 px-2">
      {icon}
    </div>
    {/* Content with its own background and padding */}
    <div className="flex h-full flex-col items-center justify-center rounded-[6px] bg-black/20 p-8 backdrop-blur-sm">
      <div className="mt-4 flex flex-col items-center justify-center flex-grow">
        <Counter target={target} />
        <p className="mt-2 text-sm uppercase tracking-wider text-white/80">{label}</p>
      </div>
    </div>
  </div>
);

export default function ImpactSection() {
  const impactStats = [
    { icon: <LayoutGrid className="h-10 w-10 text-green-400" />, target: 11500, label: "Daily Average Reach" },
    { icon: <Database className="h-10 w-10 text-green-400" />, target: 142865, label: "Subscribers" },
    { icon: <Users className="h-10 w-10 text-green-400" />, target: 28255, label: "Benefitted Customers" },
    { icon: <Award className="h-10 w-10 text-green-400" />, target: 23, label: "Awards" },
  ];

  return (
    <section 
        className="relative w-full py-20 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: "url('https://placehold.co/1920x1080.png')" }}
        data-ai-hint="dark abstract background"
    >
        <div className="absolute inset-0 bg-gray-900/70 backdrop-blur-sm"></div>
        <div className="relative z-10 container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold font-headline text-white">Our Impact</h2>
            <p className="mt-2 text-lg text-white/80">Join our movements</p>
            <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                {impactStats.map((stat, index) => (
                    <ImpactStat key={index} {...stat} />
                ))}
            </div>
            <div className="mt-16 max-w-4xl mx-auto space-y-4 text-white/80 text-lg">
                 <p>This commitment has earned us recognition in the industry, including features in local and international media outlets and commendations for our excellence in service delivery.</p>
                 <p>Alpha Electricals & Plumbing Ltd is an online and physical hub dedicated to providing high-quality electrical, plumbing, lighting, and home improvement solutions across Kenya. We've enhanced our ability to serve diverse customer needs across the country.</p>
            </div>
        </div>
    </section>
  );
}
