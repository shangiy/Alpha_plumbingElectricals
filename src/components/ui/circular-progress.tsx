'use client';

import { useState, useEffect, useRef } from 'react';

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
  const circleRef = useRef<SVGCircleElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    const circle = circleRef.current;
    const container = containerRef.current;
    if (!circle || !container) return;
    
    // Set initial state without transition
    circle.style.transition = 'none';
    circle.style.strokeDasharray = `${circumference}`;
    circle.style.strokeDashoffset = `${circumference}`;
    setAnimatedProgress(0);
    
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
            // Animate percentage number
            let current = 0;
            const duration = 2000;
            const stepTime = 16; // ms, for ~60fps
            const stepValue = progress / (duration / stepTime);
            
            const counter = setInterval(() => {
                current += stepValue;
                if (current >= progress) {
                    current = progress;
                    clearInterval(counter);
                }
                setAnimatedProgress(current);
            }, stepTime);

            // Animate circle stroke using a timeout to ensure initial styles are applied
            setTimeout(() => {
                if (circleRef.current) {
                    const offset = circumference - (progress / 100) * circumference;
                    circleRef.current.style.transition = 'stroke-dashoffset 2s ease';
                    circleRef.current.style.strokeDashoffset = `${offset}`;
                }
            }, 50);

            // Animate only once
            observer.unobserve(entry.target);
        }
      },
      { threshold: 0.6 } // Start animation when 60% of element is visible
    );

    observer.observe(container);

    return () => {
        observer.disconnect();
    };
  }, [progress, circumference]);

  return (
    <div
      ref={containerRef}
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
          ref={circleRef}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={progressColor}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center">
        <span className="text-2xl font-bold">{Math.round(animatedProgress)}%</span>
      </div>
      {label && <span className="mt-2 text-center text-sm font-medium">{label}</span>}
    </div>
  );
}
