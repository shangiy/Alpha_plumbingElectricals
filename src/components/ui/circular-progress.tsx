'use client';

import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface CircularProgressProps {
  progress: number;
  size?: number;
  strokeWidth?: number;
  progressColor?: string;
  trackColor?: string;
  label?: string;
}

export function CircularProgress({
  progress = 0,
  size = 120,
  strokeWidth = 10,
  progressColor = '#00c389',
  trackColor = 'rgba(255, 255, 255, 0.2)',
  label,
}: CircularProgressProps) {
  const [animatedProgress, setAnimatedProgress] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (animatedProgress / 100) * circumference;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let startTimestamp: number | null = null;
          const duration = 1500; // Animation duration in ms

          const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progressElapsed = timestamp - startTimestamp;
            const currentProgress = Math.min((progressElapsed / duration) * progress, progress);
            setAnimatedProgress(currentProgress);
            if (progressElapsed < duration) {
              requestAnimationFrame(step);
            }
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [progress]);

  return (
    <div
      ref={ref}
      className="relative flex flex-col items-center justify-center gap-2"
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={trackColor}
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={progressColor}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-500 ease-out"
          style={{ transitionProperty: 'stroke-dashoffset' }}
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center">
        <span className="text-2xl font-bold">{Math.round(animatedProgress)}%</span>
      </div>
      {label && <span className="mt-2 text-center text-sm font-medium">{label}</span>}
    </div>
  );
}
