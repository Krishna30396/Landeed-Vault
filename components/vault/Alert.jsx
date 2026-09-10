import s from './Alert.module.css';

const VARIANT_LABEL = {
  'needs-attention': 'Needs your attention',
  'check-needed':    'Check needed',
  'missing-info':    'Missing information',
  'couldnt-check':   "Couldn't check",
  'all-good':        'All good',
};

export default function Alert({
  variant = 'needs-attention',
  headline,
  description,
  children,
  className = '',
}) {
  const variantCls = {
    'needs-attention': s.needsAttention,
    'check-needed':    s.checkNeeded,
    'missing-info':    s.missingInfo,
    'couldnt-check':   s.couldntCheck,
    'all-good':        s.allGood,
  }[variant] || s.needsAttention;

  return (
    <div className={`${s.alert} ${variantCls} ${className}`} role="alert">
      <span className={s.statusLabel}>{VARIANT_LABEL[variant]}</span>
      {headline && <h3 className={s.headline}>{headline}</h3>}
      {description && <p className={s.description}>{description}</p>}
      {children && <div className={s.actions}>{children}</div>}
    </div>
  );
}
