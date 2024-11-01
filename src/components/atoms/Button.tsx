import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  icon?: LucideIcon;
  fullWidth?: boolean;
}

export default function Button({
  children,
  variant = 'primary',
  icon: Icon,
  fullWidth,
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles = 'rounded-lg px-6 py-3 font-medium flex items-center gap-2 transition-colors';
  const variantStyles = {
    primary: 'bg-blue-500 hover:bg-blue-600 text-white',
    secondary: 'bg-gray-700/50 hover:bg-gray-700/70 text-white',
    ghost: 'hover:bg-gray-700/30 text-gray-300 hover:text-white',
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${
        fullWidth ? 'w-full justify-center' : ''
      } ${className}`}
      {...props}
    >
      {Icon && <Icon className="w-5 h-5" />}
      {children}
    </button>
  );
}