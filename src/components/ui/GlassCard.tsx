import React from 'react';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export function GlassCard({ children, className = '', hoverEffect = false, ...props }: GlassCardProps) {
  return (
    <div
      className={`glass-panel rounded-2xl p-6 transition-all duration-300 bg-white border border-slate-200/80 ${
        hoverEffect ? 'hover:-translate-y-1 hover:shadow-xl hover:border-brand/40' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
