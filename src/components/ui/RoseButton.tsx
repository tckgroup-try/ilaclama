import React from 'react';
import { Loader2 } from 'lucide-react';

interface RoseButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'outline' | 'ghost';
  isLoading?: boolean;
}

export function RoseButton({
  children,
  className = '',
  variant = 'primary',
  isLoading = false,
  ...props
}: RoseButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center rounded-xl px-6 py-3 font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 focus:ring-offset-zinc-900 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-brand text-white hover:bg-brand-hover shadow-lg shadow-brand/20 hover:shadow-brand/40',
    outline: 'border-2 border-brand text-brand hover:bg-brand hover:text-white',
    ghost: 'text-brand hover:bg-brand/10',
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : null}
      {children}
    </button>
  );
}
