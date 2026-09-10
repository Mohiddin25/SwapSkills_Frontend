import React from 'react';
import { Loader2 } from 'lucide-react';

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  icon: Icon,
  className = '',
  type = 'button',
  onClick,
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1B365D] focus-visible:ring-offset-1 select-none disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer text-center';

  const sizeStyles = {
    sm: 'text-xs px-2.5 py-1.5 rounded-md gap-1.5',
    md: 'text-sm px-4 py-2 rounded-lg gap-2',
    lg: 'text-sm sm:text-base px-5 py-2.5 rounded-lg gap-2.5'
  };

  const variantStyles = {
    primary: 'bg-[#1B365D] text-white hover:bg-[#152a48] active:bg-[#0f1f35] border border-transparent shadow-none',
    outline: 'bg-white text-[#111625] border border-[#E4E7EC] hover:bg-[#FBFBFA] hover:border-[#D0D5DD] active:bg-[#F0F4F8]',
    cream: 'bg-[#F0F4F8] text-[#1B365D] hover:bg-[#E2EBF2] border border-[#D0DCE7]',
    ghost: 'bg-transparent text-[#5C6479] hover:text-[#111625] hover:bg-[#F0F4F8]',
    danger: 'bg-white text-[#991B1B] border border-[#FECACA] hover:bg-[#FEE2E2]'
  };

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={`${baseStyles} ${sizeStyles[size] || sizeStyles.md} ${variantStyles[variant] || variantStyles.primary} ${className}`}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin shrink-0" />
      ) : Icon ? (
        <Icon className="w-4 h-4 shrink-0" />
      ) : null}
      <span>{children}</span>
    </button>
  );
}
