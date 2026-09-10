'use client';
import { useEffect, useRef } from 'react';
import s from './Modal.module.css';
import { IconX } from './Icons';

export default function Modal({
  open,
  onClose,
  title,
  children,
  footer,
  bare = false,
  className = '',
}) {
  const overlayRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e) => { if (e.key === 'Escape') onClose?.(); };
    document.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className={s.overlay}
      ref={overlayRef}
      onClick={(e) => { if (e.target === overlayRef.current) onClose?.(); }}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div className={`${s.modal} ${className}`}>
        {bare ? (
          children
        ) : (
          <>
            <div className={s.header}>
              <h2 className={s.title}>{title}</h2>
              <button className={s.close} onClick={onClose} aria-label="Close">
                <IconX size={20} />
              </button>
            </div>
            <div className={s.body}>{children}</div>
            {footer && <div className={s.footer}>{footer}</div>}
          </>
        )}
      </div>
    </div>
  );
}
