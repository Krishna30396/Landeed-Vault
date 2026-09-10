import s from './Select.module.css';
import { IconChevronDown } from './Icons';

export default function Select({ label, children, className = '', id, ...props }) {
  const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className={`${s.field} ${className}`}>
      {label && <label htmlFor={selectId} className={s.label}>{label}</label>}
      <div className={s.wrapper}>
        <select id={selectId} className={s.select} {...props}>
          {children}
        </select>
        <span className={s.chevron}><IconChevronDown size={18} /></span>
      </div>
    </div>
  );
}
