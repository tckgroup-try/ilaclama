"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShieldAlert, Menu, X } from 'lucide-react';
import { RoseButton } from './ui/RoseButton';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300`}
    >
      {/* Top Urgent CTA Banner */}
      <div className={`bg-brand text-white text-center py-2 px-4 text-xs md:text-sm font-bold tracking-wide flex items-center justify-center gap-2 transition-all duration-300 ${isScrolled ? 'h-0 py-0 opacity-0 overflow-hidden' : 'h-auto opacity-100'}`}>
        <ShieldAlert className="w-4 h-4 animate-pulse" />
        İstanbul İçi Acil Müdahale Ekiplerimiz Sahada: Bölgenize Özel İlk 45 Dakikada Kesin Çözüm Garantisi!
      </div>

      <div className={`transition-all duration-300 ${isScrolled ? 'glass-nav py-4' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-brand/20 flex items-center justify-center group-hover:bg-brand/30 transition-colors">
            <ShieldAlert className="text-brand w-6 h-6" />
          </div>
          <span className="text-xl font-bold text-white tracking-wide">
            TCK<span className="text-brand">İLAÇLAMA</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/hizmetler" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
            Hizmetler
          </Link>
          <Link href="/hasereler" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
            Haşere Türleri
          </Link>
          <Link href="/blog" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
            Blog
          </Link>
          <Link href="/subelerimiz" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
            Şubelerimiz
          </Link>
          <Link href="/hakkimizda" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
            Kurumsal
          </Link>
          <a href="tel:+905016355053" className="text-sm font-medium text-brand hover:text-blue-400 transition-colors">
            0501 635 50 53
          </a>
          <a href="https://wa.me/905016355053?text=Merhaba,%20acil%20ila%C3%A7lama%20teklifi%20almak%20istiyorum." target="_blank" rel="noopener noreferrer">
            <RoseButton variant="primary" className="py-2 px-5 text-sm">
              Acil Teklif Al
            </RoseButton>
          </a>
        </nav>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-slate-300 hover:text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="md:hidden glass-panel absolute top-full left-0 right-0 border-t border-white/5 p-6 flex flex-col gap-6 shadow-2xl">
          <Link href="/hizmetler" className="text-slate-300 font-medium p-3 hover:text-white transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Hizmetler</Link>
          <Link href="/hasereler" className="text-slate-300 font-medium p-3 hover:text-white transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Haşere Türleri</Link>
          <Link href="/hakkimizda" className="text-slate-300 font-medium p-3 hover:text-white transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Kurumsal</Link>
          <Link href="/subelerimiz" className="text-slate-300 font-medium p-3 hover:text-white transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Şubelerimiz</Link>
          <a href="tel:+905016355053" className="text-brand font-medium p-3 hover:text-blue-400 transition-colors">0501 635 50 53</a>
          <a href="https://wa.me/905016355053?text=Merhaba,%20acil%20ila%C3%A7lama%20teklifi%20almak%20istiyorum." target="_blank" rel="noopener noreferrer" onClick={() => setIsMobileMenuOpen(false)} className="mt-2">
            <RoseButton className="w-full py-4 text-lg">Acil Teklif Al</RoseButton>
          </a>
        </div>
      )}
      </div>
    </header>
  );
}
