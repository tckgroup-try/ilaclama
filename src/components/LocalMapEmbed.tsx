"use client";

import React, { useState, useEffect, useRef } from 'react';
import { MapPin } from 'lucide-react';

interface LocalMapEmbedProps {
  query: string;
  title: string;
}

export function LocalMapEmbed({ query, title }: LocalMapEmbedProps) {
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect(); // Disconnect after trigger to prevent multiple triggers
        }
      },
      {
        rootMargin: '200px', // Load map 200px before scrolling into viewport
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="h-[300px] w-full rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 relative flex items-center justify-center shadow-inner"
    >
      {isInView ? (
        <iframe 
          src={`https://maps.google.com/maps?q=${encodeURIComponent(query)}&t=&z=14&ie=UTF8&iwloc=&output=embed`} 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen={false} 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          title={title}
        />
      ) : (
        <div className="flex flex-col items-center justify-center text-slate-400 p-6 text-center animate-pulse">
          <MapPin className="w-10 h-10 text-brand/50 mb-3" />
          <p className="text-sm font-medium">İnteraktif Harita Yükleniyor...</p>
        </div>
      )}
    </div>
  );
}
