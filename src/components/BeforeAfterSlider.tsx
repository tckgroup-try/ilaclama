"use client";

import React, { useState, useRef, MouseEvent, TouchEvent } from 'react';
import Image from 'next/image';
import { MousePointer2 } from 'lucide-react';

export function BeforeAfterSlider() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current || !isDragging) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
    
    setSliderPosition(percent);
  };

  const handleMouseMove = (e: MouseEvent) => handleMove(e.clientX);
  const handleTouchMove = (e: TouchEvent) => handleMove(e.touches[0].clientX);

  return (
    <section className="py-24 relative overflow-hidden bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">Farkı Kendi Gözlerinizle Görün</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Geleneksel ilaçlama yöntemleri sorunu sadece geçici olarak çözer. TCK İlaçlama'nın profesyonel haşere kontrol uygulamaları ise sorunu kökten bitirir. Kaydırarak sonucu görün.
          </p>
        </div>

        <div className="relative w-full max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-2xl shadow-brand/5 border border-slate-200 group cursor-ew-resize">
          {/* Main Container */}
          <div 
            ref={containerRef}
            className="relative w-full aspect-[16/9] md:aspect-[21/9] select-none"
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
            onTouchStart={() => setIsDragging(true)}
            onTouchEnd={() => setIsDragging(false)}
          >
            {/* After Image (Always at bottom) */}
            <div className="absolute inset-0 w-full h-full">
              <Image
                src="/images/after_slider.webp"
                alt="TCK İlaçlama Sonrası Steril Alan"
                fill
                className="object-cover"
                draggable={false}
              />
              {/* After Label */}
              <div className="absolute bottom-6 right-6 bg-brand text-white font-bold px-4 py-2 rounded-xl text-sm md:text-base shadow-lg z-10">
                TCK İlaçlama Sonrası (Steril)
              </div>
            </div>

            {/* Before Image (Clipped) */}
            <div 
              className="absolute inset-0 w-full h-full bg-slate-900 overflow-hidden"
              style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
            >
              {/* Using the perfectly matching dirty image */}
              <Image
                src="/images/before_slider.webp" 
                alt="İlaçlama Öncesi İstila"
                fill
                className="object-cover"
                draggable={false}
              />
              {/* Before Label */}
              <div className="absolute bottom-6 left-6 bg-red-600 text-white font-bold px-4 py-2 rounded-xl text-sm md:text-base shadow-lg z-10">
                Müdahale Öncesi (İstila)
              </div>
            </div>

            {/* Slider Handle */}
            <div 
              className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-20 shadow-[0_0_10px_rgba(255,255,255,0.5)]"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-2xl border-4 border-slate-900 group-hover:scale-110 transition-transform">
                <MousePointer2 className="w-5 h-5 text-slate-900" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
