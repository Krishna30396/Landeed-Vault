import s from './Header.module.css';
import { IconBell, IconHome, IconSearch } from './Icons';

export default function Header({
  showSearch = false,
  showNav = false,
  activeNav,
  navItems = [
    { key: 'properties', label: 'Properties', href: '#' },
    { key: 'documents',  label: 'Documents',  href: '#' },
    { key: 'activity',   label: 'Activity',   href: '#' },
  ],
  hasNotifications = false,
  userInitials = 'K',
  onNotificationClick,
  onAvatarClick,
  searchPlaceholder = 'Search your properties...',
  className = '',
}) {
  return (
    <header className={`${s.header} ${className}`}>
      <div className={s.inner}>
        <a href="/" className={s.logo}>
          <span className={s.logoIcon}><IconHome size={18} /></span>
          <span className={s.logoText}>
            <span className={s.logoName}>Vault</span>
            <span className={s.logoSub}>by Landeed</span>
          </span>
        </a>

        {showNav && (
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
        )}

        <div className={s.spacer} />

        {showSearch && (
          <div className={s.search}>
            <span className={s.searchIcon}><IconSearch size={16} /></span>
            <input
              type="search"
              className={s.searchInput}
              placeholder={searchPlaceholder}
              aria-label="Search properties"
            />
          </div>
        )}

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
