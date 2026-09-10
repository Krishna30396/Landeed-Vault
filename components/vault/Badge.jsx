import s from './Badge.module.css';

const STATUS_MAP = {
  'all-good':          { cls: 'allGood',        label: 'All good' },
  'needs-attention':   { cls: 'needsAttention',  label: 'Needs attention' },
  'check-needed':      { cls: 'checkNeeded',     label: 'Check needed' },
  'missing-info':      { cls: 'missingInfo',     label: 'Missing information' },
  'couldnt-check':     { cls: 'couldntCheck',    label: "Couldn’t check" },
};

export default function Badge({
  variant = 'neutral',
  status,
  size = 'md',
  dot = false,
  children,
  className = '',
}) {
  const mapped = status ? STATUS_MAP[status] : null;
  const variantCls = mapped ? s[mapped.cls] : s[variant];
  const label = children || mapped?.label;

  return (
    <span className={`${s.badge} ${variantCls} ${s[size]} ${className}`}>
      {dot && <span className={s.dot} />}
      {label}
    </span>
  );
}
