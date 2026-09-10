import s from './EmptyState.module.css';
import { IconShield } from './Icons';

export default function EmptyState({
  icon: Icon = IconShield,
  title,
  description,
  children,
  className = '',
}) {
  return (
    <div className={`${s.wrapper} ${className}`}>
      <div className={s.icon}><Icon size={28} /></div>
      {title && <h2 className={s.title}>{title}</h2>}
      {description && <p className={s.description}>{description}</p>}
      {children && <div className={s.actions}>{children}</div>}
    </div>
  );
}
