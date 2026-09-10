import s from './DocumentRow.module.css';
import Badge from './Badge';
import { IconFile } from './Icons';

const DOC_STATUS_VARIANT = {
  added:         'success',
  'needs-update': 'warning',
  missing:       'danger',
  new:           'info',
  'couldnt-fetch': 'neutral',
};

const DOC_STATUS_LABEL = {
  added:         'Added',
  'needs-update': 'Needs update',
  missing:       'Missing',
  new:           'New',
  'couldnt-fetch': "Couldn't fetch",
};

export default function DocumentRow({
  name,
  date,
  status,
  actionLabel,
  onAction,
  icon: Icon = IconFile,
  className = '',
}) {
  return (
    <div className={`${s.row} ${className}`}>
      <div className={s.icon}><Icon size={20} /></div>
      <div className={s.body}>
        <div className={s.name}>{name}</div>
        {date && <div className={s.date}>{date}</div>}
      </div>
      <div className={s.trailing}>
        {status && (
          <Badge variant={DOC_STATUS_VARIANT[status] || 'neutral'} size="sm">
            {DOC_STATUS_LABEL[status] || status}
          </Badge>
        )}
        {actionLabel && onAction && (
          <button className={s.action} onClick={onAction}>{actionLabel}</button>
        )}
      </div>
    </div>
  );
}
