const sizes = { sm: 32, md: 40, lg: 56 };

export default function Avatar({ initials, src, size = 'md', className = '' }) {
  const px = sizes[size] || sizes.md;
  const fontSize = px < 40 ? 'var(--text-caption)' : 'var(--text-body-sm)';

  const base = {
    width: px,
    height: px,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'var(--weight-semibold)',
    fontSize,
    flexShrink: 0,
    overflow: 'hidden',
    background: 'var(--color-brand-subtle)',
    color: 'var(--color-brand-text)',
  };

  if (src) {
    return (
      <div style={base} className={className}>
        <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
    );
  }

  return <div style={base} className={className}>{initials || '?'}</div>;
}
