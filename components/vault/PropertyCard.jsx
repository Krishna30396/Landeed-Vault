import s from './PropertyCard.module.css';
import Badge from './Badge';
import { IconChevronRight, IconMapPin, IconHome } from './Icons';

export default function PropertyCard({
  name,
  location,
  status,
  explanation,
  lastChecked,
  imageSrc,
  onClick,
  className = '',
}) {
  return (
    <article
      className={`${s.card} ${className}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(e); } } : undefined}
    >
      <div className={s.image}>
        {imageSrc ? (
          <img src={imageSrc} alt={name} />
        ) : (
          <span className={s.fallback}><IconHome size={28} /></span>
        )}
      </div>

      <div className={s.body}>
        <h3 className={s.name}>{name}</h3>
        {location && (
          <span className={s.location}>
            <IconMapPin size={14} />
            {location}
          </span>
        )}
        <div className={s.statusRow}>
          {status && <Badge status={status} size="sm" dot />}
        </div>
        {explanation && <p className={s.explanation}>{explanation}</p>}
        {lastChecked && <span className={s.checked}>{lastChecked}</span>}
      </div>

      <span className={s.arrow}><IconChevronRight size={20} /></span>
    </article>
  );
}
