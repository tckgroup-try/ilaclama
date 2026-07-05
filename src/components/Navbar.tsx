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
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass-nav py-4' : 'bg-transparent py-6'
      }`}
    >
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
          <Link href="/hizmetler" className="text-sm font-medium text-zinc-300 hover:text-white transition-colors">
            Hizmetler
          </Link>
          <Link href="/hasereler" className="text-sm font-medium text-zinc-300 hover:text-white transition-colors">
            Haşere Türleri
          </Link>
          <Link href="/kurumsal" className="text-sm font-medium text-zinc-300 hover:text-white transition-colors">
            Kurumsal
          </Link>
          <a href="tel:+905300000000" className="text-sm font-medium text-brand hover:text-rose-400 transition-colors">
            0530 000 00 00
          </a>
          <Link href="/teklif-al">
            <RoseButton variant="primary" className="py-2 px-5 text-sm">
              Acil Teklif Al
            </RoseButton>
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-zinc-300 hover:text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="md:hidden glass-panel absolute top-full left-0 right-0 border-t border-white/5 p-4 flex flex-col gap-4">
          <Link href="/hizmetler" className="text-zinc-300 font-medium p-2" onClick={() => setIsMobileMenuOpen(false)}>Hizmetler</Link>
          <Link href="/hasereler" className="text-zinc-300 font-medium p-2" onClick={() => setIsMobileMenuOpen(false)}>Haşere Türleri</Link>
          <Link href="/kurumsal" className="text-zinc-300 font-medium p-2" onClick={() => setIsMobileMenuOpen(false)}>Kurumsal</Link>
          <a href="tel:+905300000000" className="text-brand font-medium p-2">0530 000 00 00</a>
          <Link href="/teklif-al" onClick={() => setIsMobileMenuOpen(false)}>
            <RoseButton className="w-full">Acil Teklif Al</RoseButton>
          </Link>
        </div>
      )}
    </header>
  );
}
