'use client';
import s from './Tabs.module.css';

export default function Tabs({
  items,
  activeKey,
  onChange,
  variant = 'underline',
  className = '',
}) {
  return (
    <div
      className={`${variant === 'pills' ? s.pills : s.tabs} ${className}`}
      role="tablist"
    >
      {items.map((item) => (
        <button
          key={item.key}
          role="tab"
          aria-selected={activeKey === item.key}
          className={`${s.tab} ${activeKey === item.key ? s.tabActive : ''}`}
          onClick={() => onChange?.(item.key)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
