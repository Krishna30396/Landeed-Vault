import s from './ErrorState.module.css';
import { IconAlertCircle } from './Icons';

export default function ErrorState({
  icon: Icon = IconAlertCircle,
  title = "We couldn't load this right now.",
  description = "Your saved information is safe. We'll try again automatically.",
  children,
  className = '',
}) {
  return (
    <div className={`${s.wrapper} ${className}`}>
      <div className={s.icon}><Icon size={28} /></div>
      <h2 className={s.title}>{title}</h2>
      <p className={s.description}>{description}</p>
      {children && <div className={s.actions}>{children}</div>}
    </div>
  );
}
