'use client';
import { forwardRef } from 'react';
import s from './Input.module.css';

const Input = forwardRef(function Input({
  label,
  helper,
  error,
  required,
  icon: Icon,
  textarea = false,
  className = '',
  id,
  ...props
}, ref) {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);
  const Tag = textarea ? 'textarea' : 'input';

  const inputEl = (
    <Tag
      ref={ref}
      id={inputId}
      className={`${s.input} ${textarea ? s.textarea : ''} ${error ? s.error : ''}`}
      aria-invalid={error ? true : undefined}
      aria-describedby={error ? `${inputId}-error` : helper ? `${inputId}-helper` : undefined}
      required={required}
      {...props}
    />
  );

  return (
    <div className={`${s.field} ${className}`}>
      {label && (
        <label htmlFor={inputId} className={s.label}>
          {label}
          {required && <span className={s.required} aria-hidden="true">*</span>}
        </label>
      )}
      {Icon ? (
        <div className={s.withIcon}>
          <span className={s.iconSlot}><Icon size={18} /></span>
          {inputEl}
        </div>
      ) : inputEl}
      {error && <span id={`${inputId}-error`} className={s.errorText} role="alert">{error}</span>}
      {!error && helper && <span id={`${inputId}-helper`} className={s.helper}>{helper}</span>}
    </div>
  );
});

export default Input;
