import React from 'react';

export default function Button({
  children,
  onClick,
  variant = 'primary', // primary, secondary, outline, danger
  size = 'md',        // sm, md, lg
  className = '',
  disabled = false,
  icon: Icon,
  iconPosition = 'left',
}) {
  const baseStyles = 'inline-flex items-center justify-center font-sans font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-brand-500 hover:bg-brand-600 active:bg-brand-700 text-white rounded-figma-md shadow-sm shadow-brand-500/10 hover:shadow-brand-500/20',
    secondary: 'bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-800 rounded-figma-md',
    outline: 'border border-slate-200 hover:bg-slate-50 active:bg-slate-100 text-slate-700 rounded-figma-md',
    danger: 'bg-rose-500 hover:bg-rose-600 active:bg-rose-700 text-white rounded-figma-md shadow-sm',
    ghost: 'hover:bg-slate-50 text-slate-600 hover:text-slate-900 rounded-figma-md'
  };

  const sizes = {
    sm: 'text-xs px-2.5 py-1.5 gap-1',
    md: 'text-sm px-4 py-2 gap-2',
    lg: 'text-base px-5 py-2.5 gap-2.5'
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {Icon && iconPosition === 'left' && <Icon className="w-4 h-4 shrink-0" />}
      {children}
      {Icon && iconPosition === 'right' && <Icon className="w-4 h-4 shrink-0" />}
    </button>
  );
}
