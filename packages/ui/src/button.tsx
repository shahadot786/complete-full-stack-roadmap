import type { ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost';
type Size = 'sm' | 'md';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
};

export type { Variant, Size };

export function buttonClasses(variant: Variant = 'primary', size: Size = 'md') {
  return `inline-flex items-center justify-center gap-2 rounded-lg font-medium transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink ${variants[variant]} ${sizes[size]}`;
}

const variants: Record<Variant, string> = {
  primary: 'bg-accent text-white hover:brightness-95',
  secondary: 'bg-raised text-ink hover:bg-active',
  outline: 'border border-accent text-accent-text hover:bg-active',
  ghost: 'text-ink hover:bg-raised',
};

const sizes: Record<Size, string> = {
  sm: 'h-8 px-3 text-sm',
  md: 'h-10 px-4 text-sm',
};

export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  type = 'button',
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center gap-2 rounded-lg font-medium transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
