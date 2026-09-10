'use client';
import s from './Button.module.css';
import { IconLoader } from './Icons';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  fullWidth = false,
  iconOnly = false,
  icon: Icon,
  iconRight: IconRight,
  className = '',
  ...props
}) {
  const cls = [
    s.button,
    s[variant],
    s[size],
    loading && s.loading,
    fullWidth && s.fullWidth,
    iconOnly && s.iconOnly,
    className,
  ].filter(Boolean).join(' ');

  return (
    <button className={cls} disabled={disabled || loading} aria-busy={loading || undefined} {...props}>
      {loading && <IconLoader size={18} className={s.spinner} />}
      {Icon && <Icon size={size === 'sm' ? 16 : 18} />}
      {children}
      {IconRight && <IconRight size={size === 'sm' ? 16 : 18} />}
    </button>
  );
}
