import s from './Skeleton.module.css';

export default function Skeleton({
  variant = 'text',
  width,
  height,
  className = '',
  style = {},
}) {
  return (
    <div
      className={`${s.skeleton} ${s[variant] || ''} ${className}`}
      style={{ width, height, ...style }}
      aria-hidden="true"
    />
  );
}
