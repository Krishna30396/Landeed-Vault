import s from './Toast.module.css';
import { IconCheckCircle, IconAlertTriangle, IconAlertCircle, IconInfo, IconX } from './Icons';

const ICONS = {
  success: IconCheckCircle,
  warning: IconAlertTriangle,
  error:   IconAlertCircle,
  info:    IconInfo,
};

export function Toast({ variant = 'success', title, message, onClose }) {
  const Icon = ICONS[variant];
  return (
    <div className={`${s.toast} ${s[variant]}`} role="status">
      <span className={s.icon}><Icon size={20} /></span>
      <div className={s.body}>
        <div className={s.title}>{title}</div>
        {message && <div className={s.message}>{message}</div>}
      </div>
      {onClose && (
        <button className={s.close} onClick={onClose} aria-label="Dismiss">
          <IconX size={16} />
        </button>
      )}
    </div>
  );
}

export function ToastContainer({ children }) {
  return <div className={s.container}>{children}</div>;
}
