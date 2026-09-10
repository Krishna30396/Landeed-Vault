import s from './Header.module.css';
import { IconBell, IconShield } from './Icons';

export default function Header({
  activeNav,
  navItems = [
    { key: 'properties', label: 'Properties', href: '#' },
    { key: 'documents',  label: 'Documents',  href: '#' },
    { key: 'activity',   label: 'Activity',   href: '#' },
  ],
  hasNotifications = false,
  userInitials = 'SK',
  onNotificationClick,
  onAvatarClick,
  className = '',
}) {
  return (
    <header className={`${s.header} ${className}`}>
      <div className={s.inner}>
        <a href="#" className={s.logo}>
          <span className={s.logoIcon}><IconShield size={16} /></span>
          Vault
        </a>

        <nav className={s.nav} aria-label="Main">
          {navItems.map((item) => (
            <a
              key={item.key}
              href={item.href}
              className={`${s.navLink} ${activeNav === item.key ? s.navLinkActive : ''}`}
              aria-current={activeNav === item.key ? 'page' : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className={s.spacer} />

        <div className={s.actions}>
          <button
            className={s.iconBtn}
            onClick={onNotificationClick}
            aria-label="Notifications"
          >
            <IconBell size={20} />
            {hasNotifications && <span className={s.notifDot} />}
          </button>

          <button
            className={s.avatar}
            onClick={onAvatarClick}
            aria-label="Account menu"
          >
            {userInitials}
          </button>
        </div>
      </div>
    </header>
  );
}
